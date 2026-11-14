/* Primary Maths Quest — core: helpers, drawings, shared question makers, year registry.
   Top-level declarations here are shared with the year files (classic scripts). */

/* ---------- helpers ---------- */
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const alt=(...f)=>pick(f)();
const range=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const pad=n=>String(n).padStart(2,'0');
const big=s=>`<span class="big">${s}</span>`;
const BL='<span class="blank">?</span>';
const fr=(n,d)=>`<span class="fr"><b>${n}</b><b>${d}</b></span>`;
const mx=(w,n,d)=>`<span class="mxn">${w}${fr(n,d)}</span>`;
const cap=s=>s[0].toUpperCase()+s.slice(1);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NAMES=['Amara','Leo','Priya','Jack','Zara','Oliver','Mei','Noah','Isla','Kofi','Sofia','Arjun','Ruby','Sami','Freya','Yusuf'];
const nm=()=>pick(NAMES);
const fmt=p=>p<100?`${p}p`:`£${(p/100).toFixed(2)}`;
const cm=n=>Number(n).toLocaleString('en-GB',{maximumFractionDigits:6});
const fix=(x,dp=6)=>+(+x).toFixed(dp);
const ds=x=>String(fix(x));
const neg=x=>x<0?`−${Math.abs(x)}`:String(x);
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const lcm=(a,b)=>a/gcd(a,b)*b;
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const factors=n=>range(1,n).filter(i=>n%i===0);
const PLN=['ones','tens','hundreds','thousands','ten thousands','hundred thousands','millions'];
const PL1=['one','ten','hundred','thousand','ten thousand','hundred thousand','million'];
const digs=(n,k=8)=>Array.from({length:k},(_,i)=>Math.floor(n/10**i)%10);
const nz=d=>{let s='';for(let i=0;i<d;i++)s+=R(1,9);return +s};
const rnd=d=>R(10**(d-1),10**d-1);
function roman(n){const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const [v,r] of m)while(n>=v){s+=r;n-=v}return s}

function mc(q,ans,wrong,o={}){ans=String(ans);let c;
  if(o.keep){c=wrong.map(String)}
  else{c=[ans];for(const w of wrong){const s=String(w);if(!c.includes(s)&&c.length<4)c.push(s)}c=shuffle(c)}
  return Object.assign({type:'choice',q,answer:ans,choices:c},o)}
function num(q,ans,o={}){return Object.assign({type:'num',q,answer:String(ans)},o)}

const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function words(n){if(n<20)return ONES[n];if(n<100)return TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:'');
  if(n<1000){const h=Math.floor(n/100),r=n%100;return ONES[h]+' hundred'+(r?' and '+words(r):'')}
  if(n<1e6){const t=Math.floor(n/1000),r=n%1000;return words(t)+' thousand'+(r?(r<100?' and ':' ')+words(r):'')}
  const m=Math.floor(n/1e6),r=n%1e6;return words(m)+' million'+(r?(r<100?' and ':' ')+words(r):'')}

/* ---------- drawings ---------- */
const f1=n=>(+n).toFixed(1);
const svg=(w,h,inner,label)=>`<svg class="vis" style="max-width:${w}px" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${inner}</svg>`;
function poly(n,cx,cy,r,rot,jit){const p=[];for(let i=0;i<n;i++){const a=(rot+i*360/n)*Math.PI/180,rr=r*(jit?jit[i]:1);p.push(f1(cx+rr*Math.cos(a))+','+f1(cy+rr*Math.sin(a)))}return p.join(' ')}
function starPts(cx,cy,r){const p=[];for(let i=0;i<10;i++){const a=(-90+i*36)*Math.PI/180,rr=i%2?r*.45:r;p.push(f1(cx+rr*Math.cos(a))+','+f1(cy+rr*Math.sin(a)))}return p.join(' ')}

