const fs = require('fs');
const path = 'C:/Users/shoha/Downloads/Portfolio/src/main.jsx';
const js = fs.readFileSync(path, 'utf8');

// Find Article component return JSX
const articleStart = js.indexOf('function Article({article})');
const notFoundStart = js.indexOf('function NotFound');
const articleFn = js.substring(articleStart, notFoundStart);

// Extract just the return JSX part
const returnMatch = articleFn.match(/return (<.*>)\}/s);
if (!returnMatch) {
  console.log('Could not find return statement');
  process.exit(1);
}

const returnJSX = returnMatch[1];
console.log('Return JSX length:', returnJSX.length);
console.log('First 200 chars:', returnJSX.substring(0, 200));
console.log('Last 200 chars:', returnJSX.substring(returnJSX.length - 200));

// Check for basic tag balance
const tags = ['article', 'div', 'section', 'aside', 'header', 'footer', 'nav'];
tags.forEach(tag => {
  const openRegex = new RegExp('<' + tag + '[\\s>]', 'g');
  const closeRegex = new RegExp('</' + tag + '>', 'g');
  const opens = (returnJSX.match(openRegex) || []).length;
  const closes = (returnJSX.match(closeRegex) || []).length;
  const selfClose = (returnJSX.match(new RegExp('<' + tag + '[^>]*/>', 'g')) || []).length;
  console.log(`${tag}: ${opens} open, ${closes} close, ${selfClose} self-close, diff: ${opens - closes - selfClose}`);
});
