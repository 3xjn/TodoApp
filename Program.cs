using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;
using LettuceEncrypt;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoAppAPI.Models;
using TodoAppAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add logging
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

// Get the PFX file path from the environment variable
var certPfxPath = Environment.GetEnvironmentVariable("CERT_PFX");
var certPfxPass = Environment.GetEnvironmentVariable("CERT_PFX_PASS");

if (string.IsNullOrEmpty(certPfxPath))
{
    throw new InvalidOperationException("Certificate path must be provided.");
}

// Load the PFX certificate
var cert = new X509Certificate2(certPfxPath, certPfxPass);

// Configure Kestrel to use the certificate
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(443, listenOptions => listenOptions.UseHttps(cert));
});

// Log certificate loading (for debugging)
Console.WriteLine("SSL certificate loaded successfully.");

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

app.Use(async (context, next) =>
{
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