function nline(start,step,k,labs){const x0=40,dx=48;let s=`<line x1="18" y1="64" x2="542" y2="64" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
  for(let i=0;i<=10;i++){const x=x0+i*dx,maj=i%5===0;s+=`<line x1="${x}" y1="${maj?50:55}" x2="${x}" y2="${maj?78:73}" stroke="currentColor" stroke-width="${maj?3:2}"/>`;
    const l=labs?labs(i):(i%10===0?neg(fix(start+i*step)):null);if(l!=null)s+=`<text x="${x}" y="104" text-anchor="middle" font-size="20">${l}</text>`}
  const ax=x0+k*dx;s+=`<path d="M${ax} 46 l-11 -20 h22 z" class="acc"/>`;
  return svg(560,116,s,'number line with an arrow')}

function fshape(k,d,kind){const idx=shuffle(range(0,d-1)).slice(0,k);const on=i=>idx.includes(i);let s='';
  if(kind==='bar'){const w=420/d;for(let i=0;i<d;i++)s+=`<rect x="${f1(20+i*w)}" y="16" width="${f1(w)}" height="80" class="${on(i)?'sh':'un'}"/>`;return svg(460,112,s,'fraction bar')}
  const cx=110,cy=110,r=94;for(let i=0;i<d;i++){const a0=(i/d)*2*Math.PI-Math.PI/2,a1=((i+1)/d)*2*Math.PI-Math.PI/2;
    s+=`<path d="M${cx} ${cy} L${f1(cx+r*Math.cos(a0))} ${f1(cy+r*Math.sin(a0))} A${r} ${r} 0 0 1 ${f1(cx+r*Math.cos(a1))} ${f1(cy+r*Math.sin(a1))} Z" class="${on(i)?'sh':'un'}" stroke-linejoin="round"/>`}
  return svg(220,220,s,'fraction circle')}
function fbars(a,b,d){let s='';const W=420,w1=W/b,w2=W/d;
  for(let i=0;i<b;i++)s+=`<rect x="${f1(20+i*w1)}" y="12" width="${f1(w1)}" height="50" class="${i<a?'sh':'un'}"/>`;
  for(let i=0;i<d;i++)s+=`<rect x="${f1(20+i*w2)}" y="78" width="${f1(w2)}" height="50" class="un"/>`;
  return svg(460,140,s,'two fraction bars')}
function hundredSvg(k){let s='';for(let i=0;i<100;i++){const x=10+(i%10)*22,y=10+Math.floor(i/10)*22;s+=`<rect x="${x}" y="${y}" width="22" height="22" class="${i<k?'sh':'un'}" style="stroke-width:1.5"/>`}return svg(240,240,s,'hundred square')}

const ROM=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
function clockSvg(h,m,roman){let s=`<circle cx="110" cy="110" r="102" class="face"/>`;
  for(let i=0;i<60;i++){const a=i*6*Math.PI/180,l=i%5?6:12,r1=96,r2=96-l;s+=`<line x1="${f1(110+r1*Math.sin(a))}" y1="${f1(110-r1*Math.cos(a))}" x2="${f1(110+r2*Math.sin(a))}" y2="${f1(110-r2*Math.cos(a))}" stroke="currentColor" stroke-width="${i%5?1.5:3}"/>`}
  for(let i=0;i<12;i++){const a=i*30*Math.PI/180,r=roman?69:71;s+=`<text x="${f1(110+r*Math.sin(a))}" y="${f1(110-r*Math.cos(a)+7)}" text-anchor="middle" font-size="${roman?16:22}" font-weight="600">${roman?ROM[i]:(i||12)}</text>`}
  const ha=((h%12)+m/60)*30*Math.PI/180,ma=m*6*Math.PI/180;
  s+=`<line x1="110" y1="110" x2="${f1(110+48*Math.sin(ha))}" y2="${f1(110-48*Math.cos(ha))}" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>`;
  s+=`<line x1="110" y1="110" x2="${f1(110+80*Math.sin(ma))}" y2="${f1(110-80*Math.cos(ma))}" class="accs" stroke-width="5" stroke-linecap="round"/>`;
  s+=`<circle cx="110" cy="110" r="7" fill="currentColor"/>`;
  return svg(220,220,s,'analogue clock')}

const COINS={1:{l:'1p',r:19,f:'#C98250'},2:{l:'2p',r:25,f:'#C98250'},5:{l:'5p',r:17,f:'#D5DAE0'},10:{l:'10p',r:24,f:'#D5DAE0'},20:{l:'20p',r:22,f:'#D5DAE0',n:7},50:{l:'50p',r:28,f:'#D5DAE0',n:7},100:{l:'£1',r:24,f:'#E6BE55',n:12},200:{l:'£2',r:29,f:'#E6BE55',inner:'#D5DAE0'}};
function coinsSvg(list){let x=8,s='';for(const v of list){const c=COINS[v],cx=x+c.r,cy=36;
  s+=c.n?`<polygon points="${poly(c.n,cx,cy,c.r+1,-90)}" fill="${c.f}" stroke="#6B5A3E" stroke-width="2" stroke-linejoin="round"/>`:`<circle cx="${cx}" cy="${cy}" r="${c.r}" fill="${c.f}" stroke="#6B5A3E" stroke-width="2"/>`;
  if(c.inner)s+=`<circle cx="${cx}" cy="${cy}" r="${c.r-8}" fill="${c.inner}" stroke="#6B5A3E" stroke-width="1"/>`;
  s+=`<text x="${cx}" y="${cy+6}" text-anchor="middle" font-size="${c.r>20?17:13}" font-weight="700" fill="#2B2117">${c.l}</text>`;x+=c.r*2+12}
  return svg(x,74,s,'coins')}

function rulerSvg(start,L,max=15){const u=34,x0=24;let s=`<rect x="${x0-14}" y="74" width="${max*u+28}" height="58" rx="6" class="ruler"/>`;
  for(let i=0;i<=max*10;i++){const x=x0+i*u/10,l=i%10===0?22:i%5===0?15:9;s+=`<line x1="${f1(x)}" y1="74" x2="${f1(x)}" y2="${74+l}" stroke="currentColor" stroke-width="${i%10===0?2:1}"/>`;if(i%10===0)s+=`<text x="${f1(x)}" y="120" text-anchor="middle" font-size="15">${i/10}</text>`}
  s+=`<text x="${x0+max*u-4}" y="128" text-anchor="end" font-size="11">cm</text>`;
  const a=x0+start*u,b=x0+(start+L)*u;
  s+=`<rect x="${f1(a)}" y="30" width="${f1(Math.max(b-a-22,4))}" height="24" class="pencil"/><polygon points="${f1(b-22)},30 ${f1(b)},42 ${f1(b-22)},54" class="tip"/><rect x="${f1(a)}" y="30" width="12" height="24" class="rub"/>`;
  s+=`<line x1="${f1(a)}" y1="56" x2="${f1(a)}" y2="74" stroke="currentColor" stroke-dasharray="3 3"/><line x1="${f1(b)}" y1="44" x2="${f1(b)}" y2="74" stroke="currentColor" stroke-dasharray="3 3"/>`;
  return svg(max*u+52,140,s,'a pencil next to a ruler')}

function angleSvg(th,rot,label){const cx=150,cy=118,L=95,P=(a,r)=>[cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)];
  const [x1,y1]=P(rot,L),[x2,y2]=P(rot+th,L);
  let s=`<line x1="${cx}" y1="${cy}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`;
  if(th===90){const [a1,b1]=P(rot,24),[a2,b2]=P(rot+90,24);s+=`<polyline points="${f1(a1)},${f1(b1)} ${f1(a1+a2-cx)},${f1(b1+b2-cy)} ${f1(a2)},${f1(b2)}" fill="none" class="accs" stroke-width="3"/>`}
  else{const [a1,b1]=P(rot,32),[a2,b2]=P(rot+th,32);s+=`<path d="M${f1(a1)} ${f1(b1)} A32 32 0 ${th>180?1:0} 0 ${f1(a2)} ${f1(b2)}" fill="none" class="accs" stroke-width="3"/>`}
  if(label){const [lx,ly]=P(rot+th/2,56);s+=`<text x="${f1(lx)}" y="${f1(ly+6)}" text-anchor="middle" font-size="18" font-weight="600">${label}</text>`}
  s+=`<circle cx="${cx}" cy="${cy}" r="5" fill="currentColor"/>`;
  return svg(300,236,s,'an angle')}
function seg(cx,cy,a,len){const r=a*Math.PI/180,dx=Math.cos(r)*len/2,dy=Math.sin(r)*len/2;return `<line x1="${f1(cx-dx)}" y1="${f1(cy+dy)}" x2="${f1(cx+dx)}" y2="${f1(cy-dy)}" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`}
/* rays from a point with labelled gaps: angles = list of sizes (sum ≤ 360), labels = text per gap */
function raysSvg(angles,labels,straight){const cx=160,cy=straight?150:120,L=105,P=(a,r)=>[cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)];let s='',a=0;
  const rays=[0];angles.forEach(t=>{a+=t;rays.push(a)});
  rays.forEach(t=>{if(t>=360)return;const [x,y]=P(t,L);s+=`<line x1="${cx}" y1="${cy}" x2="${f1(x)}" y2="${f1(y)}" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`});
  if(straight){const [x,y]=P(180,L);s+=`<line x1="${cx}" y1="${cy}" x2="${f1(x)}" y2="${f1(y)}" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`}
  let b=0;angles.forEach((t,i)=>{const [lx,ly]=P(b+t/2,t<40?78:58);s+=`<text x="${f1(lx)}" y="${f1(ly+6)}" text-anchor="middle" font-size="17" font-weight="600" ${labels[i]==='?'?'class="acc"':''}>${labels[i]}</text>`;b+=t});
  s+=`<circle cx="${cx}" cy="${cy}" r="5" fill="currentColor"/>`;
  return svg(320,straight?170:240,s,'angles')}
