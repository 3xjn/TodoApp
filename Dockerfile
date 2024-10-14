# Base stage for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app



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

# Create a group and user with specific IDs to match your host's permissions
RUN addgroup --gid 1000 appgroup && \
    adduser --uid 1000 --gid 1000 --home /app --shell /bin/sh --disabled-password appuser
WORKDIR /app

# Set permissions to ensure appuser can access everything in /app
RUN chown -R appuser:appgroup /app && chmod -R 755 /app

# Switch to the non-root user
USER appuser

COPY --from=publish /app/publish .
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1

# Create directory for certificates
RUN mkdir -p /app/certs

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# Set the entrypoint
ENTRYPOINT ["dotnet", "TodoAppAPI.dll"]
