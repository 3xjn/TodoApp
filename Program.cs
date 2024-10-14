using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;
using LettuceEncrypt;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoAppAPI.Models;
using TodoAppAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json", true, true)
        .AddJsonFile("local.appsettings.json", true, true)
        .AddUserSecrets<Program>(optional: true)
        .AddEnvironmentVariables()
        .Build();

builder.Services.Configure<TodoDatabaseSettings>(
    config.GetSection("Mongo"));

builder.Services.AddSingleton(serviceProvider =>
{
    var settings = serviceProvider.GetRequiredService<IOptions<TodoDatabaseSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<TodoService>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var certPath = "/etc/letsencrypt/live/3xjn.dev/fullchain.pem";
var keyPath = "/etc/letsencrypt/live/3xjn.dev/privkey.pem";

// Verify the certificate directory and its files
Console.WriteLine("Checking certificate directory...");
var certsFolder = Path.GetDirectoryName(certPath);
if (!string.IsNullOrEmpty(certsFolder))
{
    var certFiles = Directory.GetFiles(certsFolder);
    Console.WriteLine($"Found files in {certsFolder}:");
    foreach (var file in certFiles)
    {
        Console.WriteLine(file);
    }
}
else
{
    Console.WriteLine($"Certificate folder path is invalid: {certsFolder}");
}

// Wait until the certificate files are found
const int maxRetries = 30; // Max attempts to find the certificate files
const int delayBetweenRetries = 1000; // 1 second delay between attempts
bool certsFound = false;

for (int attempt = 1; attempt <= maxRetries; attempt++)
{
    if (File.Exists(certPath) && File.Exists(keyPath))
    {
        Console.WriteLine("Certificate files found.");
        certsFound = true; // Set flag to true if files are found
        break; // Exit the loop if files are found
    }

    if (attempt == maxRetries)
    {
        Console.WriteLine("Certificate files not found after multiple attempts. Exiting...");
        throw new FileNotFoundException("Could not find certificate files", certPath);
    }

    Console.WriteLine($"Attempt {attempt}/{maxRetries}: Waiting for certificate files to be found...");
    Thread.Sleep(delayBetweenRetries); // Wait for 1 second
}

// Load the certificates from PEM files only if they were found
if (certsFound)
{
    var cert = X509Certificate2.CreateFromPemFile(certPath, keyPath, X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.Exportable);

    // Optional: If needed, re-export to ensure compatibility
    cert = new X509Certificate2(cert.Export(X509ContentType.Pfx));

    // Configure Kestrel to use the certificate
    builder.WebHost.ConfigureKestrel(options =>
    {
        options.ListenAnyIP(443, listenOptions =>
        {
            listenOptions.UseHttps(cert);
        });
    });
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

var defaultFilesOptions = new DefaultFilesOptions();
var staticFileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.WebRootPath, "app"));
app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = staticFileProvider
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = staticFileProvider
});

app.UseCors("AllowAll");

app.Use(async (context, next) => {
    if (!context.Request.IsHttps && !context.Request.Path.StartsWithSegments("/.well-known/acme-challenge"))
    {
        var withHttps = $"https://{context.Request.Host}{context.Request.Path}{context.Request.QueryString}";
        context.Response.Redirect(withHttps);
    }
    else
    {
        await next();
    }
});

app.MapControllers();

app.Run();
