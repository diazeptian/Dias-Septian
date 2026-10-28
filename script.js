// Tema gelap/terang
const root=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
document.getElementById('toggle').onclick=()=>{
  const n=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=n;
  try{localStorage.setItem('theme',n)}catch(e){}
};
// Bintang berkelap-kelip
const bg=document.getElementById('bg');
const N=innerWidth<700?45:90;
for(let i=0;i<N;i++){const s=document.createElement('div');s.className='star';
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*70}%;animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*3}s;opacity:${.4+Math.random()*.6}`;
  bg.prepend(s)}
// Efek ketik
const words=['I build modern, clean, and responsive websites','that bring ideas to life.','Build beautiful & functional web experiences.'];
const el=document.getElementById('typed');let w=0,c=0,del=false;
(function tick(){const t=words[w];el.textContent=t.slice(0,c);
  if(!del&&c===t.length){del=true;return setTimeout(tick,1800)}
  if(del&&c===0){del=false;w=(w+1)%words.length}
  c+=del?-1:1;setTimeout(tick,del?25:55)})();
// Arah & jeda (stagger) animasi masuk
document.querySelectorAll('.title').forEach(e=>e.classList.add('rv-l'));
document.querySelector('.about>div:first-child')?.classList.add('rv-l');
document.querySelector('.photo')?.classList.add('rv-r');
document.querySelectorAll('.skills .card').forEach(e=>e.classList.add('rv-z'));
document.querySelectorAll('section.s').forEach(sec=>{
  sec.querySelectorAll('.rv').forEach((e,i)=>{
    const d=Math.min(i*0.13,0.9);e.style.transitionDelay=d+'s';
    setTimeout(()=>{e.style.transitionDelay='';e.classList.add('done')},(d+1.2)*1000+400);
  });
});
// Reveal saat scroll + hitung persen skill
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  e.target.classList.add('show');
  e.target.querySelectorAll('[data-n]').forEach(n=>{const to=+n.dataset.n;let v=0;
    const id=setInterval(()=>{v+=2;if(v>=to){v=to;clearInterval(id)}n.textContent=v+'%'},25)});
  io.unobserve(e.target)}),{threshold:.2});
document.querySelectorAll('section.s').forEach(s=>io.observe(s));
// Nav aktif
const links=[...document.querySelectorAll('.links a')];
addEventListener('scroll',()=>{let cur='home';
  document.querySelectorAll('header[id],section[id]').forEach(s=>{if(scrollY>=s.offsetTop-200)cur=s.id});
  links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));});

// Menu hamburger (mobile)
const burger=document.getElementById('burger'),menu=document.querySelector('.links');
const setMenu=o=>{menu.classList.toggle('open',o);burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
burger.onclick=()=>setMenu(!menu.classList.contains('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('resize',()=>{if(innerWidth>820)setMenu(false)});

// Efek scroll: progress bar, nav pintar, parallax, tombol ke atas
const nav=document.querySelector('nav'),bar=document.getElementById('progress'),topBtn=document.getElementById('top');
const hero=document.querySelector('.hero .wrap'),moon=document.querySelector('.moon');
const clouds=[...document.querySelectorAll('.cloud')],mount=document.querySelector('.mount');
let lastY=0,tick2=false;
function onScroll(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${max>0?y/max:0})`;
  nav.classList.toggle('scrolled',y>40);
  nav.classList.toggle('hide',y>lastY&&y>200&&!menu.classList.contains('open'));
  topBtn.classList.toggle('on',y>500);
  lastY=y;
  if(y<innerHeight*1.2){
    bg.style.translate=`0 ${y*.18}px`;
    moon.style.translate=`0 ${y*.35}px`;
    clouds.forEach((c,i)=>c.style.translate=`${(i%2?-1:1)*y*.15}px ${y*(.1+i*.05)}px`);
    mount.style.translate=`0 ${-y*.06}px`;
    hero.style.transform=`translateY(${y*.15}px)`;
    hero.style.opacity=Math.max(0,1-y/(innerHeight*.9));
  }
  tick2=false;
}
addEventListener('scroll',()=>{if(!tick2){tick2=true;requestAnimationFrame(onScroll)}},{passive:true});
topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});
onScroll();
