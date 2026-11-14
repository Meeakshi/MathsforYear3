/* Year 5 — National Curriculum for England */
year(5,{age:'9–10',dec:true,blurb:'Numbers to a million, primes, percentages, angles in degrees',strands:[['num','Number & place value'],['add','Adding & subtracting'],['mul','Multiplying & dividing'],['frac','Fractions, decimals & %'],['meas','Measurement'],['mt','Money & time'],['geo','Shapes & angles'],['stat','Graphs & tables']]},skill=>{

/* NUMBER */
skill('pv5','num','Place value to 1,000,000','What is the 6 worth in 562,301?',()=>Math.random()<.3?(()=>{const n=R(10000,999999);return mc(`Which number is <b>“${words(n)}”</b>?`,cm(n),[n+1000,n-1000,n+10000,Math.floor(n/10)].map(cm),{why:`${cap(words(n))} = ${cm(n)}.`})})():pvQ(R(5,6)));
skill('pow10','num','Powers of 10','What is 10,000 more than 345,678?',()=>{const amt=pick([10,100,1000,10000,100000]),more=Math.random()<.5,n=more?R(10000,999999-amt):R(amt+10000,999999),ans=more?n+amt:n-amt;return num(`What is <b>${cm(amt)} ${more?'more':'less'}</b> than ${big(cm(n))}?`,ans,{why:`Only the ${PLN[Math.round(Math.log10(amt))]} digit changes (unless it crosses 9 or 0): ${cm(ans)}.`})});
skill('neg5','num','Negative numbers','Temperatures below zero',()=>alt(
  ()=>{const a=R(-10,-1),b=R(1,12);return num(`At night it was <b>${neg(a)}°C</b>. By noon it was <b>${b}°C</b>. How many degrees did it rise?`,b-a,{post:'°C',why:`From ${neg(a)} up to 0 is ${-a}, then 0 up to ${b} is ${b}. ${-a} + ${b} = ${b-a}.`})},
  ()=>{const a=R(1,8),d=R(a+1,a+10);return num(`It was <b>${a}°C</b>. The temperature fell by <b>${d}°C</b>. What is it now?`,a-d,{post:'°C',why:`${a} − ${d} = ${neg(a-d)}.`})},
  ()=>{const t=R(-10,20);return num('What temperature does the thermometer show?',t,{post:'°C',vis:thermoSvg(t,-10,30,2),why:`Each small mark is 2°C. Below 0 the numbers are negative. It shows ${neg(t)}°C.`})}));
skill('round5','num','Rounding','Round 456,789 to the nearest 10,000',()=>roundQ(10000,999999,[10,100,1000,10000,100000]));
skill('roman5','num','Roman numerals to 1,000','MMXXVI = ?',()=>{const n=Math.random()<.4?R(1066,2030):R(100,1000);return Math.random()<.5?num(`What number is ${big(roman(n))}?`,n,{why:`M = 1000, D = 500, C = 100, L = 50, X = 10, V = 5, I = 1. ${roman(n)} = ${n}.`}):mc(`How do you write ${big(n)} in Roman numerals?`,roman(n),[roman(n+10),roman(n-1),roman(n+100)],{why:`${n} = ${roman(n)}.`})});

/* ADD & SUBTRACT */
skill('cola5','add','Column addition','5-digit numbers',()=>columnQ('+',5,R(4,5)));
skill('cols5','add','Column subtraction','5-digit numbers',()=>columnQ('−',5,R(4,5)));
skill('mental5','add','Mental calculation','12,500 + 3,000, 8,400 − 700',()=>mental(Math.random()<.5,[100,1000,10000],10000,99999));
skill('word5','add','Multi-step problems','Rounding to check answers',()=>{const n=nm();return alt(
  ()=>{const a=R(12000,40000),b=R(8000,30000),c=R(5000,20000);return num(`A stadium had <b>${cm(a)}</b> fans on Saturday and <b>${cm(b)}</b> on Sunday. <b>${cm(c)}</b> fans went both days. How many different fans came?`,a+b-c,{why:`${cm(a)} + ${cm(b)} = ${cm(a+b)}. Take away those counted twice: ${cm(a+b)} − ${cm(c)} = ${cm(a+b-c)}.`})},
  ()=>{const t=R(50000,99999),s=R(10000,30000),k=R(10000,30000);return num(`A town has <b>${cm(t)}</b> people. <b>${cm(s)}</b> are children and <b>${cm(k)}</b> are over 65. How many are neither?`,t-s-k,{why:`${cm(t)} − ${cm(s)} − ${cm(k)} = ${cm(t-s-k)}.`})})});

/* MULTIPLY & DIVIDE */
skill('factors5','mul','Factors & multiples','Common factors of 24 and 36',()=>alt(
  ()=>{const n=pick([24,30,36,40,45,48,60,72,84,90]),fs=factors(n),f=pick(fs.filter(x=>x>1&&x<n)),wr=range(2,15).filter(x=>n%x!==0);return mc(`Which number is a <b>factor</b> of ${n}?`,f,shuffle(wr),{why:`${n} ÷ ${f} = ${n/f}, with nothing left over.`})},
  ()=>{const k=R(3,12),m=k*R(3,12),wr=[m+1,m+k-1,m-1].filter(x=>x%k!==0);return mc(`Which number is a <b>multiple</b> of ${k}?`,m,wr,{why:`${m} = ${k} × ${m/k}.`})},
  ()=>{const [a,b]=pick([[12,18],[24,36],[16,24],[20,30],[18,27],[15,25],[28,42]]),g=gcd(a,b);return num(`What is the <b>highest common factor</b> of ${a} and ${b}?`,g,{why:`Factors of ${a}: ${factors(a).join(', ')}. Factors of ${b}: ${factors(b).join(', ')}. The biggest in both lists is ${g}.`})}));
skill('prime5','mul','Prime numbers','Which number is prime?',()=>{const pr=range(2,100).filter(isPrime),co=range(4,100).filter(x=>!isPrime(x)&&x%2&&x%5);return alt(
  ()=>{const p=pick(pr.filter(x=>x>10));return mc('Which of these is a <b>prime number</b>?',p,shuffle(co).slice(0,3),{why:`${p} has exactly two factors: 1 and ${p}. The others can be divided by something else.`})},
  ()=>{const n=Math.random()<.5?pick(pr.filter(x=>x>20)):pick(co.filter(x=>x>20));const f=factors(n);return mc(`Is <b>${n}</b> a prime number?`,isPrime(n)?'Yes':'No',['Yes','No'],{keep:true,why:isPrime(n)?`${n} can only be divided by 1 and itself.`:`${n} = ${f[1]} × ${n/f[1]}, so it is not prime.`})})});
skill('sqcube5','mul','Square & cube numbers','7², 3³',()=>{const sq=Math.random()<.65,n=sq?R(1,12):R(1,5);return alt(
  ()=>num(big(`${n}${sq?'²':'³'} = ${BL}`),sq?n*n:n**3,{why:sq?`${n}² means ${n} × ${n} = ${n*n}.`:`${n}³ means ${n} × ${n} × ${n} = ${n**3}.`}),
  ()=>{const s=pick(range(2,12).map(x=>x*x));return mc('Which of these is a <b>square number</b>?',s,[s+1,s-2,s+3,s*2].filter(x=>!Number.isInteger(Math.sqrt(x))),{why:`${s} = ${Math.sqrt(s)} × ${Math.sqrt(s)}.`})})});
skill('x10s','mul','× and ÷ by 10, 100, 1,000','3.6 × 100, 450 ÷ 1,000',()=>{const p=pick([10,100,1000]),m=Math.random()<.5;const x=Math.random()<.5?R(2,999):R(11,999)/10;const ans=m?x*p:x/p;
  return num(big(`${ds(x)} ${m?'×':'÷'} ${cm(p)} = ${BL}`),ds(ans),{why:`${m?'Multiplying':'Dividing'} by ${cm(p)} moves each digit ${Math.round(Math.log10(p))} place${p>10?'s':''} to the ${m?'left':'right'}: ${cm(fix(ans))}.`})});
skill('longmul5','mul','Written multiplication','4-digit × 1-digit, 2-digit × 2-digit',()=>{if(Math.random()<.5){const a=R(1000,9999),b=R(3,9);return num('Work out the answer.',a*b,{vis:colVis(a,b,'×',a*b),why:`Multiply each digit by ${b}, starting with the ones, and carry. ${cm(a)} × ${b} = ${cm(a*b)}.`})}
  const a=R(12,99),b=R(12,99),t=Math.floor(b/10)*10,o=b%10;return num('Work out the answer.',a*b,{vis:colVis(a,b,'×',a*b),why:`${a} × ${o} = ${a*o}<br>${a} × ${t} = ${a*t}<br>${a*o} + ${a*t} = ${cm(a*b)}`})});
skill('shortdiv5','mul','Short division','4-digit ÷ 1-digit, with remainders',()=>{const b=R(3,9);if(Math.random()<.6){const q=R(100,1100),a=q*b;return num(big(`${cm(a)} ÷ ${b} = ${BL}`),q,{why:`Divide each digit from the left, carrying any remainder to the next digit. ${q} × ${b} = ${cm(a)}.`})}
  const q=R(20,300),r=R(1,b-1),a=q*b+r;return num(`${big(`${cm(a)} ÷ ${b}`)}<br>What is the <b>remainder</b>?`,r,{why:`${q} × ${b} = ${cm(q*b)}. ${cm(a)} − ${cm(q*b)} = ${r}, so the answer is ${q} r ${r}.`})});
skill('mentalx5','mul','Mental multiplying','40 × 6, 25 × 4, 12 × 15',()=>alt(
  ()=>{const a=R(2,9)*10,b=R(2,9);return num(big(`${a} × ${b} = ${BL}`),a*b,{why:`${a/10} × ${b} = ${a/10*b}, then × 10 = ${a*b}.`})},
  ()=>{const a=pick([25,50]),b=R(2,12)*2;return num(big(`${a} × ${b} = ${BL}`),a*b,{why:a===25?`25 × 4 = 100, so 25 × ${b} = ${b/4} × 100 = ${a*b}.`:`50 × 2 = 100, so 50 × ${b} = ${b/2} × 100 = ${a*b}.`})},
  ()=>{const a=R(11,19),b=R(3,9);return num(big(`${a} × ${b} = ${BL}`),a*b,{why:`10 × ${b} = ${10*b}, ${a-10} × ${b} = ${(a-10)*b}. Total ${a*b}.`})}));

/* FRACTIONS, DECIMALS & % */
skill('mixed5','frac','Mixed numbers & improper fractions','7/3 = 2⅓',()=>{const d=R(2,9),w=R(1,5),n=R(1,d-1),imp=w*d+n;return Math.random()<.5
  ?mc(`Which mixed number is the same as ${big(fr(imp,d))}?`,mx(w,n,d),[mx(w+1,n,d),mx(w,d-n,d),mx(n,w,d)].filter(x=>x!==mx(w,n,d)),{why:`${imp} ÷ ${d} = ${w} remainder ${n}, so ${fr(imp,d)} = ${mx(w,n,d)}.`})
  :num(`Fill in the missing numerator.<br>${big(`${mx(w,n,d)} = ${fr(BL,d)}`)}`,imp,{why:`${w} wholes = ${w*d} ${d}ths. ${w*d} + ${n} = ${imp}.`})});
skill('fcmp5','frac','Comparing fractions','Which is bigger: 3/4 or 5/8?',()=>{const b=pick([2,3,4,5,6]),m=pick([2,3]),d=b*m;let a=R(1,b-1),c=R(1,d-1);if(a*m===c)c=c<d-1?c+1:c-1;const big1=Math.random()<.5,A=a*m,ans=(big1?A>c:A<c)?fr(a,b):fr(c,d);
  return mc(`Which fraction is <b>${big1?'bigger':'smaller'}</b>?`,ans,[fr(a,b),fr(c,d)],{keep:true,why:`Make the denominators the same: ${fr(a,b)} = ${fr(A,d)}. Now compare ${fr(A,d)} and ${fr(c,d)}.`})});
skill('fadd5','frac','Adding & subtracting fractions','1/4 + 3/8',()=>{const b=pick([2,3,4,5]),m=pick([2,3]),d=b*m,a=R(1,b-1),c=R(1,d-1),A=a*m,sub=A>c&&Math.random()<.5,ans=sub?A-c:A+c;
  return num(`Fill in the missing numerator.<br>${big(`${fr(a,b)} ${sub?'−':'+'} ${fr(c,d)} = ${fr(BL,d)}`)}`,ans,{why:`${fr(a,b)} = ${fr(A,d)}. ${A} ${sub?'−':'+'} ${c} = ${ans}, so the answer is ${fr(ans,d)}.`})});
skill('fmul5','frac','Fractions × whole numbers','2/5 × 4',()=>{const d=R(3,10),a=R(1,d-1),k=R(2,6);return num(`Fill in the missing numerator.<br>${big(`${fr(a,d)} × ${k} = ${fr(BL,d)}`)}`,a*k,{why:`Multiply the numerator by ${k}: ${a} × ${k} = ${a*k}. The denominator stays ${d}.${a*k>=d?` That is ${Math.floor(a*k/d)} whole${a*k>=2*d?'s':''}${a*k%d?` and ${fr(a*k%d,d)}`:''}.`:''}`})});
skill('decfr5','frac','Decimals as fractions','0.71 = ?/100, 0.003',()=>alt(
  ()=>{const k=R(1,99);return num(big(`${ds(k/100)} = ${fr(BL,100)}`),k,{why:`${ds(k/100)} is ${k} hundredths.`})},
  ()=>{const k=R(1,999);return num(big(`${fr(k,1000)} = ${BL}`),ds(k/1000),{why:`Thousandths are three places after the decimal point: ${ds(k/1000)}.`})},
  ()=>{const x=R(1001,9999)/1000,s=x.toFixed(3),ps=[1,2,3].filter(i=>s.split('.')[1][i-1]!=='0'),p=ps.length?pick(ps):1,d=s.split('.')[1][p-1];return mc(`What is the <b>${d}</b> worth in ${big(s.replace(new RegExp(`^(\\d\\.\\d{${p-1}})${d}`),`$1<span class="hl">${d}</span>`))}?`,fr(d,10**p),[fr(d,10),fr(d,100),fr(d,1000),d].filter(x=>x!==fr(d,10**p)),{why:`It is ${['','1st','2nd','3rd'][p]} place after the decimal point: ${['','tenths','hundredths','thousandths'][p]}.`})}));
skill('decround5','frac','Rounding decimals','Round 3.47 to 1 decimal place',()=>{const x=R(101,9999)/100,one=Math.random()<.5,ans=one?Math.round(x*10)/10:Math.round(x);
  return num(`Round ${big(x.toFixed(2))} to the nearest ${one?'tenth (1 decimal place)':'whole number'}.`,ds(ans),{why:`Look at the ${one?'hundredths':'tenths'} digit: ${one?Math.round(x*100)%10:Math.floor(x*10)%10}. ${(one?Math.round(x*100)%10:Math.floor(x*10)%10)>=5?'5 or more rounds up':'Less than 5 rounds down'}: ${ds(ans)}.`})});
skill('decorder5','frac','Ordering decimals','0.5, 0.45, 0.405',()=>{const base=R(1,9),vals=new Set();while(vals.size<4)vals.add(ds(base+pick([R(1,9)/10,R(1,99)/100,R(1,999)/1000])));const v=[...vals],most=Math.random()<.5,ans=v.reduce((a,b)=>(most?+b>+a:+b<+a)?b:a);
  return mc(`Which number is the <b>${most?'greatest':'smallest'}</b>?`,ans,v,{why:`Line up the decimal points and compare tenths, then hundredths, then thousandths. ${ans} is the ${most?'greatest':'smallest'}.`})});
skill('pct5','frac','Percentages','50% = 1/2, what % is shaded?',()=>alt(
  ()=>{const k=R(1,99);return num(`What percentage of the hundred square is shaded?`,k,{post:'%',vis:hundredSvg(k),why:`Per cent means "out of 100". ${k} out of 100 is ${k}%.`})},
  ()=>{const [f,p]=pick([[fr(1,2),50],[fr(1,4),25],[fr(3,4),75],[fr(1,5),20],[fr(2,5),40],[fr(4,5),80],[fr(1,10),10],[fr(3,10),30]]);return num(`What is ${big(f)} as a percentage?`,p,{post:'%',why:`${f} = ${fr(p,100)} = ${p}%.`})},
  ()=>{const p=R(1,99);return mc(`Which decimal is the same as <b>${p}%</b>?`,ds(p/100),[ds(p/10),String(p),ds(p/1000)],{why:`${p}% = ${fr(p,100)} = ${ds(p/100)}.`})},
  ()=>{const p=R(1,99);return num(`If ${p}% of a class are girls, what percentage are boys?`,100-p,{post:'%',why:`The whole class is 100%. 100 − ${p} = ${100-p}%.`})}));

/* MEASUREMENT */
skill('conv5','meas','Converting metric units','2.5 km = ? m',()=>{const x=R(11,99)/10;return alt(
  ()=>num(big(`${ds(x)} km = ${BL} m`),Math.round(x*1000),{why:`× 1,000: ${cm(Math.round(x*1000))} m.`}),
  ()=>num(big(`${ds(x)} kg = ${BL} g`),Math.round(x*1000),{why:`× 1,000: ${cm(Math.round(x*1000))} g.`}),
  ()=>num(big(`${ds(x)} m = ${BL} cm`),Math.round(x*100),{why:`× 100: ${Math.round(x*100)} cm.`}),
  ()=>{const ml=R(1,99)*50;return num(big(`${cm(ml)} ml = ${BL} l`),ds(ml/1000),{why:`÷ 1,000: ${ds(ml/1000)} l.`})},
  ()=>{const mm=R(11,999);return num(big(`${mm} mm = ${BL} cm`),ds(mm/10),{why:`÷ 10: ${ds(mm/10)} cm.`})})});
skill('imperial5','meas','Imperial units','Inches, pounds and pints',()=>alt(
  ()=>{const [q,a,w]=pick([['1 inch is about…','2.5 cm',['25 cm','1 m','10 mm']],['1 kg is about…','2.2 pounds',['22 pounds','1 pound','10 pounds']],['1 pint is about…','570 ml',['5 l','57 ml','1 l']],['1 foot is about…','30 cm',['3 cm','1 m','300 cm']],['5 miles is about…','8 km',['5 km','80 km','3 km']]]);return mc(q,a,w,{why:`${q.replace('…','')} ${a}.`})},
  ()=>{const k=R(2,12);return num(`About how many centimetres are in <b>${k*2} inches</b>? (1 inch ≈ 2.5 cm)`,k*5,{post:'cm',why:`${k*2} × 2.5 = ${k*5} cm.`})}));
skill('area5','meas','Area','Rectangles and compound shapes',()=>alt(
  ()=>{const w=R(3,15),h=R(2,12),u=pick(['cm','m']);return num('What is the <b>area</b> of this rectangle?',w*h,{post:u+'²',vis:rectLab(w,h,u),why:`Area = length × width = ${w} × ${h} = ${w*h} ${u}².`})},
  ()=>{const W=R(6,12),H=R(5,10),cw=R(2,W-3),ch=R(2,H-3);const s=`<polygon points="40,30 ${40+(W-cw)*24},30 ${40+(W-cw)*24},${30+ch*24} ${40+W*24},${30+ch*24} ${40+W*24},${30+H*24} 40,${30+H*24}" class="shp"/><text x="${40+W*12}" y="${30+H*24+22}" text-anchor="middle" font-size="16">${W} m</text><text x="32" y="${30+H*12}" text-anchor="end" font-size="16">${H} m</text><text x="${40+(W-cw)*12}" y="22" text-anchor="middle" font-size="16">${W-cw} m</text><text x="${40+W*24+6}" y="${30+ch+(H-ch)*12+30}" font-size="16">${H-ch} m</text>`;
    return num('What is the area of this shape? <i>(Not to scale.)</i>',W*H-cw*ch,{post:'m²',vis:svg(40+W*24+70,30+H*24+36,s,'compound shape'),why:`Split it into two rectangles: ${W-cw} × ${H} = ${(W-cw)*H} and ${cw} × ${H-ch} = ${cw*(H-ch)}. Total: ${W*H-cw*ch} m².`})}));
skill('perim5','meas','Perimeter of compound shapes','Find the missing sides first',()=>{const W=R(6,14),H=R(5,12),cw=R(2,W-3),ch=R(2,H-3);const s=`<polygon points="40,30 ${40+(W-cw)*20},30 ${40+(W-cw)*20},${30+ch*20} ${40+W*20},${30+ch*20} ${40+W*20},${30+H*20} 40,${30+H*20}" class="shp"/><text x="${40+W*10}" y="${30+H*20+22}" text-anchor="middle" font-size="16">${W} cm</text><text x="32" y="${30+H*10}" text-anchor="end" font-size="16">${H} cm</text><text x="${40+(W-cw)*10}" y="22" text-anchor="middle" font-size="16">${W-cw} cm</text><text x="${40+W*20+6}" y="${30+ch*20+(H-ch)*10+5}" font-size="16">${H-ch} cm</text>`;
  return num('What is the <b>perimeter</b> of this shape? <i>(Not to scale.)</i>',2*(W+H),{post:'cm',vis:svg(40+W*20+70,30+H*20+36,s,'compound shape'),why:`The missing sides are ${cw} cm and ${ch} cm. Add all six sides: ${W} + ${H} + ${W-cw} + ${ch} + ${cw} + ${H-ch} = ${2*(W+H)} cm.`})});
skill('vol5','meas','Volume with cubes','Count the 1 cm cubes',()=>{const l=R(2,5),w=R(2,4),h=R(2,4);return num('This cuboid is made of 1 cm cubes. What is its <b>volume</b>?',l*w*h,{post:'cm³',vis:cuboidSvg(l,w,h,true),why:`${l} × ${w} = ${l*w} cubes in each layer, and ${h} layers: ${l*w} × ${h} = ${l*w*h} cm³.`})});

/* MONEY & TIME */
skill('time5','mt','Time problems','Durations across the hour',()=>{const h=R(8,18),m=R(0,59),d=R(25,150),e=h*60+m+d,H=Math.floor(e/60)%24,M=e%60;return alt(
  ()=>num(`A train leaves at <b>${pad(h)}:${pad(m)}</b> and arrives at <b>${pad(H)}:${pad(M)}</b>. How many minutes is the journey?`,d,{post:'minutes',why:`From ${pad(h)}:${pad(m)} to ${pad(H)}:${pad(M)} is ${Math.floor(d/60)} hour${d>=120?'s':''} and ${d%60} minutes = ${d} minutes.`}),
  ()=>mc(`A film starts at <b>${pad(h)}:${pad(m)}</b> and lasts <b>${d} minutes</b>. When does it finish?`,`${pad(H)}:${pad(M)}`,[`${pad(H)}:${pad((M+10)%60)}`,`${pad((H+1)%24)}:${pad(M)}`,`${pad(h)}:${pad((m+d)%100)}`],{why:`${d} minutes = ${Math.floor(d/60)} h ${d%60} min. ${pad(h)}:${pad(m)} + that = ${pad(H)}:${pad(M)}.`}))});
skill('money5','mt','Money problems','Best buys and change',()=>{const n=nm();return alt(
  ()=>{const p=R(105,999),q=R(3,9),pay=Math.ceil(p*q/1000)*1000+(Math.random()<.5?1000:0);return mc(`${n} buys <b>${q}</b> notebooks at <b>${fmt(p)}</b> each and pays with <b>${fmt(pay)}</b>. How much change?`,fmt(pay-p*q),[fmt(pay-p*q+100),fmt(pay-p*q+10),fmt(Math.abs(pay-p))],{why:`${q} × ${fmt(p)} = ${fmt(p*q)}. ${fmt(pay)} − ${fmt(p*q)} = ${fmt(pay-p*q)}.`})},
  ()=>{const a=R(3,6),b=a*2,pa=R(100,300),pb=pa*2+pick([-20,20]);const better=pb<pa*2?`${b} for ${fmt(pb)}`:`${a} for ${fmt(pa)}`;return mc(`Which is the <b>better value</b>: ${a} pens for ${fmt(pa)} or ${b} pens for ${fmt(pb)}?`,better,[`${a} for ${fmt(pa)}`,`${b} for ${fmt(pb)}`],{keep:true,why:`${b} pens at the first price would cost ${fmt(pa*2)}. Compare with ${fmt(pb)}.`})})});

/* GEOMETRY */
skill('angles5','geo','Angles in degrees','Acute, obtuse, reflex and estimating',()=>alt(
  ()=>{const k=R(0,3),th=[R(20,80),90,R(100,170),R(190,340)][k];return mc('What type of angle is this?',['Acute','Right angle','Obtuse','Reflex'][k],['Acute','Right angle','Obtuse','Reflex'],{keep:true,vis:angleSvg(th,R(0,90)),why:['Less than 90°: acute.','Exactly 90°: right angle.','Between 90° and 180°: obtuse.','More than 180°: reflex.'][k]})},
  ()=>{const th=pick([30,45,60,120,135,150]);return mc('Which is the best estimate for this angle?',`${th}°`,[`${180-th}°`,`${th+90>180?th-25:th+90}°`,`${Math.round(th/2)}°`],{vis:angleSvg(th,R(0,40)),why:`Compare it with a right angle (90°). It is about ${th}°.`})},
  ()=>{const a=R(20,160);return num(`Angles on a straight line add up to 180°. One angle is <b>${a}°</b>. What is the other?`,180-a,{post:'°',vis:raysSvg([a,180-a],[`${a}°`,'?'],true),why:`180 − ${a} = ${180-a}°.`})},
  ()=>{const a=R(60,150),b=R(60,150);return num('Angles around a point add up to 360°. What is the missing angle?',360-a-b,{post:'°',vis:raysSvg([a,b,360-a-b],[`${a}°`,`${b}°`,'?']),why:`360 − ${a} − ${b} = ${360-a-b}°.`})}));
skill('poly5','geo','Polygons & rectangles','Regular or irregular? Missing sides',()=>alt(
  ()=>{const reg=Math.random()<.5,n=R(5,8),jit=reg?null:range(1,n).map(()=>.65+Math.random()*.35);return mc('Is this polygon <b>regular</b> or <b>irregular</b>?',reg?'Regular':'Irregular',['Regular','Irregular'],{keep:true,vis:svg(260,220,`<polygon points="${poly(n,130,110,90,-90,jit)}" class="shp"/>`,'polygon'),why:reg?'All its sides and angles are equal.':'Its sides (and angles) are not all equal.'})},
  ()=>{const w=R(5,20),h=R(3,15),P=2*(w+h);return num(`A rectangle has a perimeter of <b>${P} cm</b>. One side is <b>${w} cm</b>. How long is the other side?`,h,{post:'cm',why:`Two of each side: ${P} − ${w} − ${w} = ${2*h}. ${2*h} ÷ 2 = ${h} cm.`})}));
skill('transform5','geo','Reflection & translation','Move shapes on a grid',()=>{const x=R(1,9),y=R(1,9);return alt(
  ()=>{const dx=pick([-3,-2,2,3,4]),dy=pick([-3,-2,2,3]),X=x+dx,Y=y+dy;if(X<0||X>10||Y<0||Y>10)return mc('What are the coordinates of A?',`(${x}, ${y})`,[`(${y}, ${x})`,`(${x+1}, ${y+1})`],{vis:coordSvg([[x,y,'A']])});
    return mc(`Point A is translated <b>${Math.abs(dx)} ${dx>0?'right':'left'}</b> and <b>${Math.abs(dy)} ${dy>0?'up':'down'}</b>. What are its new coordinates?`,`(${X}, ${Y})`,[`(${Y}, ${X})`,`(${x-dx}, ${y-dy})`,`(${X}, ${y})`],{vis:coordSvg([[x,y,'A']]),why:`x: ${x} ${dx>0?'+':'−'} ${Math.abs(dx)} = ${X}. y: ${y} ${dy>0?'+':'−'} ${Math.abs(dy)} = ${Y}.`})},
  ()=>{const X=10-x;return mc(`Point A is reflected in the mirror line <b>x = 5</b>. What are its new coordinates?`,`(${X}, ${y})`,[`(${x}, ${10-y})`,`(${y}, ${x})`,`(${X+1}, ${y})`].filter(s=>s!==`(${X}, ${y})`),{vis:coordSvg([[x,y,'A']]).replace('</svg>',`<line x1="${30+5*26}" y1="20" x2="${30+5*26}" y2="${30+10*26}" stroke="currentColor" stroke-width="3" stroke-dasharray="7 5"/></svg>`),why:`A is ${Math.abs(5-x)} away from the mirror line, so its reflection is ${Math.abs(5-x)} away on the other side: x = ${X}. y stays the same.`})})});

/* GRAPHS & TABLES */
skill('line5','stat','Line graphs','Read and compare values',()=>lineQ());
skill('timetable5','stat','Timetables','Read a bus timetable',()=>{const stops=['Market Square','Library','Park Gates','Station'],b=[R(7,9)*60+R(0,3)*5,0,0],rows=[];let base=pick([7,8])*60+R(0,5)*5;const gaps=[R(4,9),R(6,12),R(5,10)],buses=[base,base+R(25,40),base+R(60,80)];
  buses.forEach(t0=>{let t=t0;const r=[t];gaps.forEach(g=>{t+=g;r.push(t)});rows.push(r)});const T=v=>`${pad(Math.floor(v/60))}:${pad(v%60)}`;
  const vis=`<table class="dtable"><caption>Bus timetable</caption><tr><th>Stop</th><th>Bus 1</th><th>Bus 2</th><th>Bus 3</th></tr>${stops.map((s,i)=>`<tr><td>${s}</td>${rows.map(r=>`<td>${T(r[i])}</td>`).join('')}</tr>`).join('')}</table>`;
  const bi=R(0,2),i=R(0,2),j=R(i+1,3);return alt(
    ()=>num(`How many minutes does Bus ${bi+1} take from <b>${stops[i]}</b> to <b>${stops[j]}</b>?`,rows[bi][j]-rows[bi][i],{post:'minutes',vis,why:`${T(rows[bi][i])} to ${T(rows[bi][j])} is ${rows[bi][j]-rows[bi][i]} minutes.`}),
    ()=>mc(`What time does Bus ${bi+1} arrive at <b>${stops[j]}</b>?`,T(rows[bi][j]),rows.map(r=>T(r[j])).concat(T(rows[bi][j]+5)),{vis,why:`Look down the Bus ${bi+1} column to the ${stops[j]} row: ${T(rows[bi][j])}.`}))});
});
