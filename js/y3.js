/* Year 3 — National Curriculum for England */
year(3,{age:'7–8',blurb:'Numbers to 1,000, 3, 4 and 8 times tables, fractions, time, money',strands:[['num','Number & place value'],['add','Adding & subtracting'],['mul','Times tables & dividing'],['frac','Fractions'],['meas','Length, mass & capacity'],['mt','Money & time'],['geo','Shapes, angles & lines'],['stat','Charts & tables']]},skill=>{

/* NUMBER */
skill('pv','num','Place value','What is the 4 worth in 472?',()=>pvQ(3));
skill('moreless','num','10 or 100 more or less','What is 100 more than 457?',()=>{const amt=pick([10,100]),more=Math.random()<.5;const n=more?R(100,999-amt):R(100+amt,999);const ans=more?n+amt:n-amt;
  return num(`What is <b>${amt} ${more?'more':'less'}</b> than ${big(n)}?`,ans,{why:`${more?'Add':'Take away'} one ${amt===10?'ten':'hundred'}: ${n} ${more?'+':'−'} ${amt} = ${ans}.`})});
skill('compare','num','Compare numbers','436 ? 463 — use < > or =',()=>compareQ(100,999));
skill('order','num','Order numbers','Which is the biggest: 352, 523, 325, 532?',()=>orderQ(100,999));
skill('count','num','Counting in steps','Count in 4s, 8s, 50s and 100s',()=>countQ([3,4,8,50,100],{start:s=>s>=50?s*R(0,5):s*R(0,8)}));
skill('words','num','Numbers in words','“three hundred and six”',()=>{const h=R(1,9),f=R(0,2);const n=f===0?h*100+R(1,9):f===1?h*100+R(1,9)*10:h*100+R(11,99);const s=String(n),r=n%100;
  const ds=[h*1000+r,+(s[0]+s[2]+s[1]),n+10,n-10,h*10+r%10,n+100].filter(x=>x>0&&x!==n);
  if(Math.random()<.5)return mc(`Which number is <b>“${words(n)}”</b>?`,n,ds,{why:`${cap(words(n))} is ${s[0]} hundreds, ${s[1]} tens and ${s[2]} ones: ${n}.`});
  return mc(`How do you write ${big(n)} in words?`,cap(words(n)),ds.filter(x=>x<1000).map(x=>cap(words(x))),{why:`${n} has ${s[0]} hundreds, ${s[1]} tens and ${s[2]} ones.`})});
skill('nline','num','Number lines','Where is the arrow pointing?',()=>{const [start,step]=pick([[0,10],[0,100],[100*R(1,8),10],[0,5],[0,2],[0,20]]);const k=R(1,9),v=start+k*step;
  return num('What number is the arrow pointing to?',v,{vis:nline(start,step,k),why:`The line goes from ${start} to ${start+10*step} in 10 jumps, so each jump is worth ${step}. The arrow is ${k} jumps along: ${v}.`})});

/* ADD & SUBTRACT */
skill('addm','add','Adding in your head','345 + 30',()=>mental(false,[1,10,100],100,999));
skill('subm','add','Subtracting in your head','672 − 400',()=>mental(true,[1,10,100],100,999));
skill('cola','add','Column addition','345 + 278 written in columns',()=>{const a=R(100,899),b=Math.random()<.3?R(10,99):R(100,999-a);return num('Work out the answer. Start with the ones.',a+b,{vis:colVis(a,b,'+',a+b),why:colAddWhy(a,b)})});
skill('cols','add','Column subtraction','632 − 257 written in columns',()=>{let a;do{a=R(200,999)}while(digs(a)[1]===0||digs(a)[0]===0);const b=R(100,a-50);return num('Work out the answer. Start with the ones.',a-b,{vis:colVis(a,b,'−',a-b),why:colSubWhy(a,b)})});
skill('missing','add','Missing numbers','? + 245 = 500',()=>{const f=R(0,3);
  if(f<2){const c=Math.random()<.5?R(2,9)*100:R(200,999),a=R(50,c-50),b=c-a;
    return f===0?num(big(`${BL} + ${b} = ${c}`),a,{why:`Use the inverse: ${c} − ${b} = ${a}.`}):num(big(`${a} + ${BL} = ${c}`),b,{why:`Use the inverse: ${c} − ${a} = ${b}.`})}
  const a=R(200,999),b=R(20,a-100),c=a-b;
  return f===2?num(big(`${a} − ${BL} = ${c}`),b,{why:`${a} − ${c} = ${b}.`}):num(big(`${BL} − ${b} = ${c}`),a,{why:`Use the inverse: ${c} + ${b} = ${a}.`})});
skill('estimate','add','Estimating','398 + 211 is about…',()=>{const sub=Math.random()<.4;let a,b;if(sub){a=R(400,999);b=R(110,a-150)}else{a=R(110,600);b=R(110,899-a)}
  const r=x=>Math.round(x/100)*100,est=sub?r(a)-r(b):r(a)+r(b);
  return mc(`Which is the <b>best estimate</b> for this?<br>${big(`${a} ${sub?'−':'+'} ${b}`)}`,est,[est+100,est-100,est+200,est-200].filter(x=>x>0),{why:`Round each number to the nearest hundred: ${a} is about ${r(a)} and ${b} is about ${r(b)}. ${r(a)} ${sub?'−':'+'} ${r(b)} = ${est}.`})});
skill('addword','add','Word problems','Stickers, pages and points',()=>{const n=nm();return alt(
  ()=>{const a=R(120,480),b=R(110,480);return num(`A school has <b>${a}</b> children in the infants and <b>${b}</b> in the juniors. How many children are there altogether?`,a+b,{post:'children',why:`Add: ${a} + ${b} = ${a+b}.`})},
  ()=>{const a=R(150,600),b=R(30,a-40);return num(`${n} had <b>${a}</b> stickers and gave away <b>${b}</b>. How many stickers are left?`,a-b,{post:'stickers',why:`Subtract: ${a} − ${b} = ${a-b}.`})},
  ()=>{const a=R(180,400),b=R(40,a-30);return num(`A book has <b>${a}</b> pages. ${n} has read <b>${b}</b> pages. How many pages are left to read?`,a-b,{post:'pages',why:`${a} − ${b} = ${a-b}.`})},
  ()=>{const a=R(200,700),b=R(30,250);return num(`There were <b>${a}</b> people at the fair. <b>${b}</b> more people arrived. How many people are there now?`,a+b,{post:'people',why:`${a} + ${b} = ${a+b}.`})},
  ()=>{const a=R(300,900),b=R(100,a-50);return num(`${n} scored <b>${a}</b> points in a game. Their friend scored <b>${b}</b> points. How many more points did ${n} score?`,a-b,{post:'points',why:`Find the difference: ${a} − ${b} = ${a-b}.`})})});

/* MULTIPLY & DIVIDE */
skill('t3','mul','3 times table','7 × 3, 24 ÷ 3',()=>tableQ(3));
skill('t4','mul','4 times table','6 × 4, 32 ÷ 4',()=>tableQ(4));
skill('t8','mul','8 times table','9 × 8, 56 ÷ 8',()=>tableQ(8));
skill('tmix','mul','Mixed tables','2, 3, 4, 5, 8 and 10 times tables',()=>tableQ(pick([2,3,4,5,8,10])));
skill('derived','mul','Using facts you know','3 × 4 = 12, so 30 × 4 = ?',()=>{const b=pick([2,3,4,5,8]),a=R(2,9),p=a*b;return alt(
  ()=>num(`${a} × ${b} = ${p}<br>So what is this?<br>${big(`${a*10} × ${b} = ${BL}`)}`,p*10,{why:`${a*10} is 10 times bigger than ${a}, so the answer is 10 times bigger: ${p} × 10 = ${p*10}.`}),
  ()=>num(`${a} × ${b} = ${p}<br>So what is this?<br>${big(`${p*10} ÷ ${b} = ${BL}`)}`,a*10,{why:`${p} ÷ ${b} = ${a}, so ${p*10} ÷ ${b} is 10 times bigger: ${a*10}.`}),
  ()=>num(`${p} ÷ ${b} = ${a}<br>So what is this?<br>${big(`${b} × ${a*10} = ${BL}`)}`,p*10,{why:`${b} × ${a} = ${p}, so ${b} × ${a*10} = ${p*10}.`}))});
skill('mul2','mul','2-digit × 1-digit','23 × 4',()=>{const b=pick([2,3,4,5,8]),a=R(12,b===8?25:45),t=Math.floor(a/10)*10,o=a%10;
  return num(big(`${a} × ${b} = ${BL}`),a*b,{why:`Split ${a} into ${t} and ${o}.<br>${t} × ${b} = ${t*b}<br>${o} × ${b} = ${o*b}<br>${t*b} + ${o*b} = ${a*b}`})});
skill('div2','mul','2-digit ÷ 1-digit','96 ÷ 3',()=>{const b=pick([2,3,4,5,8]),q=R(11,Math.floor(99/b)),a=q*b,t=Math.floor(q/10)*10;
  return num(big(`${a} ÷ ${b} = ${BL}`),q,{why:`Split ${a} into ${t*b} and ${a-t*b}.<br>${t*b} ÷ ${b} = ${t}<br>${a-t*b} ÷ ${b} = ${q-t}<br>${t} + ${q-t} = ${q}`})});
skill('mulword','mul','Word problems','Boxes of eggs, teams and outfits',()=>{const n=nm(),b=pick([2,3,4,5,8,10]),a=R(2,12);return alt(
  ()=>num(`There are <b>${a}</b> boxes. Each box has <b>${b}</b> eggs. How many eggs are there altogether?`,a*b,{post:'eggs',why:`${a} groups of ${b}: ${a} × ${b} = ${a*b}.`}),
  ()=>num(`<b>${a*b}</b> sweets are shared equally between <b>${b}</b> friends. How many sweets does each friend get?`,a,{post:'sweets',why:`${a*b} ÷ ${b} = ${a}.`}),
  ()=>num(`<b>${a*b}</b> children get into teams of <b>${b}</b>. How many teams are there?`,a,{post:'teams',why:`How many ${b}s make ${a*b}? ${a*b} ÷ ${b} = ${a}.`}),
  ()=>{const s=R(2,9),k=pick([2,3,4,5]);return num(`A blue ribbon is <b>${s} cm</b> long. A red ribbon is <b>${k} times</b> as long. How long is the red ribbon?`,s*k,{post:'cm',why:`${k} times as long means ${s} × ${k} = ${s*k}.`})},
  ()=>{const t=R(2,5),k=R(2,5);return num(`${n} has <b>${t}</b> T-shirts and <b>${k}</b> pairs of shorts. How many different outfits can ${n} make?`,t*k,{post:'outfits',why:`Each T-shirt goes with ${k} pairs of shorts: ${t} × ${k} = ${t*k}.`})},
  ()=>{const c=pick([2,3,4,5]);return num(`Cinema tickets cost <b>£${c}</b> each. How much do <b>${a}</b> tickets cost?`,a*c,{pre:'£',why:`${a} × £${c} = £${a*c}.`})})});

/* FRACTIONS */
skill('fshade','frac','What fraction is shaded?','Circles and bars cut into equal parts',()=>fshadeQ(2,10));
skill('tenths','frac','Tenths','Count in tenths, find 1/10 of 70',()=>alt(
  ()=>{const s=R(1,6);const seq=range(s,s+3);const m=R(1,3);return num(`Count in tenths. What is the missing numerator?<br>${big(seq.map((x,i)=>i===m?fr(BL,10):fr(x,10)).join(' , '))}`,seq[m],{why:`Each step adds ${fr(1,10)}.`})},
  ()=>{const t=R(1,9)*10;return num(`What is ${fr(1,10)} of ${big(t)}?`,t/10,{why:`Divide by 10: ${t} ÷ 10 = ${t/10}.`})},
  ()=>{const k=R(1,9);return num(`The line goes from 0 to 1 in tenths. The arrow points to ${fr(BL,10)}. What is the missing number?`,k,{vis:nline(0,1,k,i=>i===0?0:i===10?1:null),why:`The line is cut into 10 equal jumps. The arrow is ${k} jumps along, so it shows ${fr(k,10)}.`})},
  ()=>{const k=R(1,9);return num(`How many tenths do you need to add to ${fr(k,10)} to make one whole?`,10-k,{why:`One whole is ${fr(10,10)}. ${10-k} + ${k} = 10.`})}));
skill('fof','frac','Fractions of amounts','¼ of 20, ¾ of 12',()=>fofQ([2,3,4,5,8,10],2,10,true));
skill('fequiv','frac','Equivalent fractions','½ = ?/8',()=>{const [a,b]=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5]]),m=R(2,Math.floor(12/b)),d=b*m;
  return num(`Fill in the missing number.<br>${big(`${fr(a,b)} = ${fr(BL,d)}`)}`,a*m,{vis:fbars(a,b,d),why:`The denominator was multiplied by ${m} (${b} × ${m} = ${d}), so multiply the numerator by ${m} too: ${a} × ${m} = ${a*m}.`})});
