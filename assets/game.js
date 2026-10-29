/* 首屏可玩的迷你 Flappy：小鸟、云、管道全部用 canvas 代码绘制，造型取自 App 的经典晴空皮肤。
   不加载、不播放任何声音。 */
(function () {
  "use strict";

  var canvas = document.getElementById("game");
  if (!canvas || !canvas.getContext) {
    return;
  }
  var ctx = canvas.getContext("2d");
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");

  // 逻辑坐标：固定高度 480，宽度按画布比例换算
  var H = 480;
  var W = 360;
  var GROUND = 66;
  var GRAVITY = 1450;
  var FLAP = -420;
  var SPEED = 148;
  var GAP = 140;
  var PIPE_W = 54;
  var SPACING = 205;
  var R = 14;
  var BEST_KEY = "flappybird-site-best";

  var best = 0;
  try {
    best = parseInt(localStorage.getItem(BEST_KEY), 10) || 0;
  } catch (e) {
    best = 0;
  }

  var state = "ready"; // ready | play | over | paused
  var score = 0;
  var overAt = 0;
  var now = 0;
  var bird = { x: 100, y: 220, vy: 0, rot: 0, wing: 0 };
  var pipes = [];
  var clouds = [];
  var stars = [];
  var groundOffset = 0;
  var visible = !document.hidden;
  var inView = true;
  var rafId = 0;
  var last = 0;

  // 两套配色：晴空（App 经典晴空）与夜空
  var PALETTES = {
    light: {
      skyTop: "#87cffa", skyBottom: "#e0f5ff", sun: "rgba(255,242,194,0.75)", sunGlow: "rgba(255,242,194,0.32)",
      hills: ["rgba(189,235,153,0.75)", "rgba(171,222,138,0.7)", "rgba(148,204,117,0.7)"],
      cloud: "#ffffff", cloudStroke: "rgba(255,255,255,0.4)",
      ground: "#8fc766", groundDark: "#6b9e47", grass: "#6bd14d",
      pipe: "#5cbf73", pipeDark: "#40994f",
      yellow: "#ffe038", orange: "#ff9926", red: "#fa4d40", belly: "#fff7bf", eye: "#261f33",
      text: "#ffffff", ink: "#23324d", panel: "rgba(255,255,255,0.94)", panelText: "#23324d"
    },
    dark: {
      skyTop: "#0a1430", skyBottom: "#22396b", sun: "#fff3c2", sunGlow: "rgba(255,243,194,0.14)",
      hills: ["rgba(36,82,64,0.85)", "rgba(28,68,52,0.85)", "rgba(20,54,42,0.9)"],
      cloud: "rgba(185,200,230,0.55)", cloudStroke: "rgba(230,240,255,0.18)",
      ground: "#3c6b3a", groundDark: "#284d29", grass: "#4fa35a",
      pipe: "#3aa161", pipeDark: "#257446",
      yellow: "#ffe038", orange: "#ffa53d", red: "#fa4d40", belly: "#fff7bf", eye: "#261f33",
      text: "#ffffff", ink: "#050a1a", panel: "rgba(16,27,56,0.94)", panelText: "#edf3ff"
    }
  };

  function palette() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? PALETTES.dark : PALETTES.light;
  }

  function t(key) {
    var dict = window.FB_I18N && window.FB_I18N();
    return (dict && dict[key]) || key;
  }

  function seedScenery() {
    clouds = [];
    for (var i = 0; i < 4; i++) {
      clouds.push({ x: (W / 4) * i + Math.random() * 60, y: 60 + Math.random() * 150, s: 0.55 + Math.random() * 0.45, v: 10 + Math.random() * 12 });
    }
    stars = [];
    for (var j = 0; j < 46; j++) {
      stars.push({ x: Math.random(), y: Math.random() * 0.62, r: Math.random() < 0.2 ? 2 : 1.2, p: Math.random() * 6.28 });
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    var scale = canvas.height / H;
    W = (rect.width / rect.height) * H;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    bird.x = Math.round(W * 0.3);
    if (!clouds.length) {
      seedScenery();
    }
    draw();
  }

  function reset() {
    score = 0;
    pipes = [];
    bird.y = H * 0.44;
    bird.vy = 0;
    bird.rot = 0;
  }

  function addPipe(x) {
    var minY = 70 + GAP / 2;
    var maxY = H - GROUND - 40 - GAP / 2;
    pipes.push({ x: x, gapY: minY + Math.random() * (maxY - minY), scored: false });
  }

  // 点击 / 空格 / 触摸统一入口
  function press() {
    if (state === "ready") {
      reset();
      state = "play";
      addPipe(W + 40);
      flap();
    } else if (state === "play") {
      flap();
    } else if (state === "paused") {
      state = "play";
    } else if (state === "over" && now - overAt > 0.45) {
      reset();
      state = "ready";
      press();
      return;
    }
    kick();
  }

  function flap() {
    bird.vy = FLAP;
    bird.wing = 1;
  }

  function die() {
    state = "over";
    overAt = now;
    if (score > best) {
      best = score;
      try {
        localStorage.setItem(BEST_KEY, String(best));
      } catch (e) {
        // 隐私模式下写入失败时忽略
      }
    }
    updateBestLabel();
  }

  function updateBestLabel() {
    var el = document.getElementById("best-score");
    if (el) {
      el.textContent = String(best);
    }
  }

  // 圆与矩形相交检测（矩形略微放宽到管口宽度）
  function hitRect(rx, ry, rw, rh) {
    var nx = Math.max(rx, Math.min(bird.x, rx + rw));
    var ny = Math.max(ry, Math.min(bird.y, ry + rh));
    var dx = bird.x - nx;
    var dy = bird.y - ny;
    return dx * dx + dy * dy < (R - 2) * (R - 2);
  }

  function hitPipe(p) {
    var topBottom = p.gapY - GAP / 2;
    var botTop = p.gapY + GAP / 2;
    return hitRect(p.x - 4, -200, PIPE_W + 8, topBottom + 200) || hitRect(p.x - 4, botTop, PIPE_W + 8, H);
  }

  function update(dt) {
    var calm = reduceMQ.matches;
    if (!calm || state === "play") {
      for (var i = 0; i < clouds.length; i++) {
        var c = clouds[i];
        c.x -= c.v * dt * (state === "play" ? 2.2 : 1);
        if (c.x < -80) {
          c.x = W + 60 + Math.random() * 40;
          c.y = 60 + Math.random() * 150;
        }
      }
    }
    bird.wing = Math.max(0, bird.wing - dt * 4);

    if (state === "ready") {
      // 待机时上下浮动
      bird.y = H * 0.44 + Math.sin(now * 3) * (calm ? 0 : 8);
      bird.rot = 0;
      groundOffset = (groundOffset + SPEED * dt * (calm ? 0 : 0.5)) % 34;
      return;
    }
    if (state !== "play") {
      if (state === "over" && bird.y < H - GROUND - R) {
        bird.vy += GRAVITY * dt;
        bird.y = Math.min(H - GROUND - R, bird.y + bird.vy * dt);
        bird.rot = Math.min(1.4, bird.rot + dt * 6);
      }
      return;
    }

    groundOffset = (groundOffset + SPEED * dt) % 34;
    bird.vy += GRAVITY * dt;
    bird.y += bird.vy * dt;
    bird.rot = Math.max(-0.5, Math.min(1.2, bird.vy * 0.0026));
    if (bird.y < R) {
      bird.y = R;
      bird.vy = 0;
    }

    for (var k = 0; k < pipes.length; k++) {
      var p = pipes[k];
      p.x -= SPEED * dt;
      if (!p.scored && p.x + PIPE_W < bird.x - R) {
        p.scored = true;
        score += 1;
      }
      if (hitPipe(p)) {
        die();
        return;
      }
    }
    if (pipes.length && pipes[0].x < -PIPE_W - 20) {
      pipes.shift();
    }
    var lastPipe = pipes[pipes.length - 1];
    if (!lastPipe || lastPipe.x < W - SPACING) {
      addPipe((lastPipe ? lastPipe.x : W) + SPACING);
    }
    if (bird.y + R >= H - GROUND) {
      bird.y = H - GROUND - R;
      die();
    }
  }

  /* ---------- 绘制 ---------- */
  function roundRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawSky(c) {
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, c.skyTop);
    g.addColorStop(1, c.skyBottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    var dark = c === PALETTES.dark;
    if (dark) {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.globalAlpha = reduceMQ.matches ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(now * 1.3 + s.p));
        ctx.fillStyle = "#fff6d0";
        ctx.fillRect(s.x * W, s.y * H, s.r * 1.6, s.r * 1.6);
      }
      ctx.globalAlpha = 1;
    }
    // 太阳 / 月亮
    var mx = W * 0.78;
    var my = H * 0.17;
    ctx.fillStyle = c.sunGlow;
    ctx.beginPath();
    ctx.arc(mx, my, dark ? 46 : 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.sun;
    if (dark) {
      // 月牙：限制在月盘内，用奇偶填充去掉右上方的圆
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, 22, 0, Math.PI * 2);
      ctx.clip();
      ctx.beginPath();
      ctx.arc(mx, my, 22, 0, Math.PI * 2);
      ctx.arc(mx + 10, my - 7, 19, 0, Math.PI * 2);
      ctx.fill("evenodd");
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(mx, my, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    // 远山：与 App 一样的二次曲线山丘
    for (var h = 0; h < c.hills.length; h++) {
      var w = W * (0.62 + h * 0.14);
      var hh = H * (0.16 + h * 0.03);
      var x0 = W * h * 0.34 - 20;
      ctx.fillStyle = c.hills[h];
      ctx.beginPath();
      ctx.moveTo(x0, H - GROUND + 4);
      ctx.quadraticCurveTo(x0 + w / 2, H - GROUND - hh * 2 + 4, x0 + w, H - GROUND + 4);
      ctx.closePath();
      ctx.fill();
    }
  }

  // App 里的折线云
  function drawCloud(c, cl) {
    ctx.save();
    ctx.translate(cl.x, cl.y);
    ctx.scale(cl.s, cl.s);
    ctx.beginPath();
    ctx.moveTo(-56, 0);
    ctx.lineTo(-24, -18);
    ctx.quadraticCurveTo(-2, -30, 18, -12);
    ctx.lineTo(54, 2);
    ctx.quadraticCurveTo(24, 22, 4, 18);
    ctx.lineTo(-42, 12);
    ctx.quadraticCurveTo(-58, 4, -56, 0);
    ctx.closePath();
    ctx.fillStyle = c.cloud;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = c.cloudStroke;
    ctx.stroke();
    ctx.restore();
  }

  // App 的能量门管道：外壳 + 双轨 + 中柱 + 发射口 + 光束
  function drawColumn(c, x, y, h, capAtBottom) {
    if (h <= 0) {
      return;
    }
    ctx.save();
    roundRect(x, y, PIPE_W, h, 12);
    ctx.fillStyle = c.pipeDark;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,153,38,0.4)";
    ctx.stroke();
    ctx.fillStyle = c.pipe;
    roundRect(x + PIPE_W * 0.24 - 3, y, 6, h, 3);
    ctx.fill();
    roundRect(x + PIPE_W * 0.76 - 3, y, 6, h, 3);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    roundRect(x + PIPE_W * 0.38, y, PIPE_W * 0.24, h, 5);
    ctx.fill();

    var capH = 26;
    var capY = capAtBottom ? y + h - capH : y;
    roundRect(x - 7, capY, PIPE_W + 14, capH, 9);
    ctx.fillStyle = c.pipe;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = c.ink;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    roundRect(x - 2, capY + 5, 8, capH - 10, 3);
    ctx.fill();
    var beamY = capAtBottom ? capY - 10 : capY + capH - 2;
    ctx.fillStyle = "rgba(255,153,38,0.45)";
    roundRect(x - 3, beamY, PIPE_W + 6, 12, 6);
    ctx.fill();
    ctx.restore();
  }

  function drawPipes(c) {
    for (var i = 0; i < pipes.length; i++) {
      var p = pipes[i];
      var top = p.gapY - GAP / 2;
      var bot = p.gapY + GAP / 2;
      drawColumn(c, p.x, -12, top + 12, true);
      drawColumn(c, p.x, bot, H - GROUND - bot + 12, false);
      // 门中央的光环
      var cx = p.x + PIPE_W / 2;
      var rad = Math.min(GAP * 0.56, 94) / 2;
      ctx.globalAlpha = p.scored ? 0.35 : 0.9;
      ctx.lineWidth = 9;
      ctx.strokeStyle = "rgba(255,153,38,0.22)";
      ctx.beginPath();
      ctx.arc(cx, p.gapY, rad * 1.24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.strokeStyle = c.pipe;
      ctx.beginPath();
      ctx.arc(cx, p.gapY, rad, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.arc(cx, p.gapY, rad * 0.64, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function drawGround(c) {
    var y = H - GROUND;
    ctx.fillStyle = c.ground;
    ctx.fillRect(0, y, W, GROUND);
    ctx.fillStyle = c.pipeDark;
    ctx.fillRect(0, y, W, 12);
    ctx.fillStyle = "rgba(255,153,38,0.66)";
    ctx.fillRect(0, y + 14, W, 3);
    ctx.fillStyle = c.groundDark;
    for (var sx = -groundOffset; sx < W + 34; sx += 34) {
      ctx.beginPath();
      ctx.moveTo(sx, y + 24);
      ctx.lineTo(sx + 17, y + 24);
      ctx.lineTo(sx + 7, y + GROUND);
      ctx.lineTo(sx - 10, y + GROUND);
      ctx.closePath();
      ctx.fill();
    }
    // 草丛
    ctx.fillStyle = c.grass;
    for (var gx = 18 - groundOffset; gx < W + 34; gx += 34) {
      roundRect(gx - 7.2, y - 8, 2.4, 8, 1.2);
      ctx.fill();
      roundRect(gx - 1.2, y - 14, 2.4, 14, 1.2);
      ctx.fill();
      roundRect(gx + 4.8, y - 10, 2.4, 10, 1.2);
      ctx.fill();
    }
  }

  // App 里的圆形小鸟：光圈、外壳、肚皮、翅膀、眼睛、尾焰
  function drawBird(c) {
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(bird.rot);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255,153,38,0.34)";
    ctx.beginPath();
    ctx.arc(0, 0, 19, 0, Math.PI * 2);
    ctx.stroke();

    // 尾部推进器
    var flick = state === "play" ? 1 + Math.sin(now * 40) * 0.25 : 1;
    ctx.save();
    ctx.translate(-17, 0);
    ctx.fillStyle = c.orange;
    roundRect(-11 * flick, -3, 10 * flick, 6, 3);
    ctx.fill();
    ctx.fillStyle = c.yellow;
    roundRect(-7, -2, 5, 4, 2);
    ctx.fill();
    ctx.fillStyle = c.red;
    roundRect(-2, -5, 8, 10, 3);
    ctx.fill();
    ctx.restore();

    // 外壳
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.quadraticCurveTo(14, -14, 0, -16);
    ctx.quadraticCurveTo(-14, -14, -16, 0);
    ctx.quadraticCurveTo(-14, 14, 0, 16);
    ctx.quadraticCurveTo(14, 14, 16, 0);
    ctx.closePath();
    ctx.fillStyle = c.red;
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = c.orange;
    ctx.stroke();

    // 背鳍
    ctx.save();
    ctx.translate(-4, -6);
    ctx.rotate(0.18);
    ctx.fillStyle = c.orange;
    roundRect(-2.5, -15, 5, 13, 2.5);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = c.yellow;
    ctx.beginPath();
    ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // 翅膀：起跳时向上扇
    ctx.save();
    ctx.translate(-10, 0);
    ctx.rotate(-0.25 - bird.wing * 0.9);
    ctx.fillStyle = c.orange;
    roundRect(-10, -4.5, 20, 9, 4.5);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = c.belly;
    ctx.beginPath();
    ctx.arc(10, 0, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.eye;
    ctx.beginPath();
    ctx.arc(11.5, 0, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function outlinedText(c, text, x, y, size) {
    ctx.font = "900 " + size + "px ui-rounded, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(4, size / 6);
    ctx.strokeStyle = c.ink;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = c.text;
    ctx.fillText(text, x, y);
  }

  function panel(c, lines, y) {
    var pw = Math.min(W - 40, 270);
    var ph = 30 + lines.length * 28;
    var px = (W - pw) / 2;
    ctx.fillStyle = c.ink;
    roundRect(px + 4, y + 4, pw, ph, 8);
    ctx.fill();
    ctx.fillStyle = c.panel;
    roundRect(px, y, pw, ph, 8);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = c.ink;
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      ctx.font = (l.b ? "900 20px" : "700 14px") + " -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      ctx.fillStyle = l.color || c.panelText;
      ctx.fillText(l.t, W / 2, y + 28 + i * 28);
    }
  }

  function draw() {
    var c = palette();
    drawSky(c);
    for (var i = 0; i < clouds.length; i++) {
      drawCloud(c, clouds[i]);
    }
    drawPipes(c);
    drawGround(c);
    drawBird(c);

    if (state === "play" || state === "over" || state === "paused") {
      outlinedText(c, String(score), W / 2, 54, 46);
    }
    if (state === "ready") {
      outlinedText(c, "FlappyBird", W / 2, H * 0.2, 34);
      panel(c, [
        { t: t("game.tap"), b: true },
        { t: t("game.best") + " " + best }
      ], H * 0.56);
    } else if (state === "over") {
      panel(c, [
        { t: t("game.over"), b: true, color: c.red },
        { t: t("game.score") + " " + score + "   " + t("game.best") + " " + best },
        { t: t("game.retry") }
      ], H * 0.3);
    } else if (state === "paused") {
      panel(c, [
        { t: t("game.paused"), b: true },
        { t: t("game.resume") }
      ], H * 0.36);
    }
  }

  /* ---------- 动画循环：页面隐藏或画布离开视口时停止 ---------- */
  function shouldRun() {
    if (!visible || !inView) {
      return false;
    }
    if (state === "play") {
      return true;
    }
    if (state === "over") {
      return bird.y < H - GROUND - R - 0.5 || !reduceMQ.matches;
    }
    if (state === "paused") {
      return false;
    }
    return !reduceMQ.matches;
  }

  function frame(ts) {
    rafId = 0;
    var dt = last ? Math.min((ts - last) / 1000, 1 / 30) : 0;
    last = ts;
    now += dt;
    update(dt);
    draw();
    if (shouldRun()) {
      rafId = requestAnimationFrame(frame);
    } else {
      last = 0;
    }
  }

  function kick() {
    if (!rafId && shouldRun()) {
      last = 0;
      rafId = requestAnimationFrame(frame);
    } else if (!rafId) {
      draw();
    }
  }

  function pauseIfPlaying() {
    if (state === "play") {
      state = "paused";
      draw();
    }
  }

  canvas.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button > 0) {
      return;
    }
    e.preventDefault();
    canvas.focus({ preventScroll: true });
    press();
  });

  // 空格 / 上方向键：画布在视口内且焦点不在表单控件、按钮、链接上时才接管
  document.addEventListener("keydown", function (e) {
    if (e.code !== "Space" && e.key !== " " && e.code !== "ArrowUp") {
      return;
    }
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(tag)) {
      return;
    }
    if (!inView) {
      return;
    }
    e.preventDefault();
    if (!e.repeat) {
      press();
    }
  });

  document.addEventListener("visibilitychange", function () {
    visible = !document.hidden;
    if (!visible) {
      pauseIfPlaying();
    } else {
      kick();
    }
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (!inView) {
        pauseIfPlaying();
      } else {
        kick();
      }
    }, { threshold: 0.25 }).observe(canvas);
  }

  if (reduceMQ.addEventListener) {
    reduceMQ.addEventListener("change", kick);
  }
  window.addEventListener("resize", resize);
  // 主题或语言切换后重绘
  window.addEventListener("fb:refresh", function () {
    draw();
  });

  updateBestLabel();
  resize();
  kick();
})();