function compassSvg(dir){const A={North:0,East:90,South:180,West:270}[dir]*Math.PI/180;
  let s=`<circle cx="120" cy="115" r="78" class="face"/>`;
  [['N',120,28],['E',214,122],['S',120,214],['W',26,122]].forEach(([t,x,y])=>s+=`<text x="${x}" y="${y}" text-anchor="middle" font-size="22" font-weight="700">${t}</text>`);
  const tx=120+60*Math.sin(A),ty=115-60*Math.cos(A);
  s+=`<line x1="120" y1="115" x2="${f1(tx)}" y2="${f1(ty)}" class="accs" stroke-width="7" stroke-linecap="round"/><circle cx="${f1(tx)}" cy="${f1(ty)}" r="9" class="acc"/><circle cx="120" cy="115" r="6" fill="currentColor"/>`;
  return svg(240,230,s,'compass showing which way you face')}
function arrowSvg(deg){const s=`<g transform="rotate(${deg} 80 80)"><line x1="80" y1="130" x2="80" y2="40" class="accs" stroke-width="12" stroke-linecap="round"/><path d="M80 18 L104 52 H56 Z" class="acc"/></g>`;return svg(160,160,s,'an arrow')}

function barSvg(cats,vals,step,title,blocks){const W=540,L=56,B=250,T=34,ph=B-T,bw=(W-L-14)/cats.length;let s='';
  for(let i=0;i<=10;i++){const y=B-i*ph/10;s+=`<line x1="${L}" y1="${f1(y)}" x2="${W-10}" y2="${f1(y)}" class="grid"/><text x="${L-8}" y="${f1(y+5)}" text-anchor="end" font-size="14">${i*step}</text>`}
  cats.forEach((c,i)=>{const h=vals[i]/(step*10)*ph,x=L+i*bw+bw*.2;
    if(blocks){const n=vals[i]/step,bh=ph/10;for(let j=0;j<n;j++)s+=`<rect x="${f1(x)}" y="${f1(B-(j+1)*bh)}" width="${f1(bw*.6)}" height="${f1(bh)}" class="bar" stroke="var(--card)" stroke-width="2"/>`}
    else s+=`<rect x="${f1(x)}" y="${f1(B-h)}" width="${f1(bw*.6)}" height="${f1(h)}" class="bar"/>`;
    s+=`<text x="${f1(L+i*bw+bw/2)}" y="${B+24}" text-anchor="middle" font-size="15">${c}</text>`});
  s+=`<line x1="${L}" y1="${T-8}" x2="${L}" y2="${B}" stroke="currentColor" stroke-width="2"/><line x1="${L}" y1="${B}" x2="${W-10}" y2="${B}" stroke="currentColor" stroke-width="2"/>`;
  s+=`<text x="${W/2+20}" y="18" text-anchor="middle" font-size="17" font-weight="600">${title}</text>`;
  return svg(W,284,s,blocks?'block diagram':'bar chart')}
function lineSvg(labels,vals,step,title){const W=540,L=56,B=250,T=34,ph=B-T,gx=(W-L-30)/(labels.length-1);let s='';
  for(let i=0;i<=10;i++){const y=B-i*ph/10;s+=`<line x1="${L}" y1="${f1(y)}" x2="${W-10}" y2="${f1(y)}" class="grid"/><text x="${L-8}" y="${f1(y+5)}" text-anchor="end" font-size="14">${i*step}</text>`}
  const pts=vals.map((v,i)=>[L+15+i*gx,B-v/(step*10)*ph]);
  labels.forEach((l,i)=>s+=`<text x="${f1(pts[i][0])}" y="${B+24}" text-anchor="middle" font-size="14">${l}</text>`);
  s+=`<polyline points="${pts.map(p=>p.map(f1).join(',')).join(' ')}" fill="none" class="accs" stroke-width="4" stroke-linejoin="round"/>`;
  pts.forEach(p=>s+=`<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="6" class="acc"/>`);
  s+=`<line x1="${L}" y1="${T-8}" x2="${L}" y2="${B}" stroke="currentColor" stroke-width="2"/><line x1="${L}" y1="${B}" x2="${W-10}" y2="${B}" stroke="currentColor" stroke-width="2"/>`;
  s+=`<text x="${W/2+20}" y="18" text-anchor="middle" font-size="17" font-weight="600">${title}</text>`;
  return svg(W,284,s,'line graph')}
const PIECOL=['var(--c-num)','var(--c-meas)','var(--c-stat)','var(--c-add)','var(--c-frac)','var(--c-geo)'];
function pieSvg(cats,parts,total,title){let s=`<text x="250" y="20" text-anchor="middle" font-size="17" font-weight="600">${title}</text>`,a=-Math.PI/2;const cx=130,cy=150,r=110;
  parts.forEach((p,i)=>{const t=p/total*2*Math.PI,b=a+t;s+=`<path d="M${cx} ${cy} L${f1(cx+r*Math.cos(a))} ${f1(cy+r*Math.sin(a))} A${r} ${r} 0 ${t>Math.PI?1:0} 1 ${f1(cx+r*Math.cos(b))} ${f1(cy+r*Math.sin(b))} Z" fill="${PIECOL[i]}" stroke="var(--card)" stroke-width="3"/>`;a=b});
  cats.forEach((c,i)=>s+=`<rect x="270" y="${60+i*34}" width="22" height="22" rx="4" fill="${PIECOL[i]}"/><text x="302" y="${77+i*34}" font-size="17">${c}</text>`);
  return svg(480,270,s,'pie chart')}
