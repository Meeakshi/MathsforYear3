/* Primary Maths Quest — app: year picker, home, quiz, results */
(()=>{
const KEY='y3-maths-quest-v1',N=10,YRS=[1,2,3,4,5,6];
function load(){let d=null;try{d=JSON.parse(localStorage.getItem(KEY))}catch(e){}if(!d||!d.best)d={best:{},name:'',done:0,right:0};
  for(const k of Object.keys(d.best))if(!k.includes(':')){d.best['3:'+k]=d.best[k];delete d.best[k];if(!d.year)d.year=3}return d}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}}
let store=load(),Q=null;save();
const app=document.getElementById('app');
const starsFor=s=>s>=10?3:s>=8?2:s>=5?1:0;
const starIcon=on=>`<svg class="st${on?' on':''}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17l-5.9 3.3 1.3-6.6L2.5 9.1l6.6-.8z"/></svg>`;
const stars3=n=>[0,1,2].map(i=>starIcon(i<n)).join('');
const Y=()=>MQ.years[store.year];
const SK=()=>Y().skills;
const find=key=>{const [y]=key.split(':');return MQ.years[y].skills.find(s=>s.key===key)};
const yStars=y=>MQ.years[y].skills.reduce((a,s)=>a+starsFor(store.best[s.key]||0),0);
const strandName=id=>(Y().strands.find(s=>s[0]===id)||[id,id])[1];

function header(){const y=store.year;return `<header class="top"><div class="topin"><button class="brand" data-act="${y?'home':'years'}" aria-label="Home"><span class="logo">${y||'?'}</span><span>Maths Quest</span></button>
  <div class="tright">${y?`<button class="yearbtn" data-act="years">Year ${y} <span aria-hidden="true">▾</span></button><div class="score" title="Stars earned in Year ${y}">${starIcon(true)} ${yStars(y)} / ${SK().length*3}</div>`:''}</div></div></header>`}

function setHash(h){try{if(location.hash!==h)history.replaceState(null,'',h||location.pathname+location.search)}catch(e){}}

function renderYears(){Q=null;setHash('');
  app.innerHTML=header()+`<main class="wrap">
  <section class="hero solo"><div><h1 id="hello">Hello${store.name?', '+esc(store.name):''}! Which year are you in?</h1>
  <p>Pick your school year to practise the maths for that year. You can switch years any time.</p>
  <label class="namebox" for="kidname">Your name <input id="kidname" maxlength="20" autocomplete="off" value="${esc(store.name)}"></label></div></section>
  <div class="years">${YRS.map(y=>{const Yr=MQ.years[y],got=yStars(y),tot=Yr.skills.length*3;return `<button class="ycard${store.year===y?' cur':''}" data-act="pickyear" data-y="${y}" style="--c:var(--c-y${y})"><span class="ynum">${y}</span><span class="ytxt"><span class="yname">Year ${y}</span><span class="yage">Age ${Yr.age}</span><span class="yblurb">${Yr.blurb}</span></span><span class="ystar">${starIcon(got>0)} ${got}/${tot}</span></button>`}).join('')}</div>
  <footer>Follows the maths programme of study in the National Curriculum for England, Years 1 to 6. New questions are made every time you play. Stars are saved in this browser on this device.</footer></main>`;
  window.scrollTo(0,0)}

function renderHome(){Q=null;if(!store.year)return renderYears();const Yr=Y();setHash('#year-'+Yr.y);
  app.innerHTML=header()+`<main class="wrap">
  <section class="hero"><div>
    <h1 id="hello">Hello${store.name?', '+esc(store.name):''}! What shall we practise today?</h1>
    <p>Year ${Yr.y} maths. Pick a topic and answer 10 questions. Get 5 right for one star, 8 for two stars and all 10 for three stars.</p>
    <button class="link" data-act="years">Change year</button>
  </div>
  <button class="mixbig" data-act="mixall"><span class="mx-t">Mixed challenge</span><span class="mx-s">10 questions from all of Year ${Yr.y}</span></button></section>
  ${Yr.strands.map(([id,name])=>{const sk=Yr.skills.filter(s=>s.strand===id);if(!sk.length)return '';const got=sk.reduce((a,s)=>a+starsFor(store.best[s.key]||0),0);
    return `<section class="strand" style="--c:var(--c-${id})"><div class="shead"><span class="chip">${GLYPH[id]}</span><h2>${name}</h2><span class="sst">${starIcon(got>0)} ${got}/${sk.length*3}</span><button class="mix" data-act="mix" data-st="${id}">Mix this topic</button></div>
    <div class="tiles">${sk.map(s=>{const b=store.best[s.key];return `<button class="tile" data-act="skill" data-k="${s.key}"><span class="tname">${s.name}</span><span class="teg">${s.eg}</span><span class="tfoot"><span class="tstars">${stars3(starsFor(b||0))}</span>${b!=null?`<span class="tbest">Best ${b}/10</span>`:''}</span></button>`}).join('')}</div></section>`}).join('')}
  <footer>Year ${Yr.y} topics from the National Curriculum for England. New questions are made every time you play. Stars are saved in this browser on this device.</footer>
  </main>`;
  window.scrollTo(0,0)}

