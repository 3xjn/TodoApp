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

# WORKDIR for the app
WORKDIR /app

# Copy published app
COPY --from=publish /app/publish .

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

RUN whoami
RUN env
RUN pwd && ls -l

# Set the entrypoint
ENTRYPOINT ["dotnet", "TodoAppAPI.dll"]