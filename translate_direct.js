import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

async function fetchTranslate(text) {
  if (!text || typeof text !== 'string') return text;
  if (text.endsWith('.pdf') || text.endsWith('.json') || text.endsWith('.jpg') || text.endsWith('.png')) return text;
  if (text.trim().length === 0) return text;
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 429) {
            console.error("Rate limited by Google Translate");
        }
        return text;
    }
    const json = await res.json();
    let translatedText = '';
    for (const chunk of json[0]) {
        if (chunk[0]) translatedText += chunk[0];
    }
    return translatedText || text;
  } catch (err) {
    return text;
  }
}

async function translateArray(arr) {
  if (!Array.isArray(arr)) return arr;
  const translated = [];
  for (const item of arr) {
    if (typeof item === 'string') {
      translated.push(await fetchTranslate(item));
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
    if (['title', 'description', 'subtitle', 'features', 'applications', 'name', 'category', 'content'].includes(key)) {
      if (typeof value === 'string') {
        newObj[key] = await fetchTranslate(value);
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
  
  for (let i = 0; i < toProcess.length; i++) {
     await processFile(path.join(DATA_DIR, toProcess[i]));
     await new Promise(r => setTimeout(r, 100)); // fast delay
  }
  
  console.log("Translation complete!");
}

main();
