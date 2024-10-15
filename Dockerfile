# Base stage for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Set the ASP.NET Core URLs to listen on port 8080
ENV ASPNETCORE_URLS=http://+:8080

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /app

# Copy project files and restore dependencies
COPY *.csproj .
RUN dotnet restore "TodoAppAPI.csproj"
COPY . .
RUN dotnet build "TodoAppAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TodoAppAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage for production
FROM base AS final
WORKDIR /app

# Copy published app
COPY --from=publish /app/publish .

# Expose port 8080
EXPOSE 8080
RUN whoami
RUN env
RUN pwd && ls -l

# Set the entrypoint
ENTRYPOINT ["dotnet", "TodoAppAPI.dll"]