skill('fcomp','frac','Comparing fractions','Which is bigger, ⅓ or ⅕?',()=>alt(
  ()=>{let [x,y]=shuffle(range(2,10)).slice(0,2);const bigger=Math.random()<.5;const ans=bigger?Math.min(x,y):Math.max(x,y);
    return mc(`Which fraction is <b>${bigger?'bigger':'smaller'}</b>?`,fr(1,ans),[fr(1,x),fr(1,y)],{keep:true,why:`When the numerator is 1, the bigger the denominator, the smaller each part. ${fr(1,Math.min(x,y))} is bigger than ${fr(1,Math.max(x,y))}.`})},
  ()=>{const d=R(4,12);let [x,y]=shuffle(range(1,d-1)).slice(0,2);const bigger=Math.random()<.5;const ans=bigger?Math.max(x,y):Math.min(x,y);
    return mc(`Which fraction is <b>${bigger?'bigger':'smaller'}</b>?`,fr(ans,d),[fr(x,d),fr(y,d)],{keep:true,why:`The parts are the same size (${d}ths), so compare the numerators: ${ans} ${bigger?'is more than':'is less than'} ${ans===x?y:x}.`})},
  ()=>{const ds=shuffle(range(2,10)).slice(0,3);const ans=Math.max(...ds);return mc('Which fraction is the <b>smallest</b>?',fr(1,ans),ds.map(d=>fr(1,d)),{why:`${fr(1,ans)} has the biggest denominator, so its parts are the smallest.`})}));
