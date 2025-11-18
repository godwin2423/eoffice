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

app.listen(PORT, () => {
  console.log(`Circular backend listening on http://localhost:${PORT}`);
});
