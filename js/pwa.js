// Mochila Mágica – registro del Service Worker y ayuda para instalar la PWA
(function () {
  'use strict';

  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  var ua = navigator.userAgent || '';
  var isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var deferredPrompt = null;

  // ---- Estilos de los avisos
  var css = document.createElement('style');
  css.textContent =
    '.mm-bar{position:fixed;left:12px;right:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:9999;' +
    'max-width:520px;margin:0 auto;background:#fff;border:3px solid #E5E5E5;border-radius:20px;padding:10px 12px;' +
    'box-shadow:0 8px 32px rgba(0,0,0,.18);display:flex;align-items:center;gap:10px;font:700 13px/1.3 Nunito,system-ui,sans-serif;color:#111}' +
    '.mm-bar span{flex:1}.mm-bar button{border:0;border-radius:14px;padding:9px 14px;font:800 13px Nunito,system-ui,sans-serif;cursor:pointer}' +
    '@media (min-width:1024px){.mm-bar{bottom:24px}}' +
    '.mm-ok{background:#58CC02;color:#fff}.mm-no{background:#F5F5F5;color:#777}';
  document.head.appendChild(css);

  function bar(text, buttons) {
    var el = document.createElement('div');
    el.className = 'mm-bar';
    el.setAttribute('role', 'status');
    var sp = document.createElement('span');
    sp.textContent = text;
    el.appendChild(sp);
    buttons.forEach(function (b) {
      var btn = document.createElement('button');
      btn.className = b.cls;
      btn.textContent = b.label;
      btn.addEventListener('click', function () { el.remove(); b.fn && b.fn(); });
      el.appendChild(btn);
    });
    document.body.appendChild(el);
    return el;
  }

  // ---- Instalar (Android / Chrome / Edge / escritorio)
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    if (isStandalone || sessionStorage.getItem('mm_install_dismissed')) return;
    deferredPrompt = e;
    bar('🎒 Instala Mochila Mágica para usarla sin internet', [
      { label: 'Instalar', cls: 'mm-ok', fn: function () {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.finally(function () { deferredPrompt = null; });
        } },
      { label: 'Ahora no', cls: 'mm-no', fn: function () { sessionStorage.setItem('mm_install_dismissed', '1'); } }
    ]);
  });

  // Botón "Instalar la app" del Perfil
  window.mmInstall = function () {
    if (isStandalone) return 'instalada';
    if (deferredPrompt) {
      var b = document.querySelector('.mm-bar'); if (b) b.remove();
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () { deferredPrompt = null; });
      return 'ok';
    }
    return isIOS ? 'ios' : 'no';
  };

  window.addEventListener('appinstalled', function () {
    var b = document.querySelector('.mm-bar'); if (b) b.remove();
    deferredPrompt = null;
  });

  // ---- iPhone / iPad: no existe el aviso automático, se explica el paso manual
  if (isIOS && !isStandalone && !localStorage.getItem('mm_ios_hint')) {
    setTimeout(function () {
      bar('Para instalar: toca Compartir ⬆️ y luego “Agregar a pantalla de inicio”.', [
        { label: 'Entendido', cls: 'mm-ok', fn: function () { localStorage.setItem('mm_ios_hint', '1'); } }
      ]);
    }, 2500);
  }


  // ---- Estado de conexión (Reto 2: aprender sin internet)
  var pill = document.createElement('div');
  pill.setAttribute('role', 'status');
  pill.style.cssText = 'position:fixed;top:calc(env(safe-area-inset-top,0px) + 1px);left:50%;transform:translateX(-50%);z-index:9998;' +
    'padding:2px 10px;border-radius:0 0 10px 10px;font:800 10px Nunito,system-ui,sans-serif;color:#fff;display:none;pointer-events:none';
  function updateNet(first) {
    if (navigator.onLine) {
      if (!first) { pill.textContent = '✅ Conexión recuperada'; pill.style.background = '#58CC02'; pill.style.display = 'block'; setTimeout(function () { pill.style.display = 'none'; }, 2500); }
      else pill.style.display = 'none';
    } else {
      pill.textContent = '📴 Sin conexión · tu mochila sigue funcionando';
      pill.style.background = '#FF6B6B'; pill.style.display = 'block';
    }
  }
  document.body.appendChild(pill);
  window.addEventListener('online', function () { updateNet(false); });
  window.addEventListener('offline', function () { updateNet(false); });
  updateNet(true);

  // ---- Leer la pregunta en voz alta (ayuda a 1º y 2º que aún no leen bien). Funciona sin internet.
  if ('speechSynthesis' in window) {
    var speakBtn = document.createElement('button');
    speakBtn.type = 'button';
    speakBtn.setAttribute('aria-label', 'Escuchar la pregunta');
    speakBtn.textContent = '🔊';
    speakBtn.style.cssText = 'position:fixed;right:max(12px, env(safe-area-inset-right,0px));bottom:calc(92px + env(safe-area-inset-bottom,0px));z-index:9997;width:46px;height:46px;' +
      'border-radius:50%;border:3px solid #E5E5E5;background:#fff;font-size:22px;line-height:1;padding:0;box-shadow:0 6px 20px rgba(0,0,0,.18);cursor:pointer;display:none';
    document.body.appendChild(speakBtn);

    var voice = null;
    function pickVoice() {
      var vs = speechSynthesis.getVoices() || [];
      voice = vs.filter(function (v) { return /^es[-_]MX/i.test(v.lang); })[0] ||
              vs.filter(function (v) { return /^es/i.test(v.lang); })[0] || null;
    }
    pickVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = pickVoice;

    function clean(t) {
      return (t || '')
        .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, ' ')
        .replace(/\s*[×x]\s*/g, ' por ').replace(/\s*[−\-]\s*(?=\d)/g, ' menos ').replace(/\+/g, ' más ')
        .replace(/÷|\//g, ' entre ').replace(/%/g, ' por ciento').replace(/\^/g, ' a la ').replace(/=/g, ' igual a ')
        .replace(/\s+/g, ' ').trim();
    }
    speakBtn.addEventListener('click', function () {
      var q = document.querySelector('[data-q]');
      if (!q) return;
      var letters = ['A', 'B', 'C'];
      var opts = Array.prototype.map.call(document.querySelectorAll('[data-opt]'), function (b, i) {
        return 'Opción ' + letters[i] + ': ' + clean(b.textContent.replace(/^[ABC]/, ''));
      });
      var text = clean(q.textContent) + '. ' + opts.join('. ');
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = voice ? voice.lang : 'es-MX';
      if (voice) u.voice = voice;
      u.rate = 0.85;
      speechSynthesis.speak(u);
    });

    // El botón aparece solo cuando hay una pregunta en pantalla
    new MutationObserver(function () {
      speakBtn.style.display = document.querySelector('[data-q]') ? 'block' : 'none';
    }).observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
  }

  // ---- Service Worker + aviso de nueva versión
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        function promptUpdate(worker) {
          bar('✨ Hay una versión nueva de Mochila Mágica', [
            { label: 'Actualizar', cls: 'mm-ok', fn: function () { worker.postMessage('SKIP_WAITING'); } },
            { label: 'Luego', cls: 'mm-no' }
          ]);
        }
        if (reg.waiting && navigator.serviceWorker.controller) promptUpdate(reg.waiting);
        reg.addEventListener('updatefound', function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', function () {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) promptUpdate(nw);
          });
        });
      }).catch(function (err) { console.warn('SW no registrado:', err); });

      var reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (reloaded) return; reloaded = true; location.reload();
      });
    });
  }
})();
