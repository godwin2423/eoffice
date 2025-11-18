# Circular Backend

Simple Node/Express backend that exposes a POST `/api/generate` endpoint.

Install and run:

```powershell
cd d:\AI\Templates\circular-react\backend
npm install
npm start
```

Send JSON to `http://localhost:4000/api/generate` with keys: `circularNumber`, `contentsHtml`, `toText`, `copyTo`, optional `approvedDate`, `approvedByName`, `approvedByDesignation`.