skill('fadd','frac','Adding & subtracting fractions','2/7 + 3/7',()=>{const d=R(3,12),sub=Math.random()<.4;let a,b;
  if(sub){a=R(2,d);b=R(1,a-1)}else{a=R(1,d-1);b=R(1,d-a)}const ans=sub?a-b:a+b;
  return num(`Fill in the missing numerator.<br>${big(`${fr(a,d)} ${sub?'−':'+'} ${fr(b,d)} = ${fr(BL,d)}`)}`,ans,{why:`The denominators are the same, so just ${sub?'subtract':'add'} the numerators: ${a} ${sub?'−':'+'} ${b} = ${ans}.${ans===d?` ${fr(d,d)} is one whole!`:''}`})});

/* MEASUREMENT */
skill('convert','meas','Converting units','3 m = ? cm, 2 kg = ? g',()=>{const a=R(1,9);return alt(
  ()=>num(big(`${a} m = ${BL} cm`),a*100,{why:`1 m = 100 cm, so ${a} m = ${a} × 100 = ${a*100} cm.`}),
  ()=>num(big(`${a*100} cm = ${BL} m`),a,{why:`100 cm = 1 m, so ${a*100} cm = ${a} m.`}),
  ()=>{const b=R(1,19)*5;return num(big(`${a} m ${b} cm = ${BL} cm`),a*100+b,{why:`${a} m = ${a*100} cm. ${a*100} + ${b} = ${a*100+b} cm.`})},
  ()=>{const c=R(1,15);return num(big(`${c} cm = ${BL} mm`),c*10,{why:`1 cm = 10 mm, so ${c} cm = ${c*10} mm.`})},
  ()=>{const c=R(1,15);return num(big(`${c*10} mm = ${BL} cm`),c,{why:`10 mm = 1 cm, so ${c*10} mm = ${c} cm.`})},
  ()=>num(big(`${a} kg = ${BL} g`),a*1000,{why:`1 kg = 1000 g, so ${a} kg = ${a*1000} g.`}),
  ()=>num(big(`${a} l = ${BL} ml`),a*1000,{why:`1 litre = 1000 ml, so ${a} l = ${a*1000} ml.`}),
  ()=>{const [q,u,v]=pick([['half a metre','cm',50],['half a kilogram','g',500],['half a litre','ml',500],['a quarter of a metre','cm',25]]);return num(`How many <b>${u}</b> are in <b>${q}</b>?`,v,{post:u,why:`${cap(q)} = ${v} ${u}.`})})});
