import json
import os
import glob
from deep_translator import GoogleTranslator
import time

DATA_DIR = os.path.join(os.getcwd(), 'public', 'data')

def translate_text(text):
    if not text or not isinstance(text, str):
        return text
    if len(text.strip()) == 0:
        return text
    try:
        translated = GoogleTranslator(source='en', target='es').translate(text)
        return translated if translated else text
    except Exception as e:
        print(f"Error translating text: {e}")
        return text

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        content = data.get('content', '')
        if content and isinstance(content, str):
            # Check if it has english words like "and", "the", "with" with spaces
            if " the " in content.lower() or " and " in content.lower() or " with " in content.lower() or " for " in content.lower():
                print(f"Translating content for: {os.path.basename(filepath)}")
                
                # Some contents are long, we might need to split by lines or chunks, but deep-translator handles up to 5000 chars.
                if len(content) > 4000:
                    chunks = content.split('\n')
                    translated_chunks = [translate_text(c) for c in chunks]
                    data['content'] = '\n'.join(translated_chunks)
                else:
                    data['content'] = translate_text(content)
                    
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                # sleep a little to prevent rate limits
                time.sleep(1)
    except Exception as e:
        pass

def main():
    files = glob.glob(os.path.join(DATA_DIR, "*.json"))
    for file in files:
        if os.path.basename(file) in ['catalog.json', 'gallery.json', 'index.json', 'contact-us.json', 'resources.json']:
            continue
        process_file(file)
        
    print("Content translation complete!")

if __name__ == "__main__":
    main()
