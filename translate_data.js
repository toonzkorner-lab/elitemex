import fs from 'fs';
import path from 'path';
import translate from 'google-translate-api-x';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const BATCH_SIZE = 5;

async function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  // If it's just a file name or something very short that shouldn't be translated, skip
  if (text.endsWith('.pdf') || text.endsWith('.json') || text.endsWith('.jpg')) return text;
  
  try {
    const res = await translate(text, { to: 'es' });
    return res.text;
  } catch (err) {
    console.error('Translation error:', err);
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
  if (Array.isArray(obj)) return translateArray(obj);

  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    // Keys to translate
    if (['title', 'description', 'subtitle', 'features', 'applications', 'name', 'category'].includes(key)) {
      if (typeof value === 'string') {
        newObj[key] = await translateText(value);
      } else if (Array.isArray(value)) {
        newObj[key] = await translateArray(value);
      } else {
        newObj[key] = value;
      }
    } else {
      // Don't translate keys like 'file', 'id', 'primary_image', etc.
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
    const content = fs.readFileSync(filePath, 'utf-8');
    let data;
    try {
       data = JSON.parse(content);
    } catch(e) { return; } // skip invalid json
    
    console.log(`Translating: ${path.basename(filePath)}`);
    const translatedData = await translateObject(data);
    
    // Quick string replace for Elite South Texas -> Elite Mexico in case it was missed
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
  
  // process in small batches to avoid rate limits
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(f => processFile(path.join(DATA_DIR, f))));
    console.log(`Processed batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(files.length/BATCH_SIZE)}`);
    // sleep to prevent rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log("Translation complete!");
}

main();
