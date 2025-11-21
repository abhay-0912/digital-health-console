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

---

## Deployment (Frontend on Netlify, Backend elsewhere)

1. Deploy Backend (e.g. Render / Railway / Fly.io)
	- Create a new web service pointing to the `backend` directory.
	- Set environment variables from `backend/.env.example` (e.g. `JWT_SECRET`).
	- Ensure the service listens on port `4000` (Render auto-detects if `server.js` starts Express on 4000). If hosting SQLite, no extra DB config is required.
	- After deployment you will have a URL such as `https://digital-health-backend.onrender.com`.

2. Enable CORS on Backend (already permissive by default if not restricted). If you lock it down, allow origin: `https://digital-health-console.netlify.app`.

3. Configure Netlify Environment Variable:
	- In Netlify dashboard: Site Settings → Environment Variables → Add `VITE_API_BASE_URL` with value of your backend URL (e.g. `https://digital-health-backend.onrender.com`).
	- Trigger a new deploy (or just redeploy after saving variable).

4. (Optional) Update `netlify.toml` API Proxy:
	- If you prefer relative `/api/*` calls without setting `VITE_API_BASE_URL`, set the redirect target:
	  ```toml
	  [[redirects]]
	  from = "/api/*"
	  to = "https://digital-health-backend.onrender.com/:splat"
	  status = 200
	  force = true
	  ```
	- Remove `VITE_API_BASE_URL` or leave it blank; adjust `apiClient.js` if needed.

5. Verify:
	- Open the deployed site, check console for absence of `[apiClient] Missing VITE_API_BASE_URL` warning.
	- Login using seeded demo credentials.

### Troubleshooting Network Error on Login
"Network Error" typically means the frontend tried to reach `http://localhost:4000` from Netlify (not accessible). Fix by setting `VITE_API_BASE_URL` correctly. After redeploy, requests should return 200/401 JSON responses rather than failing at the network layer.

### Quick Backend Deployment (Render Example)
```bash
# From repo root (local machine)
cd backend
render.yaml (optional) # or use dashboard to create service
```
In Render dashboard:
	- New Web Service → Connect GitHub repo → Root directory: `backend`
	- Build command: `npm install`
	- Start command: `node server.js`
	- Add Environment Variable: `JWT_SECRET=super-secret-value`
	- Deploy.

---