function pictoSvg(cats,vals,k,title,unit='children'){const rowH=46,L=118;let s=`<text x="210" y="20" text-anchor="middle" font-size="17" font-weight="600">${title}</text>`;
  cats.forEach((c,i)=>{const y=34+i*rowH;s+=`<text x="${L-14}" y="${y+29}" text-anchor="end" font-size="16">${c}</text><line x1="${L}" y1="${y}" x2="${L}" y2="${y+rowH}" stroke="currentColor" stroke-width="2"/>`;
    let n=vals[i]/k,x=L+24;while(n>=1-1e-9){s+=`<circle cx="${x}" cy="${y+23}" r="15" class="bar"/>`;x+=38;n-=1}
    if(n>1e-9)s+=`<path d="M${x} ${y+8} A15 15 0 0 0 ${x} ${y+38} Z" class="bar"/>`;
    s+=`<line x1="10" y1="${y+rowH}" x2="410" y2="${y+rowH}" class="grid"/>`});
  const ky=34+cats.length*rowH+30;
  s+=`<circle cx="${L+24}" cy="${ky}" r="15" class="bar"/><text x="${L+48}" y="${ky+6}" font-size="17" font-weight="600">= ${k} ${k===1?unit.replace(/ren$/,'').replace(/s$/,''):unit}</text>`;
  return svg(420,ky+26,s,'pictogram')}
function tallyMarks(v,x0,y0){let s='',x=x0;const g=Math.floor(v/5),r=v%5,ln=(x)=>`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+26}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
  for(let i=0;i<g;i++){for(let j=0;j<4;j++)s+=ln(x+j*8);s+=`<line x1="${x-5}" y1="${y0+21}" x2="${x+29}" y2="${y0+5}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;x+=46}
  for(let j=0;j<r;j++)s+=ln(x+j*8);return s}
function tallyTable(cats,vals,title){return `<table class="dtable"><caption>${title}</caption><tr><th>Choice</th><th>Tally</th></tr>${cats.map((c,i)=>`<tr><td>${c}</td><td><svg width="190" height="32" viewBox="0 0 190 32" style="color:var(--ink)" role="img" aria-label="tally marks">${tallyMarks(vals[i],8,3)}</svg></td></tr>`).join('')}</table>`}
function colVis(a,b,op,res){const L=Math.max(String(a).length,String(b).length,String(res).length);const cells=n=>String(n).padStart(L,' ').split('').map(c=>`<span>${c.trim()}</span>`).join('');
  return `<div style="text-align:center"><div class="colsum" style="--n:${L+1}"><div class="crow"><span></span>${cells(a)}</div><div class="crow"><span>${op}</span>${cells(b)}</div><div class="crow ans"><span></span>${'<span>?</span>'.repeat(L)}</div></div></div>`}
function frames(n,total){total=total||Math.max(10,Math.ceil(n/10)*10);const fc=total/10,c=34;let s='';
  for(let f=0;f<fc;f++){const ox=10+f*(5*c+18);for(let i=0;i<10;i++){const x=ox+(i%5)*c,y=10+Math.floor(i/5)*c;s+=`<rect x="${x}" y="${y}" width="${c}" height="${c}" class="un" style="stroke-width:2"/>`;if(f*10+i<n)s+=`<circle cx="${x+c/2}" cy="${y+c/2}" r="12" class="acc"/>`}}
  return svg(20+fc*(5*c+18)-18,2*c+20,s,'ten frame')}
function blocks(h,t,o){const u=9;let s='',x=10;const grid=(x,y,w,hh,cols,rows)=>{let g='';for(let i=1;i<cols;i++)g+=`<line x1="${x+i*u}" y1="${y}" x2="${x+i*u}" y2="${y+hh}" stroke="currentColor" stroke-width="1"/>`;for(let j=1;j<rows;j++)g+=`<line x1="${x}" y1="${y+j*u}" x2="${x+w}" y2="${y+j*u}" stroke="currentColor" stroke-width="1"/>`;return g};
  for(let i=0;i<h;i++){s+=`<rect x="${x}" y="10" width="${u*10}" height="${u*10}" class="sh" style="stroke-width:1.5"/>`+grid(x,10,u*10,u*10,10,10);x+=u*10+10}
  for(let i=0;i<t;i++){s+=`<rect x="${x}" y="10" width="${u}" height="${u*10}" class="sh" style="stroke-width:1.5"/>`+grid(x,10,u,u*10,1,10);x+=u+7}
  x+=8;for(let i=0;i<o;i++){const col=Math.floor(i/5),row=i%5;s+=`<rect x="${x+col*(u+5)}" y="${10+u*10-(row+1)*(u+5)+5}" width="${u}" height="${u}" class="sh" style="stroke-width:1.5"/>`}
  return svg(x+Math.ceil(o/5)*(u+5)+10,u*10+20,s,'place value blocks')}
