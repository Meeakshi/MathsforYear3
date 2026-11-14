/* Year 1 — National Curriculum for England */
year(1,{age:'5–6',blurb:'Counting to 100, number bonds, halves and quarters, shapes',strands:[['num','Numbers to 100'],['add','Adding & taking away'],['mul','Groups & sharing'],['frac','Halves & quarters'],['meas','Measuring'],['mt','Money & time'],['geo','Shapes & turns']]},skill=>{
const DIRN=[['up',0],['right',90],['down',180],['left',270]];

/* NUMBER */
skill('countdots','num','Counting','How many dots?',()=>{const n=R(1,20);return num('How many dots are there?',n,{vis:frames(n),why:`Each full frame has 10 dots. Count on from there: there are ${n} dots.`})});
skill('counton','num','Counting on & back','What comes next? 46, 47, 48…',()=>{const back=Math.random()<.35,s=back?R(5,100):R(0,95);const seq=range(0,4).map(i=>back?s-i:s+i);const m=R(1,4);
  return num(`What is the missing number?<br>${big(seq.map((x,i)=>i===m?BL:x).join(', '))}`,seq[m],{why:`We are counting ${back?'backwards':'on'} in ones.`})});
skill('step','num','Counting in 2s, 5s & 10s','2, 4, 6, 8…',()=>countQ([2,5,10],{lo:0,hi:6,back:false}));
skill('onemore','num','One more & one less','What is one more than 39?',()=>{const more=Math.random()<.5,n=more?R(0,99):R(1,100);const ans=more?n+1:n-1;
  return num(`What is <b>one ${more?'more':'less'}</b> than ${big(n)}?`,ans,{why:`One ${more?'more':'less'} means count ${more?'on':'back'} 1: ${ans}.`})});
skill('bigger','num','Bigger & smaller','Which is bigger, 27 or 72?',()=>{let a=R(1,99),b=R(1,99);while(b===a)b=R(1,99);if(Math.random()<.4&&a>9&&a%10!==0){const s=String(a);b=+(s[1]+s[0]);if(b===a)b=a+1}
  const most=Math.random()<.5,ans=most?Math.max(a,b):Math.min(a,b);
  return mc(`Which number is <b>${most?'bigger':'smaller'}</b>?`,ans,[a,b],{keep:true,why:`${Math.max(a,b)} is bigger than ${Math.min(a,b)}. Look at the tens first.`})});
skill('nwords','num','Numbers in words','Which number is “fourteen”?',()=>{const n=R(0,20);const wr=[n+1,n-1,n+10,n>10?n-10:n+2].filter(x=>x>=0&&x<=30);
  return Math.random()<.5?mc(`Which number is <b>“${words(n)}”</b>?`,n,wr):mc(`How do you write ${big(n)} in words?`,cap(words(n)),wr.filter(x=>x<=20).map(x=>cap(words(x))))});
skill('nline1','num','Number lines','Where is the arrow?',()=>{const [s,st]=pick([[0,1],[10,1],[0,2]]),k=R(1,9),v=s+k*st;return num('What number is the arrow pointing to?',v,{vis:nline(s,st,k,i=>st===1?s+i:(i%5===0?s+i*st:null)),why:`Count along the line: the arrow is at ${v}.`})});
skill('tensones1','num','Tens & ones','Count the sticks of ten and the cubes',()=>{const t=R(1,5),o=R(0,9),n=t*10+o;return alt(
  ()=>num('Each stick is 10. Each small cube is 1. How many altogether?',n,{vis:blocks(0,t,o),why:`${t} tens = ${t*10}, and ${o} ones. ${t*10} + ${o} = ${n}.`}),
  ()=>num(`How many <b>tens</b> are in ${big(n)}?`,t,{why:`${n} is ${t} tens and ${o} ones.`}))});

/* ADD & TAKE AWAY */
skill('bond10','add','Number bonds to 10','? + 4 = 10',()=>{const a=R(0,10);return alt(
  ()=>num(`How many more dots make 10?`,10-a,{vis:frames(a,10),why:`There are ${a} dots and ${10-a} empty spaces. ${a} + ${10-a} = 10.`}),
  ()=>num(big(`${a} + ${BL} = 10`),10-a,{why:`${a} and ${10-a} make 10.`}),
  ()=>num(big(`10 − ${a} = ${BL}`),10-a,{why:`${a} + ${10-a} = 10, so 10 − ${a} = ${10-a}.`}))});
skill('bond20','add','Number bonds to 20','13 + ? = 20',()=>{const a=R(0,20);return Math.random()<.5?num(big(`${a} + ${BL} = 20`),20-a,{vis:frames(a,20),why:`${a} + ${20-a} = 20.`}):num(big(`20 − ${a} = ${BL}`),20-a,{why:`${a} + ${20-a} = 20, so 20 − ${a} = ${20-a}.`})});
skill('add20','add','Adding within 20','8 + 5',()=>{const a=R(0,15),b=R(0,20-a);return num(big(`${a} + ${b} = ${BL}`),a+b,{vis:a+b<=20&&Math.random()<.4?frames(a+b,20):undefined,why:`Start at ${Math.max(a,b)} and count on ${Math.min(a,b)}: ${a+b}.`})});
skill('sub20','add','Taking away within 20','15 − 7',()=>{const a=R(1,20),b=R(0,a);return num(big(`${a} − ${b} = ${BL}`),a-b,{why:`Start at ${a} and count back ${b}: ${a-b}.`})});
skill('miss1','add','Missing numbers','7 = ? − 9',()=>{const a=R(1,12),b=R(1,20-a),c=a+b,f=R(0,3);
  if(f===0)return num(big(`${a} + ${BL} = ${c}`),b,{why:`Count on from ${a} to ${c}: ${b}.`});if(f===1)return num(big(`${BL} + ${b} = ${c}`),a,{why:`${c} − ${b} = ${a}.`});
  if(f===2)return num(big(`${c} − ${BL} = ${a}`),b,{why:`${c} − ${b} = ${a}.`});return num(big(`${a} = ${BL} − ${b}`),c,{why:`${a} + ${b} = ${c}, so ${c} − ${b} = ${a}.`})});
skill('story1','add','Story problems','Ducks on a pond',()=>{const n=nm();return alt(
  ()=>{const a=R(3,12),b=R(1,8);return num(`There are <b>${a}</b> ducks on a pond. <b>${b}</b> more ducks come. How many ducks now?`,a+b,{why:`${a} + ${b} = ${a+b}.`})},
  ()=>{const a=R(5,20),b=R(1,a);return num(`${n} has <b>${a}</b> sweets and eats <b>${b}</b>. How many are left?`,a-b,{why:`${a} − ${b} = ${a-b}.`})},
  ()=>{const a=R(2,10),b=R(2,10);return num(`There are <b>${a}</b> red balls and <b>${b}</b> blue balls. How many balls altogether?`,a+b,{why:`${a} + ${b} = ${a+b}.`})},
  ()=>{const a=R(6,20),b=R(1,a-1);return num(`<b>${a}</b> children are in the playground. <b>${b}</b> go inside. How many are still outside?`,a-b,{why:`${a} − ${b} = ${a-b}.`})})});

/* GROUPS & SHARING */
skill('groups1','mul','Counting in groups','How many dots in the rows?',()=>{const c=pick([2,5,10]),r=R(2,c===10?5:6);return num(`There are <b>${r}</b> rows of <b>${c}</b>. How many dots altogether?`,r*c,{vis:arraySvg(r,c),why:`Count in ${c}s: ${range(1,r).map(i=>i*c).join(', ')}.`})});
skill('double1','mul','Doubling','Double 6',()=>{const a=Math.random()<.7?R(1,10):R(1,5)*10;return num(`What is <b>double ${a}</b>?`,2*a,{vis:a<=10?frames(2*a,20):undefined,why:`Double means two lots: ${a} + ${a} = ${2*a}.`})});
skill('share1','mul','Sharing & grouping','Share 10 sweets between 2',()=>{const k=pick([2,5,10]),e=R(1,k===10?3:5),t=k*e;return alt(
  ()=>num(`Share <b>${t}</b> sweets equally between <b>${k}</b> children. How many sweets does each child get?`,e,{why:`${t} shared into ${k} equal groups is ${e} each.`}),
  ()=>{const p=R(2,10);return num(`<b>${2*p}</b> socks are put into pairs (groups of 2). How many pairs?`,p,{why:`Count in 2s up to ${2*p}: there are ${p} pairs.`})})});

/* HALVES & QUARTERS */
skill('halfq','frac','Halves & quarters of shapes','Is it a half or a quarter?',()=>{const d=pick([2,4]),kind=pick(['bar','circle']);return mc('What fraction is shaded?',d===2?'A half':'A quarter',['A half','A quarter'],{keep:true,vis:fshape(1,d,kind),why:`The shape is cut into ${d} equal parts and 1 is shaded. One of ${d} equal parts is ${d===2?'a half':'a quarter'}.`})});
skill('halfof','frac','Half & quarter of a number','Half of 12',()=>{const q=Math.random()<.4,d=q?4:2,n=d*R(1,5);return num(`What is <b>${q?'a quarter':'half'}</b> of ${big(n)}?`,n/d,{vis:frames(n,n>10?20:10),why:`Share ${n} into ${d} equal groups: ${n/d} in each.`})});

/* MEASURING */
skill('longer','meas','Longer, shorter, heavier','Which ribbon is longest?',()=>alt(
  ()=>{const ls=shuffle([3,5,7,9,11]).slice(0,3),labs=['A','B','C'],most=Math.random()<.5;let s='';ls.forEach((l,i)=>{s+=`<text x="10" y="${42+i*50}" font-size="20" font-weight="700">${labs[i]}</text><rect x="40" y="${24+i*50}" width="${l*36}" height="26" rx="6" class="bar"/>`});
    const idx=ls.indexOf(most?Math.max(...ls):Math.min(...ls));return mc(`Which ribbon is the <b>${most?'longest':'shortest'}</b>?`,`Ribbon ${labs[idx]}`,labs.map(l=>`Ribbon ${l}`),{keep:true,vis:svg(460,170,s,'ribbons'),why:`Ribbon ${labs[idx]} is the ${most?'longest':'shortest'}.`})},
  ()=>{const left=Math.random()<.5,t=left?14:-14;const s=`<polygon points="160,190 140,230 180,230" class="shp"/><g transform="rotate(${-t} 160 120)"><line x1="40" y1="120" x2="280" y2="120" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><line x1="60" y1="120" x2="60" y2="150" stroke="currentColor" stroke-width="3"/><line x1="260" y1="120" x2="260" y2="150" stroke="currentColor" stroke-width="3"/><rect x="30" y="150" width="60" height="44" rx="6" class="bar"/><rect x="230" y="150" width="60" height="44" rx="6" class="bar"/><text x="60" y="180" text-anchor="middle" font-size="22" font-weight="700" fill="var(--on)">A</text><text x="260" y="180" text-anchor="middle" font-size="22" font-weight="700" fill="var(--on)">B</text></g><line x1="160" y1="120" x2="160" y2="190" stroke="currentColor" stroke-width="5"/>`;
    return mc('Which box is <b>heavier</b>?',left?'Box A':'Box B',['Box A','Box B'],{keep:true,vis:svg(320,240,s,'balance scale'),why:'The heavier side of a balance goes down.'})},
  ()=>{const [q,a,b]=pick([['heavier','an elephant','a mouse'],['lighter','a feather','a brick'],['longer','a bus','a pencil'],['taller','a giraffe','a cat'],['shorter','a spoon','a door']]);return mc(`Which is <b>${q}</b>?`,cap(a),[cap(a),cap(b)].sort(),{keep:true,why:`${cap(a)} is ${q} than ${b}.`})}));
skill('cubes1','meas','Measuring with cubes','How many cubes long?',()=>{const L=R(3,10),u=36;let s=`<rect x="20" y="20" width="${L*u-22}" height="26" class="pencil"/><polygon points="${20+L*u-22},20 ${20+L*u},33 ${20+L*u-22},46" class="tip"/>`;for(let i=0;i<12;i++)s+=`<rect x="${20+i*u}" y="60" width="${u}" height="${u}" class="${i<L?'shp':'un'}" style="stroke-width:2"/>`;
  return num('How many cubes long is the pencil?',L,{vis:svg(470,110,s,'pencil next to cubes'),why:`The pencil ends at the ${L}${['','st','nd','rd'][L]||'th'} cube, so it is ${L} cubes long.`})});

/* MONEY & TIME */
skill('coins1','mt','Knowing coins','Which coin is this?',()=>alt(
  ()=>{const c=pick([1,2,5,10,20,50,100,200]);return mc('Which coin is this?',COINS[c].l,shuffle(Object.values(COINS).map(x=>x.l)),{vis:coinsSvg([c]),why:`This is the ${COINS[c].l} coin.`})},
  ()=>{const [a,b]=shuffle([1,2,5,10,20,50,100,200]).slice(0,2);return mc('Which coin is worth <b>more</b>?',COINS[Math.max(a,b)].l,[COINS[a].l,COINS[b].l],{keep:true,vis:coinsSvg([a,b]),why:`${COINS[Math.max(a,b)].l} is worth more than ${COINS[Math.min(a,b)].l}. Bigger coins are not always worth more!`})},
  ()=>{const list=Array.from({length:R(2,5)},()=>pick([1,2])).sort((a,b)=>b-a),t=list.reduce((a,b)=>a+b,0);return num('How much money is here?',t,{post:'p',vis:coinsSvg(list),why:`${list.map(c=>c+'p').join(' + ')} = ${t}p.`})}));
skill('clock1','mt','O\'clock & half past','Read the clock',()=>clockQ(1));
skill('days1','mt','Days & months','What comes after Tuesday?',()=>alt(
  ()=>{const i=R(0,6),after=Math.random()<.5,j=(i+(after?1:6))%7;return mc(`Which day comes <b>${after?'after':'before'}</b> ${DAYS[i]}?`,DAYS[j],shuffle(DAYS.filter((d,k)=>k!==i)),{why:`The days go: ${DAYS.join(', ')}.`})},
  ()=>{const i=R(0,11),after=Math.random()<.5,j=(i+(after?1:11))%12;return mc(`Which month comes <b>${after?'after':'before'}</b> ${MONTHS[i][0]}?`,MONTHS[j][0],shuffle(MONTHS.map(m=>m[0]).filter((d,k)=>k!==i)),{why:`${MONTHS[(i+11)%12][0]}, ${MONTHS[i][0]}, ${MONTHS[(i+1)%12][0]}.`})},
  ()=>{const [q,a]=pick([['How many days are in a week?',7],['How many months are in a year?',12],['How many days are in a weekend?',2]]);return num(q,a,{why:`The answer is ${a}.`})},
  ()=>{const [q,a,w]=pick([['Which do you do first in the morning?','Wake up',['Eat lunch','Go to bed']],['Which comes first?','Morning',['Afternoon','Evening']],['Which is the last day of the school week?','Friday',['Monday','Wednesday']]]);return mc(q,a,w,{why:`${a}.`})}));

/* SHAPES & TURNS */
skill('shape2d1','geo','2-D shapes','Circle, triangle, square or rectangle?',()=>{const [name,n]=pick(SHAPES.filter(s=>['triangle','square','rectangle','circle'].includes(s[0])));return alt(
  ()=>mc('What is this shape called?',cap(name),['Circle','Triangle','Square','Rectangle'],{keep:true,vis:shapeSvg(name,n),why:name==='circle'?'It is round with no corners.':`It has ${n} straight sides, so it is a ${name}.`}),
  ()=>n>0?num(`How many sides does this ${name} have?`,n,{vis:shapeSvg(name,n),why:`Count the straight sides: ${n}.`}):num('How many corners does a square have?',4,{why:'A square has 4 corners.'}))});
skill('shape3d1','geo','3-D shapes','Cube, cylinder, cone or sphere?',()=>{const n=pick(['cube','cuboid','sphere','cylinder','cone','square-based pyramid']);return mc('What is this 3-D shape called?',cap(n),shuffle(['Cube','Cuboid','Sphere','Cylinder','Cone','Square-based pyramid'].filter(x=>x!==cap(n))),{vis:shape3dSvg(n),why:{cube:'A cube has 6 square faces.',cuboid:'A cuboid is like a box with rectangle faces.',sphere:'A sphere is round like a ball.',cylinder:'A cylinder is like a tin of beans.',cone:'A cone has a point and a round base.','square-based pyramid':'A pyramid has a square base and triangle sides.'}[n]})});
skill('turns1','geo','Turns','Quarter, half and full turns',()=>{const [s,deg]=pick(DIRN),[tn,k]=pick([['quarter',1],['half',2],['full',4]]),e=DIRN[(DIRN.findIndex(d=>d[0]===s)+k)%4][0];
  return mc(`The arrow points <b>${s}</b>. It makes a <b>${tn} turn</b> clockwise (the way clock hands go). Which way does it point now?`,cap(e),['Up','Right','Down','Left'],{keep:true,vis:arrowSvg(deg),why:`A ${tn} turn is ${k===4?'all the way round, back to the start':k===2?'two quarter turns':'one quarter turn'}. It now points ${e}.`})});
skill('position1','geo','Left, right & position','What is to the left of the star?',()=>{const pool=shuffle(['circle','square','triangle','star']);const draw=(n,x)=>n==='circle'?`<circle cx="${x}" cy="60" r="34" class="shp"/>`:n==='square'?`<rect x="${x-32}" y="28" width="64" height="64" class="shp"/>`:n==='triangle'?`<polygon points="${x},24 ${x-38},94 ${x+38},94" class="shp"/>`:`<polygon points="${starPts(x,62,40)}" class="shp"/>`;
  let s='';pool.forEach((n,i)=>s+=draw(n,60+i*100));const i=R(0,3),left=i===0?false:i===3?true:Math.random()<.5,j=left?i-1:i+1;
  return mc(`Which shape is just to the <b>${left?'left':'right'}</b> of the <b>${pool[i]}</b>?`,cap(pool[j]),pool.filter((_,k)=>k!==i).map(cap),{vis:svg(420,120,s,'a row of shapes'),why:`Find the ${pool[i]}, then look ${left?'left':'right'}: it is the ${pool[j]}.`})});
});
