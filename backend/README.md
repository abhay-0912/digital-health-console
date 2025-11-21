# Backend

Node.js + Express backend for Digital Health Console.

Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and update DB credentials
3. Run in development: `npm run dev`

Endpoints (examples):
- `POST /api/auth/register` - register {name,email,password,role}
- `POST /api/auth/login` - login {email,password}
- `POST /api/health` - add health record (bearer token)
- `GET /api/health` - list health records (bearer token)
