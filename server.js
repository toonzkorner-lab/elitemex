import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');
const PDFS_DIR = path.join(DATA_DIR, 'pdfs');

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, PDFS_DIR);
    } else {
      cb(null, IMAGES_DIR);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.filename });
});

app.post('/api/products', (req, res) => {
  const { title, category, content, primary_image } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const productData = {
    url: `https://www.elitecrete.com/${slug}/`,
    title: `${title} - Elite South Texas`,
    content: content,
    images: primary_image ? [primary_image] : [],
    pdfs: []
  };

  fs.writeFileSync(path.join(DATA_DIR, `${slug}.json`), JSON.stringify(productData, null, 4));

  const catalogPath = path.join(DATA_DIR, 'catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  catalog.push({
    url: productData.url,
    title: productData.title,
    file: `${slug}.json`,
    images_count: productData.images.length,
    primary_image: primary_image
  });
  catalog.sort((a, b) => a.title.localeCompare(b.title));
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 4));

  res.json({ success: true, slug });
});

app.post('/api/gallery', (req, res) => {
  const { images } = req.body; 
  const galleryPath = path.join(DATA_DIR, 'gallery.json');
  const gallery = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));
  
  images.forEach(img => {
    if (!gallery.includes(img)) {
      gallery.unshift(img); 
    }
  });
  
  fs.writeFileSync(galleryPath, JSON.stringify(gallery, null, 4));
  res.json({ success: true });
});

app.post('/api/resources', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const { productSlug, pdfTitle } = req.body;
  if (!productSlug) return res.status(400).json({ error: 'No product selected' });

  const productPath = path.join(DATA_DIR, `${productSlug}.json`);
  if (!fs.existsSync(productPath)) return res.status(404).json({ error: 'Product not found' });
  
  const productData = JSON.parse(fs.readFileSync(productPath, 'utf8'));
  if (!productData.pdfs) productData.pdfs = [];
  
  productData.pdfs.push({
    title: pdfTitle || req.file.originalname,
    filename: req.file.filename
  });
  
  fs.writeFileSync(productPath, JSON.stringify(productData, null, 4));
  rebuildResources();
  
  res.json({ success: true, filename: req.file.filename });
});

function rebuildResources() {
  const resources = [];
  const files = fs.readdirSync(DATA_DIR);
  
  files.forEach(filename => {
    if (!filename.endsWith('.json') || ['catalog.json', 'gallery.json', 'resources.json', 'index.json', 'messages.json'].includes(filename)) return;
    const filepath = path.join(DATA_DIR, filename);
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    if (data.pdfs && data.pdfs.length > 0) {
      const cleanTitle = data.title ? data.title.replace(' - Elite South Texas', '').trim() : filename.replace('.json', '');
      resources.push({
        category: cleanTitle,
        slug: filename.replace('.json', ''),
        pdfs: data.pdfs
      });
    }
  });
  
  resources.sort((a, b) => a.category.localeCompare(b.category));
  fs.writeFileSync(path.join(DATA_DIR, 'resources.json'), JSON.stringify(resources, null, 4));
}

app.post('/api/contact', (req, res) => {
  const messageData = req.body;
  messageData.id = Date.now().toString();
  messageData.date = new Date().toISOString();
  messageData.read = false;

  const messagesPath = path.join(DATA_DIR, 'messages.json');
  let messages = [];
  if (fs.existsSync(messagesPath)) {
    messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  }
  messages.unshift(messageData);
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 4));
  res.json({ success: true });
});

app.get('/api/messages', (req, res) => {
  const messagesPath = path.join(DATA_DIR, 'messages.json');
  if (fs.existsSync(messagesPath)) {
    res.json(JSON.parse(fs.readFileSync(messagesPath, 'utf8')));
  } else {
    res.json([]);
  }
});

app.post('/api/messages/:id/read', (req, res) => {
  const messagesPath = path.join(DATA_DIR, 'messages.json');
  if (fs.existsSync(messagesPath)) {
    let messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    const msg = messages.find(m => m.id === req.params.id);
    if (msg) {
      msg.read = true;
      fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 4));
    }
  }
  res.json({ success: true });
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
