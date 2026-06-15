import json

# 1. Update primitives.figma.json
with open('primitives.figma.json', 'r') as f:
    primitives = json.load(f)

primitives['font-family'] = {
    "primary": { "$value": "Inter", "$type": "string" },
    "display": { "$value": "Inter", "$type": "string" },
    "mono": { "$value": "SF Mono", "$type": "string" }
}

primitives['letter-spacing'] = {
    "tighter": { "$value": "-2%", "$type": "string" },
    "tight": { "$value": "-1%", "$type": "string" },
    "normal": { "$value": "0%", "$type": "string" },
    "wide": { "$value": "2%", "$type": "string" },
    "wider": { "$value": "4%", "$type": "string" },
    "widest": { "$value": "8%", "$type": "string" }
}

with open('primitives.figma.json', 'w') as f:
    json.dump(primitives, f, indent=2)

# 2. Create typography.figma.json
typography = {
  "display": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 40, "$type": "number" },
    "weight":        { "$value": 700, "$type": "number" },
    "line-height":   { "$value": 1.2, "$type": "number" },
    "letter-spacing":{ "$value": "-2%", "$type": "string" }
  },
  "h1": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 28, "$type": "number" },
    "weight":        { "$value": 700, "$type": "number" },
    "line-height":   { "$value": 1.2, "$type": "number" },
    "letter-spacing":{ "$value": "-1%", "$type": "string" }
  },
  "h2": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 24, "$type": "number" },
    "weight":        { "$value": 600, "$type": "number" },
    "line-height":   { "$value": 1.3, "$type": "number" },
    "letter-spacing":{ "$value": "-1%", "$type": "string" }
  },
  "h3": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 20, "$type": "number" },
    "weight":        { "$value": 600, "$type": "number" },
    "line-height":   { "$value": 1.3, "$type": "number" },
    "letter-spacing":{ "$value": "0%", "$type": "string" }
  },
  "h4": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 18, "$type": "number" },
    "weight":        { "$value": 500, "$type": "number" },
    "line-height":   { "$value": 1.3, "$type": "number" },
    "letter-spacing":{ "$value": "0%", "$type": "string" }
  },
  "body-lg": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 16, "$type": "number" },
    "weight":        { "$value": 400, "$type": "number" },
    "line-height":   { "$value": 1.5, "$type": "number" },
    "letter-spacing":{ "$value": "0%", "$type": "string" }
  },
  "body": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 14, "$type": "number" },
    "weight":        { "$value": 400, "$type": "number" },
    "line-height":   { "$value": 1.4, "$type": "number" },
    "letter-spacing":{ "$value": "0%", "$type": "string" }
  },
  "caption": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 12, "$type": "number" },
    "weight":        { "$value": 400, "$type": "number" },
    "line-height":   { "$value": 1.4, "$type": "number" },
    "letter-spacing":{ "$value": "2%", "$type": "string" }
  },
  "overline": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 10, "$type": "number" },
    "weight":        { "$value": 600, "$type": "number" },
    "line-height":   { "$value": 1.4, "$type": "number" },
    "letter-spacing":{ "$value": "8%", "$type": "string" }
  },
  "data": {
    "family":        { "$value": "Inter", "$type": "string" },
    "size":          { "$value": 32, "$type": "number" },
    "weight":        { "$value": 300, "$type": "number" },
    "line-height":   { "$value": 1.2, "$type": "number" },
    "letter-spacing":{ "$value": "-2%", "$type": "string" }
  }
}

with open('typography.figma.json', 'w') as f:
    json.dump(typography, f, indent=2)

print("Typography variables added!")
