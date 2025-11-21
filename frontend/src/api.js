const API_BASE = import.meta.env.VITE_API_BASE || (import.meta.env.MODE === 'production' ? 'https://eoffice-rouge.vercel.app' : 'http://localhost:4000');

export async function generateCircular(payload) {
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
