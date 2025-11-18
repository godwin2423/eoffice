# Vercel Deployment Guide

## Steps to Deploy to Vercel

### 1. Push to GitHub

First, you need to push your code to GitHub:

```bash
# Initialize git (if not already done)
cd d:\AI\Templates\circular-react
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
git add .
git commit -m "Initial commit: Circular generator app"

# Add GitHub remote and push
git remote add origin https://github.com/YOUR_USERNAME/circular-generator.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `backend` directory as the root directory
5. Click "Deploy"
6. **Note the URL** - it will be something like `https://circular-backend-xxxxx.vercel.app`

### 3. Deploy Frontend to Vercel

1. In Vercel dashboard, click "Add New..." → "Project"
2. Import the same GitHub repository
3. Select the `frontend` directory as the root directory
4. Under "Environment Variables", add:
   - **Name:** `VITE_API_BASE`
   - **Value:** `https://circular-backend-xxxxx.vercel.app` (use your backend URL from step 2)
5. Click "Deploy"

### 4. Verify Deployment

- Frontend will be available at the Vercel URL provided
- Test the Generate button to ensure it connects to the backend API
- Both frontend and backend should now be live

## Project Files Included for Vercel

- `backend/vercel.json` - Backend deployment configuration
- `frontend/vercel.json` - Frontend build configuration
- `backend/.gitignore` - Git ignore rules
- `frontend/.gitignore` - Git ignore rules
- `README.md` - Project documentation

## Notes

- The backend API automatically handles CORS for the frontend
- Environment variables are read from Vercel's dashboard
- The frontend will use the backend API URL from the `VITE_API_BASE` environment variable
- Both services can be scaled independently on Vercel

## Troubleshooting

If the app doesn't work after deployment:

1. Check that `VITE_API_BASE` env var is set correctly in frontend project
2. Verify the backend is running (check Vercel logs)
3. Check browser console for CORS errors
4. Verify the backend API endpoint works: `POST /api/generate`

## Support

For issues, check:
- Vercel docs: https://vercel.com/docs
- Backend logs: Vercel dashboard → Backend project → Deployments → Logs
- Frontend logs: Browser Developer Tools (F12)
