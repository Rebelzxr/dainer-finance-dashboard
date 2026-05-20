const fs = require('fs');
const path = require('path');

const root = process.cwd();
const mainJs = fs.readFileSync(path.join(root, 'assets/main.js'), 'utf8');
const zhBlockMatch = mainJs.match(/zh:\s*\{([\s\S]*?)\n\s*\}\s*\};/);
if (!zhBlockMatch) {
  console.error('Could not locate I18N.zh block');
  process.exit(1);
}
const zhBlock = zhBlockMatch[1];
const zhKeys = new Set([...zhBlock.matchAll(/(?:^|\n)\s*(?:['"]([^'"]+)['"]|([A-Za-z0-9_$]+))\s*:/g)].map(m => m[1] || m[2]));

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'mockup'].includes(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const missing = [];
for (const file of walk(root)) {
  const rel = path.relative(root, file);
  const content = fs.readFileSync(file, 'utf8');
  for (const m of content.matchAll(/data-i18n="([^"]+)"/g)) {
    if (!zhKeys.has(m[1])) missing.push(m[1] + ' (in ' + rel + ')');
  }
}

console.log('I18N zh keys: ' + zhKeys.size);
console.log('Missing zh translations: ' + (missing.length === 0 ? 'NONE' : '\n  ' + missing.join('\n  ')));
if (missing.length) process.exit(1);
