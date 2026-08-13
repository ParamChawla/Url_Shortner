# linkly frontend

## Project creation commands

```sh
npm create vite@latest url-shortener-frontend -- --template react
cd url-shortener-frontend
npm install react-router-dom axios framer-motion react-hot-toast react-hook-form lucide-react recharts clsx tailwind-merge
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

## Run

```sh
npm install
npm run dev
```

The frontend expects the bundled backend at `http://localhost:3000`. Override this with `VITE_API_URL` when needed.

For production deployment instructions, see the repository-level `DEPLOYMENT.md`.
