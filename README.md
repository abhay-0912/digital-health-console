Digital Health Console - Starter

This workspace contains a starter scaffold for the Digital Health Console full-stack application.

Components:
- `backend/` - Node.js + Express API with Sequelize (Postgres) and JWT authentication stub.
- `frontend/` - Vite + React + Tailwind minimal UI skeleton.

Quick start (developer):

1. Backend

```powershell
cd "c:\Users\absri\Desktop\sanjeev project\backend"
npm install
copy .env.example .env
# edit .env to point at your Postgres DB
npm run dev
```

2. Frontend

```powershell
cd "c:\Users\absri\Desktop\sanjeev project\frontend"
npm install
npm run dev
```

This scaffold is intentionally minimal. Next steps: wire up real DB credentials, complete role-based access logic, and add tests.

Single command development (backend + frontend):

```powershell
cd "c:\Users\absri\Desktop\sanjeev project"
npm install            # installs root dev dependency (concurrently)
npm run install:all    # installs backend + frontend deps
npm run dev            # starts both servers: backend 4000 + frontend 3000
```

If you want to seed demo users first and then start both:

```powershell
cd "c:\Users\absri\Desktop\sanjeev project"
npm run install:all
npm run dev:seed
```

Demo credentials (after seeding):
- Doctor: doctor@example.com / Doctor123!
- Patient: patient@example.com / Patient123!

