/* =============================================================
   小卡片 · 逻辑
   一般不需要改这个文件；改文字和主题请去 config.js
   ============================================================= */

(function () {
  'use strict';

  /* ---------- 0. 基础 ---------- */

  // 想临时预览别的节日，可以在网址后面加 ?theme=christmas 或 ?theme=valentine
  var QS = new URLSearchParams(window.location.search);
  var THEME_ID = QS.get('theme') || SITE.theme;
  var T = THEMES[THEME_ID] || THEMES[SITE.theme] || THEMES.halloween;
  var COPY = T.copy;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (id) { return document.getElementById(id); };
  var card = $('card');
  var fx = $('fx');

  // 把 {name} {n} 这类占位符换成真内容
  function fmt(str, vars) {
    return String(str == null ? '' : str).replace(/\{(\w+)\}/g, function (m, k) {
      return (vars && vars[k] != null) ? vars[k] : '';
    });
  }
  function tpl(str) { return fmt(str, { name: SITE.herName }); }

  /* ---------- 1. 主题色 ---------- */

  Object.keys(T.palette).forEach(function (k) {
    document.documentElement.style.setProperty('--' + k, T.palette[k]);
  });

  /* ---------- 2. 点亮的物件（三种主题各一个） ---------- */

  var GLYPHS = {
    // 南瓜灯
    pumpkin:
      '<svg viewBox="0 0 120 132" role="img" aria-hidden="true">' +
        '<ellipse cx="60" cy="121" rx="40" ry="6" fill="#0B0614" opacity=".3"/>' +
        '<path d="M58 48c-5-14 0-21 10-23 3 9-2 17-6 23z" fill="#6E8F3E"/>' +
        '<path d="M68 32c6-3 12-1 14 4-5 2-11 2-14-4z" fill="#8CB05A"/>' +
        '<ellipse cx="36" cy="86" rx="25" ry="34" fill="var(--accent)"/>' +
        '<ellipse cx="84" cy="86" rx="25" ry="34" fill="var(--accent)"/>' +
        '<ellipse cx="60" cy="84" rx="27" ry="39" fill="var(--accent)"/>' +
        '<ellipse cx="27" cy="88" rx="14" ry="27" fill="var(--accent-deep)" opacity=".17"/>' +
        '<ellipse cx="93" cy="88" rx="14" ry="27" fill="var(--accent-deep)" opacity=".17"/>' +
        '<ellipse cx="50" cy="64" rx="18" ry="15" fill="#FFFFFF" opacity=".18"/>' +
        '<path d="M47 49c-6 12-6 58 0 70" stroke="var(--accent-deep)" stroke-width="6" opacity=".09" fill="none" stroke-linecap="round"/>' +
        '<path d="M73 49c6 12 6 58 0 70" stroke="var(--accent-deep)" stroke-width="6" opacity=".09" fill="none" stroke-linecap="round"/>' +
        '<g class="face">' +
          '<path d="M38 80c3-10 12-10 15 0" stroke="var(--glow)" stroke-width="7" stroke-linecap="round" fill="none"/>' +
          '<path d="M67 80c3-10 12-10 15 0" stroke="var(--glow)" stroke-width="7" stroke-linecap="round" fill="none"/>' +
          '<path d="M44 96c5 10 27 10 32 0" stroke="var(--glow)" stroke-width="7" stroke-linecap="round" fill="none"/>' +
        '</g>' +
      '</svg>',

    // 小蜡烛
    candle:
      '<svg viewBox="0 0 120 132" role="img" aria-hidden="true">' +
        '<ellipse cx="60" cy="119" rx="33" ry="7" fill="var(--accent-deep)" opacity=".45"/>' +
        '<rect x="40" y="54" width="40" height="60" rx="7" fill="var(--paper-2)"/>' +
        '<ellipse cx="60" cy="56" rx="20" ry="7" fill="var(--paper)"/>' +
        '<rect x="40" y="56" width="7" height="18" rx="3.5" fill="var(--paper)"/>' +
        '<rect x="73" y="56" width="7" height="23" rx="3.5" fill="var(--paper)"/>' +
        '<rect x="58" y="41" width="4" height="14" rx="2" fill="#3A2B1E" opacity=".6"/>' +
        '<g class="face">' +
          '<path d="M60 6c11 15 17 23 17 32a17 17 0 1 1-34 0c0-9 6-17 17-32z" fill="var(--glow)"/>' +
          '<path d="M60 26c5 8 8 12 8 17a8 8 0 1 1-16 0c0-5 3-9 8-17z" fill="#FFFDF4" opacity=".9"/>' +
        '</g>' +
      '</svg>',

    // 心灯
    heart:
      '<svg viewBox="0 0 120 132" role="img" aria-hidden="true">' +
        '<path d="M60 116C32 96 16 76 16 55c0-17 12-28 25-28 8 0 15 4 19 11 4-7 11-11 19-11 13 0 25 11 25 28 0 21-16 41-44 61z" fill="var(--accent)"/>' +
        '<g class="face">' +
          '<path d="M60 104C38 88 27 72 27 57c0-11 8-18 16-18 7 0 13 4 17 11 4-7 10-11 17-11 8 0 16 7 16 18 0 15-11 31-33 47z" fill="var(--glow)"/>' +
        '</g>' +
      '</svg>'
  };

  var CANDY = {
    halloween: ['🍬', '🍭', '🍫', '🧁'],
    christmas: ['🎁', '❄️', '🍬', '⭐'],
    valentine: ['🌸', '💗', '🍫', '💝']
  };

  /* ---------- 3. 声音（全部用代码合成，没有音频文件） ---------- */

  var Sound = {
    ctx: null,
    on: SITE.sound !== false,
    ensure: function () {
      if (!this.on) return null;
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try { this.ctx = new AC(); } catch (e) { return null; }
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },
    tone: function (freq, dur, type, gain, delay, to) {
      // 声音永远不能挡住剧情：任何异常都吞掉
      try {
        var ctx = this.ensure(); if (!ctx) return;
        var t0 = ctx.currentTime + (delay || 0);
        var osc = ctx.createOscillator();
        var g = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, t0);
        if (to) osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.linearRampToValueAtTime(gain == null ? 0.05 : gain, t0 + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(t0); osc.stop(t0 + dur + 0.06);
      } catch (e) { /* 静音就好 */ }
    },
    noise: function (dur, gain, lp) {
      try {
        var ctx = this.ensure(); if (!ctx) return;
        var t0 = ctx.currentTime;
        var len = Math.max(1, Math.floor(ctx.sampleRate * dur));
        var buf = ctx.createBuffer(1, len, ctx.sampleRate);
        var d = buf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
        var src = ctx.createBufferSource(); src.buffer = buf;
        var f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp || 1400;
        var g = ctx.createGain(); g.gain.value = gain || 0.06;
        src.connect(f); f.connect(g); g.connect(ctx.destination);
        src.start(t0);
      } catch (e) { /* 静音就好 */ }
    },
    plink: function (i) {
      var base = 660 * Math.pow(1.055, i || 0);
      this.tone(base, 0.34, 'sine', 0.05, 0, base * 1.5);
      this.tone(base * 2, 0.18, 'triangle', 0.016, 0.01);
    },
    knock: function () {
      this.noise(0.14, 0.13, 900);
      this.tone(120, 0.2, 'sine', 0.075, 0, 72);
    },
    open: function () {
      [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
        Sound.tone(f, 0.7, 'sine', 0.032, i * 0.085);
      });
    },
    paper: function () { this.noise(0.42, 0.045, 3400); },
    win: function () {
      [783.99, 987.77, 1174.66].forEach(function (f, i) {
        Sound.tone(f, 0.5, 'triangle', 0.026, i * 0.07);
      });
    }
  };

  /* ---------- 4. 飘动的光点 ---------- */

  var Sparks = {
    cvs: null, ctx: null, dpr: 1, w: 0, h: 0,
    items: [], raf: 0, running: false, type: 'embers', sprite: null,

    init: function (canvas, type) {
      this.cvs = canvas;
      this.ctx = canvas.getContext('2d');
      this.type = type;
      this.makeSprite();
      this.resize();
      var self = this;
      window.addEventListener('resize', function () { self.resize(); });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) self.stop(); else self.start();
      });
      this.seed();
      if (REDUCED) { this.draw(); } else { this.start(); }
    },

    // 预渲染一颗光点：每帧只用 drawImage，绝不在循环里 createRadialGradient
    makeSprite: function () {
      var s = document.createElement('canvas');
      var size = 64;
      s.width = s.height = size;
      var g = s.getContext('2d');
      var rgb = this.type === 'snow' ? '255,255,255' : '255,199,125';
      var grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grd.addColorStop(0, 'rgba(' + rgb + ',1)');
      grd.addColorStop(0.32, 'rgba(' + rgb + ',0.55)');
      grd.addColorStop(1, 'rgba(' + rgb + ',0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, size, size);
      this.sprite = s;
    },

    resize: function () {
      if (!this.ctx) return;
      var r = this.cvs.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = r.width; this.h = r.height;
      this.cvs.width = Math.round(r.width * this.dpr);
      this.cvs.height = Math.round(r.height * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    },

    seed: function () {
      var n = window.innerWidth < 420 ? 26 : 38;
      this.items = [];
      for (var i = 0; i < n; i++) this.items.push(this.make(true));
    },

    make: function (anywhere) {
      var up = this.type !== 'snow';
      return {
        x: Math.random() * this.w,
        y: anywhere ? Math.random() * this.h : (up ? this.h + 12 : -12),
        r: 0.8 + Math.random() * 2.0,
        vx: (Math.random() - 0.5) * 0.22,
        vy: up ? -(0.12 + Math.random() * 0.42) : (0.16 + Math.random() * 0.4),
        ph: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 1.4,
        a: 0.3 + Math.random() * 0.6
      };
    },

    color: function (a) {
      if (this.type === 'snow') return 'rgba(255,255,255,' + a + ')';
      if (this.type === 'hearts') return 'rgba(255,194,209,' + a + ')';
      return 'rgba(255,199,125,' + a + ')'; // embers
    },

    step: function () {
      var g = this.ctx;
      g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      g.clearRect(0, 0, this.w, this.h);
      var up = this.type !== 'snow';
      var isHeart = this.type === 'hearts';

      g.globalCompositeOperation = 'lighter';

      for (var i = 0; i < this.items.length; i++) {
        var p = this.items[i];
        p.ph += 0.012 * p.sp;
        p.x += p.vx + Math.sin(p.ph) * 0.28;
        p.y += p.vy;

        if (up && p.y < -16) { this.items[i] = this.make(false); continue; }
        if (!up && p.y > this.h + 16) { this.items[i] = this.make(false); continue; }

        var flick = 0.65 + Math.sin(p.ph * 2.4) * 0.35;
        g.globalAlpha = Math.max(0, Math.min(1, p.a * flick));

        if (isHeart) {
          g.fillStyle = 'rgba(255,194,209,1)';
          this.heart(g, p.x, p.y, p.r * 2.1);
        } else {
          var d = p.r * 6.4;
          g.drawImage(this.sprite, p.x - d / 2, p.y - d / 2, d, d);
        }
      }

      g.globalAlpha = 1;
      g.globalCompositeOperation = 'source-over';
    },

    heart: function (g, x, y, s) {
      g.beginPath();
      g.moveTo(x, y + s * 0.32);
      g.bezierCurveTo(x - s * 1.1, y - s * 0.34, x - s * 0.55, y - s * 1.05, x, y - s * 0.44);
      g.bezierCurveTo(x + s * 0.55, y - s * 1.05, x + s * 1.1, y - s * 0.34, x, y + s * 0.32);
      g.closePath();
      g.fill();
    },

    draw: function () { if (this.ctx) this.step(); },

    loop: function (ts) {
      this.step(ts);
      this.raf = requestAnimationFrame(this.loop.bind(this));
    },

    start: function () {
      if (this.running || REDUCED) return;
      this.running = true;
      this.raf = requestAnimationFrame(this.loop.bind(this));
    },

    stop: function () {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  };

  /* ---------- 5. 场景切换 ---------- */

  var current = 'cover';

  function sceneEl(name) { return document.querySelector('.scene[data-scene="' + name + '"]'); }

  function go(name) {
    if (name === current) return;
    var from = sceneEl(current);
    var to = sceneEl(name);
    if (!to) return;

    if (from) {
      from.classList.remove('is-active');
      from.classList.add('is-leaving');
      from.setAttribute('aria-hidden', 'true');
      setTimeout(function () { from.classList.remove('is-leaving'); }, 760);
    }
    to.classList.add('is-active');
    to.removeAttribute('aria-hidden');
    to.scrollTop = 0;
    card.scrollTop = 0;
    current = name;

    card.classList.toggle('on-paper', name === 'letter');
    var sparks = $('sparks');
    sparks.style.opacity = (name === 'letter') ? '0' : '1';
    sparks.style.display = (name === 'letter') ? 'none' : '';
  }

  /* ---------- 6. 幕 1 · 封面 ---------- */

  var heroLantern = document.querySelector('.lantern--hero');
  var lit = 0;

  function startJourney() {
    Sound.ensure();
    Sound.plink(0);
    heroLantern.classList.add('is-lit', 'is-popping');
    setTimeout(function () { heroLantern.classList.remove('is-popping'); }, 620);
    setTimeout(function () { go('lanterns'); }, 520);
  }

  /* ---------- 7. 幕 2 · 五盏灯 ---------- */

  var lanternLine = $('lanternLine');
  var lanternCounter = $('lanternCounter');
  var lanternRow = $('lanternRow');

  function buildLanterns() {
    lanternRow.innerHTML = '';
    COPY.lanternLines.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lantern';
      b.dataset.index = i;
      b.setAttribute('aria-label', '第 ' + (i + 1) + ' 盏灯');
      b.innerHTML = GLYPHS[T.glyph];
      b.addEventListener('click', function () { lightLantern(i, b); });
      lanternRow.appendChild(b);
    });
  }

  function lightLantern(i, btn) {
    if (btn.classList.contains('is-lit')) return;
    btn.classList.add('is-lit', 'is-popping');
    setTimeout(function () { btn.classList.remove('is-popping'); }, 600);

    lanternLine.textContent = COPY.lanternLines[i];
    Sound.plink(i);

    lit += 1;
    lanternCounter.textContent = fmt(COPY.lanternHintFmt, { n: lit });

    if (lit >= COPY.lanternLines.length) {
      setTimeout(function () {
        Sound.open();
        setTimeout(function () { go('door'); }, 780);
      }, 620);
    }
  }

  /* ---------- 8. 幕 3 · 敲门 ---------- */

  var houseBtn = $('houseBtn');
  var doorLine = $('doorLine');
  var doorHint = $('doorHint');
  var knocks = 0;
  var doorDone = false;

  function knockDoor() {
    if (doorDone) return;
    Sound.ensure();

    knocks += 1;
    houseBtn.classList.add('is-knocking');
    setTimeout(function () { houseBtn.classList.remove('is-knocking'); }, 330);
    Sound.knock();

    if (knocks < 3) {
      doorHint.textContent = COPY.doorKnocks[knocks - 1] || '';
      return;
    }

    doorDone = true;
    doorHint.textContent = COPY.doorKnocks[2] || '';
    setTimeout(function () {
      houseBtn.classList.add('is-open');
      Sound.open();
      doorLine.textContent = COPY.doorOpenLine;
      doorHint.style.opacity = '0';
      setTimeout(function () { go('choice'); }, 1900);
    }, 400);
  }

  /* ---------- 9. 幕 4 · 给糖 / 捣蛋 ---------- */

  var treatBtn = $('treatBtn');
  var trickBtn = $('trickBtn');
  var choiceLine = $('choiceLine');
  var chosen = false;

  function rain(emoji, count) {
    var set = CANDY[THEME_ID] || CANDY.halloween;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('i');
      s.textContent = emoji || set[i % set.length];
      s.style.left = (6 + Math.random() * 88) + '%';
      s.style.top = (-8 - Math.random() * 10) + '%';
      s.style.fontSize = (16 + Math.random() * 14) + 'px';
      s.style.animationDelay = (Math.random() * 0.5) + 's';
      s.style.setProperty('--spin', (Math.random() * 360 - 180) + 'deg');
      fx.appendChild(s);
      (function (node) {
        setTimeout(function () { node.remove(); }, 3400);
      })(s);
    }
  }

  function ghosts() {
    for (var i = 0; i < 5; i++) {
      var s = document.createElement('i');
      s.textContent = '👻';
      s.style.left = (10 + Math.random() * 80) + '%';
      s.style.top = (30 + Math.random() * 30) + '%';
      s.style.fontSize = (24 + Math.random() * 16) + 'px';
      s.style.animation = 'floatUp 1.8s ease-out forwards';
      fx.appendChild(s);
      (function (node) {
        setTimeout(function () { node.remove(); }, 2600);
      })(s);
    }
  }

  function pick(kind) {
    if (chosen) return;
    chosen = true;
    Sound.ensure();

    var picked = (kind === 'treat') ? treatBtn : trickBtn;
    var other = (kind === 'treat') ? trickBtn : treatBtn;

    picked.classList.add('is-picked');
    other.classList.add('is-dim');

    if (kind === 'treat') {
      choiceLine.textContent = COPY.treatLine;
      Sound.win();
      rain(null, 11);
    } else {
      choiceLine.textContent = COPY.trickLine;
      Sound.noise(0.5, 0.09, 2000);
      card.classList.add('is-shaking');
      setTimeout(function () { card.classList.remove('is-shaking'); }, 470);
      ghosts();
    }

    setTimeout(function () { go('letter'); }, 2100);
  }

  /* ---------- 10. 幕 5 · 信 ---------- */

  var envelopeBtn = $('envelopeBtn');
  var letter = $('letter');
  var letterBody = $('letterBody');
  var letterSign = $('letterSign');
  var letterHint = $('letterHint');
  var replayBtn = $('replayBtn');

  var letterOpened = false;
  var skipFlag = false;
  var activeTyping = null;

  function daysTogether() {
    if (!SITE.startDate) return 0;
    var s = new Date(SITE.startDate + 'T00:00:00');
    if (isNaN(s.getTime())) return 0;
    var n = new Date();
    var a = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
    var b = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
    return Math.floor((b - a) / 86400000) + 1;
  }

  function typeInto(el, text, speed) {
    return new Promise(function (resolve) {
      if (REDUCED || skipFlag) { el.textContent = text; resolve(); return; }
      var i = 0, done = false;
      el.textContent = '';
      var timer = setInterval(function () {
        if (done) return;
        if (skipFlag) return finish();
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) finish();
      }, speed || 36);

      function finish() {
        if (done) return;
        done = true;
        clearInterval(timer);
        activeTyping = null;
        el.textContent = text;
        resolve();
      }
      activeTyping = finish;
    });
  }

  function wait(ms) {
    return new Promise(function (r) { setTimeout(r, skipFlag ? 0 : ms); });
  }

  async function playLetter() {
    var paras = COPY.letter.slice();
    var d = daysTogether();
    if (d > 0 && COPY.daysFmt) paras.push(fmt(COPY.daysFmt, { n: d }));

    // 先把整封信排出来、量好每段高度并锁住，
    // 这样一段段打出来的时候，卡片不会一截一截地跳。
    var nodes = paras.map(function (text) {
      var p = document.createElement('p');
      p.textContent = text;
      p.style.opacity = '0';
      letterBody.appendChild(p);
      return p;
    });

    // 等一帧是为了让上面刚插入的段落先排好版；加超时兜底，
    // 万一标签页在后台（rAF 被暂停），信也不会卡住不出来。
    await new Promise(function (r) {
      var done = false;
      var once = function () { if (done) return; done = true; r(); };
      requestAnimationFrame(function () { requestAnimationFrame(once); });
      setTimeout(once, 160);
    });
    nodes.forEach(function (p) { p.style.minHeight = p.offsetHeight + 'px'; });

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.opacity = '';
      await typeInto(nodes[i], paras[i], 32);
      await wait(140);
    }

    letterSign.hidden = false;
    $('signText').textContent = (SITE.signature || '') + (SITE.fromName ? ' ' + SITE.fromName : '');
    replayBtn.hidden = false;
    Sound.win();
  }

  function openLetter() {
    if (letterOpened) return;
    letterOpened = true;
    Sound.ensure();
    Sound.paper();

    envelopeBtn.classList.add('is-open');
    letterHint.style.opacity = '0';

    setTimeout(function () {
      envelopeBtn.style.display = 'none';
      envelopeBtn.classList.add('is-gone');
      letter.hidden = false;
      playLetter();
    }, 640);
  }

  function skipTyping() {
    if (!letterOpened) return;
    skipFlag = true;
    if (activeTyping) activeTyping();
  }

  function replay() {
    skipFlag = false;
    activeTyping = null;
    lit = 0; knocks = 0; doorDone = false; chosen = false; letterOpened = false;

    heroLantern.classList.remove('is-lit');
    lanternRow.querySelectorAll('.lantern').forEach(function (b) { b.classList.remove('is-lit'); });
    lanternLine.textContent = COPY.lanternIntro || '';
    lanternCounter.textContent = fmt(COPY.lanternHintFmt, { n: 0 });

    houseBtn.classList.remove('is-open');
    doorLine.textContent = COPY.doorLine;
    doorHint.textContent = COPY.doorHint;
    doorHint.style.opacity = '';

    treatBtn.classList.remove('is-picked', 'is-dim');
    trickBtn.classList.remove('is-picked', 'is-dim');
    choiceLine.textContent = '　';

    letter.hidden = true;
    letterBody.innerHTML = '';
    letterSign.hidden = true;
    $('signText').textContent = '';
    replayBtn.hidden = true;
    envelopeBtn.classList.remove('is-open', 'is-gone');
    envelopeBtn.style.display = '';
    letterHint.style.opacity = '';
    fx.innerHTML = '';
    $('sparks').style.display = '';

    go('cover');
  }

  /* ---------- 11. 声音开关 ---------- */

  var soundBtn = $('soundBtn');

  function syncSoundBtn() {
    soundBtn.textContent = Sound.on ? '🔊' : '🔇';
    soundBtn.classList.toggle('is-off', !Sound.on);
    soundBtn.setAttribute('aria-label', Sound.on ? '关闭声音' : '打开声音');
  }

  soundBtn.addEventListener('click', function () {
    Sound.on = !Sound.on;
    if (Sound.on) { Sound.ensure(); Sound.plink(2); }
    syncSoundBtn();
  });

  /* ---------- 12. 填字 ---------- */

  function paint() {
    document.title = COPY.coverTitle;
    document.documentElement.setAttribute('data-theme', THEME_ID);

    $('coverKicker').textContent = COPY.coverKicker;
    $('coverTitle').textContent = COPY.coverTitle;
    $('coverSub').textContent = tpl(COPY.coverSub);
    $('startLabel').textContent = COPY.start;

    lanternCounter.textContent = fmt(COPY.lanternHintFmt, { n: 0 });
    lanternLine.textContent = COPY.lanternIntro || '';

    doorLine.textContent = COPY.doorLine;
    doorHint.textContent = COPY.doorHint;

    $('choiceTitle').textContent = COPY.choiceTitle;
    $('choiceSub').textContent = COPY.choiceSub;
    treatBtn.textContent = COPY.treat;
    trickBtn.textContent = COPY.trick;

    letterHint.textContent = COPY.letterHint;
    $('letterTo').textContent = tpl('{name}：');
    $('byeText').textContent = tpl(COPY.bye);
    replayBtn.textContent = COPY.replay;

    document.querySelectorAll('[data-glyph]').forEach(function (el) {
      el.innerHTML = GLYPHS[T.glyph];
    });
  }

  /* ---------- 13. 启动 ---------- */

  function init() {
    paint();
    buildLanterns();
    syncSoundBtn();

    Sparks.init($('sparks'), T.particles || 'embers');

    $('startBtn').addEventListener('click', startJourney);
    houseBtn.addEventListener('click', knockDoor);
    treatBtn.addEventListener('click', function () { pick('treat'); });
    trickBtn.addEventListener('click', function () { pick('trick'); });
    envelopeBtn.addEventListener('click', openLetter);
    replayBtn.addEventListener('click', replay);
    letter.addEventListener('click', skipTyping);

    // 让第一下点击能激活音频（iOS / 微信内置浏览器都要求手势）
    document.addEventListener('touchstart', function once() {
      Sound.ensure();
      document.removeEventListener('touchstart', once);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
