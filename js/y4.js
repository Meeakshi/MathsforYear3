/* Year 4 — National Curriculum for England */
year(4,{age:'8–9',dec:true,blurb:'All times tables to 12 × 12, decimals, negative numbers, area',strands:[['num','Number & place value'],['add','Adding & subtracting'],['mul','Times tables & multiplying'],['frac','Fractions & decimals'],['meas','Measurement'],['mt','Money & time'],['geo','Shapes, angles & coordinates'],['stat','Charts & graphs']]},skill=>{

/* NUMBER */
skill('pv4','num','Place value','What is the 7 worth in 7,342?',()=>pvQ(4));
skill('more4','num','1,000 more or less','What is 1,000 more than 4,562?',()=>{const amt=pick([10,100,1000]),more=Math.random()<.5,n=more?R(1000,9999-amt):R(1000+amt,9999),ans=more?n+amt:n-amt;
  return num(`What is <b>${cm(amt)} ${more?'more':'less'}</b> than ${big(cm(n))}?`,ans,{why:`${cm(n)} ${more?'+':'−'} ${cm(amt)} = ${cm(ans)}.`})});
skill('count4','num','Counting in 6s, 7s, 9s, 25s & 1,000s','25, 50, 75…',()=>countQ([6,7,9,25,1000],{start:s=>s*R(0,s===1000?5:8)}));
skill('neg4','num','Negative numbers','Count back through zero',()=>alt(
  ()=>countQ([1,2,5],{start:s=>-s*R(2,4),back:Math.random()<.5}),
  ()=>{const k=R(0,10),start=-5;return num('What number is the arrow pointing to?',k-5,{vis:nline(start,1,k,i=>neg(i-5)),why:`Count from 0: numbers to the left of zero are negative. The arrow is at ${neg(k-5)}.`})},
  ()=>{const a=R(-3,8),b=R(a+2>8?1:a+2,12);return num(`What is <b>${b}</b> less than <b>${neg(a)}</b>?`,a-b,{why:`Count back ${b} from ${neg(a)}: ${neg(a-b)}.`})}));
skill('round4','num','Rounding','Round 3,462 to the nearest 100',()=>roundQ(1000,9999,[10,100,1000]));
skill('compare4','num','Compare & order','4,325 ? 4,352',()=>Math.random()<.5?compareQ(1000,9999):orderQ(1000,9999));
skill('roman4','num','Roman numerals to 100','XLVII = ?',()=>{const n=R(1,100);return Math.random()<.5?num(`What number is the Roman numeral ${big(roman(n))}?`,n,{why:`I = 1, V = 5, X = 10, L = 50, C = 100. A smaller numeral before a bigger one is taken away. ${roman(n)} = ${n}.`}):mc(`How do you write ${big(n)} in Roman numerals?`,roman(n),[roman(n+1),roman(Math.max(1,n-1)),roman(n+10>100?n-10:n+10),roman(n+5>100?n-5:n+5)],{why:`${n} = ${roman(n)}.`})});

/* ADD & SUBTRACT */
skill('cola4','add','Column addition','4-digit numbers',()=>columnQ('+',4,Math.random()<.5?4:3));
skill('cols4','add','Column subtraction','4-digit numbers',()=>columnQ('−',4,Math.random()<.5?4:3));
skill('est4','add','Estimate & check','Use the inverse to check',()=>alt(
  ()=>{const a=R(2000,8000),b=R(1000,9999-a<1000?1000:9999-a),r=x=>Math.round(x/1000)*1000,e=r(a)+r(b);return mc(`Which is the best estimate for ${big(`${cm(a)} + ${cm(b)}`)}?`,cm(e),[e+1000,e-1000,e+2000].filter(x=>x>0).map(cm),{why:`${cm(a)} ≈ ${cm(r(a))} and ${cm(b)} ≈ ${cm(r(b))}. ${cm(r(a))} + ${cm(r(b))} = ${cm(e)}.`})},
  ()=>{const a=R(3000,9999),b=R(1000,a-500),c=a-b;return mc(`${cm(a)} − ${cm(b)} = ${cm(c)}<br>Which calculation <b>checks</b> this?`,`${cm(c)} + ${cm(b)}`,[`${cm(c)} − ${cm(b)}`,`${cm(a)} + ${cm(b)}`,`${cm(b)} − ${cm(c)}`],{why:`Addition undoes subtraction: ${cm(c)} + ${cm(b)} should give ${cm(a)}.`})}));
skill('word4','add','Two-step problems','Tickets sold on two days',()=>{const n=nm();return alt(
  ()=>{const a=R(1200,3000),b=R(800,2500),c=R(500,a+b-200);return num(`A cinema sold <b>${cm(a)}</b> tickets on Saturday and <b>${cm(b)}</b> on Sunday. <b>${cm(c)}</b> were children's tickets. How many were adult tickets?`,a+b-c,{why:`Total: ${cm(a)} + ${cm(b)} = ${cm(a+b)}. Adults: ${cm(a+b)} − ${cm(c)} = ${cm(a+b-c)}.`})},
  ()=>{const t=R(4000,9000),a=R(1000,2500),b=R(1000,2500);return num(`${n} is saving for a ${cm(t)}-point prize. They earn <b>${cm(a)}</b> points one week and <b>${cm(b)}</b> the next. How many more points do they need?`,t-a-b,{why:`${cm(a)} + ${cm(b)} = ${cm(a+b)}. ${cm(t)} − ${cm(a+b)} = ${cm(t-a-b)}.`})})});

/* TIMES TABLES */
skill('t6','mul','6 times table','7 × 6, 54 ÷ 6',()=>tableQ(6));
skill('t7','mul','7 times table','8 × 7, 63 ÷ 7',()=>tableQ(7));
skill('t9','mul','9 times table','6 × 9, 72 ÷ 9',()=>tableQ(9));
skill('t1112','mul','11 & 12 times tables','11 × 7, 96 ÷ 12',()=>tableQ(pick([11,12])));
skill('tall4','mul','All tables to 12 × 12','Including × 0 and × 1',()=>tableQ(R(2,12),12,Math.random()<.15?0:1));
skill('factors4','mul','Factor pairs','Which pair makes 24?',()=>{const n=pick([12,16,18,20,24,30,36,40,42,48,56,60,72]),fs=factors(n).filter(f=>f>1&&f<n),f=pick(fs);return alt(
  ()=>num(big(`${f} × ${BL} = ${n}`),n/f,{why:`${f} × ${n/f} = ${n}, so ${f} and ${n/f} are a factor pair of ${n}.`}),
  ()=>mc(`Which pair of numbers multiplies to make <b>${n}</b>?`,`${f} and ${n/f}`,[`${f} and ${n/f+1}`,`${f+1} and ${n/f}`,`${n/2} and ${n/2}`].filter(x=>x!==`${f} and ${n/f}`),{why:`${f} × ${n/f} = ${n}.`}))});
skill('mul3n','mul','Multiplying three numbers','2 × 6 × 5',()=>{const [a,b,c]=[R(2,6),R(2,6),pick([2,5,10])];return num(big(`${a} × ${b} × ${c} = ${BL}`),a*b*c,{why:`Multiply two first: ${a} × ${b} = ${a*b}, then × ${c} = ${a*b*c}.`})});
skill('mul3d','mul','Written multiplication','3-digit × 1-digit',()=>{const b=R(3,9),a=Math.random()<.4?R(12,99):R(100,999),H=Math.floor(a/100)*100,T=Math.floor(a%100/10)*10,O=a%10;
  return num('Work out the answer.',a*b,{vis:colVis(a,b,'×',a*b),why:[H&&`${H} × ${b} = ${H*b}`,T&&`${T} × ${b} = ${T*b}`,`${O} × ${b} = ${O*b}`].filter(Boolean).join('<br>')+`<br>Add them: ${a*b}`})});
skill('div4','mul','Dividing','84 ÷ 7, 132 ÷ 12',()=>{const b=R(3,12),q=R(11,b>8?16:30);return num(big(`${q*b} ÷ ${b} = ${BL}`),q,{why:`${q} × ${b} = ${q*b}, so ${q*b} ÷ ${b} = ${q}.`})});
skill('mulword4','mul','Word problems','Outfits, packs and scaling',()=>alt(
  ()=>{const a=R(3,6),b=R(3,6),c=R(2,4);return num(`A café sells <b>${a}</b> sandwiches, <b>${b}</b> drinks and <b>${c}</b> fruits. How many different meals with one of each?`,a*b*c,{why:`${a} × ${b} × ${c} = ${a*b*c}.`})},
  ()=>{const p=R(6,12),n=R(12,45);return num(`Pens come in packs of <b>${p}</b>. How many pens in <b>${n}</b> packs?`,p*n,{why:`${n} × ${p} = ${n*p}.`})},
  ()=>{const s=R(12,40),k=R(3,9);return num(`A tree is <b>${s} m</b> tall. A tower is <b>${k} times</b> as tall. How tall is the tower?`,s*k,{post:'m',why:`${s} × ${k} = ${s*k}.`})}));

/* FRACTIONS & DECIMALS */
skill('fequiv4','frac','Equivalent fractions','3/4 = ?/12',()=>{const [a,b]=pick([[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[1,6],[5,6]]),m=R(2,Math.max(2,Math.floor(20/b))),d=b*m;
  return Math.random()<.6?num(big(`${fr(a,b)} = ${fr(BL,d)}`),a*m,{why:`${b} × ${m} = ${d}, so multiply the numerator by ${m} too: ${a*m}.`}):num(big(`${fr(a*m,d)} = ${fr(a,BL)}`),b,{why:`Divide the top and bottom by ${m}: ${a*m} ÷ ${m} = ${a}, ${d} ÷ ${m} = ${b}.`})});
skill('hund4','frac','Tenths & hundredths','0.7 = ?/10, 34 ÷ 10',()=>alt(
  ()=>{const k=R(1,9);return num(big(`0.${k} = ${fr(BL,10)}`),k,{why:`The first digit after the decimal point is tenths: 0.${k} = ${fr(k,10)}.`})},
  ()=>{const k=R(1,99);return num(big(`${fr(k,100)} = ${BL}`),ds(k/100),{why:`Hundredths are two places after the decimal point: ${fr(k,100)} = ${ds(k/100)}.`})},
  ()=>{const n=R(1,99),d=pick([10,100]);return num(big(`${n} ÷ ${d} = ${BL}`),ds(n/d),{why:`Dividing by ${d} moves each digit ${d===10?'one place':'two places'} to the right: ${ds(n/d)}.`})},
  ()=>{const k=R(1,99);return num(`Shade ${k} squares of a hundred square. What fraction is shaded? ${fr(BL,100)}`,k,{vis:hundredSvg(k),why:`${k} out of 100 squares are shaded: ${fr(k,100)}.`})}));
skill('dec4','frac','Decimal equivalents','¼ = 0.25',()=>{const pairs=[[fr(1,2),'0.5'],[fr(1,4),'0.25'],[fr(3,4),'0.75'],[fr(1,10),'0.1'],[fr(3,10),'0.3'],[fr(7,10),'0.7'],[fr(9,100),'0.09'],[fr(45,100),'0.45']],[f,d]=pick(pairs);
  return Math.random()<.5?mc(`Which decimal is the same as ${big(f)}?`,d,shuffle(pairs.map(p=>p[1]).filter(x=>x!==d)),{why:`${f} = ${d}.`}):mc(`Which fraction is the same as ${big(d)}?`,f,shuffle(pairs.map(p=>p[0]).filter(x=>x!==f)),{why:`${d} = ${f}.`})});
skill('fadd4','frac','Adding & subtracting fractions','5/8 + 6/8',()=>{const d=R(3,12),sub=Math.random()<.4;let a,b;if(sub){a=R(3,2*d);b=R(1,a-1)}else{a=R(1,d);b=R(1,d)}const ans=sub?a-b:a+b;
  return num(`Fill in the missing numerator.<br>${big(`${fr(a,d)} ${sub?'−':'+'} ${fr(b,d)} = ${fr(BL,d)}`)}`,ans,{why:`Same denominators, so ${sub?'subtract':'add'} the numerators: ${a} ${sub?'−':'+'} ${b} = ${ans}.${ans>d?` That is more than one whole.`:''}`})});
skill('fof4','frac','Fractions of amounts','3/5 of 40',()=>fofQ([3,4,5,6,8,10,12],2,12,true));
skill('decround4','frac','Rounding decimals','Round 4.7 to the nearest whole number',()=>{const x=R(11,199)/10;const ans=Math.round(x);return num(`Round ${big(ds(x))} to the nearest whole number.`,ans,{why:`Look at the tenths digit: ${Math.round(x*10)%10}. ${Math.round(x*10)%10>=5?'5 or more, so round up':'Less than 5, so round down'}: ${ans}.`})});
skill('deccmp4','frac','Comparing decimals','Which is bigger: 0.7 or 0.65?',()=>{const vals=new Set();while(vals.size<4)vals.add(ds(R(1,99)/(Math.random()<.5?10:100)+R(0,3)));const v=[...vals],most=Math.random()<.5,ans=v.reduce((a,b)=>(most?+b>+a:+b<+a)?b:a);
  return mc(`Which number is the <b>${most?'greatest':'smallest'}</b>?`,ans,v,{why:`Compare the ones, then tenths, then hundredths. ${ans} is the ${most?'greatest':'smallest'}.`})});

/* MEASUREMENT */
skill('conv4','meas','Converting units','3 km = ? m',()=>{const a=R(1,9);return alt(
  ()=>num(big(`${a} km = ${BL} m`),a*1000,{why:`1 km = 1,000 m, so ${a} km = ${cm(a*1000)} m.`}),
  ()=>num(big(`${cm(a*1000)} m = ${BL} km`),a,{why:`1,000 m = 1 km.`}),
  ()=>{const b=R(1,9)*100;return num(big(`${a} kg ${b} g = ${BL} g`),a*1000+b,{why:`${a} kg = ${cm(a*1000)} g. + ${b} g = ${cm(a*1000+b)} g.`})},
  ()=>{const b=R(1,19)*50;return num(big(`${a} l ${b} ml = ${BL} ml`),a*1000+b,{why:`${a} l = ${cm(a*1000)} ml. + ${b} ml = ${cm(a*1000+b)} ml.`})},
  ()=>{const c=R(1,9);return num(big(`${c} m = ${BL} cm`),c*100,{why:`1 m = 100 cm.`})},
  ()=>{const c=R(2,9);return num(big(`${c*10} cm = ${BL} mm`),c*100,{why:`1 cm = 10 mm, so ${c*10} cm = ${c*100} mm.`})})});
skill('perim4','meas','Perimeter','Rectangles and rectilinear shapes',()=>alt(
  ()=>{const w=R(4,25),h=R(3,20),u=pick(['cm','m']);return num('What is the perimeter of this rectangle?',2*(w+h),{post:u,vis:rectLab(w,h,u),why:`${w} + ${h} + ${w} + ${h} = ${2*(w+h)} ${u}.`})},
  ()=>{const L=lShape();return num('Each square is 1 cm. What is the perimeter?',L.perim,{post:'cm',vis:gridPoly(L.pts,L.W,L.H),why:`Count every edge around the outside: ${L.perim} cm.`})},
  ()=>{const s=R(3,15);return num(`A square has sides of <b>${s} cm</b>. What is its perimeter?`,4*s,{post:'cm',why:`4 × ${s} = ${4*s} cm.`})}));
skill('area4','meas','Area by counting squares','Count the squares inside',()=>{const L=lShape();return num('Each square is 1 cm². What is the <b>area</b> of the shape?',L.area,{post:'cm²',vis:gridPoly(L.pts,L.W,L.H),why:`Count the squares inside the shape: ${L.area} squares, so the area is ${L.area} cm².`})});

/* MONEY & TIME */
skill('money4','mt','Money','Pounds and pence',()=>{const n=nm();return alt(
  ()=>{const a=R(120,950),b=R(120,950);return mc(`${n} buys a book for <b>${fmt(a)}</b> and a game for <b>${fmt(b)}</b>. What is the total?`,fmt(a+b),[fmt(a+b+10),fmt(a+b-10),fmt(a+b+100)],{why:`${fmt(a)} + ${fmt(b)} = ${fmt(a+b)}.`})},
  ()=>{const pay=pick([1000,2000]),c=R(150,pay-100);return mc(`A toy costs <b>${fmt(c)}</b>. ${n} pays with a <b>${fmt(pay)}</b> note. How much change?`,fmt(pay-c),[fmt(pay-c+10),fmt(pay-c+100),fmt(Math.abs(pay-c-1))],{why:`${fmt(pay)} − ${fmt(c)} = ${fmt(pay-c)}.`})},
  ()=>{const p=R(105,995),q=R(2,5);return mc(`One ticket costs <b>${fmt(p)}</b>. How much do <b>${q}</b> tickets cost?`,fmt(p*q),[fmt(p*q+100),fmt(p*q-10),fmt(p+q*100)],{why:`${fmt(p)} × ${q} = ${fmt(p*q)}.`})})});
skill('time4','mt','12- & 24-hour time','Analogue, digital and 24-hour',()=>alt(
  ()=>clockQ(3),
  ()=>{const H=R(13,23),m=R(0,59);return mc(`What is <b>${pad(H)}:${pad(m)}</b> in 12-hour time?`,`${H-12}:${pad(m)} pm`,[`${H-12}:${pad(m)} am`,`${H-10}:${pad(m)} pm`,`${H-2}:${pad(m)} pm`],{why:`Subtract 12 from the hour: ${H} − 12 = ${H-12}. It is pm.`})},
  ()=>{const h=R(1,11),m=R(0,59),pm=Math.random()<.5;const H=pm?h+12:h;return mc(`Write <b>${h}:${pad(m)} ${pm?'pm':'am'}</b> as a 24-hour time.`,`${pad(H)}:${pad(m)}`,[`${pad(pm?h:h+12)}:${pad(m)}`,`${pad((H+1)%24)}:${pad(m)}`,`${pad(H)}:${pad((m+10)%60)}`],{why:pm?`Add 12 to the hour for pm: ${h} + 12 = ${H}.`:`am times keep the same hour, with a 0 in front if needed.`})}));
skill('tconv4','mt','Converting time','Hours to minutes, weeks to days',()=>{const k=R(2,9);return alt(
  ()=>num(`How many minutes are in <b>${k} hours</b>?`,60*k,{post:'minutes',why:`${k} × 60 = ${60*k}.`}),
  ()=>num(`How many seconds are in <b>${k} minutes</b>?`,60*k,{post:'seconds',why:`${k} × 60 = ${60*k}.`}),
  ()=>num(`How many months are in <b>${k} years</b>?`,12*k,{post:'months',why:`${k} × 12 = ${12*k}.`}),
  ()=>num(`How many days are in <b>${k} weeks</b>?`,7*k,{post:'days',why:`${k} × 7 = ${7*k}.`}),
  ()=>{const m=R(1,3)*60+pick([15,30,45]);return num(`How many minutes is <b>${Math.floor(m/60)} hour${m>=120?'s':''} and ${m%60} minutes</b>?`,m,{post:'minutes',why:`${Math.floor(m/60)} × 60 = ${Math.floor(m/60)*60}, + ${m%60} = ${m}.`})})});

/* GEOMETRY */
skill('shapes4','geo','Triangles & quadrilaterals','Isosceles, rhombus, trapezium…',()=>alt(
  ()=>{const n=pick(Object.keys(QUADS));return mc('What is this quadrilateral called?',cap(n),shuffle(Object.keys(QUADS).map(cap).filter(x=>x!==cap(n))),{vis:quadSvg(n),why:{square:'4 equal sides and 4 right angles.',rectangle:'Opposite sides equal and 4 right angles.',rhombus:'4 equal sides, but no right angles.',parallelogram:'Opposite sides are parallel and equal.',trapezium:'Exactly one pair of parallel sides.',kite:'Two pairs of equal sides next to each other.'}[n]})},
  ()=>{const [a,b,c,ans]=pick([[6,6,6,'Equilateral'],[5,5,8,'Isosceles'],[7,7,4,'Isosceles'],[4,6,7,'Scalene'],[3,5,6,'Scalene'],[9,9,9,'Equilateral']]);return mc(`A triangle has sides of <b>${a} cm, ${b} cm and ${c} cm</b>. What type of triangle is it?`,ans,['Equilateral','Isosceles','Scalene'],{keep:true,why:'Equilateral: all 3 sides equal. Isosceles: 2 sides equal. Scalene: no sides equal.'})},
  ()=>{const [d,ans]=pick([['exactly one pair of parallel sides','Trapezium'],['4 equal sides and no right angles','Rhombus'],['4 equal sides and 4 right angles','Square'],['two pairs of equal sides next to each other','Kite']]);return mc(`Which quadrilateral has <b>${d}</b>?`,ans,shuffle(['Trapezium','Rhombus','Square','Kite','Rectangle'].filter(x=>x!==ans)),{why:`A ${ans.toLowerCase()} has ${d}.`})}));
skill('angles4','geo','Angles','Acute, obtuse and ordering angles',()=>alt(
  ()=>{const k=R(0,2),th=k===0?R(20,80):k===1?90:R(100,170);return mc('Is this angle acute, a right angle, or obtuse?',['Acute','Right angle','Obtuse'][k],['Acute','Right angle','Obtuse'],{keep:true,vis:angleSvg(th,R(0,180)),why:['Less than a right angle, so acute.','Exactly a right angle.','More than a right angle but less than two right angles, so obtuse.'][k]})},
  ()=>{const ths=shuffle([R(20,50),R(60,85),R(100,130),R(140,170)]).slice(0,3),labs=['A','B','C'],big1=Math.random()<.5,idx=ths.indexOf(big1?Math.max(...ths):Math.min(...ths));
    const s=ths.map((t,i)=>{const ox=20+i*170,P=a=>[ox+30+90*Math.cos(a*Math.PI/180),150-90*Math.sin(a*Math.PI/180)];const [x,y]=P(t);return `<line x1="${ox+30}" y1="150" x2="${ox+120}" y2="150" stroke="currentColor" stroke-width="4"/><line x1="${ox+30}" y1="150" x2="${f1(x)}" y2="${f1(y)}" stroke="currentColor" stroke-width="4"/><text x="${ox+75}" y="185" text-anchor="middle" font-size="20" font-weight="700">${labs[i]}</text>`}).join('');
    return mc(`Which angle is the <b>${big1?'largest':'smallest'}</b>?`,`Angle ${labs[idx]}`,labs.map(l=>`Angle ${l}`),{keep:true,vis:svg(530,200,s,'three angles'),why:`Angle ${labs[idx]} has the ${big1?'widest':'narrowest'} opening.`})}));
const SYM=[['square',4],['rectangle',2],['equilateral triangle',3],['isosceles triangle',1],['regular pentagon',5],['regular hexagon',6],['kite',1],['parallelogram',0],['rhombus',2],['scalene triangle',0]];
skill('sym4','geo','Lines of symmetry','How many lines of symmetry?',()=>{const [n,k]=pick(SYM);const vis=n.includes('regular')?svg(260,220,`<polygon points="${poly(n.includes('pent')?5:6,130,110,90,-90)}" class="shp"/>`,n):QUADS[n]?quadSvg(n):undefined;
  return num(`How many lines of symmetry does a <b>${n}</b> have?`,k,{vis,why:`A ${n} has ${k} line${k===1?'':'s'} of symmetry.${k===0?' No fold makes the halves match.':''}`})});
skill('coord4','geo','Coordinates','What are the coordinates of A?',()=>{const x=R(0,10),y=R(0,10);return alt(
  ()=>mc('What are the coordinates of point <b>A</b>?',`(${x}, ${y})`,[`(${y}, ${x})`,`(${x+1}, ${y})`,`(${x}, ${Math.max(0,y-1)})`],{vis:coordSvg([[x,y,'A']]),why:`Go across first (x = ${x}), then up (y = ${y}): (${x}, ${y}). "Along the corridor, then up the stairs."`}),
  ()=>{const dx=R(-3,3)||2,dy=R(-3,3)||-1,X=Math.min(10,Math.max(0,x+dx)),Y=Math.min(10,Math.max(0,y+dy)),mx=X-x,my=Y-y;if(mx===0&&my===0)return mc('What are the coordinates of point <b>A</b>?',`(${x}, ${y})`,[`(${y}, ${x})`,`(${x+1}, ${y})`],{vis:coordSvg([[x,y,'A']])});
    const t=`${Math.abs(mx)?`${Math.abs(mx)} ${mx>0?'right':'left'}`:''}${mx&&my?' and ':''}${Math.abs(my)?`${Math.abs(my)} ${my>0?'up':'down'}`:''}`;
    return mc(`Point A is at (${x}, ${y}). It moves <b>${t}</b>. Where is it now?`,`(${X}, ${Y})`,[`(${Y}, ${X})`,`(${x-mx}, ${y-my})`,`(${X}, ${y})`,`(${x}, ${Y})`],{vis:coordSvg([[x,y,'A']]),why:`x changes by ${mx}, y changes by ${my}: (${X}, ${Y}).`})})});

/* CHARTS */
skill('bar4','stat','Bar charts','Sum and difference questions',()=>barQ([2,5,10,20]));
skill('line4','stat','Line graphs','Temperature during the day',()=>lineQ());
});
