/* ============ TELAS, CARTÕES, NAVEGAÇÃO E ROTAS ============ */
const svgI=(k,cls)=>`<svg viewBox="0 0 24 24" ${cls?`class="${cls}"`:''} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
const icoCircle=k=>`<div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[k]}</svg></div>`;

const BEN=[
 {i:'mobility',t:'Melhora da mobilidade',p:'Movimentos simples mantêm as articulações soltas e o corpo preparado para o ritmo do turno.'},
 {i:'tension',t:'Redução de tensões musculares',p:'O alongamento alivia pescoço, ombros, costas e pernas depois de muito tempo na mesma posição.'},
 {i:'health',t:'Saúde no ambiente de trabalho',p:'Pausas curtas e regulares ajudam a prevenir desconfortos e melhoram a disposição.'}
];
const TIPS=[
 {i:'posture',t:'Cuide da postura',p:'Mantenha a coluna alinhada, os ombros relaxados e o peso distribuído nos dois pés. Evite ficar curvado por muito tempo sobre bancadas e equipamentos.'},
 {i:'mobility',t:'Movimente o corpo no turno',p:'Troque de posição e faça pequenas pausas ao longo do expediente. Um alongamento de 30 segundos já ajuda a soltar o corpo.'},
 {i:'alert',t:'Perceba os sinais do corpo',p:'Tensão, formigamento, rigidez e dor que não passa são avisos. Não ignore: converse com sua liderança e procure um profissional de saúde.'},
 {i:'water',t:'Hidrate-se',p:'Beba água ao longo do dia, mesmo sem sentir sede. Aproveite a pausa para se hidratar e alongar.'},
 {i:'joints',t:'Cuide de punhos, ombros, coluna e pernas',l:['Punhos: alterne a mão nas tarefas repetitivas e alongue-os.','Ombros: evite manter os braços acima da altura dos ombros por muito tempo.','Coluna: dobre os joelhos, e não as costas, para pegar peso do chão.','Pernas: alterne o apoio dos pés e use calçado confortável.']},
 {i:'load',t:'Evite sobrecargas',p:'Peça ajuda para itens pesados, segure a carga perto do corpo e divida tarefas repetitivas com a equipe sempre que possível.'}
];

function cardHTML(e){
  return `<a class="card" href="#ex-${e.id}">
    <div class="ill"><span class="num">${e.id}</span>${svgFig(POSES[e.pose])}</div>
    <div class="card-b">
      <h3>${e.nome}</h3>
      <div class="k">Como fazer</div>
      <ol class="mini">${e.resumo.map(s=>`<li>${s}</li>`).join('')}</ol>
      <dl class="facts">
        <div><dt>Tempo</dt><dd>${e.tempo}, ${e.reps}</dd></div>
        <div><dt>Frequência</dt><dd>${e.freq}</dd></div>
      </dl>
      <p class="ben"><b>Benefício</b>${e.beneficio}</p>
      <span class="more">Ver orientações completas ${svgI('arrow')}</span>
    </div>
  </a>`;
}
function detailHTML(e){
  const prev=EX[e.id-2],next=EX[e.id];
  return `<div class="wrap detail">
    <a class="back" href="#exercicios">${svgI('arrowL')} Voltar para a lista</a>
    <div class="d-grid">
      <div class="d-ill">
        <div class="ill big"><span class="num">${e.id}</span>${svgFig(POSES[e.pose])}</div>
        <p class="legend"><i></i><span>A área amarela mostra onde você deve sentir o alongamento.</span></p>
      </div>
      <div class="d-main">
        <span class="pill">${CATS[e.cat]}</span>
        <h1>${e.nome}</h1>
        <p class="alvo">Região trabalhada: ${e.alvo}</p>
        <h2>Como fazer</h2>
        <ol class="steps">${e.passos.map(s=>`<li><span>${s}</span></li>`).join('')}</ol>
        <dl class="stats">
          <div class="stat">${svgI('clock')}<div><dt>Tempo</dt><dd>${e.tempo}</dd></div></div>
          <div class="stat">${svgI('repeat')}<div><dt>Repetições</dt><dd>${e.reps}</dd></div></div>
          <div class="stat">${svgI('cal')}<div><dt>Frequência</dt><dd>${e.freq}</dd></div></div>
        </dl>
        <div class="box tint"><h3>Benefício</h3><p>${e.beneficio}</p></div>
        <div class="box"><h3>Orientações importantes</h3><ul><li>${e.cuidado}</li>${COMUM.map(s=>`<li>${s}</li>`).join('')}</ul></div>
        <nav class="pn" aria-label="Outros exercícios">
          ${prev?`<a href="#ex-${prev.id}">${svgI('arrowL')} Anterior: ${prev.id}</a>`:'<span></span>'}
          ${next?`<a href="#ex-${next.id}">Próximo: ${next.id} ${svgI('arrow')}</a>`:'<span></span>'}
        </nav>
      </div>
    </div>
  </div>`;
}

/*DOM*/
const $=s=>document.querySelector(s);
const VIEWS={inicio:$('#v-inicio'),exercicios:$('#v-exercicios'),detalhe:$('#v-detalhe'),sobre:$('#v-sobre'),dicas:$('#v-dicas')};
const navLinks=[].slice.call(document.querySelectorAll('.nav a'));
const nav=$('#nav'),menuBtn=$('#menuBtn');

/* Início */
$('#heroArt').innerHTML=svgFig(POSES.p2,{bg:'<circle cx="120" cy="150" r="104" fill="#FFC72C"/><circle cx="120" cy="150" r="116" fill="none" stroke="#FFC72C" stroke-opacity=".25" stroke-width="2"/>',ground:false,extras:false});
$('#heroArt').setAttribute('role','img');
$('#benefits').innerHTML=BEN.map(b=>`<div class="benefit">${icoCircle(b.i)}<h3>${b.t}</h3><p>${b.p}</p></div>`).join('');

/* Lista de exercícios */
const FILTROS=[['todos','Todos'],['sup','Parte superior do corpo'],['col','Coluna e costas'],['per','Pernas']];
$('#chips').innerHTML=FILTROS.map((f,i)=>`<button type="button" class="chip" data-f="${f[0]}" aria-pressed="${i===0}">${f[1]}</button>`).join('');
$('#exList').innerHTML=['sup','col','per'].map(c=>{
  const list=EX.filter(e=>e.cat===c);
  return `<section data-cat="${c}"><div class="cat-h"><h2>${CATS[c]}</h2><span>Exercícios ${list[0].id} a ${list[list.length-1].id}</span></div><div class="grid">${list.map(cardHTML).join('')}</div></section>`;
}).join('');
$('#chips').addEventListener('click',ev=>{
  const b=ev.target.closest('.chip');if(!b)return;
  const f=b.dataset.f;
  [].forEach.call(document.querySelectorAll('.chip'),x=>x.setAttribute('aria-pressed',String(x===b)));
  [].forEach.call(document.querySelectorAll('#exList section'),s=>{s.hidden=!(f==='todos'||s.dataset.cat===f);});
});

/* Dicas */
$('#tips').innerHTML=TIPS.map(t=>`<article class="tip">${icoCircle(t.i)}<h3>${t.t}</h3>${t.l?`<ul>${t.l.map(x=>`<li>${x}</li>`).join('')}</ul>`:`<p>${t.p}</p>`}</article>`).join('');

/* Menu e rotas */
function closeMenu(){nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Abrir menu');}
menuBtn.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
});
nav.addEventListener('click',ev=>{if(ev.target.closest('a'))closeMenu();});

function show(name){Object.keys(VIEWS).forEach(k=>{VIEWS[k].hidden=(k!==name);});}
function route(first){
  const h=(location.hash||'#inicio').slice(1);
  const m=/^ex-(\d+)$/.exec(h);
  let active='inicio';
  if(m&&EX[+m[1]-1]){
    VIEWS.detalhe.innerHTML=detailHTML(EX[+m[1]-1]);
    show('detalhe');active='exercicios';
  }else if(['inicio','exercicios','sobre','dicas'].indexOf(h)>-1){
    show(h);active=h;
  }else{show('inicio');}
  navLinks.forEach(a=>{if(a.dataset.r===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  closeMenu();
  if(!first){window.scrollTo(0,0);try{$('#main').focus({preventScroll:true});}catch(e){}}
}
window.addEventListener('hashchange',()=>route(false));
route(true);
