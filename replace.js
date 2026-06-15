const fs = require('fs');
const glob = require('glob'); // Not using glob, just an array of files

const files = [
  './docs-site/src/tokens.css',
  './docs-site/src/data/primitives.json',
  './design-system/tokens.css',
  './design-system/figma/semantic-light.figma.json',
  './design-system/figma/primitives.figma.json',
  './design-system/figma/figma-variables.json',
  './design-system/figma/components.figma.json',
  './design-system/figma/semantic-dark.figma.json'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/142641/gi, '0D1846');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
