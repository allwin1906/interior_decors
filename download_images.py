import os
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor
import time

services = {
    'modular-kitchen': 'kitchen,interior',
    'wardrobes': 'wardrobe,closet',
    'false-ceiling': 'ceiling,lights',
    'wooden-handrails': 'staircase,wood',
    'korean-tile': 'tiles,kitchen',
    'aluminium-partition': 'office,partition',
    'elevation-ms': 'house,elevation',
    'electrical-plumbing': 'lighting,interior',
    'pvc-upvc': 'windows,modern'
}

base_dir = '/Users/allwin1906/Documents/interior_decors/assets/images/services'

def download_image(service, index, keyword):
    directory = os.path.join(base_dir, service)
    os.makedirs(directory, exist_ok=True)
    filepath = os.path.join(directory, f"{index}.jpg")
    # if file exists and size > 0, skip
    if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
        return

    url = f"https://loremflickr.com/800/600/{keyword}?lock={index + 30}"
    
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            # print(f"Downloaded {filepath}")
            break
        except Exception as e:
            # print(f"Attempt {attempt+1} failed for {url}: {e}")
            time.sleep(1)

with ThreadPoolExecutor(max_workers=20) as executor:
    for service, keyword in services.items():
        # First image can be the AI one we generated to maintain quality, but let's just make all 10 consistent.
        for i in range(1, 11):
            executor.submit(download_image, service, i, keyword)

print("All downloads finished.")
