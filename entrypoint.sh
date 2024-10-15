#!/bin/sh
set -e

# Copy the mounted certificates to a location the app user can read
cp /app/cert.pem /app/certs/cert.pem
cp /app/key.pem /app/certs/key.pem

# Start the application
exec dotnet TodoAppAPI.dll