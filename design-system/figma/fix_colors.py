import json
import os

def hex_to_figma_color(hex_str):
    hex_str = hex_str.lstrip('#')
    
    if len(hex_str) == 6:
        r = int(hex_str[0:2], 16) / 255.0
        g = int(hex_str[2:4], 16) / 255.0
        b = int(hex_str[4:6], 16) / 255.0
        a = 1.0
        hex_val = f"#{hex_str.upper()}"
    elif len(hex_str) == 8:
        r = int(hex_str[0:2], 16) / 255.0
        g = int(hex_str[2:4], 16) / 255.0
        b = int(hex_str[4:6], 16) / 255.0
        a = int(hex_str[6:8], 16) / 255.0
        hex_val = f"#{hex_str[0:6].upper()}"
    else:
        raise ValueError("Invalid hex string")

    return {
        "colorSpace": "srgb",
        "components": [r, g, b],
        "alpha": a,
        "hex": hex_val
    }

def process_dict(d):
    for k, v in d.items():
        if isinstance(v, dict):
            if "$type" in v and v["$type"] == "color" and isinstance(v.get("$value"), str):
                v["$value"] = hex_to_figma_color(v["$value"])
            else:
                process_dict(v)

files = [
    'primitives.figma.json',
    'semantic-light.figma.json',
    'semantic-dark.figma.json',
    'components.figma.json'
]

for fname in files:
    with open(fname, 'r') as f:
        data = json.load(f)
    
    process_dict(data)
    
    with open(fname, 'w') as f:
        json.dump(data, f, indent=2)

print("Files updated with Figma color format!")