skill('mcalc','meas','Measure problems','Ribbons, flour and jugs',()=>{const n=nm();return alt(
  ()=>{const a=R(25,95),b=R(15,95);return num(`A red ribbon is <b>${a} cm</b> long and a blue ribbon is <b>${b} cm</b> long. How long are they altogether?`,a+b,{post:'cm',why:`${a} + ${b} = ${a+b} cm.`})},
  ()=>{const a=R(60,99),b=R(12,a-10);return num(`A plank of wood is <b>${a} cm</b> long. <b>${b} cm</b> is cut off. How long is it now?`,a-b,{post:'cm',why:`${a} − ${b} = ${a-b} cm.`})},
  ()=>{const a=R(5,10)*100,b=R(2,a/50-2)*50;return num(`A bag of flour weighs <b>${a} g</b>. ${n} uses <b>${b} g</b> to bake a cake. How much flour is left?`,a-b,{post:'g',why:`${a} − ${b} = ${a-b} g.`})},
  ()=>{const a=R(10,60)*10,b=R(10,35)*10;return num(`A melon weighs <b>${a} g</b> and a pineapple weighs <b>${b} g</b>. What is their total mass?`,a+b,{post:'g',why:`${a} + ${b} = ${a+b} g.`})},
  ()=>{const a=R(6,20)*50,b=R(2,a/50-1)*50;return num(`A jug holds <b>${a} ml</b> of juice. ${n} pours out <b>${b} ml</b>. How much juice is left in the jug?`,a-b,{post:'ml',why:`${a} − ${b} = ${a-b} ml.`})})});