function arraySvg(r,c){let s='';for(let i=0;i<r;i++)for(let j=0;j<c;j++)s+=`<circle cx="${22+j*32}" cy="${22+i*32}" r="11" class="acc"/>`;return svg(c*32+12,r*32+12,s,'array of dots')}
function coordSvg(pts,negq){const lo=negq?-6:0,hi=negq?6:10,c=negq?24:26,o=30,N=hi-lo,X=x=>o+(x-lo)*c,Y=y=>o+(hi-y)*c;let s='';
  for(let i=lo;i<=hi;i++){s+=`<line x1="${X(i)}" y1="${Y(lo)}" x2="${X(i)}" y2="${Y(hi)}" class="grid"/><line x1="${X(lo)}" y1="${Y(i)}" x2="${X(hi)}" y2="${Y(i)}" class="grid"/>`;
    if(i!==0||!negq){s+=`<text x="${X(i)}" y="${(negq?Y(0):Y(lo))+16}" text-anchor="middle" font-size="11">${neg(i)}</text>`;if(i!==0)s+=`<text x="${(negq?X(0):X(lo))-6}" y="${Y(i)+4}" text-anchor="end" font-size="11">${neg(i)}</text>`}}
  const ax=negq?0:lo;s+=`<line x1="${X(lo)}" y1="${Y(ax)}" x2="${X(hi)+8}" y2="${Y(ax)}" stroke="currentColor" stroke-width="2.5"/><line x1="${X(ax)}" y1="${Y(lo)}" x2="${X(ax)}" y2="${Y(hi)-8}" stroke="currentColor" stroke-width="2.5"/>`;
  s+=`<text x="${X(hi)+14}" y="${Y(ax)+5}" font-size="14" font-style="italic">x</text><text x="${X(ax)}" y="${Y(hi)-14}" text-anchor="middle" font-size="14" font-style="italic">y</text>`;
  pts.forEach(([x,y,l])=>s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="6" class="acc"/><text x="${X(x)+9}" y="${Y(y)-8}" font-size="16" font-weight="700">${l}</text>`);
  return svg(N*c+2*o+10,N*c+2*o,s,'coordinate grid')}
function thermoSvg(t,lo,hi,step){const top=24,bot=244,Y=v=>bot-(v-lo)/(hi-lo)*(bot-top);let s=`<rect x="70" y="${top-10}" width="28" height="${bot-top+20}" rx="14" class="face"/><circle cx="84" cy="${bot+26}" r="22" fill="var(--c-num)" stroke="currentColor" stroke-width="3"/>`;
  s+=`<rect x="77" y="${f1(Y(t))}" width="14" height="${f1(bot+10-Y(t))}" fill="var(--c-num)"/>`;
  for(let v=lo;v<=hi;v+=step){s+=`<line x1="98" y1="${f1(Y(v))}" x2="${(v/step)%2===0||step>=5?116:108}" y2="${f1(Y(v))}" stroke="currentColor" stroke-width="2"/>`;if((v-lo)%(step*2)===0)s+=`<text x="124" y="${f1(Y(v)+5)}" font-size="14">${neg(v)}</text>`}
  s+=`<text x="40" y="${top+4}" font-size="14" text-anchor="middle">°C</text>`;
  return svg(180,280,s,'thermometer')}
function cuboidSvg(l,w,h,cubes,labs){const u=Math.min(30,230/(l+w*.6),150/(h+w*.5)),dx=u*.6,dy=u*.5,x0=40,y0=20+w*dy;let s='';
  const F=(pts,c)=>`<polygon points="${pts.map(p=>p.map(f1).join(',')).join(' ')}" class="${c}"/>`;const L=(a,b,c,d)=>`<line x1="${f1(a)}" y1="${f1(b)}" x2="${f1(c)}" y2="${f1(d)}" stroke="currentColor" stroke-width="1.2"/>`;
  s+=F([[x0,y0],[x0+l*u,y0],[x0+l*u,y0+h*u],[x0,y0+h*u]],'shp');
  s+=F([[x0,y0],[x0+l*u,y0],[x0+l*u+w*dx,y0-w*dy],[x0+w*dx,y0-w*dy]],'shp2');
  s+=F([[x0+l*u,y0],[x0+l*u+w*dx,y0-w*dy],[x0+l*u+w*dx,y0+h*u-w*dy],[x0+l*u,y0+h*u]],'shp3');
  if(cubes){for(let i=1;i<l;i++){s+=L(x0+i*u,y0,x0+i*u,y0+h*u)+L(x0+i*u,y0,x0+i*u+w*dx,y0-w*dy)}for(let j=1;j<h;j++){s+=L(x0,y0+j*u,x0+l*u,y0+j*u)+L(x0+l*u,y0+j*u,x0+l*u+w*dx,y0+j*u-w*dy)}
    for(let k=1;k<w;k++){s+=L(x0+k*dx,y0-k*dy,x0+l*u+k*dx,y0-k*dy)+L(x0+l*u+k*dx,y0-k*dy,x0+l*u+k*dx,y0+h*u-k*dy)}}
  if(labs){s+=`<text x="${f1(x0+l*u/2)}" y="${f1(y0+h*u+22)}" text-anchor="middle" font-size="16">${labs[0]}</text><text x="${x0-8}" y="${f1(y0+h*u/2+5)}" text-anchor="end" font-size="16">${labs[2]}</text><text x="${f1(x0+l*u+w*dx/2+10)}" y="${f1(y0+h*u-w*dy/2+12)}" font-size="16">${labs[1]}</text>`}
  return svg(f1(x0+l*u+w*dx+70),f1(y0+h*u+34),s,'cuboid')}
function shape3dSvg(name){const dash='stroke="currentColor" stroke-width="2" stroke-dasharray="6 5" fill="none"';
  if(name==='cube')return cuboidSvg(3,3,3);if(name==='cuboid')return cuboidSvg(5,2,3);
  let s;if(name==='sphere')s=`<circle cx="110" cy="105" r="82" class="shp"/><path d="M28 105 A82 22 0 0 0 192 105" fill="none" stroke="currentColor" stroke-width="2"/><path d="M28 105 A82 22 0 0 1 192 105" ${dash}/>`;
  else if(name==='cylinder')s=`<path d="M50 50 V165 A60 18 0 0 0 170 165 V50" class="shp"/><path d="M50 165 A60 18 0 0 1 170 165" ${dash}/><ellipse cx="110" cy="50" rx="60" ry="18" class="shp2"/>`;
  else if(name==='cone')s=`<path d="M110 20 L50 168 A60 18 0 0 0 170 168 Z" class="shp"/><path d="M50 168 A60 18 0 0 1 170 168" ${dash}/>`;
  else if(name==='square-based pyramid')s=`<polygon points="40,170 150,170 115,25" class="shp"/><polygon points="150,170 190,135 115,25" class="shp3"/><path d="M40 170 L80 135 L190 135 M80 135 L115 25" ${dash}/>`;
  else s=`<polygon points="40,170 120,170 80,100" class="shp"/><polygon points="120,170 190,130 150,60 80,100" class="shp3"/><path d="M40 170 L110 130 L190 130 M110 130 L150 60" ${dash}/><line x1="40" y1="170" x2="80" y2="100" stroke="currentColor" stroke-width="3"/>`;
  return svg(220,200,s,'a 3-D shape')}
const SHAPES=[['triangle',3],['square',4],['rectangle',4],['pentagon',5],['hexagon',6],['heptagon',7],['octagon',8],['circle',0],['semi-circle',-1]];
function shapeSvg(name,n){let s;const jit=n>=5&&Math.random()<.5?range(1,n).map(()=>.72+Math.random()*.28):null;
  if(name==='circle')s=`<circle cx="130" cy="110" r="85" class="shp"/>`;
  else if(name==='semi-circle')s=`<path d="M40 150 A90 90 0 0 1 220 150 Z" class="shp"/>`;
  else if(name==='rectangle'){const r=R(-20,20);s=`<rect x="40" y="60" width="180" height="100" class="shp" transform="rotate(${r} 130 110)"/>`}
  else if(name==='triangle'){s=`<polygon points="${R(20,90)},${R(170,195)} ${R(170,240)},${R(160,195)} ${R(60,200)},${R(20,60)}" class="shp"/>`}
  else if(name==='square'){s=`<polygon points="${poly(4,130,110,88,R(0,89))}" class="shp"/>`}
  else s=`<polygon points="${poly(n,130,110,90,R(0,359),jit)}" class="shp"/>`;
  return svg(260,220,s,'a 2-D shape')}
const QUADS={square:'60,40 180,40 180,160 60,160',rectangle:'20,60 240,60 240,160 20,160',rhombus:'130,40 220,100 130,160 40,100',parallelogram:'70,50 230,50 190,160 30,160',trapezium:'80,50 180,50 230,160 30,160',kite:'130,25 200,85 130,185 60,85'};
const quadSvg=n=>svg(260,210,`<polygon points="${QUADS[n]}" class="shp" transform="rotate(${R(-25,25)} 130 105)"/>`,'a quadrilateral');
function rectLab(w,h,u){const sc=Math.min(300/w,150/h),W=w*sc,H=h*sc,x=(420-W)/2-20,y=34;
  return svg(440,H+56,`<rect x="${f1(x)}" y="${y}" width="${f1(W)}" height="${f1(H)}" class="shp"/><text x="${f1(x+W/2)}" y="${y-10}" text-anchor="middle" font-size="18">${w} ${u}</text><text x="${f1(x+W+10)}" y="${f1(y+H/2+6)}" font-size="18">${h} ${u}</text>`,'rectangle')}
function gridPoly(pts,W,H,label){const c=30,o=c;let s='';
  for(let i=0;i<=W+2;i++)s+=`<line x1="${i*c}" y1="0" x2="${i*c}" y2="${(H+2)*c}" class="grid"/>`;for(let j=0;j<=H+2;j++)s+=`<line x1="0" y1="${j*c}" x2="${(W+2)*c}" y2="${j*c}" class="grid"/>`;
  s+=`<polygon points="${pts.map(([a,b])=>`${o+a*c},${o+b*c}`).join(' ')}" class="shp"/>`;return svg((W+2)*c,(H+2)*c,s,label||'shape on squared paper')}
function lShape(){const W=R(4,8),H=R(3,6),cut=Math.random()<.7,cw=R(1,W-2),ch=R(1,H-2);
  return {W,H,pts:cut?[[0,0],[W-cw,0],[W-cw,ch],[W,ch],[W,H],[0,H]]:[[0,0],[W,0],[W,H],[0,H]],area:W*H-(cut?cw*ch:0),perim:2*(W+H)}}

/* ---------- shared question makers ---------- */
const tw=(h,m)=>{const nx=h%12+1;if(m===0)return `${h} o'clock`;if(m===15)return `quarter past ${h}`;if(m===30)return `half past ${h}`;if(m===45)return `quarter to ${nx}`;if(m<30)return `${m} minutes past ${h}`;return `${60-m} minutes to ${nx}`};
const dig=(H,M)=>`${H}:${pad(M)}`;
const MONTHS=[['January',31],['February',28],['March',31],['April',30],['May',31],['June',30],['July',31],['August',31],['September',30],['October',31],['November',30],['December',31]];
const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const DIRS=['North','East','South','West'];
const ITEMS=['comic','pencil case','yo-yo','book','sandwich','toy car','skipping rope','kite','ball'];

function tableQ(n,max=12,min=1){const a=R(min,max),p=a*n,f=R(0,3);const why=a>0?`Count in ${n}s: ${range(1,a).map(i=>i*n).join(', ')}. So ${a} × ${n} = ${p}.`:`Anything multiplied by 0 is 0.`;
  if(f===0)return num(big(`${a} × ${n} = ${BL}`),p,{why});if(f===1)return num(big(`${n} × ${a} = ${BL}`),p,{why});
  if(a===0)return num(big(`${n} × ${a} = ${BL}`),p,{why});
  if(f===2)return num(big(`${p} ÷ ${n} = ${BL}`),a,{why:`${a} × ${n} = ${p}, so ${p} ÷ ${n} = ${a}.`});
  return num(big(`${BL} × ${n} = ${p}`),a,{why:`${a} × ${n} = ${p}.`})}
function mental(sub,places,lo,hi){const place=pick(places),pi=Math.round(Math.log10(place)),dd=R(1,9),d=dd*place;const a=sub?R(Math.max(lo,d),hi):R(lo,hi-d);const ans=sub?a-d:a+d;
  const pn=PLN[pi],next=PL1[pi+1],dg=Math.floor(a/place)%10;let ex='';
  if(!sub&&dg+dd>=10)ex=` There are more than 9 ${pn}, so exchange 10 ${pn} for 1 ${next}.`;if(sub&&dg<dd&&a>=place*10)ex=` There are not enough ${pn}, so exchange 1 ${next} for 10 ${pn}.`;
  return num(big(`${cm(a)} ${sub?'−':'+'} ${cm(d)} = ${BL}`),ans,{why:`${sub?'Take away':'Add'} ${dd} ${dd===1?PL1[pi]:pn}.${ex} ${cm(a)} ${sub?'−':'+'} ${cm(d)} = ${cm(ans)}.`})}
function colAddWhy(a,b){const A=digs(a),B=digs(b),n=Math.max(String(a).length,String(b).length),out=[];let c=0;
  for(let i=0;i<n;i++){const t=A[i]+B[i]+c;out.push(`${cap(PLN[i])}: ${A[i]} + ${B[i]}${c?' + 1':''} = ${t}${t>=10&&i<n-1?` → write ${t%10}, carry 1`:''}`);c=t>=10?1:0}return out.join('<br>')}
function colSubWhy(a,b){const A=digs(a),B=digs(b),n=String(a).length,out=[];
  for(let i=0;i<n;i++){if(i===n-1&&A[i]-B[i]===0&&B[i]===0)break;if(A[i]<B[i]){out.push(`${cap(PLN[i])}: ${A[i]} is less than ${B[i]}, so exchange 1 ${PL1[i+1]} for 10 ${PLN[i]}. ${A[i]+10} − ${B[i]} = ${A[i]+10-B[i]}`);A[i+1]--}else out.push(`${cap(PLN[i])}: ${A[i]} − ${B[i]} = ${A[i]-B[i]}`)}
  return out.join('<br>')+`<br>Check: ${a-b} + ${b} = ${a}`}
function columnQ(op,da,db){if(op==='+'){let a,b;do{a=rnd(da);b=rnd(db)}while(String(a+b).length>Math.max(da,db)+(da>=4?1:0));return num('Work out the answer. Start with the ones.',a+b,{vis:colVis(a,b,'+',a+b),why:colAddWhy(a,b)})}
  const a=nz(da);let b;do{b=rnd(db)}while(b>=a-10);return num('Work out the answer. Start with the ones.',a-b,{vis:colVis(a,b,'−',a-b),why:colSubWhy(a,b)})}
function compareQ(lo,hi){const a=R(lo,hi);let b;const k=Math.random(),s=String(a);
  if(k<.1)b=a;else if(k<.45&&s.length>=2){const t=s.split(''),i=R(1,t.length-1),j=i===t.length-1?i-1:i+1;[t[i],t[j]]=[t[j],t[i]];b=+t.join('');if(b<lo||b===a)b=R(lo,hi)}
  else if(k<.75){const p=10**Math.max(1,s.length-2);b=Math.min(hi,Math.max(lo,Math.floor(a/p)*p+R(0,p-1)))}else b=R(lo,hi);
  const sg=a<b?'<':a>b?'>':'=';
  return mc(`Which sign goes in the box?<br>${big(`${cm(a)} ${BL} ${cm(b)}`)}`,sg,['<','>','='],{keep:true,why:sg==='='?'They are the same number.':`${cm(Math.max(a,b))} is greater than ${cm(Math.min(a,b))}. The open side of the sign always faces the bigger number.`})}
function orderQ(lo,hi){const base=R(lo,hi),set=new Set([base]),s=String(base).split('');let t=0;
  while(set.size<4&&t<60){t++;let v;if(Math.random()<.5&&s.length>1){const p=shuffle(s);if(p[0]==='0')continue;v=+p.join('')}else{const p=10**R(0,Math.max(0,s.length-2));v=base+(Math.random()<.5?1:-1)*R(1,9)*p}if(v>=lo&&v<=hi)set.add(v)}
  while(set.size<4)set.add(R(lo,hi));const opts=[...set],most=Math.random()<.5,ans=most?Math.max(...opts):Math.min(...opts);
  return mc(`Which number is the <b>${most?'greatest':'smallest'}</b>?`,cm(ans),opts.map(cm),{why:`Compare the digits from the left: the biggest place value first. ${cm(ans)} is the ${most?'greatest':'smallest'}.`})}
function countQ(steps,o={}){const step=pick(steps);let start=o.start?o.start(step):step*R(o.lo??0,o.hi??8);const back=o.back??(Math.random()<.35);
  let seq=range(0,4).map(i=>start+i*step);if(back)seq.reverse();const m=R(1,4);
  return num(`Count in <b>${step}s</b>. What is the missing number?<br>${big(seq.map((x,i)=>i===m?BL:neg(x)).join(', '))}`,seq[m],{why:`Each number is ${step} ${back?'less':'more'} than the one before it.`})}
function pvQ(d){const n=R(10**(d-1),10**d-1),s=String(n),L=s.length,pv=i=>10**(L-1-i);return alt(
  ()=>{let p;do{p=R(0,L-1)}while(s[p]==='0');const dd=+s[p],v=dd*pv(p);const shown=cm(n).split('');let k=-1;const html=shown.map(c=>{if(/\d/.test(c)){k++;return k===p?`<span class="hl">${c}</span>`:c}return c}).join('');
    return mc(`What is the <b>${dd}</b> worth in this number?<br>${big(html)}`,cm(v),[dd*pv(p)/10,dd*pv(p)*10,dd*pv(p)*100,dd].filter(x=>x!==v&&x>=1&&Number.isInteger(x)).map(cm),{why:`The ${dd} is in the <b>${PLN[L-1-p]}</b> column, so it is worth ${cm(v)}.`})},
  ()=>{const parts=s.split('').map((c,i)=>+c*pv(i));const nzp=parts.map((x,i)=>i).filter(i=>parts[i]>0);const m=pick(nzp);
    return num(`Fill in the missing number.<br>${big(`${cm(n)} = ${nzp.map(i=>i===m?BL:cm(parts[i])).join(' + ')}`)}`,parts[m],{why:`Split ${cm(n)} into its place values: ${nzp.map(i=>cm(parts[i])).join(' + ')}.`})},
  ()=>{const parts=s.split('').map((c,i)=>[+c,i]).filter(([c])=>c>0);return num(`What number is made from <b>${parts.map(([c,i])=>`${c} ${c===1?PL1[L-1-i]:PLN[L-1-i]}`).join('</b>, <b>')}</b>?`,n,{why:`${parts.map(([c,i])=>cm(c*pv(i))).join(' + ')} = ${cm(n)}.`})})}
function roundQ(lo,hi,tos){const n=R(lo,hi),to=pick(tos.filter(t=>t*10<=hi*1.01)),ans=Math.round(n/to)*to,ti=Math.round(Math.log10(to)),nd=Math.floor(n/(to/10))%10;
  return num(`Round ${big(cm(n))} to the nearest <b>${cm(to)}</b>.`,ans,{why:`Look at the ${PLN[ti-1]} digit: it is ${nd}. ${nd>=5?'5 or more, so round up':'Less than 5, so round down'}. ${cm(n)} rounds to ${cm(ans)}.`})}
function fshadeQ(dlo,dhi,dens){const d=dens?pick(dens):R(dlo,dhi),k=R(1,d-1);const wr=[fr(d-k,d),fr(k,d+1),fr(k,d-k),fr(d,k)].filter((x,i)=>!(i===2&&d-k===k));
  return mc('What fraction of the shape is shaded?',fr(k,d),wr,{vis:fshape(k,d,Math.random()<.5?'bar':'circle'),why:`There are ${d} equal parts and ${k} ${k>1?'are':'is'} shaded, so ${fr(k,d)} is shaded.`})}
function fofQ(dens,mlo,mhi,nonUnit){const d=pick(dens),m=R(mlo,mhi),n=d*m,k=nonUnit&&d>2&&Math.random()<.6?R(2,d-1):1;
  return num(`What is ${fr(k,d)} of ${big(cm(n))}?`,k*m,{why:`Divide ${cm(n)} into ${d} equal groups: ${cm(n)} ÷ ${d} = ${m}. That is ${fr(1,d)}.${k>1?` For ${fr(k,d)}, take ${k} groups: ${m} × ${k} = ${k*m}.`:''}`})}
function clockQ(level){const roman=level>=3&&Math.random()<.25,h=R(1,12);let m;
  if(level===1)m=pick([0,30]);else if(level===2)m=Math.random()<.5?pick([0,15,30,45]):R(0,11)*5;else m=Math.random()<.2?R(1,59):R(0,11)*5;
  const vis=clockSvg(h,m,roman),hn=h%12+1,hp=(h+10)%12+1;
  const why=`The short hand shows the hour. It has ${m===0?'reached':'gone past'} ${roman?ROM[h%12]+' ('+h+')':h}. The long hand shows the minutes${m===0?': it points to 12, so it is o\'clock':m===30?': it points to 6, so it is half past':`: count round in 5s from the top to get ${m} minutes`}.`;
  if(level===1)return mc('What time does the clock show?',tw(h,m),[tw(h,30-m),tw(hn,m),tw(hp,m)],{vis,why});
  if(m%5===0&&Math.random()<.45)return mc('What time does the clock show?',tw(h,m),[tw(hn,m),tw(hp,m),tw(h,(60-m)%60),tw(h,(m+15)%60)],{vis,why});
  const sw=Math.round(m/5)%12||12;
  return mc('What time does the clock show?',dig(h,m),[dig(hn,m),dig(hp,m),dig(h,(60-m)%60),dig(sw,(h*5)%60),dig(h,(m+5)%60)],{vis,why})}
function coinsQ(pool,klo,khi){const k=R(klo,khi),list=Array.from({length:k},()=>pick(pool)).sort((a,b)=>b-a),t=list.reduce((a,b)=>a+b,0);
  const why=`${list.map(c=>COINS[c].l).join(' + ')} = ${fmt(t)}`;
  if(t<100)return num('How much money is here?',t,{post:'p',vis:coinsSvg(list),why});
  return mc('How much money is here?',fmt(t),[fmt(t+10),fmt(t-10),fmt(t+100),fmt(t-list[list.length-1]),fmt(t+5)].filter(x=>!x.includes('-')),{vis:coinsSvg(list),why:why+'. Remember £1 = 100p.'})}

const SETS=[['Favourite fruit','fruit',['Apples','Bananas','Grapes','Pears','Kiwis']],['Favourite ice cream','flavour',['Vanilla','Chocolate','Mint','Strawberry','Toffee']],['How Class 3 get to school','way to travel',['Walk','Car','Bus','Bike','Scooter']],['Favourite sport','sport',['Football','Netball','Swim','Tennis','Dance']],['Favourite colour','colour',['Red','Blue','Green','Yellow','Purple']]];
function statSet(){const g=pick(SETS),n=Math.random()<.5?4:5;return {title:g[0],noun:g[1],cats:shuffle(g[2]).slice(0,n)}}
function statQ(S,vals,vis,how,simple){const n=S.cats.length,i=R(0,n-1);let j;do{j=R(0,n-1)}while(j===i);const a=S.cats[i],b=S.cats[j],va=vals[i],vb=vals[j],f=R(0,simple?3:4);
  if(f<=1)return num(`How many children chose <b>${a}</b>?`,va,{vis,why:how(i)});
  if(f===2){const [x,y,vx,vy]=va>=vb?[a,b,va,vb]:[b,a,vb,va];return num(`How many <b>more</b> children chose <b>${x}</b> than <b>${y}</b>?`,vx-vy,{vis,why:`${x}: ${vx}. ${y}: ${vy}. ${vx} − ${vy} = ${vx-vy}.`})}
  if(f===4)return num(`How many children chose <b>${a}</b> or <b>${b}</b> altogether?`,va+vb,{vis,why:`${a}: ${va}. ${b}: ${vb}. ${va} + ${vb} = ${va+vb}.`});
  const most=Math.random()<.5,idx=vals.indexOf(most?Math.max(...vals):Math.min(...vals));
  return mc(`Which ${S.noun} was chosen by the <b>${most?'most':'fewest'}</b> children?`,S.cats[idx],S.cats,{vis,why:`${S.cats[idx]} has the ${most?'biggest':'smallest'} number: ${vals[idx]}.`})}
function barQ(steps,blocksStyle){const S=statSet(),step=pick(steps),vals=shuffle(range(1,10)).slice(0,S.cats.length).map(v=>v*step);
  return statQ(S,vals,barSvg(S.cats,vals,step,S.title,blocksStyle),i=>blocksStyle?`Count the blocks for ${S.cats[i]}: ${vals[i]}.`:`Go to the top of the ${S.cats[i]} bar and read across to the scale. The scale goes up in ${step}s. It lines up with ${vals[i]}.`,blocksStyle)}
function pictoQ(keys,halves){const S=statSet(),k=pick(keys),half=halves&&k%2===0,unit=half?k/2:k,max=half?12:6,vals=shuffle(range(1,max)).slice(0,S.cats.length).map(u=>u*unit);
  return statQ(S,vals,pictoSvg(S.cats,vals,k,S.title),i=>{const w=Math.floor(vals[i]/k),h=vals[i]%k;return `Each circle is ${k}. ${S.cats[i]} has ${w} whole circle${w===1?'':'s'}${h?` and a half circle`:''}: ${w} × ${k} = ${w*k}${h?`, and half of ${k} is ${k/2}, so ${w*k} + ${k/2} = ${vals[i]}`:''}.`},!halves)}
function tallyQ(lo,hi,simple){const S=statSet(),vals=shuffle(range(lo,hi)).slice(0,S.cats.length);
  return statQ(S,vals,tallyTable(S.cats,vals,S.title),i=>{const g=Math.floor(vals[i]/5),r=vals[i]%5;return `Count the gates of 5 first: ${g} × 5 = ${g*5}${r?`, then ${r} more lines: ${g*5} + ${r} = ${vals[i]}`:''}.`},simple)}
function lineQ(){const times=['9am','10am','11am','12pm','1pm','2pm','3pm'],step=pick([1,2,5]);let v=R(3,6);const vals=times.map(()=>{v=Math.max(1,Math.min(10,v+R(-2,2)));return v*step});
  const vis=lineSvg(times,vals,step,'Temperature in the playground (°C)'),i=R(0,6);let j;do{j=R(0,6)}while(j===i);const f=R(0,2),mxv=Math.max(...vals);
  if(f===2&&vals.filter(x=>x===mxv).length===1){const t=times[vals.indexOf(mxv)];return mc('At what time was it <b>warmest</b>?',t,times,{vis,why:`The highest point on the line is at ${t}: ${mxv}°C.`})}
  if(f===1){const [x,y]=vals[i]>=vals[j]?[i,j]:[j,i];return num(`How much warmer was it at <b>${times[x]}</b> than at <b>${times[y]}</b>?`,vals[x]-vals[y],{post:'°C',vis,why:`${times[x]}: ${vals[x]}°C. ${times[y]}: ${vals[y]}°C. ${vals[x]} − ${vals[y]} = ${vals[x]-vals[y]}.`})}
  return num(`What was the temperature at <b>${times[i]}</b>?`,vals[i],{post:'°C',vis,why:`Go up from ${times[i]} to the line, then across to the scale (it goes up in ${step}s): ${vals[i]}°C.`})}

/* ---------- registry ---------- */
const MQ={years:{}};
const GLYPH={num:'123',add:'+ −',mul:'× ÷',frac:'½',meas:'cm',mt:'£',geo:'◺',stat:'▁▃▆',ratio:'2:3',alg:'a+b'};
function year(y,info,fn){const Y=Object.assign({y,skills:[]},info);fn((id,strand,name,eg,gen)=>Y.skills.push({id,strand,name,eg,gen,year:y,key:y+':'+id}));MQ.years[y]=Y}
