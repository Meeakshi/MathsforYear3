/* Year 6 — National Curriculum for England */
year(6,{age:'10–11',dec:true,blurb:'Long division, ratio, algebra, pie charts, the mean — ready for SATs',strands:[['num','Number & place value'],['mul','Calculating'],['frac','Fractions, decimals & %'],['ratio','Ratio & proportion'],['alg','Algebra'],['meas','Measurement'],['geo','Shapes & angles'],['stat','Statistics']]},skill=>{

/* NUMBER */
skill('pv6','num','Place value to 10,000,000','What is the 4 worth in 4,503,216?',()=>Math.random()<.3?(()=>{const n=R(1000000,9999999);return mc(`Which number is <b>“${words(n)}”</b>?`,cm(n),[n+100000,n-10000,Math.floor(n/10),n+1000000].map(cm),{why:`${cap(words(n))} = ${cm(n)}.`})})():pvQ(7));
skill('round6','num','Rounding','Round 3,456,789 to the nearest 100,000',()=>roundQ(100000,9999999,[1000,10000,100000,1000000]));
skill('neg6','num','Negative numbers','−4 + 9, difference between −6 and 5',()=>alt(
  ()=>{const a=R(-12,-1),b=R(2,15);return num(big(`${neg(a)} + ${b} = ${BL}`),a+b,{why:`Start at ${neg(a)} and count up ${b}: ${neg(a+b)}.`})},
  ()=>{const a=R(-9,5),b=R(3,14);return num(big(`${neg(a)} − ${b} = ${BL}`),a-b,{why:`Start at ${neg(a)} and count down ${b}: ${neg(a-b)}.`})},
  ()=>{const a=R(-15,-1),b=R(1,15);return num(`What is the difference between <b>${neg(a)}</b> and <b>${b}</b>?`,b-a,{why:`From ${neg(a)} to 0 is ${-a}, then to ${b} is ${b} more: ${b-a}.`})}));

/* CALCULATING */
skill('longmul6','mul','Long multiplication','4-digit × 2-digit',()=>{const a=Math.random()<.5?R(100,999):R(1000,9999),b=R(12,99),t=Math.floor(b/10)*10,o=b%10;return num('Work out the answer.',a*b,{vis:colVis(a,b,'×',a*b),why:`${cm(a)} × ${o} = ${cm(a*o)}<br>${cm(a)} × ${t} = ${cm(a*t)}<br>${cm(a*o)} + ${cm(a*t)} = ${cm(a*b)}`})});
skill('longdiv6','mul','Long division','4-digit ÷ 2-digit',()=>{const b=R(12,35),q=R(21,Math.floor(9999/b)),a=q*b;return num(big(`${cm(a)} ÷ ${b} = ${BL}`),q,{why:`Write out multiples of ${b} to help: ${range(1,5).map(i=>i*b).join(', ')}… Then divide step by step. Check: ${q} × ${b} = ${cm(a)}.`})});
skill('bodmas6','mul','Order of operations','3 + 4 × 2',()=>{const a=R(2,12),b=R(2,9),c=R(2,9);return alt(
  ()=>num(big(`${a} + ${b} × ${c} = ${BL}`),a+b*c,{why:`Multiply before adding: ${b} × ${c} = ${b*c}, then ${a} + ${b*c} = ${a+b*c}.`}),
  ()=>num(big(`(${a} + ${b}) × ${c} = ${BL}`),(a+b)*c,{why:`Brackets first: ${a} + ${b} = ${a+b}, then × ${c} = ${(a+b)*c}.`}),
  ()=>{const p=b*c+a;return num(big(`${p} − ${b} × ${c} = ${BL}`),a,{why:`Multiply first: ${b} × ${c} = ${b*c}. ${p} − ${b*c} = ${a}.`})},
  ()=>{const d=b*c;return num(big(`${d} ÷ ${b} + ${a} = ${BL}`),c+a,{why:`Divide first: ${d} ÷ ${b} = ${c}, then + ${a} = ${c+a}.`})})});
skill('cfm6','mul','Common factors, multiples & primes','HCF and LCM',()=>alt(
  ()=>{const [a,b]=pick([[4,6],[6,8],[3,5],[6,9],[4,10],[8,12],[5,6],[9,12]]);return num(`What is the <b>lowest common multiple</b> of ${a} and ${b}?`,lcm(a,b),{why:`Multiples of ${a}: ${range(1,6).map(i=>i*a).join(', ')}… Multiples of ${b}: ${range(1,6).map(i=>i*b).join(', ')}… The first in both is ${lcm(a,b)}.`})},
  ()=>{const [a,b]=pick([[18,24],[24,36],[30,45],[28,42],[36,48],[40,60]]);return num(`What is the <b>highest common factor</b> of ${a} and ${b}?`,gcd(a,b),{why:`The biggest number that divides into both ${a} and ${b} is ${gcd(a,b)}.`})},
  ()=>{const ps=range(20,100).filter(isPrime),p=pick(ps),wr=shuffle(range(21,99).filter(x=>!isPrime(x)&&x%2&&x%5)).slice(0,3);return mc('Which is a prime number?',p,wr,{why:`${p} only has the factors 1 and ${p}.`})}));
skill('mental6','mul','Mental calculation','Using known facts',()=>alt(
  ()=>{const a=R(2,9),b=R(2,9);return num(`${a} × ${b} = ${a*b}<br>So what is ${big(`${a*100} × ${b*10}`)}?`,a*b*1000,{why:`${a*100} × ${b*10} = ${a} × ${b} × 1,000 = ${cm(a*b*1000)}.`})},
  ()=>{const a=R(2,9),b=R(2,9);return num(`${a} × ${b} = ${a*b}<br>So what is ${big(`${ds(a/10)} × ${b}`)}?`,ds(a*b/10),{why:`${ds(a/10)} is ${a} ÷ 10, so the answer is ${a*b} ÷ 10 = ${ds(a*b/10)}.`})},
  ()=>{const a=R(101,999),b=pick([99,199,999]);return num(big(`${cm(a+b)} − ${b} = ${BL}`),a,{why:`Take away ${b+1}, then add 1 back.`})}));
skill('est6','mul','Estimating','Which is the best estimate?',()=>{const a=R(21,89),b=R(21,89),r=x=>Math.round(x/10)*10,e=r(a)*r(b);return mc(`Which is the best estimate for ${big(`${a} × ${b}`)}?`,cm(e),[e*10,Math.round(e/10),e+r(a)*10].map(cm),{why:`${a} ≈ ${r(a)} and ${b} ≈ ${r(b)}. ${r(a)} × ${r(b)} = ${cm(e)}.`})});

/* FRACTIONS, DECIMALS & % */
skill('simp6','frac','Simplifying fractions','12/18 = 2/3',()=>{const d=R(3,12),n=R(1,d-1),g=gcd(n,d),a=n/g,b=d/g,m=R(2,6);return num(`Simplify ${big(fr(n*m,d*m))} fully. What is the <b>denominator</b>?`,b,{why:`Divide top and bottom by the highest common factor (${g*m}): ${fr(n*m,d*m)} = ${fr(a,b)}.`})});
skill('fadd6','frac','Adding & subtracting fractions','1/3 + 1/4',()=>{const [b,d]=pick([[2,3],[3,4],[2,5],[4,5],[3,5],[4,6],[6,8],[3,8]]),L=lcm(b,d),a=R(1,b-1),c=R(1,d-1),A=a*L/b,C=c*L/d,sub=A>C&&Math.random()<.5,ans=sub?A-C:A+C;
  return num(`Fill in the missing numerator.<br>${big(`${fr(a,b)} ${sub?'−':'+'} ${fr(c,d)} = ${fr(BL,L)}`)}`,ans,{why:`Use the common denominator ${L}: ${fr(a,b)} = ${fr(A,L)} and ${fr(c,d)} = ${fr(C,L)}. ${A} ${sub?'−':'+'} ${C} = ${ans}.`})});
skill('fmul6','frac','Multiplying fractions','1/4 × 1/2',()=>{const a=R(1,4),b=R(a+1,6),c=R(1,4),d=R(c+1,6);return num(`Fill in the missing denominator.<br>${big(`${fr(a,b)} × ${fr(c,d)} = ${fr(a*c,BL)}`)}`,b*d,{why:`Multiply the numerators (${a} × ${c} = ${a*c}) and the denominators (${b} × ${d} = ${b*d}).`})});
skill('fdiv6','frac','Dividing fractions by whole numbers','1/3 ÷ 2',()=>{const a=R(1,3),b=R(a+1,8),k=R(2,5);return Math.random()<.5&&a%k===0?num(big(`${fr(a,b)} ÷ ${k} = ${fr(BL,b)}`),a/k,{why:`Divide the numerator by ${k}.`}):num(`Fill in the missing denominator.<br>${big(`${fr(a,b)} ÷ ${k} = ${fr(a,BL)}`)}`,b*k,{why:`Dividing by ${k} makes each part ${k} times smaller: multiply the denominator by ${k}. ${b} × ${k} = ${b*k}.`})});
skill('fdp6','frac','Fractions, decimals & percentages','3/8 = 0.375 = 37.5%',()=>{const T=[[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8],[7,8],[1,10],[7,10],[1,20],[3,20]],[n,d]=pick(T),dv=n/d;return alt(
  ()=>num(`Write ${big(fr(n,d))} as a decimal.`,ds(dv),{why:`${n} ÷ ${d} = ${ds(dv)}.`}),
  ()=>num(`Write ${big(fr(n,d))} as a percentage.`,ds(dv*100),{post:'%',why:`${fr(n,d)} = ${ds(dv)} = ${ds(dv*100)}%.`}),
  ()=>mc(`Which is the same as <b>${ds(dv*100)}%</b>?`,fr(n,d),shuffle(T.filter(x=>x[0]/x[1]!==dv)).slice(0,3).map(x=>fr(x[0],x[1])),{why:`${ds(dv*100)}% = ${ds(dv)} = ${fr(n,d)}.`}))});
skill('pctof6','frac','Percentages of amounts','15% of 60',()=>{const p=pick([10,20,25,50,5,15,30,75,40,60]),n=pick([20,40,60,80,120,200,240,360,400]);const ans=p*n/100;return Number.isInteger(ans)?num(`What is <b>${p}%</b> of ${big(n)}?`,ans,{why:`10% of ${n} is ${n/10}. ${p}% = ${p/10} × ${n/10}${p%10?` (or use 5% = half of 10%)`:''} = ${ans}.`}):num(`What is <b>50%</b> of ${big(n)}?`,n/2,{why:`50% is half.`})});
skill('dec6','frac','Decimal calculations','0.7 × 8, 3.6 ÷ 4',()=>alt(
  ()=>{const a=R(1,9),b=R(2,9);return num(big(`${ds(a/10)} × ${b} = ${BL}`),ds(a*b/10),{why:`${a} × ${b} = ${a*b}, then ÷ 10 = ${ds(a*b/10)}.`})},
  ()=>{const b=R(2,9),q=R(2,19);return num(big(`${ds(q*b/10)} ÷ ${b} = ${BL}`),ds(q/10),{why:`${q*b} ÷ ${b} = ${q}, then ÷ 10 = ${ds(q/10)}.`})},
  ()=>{const x=R(1001,99999)/1000,p=pick([10,100,1000]),m=Math.random()<.5;return num(big(`${ds(x)} ${m?'×':'÷'} ${cm(p)} = ${BL}`),ds(m?x*p:x/p),{why:`Move the digits ${Math.round(Math.log10(p))} place${p>10?'s':''} ${m?'left':'right'}.`})}));

/* RATIO */
skill('ratio6','ratio','Ratio & proportion','For every 2 red there are 3 blue',()=>{const a=R(1,5),b=R(1,6);return alt(
  ()=>{const k=R(2,8);return num(`In a bag, for every <b>${a}</b> red ball there ${a>1?'are':'is'} <b>${b}</b> blue balls. There are <b>${a*k}</b> red balls. How many blue balls?`,b*k,{why:`${a*k} ÷ ${a} = ${k} groups. ${k} × ${b} = ${b*k}.`})},
  ()=>{const k=R(2,10),t=(a+b)*k;return num(`Share <b>${t}</b> sweets in the ratio <b>${a} : ${b}</b>. How many sweets does the first person get?`,a*k,{why:`${a} + ${b} = ${a+b} parts. ${t} ÷ ${a+b} = ${k} per part. ${a} × ${k} = ${a*k}.`})},
  ()=>{const s=R(2,6),q=R(2,8)*50;return num(`A recipe for <b>4</b> people needs <b>${q} g</b> of flour. How much flour for <b>${4*s/2}</b> people?`,q*s/2,{post:'g',why:`${4*s/2} people is ${s/2} times as many. ${q} × ${s/2} = ${q*s/2} g.`})},
  ()=>{const l=R(2,9),k=R(2,5);return num(`A rectangle is <b>${l} cm</b> long. It is enlarged by a <b>scale factor of ${k}</b>. How long is it now?`,l*k,{post:'cm',why:`${l} × ${k} = ${l*k} cm.`})})});

/* ALGEBRA */
skill('formula6','alg','Formulae','Cost = 3n + 2',()=>{const a=R(2,9),b=R(1,15),n=R(2,12);return alt(
  ()=>num(`A taxi costs <b>£${b}</b> plus <b>£${a}</b> per mile. The formula is <b>cost = ${a}m + ${b}</b>. What is the cost for <b>${n}</b> miles?`,a*n+b,{pre:'£',why:`${a} × ${n} + ${b} = ${a*n+b}.`}),
  ()=>num(`If <b>y = ${a}x − ${b}</b>, what is y when <b>x = ${n}</b>?`,a*n-b,{why:`${a} × ${n} = ${a*n}. ${a*n} − ${b} = ${a*n-b}.`}))});
skill('seq6','alg','Sequences','Find the next term and the rule',()=>{const d=R(2,9),s=R(-5,20),seq=range(0,4).map(i=>s+i*d);return alt(
  ()=>num(`What is the next number in this sequence?<br>${big(seq.map(neg).join(', ')+', '+BL)}`,s+5*d,{why:`It goes up by ${d} each time: ${neg(seq[4])} + ${d} = ${neg(s+5*d)}.`}),
  ()=>{const rule=s-d===0?`${d}n`:`${d}n ${s-d<0?'−':'+'} ${Math.abs(s-d)}`;return mc(`Which rule gives the sequence ${big(seq.map(neg).join(', ')+', …')}?<br><small>(n is the position: 1st, 2nd, 3rd…)</small>`,rule,[`n + ${d}`,`${d}n`,`${d}n ${s<0?'−':'+'} ${Math.abs(s)}`].filter(r=>r!==rule),{why:`It goes up in ${d}s, so it is ${d}n plus or minus something. For n = 1: ${d} × 1 ${s-d<0?'−':'+'} ${Math.abs(s-d)} = ${neg(s)}.`})})});
skill('eqn6','alg','Solving equations','3a + 4 = 19',()=>{const a=R(2,9),x=R(1,12),b=R(1,20);return alt(
  ()=>num(`Find <b>a</b>.<br>${big(`${a}a + ${b} = ${a*x+b}`)}`,x,{why:`Take away ${b}: ${a}a = ${a*x}. Divide by ${a}: a = ${x}.`}),
  ()=>num(`Find <b>n</b>.<br>${big(`${a}n − ${b} = ${a*x-b}`)}`,x,{why:`Add ${b}: ${a}n = ${a*x}. Divide by ${a}: n = ${x}.`}),
  ()=>num(`Find <b>y</b>.<br>${big(`y ÷ ${a} = ${x}`)}`,a*x,{why:`Multiply both sides by ${a}: y = ${a*x}.`}))});
skill('two6','alg','Two unknowns','a + b = 10 and a − b = 4',()=>{const a=R(4,15),b=R(1,a-1);return alt(
  ()=>num(`<b>a + b = ${a+b}</b> and <b>a − b = ${a-b}</b>. What is <b>a</b>?`,a,{why:`Add the two: 2a = ${2*a}, so a = ${a} (and b = ${b}).`}),
  ()=>{const p=R(2,6),q=R(p+1,9);return num(`<b>x × y = ${p*q}</b> and <b>x + y = ${p+q}</b>. x is smaller than y. What is <b>x</b>?`,p,{why:`Try factor pairs of ${p*q}: ${p} × ${q} = ${p*q} and ${p} + ${q} = ${p+q}.`})})});

/* MEASUREMENT */
skill('conv6','meas','Converting units','3.456 kg = ? g, miles and km',()=>alt(
  ()=>{const x=R(1001,9999)/1000,[u1,u2]=pick([['kg','g'],['km','m'],['l','ml']]);return num(big(`${x.toFixed(3)} ${u1} = ${BL} ${u2}`),Math.round(x*1000),{why:`× 1,000: ${cm(Math.round(x*1000))} ${u2}.`})},
  ()=>{const k=R(1,9);return Math.random()<.5?num(`5 miles ≈ 8 km. About how many km is <b>${5*k} miles</b>?`,8*k,{post:'km',why:`${5*k} ÷ 5 = ${k}. ${k} × 8 = ${8*k} km.`}):num(`5 miles ≈ 8 km. About how many miles is <b>${8*k} km</b>?`,5*k,{post:'miles',why:`${8*k} ÷ 8 = ${k}. ${k} × 5 = ${5*k} miles.`})},
  ()=>{const g=R(1,999);return num(big(`${g} g = ${BL} kg`),ds(g/1000),{why:`÷ 1,000: ${ds(g/1000)} kg.`})}));
skill('area6','meas','Area of triangles & parallelograms','½ × base × height',()=>{const b=R(3,14)*(Math.random()<.5?2:1),h=R(2,12),tri=Math.random()<.5;const A=tri?b*h/2:b*h;if(tri&&!Number.isInteger(A))return num(`A parallelogram has base <b>${b} cm</b> and height <b>${h} cm</b>. What is its area?`,b*h,{post:'cm²',why:`Area = base × height = ${b*h} cm².`});
  const s=tri?`<polygon points="40,180 280,180 190,40" class="shp"/>`:`<polygon points="40,180 250,180 300,50 90,50" class="shp"/>`;const hx=tri?190:120;
  return num(`What is the area of this ${tri?'triangle':'parallelogram'}? <i>(Not to scale.)</i>`,A,{post:'cm²',vis:svg(330,215,s+`<line x1="${hx}" y1="${tri?40:50}" x2="${hx}" y2="180" stroke="currentColor" stroke-width="2" stroke-dasharray="6 5"/><text x="160" y="205" text-anchor="middle" font-size="16">base ${b} cm</text><text x="${hx+6}" y="120" font-size="16">height ${h} cm</text>`,'shape'),why:tri?`Area = ½ × base × height = ½ × ${b} × ${h} = ${A} cm².`:`Area = base × height = ${b} × ${h} = ${A} cm².`})});
skill('vol6','meas','Volume of cuboids','length × width × height',()=>{const l=R(2,12),w=R(2,8),h=R(2,10);return Math.random()<.7?num('What is the volume of this cuboid? <i>(Not to scale.)</i>',l*w*h,{post:'cm³',vis:cuboidSvg(Math.min(l,7),Math.min(w,4),Math.min(h,5),false,[`${l} cm`,`${w} cm`,`${h} cm`]),why:`${l} × ${w} × ${h} = ${l*w*h} cm³.`}):num(`A cuboid has a volume of <b>${l*w*h} cm³</b>. Its length is ${l} cm and width is ${w} cm. What is its height?`,h,{post:'cm',why:`${l} × ${w} = ${l*w}. ${l*w*h} ÷ ${l*w} = ${h} cm.`})});
skill('ap6','meas','Area & perimeter','Same area, different perimeter',()=>{const w=R(2,9),h=R(w+1,12),A=w*h;return alt(
  ()=>num(`A rectangle has an area of <b>${A} cm²</b>. One side is <b>${w} cm</b>. What is its perimeter?`,2*(w+h),{post:'cm',why:`Other side: ${A} ÷ ${w} = ${h}. Perimeter: 2 × (${w} + ${h}) = ${2*(w+h)} cm.`}),
  ()=>{const s=pick([16,24,36]),pairs=factors(s).filter(f=>f*f<=s).map(f=>[f,s/f]),[x,y]=pick(pairs);return num(`A rectangle with whole-number sides has an area of <b>${s} cm²</b> and one side of <b>${x} cm</b>. What is the perimeter?`,2*(x+y),{post:'cm',why:`${s} ÷ ${x} = ${y}. 2 × (${x} + ${y}) = ${2*(x+y)} cm.`})})});

/* GEOMETRY */
skill('circle6','geo','Circles','Radius and diameter',()=>{const r=R(2,15),d=Math.random()<.5;const s=`<circle cx="120" cy="110" r="90" class="shp"/><circle cx="120" cy="110" r="4" fill="currentColor"/>`+(d?`<line x1="30" y1="110" x2="210" y2="110" stroke="currentColor" stroke-width="3"/><text x="120" y="100" text-anchor="middle" font-size="16">${2*r} cm</text>`:`<line x1="120" y1="110" x2="210" y2="110" stroke="currentColor" stroke-width="3"/><text x="165" y="100" text-anchor="middle" font-size="16">${r} cm</text>`);
  return num(`What is the <b>${d?'radius':'diameter'}</b> of this circle?`,d?r:2*r,{post:'cm',vis:svg(240,220,s,'circle'),why:`The diameter is twice the radius. ${d?`${2*r} ÷ 2 = ${r}`:`${r} × 2 = ${2*r}`} cm.`})});
skill('angles6','geo','Missing angles','Triangles, quadrilaterals, straight lines',()=>alt(
  ()=>{const a=R(30,90),b=R(25,150-a);return num(`Two angles in a triangle are <b>${a}°</b> and <b>${b}°</b>. What is the third angle?`,180-a-b,{post:'°',vis:svg(320,200,`<polygon points="30,180 290,180 ${R(90,230)},30" class="shp"/><text x="70" y="170" font-size="16">${a}°</text><text x="240" y="170" font-size="16">${b}°</text>`,'triangle'),why:`Angles in a triangle add up to 180°. 180 − ${a} − ${b} = ${180-a-b}°.`})},
  ()=>{const a=R(60,120),b=R(60,120),c=R(60,110);return num(`Three angles in a quadrilateral are <b>${a}°</b>, <b>${b}°</b> and <b>${c}°</b>. What is the fourth?`,360-a-b-c,{post:'°',why:`Angles in a quadrilateral add up to 360°. 360 − ${a} − ${b} − ${c} = ${360-a-b-c}°.`})},
  ()=>{const a=R(25,155);return num('Two straight lines cross. What is the angle marked <b>?</b>',a,{post:'°',vis:raysSvg([a,180-a,a,180-a],[`${a}°`,'','?','']),why:`Vertically opposite angles are equal: ${a}°.`})},
  ()=>{const a=R(20,90),b=R(20,160-a);return num('What is the missing angle on the straight line?',180-a-b,{post:'°',vis:raysSvg([a,b,180-a-b],[`${a}°`,`${b}°`,'?'],true),why:`Angles on a straight line add up to 180°. 180 − ${a} − ${b} = ${180-a-b}°.`})}));
skill('coord6','geo','Coordinates in four quadrants','(−3, 4)',()=>{const nz6=()=>pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]),x=nz6(),y=nz6();return alt(
  ()=>mc('What are the coordinates of point <b>P</b>?',`(${neg(x)}, ${neg(y)})`,[`(${neg(y)}, ${neg(x)})`,`(${neg(-x)}, ${neg(y)})`,`(${neg(x)}, ${neg(-y)})`].filter(s=>s!==`(${neg(x)}, ${neg(y)})`),{vis:coordSvg([[x,y,'P']],true),why:`Across first: x = ${neg(x)}. Then up or down: y = ${neg(y)}.`}),
  ()=>{const ax=Math.random()<.5;return mc(`Point P (${neg(x)}, ${neg(y)}) is reflected in the <b>${ax?'x':'y'}-axis</b>. Where does it go?`,ax?`(${neg(x)}, ${neg(-y)})`:`(${neg(-x)}, ${neg(y)})`,[`(${neg(-x)}, ${neg(-y)})`,`(${neg(y)}, ${neg(x)})`,ax?`(${neg(-x)}, ${neg(y)})`:`(${neg(x)}, ${neg(-y)})`],{vis:coordSvg([[x,y,'P']],true),why:ax?'Reflecting in the x-axis changes the sign of y.':'Reflecting in the y-axis changes the sign of x.'})})});