skill('mcomp','meas','Compare & estimate','Which is heavier: 1 kg or 900 g?',()=>alt(
  ()=>{const [u1,u2,f,word]=pick([['m','cm',100,'longer'],['kg','g',1000,'heavier'],['l','ml',1000,'more']]);const a=R(1,3);const off=f===100?R(1,4)*10:R(1,4)*100;const b=a*f+(Math.random()<.5?off:-off);
    const A=`${a} ${u1}`,B=`${b} ${u2}`,ans=b>a*f?B:A;const q=word==='more'?'Which holds <b>more</b>?':`Which is <b>${word}</b>?`;
    return mc(q,ans,[A,B],{keep:true,why:`${a} ${u1} = ${a*f} ${u2}. ${Math.max(a*f,b)} ${u2} is more than ${Math.min(a*f,b)} ${u2}.`})},
  ()=>{const [thing,ans,wr]=pick([['the height of a classroom door','2 m',['2 cm','20 m','2 mm']],['the length of a pencil','15 cm',['15 m','15 mm','150 m']],['the length of an ant','5 mm',['5 cm','5 m','50 cm']],['the mass of an apple','150 g',['150 kg','15 kg','1 g']],['the mass of a bag of sugar','1 kg',['1 g','100 kg','10 g']],['the amount in a cup of tea','250 ml',['250 l','2 ml','25 l']],['the amount in a full bath','100 l',['100 ml','1 l','10 ml']],['the length of a football pitch','100 m',['100 cm','10 cm','1000 mm']]]);
    return mc(`What is the best estimate for <b>${thing}</b>?`,ans,wr,{why:`${cap(thing)} is about ${ans}.`})}));
skill('ruler','meas','Measuring with a ruler','How long is the pencil?',()=>{const whole=Math.random()<.55;
  if(whole){const s=Math.random()<.3?R(1,3):0,L=R(3,13-s);return num(`How long is the pencil in <b>centimetres</b>?`,L,{post:'cm',vis:rulerSvg(s,L),why:s?`The pencil starts at ${s} and ends at ${s+L}. ${s+L} − ${s} = ${L} cm.`:`The pencil starts at 0 and ends at ${L}, so it is ${L} cm long.`})}
  const mm=R(30,135);if(mm%10===0)return num(`How long is the pencil in <b>millimetres</b>?`,mm,{post:'mm',vis:rulerSvg(0,mm/10),why:`It ends exactly at ${mm/10} cm. ${mm/10} cm = ${mm} mm.`});
  return num(`How long is the pencil in <b>millimetres</b>?`,mm,{post:'mm',vis:rulerSvg(0,mm/10),why:`It ends ${mm%10} small marks after ${Math.floor(mm/10)} cm. ${Math.floor(mm/10)} cm = ${Math.floor(mm/10)*10} mm, plus ${mm%10} mm = ${mm} mm.`})});
skill('perim','meas','Perimeter','Add up all the sides',()=>alt(
  ()=>{const w=R(3,12),h=R(2,9);return num('This is a rectangle. What is its <b>perimeter</b>?',2*(w+h),{post:'cm',vis:rectLab(w,h,'cm'),why:`Opposite sides of a rectangle are equal. ${w} + ${h} + ${w} + ${h} = ${2*(w+h)} cm.`})},
  ()=>{const L=lShape();return num('Each square is 1 cm long. What is the <b>perimeter</b> of the shape?',L.perim,{post:'cm',vis:gridPoly(L.pts,L.W,L.H),why:`Count every edge around the outside of the shape. It comes to ${L.perim} cm.`})},
  ()=>{let a=R(4,12),b=R(4,12),cc=R(Math.abs(a-b)+2,Math.min(a+b-2,15));const s=`<polygon points="60,190 380,190 250,42" class="shp"/><text x="220" y="218" text-anchor="middle" font-size="18">${cc} cm</text><text x="138" y="108" text-anchor="end" font-size="18">${a} cm</text><text x="328" y="108" font-size="18">${b} cm</text>`;
    return num('What is the <b>perimeter</b> of this triangle? <i>(Not drawn to scale.)</i>',a+b+cc,{post:'cm',vis:svg(440,230,s,'triangle'),why:`${a} + ${b} + ${cc} = ${a+b+cc} cm.`})},
  ()=>{const n=pick([5,6,8]),len=R(2,9),nm2={5:'pentagon',6:'hexagon',8:'octagon'}[n];
    return num(`This is a regular ${nm2}. Every side is <b>${len} cm</b>. What is its perimeter?`,n*len,{post:'cm',vis:svg(260,220,`<polygon points="${poly(n,130,110,90,-90)}" class="shp"/>`,nm2),why:`A ${nm2} has ${n} equal sides: ${n} × ${len} = ${n*len} cm.`})},
  ()=>{const l=R(2,12);return num(`A square has a perimeter of <b>${4*l} cm</b>. How long is each side?`,l,{post:'cm',why:`A square has 4 equal sides: ${4*l} ÷ 4 = ${l} cm.`})}));

