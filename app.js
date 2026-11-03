
(function () {
    'use strict';
  
    /* ---------- Ícones ---------- */
    var ICONS = {
      bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
      shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/>',
      shieldok: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
      eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
      eyeoff: '<path d="M3 3l18 18"/><path d="M10.6 6.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A16.5 16.5 0 0 0 2 12s3.5 7 10 7c1.7 0 3.2-.4 4.5-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      ext: '<path d="M7 17 17 7M8 7h9v9"/>',
      truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
      box: '<path d="M12 3 3 7.5v9L12 21l9-4.5v-9z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
      heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
      userplus: '<circle cx="10" cy="8" r="4"/><path d="M2 21a8 8 0 0 1 14-5M19 14v6M16 17h6"/>',
      building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
      headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
      pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
      bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      chev: '<path d="m6 9 6 6 6-6"/>',
      cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
      gpu: '<rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="9" cy="12" r="2.5"/><circle cx="16" cy="12" r="2.5"/>',
      ram: '<rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 12h2M11 12h2M16 12h2M5 16v3M9 16v3M13 16v3M17 16v3"/>',
      ssd: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 11h4M7 14h2"/><circle cx="17" cy="12" r="1"/>',
      board: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="7" y="7" width="5" height="5"/><path d="M15 7v4M15 15h2M7 16h5"/>',
      card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
      percent: '<path d="m19 5-14 14"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
      logout: '<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      check: '<path d="m5 12 5 5 9-10"/>'
    };
    function icon(name, size) {
      size = size || 18;
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
    }
    function hydrate(root) {
      (root || document).querySelectorAll('i[data-i]').forEach(function (el) {
        el.classList.add('ico');
        el.innerHTML = icon(el.dataset.i, +el.dataset.s || 18);
        el.removeAttribute('data-i');
      });
    }
  
    /* ---------- Ilustrações dos componentes (SVG) ---------- */
    var uid = 0;
    function fan(cx, cy, r) {
      var b = '';
      for (var i = 0; i < 9; i++) {
        b += '<ellipse cx="' + cx + '" cy="' + (cy - r * 0.52) + '" rx="' + r * 0.17 + '" ry="' + r * 0.4 + '" transform="rotate(' + i * 40 + ' ' + cx + ' ' + cy + ')" fill="#1d2335"/>';
      }
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#0c0f18" stroke="#2c3347" stroke-width="2"/>' + b +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * 0.2 + '" fill="#2a3249"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r * 0.08 + '" fill="#6d7aa6"/>';
    }
    var ART = {
      gpu: function (accent) {
        var g = 'g' + (++uid);
        accent = accent || '#4361f5';
        return '<svg viewBox="0 0 240 130" role="img" aria-label="Placa de vídeo"><defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3145"/><stop offset="1" stop-color="#12151f"/></linearGradient></defs>' +
          '<rect x="2" y="16" width="7" height="92" rx="2" fill="#a6aec4"/>' +
          '<rect x="8" y="20" width="224" height="84" rx="10" fill="url(#' + g + ')"/>' +
          '<rect x="8" y="98" width="224" height="6" rx="3" fill="#0b0d14"/>' +
          fan(68, 60, 31) + fan(150, 60, 31) +
          '<rect x="196" y="34" width="28" height="52" rx="5" fill="#161a27"/><rect x="200" y="42" width="20" height="3" rx="1.5" fill="' + accent + '"/><rect x="200" y="50" width="14" height="3" rx="1.5" fill="#39425e"/>' +
          '<rect x="50" y="104" width="100" height="8" rx="1" fill="#c9a24a"/>' +
          '<rect x="214" y="106" width="14" height="10" rx="2" fill="#1d2233"/></svg>';
      },
      cpu: function (label) {
        var g = 'c' + (++uid);
        label = label || 'RYZEN 7';
        return '<svg viewBox="0 0 160 130" role="img" aria-label="Processador"><defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9edf6"/><stop offset=".55" stop-color="#b9c0d1"/><stop offset="1" stop-color="#dfe4ef"/></linearGradient></defs>' +
          '<rect x="30" y="14" width="100" height="100" rx="9" fill="#242934"/><rect x="40" y="24" width="80" height="80" rx="7" fill="url(#' + g + ')"/>' +
          '<rect x="40" y="24" width="80" height="80" rx="7" fill="none" stroke="#fff" stroke-opacity=".5"/>' +
          '<text x="80" y="62" text-anchor="middle" font-family="Inter,Arial" font-size="12" font-weight="700" fill="#3f4658" letter-spacing="1.5">' + label + '</text>' +
          '<text x="80" y="78" text-anchor="middle" font-family="Inter,Arial" font-size="7" fill="#5b6378" letter-spacing="1">7700 · AM5</text>' +
          '<path d="M30 98v16h16z" fill="#c9a24a"/></svg>';
      },
      intel: function () {
        var g = 'i' + (++uid);
        return '<svg viewBox="0 0 160 130" role="img" aria-label="Processador Intel"><defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfd5e0"/><stop offset=".5" stop-color="#9aa3b5"/><stop offset="1" stop-color="#c3c9d6"/></linearGradient></defs>' +
          '<rect x="26" y="12" width="108" height="106" rx="6" fill="#3b4a3a"/><rect x="26" y="12" width="108" height="106" rx="6" fill="none" stroke="#c9a24a" stroke-width="3" stroke-dasharray="2 4"/>' +
          '<rect x="42" y="28" width="76" height="74" rx="4" fill="url(#' + g + ')"/>' +
          '<text x="80" y="60" text-anchor="middle" font-family="Inter,Arial" font-size="11" font-weight="700" fill="#2f3647">intel</text>' +
          '<text x="80" y="76" text-anchor="middle" font-family="Inter,Arial" font-size="8" fill="#3f4658" letter-spacing="1">CORE</text></svg>';
      },
      ram: function (label) {
        var i, c = '';
        for (i = 0; i < 24; i++) c += '<rect x="' + (16 + i * 8.9) + '" y="84" width="6" height="9" fill="#c9a24a"/>';
        label = label || 'FURY';
        return '<svg viewBox="0 0 240 110" role="img" aria-label="Memória RAM"><rect x="8" y="20" width="224" height="66" rx="5" fill="#13151c"/>' +
          '<rect x="8" y="14" width="224" height="30" rx="5" fill="#252a38"/><rect x="8" y="38" width="224" height="3" fill="#4361f5"/>' +
          '<rect x="22" y="48" width="48" height="26" rx="2" fill="#0a0c11"/><rect x="82" y="48" width="48" height="26" rx="2" fill="#0a0c11"/><rect x="142" y="48" width="48" height="26" rx="2" fill="#0a0c11"/>' +
          '<text x="120" y="32" text-anchor="middle" font-family="Inter,Arial" font-size="10" font-weight="700" fill="#aab3cf" letter-spacing="4">' + label + '</text>' + c + '</svg>';
      },
      ssd: function () {
        var i, f = '';
        for (i = 0; i < 8; i++) f += '<rect x="' + (6 + i * 3.6) + '" y="30" width="2.4" height="30" fill="#c9a24a"/>';
        return '<svg viewBox="0 0 240 90" role="img" aria-label="SSD NVMe"><rect x="32" y="20" width="196" height="50" rx="3" fill="#1b2b4d"/>' + f +
          '<rect x="48" y="28" width="38" height="34" rx="2" fill="#0d1424"/><rect x="94" y="28" width="38" height="34" rx="2" fill="#0d1424"/>' +
          '<rect x="142" y="28" width="76" height="34" rx="2" fill="#eef2fb"/><rect x="148" y="35" width="40" height="4" rx="2" fill="#4361f5"/><rect x="148" y="44" width="58" height="3" rx="1.5" fill="#9aa4bf"/><rect x="148" y="51" width="34" height="3" rx="1.5" fill="#9aa4bf"/>' +
          '<circle cx="222" cy="45" r="3" fill="#0d1424"/></svg>';
      },
      board: function (accent) {
        var i, s = '';
        accent = accent || '#4361f5';
        for (i = 0; i < 4; i++) s += '<rect x="' + (140 + i * 11) + '" y="18" width="6" height="62" rx="2" fill="#0a0c12"/><rect x="' + (141 + i * 11) + '" y="20" width="4" height="8" fill="#555e7a"/>';
        return '<svg viewBox="0 0 200 150" role="img" aria-label="Placa-mãe"><rect x="22" y="8" width="156" height="134" rx="6" fill="#171a25"/>' +
          '<rect x="34" y="22" width="58" height="52" rx="4" fill="#d3d9e6"/><rect x="42" y="30" width="42" height="36" rx="3" fill="#aab2c7"/>' +
          '<rect x="34" y="14" width="58" height="6" rx="2" fill="#303750"/><rect x="100" y="22" width="30" height="20" rx="3" fill="#303750"/><rect x="100" y="48" width="30" height="26" rx="3" fill="#262c42"/>' + s +
          '<rect x="34" y="84" width="132" height="8" rx="2" fill="#0a0c12"/><rect x="34" y="100" width="70" height="14" rx="3" fill="#2a3048"/><rect x="34" y="120" width="132" height="8" rx="2" fill="#0a0c12"/>' +
          '<rect x="112" y="100" width="54" height="14" rx="3" fill="' + accent + '" opacity=".9"/><circle cx="46" cy="134" r="2.5" fill="#6d7aa6"/><circle cx="154" cy="134" r="2.5" fill="#6d7aa6"/></svg>';
      },
      desk: function () {
        var i, slats = '', ribs = '';
        for (i = 0; i < 12; i++) slats += '<rect x="' + (i * 18) + '" y="0" width="12" height="170" fill="#161a24"/>';
        for (i = 0; i < 6; i++) ribs += '<rect x="' + (112 + i * 11) + '" y="' + (76 + i * 6) + '" width="86" height="2" rx="1" fill="#6ee7ff" opacity="' + (0.8 - i * 0.1) + '"/>';
        return '<svg viewBox="0 0 560 250" role="img" aria-label="Setup gamer com PC e monitor" preserveAspectRatio="xMidYMid slice"><defs>' +
          '<linearGradient id="dw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a672"/><stop offset="1" stop-color="#b27e4c"/></linearGradient>' +
          '<linearGradient id="dm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c2a5c"/><stop offset="1" stop-color="#0a0f26"/></linearGradient>' +
          '<radialGradient id="dg" cx=".35" cy=".55" r=".6"><stop offset="0" stop-color="#4de1ff" stop-opacity=".35"/><stop offset="1" stop-color="#4de1ff" stop-opacity="0"/></radialGradient></defs>' +
          '<rect width="560" height="250" fill="#e6e9ee"/><g opacity=".95">' + slats + '</g>' +
          '<rect x="300" y="0" width="260" height="170" fill="#dfe3ea"/><path d="M300 28h260M300 56h260M300 84h260M300 112h260M300 140h260" stroke="#c4cad6" stroke-width="2"/>' +
          '<rect x="0" y="0" width="560" height="250" fill="url(#dg)"/>' +
          '<polygon points="0,172 560,150 560,250 0,250" fill="url(#dw)"/><polygon points="0,172 560,150 560,156 0,178" fill="#e8bd8a"/>' +
          '<rect x="96" y="24" width="168" height="158" rx="8" fill="#0b0e17" stroke="#d7dbe6" stroke-width="3"/>' +
          '<rect x="104" y="32" width="152" height="142" rx="4" fill="#0f1422"/>' +
          '<circle cx="150" cy="104" r="20" fill="#080b13" stroke="#4de1ff" stroke-width="3"/><circle cx="150" cy="104" r="6" fill="#4de1ff"/>' +
          '<circle cx="220" cy="62" r="18" fill="#080b13" stroke="#4de1ff" stroke-width="2.5"/><circle cx="220" cy="62" r="5" fill="#4de1ff"/>' +
          '<circle cx="220" cy="146" r="18" fill="#080b13" stroke="#4de1ff" stroke-width="2.5"/><circle cx="220" cy="146" r="5" fill="#4de1ff"/>' + ribs +
          '<rect x="110" y="156" width="64" height="9" rx="2" fill="#eef2f7"/><text x="142" y="163.5" text-anchor="middle" font-family="Inter,Arial" font-size="6" font-weight="700" fill="#1a2030">GEFORCE RTX</text>' +
          '<rect x="102" y="28" width="4" height="150" fill="#6ee7ff" opacity=".9"/>' +
          '<rect x="104" y="182" width="152" height="8" rx="3" fill="#cfd4df"/>' +
          '<rect x="318" y="52" width="140" height="94" rx="6" fill="#0b0f1d" stroke="#0b0f1d" stroke-width="4"/><rect x="322" y="56" width="132" height="86" rx="3" fill="url(#dm)"/>' +
          '<rect x="330" y="66" width="52" height="30" rx="3" fill="#2b4fd6" opacity=".7"/><rect x="390" y="66" width="56" height="8" rx="2" fill="#6e8bff" opacity=".7"/><rect x="390" y="80" width="40" height="6" rx="2" fill="#6e8bff" opacity=".45"/><rect x="330" y="104" width="116" height="30" rx="3" fill="#162250"/><circle cx="392" cy="119" r="9" fill="#4de1ff" opacity=".7"/>' +
          '<path d="M388 146v22" stroke="#222836" stroke-width="7"/><path d="M360 172h64l-6-6h-52z" fill="#1c2130"/>' +
          '<polygon points="300,186 450,180 462,198 306,206" fill="#10141f"/><polygon points="304,188 448,182 452,188 306,194" fill="#6ee7ff" opacity=".35"/>' +
          '<ellipse cx="478" cy="196" rx="16" ry="7" fill="#12151f"/>' +
          '<path d="M516 100v70" stroke="#171b27" stroke-width="5"/><path d="M500 172h32" stroke="#171b27" stroke-width="5" stroke-linecap="round"/><path d="M500 104a16 22 0 0 1 32 0" fill="none" stroke="#171b27" stroke-width="7"/><rect x="494" y="100" width="9" height="22" rx="4" fill="#171b27"/><rect x="529" y="100" width="9" height="22" rx="4" fill="#171b27"/></svg>';
      }
    };
  
    /* ---------- Formatação ---------- */
    function brl(n) {
      return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  
    /* ---------- Máscaras ---------- */
    function digits(v, max) { return v.replace(/\D/g, '').slice(0, max); }
    function fmt(d, sizes, seps) {
      var out = '', i = 0, k;
      for (k = 0; k < sizes.length && i < d.length; k++) {
        if (k > 0) out += seps[k - 1];
        out += d.slice(i, i + sizes[k]);
        i += sizes[k];
      }
      return out;
    }
    var MASKS = {
      cpf: function (v) { return fmt(digits(v, 11), [3, 3, 3, 2], ['.', '.', '-']); },
      cnpj: function (v) { return fmt(digits(v, 14), [2, 3, 3, 4, 2], ['.', '.', '/', '-']); },
      cep: function (v) { return fmt(digits(v, 8), [5, 3], ['-']); },
      date: function (v) { return fmt(digits(v, 8), [2, 2, 4], ['/', '/']); },
      ie: function (v) { return fmt(digits(v, 12), [3, 3, 3, 3], ['.', '.', '.']); },
      phone: function (v) {
        var d = digits(v, 11);
        if (!d.length) return '';
        if (d.length <= 2) return '(' + d;
        if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + (d.length > 6 ? '-' + d.slice(6) : '');
        return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
      }
    };
    function applyMasks(root) {
      (root || document).querySelectorAll('input[data-mask]').forEach(function (inp) {
        var fn = MASKS[inp.dataset.mask];
        if (!fn) return;
        inp.addEventListener('input', function () { inp.value = fn(inp.value); });
      });
    }
  
    /* ---------- CEP (ViaCEP) ---------- */
    function setupCep(form) {
      var cep = form.querySelector('[data-mask="cep"]');
      if (!cep) return;
      cep.addEventListener('input', function () {
        var d = cep.value.replace(/\D/g, '');
        if (d.length !== 8) return;
        fetch('https://viacep.com.br/ws/' + d + '/json/')
          .then(function (r) { return r.json(); })
          .then(function (a) {
            if (a.erro) return;
            [['rua', a.logradouro], ['bairro', a.bairro], ['cidade', a.localidade], ['uf', a.uf]].forEach(function (p) {
              var el = form.querySelector('[name="' + p[0] + '"]');
              if (el && p[1]) el.value = p[1];
            });
            var num = form.querySelector('[name="numero"]');
            if (num) num.focus();
          })
          .catch(function () { /* sem rede: o usuário preenche manualmente */ });
      });
    }
  
    /* ---------- Mostrar/ocultar senha ---------- */
    function setupToggles(root) {
      (root || document).querySelectorAll('.toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var inp = btn.parentElement.querySelector('input');
          var show = inp.type === 'password';
          inp.type = show ? 'text' : 'password';
          btn.innerHTML = icon(show ? 'eye' : 'eyeoff', 16);
          btn.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
        });
      });
    }
  
    /* ---------- Toast ---------- */
    var toastTimer;
    function toast(msg) {
      var t = document.getElementById('toast');
      if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.className = 'toast';
        t.setAttribute('role', 'status');
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2800);
    }
  
    /* ---------- Validação ---------- */
    function setError(field, msg) {
      var box = field.closest('.field') || field.closest('.chk') || field.parentElement;
      var wrap = field.closest('.input') || field.closest('.chk');
      var old = box.querySelector('.err');
      if (old) old.remove();
      if (wrap) wrap.classList.toggle('invalid', !!msg);
      if (msg) {
        var e = document.createElement('div');
        e.className = 'err';
        e.textContent = msg;
        box.appendChild(e);
      }
    }
    function validateField(f, form) {
      var v = f.type === 'checkbox' ? f.checked : f.value.trim();
      if (f.required && !v) return f.type === 'checkbox' ? 'Aceite para continuar.' : 'Preencha este campo.';
      if (!v) return '';
      if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Digite um e-mail válido.';
      if (f.dataset.len && f.value.replace(/\D/g, '').length !== +f.dataset.len) return 'Confira o número digitado.';
      if (f.dataset.password && !(v.length >= 8 && /[a-zA-Z]/.test(v) && /\d/.test(v))) return 'Use 8 ou mais caracteres, com letras e números.';
      if (f.dataset.match) {
        var other = form.querySelector('[name="' + f.dataset.match + '"]');
        if (other && other.value.trim() !== v) return 'Os campos não conferem.';
      }
      return '';
    }
    function setupForm(form) {
      var fields = Array.prototype.slice.call(form.querySelectorAll('input[required],select[required],input[data-len],input[data-password]'));
      fields.forEach(function (f) {
        f.addEventListener('blur', function () { if (f.type !== 'checkbox') setError(f, validateField(f, form)); });
        f.addEventListener('input', function () {
          var w = f.closest('.input');
          if (w && w.classList.contains('invalid')) setError(f, validateField(f, form));
        });
        f.addEventListener('change', function () { if (f.type === 'checkbox') setError(f, validateField(f, form)); });
      });
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var first = null;
        fields.forEach(function (f) {
          var msg = validateField(f, form);
          setError(f, msg);
          if (msg && !first) first = f;
        });
        if (first) { first.focus(); return; }
        toast(form.dataset.success || 'Tudo certo!');
        if (form.dataset.redirect) {
          setTimeout(function () { location.href = form.dataset.redirect; }, 1100);
        }
      });
    }
  
    /* ---------- Carrinho  ---------- */
    function cartGet() {
      try { return +localStorage.getItem('eh-cart') || 0; } catch (e) { return 0; }
    }
    function cartSet(n) {
      try { localStorage.setItem('eh-cart', String(n)); } catch (e) { /* sem storage */ }
      document.querySelectorAll('[data-cart]').forEach(function (el) { el.textContent = n; });
    }
    function cartInit() { cartSet(cartGet()); }
  
    /* ---------- Início ---------- */
    document.addEventListener('DOMContentLoaded', function () {
      hydrate();
      applyMasks();
      setupToggles();
      document.querySelectorAll('form[data-validate]').forEach(function (f) { setupForm(f); setupCep(f); });
      document.querySelectorAll('[data-art]').forEach(function (el) {
        var fn = ART[el.dataset.art];
        if (fn) el.innerHTML = fn();
      });
      cartInit();
    });
  
    window.EH = { icon: icon, hydrate: hydrate, ART: ART, brl: brl, toast: toast, cartGet: cartGet, cartSet: cartSet };
  })();
  