skill('polyang6','geo','Angles in regular polygons','Each angle of a regular hexagon',()=>{const [n,name]=pick([[3,'equilateral triangle'],[4,'square'],[5,'regular pentagon'],[6,'regular hexagon'],[8,'regular octagon'],[10,'regular decagon']]),a=180*(n-2)/n;return alt(
  ()=>num(`What is the size of each interior angle in a <b>${name}</b>?`,a,{post:'°',vis:svg(260,220,`<polygon points="${poly(n,130,110,90,-90)}" class="shp"/>`,name),why:`The angles add up to (${n} − 2) × 180 = ${(n-2)*180}°. Divide by ${n}: ${a}°.`}),
  ()=>num(`What do the interior angles of a <b>${n}-sided</b> polygon add up to?`,(n-2)*180,{post:'°',why:`Split it into ${n-2} triangles from one corner: ${n-2} × 180 = ${(n-2)*180}°.`}))});

/* STATISTICS */
skill('pie6','stat','Pie charts','What fraction chose football?',()=>{const total=pick([24,36,40,48,60,120]),S=statSet(),cats=S.cats.slice(0,pick([3,4])),opts=cats.length===3?pick([[1/2,1/4,1/4],[1/3,1/3,1/3],[1/2,1/3,1/6]]):pick([[1/2,1/4,1/8,1/8],[1/4,1/4,1/4,1/4],[1/3,1/6,1/4,1/4]]);
  const parts=opts.map(f=>Math.round(f*total));if(parts.reduce((a,b)=>a+b)!==total||parts.some(p=>!Number.isInteger(p)))return lineQ();
  const i=R(0,cats.length-1),vis=pieSvg(cats,parts,total,`${S.title} (${total} children)`);
  return Math.random()<.6?num(`<b>${total}</b> children were asked. How many chose <b>${cats[i]}</b>?`,parts[i],{vis,why:`${cats[i]} is ${fr(parts[i]/gcd(parts[i],total),total/gcd(parts[i],total))} of the circle. ${total} × that = ${parts[i]}.`})
    :mc(`What fraction of the children chose <b>${cats[i]}</b>?`,fr(parts[i]/gcd(parts[i],total),total/gcd(parts[i],total)),[fr(1,2),fr(1,4),fr(1,3),fr(1,8),fr(1,6)],{vis,why:`${cats[i]} takes up ${parts[i]} out of ${total}.`})});
skill('mean6','stat','The mean','Average of a set of numbers',()=>{const n=R(3,6),m=R(3,20);let vals=range(1,n).map(()=>m+R(-4,4));const diff=m*n-vals.reduce((a,b)=>a+b);vals[0]+=diff;if(vals[0]<0)vals[0]=m;const tot=vals.reduce((a,b)=>a+b);const mean=tot/n;
  if(!Number.isInteger(mean))return num(`What is the mean of ${big('4, 6, 8')}?`,6,{why:`(4 + 6 + 8) ÷ 3 = 6.`});
  return num(`What is the <b>mean</b> of these numbers?<br>${big(vals.join(', '))}`,mean,{why:`Add them: ${vals.join(' + ')} = ${tot}. Divide by how many there are (${n}): ${tot} ÷ ${n} = ${mean}.`})});
skill('line6','stat','Line graphs','Read and interpret',()=>lineQ());
});