/* MONEY & TIME */
skill('coins','mt','Counting coins','How much money is here?',()=>coinsQ([1,2,5,10,20,50,100,200],3,5));
skill('money','mt','Money problems','Totals, change and pounds into pence',()=>{const n=nm();return alt(
  ()=>{const [i1,i2]=shuffle(ITEMS).slice(0,2),a=R(7,79)*5,b=R(7,79)*5,t=a+b;return mc(`${n} buys a ${i1} for <b>${fmt(a)}</b> and a ${i2} for <b>${fmt(b)}</b>. How much is that altogether?`,fmt(t),[fmt(t+10),fmt(t-10),fmt(t+100),fmt(Math.abs(t-100))],{why:`${fmt(a)} + ${fmt(b)} = ${fmt(t)}.`})},
  ()=>{const pay=pick([100,200,500,1000]),cost=R(1,pay/5-1)*5,ch=pay-cost;return mc(`A ${pick(ITEMS)} costs <b>${fmt(cost)}</b>. ${n} pays with <b>${fmt(pay)}</b>. How much change does ${n} get?`,fmt(ch),[fmt(ch+10),fmt(ch+5),ch>10?fmt(ch-10):fmt(ch+20),fmt(ch+100)],{why:`${fmt(pay)} − ${fmt(cost)} = ${fmt(ch)}. Check by counting on from ${fmt(cost)}.`})},
  ()=>{const P=R(101,999);return num(`How many pence is <b>${fmt(P)}</b>?`,P,{post:'p',why:`£1 = 100p, so ${fmt(P)} = ${P}p.`})},
  ()=>{const P=R(101,999),s=String(P);return mc(`How do you write <b>${P}p</b> in pounds?`,fmt(P),[`£${(P/10).toFixed(2)}`,`£${s[0]}.${s[2]}${s[1]}`,`£${P}.00`],{why:`100p = £1, so ${P}p = £${Math.floor(P/100)} and ${P%100}p = ${fmt(P)}.`})})});
skill('clock','mt','Telling the time','Read the clock, even with Roman numerals',()=>clockQ(3));
skill('h24','mt','12- and 24-hour clock','What is 3:00 pm in 24-hour time?',()=>alt(
  ()=>{const h=R(1,12),m=R(0,11)*5,pm=Math.random()<.6,H=pm?(h===12?12:h+12):(h===12?0:h),O=pm?(h===12?0:h):(h===12?12:h+12);
    return mc(`This clock shows a time in the <b>${pm?'afternoon':'morning'}</b>. What is the time on a 24-hour clock?`,`${pad(H)}:${pad(m)}`,[`${pad(O)}:${pad(m)}`,`${pad((H+2)%24)}:${pad(m)}`,`${pad((H+10)%24)}:${pad(m)}`],{vis:clockSvg(h,m,false),why:pm?`For afternoon times, add 12 to the hour: ${h} + 12 = ${H}.`:`Morning times keep the same hour (12 midnight becomes 00): ${pad(H)}:${pad(m)}.`})},
  ()=>{const H=R(13,23),m=R(0,11)*5;return mc(`What is <b>${pad(H)}:${pad(m)}</b> in 12-hour time?`,`${H-12}:${pad(m)} pm`,[`${H-12}:${pad(m)} am`,`${H-10}:${pad(m)} pm`,`${H-11}:${pad(m)} pm`],{why:`Take away 12 from the hour: ${H} − 12 = ${H-12}. It is after midday, so it is pm.`})},
  ()=>{const [act,t,ap]=pick([['wakes up','7:15','am'],['eats dinner','6:00','pm'],['goes to bed','8:00','pm'],['starts school','8:45','am'],['goes home from school','3:15','pm'],['eats breakfast','7:30','am'],['has a swimming lesson after school','4:30','pm']]);
    return mc(`${nm()} ${act} at <b>${t}</b>. Is that <b>am</b> or <b>pm</b>?`,ap,['am','pm'],{keep:true,why:`am is from midnight to midday (morning). pm is from midday to midnight (afternoon and evening).`})}));
