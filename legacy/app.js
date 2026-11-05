// Mochila Mágica - App Principal - Hack4Edu Reto 02
// Offline First - Hecho por equipo Almoloya
// Estilo Duolingo + Dificultad por grado 1º-6º

// Variables globales
let gradoActual = 1;
let materiaActual = 'matematicas';
let xp = parseInt(localStorage.getItem('mochila_xp') || '5');
let progreso = JSON.parse(localStorage.getItem('mochila_progreso') || '{"matematicas":0,"espanol":0,"historia":0,"ciencias":0,"arte":0}');
let usuario = JSON.parse(localStorage.getItem('mochila_usuario') || 'null');
let preguntaActual = null;
let intentos = 0;
let respondida = false;
let tab = 'inicio';
let selIdx = null;
let selAvatar = '👧';
let selGrado = 3;

// Guardar en localStorage
function guardar() {
  localStorage.setItem('mochila_xp', xp);
  localStorage.setItem('mochila_progreso', JSON.stringify(progreso));
  if (usuario) {
    localStorage.setItem('mochila_usuario', JSON.stringify(usuario));
    gradoActual = usuario.grado;
  }
}

// Obtener banco según grado y materia - SIN MEZCLAR MATERIAS
function getBanco() {
  // Si existe para ese grado y materia, usar ese
  if (bancosPorGrado[gradoActual] && bancosPorGrado[gradoActual][materiaActual]) {
    return bancosPorGrado[gradoActual][materiaActual];
  }
  // Si no, fallback a 1º de esa materia
  if (bancosPorGrado[1] && bancosPorGrado[1][materiaActual]) {
    return bancosPorGrado[1][materiaActual];
  }
  // Último fallback matemáticas 1º
  return bancosPorGrado[1]['matematicas'];
}

// Generar nueva pregunta - MISMA MATERIA, NO MEZCLA
function genPregunta() {
  let banco = getBanco();
  let p = banco[Math.floor(Math.random() * banco.length)];
  preguntaActual = { ...p };
  intentos = 0;
  respondida = false;
  selIdx = null;
  render();
}

// Elegir opción - Muestra bien/mal y se queda hasta Siguiente
function elegir(i) {
  if (respondida) return;
  intentos++;
  selIdx = i;
  let correcta = i === preguntaActual.c;
  respondida = true;
  if (correcta) {
    // XP: +5 primera vez, -1 por intento, mínimo 1
    let gana = Math.max(1, 5 - intentos + 1);
    xp += gana;
    progreso[materiaActual] = (progreso[materiaActual] || 0) + 1;
    guardar();
    lanzarConfetti();
  }
  render();
}

// Siguiente pregunta - Solo este botón avanza
function siguiente() {
  genPregunta();
}

// Confetti solo al acertar
function lanzarConfetti() {
  let c = document.createElement('div');
  c.className = 'confetti';
  for (let k = 0; k < 20; k++) {
    let i = document.createElement('i');
    i.style.left = Math.random() * 100 + 'vw';
    i.style.background = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#58CC02'][k % 4];
    i.style.top = '-10px';
    i.style.animationDelay = (Math.random() * 0.3) + 's';
    c.appendChild(i);
  }
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 1800);
}

// Pista real según pregunta - Socrática, no da respuesta directa
function pistaReal() {
  if (!preguntaActual) return '¡Piensa bien! 💡';
  if (materiaActual === 'matematicas') {
    if (gradoActual === 1) return 'Cuenta con tus deditos ✋ ' + preguntaActual.n;
    return 'Cuenta despacito, tú puedes ✋ ' + preguntaActual.n;
  }
  if (preguntaActual.n.includes('antónimo')) return 'Antónimo es lo opuesto. Grande vs Pequeño 🤔 Grande es muy grande, lo contrario es muy...';
  if (preguntaActual.n.includes('verbo')) return '¿Cosa tocas? ¿Color ves? ¿Acción haces? Correr es acción → verbo 🏃';
  if (preguntaActual.n.includes('letra')) return 'Mira el abecedario: A B C... ¿Cuál es?';
  if (preguntaActual.n.includes('color')) return 'Mira a tu alrededor, ¿qué color ves?';
  return 'Lee despacito, tú sabes esto 💡 ' + preguntaActual.n;
}

// Explica paso a paso - Socrático
function explicaReal() {
  if (!preguntaActual) return '¡Vamos! 💡';
  return preguntaActual.exp + ' - ' + preguntaActual.n;
}

