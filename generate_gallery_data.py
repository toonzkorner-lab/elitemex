import os
import json

data_dir = r"C:\Users\ToonZ\.gemini\antigravity\scratch\elitecrete_app\public\data"
images = set()

for f in os.listdir(data_dir):
    if f.endswith('.json') and f != 'catalog.json' and f != 'gallery.json':
        try:
            with open(os.path.join(data_dir, f), 'r', encoding='utf-8') as file:
                data = json.load(file)
                if 'images' in data:
                    for img in data['images']:
                        # Exclude icons or logos if we can guess
                        if not img.startswith('logo') and not img.endswith('.svg'):
                            images.add(img)
        except Exception as e:
            print(f"Error reading {f}: {e}")

with open(os.path.join(data_dir, 'gallery.json'), 'w', encoding='utf-8') as out:
    json.dump(list(images), out)
print(f"Generated gallery.json with {len(images)} images.")