skill('tfacts','mt','Time facts & durations','Days in April, minutes in an hour',()=>alt(
  ()=>{const [q,a]=pick([['seconds are in 1 minute',60],['minutes are in 1 hour',60],['hours are in 1 day',24],['days are in 1 week',7],['days are in a year',365],['days are in a leap year',366],['months are in a year',12],['minutes are in half an hour',30],['minutes are in a quarter of an hour',15]]);return num(`How many ${q}?`,a,{why:`There are ${a} ${q}.`})},
  ()=>{const [mo,d]=pick(MONTHS);return num(`How many days are in <b>${mo}</b>${mo==='February'?' (not in a leap year)':''}?`,d,{post:'days',why:`${mo} has ${d} days. “30 days has September, April, June and November…”`})},
  ()=>{const k=R(2,5);return alt(()=>num(`How many minutes are in <b>${k} hours</b>?`,60*k,{post:'minutes',why:`${k} × 60 = ${60*k}.`}),()=>num(`How many seconds are in <b>${k} minutes</b>?`,60*k,{post:'seconds',why:`${k} × 60 = ${60*k}.`}),()=>num(`How many days are in <b>${k} weeks</b>?`,7*k,{post:'days',why:`${k} × 7 = ${7*k}.`}))},
  ()=>{const h=R(1,10),m=R(0,11)*5,d=pick([15,20,25,30,35,40,45,50]),m2=(m+d)%60,h2=h+Math.floor((m+d)/60);const n=nm();
    return num(`${n}'s ${pick(['swimming lesson','film','football match','piano lesson'])} starts at <b>${dig(h,m)}</b> and finishes at <b>${dig(h2,m2)}</b>. How many minutes long is it?`,d,{post:'minutes',why:`Count on from ${dig(h,m)} to ${dig(h2,m2)}: that is ${d} minutes.`})},
  ()=>{const h=R(1,10),m=R(0,11)*5,d=pick([15,20,25,30,35,40,45]),m2=(m+d)%60,h2=h+Math.floor((m+d)/60);
    return mc(`A TV show starts at <b>${dig(h,m)}</b> and lasts <b>${d} minutes</b>. What time does it finish?`,dig(h2,m2),[dig(h,m2),dig(h2+1,m2),dig(h2,(m2+10)%60)],{why:`Count on ${d} minutes from ${dig(h,m)}: ${dig(h2,m2)}.`})}));

/* GEOMETRY */
skill('shape2d','geo','2-D shapes','Name shapes, count sides and vertices',()=>{const [name,n]=pick(SHAPES);return alt(
  ()=>mc('What is the name of this shape?',cap(name),shuffle(SHAPES.map(s=>cap(s[0])).filter(s=>s!==cap(name))),{vis:shapeSvg(name,n),why:n>0?`It has ${n} straight sides, so it is a ${name}.`:name==='circle'?'It is perfectly round with one curved side.':'It is half a circle: one curved side and one straight side.'}),
  ()=>{if(n<=0)return num('How many sides does a <b>hexagon</b> have?',6,{why:'Hex means six. A hexagon has 6 sides.'});return num(`How many <b>${Math.random()<.5?'sides':'vertices (corners)'}</b> does this ${name} have?`,n,{vis:shapeSvg(name,n),why:`A ${name} has ${n} sides and ${n} vertices.`})},
  ()=>{const [q,a]=pick([['How many right angles does a rectangle have?',4],['How many right angles does a square have?',4],['How many sides does an octagon have?',8],['How many sides does a pentagon have?',5],['How many vertices does a triangle have?',3]]);return num(q,a,{why:`The answer is ${a}.`})})});
const S3=[['cube',6,12,8,'6 square faces'],['cuboid',6,12,8,'6 rectangular faces'],['square-based pyramid',5,8,5,'a square base and 4 triangular faces'],['triangular prism',5,9,6,'2 triangular faces and 3 rectangular faces'],['tetrahedron',4,6,4,'4 triangular faces']];
const S3D=[['sphere','1 curved surface and no edges'],['cylinder','2 flat circle faces and 1 curved surface'],['cone','1 flat circle face, 1 curved surface and a point at the top']].concat(S3.map(s=>[s[0],s[4]]));
skill('shape3d','geo','3-D shapes','Faces, edges and vertices',()=>alt(
  ()=>{const [n,f,e,v]=pick(S3);const [w,a]=pick([['faces',f],['edges',e],['vertices (corners)',v]]);return num(`How many <b>${w}</b> does a <b>${n}</b> have?`,a,{vis:n==='tetrahedron'?undefined:shape3dSvg(n),why:`A ${n} has ${f} faces, ${e} edges and ${v} vertices.`})},
  ()=>{const [n,d]=pick(S3D);return mc(`Which 3-D shape has <b>${d}</b>?`,cap(n),shuffle(S3D.map(s=>cap(s[0]))),{why:`A ${n} has ${d}.`})}));
