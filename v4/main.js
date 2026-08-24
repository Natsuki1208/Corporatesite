(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const hero = document.querySelector('#hero');
  const stories = [
    {state:'command',accent:'#22c9c3',eyebrow:'AI 營運指揮 · CONCEPT / DEMO',title:'<span class="hero-line">讓訊號清楚可讀，</span><span class="hero-line">讓行動保有控制。</span>',summary:'Elias Net 將監控、遮蔽與代碼化、AI 判讀與人工核准整合成一套受控營運流程。',cta:'探索 Operations Grid',href:'#event-journey',core:'MISSION CORE',gate:'Gate：LOCKED · MIS 決定'},
    {state:'world-model',accent:'#287bff',eyebrow:'營運世界模型 · CONCEPT / DEMO',title:'<span class="hero-line">看見服務關係，</span><span class="hero-line">不只是監控圖表。</span>',summary:'將主機、網路、服務與事件擴散路徑映射成可探索的營運世界。',cta:'探索 World Map',href:'#industries',core:'WORLD MODEL',gate:'Gate：OBSERVE ONLY'},
    {state:'defend',accent:'#d94a45',eyebrow:'資安韌性 · CONCEPT / DEMO',title:'<span class="hero-line">讓安全訊號，</span><span class="hero-line">回到營運脈絡。</span>',summary:'在隔離或處置之前，先理解身分、端點與服務之間的影響關係。',cta:'探索 Cyber Grid',href:'#security',core:'RISK CONTEXT',gate:'Gate：POLICY BLOCK'},
    {state:'control',accent:'#e5a91a',eyebrow:'可控自動化 · CONCEPT / DEMO',title:'<span class="hero-line">可靠的自動化，</span><span class="hero-line">知道何時該停下。</span>',summary:'將檢查、通知與建議組合成可追蹤、可核准、可回復的工作流。',cta:'探索 Flow Engine',href:'#event-journey',core:'FLOW ENGINE',gate:'Gate：APPROVAL REQUIRED'},
    {state:'connect',accent:'#287bff',eyebrow:'混合基礎設施 · CONCEPT / DEMO',title:'<span class="hero-line">從機房到遠端據點，</span><span class="hero-line">維持一致營運視野。</span>',summary:'統整虛擬化、雲端、網路與邊緣節點，同時保留在地操作權限。',cta:'探索 Fabric View',href:'#industries',core:'FABRIC VIEW',gate:'Gate：NO REMOTE ACTION'},
    {state:'learn',accent:'#a78bfa',eyebrow:'營運洞察 · CONCEPT / DEMO',title:'<span class="hero-line">讓每一次事件，</span><span class="hero-line">成為更快決策基礎。</span>',summary:'將任務紀錄與團隊註記整理成可回顧、可持續改善的營運知識。',cta:'探索 Insight Loop',href:'#insights',core:'INSIGHT LOOP',gate:'Gate：AUDIT FIRST'}
  ];
  const storyButtons = [...document.querySelectorAll('[data-story]')];
  let storyIndex = 0;
  const storyDuration = 8000;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let storyCycleFrame = 0;
  let storyCycleStartedAt = 0;
  let storyCycleElapsed = 0;
  let heroIsVisible = true;
  let storyAutoPaused = false;
  let storyInteractionPaused = false;
  const storyCycleToggle = document.querySelector('#storyCycleToggle');

  function setStoryProgress(value) {
    storyButtons[storyIndex]?.style.setProperty('--story-progress', String(value));
  }
  function storyCycleCanRun() {
    return !reducedMotionQuery.matches && !document.hidden && heroIsVisible && !storyAutoPaused && !storyInteractionPaused;
  }
  function stopStoryCycle() {
    if (storyCycleFrame) cancelAnimationFrame(storyCycleFrame);
    storyCycleFrame = 0;
  }
  function runStoryCycle(now) {
    storyCycleFrame = 0;
    if (!storyCycleCanRun()) return;
    if (!storyCycleStartedAt) storyCycleStartedAt = now - storyCycleElapsed;
    storyCycleElapsed = now - storyCycleStartedAt;
    const progress = Math.min(storyCycleElapsed / storyDuration, 1);
    setStoryProgress(progress);
    if (progress >= 1) {
      selectStory((storyIndex + 1) % stories.length, false);
      return;
    }
    storyCycleFrame = requestAnimationFrame(runStoryCycle);
  }
  function ensureStoryCycle() {
    if (!storyCycleFrame && storyCycleCanRun()) storyCycleFrame = requestAnimationFrame(runStoryCycle);
  }
  function restartStoryCycle() {
    storyCycleStartedAt = 0;
    storyCycleElapsed = 0;
    setStoryProgress(0);
    stopStoryCycle();
    ensureStoryCycle();
  }
  function updateStoryCycleControl() {
    const reduced = reducedMotionQuery.matches;
    const paused = reduced || storyAutoPaused;
    storyCycleToggle.disabled = reduced;
    storyCycleToggle.setAttribute('aria-pressed', String(paused));
    storyCycleToggle.querySelector('[aria-hidden]').textContent = paused ? '▶' : 'Ⅱ';
    storyCycleToggle.querySelector('[data-cycle-label]').textContent = reduced ? '已依減少動態設定停用' : paused ? '繼續自動播放' : '暫停自動播放';
  }
  function selectStory(index, announce = true) {
    storyButtons.forEach((button) => button.style.setProperty('--story-progress', '0'));
    storyIndex = Math.max(0, Math.min(stories.length - 1, index));
    const story = stories[storyIndex];
    hero.dataset.storyState = story.state;
    hero.style.setProperty('--story-accent', story.accent);
    hero.classList.remove('is-switching');
    void hero.offsetWidth;
    hero.classList.add('is-switching');
    document.querySelector('#heroEyebrow').textContent = story.eyebrow;
    document.querySelector('#heroTitle').innerHTML = story.title;
    document.querySelector('#heroSummary').textContent = story.summary;
    document.querySelector('#heroCta').firstChild.textContent = `${story.cta} `;
    document.querySelector('#heroCta').setAttribute('href', story.href);
    document.querySelector('#heroCoreLabel').innerHTML = story.core.replace(' ', '<br>');
    document.querySelector('#heroGateStatus').textContent = story.gate;
    storyButtons.forEach((button, i) => {
      button.setAttribute('aria-current', String(i === storyIndex));
      button.tabIndex = i === storyIndex ? 0 : -1;
    });
    if (announce) document.querySelector('#heroStoryStatus').textContent = `第 ${storyIndex + 1} 個主題，共 ${stories.length} 個：${storyButtons[storyIndex].innerText.replace(/\s+/g,' ')}`;
    restartStoryCycle();
  }
  storyButtons.forEach((button) => {
    button.addEventListener('click', () => selectStory(Number(button.dataset.story)));
    button.addEventListener('keydown', (event) => {
      let next = storyIndex;
      if (event.key === 'ArrowRight') next = (storyIndex + 1) % stories.length;
      else if (event.key === 'ArrowLeft') next = (storyIndex - 1 + stories.length) % stories.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = stories.length - 1;
      else return;
      event.preventDefault(); selectStory(next); storyButtons[next].focus();
    });
  });
  storyCycleToggle.addEventListener('click', () => {
    storyAutoPaused = !storyAutoPaused;
    updateStoryCycleControl();
    if (storyAutoPaused) stopStoryCycle();
    else { storyInteractionPaused = false; storyCycleStartedAt = 0; ensureStoryCycle(); }
  });
  updateStoryCycleControl();
  selectStory(0, false);
  hero.addEventListener('mouseenter', () => { storyInteractionPaused = true; stopStoryCycle(); });
  hero.addEventListener('mouseleave', () => { storyInteractionPaused = false; storyCycleStartedAt = 0; ensureStoryCycle(); });
  hero.addEventListener('focusin', () => { storyInteractionPaused = true; stopStoryCycle(); });
  hero.addEventListener('focusout', () => queueMicrotask(() => {
    if (!hero.contains(document.activeElement)) { storyInteractionPaused = false; storyCycleStartedAt = 0; ensureStoryCycle(); }
  }));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopStoryCycle();
    else { storyCycleStartedAt = 0; ensureStoryCycle(); }
  });
  reducedMotionQuery.addEventListener('change', () => {
    updateStoryCycleControl();
    restartStoryCycle();
    if (reducedMotionQuery.matches) setStoryProgress(0);
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroIsVisible = entry.isIntersecting;
      if (heroIsVisible) { storyCycleStartedAt = 0; ensureStoryCycle(); }
      else stopStoryCycle();
    }, { threshold: .2 }).observe(hero);
  }

  const toggle = document.querySelector('#menuToggle');
  const nav = document.querySelector('#primaryNav');
  function closeMenu(returnFocus = false) {
    nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) closeMenu();
    else { nav.classList.add('is-open'); toggle.setAttribute('aria-expanded','true'); document.body.classList.add('menu-open'); nav.querySelector('a').focus(); }
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true); });

  const dialog = document.querySelector('#videoDialog');
  let dialogOpener = null;
  function openDialog(event) { dialogOpener = event.currentTarget; dialog.showModal(); document.querySelector('#videoClose').focus(); }
  function closeDialog() { dialog.close(); }
  document.querySelector('#videoCta').addEventListener('click', openDialog);
  document.querySelectorAll('[data-open-video]').forEach((button) => button.addEventListener('click', openDialog));
  document.querySelector('#videoClose').addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => { if (dialogOpener) dialogOpener.focus(); });

  const pilotDialog = document.querySelector('#pilotDialog');
  let pilotOpener = null;
  document.querySelectorAll('[data-pilot]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); pilotOpener = link; pilotDialog.showModal(); document.querySelector('#pilotClose').focus(); }));
  document.querySelector('#pilotClose').addEventListener('click', () => pilotDialog.close());
  pilotDialog.addEventListener('close', () => { if (pilotOpener) pilotOpener.focus(); });

  const industryMessages = {manufacturing:'智慧製造：彙整產線與服務告警，AI 提供檢查建議，設備操作仍由現場人員確認。',datacenter:'資料中心：整合主機、虛擬化與網路狀態，只讀取核准範圍。',healthcare:'醫療營運：先遮蔽識別資料，再整理系統可用性事件；不接觸醫療診斷。',logistics:'物流與據點：將分散據點狀態整理成摘要，不執行遠端控制。',enterprise:'企業 IT：協助 MIS 排序事件、建立紀錄並保留人工決策。'};
  document.querySelectorAll('[data-industry]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-industry]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#industryStatus').textContent = industryMessages[button.dataset.industry];
  }));

  document.querySelectorAll('[data-demo-article]').forEach((button) => button.addEventListener('click', () => {
    document.querySelector('#demoArticleMessage').textContent = 'CONCEPT PREVIEW：此文章／活動為虛構展示，目前沒有對外發布或報名連結。';
  }));
})();
