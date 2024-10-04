# Base stage for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
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
COPY --from=publish /app/publish .
USER app
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1
ENTRYPOINT ["dotnet", "TodoAppAPI.dll"]
