# Deployment guide

## 1. Database

Create a MongoDB Atlas cluster, add your deployment provider's IP access (or an appropriate production network rule), create a database user, and copy its connection string to `MONGO_URI`.

## 2. Deploy the API

Deploy the `BACKEND` directory to Render, Railway, Fly.io, or another Node.js host.

- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/health`

Set the values in `BACKEND/.env.example`. Use your public frontend URL for `CLIENT_URL` and the public short-link URL (usually the API URL or a custom domain pointing to it) for `APP_URL`.

Example:

```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=a-long-random-secret
APP_URL=https://go.example.com/
CLIENT_URL=https://app.example.com
```

`CLIENT_URL` can contain a comma-separated list of approved frontend origins.

## 3. Deploy the frontend

Deploy the `FRONTEND` directory to Vercel, Netlify, or any static host.

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=https://go.example.com/api`

Configure a catch-all rewrite to `index.html` if the static host does not automatically support React Router history fallback.

## 4. Domains and cookies

Use HTTPS for both deployments. The API is configured to send secure cross-origin authentication cookies in production. Update both `CLIENT_URL` and `VITE_API_URL` if either public domain changes, then redeploy the respective service.

## 5. Verify

After deploying, open `https://go.example.com/health`; it should return `{ "status": "ok" }`. Then register, shorten a link, open it, and confirm the click total increases.