skill('angles','geo','Angles','Acute, right angle or obtuse?',()=>alt(
  ()=>{const k=R(0,2),th=k===0?R(25,75):k===1?90:R(105,160),ans=['Acute','Right angle','Obtuse'][k];
    return mc('Is this angle <b>acute</b>, a <b>right angle</b>, or <b>obtuse</b>?',ans,['Acute','Right angle','Obtuse'],{keep:true,vis:angleSvg(th,R(0,180)),why:k===0?'It is smaller than a right angle, so it is acute.':k===1?'It makes a perfect square corner, so it is a right angle.':'It is bigger than a right angle (but less than a straight line), so it is obtuse.'})},
  ()=>{const [t,a]=pick([['quarter',1],['half',2],['three-quarter',3],['whole',4]]);return num(`How many right angles make a <b>${t} turn</b>?`,a,{why:`One right angle is a quarter turn, so a ${t} turn is ${a} right angle${a>1?'s':''}.`})}));
skill('turns','geo','Turns & directions','Quarter turn clockwise from North',()=>{const d=R(0,3),[tn,k]=pick([['quarter',1],['half',2],['three-quarter',3]]),cw=Math.random()<.5,n=nm(),e=(d+(cw?k:-k)+8)%4;
  return mc(`${n} is facing <b>${DIRS[d]}</b>. ${n} makes a <b>${tn} turn ${cw?'clockwise':'anticlockwise'}</b>. Which way is ${n} facing now?`,DIRS[e],DIRS,{keep:true,vis:compassSvg(DIRS[d]),why:`${cw?'Clockwise is the way clock hands move':'Anticlockwise is the opposite way to clock hands'}. A ${tn} turn moves ${k} step${k>1?'s':''} round the compass: ${DIRS[d]} → ${DIRS[e]}.`})});
skill('lines','geo','Lines','Parallel, perpendicular, horizontal, vertical',()=>alt(
  ()=>{const k=R(0,2),a=R(0,179);let s;
    if(k===0){const r=a*Math.PI/180;s=seg(150+42*Math.sin(r),110+42*Math.cos(r),a,190)+seg(150-42*Math.sin(r),110-42*Math.cos(r),a,190)}
    else if(k===1){const t=R(-50,50),r=a*Math.PI/180;s=seg(150,110,a,190)+seg(150+t*Math.cos(r),110-t*Math.sin(r),a+90,150)}
    else{const b=a+R(25,60)*(Math.random()<.5?1:-1);s=seg(140,100,a,180)+seg(165,125,b,180)}
    const ans=['Parallel','Perpendicular','Neither'][k];return mc('Are these lines <b>parallel</b>, <b>perpendicular</b>, or <b>neither</b>?',ans,['Parallel','Perpendicular','Neither'],{keep:true,vis:svg(300,220,s,'two lines'),why:k===0?'They go in exactly the same direction and would never meet.':k===1?'They meet at a right angle.':'They are not the same direction and do not meet at a right angle.'})},
  ()=>{const k=R(0,2),a=k===0?0:k===1?90:pick([R(20,70),R(110,160)]);const ans=['Horizontal','Vertical','Diagonal'][k];
    return mc('Is this line <b>horizontal</b>, <b>vertical</b> or <b>diagonal</b>?',ans,['Horizontal','Vertical','Diagonal'],{keep:true,vis:svg(300,220,seg(150,110,a,180),'a line'),why:k===0?'It goes straight across, like the horizon.':k===1?'It goes straight up and down.':'It slopes, so it is neither horizontal nor vertical.'})},
  ()=>{const p=Math.random()<.5;return mc(p?'Lines that are always the same distance apart and never meet, like train tracks, are called…':'Two lines that meet at a right angle are called…',p?'Parallel':'Perpendicular',['Parallel','Perpendicular','Horizontal','Vertical'],{keep:true,why:p?'Parallel lines never meet.':'Perpendicular lines meet at a right angle.'})}));

/* STATISTICS */
skill('bar','stat','Bar charts','Read the scale in 1s, 2s, 5s or 10s',()=>barQ([1,2,5,10]));
skill('picto','stat','Pictograms','One circle stands for 2, 4, 5 or 10',()=>pictoQ([2,4,5,10],true));
skill('tally','stat','Tally charts','Count tally marks in fives',()=>tallyQ(2,19));
});
