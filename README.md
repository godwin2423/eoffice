# Circular Generator

A React + Node.js application for generating professional circular documents using Summernote rich text editor.

## Project Structure

- `backend/` - Express server with template generation API
- `frontend/` - React + Vite frontend with Summernote editor

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:4000`

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps --ignore-scripts
npm run dev
```
Frontend runs on `http://localhost:5173` (or next available port)

## Features

- Rich text editor using Summernote for circular content
- Template generation with dynamic HTML output
- Copy and download generated HTML
- Modal preview with editable output
- Support for circular number, recipients, and copy-to fields

## Deployment to Vercel

### Prerequisites
- GitHub account with the repo pushed
- Vercel account

### Backend Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import the `backend` directory as a new project
3. Vercel will detect `vercel.json` configuration
4. Deploy and note the backend URL (e.g., `https://circular-backend.vercel.app`)

### Frontend Deployment
1. In Vercel, create a new project from the `frontend` directory
2. Add environment variable:
   - `VITE_API_BASE`: `https://circular-backend.vercel.app` (use your backend URL)
3. Deploy

## Environment Variables

### Frontend (`frontend/.env.local`)
```
VITE_API_BASE=https://your-backend-url.vercel.app
```

## API Endpoints

### POST `/api/generate`
Generates circular HTML template

**Request Body:**
```json
{
  "circularNumber": "2025/001",
  "contentsHtml": "<p>Circular content...</p>",
  "toText": "Line 1\nLine 2",
  "copyTo": "Department Name"
}
```

**Response:**
```json
{
  "success": true,
  "html": "<html>...</html>"
}
```

## Technology Stack

- **Frontend**: React 18, Vite, Summernote, Bootstrap, jQuery
- **Backend**: Node.js, Express
- **Deployment**: Vercel

## License

MIT
