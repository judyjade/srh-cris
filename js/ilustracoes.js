/* ============ ILUSTRAÇÕES (desenho dos exercícios em SVG) ============ */
const C={shirt:'#3a3d42',pants:'#1c1e21',skin:'#e6b28b',hair:'#1c1c1c',shoe:'#f4f4f0'};
const n=v=>Math.round(v*10)/10;
const ln=(a,b,w,c)=>`<line x1="${n(a[0])}" y1="${n(a[1])}" x2="${n(b[0])}" y2="${n(b[1])}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const dot=(p,r,c)=>`<circle cx="${n(p[0])}" cy="${n(p[1])}" r="${r}" fill="${c}"/>`;
const arm=a=>ln(a[1],a[2],9,C.skin)+ln(a[0],a[1],13,C.shirt)+dot(a[2],6,C.skin);
const leg=l=>ln(l[0],l[1],18,C.pants)+ln(l[1],l[2],15,C.pants)+ln(l[3],l[4],12,'#2a2a2a')+ln(l[3],l[4],8,C.shoe);
const rot=(p,c,deg)=>{const a=deg*Math.PI/180,x=p[0]-c[0],y=p[1]-c[1];return[c[0]+x*Math.cos(a)-y*Math.sin(a),c[1]+x*Math.sin(a)+y*Math.cos(a)].map(n);};
function head(h){
  const x=h.p[0],y=h.p[1],d=h.dir||0,r=h.rot||0;
  const visor=d?`<path d="M${x+d*8} ${y-2}h${d*17}" stroke="${C.hair}" stroke-width="5" stroke-linecap="round" fill="none"/>`
               :`<path d="M${x-14} ${y-1}h28" stroke="${C.hair}" stroke-width="4" stroke-linecap="round" fill="none"/>`;
  return `<g transform="rotate(${r} ${x} ${y})"><circle cx="${x}" cy="${y}" r="15" fill="${C.skin}"/><path d="M${x-15.5} ${y-1}A15.5 15.5 0 0 1 ${x+15.5} ${y-1}Z" fill="${C.hair}"/>${visor}</g>`;
}
function wall(x){
  let s=`<rect x="${x}" y="22" width="${240-x}" height="240" fill="#cfd1c9"/><path d="M${x} 22V262" stroke="#9a9c93" stroke-width="3"/>`;
  for(let y=50;y<262;y+=28)s+=`<path d="M${x} ${y}H240" stroke="#bcbeb5" stroke-width="1.5"/>`;
  return s;
}
let UID=0;
function svgFig(p,o){
  o=o||{};
  const id='ah'+(++UID);
  let s=`<svg viewBox="0 0 240 280" role="img" aria-label="${p.alt}" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<defs><marker id="${id}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1 1L9 5L1 9z" fill="#171717"/></marker></defs>`;
  if(o.bg)s+=o.bg;
  if(o.ground!==false)s+=`<path d="M14 262H${p.wall?p.wall[0]:226}" stroke="#c4c6bd" stroke-width="2"/><ellipse cx="120" cy="262" rx="78" ry="6" fill="#171717" opacity=".09"/>`;
  if(p.wall)s+=wall(p.wall[0]);
  (p.back||[]).forEach(a=>{s+=arm(a);});
  s+=p.raw||'';
  p.legs.forEach(l=>{s+=leg(l);});
  if(p.torso.t==='poly'){
    const pts=p.torso.pts.map(q=>n(q[0])+','+n(q[1])).join(' ');
    s+=`<polygon points="${pts}" fill="${C.shirt}" stroke="${C.shirt}" stroke-width="14" stroke-linejoin="round"/>`;
  }else{
    s+=ln(p.torso.a,p.torso.b,30,C.shirt);
  }
  s+=ln(p.neck[0],p.neck[1],10,C.skin)+head(p.head);
  (p.front||[]).forEach(a=>{s+=arm(a);});
  if(o.extras!==false){
    (p.glow||[]).forEach(g=>{s+=`<ellipse cx="${g[0]}" cy="${g[1]}" rx="${g[2]}" ry="${g[3]}" transform="rotate(${g[4]} ${g[0]} ${g[1]})" fill="#FFC72C" fill-opacity=".8" stroke="#C98F00" stroke-width="2" stroke-dasharray="4 3"/>`;});
    (p.arrows||[]).forEach(d=>{s+=`<path d="${d}" fill="none" stroke="#171717" stroke-width="3" stroke-linecap="round" marker-end="url(#${id})"/>`;});
  }
  return s+'</svg>';
}

const FRONT_LEGS=[[[108,152],[107,204],[106,250],[98,257],[113,257]],[[132,152],[133,204],[134,250],[127,257],[142,257]]];
const SIDE_LEGS=[[[121,152],[123,204],[123,250],[117,257],[137,257]],[[119,152],[119,204],[119,250],[113,257],[133,257]]];
const STD_TORSO={t:'poly',pts:[[96,76],[144,76],[132,150],[108,150]]};
const STD_NECK=[[120,70],[120,50]];
const H5=[120,150],T5=22,R5=(x,y)=>rot([x,y],H5,T5);
const sh5L=R5(96,76),sh5R=R5(144,76);

const POSES={
  p1:{alt:'Pessoa em pé inclinando a cabeça para o lado, com a mão apoiada sobre a cabeça',
    legs:FRONT_LEGS,torso:STD_TORSO,neck:[[120,70],[134,52]],head:{p:[134,52],dir:0,rot:24},
    front:[[[96,76],[88,114],[88,150]],[[144,76],[168,56],[144,34]]],
    glow:[[108,68,10,17,0]],arrows:['M 96 30 Q 128 8 158 28']},
  p2:{alt:'Pessoa em pé com um braço esticado à frente do peito, sendo puxado pela outra mão',
    legs:FRONT_LEGS,torso:STD_TORSO,neck:STD_NECK,head:{p:[120,50],dir:0},
    front:[[[96,76],[124,92],[158,88]],[[144,76],[152,114],[124,97]]],
    glow:[[112,86,16,9,25]],arrows:[]},
  p3:{alt:'Pessoa em pé com um cotovelo dobrado atrás da cabeça, segurado pela outra mão',
    legs:FRONT_LEGS,torso:STD_TORSO,neck:STD_NECK,head:{p:[120,50],dir:0},
    back:[[[144,76],[148,36],[126,64]],[[96,76],[100,40],[142,34]]],front:[],
    glow:[[150,54,8,19,0]],arrows:['M 184 40 L 162 38']},
  p4:{alt:'Pessoa de lado com o braço estendido à frente, puxando os dedos da mão para trás',
    legs:SIDE_LEGS,torso:{t:'line',a:[120,72],b:[120,152]},neck:[[120,70],[126,50]],head:{p:[126,50],dir:1},
    back:[[[120,82],[156,84],[190,84]]],raw:ln([190,84],[192,64],7,C.skin),
    front:[[[120,82],[152,102],[193,70]]],
    glow:[[168,84,26,11,0]],arrows:['M 218 58 L 202 58']},
  p5:{alt:'Pessoa em pé com um braço acima da cabeça, inclinando o tronco para o lado',
    legs:FRONT_LEGS,torso:{t:'poly',pts:[sh5L,sh5R,[132,150],[108,150]]},
    neck:[R5(120,70),R5(120,50)],head:{p:R5(120,50),dir:0,rot:T5},
    front:[[sh5L,[138,36],[170,30]],[sh5R,[182,124],[142,148]]],
    glow:[[106,112,9,30,12]],arrows:['M 194 40 Q 218 66 212 100']},
  p6:{alt:'Pessoa em pé com os braços cruzados sobre o peito, girando o tronco',
    legs:FRONT_LEGS,torso:{t:'poly',pts:[[106,76],[134,76],[132,150],[108,150]]},
    neck:[[120,70],[122,50]],head:{p:[122,50],dir:0},
    front:[[[106,76],[116,108],[134,84]],[[134,76],[126,112],[106,86]]],
    glow:[[120,112,18,30,0]],arrows:['M 70 130 A 50 16 0 0 0 170 130']},
  p7:{alt:'Pessoa com as mãos apoiadas na parede e o tronco inclinado à frente com as costas retas',
    wall:[214],
    legs:[[[88,146],[90,200],[90,250],[84,257],[104,257]],[[92,146],[93,200],[93,250],[87,257],[107,257]]],
    torso:{t:'line',a:[162,126],b:[90,144]},neck:[[162,126],[180,112]],head:{p:[181,110],dir:1},
    front:[[[160,130],[187,132],[213,130]]],
    glow:[[126,134,40,13,-14]],arrows:['M 104 110 L 68 118']},
  p8:{alt:'Pessoa com as mãos na parede, uma perna esticada para trás com o calcanhar no chão e o joelho da frente dobrado',
    wall:[208],
    legs:[[[112,152],[82,202],[52,250],[44,257],[66,257]],[[112,152],[154,200],[151,250],[144,257],[166,257]]],
    torso:{t:'line',a:[146,80],b:[112,150]},neck:[[146,76],[160,60]],head:{p:[161,60],dir:1},
    front:[[[146,86],[174,96],[205,98]]],
    glow:[[69,224,9,24,32]],arrows:['M 150 30 L 190 30']},
  p9:{alt:'Pessoa em pé com uma perna esticada à frente, ponta do pé para cima, e o tronco inclinado com as mãos na coxa',
    legs:[[[92,158],[82,208],[79,250],[72,257],[94,257]],[[92,158],[130,204],[166,248],[158,256],[184,245]]],
    torso:{t:'line',a:[144,116],b:[92,156]},neck:[[144,112],[160,102]],head:{p:[161,101],dir:1},
    front:[[[142,120],[138,158],[134,196]]],
    glow:[[103,187,8,26,-40]],arrows:['M 176 84 Q 206 106 200 146']},
  p10:{alt:'Pessoa de lado com as mãos entrelaçadas atrás do corpo e o peito aberto',
    legs:SIDE_LEGS,torso:{t:'line',a:[122,72],b:[119,152]},neck:[[122,68],[128,50]],head:{p:[128,50],dir:1,rot:-6},
    front:[[[118,82],[102,114],[84,138]]],
    glow:[[132,96,13,22,0]],arrows:['M 146 98 L 178 98','M 76 112 L 60 126']}
};