// Top navigation
function topnav() {
  return `
  <div class="topnav">
    <div class="logo">🎒<span style="color:#FF6B6B"> Mochila<br>Mágica</span></div>
    <div class="tabs">
      <div class="badge-final">FINAL</div>
      <div class="tab ${tab === 'inicio' ? 'active' : ''}" onclick="tab='inicio';render()">🏠 Inicio</div>
      <div class="tab ${tab === 'camino' ? 'active' : ''}" onclick="tab='camino';genPregunta()">📖 Camino</div>
      <div class="tab ${tab === 'maicito' ? 'active' : ''}" onclick="tab='maicito';render()">🌱 Maicito</div>
      <div class="tab ${tab === 'ranking' ? 'active' : ''}" onclick="tab='ranking';render()">🏆 Ranking</div>
      <div class="tab ${tab === 'avance' ? 'active' : ''}" onclick="tab='avance';render()">📊 Avance</div>
      <div class="tab ${tab === 'perfil' ? 'active' : ''}" onclick="tab='perfil';render()">👤 Perfil</div>
    </div>
    <div class="xp-badge">⚡ ${xp} XP • ${gradoActual}º</div>
  </div>`;
}

function bottomnav() {
  return `
  <div class="bottomnav">
    <div class="navitem ${tab === 'inicio' ? 'active' : ''}" onclick="tab='inicio';render()">🏠<br>Inicio</div>
    <div class="navitem ${tab === 'camino' ? 'active' : ''}" onclick="tab='camino';genPregunta()">📖<br>Camino</div>
    <div class="navitem ${tab === 'maicito' ? 'active' : ''}" onclick="tab='maicito';render()">🌱<br>Maicito</div>
    <div class="navitem ${tab === 'ranking' ? 'active' : ''}" onclick="tab='ranking';render()">🏆<br>Ranking</div>
    <div class="navitem ${tab === 'avance' ? 'active' : ''}" onclick="tab='avance';render()">📊<br>Avance</div>
    <div class="navitem ${tab === 'perfil' ? 'active' : ''}" onclick="tab='perfil';render()">👤<br>Perfil</div>
  </div>`;
}

// Crear perfil
function crearPerfil() {
  let nombreInput = document.getElementById('nombre');
  let n = nombreInput ? nombreInput.value : 'Ana';
  if (!n) n = 'Ana';
  usuario = {
    nombre: n,
    avatar: selAvatar,
    grado: selGrado,
    racha: 1,
    fecha: new Date().toISOString()
  };
  gradoActual = selGrado;
  guardar();
  tab = 'camino';
  materiaActual = 'matematicas';
  genPregunta();
}

