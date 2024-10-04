# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Base stage for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY . .
RUN dotnet restore "./TodoAppAPI.csproj"
RUN dotnet build "./TodoAppAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./TodoAppAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final stage for production
FROM base AS final
WORKDIR /app

# Set up environment variables to be passed at runtime
ARG MONGO_CONNECTION_STRING
ARG MONGO_DATABASE_NAME
ARG MONGO_COLLECTION_NAME

# Define environment variables to be used in the app at runtime
ENV MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING
ENV MONGO_DATABASE_NAME=$MONGO_DATABASE_NAME
ENV MONGO_COLLECTION_NAME=$MONGO_COLLECTION_NAME

# Copy the published files to the app directory
COPY --from=publish /app/publish .

# Expose necessary ports
EXPOSE 8081
EXPOSE 443

# Entry point for the application
ENTRYPOINT ["dotnet", "TodoAppAPI.dll"]