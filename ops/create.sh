#!/bin/bash
set -e

PROJECT_DIR=~/user-crud-project
cd $PROJECT_DIR

echo "Removing old containers..."
docker rm -f mysql-db user-backend user-frontend 2>/dev/null || true

echo "Creating Docker network..."
docker network inspect user-network >/dev/null 2>&1 || docker network create user-network

echo "Starting MySQL..."
docker run -d \
--name mysql-db \
--network user-network \
--env-file .env \
-e MYSQL_ROOT_PASSWORD=root123 \
-e MYSQL_DATABASE=userdb \
-p 3306:3306 \
mysql:8.0

echo "Waiting for MySQL..."
until docker exec mysql-db mysqladmin ping -h 127.0.0.1 -u root -proot123 --silent; do
  echo "Waiting for MySQL to be ready..."
  sleep 3
done

echo "Creating table..."
docker exec -i mysql-db mysql -h 127.0.0.1 -u root -proot123 <<MYSQL
USE userdb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
MYSQL

echo "Building backend..."
cd $PROJECT_DIR/backend
docker build -t user-backend .

echo "Starting backend..."
cd $PROJECT_DIR
docker run -d \
--name user-backend \
--network user-network \
--env-file .env \
-p 5000:5000 \
user-backend

echo "Building frontend..."
cp .env frontend/.env
cd $PROJECT_DIR/frontend
docker build -t user-frontend .

echo "Starting frontend..."
docker run -d \
--name user-frontend \
-p 5173:5173 \
user-frontend

echo "Done!"
echo "Frontend: http://YOUR-SERVER-IP:5173"
echo "Backend:  http://YOUR-SERVER-IP:5000"
