/* Year 2 — National Curriculum for England */
year(2,{age:'6–7',blurb:'Tens and ones, 2, 5 and 10 times tables, money, time to 5 minutes',strands:[['num','Number & place value'],['add','Adding & subtracting'],['mul','Times tables & sharing'],['frac','Fractions'],['meas','Measuring'],['mt','Money & time'],['geo','Shapes & patterns'],['stat','Charts & tables']]},skill=>{
const DIRN=[['up',0],['right',90],['down',180],['left',270]];

/* NUMBER */
skill('pv2','num','Tens & ones','How many tens in 47?',()=>{const t=R(1,9),o=R(0,9),n=t*10+o;return alt(
  ()=>num('Each stick is 10. Each small cube is 1. What number is shown?',n,{vis:blocks(0,t,o),why:`${t} tens and ${o} ones make ${n}.`}),
  ()=>{const ds=String(n);const tens=Math.random()<.5||o===0;return mc(`What is the <b>${tens?ds[0]:ds[1]}</b> worth in ${big(n)}?`,tens?t*10:o,tens?[t,t*10,t*100]:[o,o*10,o*100],{keep:true,why:`The ${tens?ds[0]+' is in the tens':ds[1]+' is in the ones'} column, so it is worth ${tens?t*10:o}.`})},
  ()=>num(big(`${t*10} + ${o} = ${BL}`),n,{why:`${t} tens and ${o} ones make ${n}.`}),
  ()=>num(big(`${n} = ${BL} + ${o}`),t*10,{why:`${n} is ${t*10} and ${o}.`}))});
skill('compare2','num','< > and =','45 ? 54',()=>compareQ(0,100));
skill('order2','num','Ordering numbers','Smallest of 38, 83, 33, 88',()=>orderQ(10,99));
skill('count2','num','Counting in 2s, 3s, 5s & 10s','35, 40, 45…  and 10s from any number',()=>Math.random()<.3?countQ([10],{start:()=>R(1,50)}):countQ([2,3,5,10],{lo:0,hi:8}));
skill('words2','num','Numbers in words','“sixty-four”',()=>{const n=R(21,99),s=String(n),wr=[+(s[1]+s[0]),n+10,n-10,n+1].filter(x=>x>0&&x<100&&x!==n&&String(x).length===2);
  return Math.random()<.5?mc(`Which number is <b>“${words(n)}”</b>?`,n,wr):mc(`How do you write ${big(n)} in words?`,cap(words(n)),wr.map(x=>cap(words(x))))});
skill('oddeven','num','Odd & even','Is 37 odd or even?',()=>alt(
  ()=>{const n=R(1,99);return mc(`Is ${big(n)} odd or even?`,n%2?'Odd':'Even',['Odd','Even'],{keep:true,why:`Look at the ones digit: ${n%10}. ${n%2?'1, 3, 5, 7 and 9 are odd.':'0, 2, 4, 6 and 8 are even.'}`})},
  ()=>{const ev=Math.random()<.5,ans=2*R(1,49)+(ev?0:1),wr=range(1,3).map(()=>2*R(1,49)+(ev?1:0));return mc(`Which number is <b>${ev?'even':'odd'}</b>?`,ans,wr,{why:`${ans} ends in ${ans%10}, which is ${ev?'even':'odd'}.`})}));
skill('nline2','num','Number lines','Where is the arrow pointing?',()=>{const [s,st]=pick([[0,10],[0,5],[0,2],[20,1],[50,5]]),k=R(1,9),v=s+k*st;return num('What number is the arrow pointing to?',v,{vis:nline(s,st,k),why:`Each jump is worth ${st}. The arrow is ${k} jumps from ${s}: ${v}.`})});

/* ADD & SUBTRACT */
skill('facts20','add','Facts to 20','9 + 6, 15 − 8',()=>{const sub=Math.random()<.5;if(sub){const a=R(5,20),b=R(1,Math.min(10,a));return num(big(`${a} − ${b} = ${BL}`),a-b,{why:`${a-b} + ${b} = ${a}.`})}const a=R(1,10),b=R(1,10);return num(big(`${a} + ${b} = ${BL}`),a+b,{why:a+b>10?`Make 10 first: ${a} + ${10-a} = 10, then add ${b-(10-a)} more: ${a+b}.`:`${a} + ${b} = ${a+b}.`})});
skill('tens2','add','Using facts with tens','3 + 7 = 10, so 30 + 70 = ?',()=>{const a=R(1,9),sub=Math.random()<.4;if(sub){const b=R(1,a);return num(`${a} − ${b} = ${a-b}<br>So what is this?<br>${big(`${a*10} − ${b*10} = ${BL}`)}`,(a-b)*10,{why:`${a} tens − ${b} tens = ${a-b} tens = ${(a-b)*10}.`})}
  const b=R(1,10-a);return num(`${a} + ${b} = ${a+b}<br>So what is this?<br>${big(`${a*10} + ${b*10} = ${BL}`)}`,(a+b)*10,{why:`${a} tens + ${b} tens = ${a+b} tens = ${(a+b)*10}.`})});
skill('add2d1','add','2-digit and ones','34 + 5, 41 − 3',()=>{const sub=Math.random()<.5;if(sub){const a=R(11,99),b=R(1,9);return num(big(`${a} − ${b} = ${BL}`),a-b,{why:`Count back ${b} from ${a}: ${a-b}.`})}const a=R(10,90),b=R(1,Math.min(9,100-a));return num(big(`${a} + ${b} = ${BL}`),a+b,{why:`Count on ${b} from ${a}: ${a+b}.`})});
skill('add2dt','add','2-digit and tens','46 + 30, 72 − 40',()=>mental(Math.random()<.5,[10],10,99));
skill('add2d2','add','Adding & subtracting 2-digit numbers','36 + 47, 82 − 35',()=>{const sub=Math.random()<.45;if(sub){const a=R(30,99),b=R(11,a-5);return num(big(`${a} − ${b} = ${BL}`),a-b,{why:`Take away the tens, then the ones: ${a} − ${Math.floor(b/10)*10} = ${a-Math.floor(b/10)*10}, then − ${b%10} = ${a-b}.`})}
  const a=R(11,80),b=R(11,99-a<11?11:99-a);return num(big(`${a} + ${b} = ${BL}`),a+b,{why:`Add the tens: ${Math.floor(a/10)*10} + ${Math.floor(b/10)*10} = ${(Math.floor(a/10)+Math.floor(b/10))*10}. Add the ones: ${a%10} + ${b%10} = ${a%10+b%10}. Total: ${a+b}.`})});
skill('three2','add','Adding three numbers','4 + 7 + 6',()=>{const a=R(1,9),b=R(1,9),c=R(1,9);return num(big(`${a} + ${b} + ${c} = ${BL}`),a+b+c,{why:`Look for a pair that makes 10, or add two first: ${a} + ${b} = ${a+b}, then + ${c} = ${a+b+c}.`})});
skill('miss2','add','Missing numbers','? + 25 = 60',()=>{const c=R(20,100),a=R(5,c-5),b=c-a,f=R(0,2);
  if(f===0)return num(big(`${a} + ${BL} = ${c}`),b,{why:`Use the inverse: ${c} − ${a} = ${b}.`});if(f===1)return num(big(`${c} − ${BL} = ${a}`),b,{why:`${c} − ${b} = ${a}.`});return num(big(`${BL} − ${b} = ${a}`),c,{why:`Use the inverse: ${a} + ${b} = ${c}.`})});
skill('word2','add','Word problems','Marbles, stickers and buses',()=>{const n=nm();return alt(
  ()=>{const a=R(20,60),b=R(10,39);return num(`${n} has <b>${a}</b> marbles and wins <b>${b}</b> more. How many marbles now?`,a+b,{why:`${a} + ${b} = ${a+b}.`})},
  ()=>{const a=R(30,90),b=R(10,a-5);return num(`A bus has <b>${a}</b> people on it. <b>${b}</b> get off. How many are left on the bus?`,a-b,{why:`${a} − ${b} = ${a-b}.`})},
  ()=>{const a=R(40,99),b=R(10,a-10);return num(`${n} has <b>${a}</b> stickers. Their friend has <b>${b}</b>. How many more stickers does ${n} have?`,a-b,{why:`Find the difference: ${a} − ${b} = ${a-b}.`})})});

/* TIMES TABLES */
skill('t2','mul','2 times table','7 × 2, 16 ÷ 2',()=>tableQ(2));
skill('t5','mul','5 times table','6 × 5, 35 ÷ 5',()=>tableQ(5));
skill('t10','mul','10 times table','8 × 10, 90 ÷ 10',()=>tableQ(10));
skill('arrays2','mul','Arrays','3 rows of 5',()=>{const c=pick([2,5,10]),r=R(2,6);return alt(
  ()=>num('How many dots are there?',r*c,{vis:arraySvg(r,c),why:`${r} rows of ${c}: ${r} × ${c} = ${r*c}.`}),
  ()=>mc('Which number sentence matches the array?',`${r} × ${c}`,[`${r} + ${c}`,`${r} × ${c+1}`,`${r+1} × ${c}`],{vis:arraySvg(r,c),why:`There are ${r} rows with ${c} in each: ${r} × ${c} (or ${c} × ${r}).`}))});
skill('mulword2','mul','Sharing & groups problems','5 sweets in each bag',()=>{const k=pick([2,5,10]),a=R(2,10);return alt(
  ()=>num(`There are <b>${a}</b> bags with <b>${k}</b> sweets in each. How many sweets altogether?`,a*k,{why:`${a} × ${k} = ${a*k}.`}),
  ()=>num(`<b>${a*k}</b> pencils are shared equally into <b>${k}</b> pots. How many pencils in each pot?`,a,{why:`${a*k} ÷ ${k} = ${a}.`}),
  ()=>num(`How many legs do <b>${a}</b> birds have? (Each bird has 2 legs.)`,2*a,{why:`${a} × 2 = ${2*a}.`}))});

/* FRACTIONS */
skill('fshade2','frac','Fractions of shapes','½, ⅓, ¼, ¾',()=>{const [k,d]=pick([[1,2],[1,3],[1,4],[2,4],[3,4],[2,3]]);return mc('What fraction is shaded?',fr(k,d),[fr(1,2),fr(1,3),fr(1,4),fr(3,4),fr(2,3)].filter(x=>x!==fr(k,d)),{vis:fshape(k,d,Math.random()<.5?'bar':'circle'),why:`There are ${d} equal parts and ${k} ${k>1?'are':'is'} shaded: ${fr(k,d)}.${k===2&&d===4?` That is the same as ${fr(1,2)}.`:''}`})});
skill('fof2','frac','Fractions of amounts','⅓ of 12, ¾ of 8',()=>{const [k,d]=pick([[1,2],[1,3],[1,4],[3,4]]),m=R(1,6),n=d*m;return num(`What is ${fr(k,d)} of ${big(n)}?`,k*m,{vis:n<=20?frames(n,n>10?20:10):undefined,why:`Share ${n} into ${d} equal groups: ${m} in each.${k>1?` ${k} groups is ${k*m}.`:''}`})});
skill('fequiv2','frac','Halves & quarters','2/4 is the same as 1/2',()=>alt(
  ()=>mc(`Which fraction is the same as ${fr(1,2)}?`,fr(2,4),[fr(1,4),fr(3,4),fr(1,3)],{vis:fbars(1,2,4),why:`Half of the bar is the same as 2 of the 4 quarters: ${fr(2,4)} = ${fr(1,2)}.`}),
  ()=>{const s=R(1,4),seq=range(s,s+3),m=R(1,3);return num(`Count in quarters. What is the missing numerator?<br>${big(seq.map((x,i)=>i===m?fr(BL,4):fr(x,4)).join(' , '))}`,seq[m],{why:`Each step adds ${fr(1,4)}.`})},
  ()=>{const n=R(1,4)*2;return num(`How many halves make <b>${n/2} whole${n>2?'s':''}</b>?`,n,{why:`2 halves make 1 whole, so ${n/2} whole${n>2?'s':''} = ${n} halves.`})}));

/* MEASURING */
skill('units2','meas','Choosing units','cm, m, g, kg, ml or l?',()=>{const [thing,u,w]=pick([['the length of a pencil','cm',['kg','l','m']],['the length of the playground','m',['cm','g','ml']],['the mass of an apple','g',['kg','cm','l']],['the mass of a dog','kg',['g','m','ml']],['the water in a bath','l',['ml','kg','cm']],['the medicine on a spoon','ml',['l','g','m']]]);
  return mc(`Which unit would you use to measure <b>${thing}</b>?`,u,w,{why:`cm and m measure length, g and kg measure mass, ml and l measure capacity. ${cap(thing)} is best in ${u}.`})});
skill('cmp2','meas','Comparing measures','45 cm ? 54 cm',()=>{const u=pick(['cm','m','g','kg','ml','l']),a=R(5,99);let b=Math.random()<.15?a:R(5,99);const sg=a<b?'<':a>b?'>':'=';
  return mc(`Which sign goes in the box?<br>${big(`${a} ${u} ${BL} ${b} ${u}`)}`,sg,['<','>','='],{keep:true,why:sg==='='?'They are the same.':`${Math.max(a,b)} ${u} is more than ${Math.min(a,b)} ${u}.`})});
skill('ruler2','meas','Measuring with a ruler','How long is the pencil in cm?',()=>{const L=R(2,14);return num('How long is the pencil?',L,{post:'cm',vis:rulerSvg(0,L),why:`It starts at 0 and ends at ${L}, so it is ${L} cm long.`})});
skill('thermo2','meas','Reading scales','What temperature does the thermometer show?',()=>{const step=pick([1,2,5]),lo=0,hi=step*20,t=step*R(1,19);return num('What temperature does the thermometer show?',t,{post:'°C',vis:thermoSvg(t,lo,hi,step),why:`Each small mark is worth ${step}. The red line stops at ${t}°C.`})});

/* MONEY & TIME */
skill('coins2','mt','Counting money','Add up the coins',()=>coinsQ([1,2,5,10,20,50,100],2,4));
skill('money2','mt','Money problems','Totals and change',()=>{const n=nm();return alt(
  ()=>{const a=R(5,45),b=R(5,45);return num(`A pencil costs <b>${a}p</b> and a rubber costs <b>${b}p</b>. How much do they cost altogether?`,a+b,{post:'p',why:`${a}p + ${b}p = ${a+b}p.`})},
  ()=>{const pay=pick([20,50,100]),c=R(1,pay-1);return num(`${n} buys a sweet for <b>${c}p</b> and pays with <b>${pay===100?'£1':pay+'p'}</b>. How much change?`,pay-c,{post:'p',why:`${pay}p − ${c}p = ${pay-c}p.`})},
  ()=>{const [x,y]=pick([[10,'10p'],[20,'20p'],[5,'5p']]),P=pick(x===20?[100,200]:[50,100,200]);return num(`How many <b>${y}</b> coins make <b>${fmt(P)}</b>?`,P/x,{why:`${fmt(P)} = ${P}p. ${P} ÷ ${x} = ${P/x}.`})})});
skill('clock2','mt','Time to 5 minutes','Quarter past, quarter to and 5-minute times',()=>clockQ(2));
skill('tfacts2','mt','Time facts','Minutes in an hour, hours in a day',()=>alt(
  ()=>{const [q,a]=pick([['minutes are in 1 hour',60],['hours are in 1 day',24],['minutes are in half an hour',30],['minutes are in a quarter of an hour',15],['days are in 1 week',7]]);return num(`How many ${q}?`,a,{why:`There are ${a} ${q}.`})},
  ()=>{const h=R(1,10),d=pick([1,2,3]);return mc(`A party starts at <b>${h} o'clock</b> and lasts <b>${d} hour${d>1?'s':''}</b>. What time does it end?`,`${h+d} o'clock`,[`${h+d+1} o'clock`,`${h+d-1} o'clock`,`half past ${h+d}`],{why:`Count on ${d} hour${d>1?'s':''} from ${h} o'clock.`})},
  ()=>{const m=pick([15,30,45]);return mc(`Which is <b>longer</b>: ${m} minutes or 1 hour?`,'1 hour',[`${m} minutes`,'1 hour'],{keep:true,why:`1 hour is 60 minutes, which is longer than ${m} minutes.`})}));

/* SHAPES & PATTERNS */
skill('shape2d2','geo','2-D shapes','Sides, vertices and symmetry',()=>{const [name,n]=pick(SHAPES.filter(s=>s[1]>=3&&s[1]!==7));return alt(
  ()=>mc('What is this shape called?',cap(name),shuffle(['Triangle','Square','Rectangle','Pentagon','Hexagon','Octagon'].filter(x=>x!==cap(name))),{vis:shapeSvg(name,n),why:`It has ${n} sides, so it is a ${name}.`}),
  ()=>num(`How many <b>${Math.random()<.5?'sides':'vertices (corners)'}</b> does a <b>${name}</b> have?`,n,{vis:shapeSvg(name,n),why:`A ${name} has ${n} sides and ${n} vertices.`}),
  ()=>{const yes=Math.random()<.5;const s=yes?`<polygon points="130,25 50,185 210,185" class="shp"/><line x1="130" y1="10" x2="130" y2="200" stroke="currentColor" stroke-width="3" stroke-dasharray="8 6"/>`:`<polygon points="70,30 50,185 220,185" class="shp"/><line x1="130" y1="10" x2="130" y2="200" stroke="currentColor" stroke-width="3" stroke-dasharray="8 6"/>`;
    return mc('Is the dashed line a <b>line of symmetry</b>?',yes?'Yes':'No',['Yes','No'],{keep:true,vis:svg(260,210,s,'shape with a dashed line'),why:yes?'If you fold along the line, both halves match exactly.':'If you fold along the line, the two halves do not match.'})})});
const S3B=[['cube',6,12,8],['cuboid',6,12,8],['square-based pyramid',5,8,5],['triangular prism',5,9,6]];
skill('shape3d2','geo','3-D shapes','Faces, edges and vertices',()=>{const [n,f,e,v]=pick(S3B),[w,a]=pick([['faces',f],['edges',e],['vertices (corners)',v]]);return num(`How many <b>${w}</b> does this ${n} have?`,a,{vis:shape3dSvg(n),why:`A ${n} has ${f} faces, ${e} edges and ${v} vertices.`})});
skill('pattern2','geo','Patterns','What comes next?',()=>{const pool=shuffle(['circle','square','triangle','star']),pat=pick([[0,1],[0,1,2],[0,0,1],[0,1,1]]),seq=range(0,7).map(i=>pool[pat[i%pat.length]]),ans=pool[pat[7%pat.length]];
  const draw=(n,x)=>n==='circle'?`<circle cx="${x}" cy="40" r="22" class="shp"/>`:n==='square'?`<rect x="${x-21}" y="19" width="42" height="42" class="shp"/>`:n==='triangle'?`<polygon points="${x},15 ${x-25},63 ${x+25},63" class="shp"/>`:`<polygon points="${starPts(x,42,27)}" class="shp"/>`;
  let s='';seq.forEach((n,i)=>s+=draw(n,34+i*62));s+=`<rect x="${34+7*62-24}" y="16" width="48" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6 5"/><text x="${34+7*62}" y="50" text-anchor="middle" font-size="26" font-weight="700">?</text>`;
  return mc('What shape comes next in the pattern?',cap(ans),[...new Set(pat.map(i=>cap(pool[i])))].concat(cap(pool[3])),{vis:svg(530,80,s,'a pattern of shapes'),why:`The pattern repeats: ${pat.map(i=>pool[i]).join(', ')}. Next is ${ans}.`})});
skill('turns2','geo','Turns','Clockwise and anticlockwise',()=>alt(
  ()=>{const si=R(0,3),[tn,k]=pick([['quarter',1],['half',2],['three-quarter',3]]),cw=Math.random()<.5,e=DIRN[(si+(cw?k:4-k))%4][0];
    return mc(`The arrow points <b>${DIRN[si][0]}</b>. It makes a <b>${tn} turn ${cw?'clockwise':'anticlockwise'}</b>. Which way does it point now?`,cap(e),['Up','Right','Down','Left'],{keep:true,vis:arrowSvg(DIRN[si][1]),why:`${cw?'Clockwise is the way clock hands move.':'Anticlockwise is the opposite way to clock hands.'} A ${tn} turn is ${k} quarter turn${k>1?'s':''}.`})},
  ()=>{const [t,a]=pick([['quarter',1],['half',2],['three-quarter',3],['full',4]]);return num(`How many right angles are in a <b>${t} turn</b>?`,a,{why:`A quarter turn is one right angle, so a ${t} turn is ${a}.`})}));

/* CHARTS */
skill('picto2','stat','Pictograms','One circle stands for 1, 2, 5 or 10',()=>pictoQ([1,2,5,10],false));
skill('tally2','stat','Tally charts','Count the tally marks',()=>tallyQ(1,15,true));
skill('block2','stat','Block diagrams','Count the blocks',()=>barQ([1],true));
});
