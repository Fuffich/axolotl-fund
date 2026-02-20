function showPopup(message) {
  if (!document.getElementById('simplePopupStyle')) {
    const style = document.createElement('style');
    style.id = 'simplePopupStyle';
    style.textContent = `
      #simplePopupOverlay{
        position:fixed; inset:0;
        display:flex; align-items:center; justify-content:center;
        background: rgba(0,0,0,0.35);
        z-index:99999;
        padding:18px;
      }
      #simplePopupBox{
        width:min(520px, 100%);
        background: var(--light-pink, #FFF0F5);
        border: 2px solid #FFD1DC;
        border-radius: 16px;
        box-shadow: 0 18px 50px rgba(0,0,0,0.25);
        overflow:hidden;
        font-family: 'Minecraft Rus', sans-serif;
        transform: translateY(6px);
        animation: simplePopupIn .14s ease-out forwards;
      }
      @keyframes simplePopupIn{ to { transform: translateY(0); } }

      #simplePopupBody{ padding: 14px 16px 16px; }
      #simplePopupText{
        color: var(--dark-green, #6B8E23);
        font-size: 18px;
        line-height: 1.5;
        margin: 0;
        white-space: pre-line;
      }
      #simplePopupNote{
        margin-top: 8px;
        color: rgba(107,142,35,0.75);
        font-size: 15px;
        line-height: 1.45;
      }
      #simplePopupActions{
        display:flex;
        justify-content:flex-end;
        gap:10px;
        margin-top: 14px;
      }
      #simplePopupOk{
        border:none;
        border-radius: 12px;
        padding: 10px 16px;
        background: var(--accent-pink, #FF6F91);
        color:#fff;
        cursor:pointer;
        font-family: 'Minecraft Rus', sans-serif;
        font-size: 16px;
        box-shadow: 0 10px 22px rgba(255,105,180,0.18);
        transition: transform .12s ease, filter .12s ease;
      }
      #simplePopupOk:hover{ transform: translateY(-1px); filter: brightness(1.03); }
      #simplePopupOk:active{ transform: translateY(0); }
    `;
    document.head.appendChild(style);
  }

  const old = document.getElementById('simplePopupOverlay');
  if (old) old.remove();

  let mainText = String(message ?? '');
  let noteText = '';
  const m = mainText.match(/^(.*?)(\s*\([^)]*\))\s*$/);
  if (m) {
    mainText = m[1].trim();
    noteText = m[2].trim();
  }

  const overlay = document.createElement('div');
  overlay.id = 'simplePopupOverlay';
  overlay.innerHTML = `
    <div id="simplePopupBox" role="dialog" aria-modal="true">
      <div id="simplePopupBody">
        <div id="simplePopupText"></div>
        ${noteText ? `<div id="simplePopupNote"></div>` : ``}
        <div id="simplePopupActions">
          <button id="simplePopupOk" type="button">Ок</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#simplePopupText').textContent = mainText;
  if (noteText) overlay.querySelector('#simplePopupNote').textContent = noteText;

  const close = () => overlay.remove();
  overlay.querySelector('#simplePopupOk').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  const onEsc = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', onEsc);
    }
  };
  document.addEventListener('keydown', onEsc);
}



(() => {
  const FOOD_KEY = 'foodCount';
  const RATE = 10;

  function getFood() {
    return parseInt(localStorage.getItem(FOOD_KEY), 10) || 0;
  }
  function setFood(v) {
    localStorage.setItem(FOOD_KEY, String(Math.max(0, v)));
  }
  function renderFood() {
    const v = getFood();
    const counter = document.getElementById('foodCounter');
    if (counter) counter.textContent = String(v);
  }


  window.feedAquarium = function () {
    const current = getFood();
    if (current <= 0) {
      showPopup('Нельзя покормить: сначала сделайте пожертвование (1 корм = 10 ₽)');
      return;
    }

    if (typeof window.addFood === 'function') window.addFood();

    setFood(current - 1);
    renderFood();
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('aquarium')) return;

    renderFood();

    const form = document.getElementById('main_form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const helpTypeEl = document.getElementById('help_type');
      const helpType = helpTypeEl ? helpTypeEl.value : '';
      if (helpType !== 'donation') return;

      const amountEl = document.getElementById('donation_amount');
      const amount = amountEl ? Number(amountEl.value) : NaN;

      if (!Number.isFinite(amount) || amount < RATE) {
        showPopup(`Минимум ${RATE} ₽ (1 корм = 10 ₽).`);
        return;
      }

      const earned = Math.floor(amount / RATE);
      setFood(getFood() + earned);
      renderFood();
    }, true);
  });
})();


document.addEventListener('DOMContentLoaded', () => {
  const aquarium = document.getElementById('aquarium');
  if (!aquarium) return;

  if (!document.getElementById('aqEngineStyle')) {
    const st = document.createElement('style');
    st.id = 'aqEngineStyle';
    st.textContent = `
      .aq-panel{
        max-width: 580px;
        margin: 0 auto 10px;
        border-radius: 16px;
        overflow: hidden;
        border: 2px solid #FFD1DC;
        background: rgba(255,240,245,0.92);
        box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        font-family: 'Minecraft Rus', sans-serif;
      }

      /* сверху строка (стата + кнопка), ниже полоска */
      .aq-panel-body{
        padding: 10px 12px 12px;
        display:flex;
        flex-direction: column;
        gap: 8px;
      }

      .aq-topRow{
        display:flex;
        align-items:center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: nowrap; 
      }


      #aqStats{
        flex: 1 1 auto;
        min-width: 0;
      }

      .aq-row{
        display:flex;
        gap:8px;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        padding-bottom: 2px;
        scrollbar-width: thin;
      }
      .aq-row::-webkit-scrollbar{ height: 6px; }
      .aq-row::-webkit-scrollbar-thumb{
        background: rgba(255,111,145,0.45);
        border-radius: 999px;
      }
      .aq-row::-webkit-scrollbar-track{
        background: rgba(255,255,255,0.35);
        border-radius: 999px;
      }

      .aq-item{
        padding: 5px 8px;
        border-radius: 12px;
        border: 2px solid #FFD1DC;
        background: rgba(255,255,255,0.55);
        user-select:none;
        font-size: 12.5px;
        line-height: 1.2;
        white-space: nowrap;
        flex: 0 0 auto;
      }

      /* Название розовое, двоеточие + цифры зелёные */
      .aq-label{ color: var(--accent-pink, #FF6F91); font-weight: 800; }
      .aq-sep, .aq-val{ color: var(--dark-green, #6B8E23); font-weight: 800; }

      .aq-happyBar{
        height: 10px;
        width: 100%;
        border-radius: 999px;
        border: 2px solid #FFD1DC;
        background: rgba(255,255,255,0.55);
        overflow: hidden;
      }
      .aq-happyFill{
        height: 100%;
        width: 0%;
        background: var(--accent-pink, #FF6F91);
        transition: width .25s ease;
      }

      .aq-btn{
        border:none;
        border-radius: 12px;
        padding: 9px 12px;
        background: var(--accent-pink, #FF6F91);
        color:#fff;
        cursor:pointer;
        font-family: 'Minecraft Rus', sans-serif;
        font-size: 13.5px;
        box-shadow: 0 10px 22px rgba(255,105,180,0.18);
        transition: transform .12s ease, filter .12s ease;
        flex: 0 0 auto;
        white-space: nowrap;
      }
      .aq-btn:hover{ transform: translateY(-1px); filter: brightness(1.03); }
      .aq-btn:active{ transform: translateY(0); }

      #aquarium.aq-night{
        background: linear-gradient(180deg, #4f86b6, #2f5f8e);
        border-color: #A8E6CF;
      }
      #aquarium.aq-night .bubble{
        background: rgba(210, 235, 255, 0.70);
      }
      #aquarium.aq-night .floating-axolotl-img{
        filter: brightness(0.72) contrast(0.95) saturate(0.9)
                drop-shadow(2px 2px 3px rgba(0,0,0,0.25)) !important;
      }

      .food.fadeout{ opacity:0; transition: opacity .25s ease; }
      .food.gold{
        text-shadow: 0 0 10px rgba(255,215,0,0.9);
        filter: drop-shadow(0 0 8px rgba(255,215,0,0.65));
      }
      .aq-party{
        box-shadow: 0 0 0 3px rgba(255,105,180,0.35) inset;
      }
    `;
    document.head.appendChild(st);
  }

  const AXO_COUNT = 6;
  const AXO_SIZE = 50;
  const FOOD_SIZE = 18;

  const IDLE_SPEED = 0.35;
  const CHASE_SPEED = 2.1;
  const EAT_DIST = 34;

  const FOOD_FALL_MIN = 0.7;
  const FOOD_FALL_RAND = 0.6;

  const BOTTOM_GRACE_MS = 600;

  const FOOD_BOTTOM_TTL_MS = 6500;
  const ASSIGN_EVERY_MS = 150;

  const GOLD_CHANCE = 0.06;

  const COMBO_WINDOW_MS = 10000;
  const PARTY_COMBO_NEED = 12;
  const PARTY_DURATION_MS = 5500;
  const PARTY_COOLDOWN_MS = 90000;

  // Счастье
  const HAPPY_XP_PER_LEVEL = 12;

  aquarium.style.position = aquarium.style.position || 'relative';
  aquarium.style.overflow = aquarium.style.overflow || 'hidden';

  const PROG_KEY = 'aqProgressV3';
  const state = (() => {
    try { return JSON.parse(localStorage.getItem(PROG_KEY) || '{}'); } catch { return {}; }
  })();

  state.level ??= 1;
  state.xp ??= 0;

  state.happyLevel ??= 0;
  state.happyXp ??= 0;

  state.combo ??= 0;
  state.comboUntil ??= 0;

  state.partyUntil ??= 0;
  state.lastPartyAt ??= 0;

  state.theme ??= 'day';

  function saveState() {
    localStorage.setItem(PROG_KEY, JSON.stringify(state));
  }

  function xpNeedForNextLevel(lv) {
    return 50 + (lv - 1) * 30;
  }

  function addXP(amount) {
    state.xp += amount;
    while (state.xp >= xpNeedForNextLevel(state.level)) {
      state.xp -= xpNeedForNextLevel(state.level);
      state.level += 1;
    }
    saveState();
  }

  function addHappinessXp(amount) {
    state.happyXp += amount;
    while (state.happyXp >= HAPPY_XP_PER_LEVEL) {
      state.happyXp -= HAPPY_XP_PER_LEVEL;
      state.happyLevel += 1;
    }
    saveState();
  }

  const panel = document.createElement('div');
  panel.className = 'aq-panel';
  panel.innerHTML = `
    <div class="aq-panel-body">
      <div class="aq-topRow">
        <div id="aqStats"></div>
        <button class="aq-btn" id="aqThemeBtn" type="button">День</button>
      </div>

      <div class="aq-happyBar" aria-label="Шкала счастья">
        <div class="aq-happyFill" id="aqHappyFill"></div>
      </div>
    </div>
  `;
  aquarium.insertAdjacentElement('beforebegin', panel);

  const statsEl = panel.querySelector('#aqStats');
  const happyFill = panel.querySelector('#aqHappyFill');
  const themeBtn = panel.querySelector('#aqThemeBtn');

  function applyTheme() {
    const night = state.theme === 'night';
    aquarium.classList.toggle('aq-night', night);
    themeBtn.textContent = night ? 'Ночь' : 'День';
  }

  themeBtn.addEventListener('click', () => {
    state.theme = (state.theme === 'night') ? 'day' : 'night';
    saveState();
    applyTheme();
  });

  function renderHUD() {
    const need = xpNeedForNextLevel(state.level);
    const happyPct = Math.round((state.happyXp / HAPPY_XP_PER_LEVEL) * 100);
    if (happyFill) happyFill.style.width = `${Math.max(0, Math.min(100, happyPct))}%`;

    statsEl.innerHTML = `
      <div class="aq-row">
        <div class="aq-item">
          <span class="aq-label">Уровень</span><span class="aq-sep">: </span><span class="aq-val">${state.level}</span>
        </div>
        <div class="aq-item">
          <span class="aq-label">Опыт</span><span class="aq-sep">: </span><span class="aq-val">${state.xp}/${need}</span>
        </div>
        <div class="aq-item">
          <span class="aq-label">Комбо</span><span class="aq-sep">: </span><span class="aq-val">${state.combo}</span>
        </div>
        <div class="aq-item">
          <span class="aq-label">Счастье</span><span class="aq-sep">: </span><span class="aq-val">${state.happyLevel}</span>
        </div>
      </div>
    `;
  }

  applyTheme();
  renderHUD();

  const AXO_IMAGES = ['images/1.png', 'images/2.png', 'images/3.png', 'images/3.png'];
  const FOOD_EMOJI = ['🪱', '🍤', '🐛'];

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dist2 = (a, b) => {
    const dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx + dy * dy;
  };

  function aquariumRect() {
    const r = aquarium.getBoundingClientRect();
    return { w: r.width, h: r.height };
  }

  function makeId() {
    try { return crypto.randomUUID(); }
    catch { return String(Math.random()).slice(2) + String(Date.now()); }
  }

  function createBubbles() {
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = Math.random() * 90 + '%';

      const far = Math.random() < 0.45;
      const baseDur = far ? (Math.random() * 6 + 6) : (Math.random() * 4 + 2);

      bubble.style.animationDuration = baseDur + 's';
      bubble.style.animationDelay = (Math.random() * 3) + 's';
      bubble.style.width = (Math.random() * (far ? 7 : 10) + (far ? 3 : 5)) + 'px';
      bubble.style.height = bubble.style.width;

      if (far) {
        bubble.style.opacity = '0.45';
        bubble.style.transform = 'scale(0.75)';
      }

      aquarium.appendChild(bubble);
    }
  }

  function createSeaweed() {
    for (let i = 0; i < 8; i++) {
      const seaweed = document.createElement('div');
      seaweed.className = 'seaweed';
      seaweed.style.left = Math.random() * 90 + '%';
      seaweed.style.bottom = '0px';
      seaweed.style.height = (Math.random() * 60 + 40) + 'px';
      seaweed.style.animationDuration = (Math.random() * 10 + 5) + 's';
      seaweed.style.animationDelay = (Math.random() * 3) + 's';
      aquarium.appendChild(seaweed);
    }
  }

  createBubbles();
  createSeaweed();

  const axos = [];
  const foods = [];

  function createAxolotl() {
    const img = document.createElement('img');
    img.className = 'floating-axolotl-img';
    img.src = AXO_IMAGES[Math.floor(Math.random() * AXO_IMAGES.length)];
    img.alt = 'Аксолотль';

    img.style.animation = 'none';
    img.style.position = 'absolute';
    img.style.left = '0px';
    img.style.top = '0px';
    img.style.willChange = 'transform';
    img.style.touchAction = 'none';
    img.style.userSelect = 'none';
    img.draggable = false;

    aquarium.appendChild(img);

    const { w, h } = aquariumRect();
    const a = {
      el: img,
      x: Math.random() * (w - AXO_SIZE),
      y: Math.random() * (h - AXO_SIZE),

      vx: (Math.random() < 0.5 ? -1 : 1) * IDLE_SPEED,
      vy: (Math.random() - 0.5) * IDLE_SPEED,

      maxSpeed: 1.6,
      maxAccel: 0.12,

      satiety: 70 + Math.random() * 30,

      targetFoodId: null,

      dragging: false,
      dragDX: 0,
      dragDY: 0,

      flip: Math.random() < 0.5 ? -1 : 1,
      phase: Math.random() * Math.PI * 2,

      eatPulseStart: 0,
      eatPulseUntil: 0
    };

    img.addEventListener('pointerdown', (e) => {
      a.dragging = true;
      a.targetFoodId = null;
      const rect = aquarium.getBoundingClientRect();
      a.dragDX = (e.clientX - rect.left) - a.x;
      a.dragDY = (e.clientY - rect.top) - a.y;
      img.setPointerCapture(e.pointerId);
    });

    img.addEventListener('pointermove', (e) => {
      if (!a.dragging) return;
      const rect = aquarium.getBoundingClientRect();
      const { w, h } = aquariumRect();
      a.x = clamp((e.clientX - rect.left) - a.dragDX, 0, w - AXO_SIZE);
      a.y = clamp((e.clientY - rect.top) - a.dragDY, 0, h - AXO_SIZE);
    });

    const stopDrag = () => { a.dragging = false; };
    img.addEventListener('pointerup', stopDrag);
    img.addEventListener('pointercancel', stopDrag);

    axos.push(a);
    return a;
  }

  function createFood() {
    const el = document.createElement('div');
    el.className = 'food';
    el.textContent = FOOD_EMOJI[Math.floor(Math.random() * FOOD_EMOJI.length)];
    el.style.position = 'absolute';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.willChange = 'transform';
    el.style.fontSize = '1.3em';
    el.style.animation = 'none';
    aquarium.appendChild(el);

    const { w } = aquariumRect();

    const isGold = Math.random() < GOLD_CHANCE;
    if (isGold) el.classList.add('gold');

    const f = {
      id: makeId(),
      el,
      x: Math.random() * (w - FOOD_SIZE),
      y: 0,
      vy: FOOD_FALL_MIN + Math.random() * FOOD_FALL_RAND,
      onBottomAt: null,
      eaten: false,
      assignedTo: null,
      isGold
    };

    foods.push(f);
    return f;
  }

  window.addFood = function () {
    createFood();
  };

  let lastAssign = 0;

  function canStillEatBottomFood(food) {
    if (!food.onBottomAt) return true;
    return (Date.now() - food.onBottomAt) <= BOTTOM_GRACE_MS;
  }

  function assignTargets(now) {
    if (now - lastAssign < ASSIGN_EVERY_MS) return;
    lastAssign = now;

    const foodById = new Map(foods.map(f => [f.id, f]));
    for (const a of axos) {
      if (a.targetFoodId && !foodById.has(a.targetFoodId)) a.targetFoodId = null;
    }

    for (const f of foods) {
      if (f.eaten) continue;
      if (f.onBottomAt && !canStillEatBottomFood(f)) continue;

      if (f.assignedTo && f.assignedTo.targetFoodId === f.id) continue;

      let best = null;
      let bestD = Infinity;

      for (const a of axos) {
        if (a.dragging) continue;
        if (a.targetFoodId) continue;
        const d = dist2(a, f);
        if (d < bestD) { bestD = d; best = a; }
      }

      if (best) {
        best.targetFoodId = f.id;
        f.assignedTo = best;
      }
    }
  }

  function maybeSpawnPartyBubble() {
    if (Date.now() >= state.partyUntil) return;
    if (Math.random() > 0.25) return;

    const b = document.createElement('div');
    b.className = 'bubble';
    b.style.left = Math.random() * 90 + '%';
    b.style.animationDuration = (Math.random() * 2 + 2) + 's';
    b.style.width = (Math.random() * 10 + 4) + 'px';
    b.style.height = b.style.width;
    aquarium.appendChild(b);
    setTimeout(() => b.remove(), 5000);
  }

  function step(now) {
    const { w, h } = aquariumRect();

    for (let i = foods.length - 1; i >= 0; i--) {
      const f = foods[i];

      if (f.eaten) {
        foods.splice(i, 1);
        continue;
      }

      const bottomY = h - FOOD_SIZE;

      if (f.y < bottomY) {
        f.y += f.vy;
        if (f.y >= bottomY) {
          f.y = bottomY;
          f.vy = 0;
          f.onBottomAt = Date.now();
        }
      } else {
        if (f.onBottomAt && Date.now() - f.onBottomAt > FOOD_BOTTOM_TTL_MS) {
          f.el.classList.add('fadeout');
          setTimeout(() => f.el.remove(), 250);
          foods.splice(i, 1);
          continue;
        }
      }

      f.el.style.transform = `translate(${f.x}px, ${f.y}px)`;
    }

    assignTargets(now);

    for (const a of axos) {
      a.satiety = Math.max(0, a.satiety - 0.01);
      a.maxSpeed = a.satiety < 25 ? 1.0 : a.satiety < 60 ? 1.35 : 1.7;

      let pulse = 1;
      if (a.eatPulseUntil > now) {
        const dur = Math.max(1, a.eatPulseUntil - a.eatPulseStart);
        const t = (now - a.eatPulseStart) / dur;
        pulse = 1 + 0.08 * Math.sin(Math.PI * t);
      }

      if (a.dragging) {
        const bob = Math.sin(now / 900 + a.phase) * 1.5;
        const rot = Math.sin(now / 1100 + a.phase) * 2.0;
        const sx = a.flip * pulse;
        const sy = pulse;
        a.el.style.transform = `translate(${a.x}px, ${a.y + bob}px) rotate(${rot}deg) scale(${sx}, ${sy})`;
        continue;
      }

      const target = a.targetFoodId ? foods.find(f => f.id === a.targetFoodId) : null;

      if (target && target.onBottomAt && !canStillEatBottomFood(target)) {
        a.targetFoodId = null;
      }

      if (target) {
        const dx = target.x - a.x;
        const dy = target.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;

        const desiredVx = (dx / dist) * CHASE_SPEED;
        const desiredVy = (dy / dist) * CHASE_SPEED;

        let steerX = desiredVx - a.vx;
        let steerY = desiredVy - a.vy;

        const steerLen = Math.hypot(steerX, steerY) || 1;
        if (steerLen > a.maxAccel) {
          steerX = (steerX / steerLen) * a.maxAccel;
          steerY = (steerY / steerLen) * a.maxAccel;
        }

        a.vx += steerX;
        a.vy += steerY;

        const vLen = Math.hypot(a.vx, a.vy) || 1;
        if (vLen > a.maxSpeed) {
          a.vx = (a.vx / vLen) * a.maxSpeed;
          a.vy = (a.vy / vLen) * a.maxSpeed;
        }

        a.x = clamp(a.x + a.vx, 0, w - AXO_SIZE);
        a.y = clamp(a.y + a.vy, 0, h - AXO_SIZE);

        const distAfter = Math.hypot(target.x - a.x, target.y - a.y);
        if (distAfter < EAT_DIST) {
          a.eatPulseStart = now;
          a.eatPulseUntil = now + 260;

          target.eaten = true;
          target.el.classList.add('fadeout');
          setTimeout(() => target.el.remove(), 250);

          const isGold = !!target.isGold;
          addXP(isGold ? 10 : 4);
          addHappinessXp(isGold ? 2 : 1);

          a.satiety = Math.min(100, a.satiety + (isGold ? 30 : 18));

          const tms = Date.now();
          if (tms < state.comboUntil) state.combo += 1;
          else state.combo = 1;
          state.comboUntil = tms + COMBO_WINDOW_MS;

          const canParty = (tms - state.lastPartyAt) >= PARTY_COOLDOWN_MS;
          if (canParty && state.combo >= PARTY_COMBO_NEED) {
            state.lastPartyAt = tms;
            state.partyUntil = tms + PARTY_DURATION_MS;
            aquarium.classList.add('aq-party');
            showPopup('Началась вечеринка! Пузырей стало больше.');
          }

          saveState();
          renderHUD();

          a.targetFoodId = null;
        }
      } else {
        a.x = clamp(a.x + a.vx, 0, w - AXO_SIZE);
        a.y = clamp(a.y + a.vy, 0, h - AXO_SIZE);

        if (a.x <= 0 || a.x >= w - AXO_SIZE) a.vx *= -1;
        if (a.y <= 0 || a.y >= h - AXO_SIZE) a.vy *= -1;

        if (Math.random() < 0.01) {
          a.vx += (Math.random() - 0.5) * 0.12;
          a.vy += (Math.random() - 0.5) * 0.12;
        }

        const vLen = Math.hypot(a.vx, a.vy) || 1;
        const maxIdle = Math.min(a.maxSpeed, 1.15);
        if (vLen > maxIdle) {
          a.vx = (a.vx / vLen) * maxIdle;
          a.vy = (a.vy / vLen) * maxIdle;
        }
      }

      const bob = Math.sin(now / 900 + a.phase) * 1.5;
      const rot = Math.sin(now / 1100 + a.phase) * 2.0;

      if (Math.abs(a.vx) > 0.05) a.flip = a.vx >= 0 ? 1 : -1;

      const sx = a.flip * pulse;
      const sy = pulse;

      a.el.style.transform = `translate(${a.x}px, ${a.y + bob}px) rotate(${rot}deg) scale(${sx}, ${sy})`;
    }

    if (Date.now() >= state.partyUntil) aquarium.classList.remove('aq-party');
    else maybeSpawnPartyBubble();

    requestAnimationFrame(step);
  }

  for (let i = 0; i < AXO_COUNT; i++) createAxolotl();
  requestAnimationFrame(step);
});


