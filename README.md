# React.js + Node.js + MySQL CRUD Application Using Docker

## Project Overview

This project demonstrates deployment of a full-stack CRUD application using:

* React.js Frontend
* Node.js Backend
* MySQL Database
* Docker Containers
* Bash Automation Scripts

The application allows users to:

* Add Users
* View Users
* Delete Users
* Store Data Automatically in MySQL

---

# Architecture

```text
Browser
   |
   v
React Frontend Container
   |
   v
Node.js Backend Container
   |
   v
MySQL Database Container
```

---

# Prerequisites

## Install Docker

```bash
sudo apt update

sudo apt install docker.io -y
```

---

# Start Docker

```bash
sudo systemctl start docker

sudo systemctl enable docker
```

---

# Give Docker Permission to Current User

```bash
sudo usermod -aG docker $USER
```

Apply permission immediately:

```bash
newgrp docker
```

---

# Verify Docker

```bash
docker --version
```

Test Docker:

```bash
docker run hello-world
```

---

# Step 1: Clone Repository

```bash
git clone https://github.com/shubhsalunke/RPI.git
```

---

# Step 2: Go to Project Folder

```bash
cd user-crud-project
```

---

# Step 3: Verify Project Structure

```bash
ls
```

Expected:

```text
backend  frontend  ops  .env
```

---

# Step 4: Create Environment File

Copy sample environment file:

```bash
cp sample.env .env
```

Open `.env` file:

```bash
nano .env
```

Add:

```env
DB_HOST=mysql-db

DB_USER=root

DB_PASSWORD=root123

DB_NAME=userdb

DB_PORT=3306

BACKEND_PORT=5000

VITE_API_URL=http://localhost:5000
```

Save file.

---

# Step 5: Verify Backend Structure

```bash
cd backend

ls
```

Expected:

```text
Dockerfile  package.json  server.js
```

---

# Step 6: Verify Frontend Structure

```bash
cd ../frontend

ls
```

Expected:

```text
Dockerfile  package.json  src
```

---

# Step 7: Verify Ops Scripts

```bash
cd ../ops

ls
```

Expected:

```text
create.sh  delete.sh
```

---

# Step 8: Give Execute Permission

```bash
chmod +x create.sh

chmod +x delete.sh
```

---

# Step 9: Go Back to Root Directory

```bash
cd ..
```

---

# Step 10: Deploy Full Application

```bash
bash ops/create.sh
```

This command automatically:

* Creates Docker Network
* Starts MySQL Container
* Creates Database Table
* Builds Backend Image
* Starts Backend Container
* Builds Frontend Image
* Starts Frontend Container

---

# Step 11: Verify Running Containers

```bash
docker ps
```

Expected:

```text
mysql-db
user-backend
user-frontend
```

---

# Step 12: Verify Backend Logs

```bash
docker logs user-backend
```

Expected:

```text
MySQL Connected Successfully
Backend running on port 5000
```

---

# Step 13: Verify Frontend Logs

```bash
docker logs user-frontend
```

---

# Step 14: Verify MySQL Logs

```bash
docker logs mysql-db
```

---

# Step 15: Access Application

## Frontend

```text
http://YOUR-SERVER-IP:5173
```

Example:

```text
http://172.176.217.244:5173
```

---

# Step 16: Backend API

```text
http://YOUR-SERVER-IP:5000/users
```

---

# Step 17: Delete Full Application

```bash
bash ops/delete.sh
```

This command automatically:

* Stops Containers
* Removes Containers
* Removes Docker Images
* Removes Docker Network
* Cleans Docker Resources

---

# Features

* React Frontend
* Node.js Backend
* MySQL Database
* Add User
* Delete User
* Automatic Database Storage
* Dockerized Application
* Bash Automation
* Dynamic Frontend Connection
* Automatic MySQL Table Creation
* Automatic ID Reset

---

# Technologies Used

* React.js
* Node.js
* Express.js
* MySQL
* Docker
* Bash
* Vite
