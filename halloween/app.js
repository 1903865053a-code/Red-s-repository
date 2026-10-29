/* =============================================================
   小卡片 · 逻辑
   一般不需要改这个文件；改文字和照片请去 config.js
   ============================================================= */

(function () {
  'use strict';

  /* ---------- 0. 基础 ---------- */

  var QS = new URLSearchParams(window.location.search);
  var THEME_ID = QS.get('theme') || SITE.theme;
  var T = THEMES[THEME_ID] || THEMES[SITE.theme] || THEMES.halloween;
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (id) { return document.getElementById(id); };

  function fmt(str, vars) {
    return String(str == null ? '' : str).replace(/\{(\w+)\}/g, function (m, k) {
      return (vars && vars[k] != null) ? vars[k] : '';
    });
  }
  function tpl(str) { return fmt(str, { name: SITE.herName }); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  Object.keys(T.palette).forEach(function (k) {
    document.documentElement.style.setProperty('--' + k, T.palette[k]);
  });
  document.documentElement.setAttribute('data-theme', THEME_ID);

  /* ---------- 1. 声音（代码合成，没有音频文件） ---------- */

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
      } catch (e) { /* 静音就好，绝不能挡住剧情 */ }
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
      } catch (e) { /* 同上 */ }
    },
    plink: function (i) {
      var base = 620 * Math.pow(1.06, i || 0);
      this.tone(base, 0.3, 'sine', 0.045, 0, base * 1.5);
      this.tone(base * 2, 0.16, 'triangle', 0.014, 0.01);
    },
    knock: function () {
      this.noise(0.14, 0.12, 900);
      this.tone(120, 0.2, 'sine', 0.07, 0, 72);
    },
    open: function () {
      [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) {
        Sound.tone(f, 0.7, 'sine', 0.03, i * 0.085);
      });
    },
    paper: function () { this.noise(0.42, 0.04, 3400); },
    win: function () {
      [783.99, 987.77, 1174.66].forEach(function (f, i) {
        Sound.tone(f, 0.5, 'triangle', 0.024, i * 0.07);
      });
    }
  };

  /* ---------- 2. 飘动的光点 ---------- */

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
      if (REDUCED) { this.draw(); } else { this.start(); }
    },

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
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.cvs.width = Math.round(this.w * this.dpr);
      this.cvs.height = Math.round(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      var n = this.w < 420 ? 26 : 38;
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
        vy: up ? -(0.10 + Math.random() * 0.34) : (0.16 + Math.random() * 0.4),
        ph: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 1.4,
        a: 0.28 + Math.random() * 0.55
      };
    },

    step: function () {
      var g = this.ctx;
      if (!g) return;
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

    draw: function () { this.step(); },

    loop: function () {
      this.step();
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

  /* ---------- 3. 生成内容 ---------- */

  var photos = [];       // 所有照片元素，用于"洗出来"

  function buildCover() {
    var c = STORY.cover;
    document.title = c.title;
    $('coverKicker').textContent = c.kicker;
    $('coverTitle').textContent = c.title;
    $('coverSub').textContent = tpl(c.sub);
    $('startBtn').textContent = c.cta;
  }

  function buildYears() {
    var story = $('story');
    STORY.years.forEach(function (y, yi) {
      var sec = el('section', 'year');
      sec.id = 'y' + y.year;
      sec.dataset.year = y.year;

      var head = el('div', 'year-head');
      head.appendChild(el('span', 'year-num', y.year));
      head.appendChild(el('p', 'year-line', y.line));
      sec.appendChild(head);

      var list = el('div', 'moments');

      y.moments.forEach(function (m, mi) {
        var art = el('article', 'moment');
        var pics = m.photos || [];

        if (pics.length) {
          var strip = el('div', 'photos' + (pics.length === 1 ? ' is-single' : ''));

          pics.forEach(function (p, pi) {
            var fig = el('figure', 'photo');
            var tilt = ((mi + pi) % 2 === 0 ? -1 : 1) * (0.9 + ((mi + pi) % 3) * 0.45);
            fig.style.setProperty('--tilt', tilt.toFixed(2) + 'deg');

            var img = document.createElement('img');
            img.src = p.src;
            img.alt = p.alt || '';
            img.loading = 'lazy';
            img.decoding = 'async';
            fig.appendChild(img);

            fig.addEventListener('click', function () { openLightbox(p); });
            photos.push(fig);
            strip.appendChild(fig);
          });

          art.appendChild(strip);
        } else {
          art.classList.add('moment--notext');
        }

        var textRow = el('div', 'moment-text');
        textRow.appendChild(el('span', 'moment-date', m.date));
        textRow.appendChild(el('p', 'moment-line', m.text));
        art.appendChild(textRow);

        if (m.note) art.appendChild(el('p', 'moment-note', m.note));

        list.appendChild(art);
      });

      sec.appendChild(list);
      story.appendChild(sec);
    });
  }

  function buildRail() {
    if (STORY.years.length < 2) return;
    var rail = $('yearRail');
    rail.hidden = false;
    STORY.years.forEach(function (y) {
      var a = el('a', null, y.year);
      a.href = '#y' + y.year;
      a.dataset.year = y.year;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = $('y' + y.year);
        if (target) target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      });
      rail.appendChild(a);
    });
  }

  /* ---------- 4. 滚动时发生的事 ---------- */

  var yearChip = $('yearChip');
  var railLinks = [];

  // 不用 IntersectionObserver：后台标签页里它可能被节流、回调不来，
  // 那样照片就永远不显影。直接按滚动位置算，稳。
  var watch = { moments: [], photos: [], years: [], sections: [] };

  function setupWatch() {
    watch.moments = Array.prototype.slice.call(document.querySelectorAll('.moment'));
    watch.photos = photos.slice();
    watch.sections = Array.prototype.slice.call(document.querySelectorAll('.year'));
    watch.years = watch.sections.map(function (s) { return s.querySelector('.year-head'); });
    checkVisible();
    setTimeout(checkVisible, 400);
    setTimeout(checkVisible, 1500);
  }

  function checkVisible() {
    var vh = window.innerHeight || 800;

    watch.moments = watch.moments.filter(function (m) {
      var r = m.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > -60) { m.classList.add('is-in'); return false; }
      return true;
    });

    watch.photos = watch.photos.filter(function (p) {
      var r = p.getBoundingClientRect();
      if (r.top < vh * 0.96 && r.bottom > -60) { p.classList.add('is-developed'); return false; }
      return true;
    });

    watch.years.forEach(function (y, i) {
      if (y.getBoundingClientRect().top < vh * 0.9) {
        watch.sections[i].classList.add('is-lit');
      }
    });
  }

  function updateChip() {
    if (!watch.sections.length) return;
    var mid = window.innerHeight * 0.5;
    var cur = null;
    watch.sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) cur = s.dataset.year;
    });
    if (cur) {
      yearChip.textContent = cur;
      yearChip.classList.add('is-on');
    } else {
      yearChip.classList.remove('is-on');
    }
    railLinks.forEach(function (a) {
      a.classList.toggle('is-on', a.dataset.year === cur);
    });
  }

  var progress = $('progress');
  var ticking = false;

  // 不依赖 scroll 事件：有些环境（后台标签页、某些内置浏览器）不派发它，
  // 那样照片就永远不显影。定时巡检 + 滚动触发，双保险。
  function tick() {
    if (ticking) return;
    ticking = true;

    var done = false;
    function run() {
      if (done) return;
      done = true;
      ticking = false;

      var doc = document.documentElement;
      var vh = window.innerHeight || 800;
      var max = doc.scrollHeight - vh;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.width = (p * 100) + '%';

      checkVisible();
      updateChip();

      if (window.scrollY < vh * 0.6) yearChip.classList.remove('is-on');
    }

    requestAnimationFrame(run);
    setTimeout(run, 90);
  }

  /* ---------- 5. 看大图 ---------- */

  var lightbox = $('lightbox');

  function openLightbox(p) {
    $('lbImg').src = p.src;
    $('lbImg').alt = p.alt || '';
    $('lbCap').textContent = p.cap || p.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.hidden = true;
    $('lbImg').removeAttribute('src');
    document.body.style.overflow = '';
  }
  lightbox.addEventListener('click', closeLightbox);

  /* ---------- 6. 收尾：门 → 给糖/捣蛋 → 信 ---------- */

  var F = STORY.finale;
  var houseBtn = $('houseBtn');
  var knockHint = $('knockHint');
  var finaleDoor = $('finaleDoor');
  var finaleChoice = $('finaleChoice');
  var finaleLetter = $('finaleLetter');
  var choiceLine = $('choiceLine');
  var treatBtn = $('treatBtn');
  var trickBtn = $('trickBtn');

  var knocks = 0, doorOpen = false, chosen = false, letterOpen = false;

  function setupFinale() {
    $('finaleHint').textContent = F.hint;
    knockHint.textContent = F.knockHint;
    $('choiceTitle').textContent = F.choiceTitle;
    $('choiceSub').textContent = F.choiceSub;
    treatBtn.textContent = F.treat;
    trickBtn.textContent = F.trick;
    $('envelopeHint').textContent = F.envelopeHint;

    houseBtn.addEventListener('click', knockDoor);
    treatBtn.addEventListener('click', function () { pick('treat'); });
    trickBtn.addEventListener('click', function () { pick('trick'); });
    $('envelopeBtn').addEventListener('click', openLetter);
    $('replayBtn').addEventListener('click', replay);
    $('letter').addEventListener('click', skipTyping);
  }

  function knockDoor() {
    if (doorOpen) return;
    Sound.ensure();
    knocks += 1;
    houseBtn.classList.add('is-knocking');
    setTimeout(function () { houseBtn.classList.remove('is-knocking'); }, 330);
    Sound.knock();

    if (knocks < 3) {
      knockHint.textContent = F.knocks[knocks - 1] || '';
      return;
    }

    doorOpen = true;
    knockHint.textContent = F.knocks[2] || '';
    setTimeout(function () {
      houseBtn.classList.add('is-open');
      Sound.open();
      setTimeout(function () {
        finaleChoice.hidden = false;
        finaleChoice.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
      }, 700);
    }, 380);
  }

  function pick(kind) {
    if (chosen) return;
    chosen = true;
    Sound.ensure();

    var picked = kind === 'treat' ? treatBtn : trickBtn;
    var other = kind === 'treat' ? trickBtn : treatBtn;
    picked.classList.add('is-picked');
    other.classList.add('is-dim');

    if (kind === 'treat') {
      choiceLine.textContent = F.treatLine;
      Sound.win();
      rain();
    } else {
      choiceLine.textContent = F.trickLine;
      Sound.noise(0.5, 0.08, 2000);
      document.body.classList.add('is-shaking');
      setTimeout(function () { document.body.classList.remove('is-shaking'); }, 470);
    }

    setTimeout(function () {
      finaleLetter.hidden = false;
      finaleLetter.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
    }, 1500);
  }

  function rain() {
    var set = ['🍬', '🍭', '🍫', '🧁'];
    for (var i = 0; i < 11; i++) {
      var s = document.createElement('i');
      s.className = 'candy';
      s.textContent = set[i % set.length];
      s.style.left = (6 + Math.random() * 88) + '%';
      s.style.animationDelay = (Math.random() * 0.5) + 's';
      s.style.setProperty('--spin', (Math.random() * 360 - 180) + 'deg');
      document.body.appendChild(s);
      (function (node) { setTimeout(function () { node.remove(); }, 3400); })(s);
    }
  }

  /* 信 */
  var letter = $('letter');
  var letterBody = $('letterBody');
  var letterSign = $('letterSign');
  var replayBtn = $('replayBtn');
  var envelopeBtn = $('envelopeBtn');

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

  function typeInto(node, text, speed) {
    return new Promise(function (resolve) {
      if (REDUCED || skipFlag) { node.textContent = text; resolve(); return; }
      var i = 0, done = false, timer;
      node.textContent = '';
      function finish() {
        if (done) return;
        done = true;
        clearInterval(timer);
        activeTyping = null;
        node.textContent = text;
        resolve();
      }
      timer = setInterval(function () {
        if (done) return;
        if (skipFlag) return finish();
        node.textContent = text.slice(0, ++i);
        if (i >= text.length) finish();
      }, speed || 20);
      activeTyping = finish;
    });
  }

  function wait(ms) {
    return new Promise(function (r) { setTimeout(r, skipFlag ? 0 : ms); });
  }

  function openLetter() {
    if (letterOpen) return;
    letterOpen = true;
    Sound.ensure();
    Sound.paper();
    envelopeBtn.classList.add('is-open');
    $('envelopeHint').style.display = 'none';

    setTimeout(function () {
      envelopeBtn.style.display = 'none';
      letter.hidden = false;
      playLetter();
      setTimeout(function () {
        letter.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      }, 60);
    }, 640);
  }

  async function playLetter() {
    var paras = STORY.letter.slice();
    var d = daysTogether();
    if (d > 0 && STORY.daysFmt) paras.push(fmt(STORY.daysFmt, { n: d }));

    var nodes = paras.map(function (text) {
      var p = el('p', null, text);
      p.style.opacity = '0';
      letterBody.appendChild(p);
      return p;
    });

    await new Promise(function (r) {
      var done = false;
      var once = function () { if (done) return; done = true; r(); };
      requestAnimationFrame(function () { requestAnimationFrame(once); });
      setTimeout(once, 160);
    });
    nodes.forEach(function (p) { p.style.minHeight = p.offsetHeight + 'px'; });

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.opacity = '';
      await typeInto(nodes[i], paras[i], 18);
      await wait(90);
    }

    letterSign.hidden = false;
    $('signText').textContent = (SITE.signature || '') + (SITE.fromName ? ' ' + SITE.fromName : '');
    $('byeText').textContent = tpl(STORY.bye);
    replayBtn.hidden = false;
    Sound.win();
  }

  function skipTyping() {
    if (!letterOpen) return;
    skipFlag = true;
    if (activeTyping) activeTyping();
  }

  function replay() {
    skipFlag = false;
    activeTyping = null;
    knocks = 0; doorOpen = false; chosen = false; letterOpen = false;

    houseBtn.classList.remove('is-open', 'is-knocking');
    knockHint.textContent = F.knockHint;
    finaleChoice.hidden = true;
    finaleLetter.hidden = true;
    treatBtn.classList.remove('is-picked', 'is-dim');
    trickBtn.classList.remove('is-picked', 'is-dim');
    choiceLine.textContent = '';
    letter.hidden = true;
    letterBody.innerHTML = '';
    letterSign.hidden = true;
    replayBtn.hidden = true;
    envelopeBtn.classList.remove('is-open');
    envelopeBtn.style.display = '';
    $('envelopeHint').style.display = '';

    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  }

  /* ---------- 7. 口令门 ---------- */

  var gateEl = $('gate');

  function setupGate() {
    var pass = (SITE && SITE.passcode) ? String(SITE.passcode) : '';
    if (!pass) { gateEl.hidden = true; return; }

    var G = STORY.gate || {};
    $('gateKicker').textContent = G.kicker || '';
    $('gateTitle').textContent = G.title || '先对个暗号';
    $('gateHint').textContent = G.hint || '';
    $('gateInput').placeholder = G.placeholder || '口令';
    $('gateBtn').textContent = G.button || '开门';

    var KEY = 'card_unlocked_v1';

    function remember() {
      try { localStorage.setItem(KEY, pass); } catch (e) { /* 无痕模式就算了 */ }
    }
    function remembered() {
      try { return localStorage.getItem(KEY) === pass; } catch (e) { return false; }
    }
    function openGate() {
      gateEl.classList.add('is-off');
      document.body.classList.remove('is-locked');
      setTimeout(function () { gateEl.hidden = true; }, 700);
      tick();
    }

    if (remembered()) { gateEl.hidden = true; return; }

    document.body.classList.add('is-locked');

    $('gateForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = ($('gateInput').value || '').trim();
      if (v === pass) {
        remember();
        Sound.ensure();
        Sound.plink(0);
        openGate();
      } else {
        $('gateWrong').textContent = G.wrong || '不对。';
        gateEl.classList.add('is-wrong');
        setTimeout(function () { gateEl.classList.remove('is-wrong'); }, 460);
        $('gateInput').select();
      }
    });
  }

  /* ---------- 8. 声音开关 ---------- */

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

  /* ---------- 9. 启动 ---------- */

  function init() {
    buildCover();
    buildYears();
    buildRail();
    setupFinale();
    setupGate();
    railLinks = Array.prototype.slice.call(document.querySelectorAll('.year-rail a'));

    document.body.classList.add('js-ready');
    setupWatch();

    Sparks.init($('sparks'), T.particles || 'embers');
    syncSoundBtn();

    $('startBtn').addEventListener('click', function () {
      Sound.ensure();
      Sound.plink(0);
      var first = document.querySelector('.year');
      if (first) first.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    });

    window.addEventListener('scroll', tick, { passive: true });
    document.addEventListener('scroll', tick, { passive: true, capture: true });
    window.addEventListener('resize', tick);
    setInterval(function () { if (!document.hidden) tick(); }, 500);
    tick();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });

    // 第一次触摸就解锁音频（iOS / 微信内置浏览器都要求手势）
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