function makeQs(keys){const qs=[],seen=new Set();let pool=[];
  for(let i=0;i<N;i++){if(!pool.length)pool=shuffle(keys);const key=pool.pop(),sk=find(key);let q,t=0;
    do{try{q=sk.gen()}catch(e){q=null}t++}while((!q||seen.has(q.q+(q.vis||'')))&&t<10);
    if(!q)q=num(big(`2 + 2 = ${BL}`),4);seen.add(q.q+(q.vis||''));q.key=key;q.strand=sk.strand;qs.push(q)}return qs}
function start(keys,title,single){Q={keys,title,single,qs:makeQs(keys),i:0,score:0,res:[],wrong:[],input:'',answered:false,year:store.year};renderQ()}

function padHtml(){const d=Y().dec;const keys=[1,2,3,4,5,6,7,8,9].map(k=>`<button data-act="key" data-k="${k}">${k}</button>`).join('');
  return d?`<div class="pad" id="pad">${keys}<button data-act="key" data-k="-" aria-label="Minus">−</button><button data-act="key" data-k="0">0</button><button data-act="key" data-k="." aria-label="Decimal point">.</button><button data-act="key" data-k="del" aria-label="Delete">⌫</button><button data-act="key" data-k="ok" class="go wide">Check</button></div>`
    :`<div class="pad" id="pad">${keys}<button data-act="key" data-k="del" aria-label="Delete">⌫</button><button data-act="key" data-k="0">0</button><button data-act="key" data-k="ok" class="go">Check</button></div>`}
