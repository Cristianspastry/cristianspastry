const fs = require('fs');

// Patch types.ts
let types = fs.readFileSync('src/sanity/lib/types.ts', 'utf8');
types = types.replace(/imageUrl: string/g, 'imageUrl: string;\n  imageLqip?: string;');
types = types.replace(/mainImageUrl: string/g, 'mainImageUrl: string;\n  mainImageLqip?: string;');
fs.writeFileSync('src/sanity/lib/types.ts', types);

// Patch queries.ts
let queries = fs.readFileSync('src/sanity/lib/queries.ts', 'utf8');
queries = queries.replace(/"mainImageUrl": mainImage\.asset->url,/g, '"mainImageUrl": mainImage.asset->url,\n  "mainImageLqip": mainImage.asset->metadata.lqip,');
queries = queries.replace(/"imageUrl": mainImage\.asset->url,/g, '"imageUrl": mainImage.asset->url,\n  "imageLqip": mainImage.asset->metadata.lqip,');
queries = queries.replace(/"imageUrl": image\.asset->url/g, '"imageUrl": image.asset->url,\n    "imageLqip": image.asset->metadata.lqip');
fs.writeFileSync('src/sanity/lib/queries.ts', queries);
console.log('Patched types and queries');
