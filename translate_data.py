import json
import os
import glob
from deep_translator import GoogleTranslator

DATA_DIR = os.path.join(os.getcwd(), 'public', 'data')

def translate_text(text):
    if not text or not isinstance(text, str):
        return text
    if text.endswith('.pdf') or text.endswith('.json') or text.endswith('.jpg') or text.endswith('.png'):
        return text
    if len(text.strip()) == 0:
        return text
    try:
        translated = GoogleTranslator(source='en', target='es').translate(text)
        return translated if translated else text
    except Exception as e:
        print(f"Error translating text: {e}")
        return text

def translate_list(lst):
    return [translate_object(item) if isinstance(item, (dict, list)) else translate_text(item) if isinstance(item, str) else item for item in lst]

def translate_object(obj):
    if isinstance(obj, list):
        return translate_list(obj)
    if not isinstance(obj, dict):
        return obj

    new_obj = {}
    for key, value in obj.items():
        if key in ['title', 'description', 'subtitle', 'features', 'applications', 'name', 'category', 'content']:
            if isinstance(value, str):
                new_obj[key] = translate_text(value)
            elif isinstance(value, list):
                new_obj[key] = translate_list(value)
            else:
                new_obj[key] = value
        else:
            if isinstance(value, dict) or isinstance(value, list):
                new_obj[key] = translate_object(value)
            else:
                new_obj[key] = value
    return new_obj

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        print(f"Translating: {os.path.basename(filepath)}")
        translated_data = translate_object(data)
        
        # Replace Elite South Texas -> Elite Mexico
        content_str = json.dumps(translated_data, indent=2, ensure_ascii=False)
        content_str = content_str.replace("Elite South Texas", "Elite Mexico")
        content_str = content_str.replace("Elite Sur de Texas", "Elite Mexico")
        content_str = content_str.replace("Elite Sur de Texas", "Elite Mexico")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_str)
    except Exception as e:
        print(f"Failed to process {filepath}: {e}")

def main():
    files = glob.glob(os.path.join(DATA_DIR, "*.json"))
    
    # We want to translate all files that are still in English.
    # We can check if "Elite South Texas" is in the file, OR just re-translate
    # But since translating takes time, let's skip files that already have "Elite Mexico" in them
    # Wait, the previous translation script ALSO replaced Elite South Texas with Elite Mexico.
    # So if it has Elite Mexico, it was probably translated!
    
    files_to_translate = []
    for file in files:
        if os.path.basename(file) in ['catalog.json', 'gallery.json', 'index.json', 'contact-us.json', 'resources.json']:
            continue
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                if "Elite South Texas" in content:
                    files_to_translate.append(file)
        except:
            pass
            
    print(f"Found {len(files_to_translate)} files that still need translation.")
    
    for file in files_to_translate:
        process_file(file)
        
    print("Translation complete!")

if __name__ == "__main__":
    main()
