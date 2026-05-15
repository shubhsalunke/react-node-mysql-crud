#!/bin/bash
set -e

echo "Deleting containers..."
docker rm -f user-frontend user-backend mysql-db 2>/dev/null || true

echo "Deleting images..."
docker rmi user-frontend user-backend 2>/dev/null || true

echo "Deleting network..."
docker network rm user-network 2>/dev/null || true

echo "Cleanup..."
docker image prune -f

echo "Deleted successfully!"
