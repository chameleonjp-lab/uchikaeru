// Code-native introduction layout from the actual canvas palette and glyphs.
// It is not a screenshot or a fabricated player's result.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),ja=JSON.parse(fs.readFileSync(path.join(root,'locales/ja.json'),'utf8'));
for(const token of ["'#08200f'","'#0c2a18'","fillText('🐸'","fillText('🏯'",'60'])assert.ok(html.includes(token),'Review preview after game drawing changes: '+token);
const glyphs=JSON.parse(fs.readFileSync(path.join(root,'scripts/social-glyphs.json'),'utf8'));
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
let svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="field" x2="0" y2="1"><stop stop-color="#08200f"/><stop offset="1" stop-color="#0c2a18"/></linearGradient></defs><rect width="1200" height="630" fill="#07180f"/><g font-family="Noto Sans CJK JP, sans-serif"><text x="60" y="204" font-size="76" font-weight="900" fill="#78f08a">'+esc(ja.gameTitle)+'</text><text x="64" y="272" font-size="28" fill="#f2fff3">武器と強化を選ぶ、拠点防衛。</text><text x="64" y="322" font-size="27" fill="#a8c8ad">カエルの大群から60波を守り抜こう</text><rect x="64" y="375" width="446" height="66" rx="15" fill="#173b25" stroke="#78f08a"/><text x="287" y="418" text-anchor="middle" font-size="25" fill="#ffd766">3枚から選ぶ → 自動で撃退</text><rect x="615" y="40" width="525" height="550" rx="22" fill="url(#field)" stroke="#78f08a"/>';
for(let y=66;y<555;y+=32)svg+=`<path d="M630 ${y} L1125 ${y+18}" stroke="#78f08a" opacity=".13"/>`;
for(let i=0;i<7;i++)svg+=`<path d="M${650+i*75} 60 V490" stroke="#78f08a" opacity=".09"/>`;
svg+='<path d="M630 490 H1125" stroke="#ff5050" stroke-width="3" opacity=".3"/>';
const frogs=[[720,150,25],[900,128,25],[1060,215,25],[805,260,25],[966,330,25],[690,370,25]];
for(const [x,y,r]of frogs)svg+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#7CFC7C"/><image x="${x-r}" y="${y-r}" width="${r*2}" height="${r*2}" href="data:image/png;base64,${glyphs.frog}"/><rect x="${x-r}" y="${y-r-8}" width="${r*2}" height="4" fill="#ff7777"/>`;
for(const [x,y]of[[850,450],[862,421],[874,392],[896,455],[918,430],[940,405]])svg+=`<circle cx="${x}" cy="${y}" r="3.2" fill="#eafff0"/>`;
svg+='<image x="843" y="485" width="68" height="68" href="data:image/png;base64,'+glyphs.castle+'"/><rect x="825" y="554" width="104" height="7" rx="3" fill="#78f08a"/></g></svg>\n';
fs.writeFileSync(path.join(root,'assets/social-preview.svg'),svg);
