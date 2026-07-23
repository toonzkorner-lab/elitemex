import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

async function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  if (text.endsWith('.pdf') || text.endsWith('.json') || text.endsWith('.jpg') || text.endsWith('.png')) return text;
  if (text.trim().length === 0) return text;
  
  try {
    const res = await translate(text, { to: 'es', autoCorrect: false });
    return res.text;
  } catch (err) {
    console.error('Translation error:', err.message);
    return text;
  }
}

async function translateArray(arr) {
  if (!Array.isArray(arr)) return arr;
  const translated = [];
  for (const item of arr) {
    if (typeof item === 'string') {
      translated.push(await translateText(item));
    } else if (typeof item === 'object') {
      translated.push(await translateObject(item));
    } else {
      translated.push(item);
    }
  }
  return translated;
}

async function translateObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return await translateArray(obj);

  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    // INCLUDE 'content' THIS TIME!
    if (['title', 'description', 'subtitle', 'features', 'applications', 'name', 'category', 'content'].includes(key)) {
      if (typeof value === 'string') {
        newObj[key] = await translateText(value);
      } else if (Array.isArray(value)) {
        newObj[key] = await translateArray(value);
      } else {
        newObj[key] = value;
      }
    } else {
      if (typeof value === 'object') {
         newObj[key] = await translateObject(value);
      } else {
         newObj[key] = value;
      }
    }
  }
  return newObj;
}

async function processFile(filePath) {
  try {
    const contentStr = fs.readFileSync(filePath, 'utf-8');
    let data;
    try {
       data = JSON.parse(contentStr);
    } catch(e) { return; } 
    
    // Only process files that have English text in content or title
    let needsTranslation = false;
    const content = data.content || '';
    if (typeof content === 'string' && (content.includes(' the ') || content.includes(' and ') || content.includes(' for '))) {
      needsTranslation = true;
    }
    const title = data.title || '';
    if (typeof title === 'string' && title.includes('Elite South Texas')) {
        needsTranslation = true;
    }
    
    if (!needsTranslation) return;
    
    console.log(`Translating: ${path.basename(filePath)}`);
    const translatedData = await translateObject(data);
    
    let newContent = JSON.stringify(translatedData, null, 2);
    newContent = newContent.replace(/Elite South Texas/g, 'Elite Mexico');
    newContent = newContent.replace(/Elite Sur de Texas/gi, 'Elite Mexico');
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err);
  }
}

async function main() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  const skipList = ['catalog.json', 'gallery.json', 'index.json', 'contact-us.json', 'resources.json'];
  
  const toProcess = files.filter(f => !skipList.includes(f));
  
  // We process sequentially with a small delay to avoid Google Translate rate limits
  for (let i = 0; i < toProcess.length; i++) {
     await processFile(path.join(DATA_DIR, toProcess[i]));
     await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log("Translation complete!");
}

main();
