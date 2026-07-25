const fs = require('fs');
const path = 'C:/Users/shoha/Downloads/Portfolio/src/main.jsx';
const js = fs.readFileSync(path, 'utf8');

// Add lightbox state at start of Article
const articleStatePattern = 'function Article({article}){React.useEffect(()=>{';
const articleStateReplacement = 'function Article({article}){const [lightbox,setLightbox]=React.useState(null);const [zoom,setZoom]=React.useState(1);React.useEffect(()=>{';
if (!js.includes(articleStatePattern)) {
  console.log('ERROR: Article state pattern not found');
  process.exit(1);
}
let updated = js.replace(articleStatePattern, articleStateReplacement);
console.log('Added lightbox state');

// Add onClick to gallery items
const galleryPattern = 'className="gallery-item"><img src={src} alt=';
const galleryReplacement = 'className="gallery-item" onClick={()=>setLightbox(src)}><img src={src} alt=';
if (!updated.includes(galleryPattern)) {
  console.log('ERROR: Gallery pattern not found');
  process.exit(1);
}
updated = updated.replace(galleryPattern, galleryReplacement);
console.log('Added gallery onClick');

// Add lightbox JSX at end of Article return (before function NotFound)
const articleEndPattern = '</article><Footer/></>}\nfunction NotFound()';
const articleEndReplacement = '</article><Footer/></>{lightbox&&<div className="lightbox" onClick={()=>setLightbox(null)}><div className="lightbox-content" onClick={(e)=>e.stopPropagation()}><img src={lightbox} alt="Gallery preview" style={{transform:`scale(${zoom})`}}/><button className="lightbox-close" onClick={()=>setLightbox(null)}>×</button><div className="lightbox-controls"><button onClick={()=>setZoom(z=>Math.max(1,z+0.5))}>+</button><button onClick={()=>setZoom(z=>Math.max(1,z-0.5))}>−</button><button onClick={()=>setZoom(1)}>⟲</button></div></div></div>}</>}\nfunction NotFound()';
if (!updated.includes(articleEndPattern)) {
  console.log('ERROR: Article end pattern not found');
  console.log('Looking for:', JSON.stringify(articleEndPattern));
  process.exit(1);
}
updated = updated.replace(articleEndPattern, articleEndReplacement);
console.log('Added lightbox JSX');

fs.writeFileSync(path, updated);
console.log('SUCCESS: All lightbox changes applied');