// Render Inicio
function renderInicio() {
  let app = document.getElementById('app');
  if (!usuario) {
    app.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--crema)">
      <div class="card" style="max-width:520px;width:100%;text-align:center">
        <div style="font-size:64px">🎒</div>
        <h1 style="font-family:Fredoka;font-size:32px">¡Bienvenido a Mochila Mágica! ✨</h1>
        <p style="color:#666;margin:8px 0">Aprende sin internet - Hack4Edu</p>
        <input id="nombre" class="input-nombre" placeholder="Tu nombre (ej: Ana)" />
        <p style="font-weight:800;margin-top:12px;text-align:left">Elige tu avatar:</p>
        <div class="avatar-grid">
          ${['👧','👦','🌟','🦊','🐯','🦁','🐶','🐱'].map(a => `
            <div onclick="selAvatar='${a}';document.querySelectorAll('.avatar-item').forEach(x=>x.classList.remove('selected'));this.classList.add('selected')" class="avatar-item">${a}</div>
          `).join('')}
        </div>
        <p style="font-weight:800;margin-top:12px;text-align:left">¿En qué grado estás? (1º muy fácil con dibujitos, 6º difícil)</p>
        <div class="grado-grid">
          ${[1,2,3,4,5,6].map(g => `
            <div onclick="selGrado=${g};document.querySelectorAll('.grado-item').forEach(x=>x.classList.remove('selected'));this.classList.add('selected')" class="grado-item">
              ${g}º<br><small>${g===1?'🧒 Muy fácil':g===6?'🔥 Difícil':g+'º'}</small>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-rojo" style="width:100%;margin-top:12px" onclick="crearPerfil()">¡Crear mi Mochila! 🚀</button>
        <p style="font-size:12px;color:#999;margin-top:12px">Se guarda offline en tu dispositivo</p>
      </div>
    </div>`;
    selAvatar = '👧';
    selGrado = 1;
    // Seleccionar primero por defecto
    setTimeout(() => {
      let firstAv = document.querySelector('.avatar-item');
      let firstGr = document.querySelector('.grado-item');
      if (firstAv) firstAv.classList.add('selected');
      if (firstGr) firstGr.classList.add('selected');
    }, 100);
    return;
  }
  app.innerHTML = `
  ${topnav()}
  <div class="container">
    <div class="card" style="grid-column:1/-1;text-align:center">
      <h1 style="font-family:Fredoka;font-size:32px">¡Hola, ${usuario.nombre}! 👋 ${usuario.avatar} ${usuario.grado}º</h1>
      <p>⭐ ${xp} XP • 🔥 Racha ${usuario.racha || 0} días • Grado ${gradoActual}º ${gradoActual===1?'con dibujitos 🍎':''}</p>
      <button class="btn btn-rojo" style="margin-top:12px" onclick="tab='camino';materiaActual='matematicas';genPregunta()">¡Seguir Aventura! 🚀</button>
    </div>
    <div class="card"><h3>📚 Camino</h3><p>5 materias - Grado ${gradoActual}º</p><p style="font-size:12px;color:#666">${gradoActual===1?'Muy fácil con dibujitos':gradoActual===6?'Difícil fracciones':''}</p><button class="btn" onclick="tab='camino';genPregunta()">Ir</button></div>
    <div class="card"><h3>🌱 Maicito</h3><p>Nivel ${Math.floor(xp/25)+1}</p><button class="btn" onclick="tab='maicito';render()">Ver</button></div>
    <div class="card"><h3>🏆 Ranking</h3><p>Top 10 - Grado ${gradoActual}º</p><button class="btn" onclick="tab='ranking';render()">Ver</button></div>
  </div>
  ${bottomnav()}`;
}

// Render principal
function render() {
  let app = document.getElementById('app');
  if (tab === 'inicio') { renderInicio(); return; }

  if (tab === 'camino') {
    if (!preguntaActual) genPregunta();
    let prog = progreso[materiaActual] || 0;
    let dificultad = gradoActual===1?'Muy fácil con dibujitos 🍎':gradoActual===2?'Fácil':gradoActual===3?'Medio':gradoActual===6?'Difícil 🔥':'Medio';
    app.innerHTML = `
    ${topnav()}
    <div class="container">
      <div class="card">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:32px">📖</div>
          <div>
            <b>Camino ${materiaActual} - ${gradoActual}º</b>
            <div style="font-size:12px;color:#666">${dificultad}</div>
            <div class="bar" style="width:100%;margin-top:6px"><div class="fill" style="width:${Math.min(100, prog * 10)}%"></div></div>
          </div>
        </div>
        <div style="margin-top:14px;display:grid;gap:8px">
          <p style="font-weight:800;font-size:12px;color:#666">GRADO:</p>
          ${[1,2,3,4,5,6].map(g => `
            <div onclick="gradoActual=${g};usuario.grado=${g};guardar();genPregunta()" style="padding:10px;border-radius:14px;cursor:pointer;background:${g===gradoActual?'#E6FFE6':'#F5F5F5'};border:2px solid ${g===gradoActual?'var(--verde)':'#EEE'};font-weight:800;font-size:13px">
              ${g}º ${g===1?'🧒 Muy fácil':g===6?'🔥 Difícil':''}
            </div>
          `).join('')}
          <p style="font-weight:800;font-size:12px;color:#666;margin-top:8px">MATERIA:</p>
          ${Object.keys(bancosPorGrado[1]).map(m => `
            <div onclick="materiaActual='${m}';genPregunta()" style="padding:10px;border-radius:14px;cursor:pointer;background:${m===materiaActual?'#E6FFE6':'#F5F5F5'};border:2px solid ${m===materiaActual?'var(--verde)':'#EEE'};font-weight:800">${m}</div>
          `).join('')}
        </div>
        <div style="margin-top:12px;padding:12px;background:#FFFEF0;border:2px solid #FFE66D;border-radius:16px;font-weight:700;font-size:13px">
          ¡Nueva aventura! 🚀<br>Grado ${gradoActual}º - ${dificultad}<br>Preguntas cambian día tras día
        </div>
      </div>
      <div class="card">
        <div style="font-size:13px;color:#666">¡Reto del día! ${gradoActual}º • ${dificultad} • <span style="background:#E6FFE6;padding:2px 8px;border-radius:10px;border:1px solid #A7E043">${materiaActual}</span></div>
        <div class="enunciado">${preguntaActual.n}</div>
        <div>
          ${preguntaActual.op.map((o, i) => `
            <button class="opcion ${respondida ? (i === preguntaActual.c ? 'correcta' : (selIdx === i ? 'incorrecta' : '')) : ''}" onclick="elegir(${i})">
              <span class="letra">${String.fromCharCode(65+i)}</span> ${o}
            </button>
          `).join('')}
          ${respondida ? `
            <div class="feedback ${selIdx === preguntaActual.c ? 'ok' : 'bad'}">
              ${selIdx === preguntaActual.c ? `¡CORRECTO! 🎉 +${Math.max(1, 5-intentos+1)} XP • ${preguntaActual.exp}` : `¡Uy! No es correcto 😅 Intento ${intentos}/3 • Correcta: ${preguntaActual.op[preguntaActual.c]} • ${preguntaActual.exp}`}
            </div>
          ` : ''}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:10px;margin-top:14px">
          <button class="btn" onclick="alert(pistaReal())">💡 Pista<br><small>real</small></button>
          <button class="btn" onclick="alert(explicaReal())">📖 Explica<br><small>paso a paso</small></button>
          <button class="btn ${!respondida ? 'btn-des' : 'btn-rojo'}" onclick="siguiente()">➡️ Siguiente<br>Pregunta</button>
        </div>
        <div style="text-align:center;color:#999;font-size:12px;margin-top:10px;font-weight:700">XP +5 -1 • Grado ${gradoActual}º ${dificultad} • ¡Vamos bien!</div>
      </div>
      <div class="card">
        <div style="display:flex;gap:10px;align-items:center">
          <div style="font-size:36px">🌽</div>
          <div><b>Maizito 🌟</b><div style="padding:8px;background:#FFFEF0;border-radius:14px;font-size:13px;font-weight:700;margin-top:6px">¡Siguiente reto! Tú puedes 🌟<br>Grado ${gradoActual}º ${dificultad}</div></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">
          <button class="btn" onclick="alert('¡Tú puedes, '+(usuario?.nombre||'campeón')+'! 💪😊 Grado ${gradoActual}º')">💪<br>Ánimo</button>
          <button class="btn" onclick="alert(pistaReal())">💡<br>Pista</button>
          <button class="btn" onclick="alert(explicaReal())">📖<br>Explica</button>
        </div>
        <div style="margin-top:14px">
          <b>Tu plantita 🌱 Nivel ${Math.floor(xp/25)+1}</b>
          <div style="display:flex;gap:10px;align-items:center;margin-top:6px">
            <div class="plantita">${['🌱','🌿','🌳','🌽','🌽✨','🌟'][Math.min(5, Math.floor(xp/50))]}</div>
            <div><div class="bar" style="width:120px"><div class="fill" style="width:${(xp%25)*4}%"></div></div></div>
          </div>
          <div style="font-size:11px;color:#666;margin-top:6px">Crece con cada aventura • ¡Sin límite! • Grado ${gradoActual}º</div>
        </div>
      </div>
    </div>
    ${bottomnav()}`;
    return;
  }

  if (tab === 'maicito') {
    let nivel = Math.floor(xp/25)+1;
    let etapa = ['🌱 Semilla','🌿 Brote','🌳 Pequeña','🌽 Elote','🌽✨ Grande','🌟 Mágica'][Math.min(5, Math.floor(xp/50))];
    app.innerHTML = `
    ${topnav()}
    <div class="container" style="grid-template-columns:1fr">
      <div class="card" style="text-align:center">
        <div style="font-size:100px" class="plantita">${etapa.split(' ')[0]}</div>
        <h1 style="font-family:Fredoka">${etapa} • Nivel ${nivel} • Grado ${gradoActual}º</h1>
        <p>⭐ ${xp} XP • Grado ${gradoActual}º ${gradoActual===1?'Muy fácil con dibujitos':''}</p>
        <div class="bar" style="max-width:300px;margin:12px auto"><div class="fill" style="width:${(xp%50)*2}%"></div></div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
          <button class="btn" onclick="xp+=5;guardar();render()">💧 Agua +5</button>
          <button class="btn" onclick="xp+=3;guardar();render()">☀️ Sol +3</button>
          <button class="btn" onclick="xp+=2;guardar();render()">❤️ Amor +2</button>
        </div>
      </div>
    </div>
    ${bottomnav()}`;
    return;
  }

  if (tab === 'ranking') {
    app.innerHTML = `
    ${topnav()}
    <div class="container" style="grid-template-columns:1fr">
      <div class="card">
        <h2>🏆 Ranking - Grado ${gradoActual}º</h2>
        <div style="margin-top:12px">
          ${[
            {n:'Tú',xp:xp,av:usuario?.avatar||'👧',me:true},
            {n:'Luis',xp:120,av:'👦'},
            {n:'Sofi',xp:95,av:'👧'},
            {n:'Mateo',xp:80,av:'🧒'}
          ].sort((a,b)=>b.xp-a.xp).map((u,i)=>`
            <div style="display:flex;justify-content:space-between;padding:12px;border-radius:14px;margin:6px 0;background:${u.me?'#E6FFE6':'#F9F9F9'};border:2px solid ${u.me?'var(--verde)':'#EEE'};font-weight:800">
              <span>${i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1)+'º'} ${u.av} ${u.n} ${u.me?`(${gradoActual}º)`:''}</span>
              <span>${u.xp} XP</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-rojo" style="width:100%;margin-top:12px" onclick="tab='camino';genPregunta()">¡Subir ranking! 🚀 Grado ${gradoActual}º</button>
      </div>
    </div>
    ${bottomnav()}`;
    return;
  }

  if (tab === 'avance') {
    app.innerHTML = `
    ${topnav()}
    <div class="container" style="grid-template-columns:1fr 1fr">
      <div class="card">
        <h3>📊 Avance Grado ${gradoActual}º - ${gradoActual===1?'Muy fácil':gradoActual===6?'Difícil':''}</h3>
        ${Object.keys(bancosPorGrado[1]).map(m=>`
          <div style="margin:10px 0">
            <div style="display:flex;justify-content:space-between;font-weight:800"><span>${m}</span><span>${progreso[m]||0}</span></div>
            <div class="bar"><div class="fill" style="width:${Math.min(100,(progreso[m]||0)*10)}%"></div></div>
          </div>
        `).join('')}
      </div>
      <div class="card">
        <h3>Stats Grado ${gradoActual}º</h3>
        <p>XP: ${xp}</p>
        <p>Preguntas: ${Object.values(progreso).reduce((a,b)=>a+b,0)}</p>
        <p>Dificultad: ${gradoActual===1?'Muy fácil con dibujitos 🍎':gradoActual===6?'Difícil fracciones 🔥':''}</p>
        <div style="margin-top:12px;padding:12px;background:#FFFEF0;border-radius:14px">💡 Grado ${gradoActual}º ${gradoActual===1?'con dibujitos para 4-5 años que no leen':gradoActual===6?'con fracciones y porcentajes difíciles':''}</div>
      </div>
    </div>
    ${bottomnav()}`;
    return;
  }

  if (tab === 'perfil') {
    app.innerHTML = `
    ${topnav()}
    <div class="container" style="grid-template-columns:1fr">
      <div class="card" style="text-align:center">
        <div style="font-size:80px">${usuario?.avatar||'👧'}</div>
        <h2>${usuario?.nombre||'Alumno'} • ${usuario?.grado||gradoActual}º</h2>
        <p>⭐ ${xp} XP • Dificultad ${gradoActual===1?'Muy fácil con dibujitos 🍎':'Difícil'}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px">
          <button class="btn" onclick="let n=prompt('Nuevo nombre',usuario.nombre);if(n){usuario.nombre=n;guardar();render()}">Editar nombre</button>
          <button class="btn" onclick="let g=prompt('Nuevo grado 1-6',usuario.grado);if(g){usuario.grado=parseInt(g);gradoActual=parseInt(g);guardar();genPregunta()}">Cambiar grado 1-6</button>
          <button class="btn" onclick="localStorage.clear();location.reload()">Borrar todo</button>
          <button class="btn" onclick="navigator.clipboard.writeText(JSON.stringify({xp,progreso,usuario}));alert('Copiado JSON!')">Exportar</button>
        </div>
      </div>
    </div>
    ${bottomnav()}`;
    return;
  }
}

// Inicio
genPregunta();

