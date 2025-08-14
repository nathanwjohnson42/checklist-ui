# Task App – Quick Start (MySQL with Docker)

A simple task management app built with **Next.js**, **Tailwind CSS**, **Express**, and **Prisma**. Supports creating, editing, completing, and deleting tasks with color tags.

---

## Quick Setup

### 1. Clone the repositories

```bash
git clone https://github.com/nathanwjohnson42/checklist-api.git
git clone https://github.com/nathanwjohnson42/checklist-ui.git

```

---

### 2. Install dependencies

```bash
npm install -g pnpm

# Frontend
cd checklist-ui
pnpm install

# Backend
cd ../checklist-api
pnpm install
cd ..
```

---

### 3. Setup MySQL using Docker

1. Run MySQL container:

```bash
docker run --name mysql-checklist -e MYSQL_ROOT_PASSWORD=pass123 -p 3306:3306 -d mysql:8
```

2. Verify container is running:

```bash
docker ps
```

### 4. Update `.env` in the `server` folder

```env
DATABASE_URL="mysql://root:password@localhost:3306/checklistdb"
```

---

### 5. Run Prisma migrations

```bash
cd checklist-api/
npx prisma db push

cd ..
```

This creates the `tasks` table in your Docker MySQL database.

---

### 6. Run the backend

```bash
cd checklist-api/
npx ts-node-dev src/server.ts
```

Express server runs on **http://localhost:4000**

---

### 7. Run the frontend

```bash
cd ../checklist-ui/
pnpm dev
```

Next.js runs on **http://localhost:3000**

---

### 8. Using the App

- Click **Create New Task** → Add title + color  
- Click **task title** → Edit task  
- Click **circle** → Mark task complete  
- Click **trash** → Delete task  
- Completed tasks show with **#262626 background**, checkmark, and strikethrough title  

---

## Tech Stack

- **Next.js 13** (app directory)  
- **Tailwind CSS**  
- **Express API**  
- **Prisma ORM**  
- **MySQL (Docker)**  

---

## Notes

- Make sure `.env` is added to `.gitignore` to protect credentials.  
- Prisma handles all database migrations.  
- Completed tasks are visually distinct for easier tracking.