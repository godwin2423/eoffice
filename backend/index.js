const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateTemplate } = require('./generateTemplate');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/', (req, res) => {
  res.send('Circular backend running');
});

// POST /api/generate
// body: { circularNumber, contentsHtml, toText, copyTo, approvedDate, approvedByName, approvedByDesignation }
app.post('/api/generate', (req, res) => {
  try {
    const data = req.body || {};
    const html = generateTemplate(data);
    res.json({ success: true, html });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// When running locally we start the server. In serverless (Vercel) we export the app.
if (process.env.NODE_ENV === 'development' || process.env.LOCAL_RUN === 'true') {
  app.listen(PORT, () => {
    console.log(`Circular backend listening on http://localhost:${PORT}`);
  });
} else {
  // Export the Express app for serverless platforms (Vercel expects a handler export)
  module.exports = app;
}