function renderQ(){const q=Q.qs[Q.i];Q.input='';Q.answered=false;
  const ans=q.type==='choice'
    ?`<div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-act="pick" data-i="${i}">${c}</button>`).join('')}</div><p class="hint">Tap your answer</p>`
    :`<div class="numrow">${q.pre?`<span class="unit">${q.pre}</span>`:''}<output id="disp" class="disp empty" aria-live="polite"></output>${q.post?`<span class="unit">${q.post}</span>`:''}</div>${padHtml()}`;
  app.innerHTML=header()+`<main class="wrap quiz" style="--c:var(--c-${q.strand})">
    <div class="qbar"><button class="link" data-act="home">← All topics</button><span class="qtitle">${Q.title}</span></div>
    <div class="prog" aria-hidden="true">${Q.qs.map((x,i)=>`<span class="${i<Q.i?(Q.res[i]?'ok':'no'):i===Q.i?'cur':''}"></span>`).join('')}</div>
    <section class="qcard"><p class="qnum">Question ${Q.i+1} of ${N}${Q.single?'':' · '+find(q.key).name}</p>
      <div class="qtext">${q.q}</div>${q.vis?`<div class="qvis">${q.vis}</div>`:''}
      <div class="answer">${ans}</div><div id="fb" class="fb" hidden></div></section></main>`;
  window.scrollTo(0,0)}
function updDisp(){const d=document.getElementById('disp');if(!d)return;d.textContent=Q.input.replace('-','−');d.classList.toggle('empty',!Q.input)}
const PRAISE=['Brilliant!','Spot on!','Super!','You got it!','Fantastic!','Great thinking!','Yes!','Well done!'];
function submit(ci){const q=Q.qs[Q.i];if(Q.answered)return;let ok;
  if(q.type==='num'){if(Q.input===''||isNaN(Number(Q.input)))return;ok=Math.abs(Number(Q.input)-Number(q.answer))<1e-9}
  else{ok=q.choices[ci]===q.answer;document.querySelectorAll('.choice').forEach((b,i)=>{b.disabled=true;if(q.choices[i]===q.answer)b.classList.add('right');else if(i===ci)b.classList.add('wrong')})}
  Q.answered=true;Q.res[Q.i]=ok;if(ok)Q.score++;else Q.wrong.push(q);store.done++;if(ok)store.right++;save();
  const pd=document.getElementById('pad');if(pd)pd.hidden=true;const disp=document.getElementById('disp');if(disp)disp.style.borderColor=ok?'var(--good)':'var(--bad)';
  const shown=q.type==='num'?`${q.pre||''}${q.answer.replace('-','−')}${q.post?' '+q.post:''}`:q.answer;const last=Q.i===N-1,fb=document.getElementById('fb');
  fb.className='fb '+(ok?'good':'bad');
  fb.innerHTML=`<div class="fbhead">${ok?pick(PRAISE):'Not quite.'}</div>${ok?'':`<div>The answer is <b>${shown}</b>.</div>${q.why?`<div class="why">${q.why}</div>`:''}`}<button class="next" data-act="next">${last?'See my score':'Next question'} →</button>`;
  fb.hidden=false;fb.querySelector('.next').focus({preventScroll:true});fb.scrollIntoView({block:'nearest',behavior:'smooth'})}
function next(){if(Q.i<N-1){Q.i++;renderQ()}else renderEnd()}
function renderEnd(){const s=Q.score,st=starsFor(s);let isBest=false;
  if(Q.single){const prev=store.best[Q.single];if(prev==null||s>prev){isBest=s>0;store.best[Q.single]=s}save()}
  const msg=s===10?'Perfect score! Every single one right.':s>=8?'Brilliant work. You nearly got them all.':s>=5?'Good effort! Practise again to earn more stars.':'Keep going! Every try makes your brain stronger.';
  const strand=Q.single?find(Q.single).strand:null;
  app.innerHTML=header()+`<main class="wrap quiz end" style="--c:${strand?`var(--c-${strand})`:'var(--ink)'}">
    <section class="qcard"><div class="bigstars">${stars3(st)}</div>
      <h2>${s} out of ${N}${store.name?', '+esc(store.name):''}</h2><p class="sub">${msg}</p>${isBest?'<span class="badge">New best score!</span>':''}
      <div class="btns"><button class="btn primary" data-act="again">Play again</button><button class="btn" data-act="home">All topics</button></div>
      ${Q.wrong.length?`<div class="review"><h3>Let's look at these again</h3>${Q.wrong.map(q=>`<div class="rv" style="--c:var(--c-${q.strand})"><div class="qtext">${q.q}</div>${q.vis||''}<div class="ra">Answer: ${q.type==='num'?`${q.pre||''}${q.answer.replace('-','−')}${q.post?' '+q.post:''}`:q.answer}</div>${q.why?`<div class="why">${q.why}</div>`:''}</div>`).join('')}</div>`:''}
    </section></main>`;
  window.scrollTo(0,0)}

function key(k){if(!Q||Q.answered)return;if(k==='ok')return submit();
  if(k==='del')Q.input=Q.input.slice(0,-1);
  else if(k==='-'){Q.input=Q.input.startsWith('-')?Q.input.slice(1):'-'+Q.input}
  else if(k==='.'){if(!Q.input.includes('.'))Q.input=(Q.input===''||Q.input==='-'?Q.input+'0':Q.input)+'.'}
  else if(Q.input.replace(/[-.]/g,'').length<9)Q.input=(Q.input==='0'?'':Q.input==='-0'?'-':Q.input)+k;
  updDisp()}
app.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
  if(a==='home')renderHome();else if(a==='years')renderYears();
  else if(a==='pickyear'){store.year=+b.dataset.y;save();renderHome()}
  else if(a==='skill'){const s=find(b.dataset.k);start([s.key],s.name,s.key)}
  else if(a==='mix'){start(SK().filter(s=>s.strand===b.dataset.st).map(s=>s.key),strandName(b.dataset.st)+' mix',null)}
  else if(a==='mixall')start(SK().map(s=>s.key),`Year ${store.year} mixed challenge`,null);
  else if(a==='again')start(Q.keys,Q.title,Q.single);
  else if(a==='pick')submit(+b.dataset.i);else if(a==='key')key(b.dataset.k);else if(a==='next')next()});
app.addEventListener('input',e=>{if(e.target.id==='kidname'){store.name=e.target.value.trim();save();const h=document.getElementById('hello');if(h)h.textContent=`Hello${store.name?', '+store.name:''}! Which year are you in?`}});
document.addEventListener('keydown',e=>{if(!Q||e.target.tagName==='INPUT'||e.metaKey||e.ctrlKey||e.altKey)return;const q=Q.qs[Q.i];
  if(Q.answered){if(e.key==='Enter'){e.preventDefault();if(document.querySelector('[data-act="next"]'))next()}return}
  if(q.type==='num'){if(/^[0-9]$/.test(e.key))key(e.key);else if(e.key==='.'&&Y().dec)key('.');else if(e.key==='-'&&Y().dec)key('-');else if(e.key==='Backspace'){e.preventDefault();key('del')}else if(e.key==='Enter'){e.preventDefault();key('ok')}}
  else if(/^[1-4]$/.test(e.key)&&+e.key<=q.choices.length)submit(+e.key-1)});
function route(){const m=/^#year-([1-6])$/.exec(location.hash);if(m){store.year=+m[1];save();renderHome()}else if(store.year)renderHome();else renderYears()}
window.addEventListener('hashchange',()=>{const m=/^#year-([1-6])$/.exec(location.hash);if(m&&+m[1]!==store.year){store.year=+m[1];save();renderHome()}});
route();
})();
