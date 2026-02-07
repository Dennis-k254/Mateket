import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE = path.join(DATA_DIR, 'enquiries.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

async function ensureStore() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(STORE);
  } catch (err) {
    await fs.writeFile(STORE, '[]', 'utf8');
  }
}

app.get('/api/enquiries', async (req, res) => {
  try {
    await ensureStore();
    const raw = await fs.readFile(STORE, 'utf8');
    const items = JSON.parse(raw || '[]');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read store' });
  }
});

app.post('/api/enquiries', async (req, res) => {
  try {
    await ensureStore();
    const payload = req.body || {};
    const item = { id: Date.now(), ...payload };
    const raw = await fs.readFile(STORE, 'utf8');
    const items = JSON.parse(raw || '[]');
    items.push(item);
    await fs.writeFile(STORE, JSON.stringify(items, null, 2), 'utf8');
    res.status(201).json({ success: true, item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save enquiry' });
  }
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
