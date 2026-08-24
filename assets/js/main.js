(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storage = {
    get(key, fallback) {
      try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (_) { /* Storage can be unavailable. */ }
    }
  };

  const motionButtons = [...document.querySelectorAll('[data-motion-mode]')];
  const allowedMotion = ['static', 'standard', 'rich'];
  let selectedMotion = storage.get('blockops-world-effects', storage.get('blockops-motion', 'standard'));
  if (!allowedMotion.includes(selectedMotion)) selectedMotion = 'standard';
  const allowedWorldModes = ['realtime', 'demo', 'manual'];
  const savedWorldMode = storage.get('blockops-world-mode', 'realtime');
  const worldState = {
    worldMode: allowedWorldModes.includes(savedWorldMode) ? savedWorldMode : 'realtime',
    worldPhase: 'day',
    effectLevel: selectedMotion,
    soundEnabled: false,
    reducedMotion: reducedQuery.matches,
    activeSection: 'home',
    demoEventState: 'idle'
  };
  root.dataset.soundEnabled = 'false';
  root.dataset.reducedMotion = String(worldState.reducedMotion);
  root.dataset.activeSection = worldState.activeSection;
  root.dataset.demoEventState = worldState.demoEventState;
  Object.defineProperty(window, 'BLOCKOPS_WORLD_STATE', { get: () => Object.freeze({ ...worldState }) });

  function applyMotion(mode, save = true) {
    selectedMotion = allowedMotion.includes(mode) ? mode : 'standard';
    const effective = reducedQuery.matches ? 'static' : selectedMotion;
    worldState.effectLevel = selectedMotion;
    worldState.reducedMotion = reducedQuery.matches;
    root.dataset.effectLevel = selectedMotion;
    root.dataset.reducedMotion = String(worldState.reducedMotion);
    root.dataset.motion = selectedMotion;
    root.dataset.motionEffective = effective;
    motionButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.motionMode === selectedMotion)));
    if (save) storage.set('blockops-world-effects', selectedMotion);
  }
  motionButtons.forEach((button) => button.addEventListener('click', () => applyMotion(button.dataset.motionMode)));
  const onReducedChange = () => applyMotion(selectedMotion, false);
  if (reducedQuery.addEventListener) reducedQuery.addEventListener('change', onReducedChange);
  else reducedQuery.addListener(onReducedChange);
  applyMotion(selectedMotion, false);

  const intro = document.querySelector('#intro');
  const skipIntro = document.querySelector('#skipIntro');
  let introTimer;
  function closeIntro() {
    if (!intro || intro.classList.contains('is-hidden')) return;
    window.clearTimeout(introTimer);
    intro.classList.add('is-hidden');
    intro.setAttribute('aria-hidden', 'true');
    try { sessionStorage.setItem('blockops-intro-seen', 'true'); } catch (_) { /* Session storage is optional. */ }
  }
  if (intro) {
    let seen = false;
    try { seen = sessionStorage.getItem('blockops-intro-seen') === 'true'; } catch (_) { /* Continue with intro. */ }
    if (seen || reducedQuery.matches) closeIntro();
    else introTimer = window.setTimeout(closeIntro, 1550);
  }
  skipIntro?.addEventListener('click', closeIntro);

  const themeToggle = document.querySelector('#themeToggle');
  const celestialToggle = document.querySelector('#celestialToggle');
  const worldModeButtons = [...document.querySelectorAll('[data-world-mode]')];
  const worldClock = document.querySelector('#worldClock');
  const worldPhaseLabel = document.querySelector('#worldPhaseLabel');
  const worldOperation = document.querySelector('#worldOperation');
  const worldModeStatus = document.querySelector('#worldModeStatus');
  let manualPhase = storage.get('blockops-manual-phase', 'day') === 'night' ? 'night' : 'day';
  let demoElapsed = 0;
  let lastWorldFrame = 0;
  let worldFrame = 0;
  let heroIsVisible = true;

  function setWorldPhase(phase, displayMinutes) {
    worldState.worldPhase = phase;
    root.dataset.worldPhase = phase;
    root.dataset.theme = phase === 'night' ? 'night' : 'day';
    const night = phase === 'night';
    themeToggle?.setAttribute('aria-pressed', String(night));
    themeToggle?.setAttribute('aria-label', night ? '手動切換為白天' : '手動切換為夜間');
    if (worldPhaseLabel) worldPhaseLabel.textContent = phase.toUpperCase();
    if (worldOperation) worldOperation.textContent = night ? '值班協作' : phase === 'sunset' ? '交接準備' : phase === 'sunrise' ? '晨間檢查' : '一般巡檢';
    if (worldClock) {
      const minutes = Math.max(0, Math.floor(displayMinutes)) % 1440;
      const value = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
      worldClock.textContent = value;
      worldClock.dateTime = value;
    }
  }
  function updateWorld(now) {
    if (worldState.worldMode === 'realtime') {
      const local = new Date();
      const minutes = local.getHours() * 60 + local.getMinutes();
      setWorldPhase(minutes >= 420 && minutes < 1080 ? 'day' : 'night', minutes);
    } else if (worldState.worldMode === 'manual') {
      setWorldPhase(manualPhase, manualPhase === 'day' ? 720 : 1380);
    } else {
      if (lastWorldFrame) demoElapsed = (demoElapsed + Math.min(now - lastWorldFrame, 100)) % 75000;
      const progress = demoElapsed / 75000;
      const phase = progress < .43 ? 'day' : progress < .55 ? 'sunset' : progress < .88 ? 'night' : 'sunrise';
      root.style.setProperty('--world-cycle', `${Math.round(progress * 100)}%`);
      setWorldPhase(phase, progress * 1440);
    }
    lastWorldFrame = now;
  }
  function worldLoop(now) {
    if (!document.hidden && heroIsVisible) updateWorld(now);
    worldFrame = window.requestAnimationFrame(worldLoop);
  }
  function selectWorldMode(mode, save = true) {
    worldState.worldMode = allowedWorldModes.includes(mode) ? mode : 'realtime';
    root.dataset.worldMode = worldState.worldMode;
    if (worldState.worldMode === 'demo') { demoElapsed = 0; lastWorldFrame = 0; }
    worldModeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.worldMode === worldState.worldMode)));
    if (worldModeStatus) worldModeStatus.textContent = worldState.worldMode === 'realtime' ? '依瀏覽器本機時間同步。' : worldState.worldMode === 'demo' ? '約 75 秒完成白天、黃昏、夜間與清晨循環。' : '手動模式：點擊太陽／月亮切換。';
    if (save) storage.set('blockops-world-mode', worldState.worldMode);
    updateWorld(performance.now());
  }
  function toggleManualWorld() {
    manualPhase = worldState.worldPhase === 'night' ? 'day' : 'night';
    storage.set('blockops-manual-phase', manualPhase);
    selectWorldMode('manual');
  }
  worldModeButtons.forEach((button) => button.addEventListener('click', () => selectWorldMode(button.dataset.worldMode)));
  themeToggle?.addEventListener('click', toggleManualWorld);
  celestialToggle?.addEventListener('click', toggleManualWorld);
  selectWorldMode(worldState.worldMode, false);
  worldFrame = window.requestAnimationFrame(worldLoop);

  const previewAudio = document.querySelector('#previewAudio');
  const audioPlay = document.querySelector('#audioPlay');
  const audioPause = document.querySelector('#audioPause');
  const audioMute = document.querySelector('#audioMute');
  const audioVolume = document.querySelector('#audioVolume');
  const audioVolumeValue = document.querySelector('#audioVolumeValue');
  const audioStatus = document.querySelector('#audioStatus');
  const audioControls = [audioPlay, audioPause, audioMute, audioVolume].filter(Boolean);
  let audioInitialized = false;

  function setAudioControls(enabled) {
    audioControls.forEach((control) => { control.disabled = !enabled; });
  }
  function setAudioStatus(message) {
    if (audioStatus) audioStatus.textContent = message;
  }
  async function playLocalPreviewAudio() {
    if (!previewAudio) return;
    if (!audioInitialized) {
      previewAudio.src = 'assets/audio/local-preview/local-preview-bgm.mp3';
      previewAudio.volume = 0.2;
      previewAudio.loop = true;
      audioInitialized = true;
      setAudioControls(true);
    }
    try {
      await previewAudio.play();
      worldState.soundEnabled = !previewAudio.muted;
      root.dataset.soundEnabled = String(worldState.soundEnabled);
      setAudioStatus(`播放中｜LOCAL PREVIEW ONLY｜音量 ${Math.round(previewAudio.volume * 100)}%`);
    } catch (_) {
      worldState.soundEnabled = false;
      root.dataset.soundEnabled = 'false';
      setAudioStatus('本機預覽音訊不可用；網站其他功能仍可正常使用。');
    }
  }
  audioPlay?.addEventListener('click', playLocalPreviewAudio);
  audioPause?.addEventListener('click', () => {
    previewAudio?.pause();
    worldState.soundEnabled = false;
    root.dataset.soundEnabled = 'false';
    setAudioStatus('已暫停本機預覽音訊。');
  });
  audioMute?.addEventListener('click', () => {
    if (!previewAudio) return;
    previewAudio.muted = !previewAudio.muted;
    worldState.soundEnabled = !previewAudio.muted && !previewAudio.paused;
    root.dataset.soundEnabled = String(worldState.soundEnabled);
    audioMute.setAttribute('aria-pressed', String(previewAudio.muted));
    audioMute.textContent = previewAudio.muted ? '取消靜音' : '靜音';
    setAudioStatus(previewAudio.muted ? '已靜音。' : previewAudio.paused ? '已取消靜音；音訊目前暫停。' : `播放中｜音量 ${Math.round(previewAudio.volume * 100)}%`);
  });
  audioVolume?.addEventListener('input', () => {
    if (!previewAudio) return;
    previewAudio.volume = Number(audioVolume.value);
    if (audioVolumeValue) audioVolumeValue.textContent = `${Math.round(previewAudio.volume * 100)}%`;
    setAudioStatus(`本機預覽音量 ${Math.round(previewAudio.volume * 100)}%`);
  });
  previewAudio?.addEventListener('error', () => {
    worldState.soundEnabled = false;
    root.dataset.soundEnabled = 'false';
    setAudioControls(false);
    setAudioStatus('本機預覽音訊不存在或無法讀取；網站其他功能仍可正常使用。');
  });

  const loader = document.querySelector('#worldLoader');
  const loaderStatus = document.querySelector('#loaderStatus');
  const loaderSteps = ['LOADING OPERATIONS WORLD', 'CHUNKS READY', 'SECURITY ONLINE', 'AI ASSISTANT READY'];
  document.querySelector('#enterWorld')?.addEventListener('click', () => {
    playLocalPreviewAudio();
    if (!loader || !loaderStatus) return;
    loader.classList.add('is-active');
    loader.setAttribute('aria-hidden', 'false');
    loaderSteps.forEach((message, index) => window.setTimeout(() => { loaderStatus.textContent = message; }, index * 170));
    window.setTimeout(() => loader.classList.add('is-open'), 440);
    window.setTimeout(() => {
      loader.classList.remove('is-active', 'is-open');
      loader.setAttribute('aria-hidden', 'true');
      document.querySelector('#monitoring')?.scrollIntoView({ behavior: reducedQuery.matches ? 'auto' : 'smooth' });
    }, 850);
  });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reducedQuery.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  const ambientItems = [...document.querySelectorAll('.voxel-world, .solution-scene, .night-visual, .node-map, .tech-lab-world, .ops-station, .message-station, .site-footer')];
  if ('IntersectionObserver' in window) {
    const ambientObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting)), { rootMargin: '100px' });
    ambientItems.forEach((item) => ambientObserver.observe(item));
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle('world-active', entry.isIntersecting);
      if (entry.isIntersecting) {
        worldState.activeSection = entry.target.id || 'footer';
        root.dataset.activeSection = worldState.activeSection;
      }
      if (entry.target.id === 'home') heroIsVisible = entry.isIntersecting;
    }), { threshold: 0.08, rootMargin: '80px 0px' });
    document.querySelectorAll('main>section, .site-footer').forEach((section) => sectionObserver.observe(section));
  }
  document.addEventListener('visibilitychange', () => root.classList.toggle('page-hidden', document.hidden));

  const voxelWorld = document.querySelector('#voxelWorld');
  const parallaxLayers = [...document.querySelectorAll('.world-layer[data-depth]')];
  let parallaxFrame = 0;
  voxelWorld?.addEventListener('pointermove', (event) => {
    if (reducedQuery.matches || root.dataset.motionEffective === 'static' || window.innerWidth < 800) return;
    const bounds = voxelWorld.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    window.cancelAnimationFrame(parallaxFrame);
    parallaxFrame = window.requestAnimationFrame(() => parallaxLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = `translate3d(${x * depth * 8}px, ${y * depth * 5}px, 0)`;
    }));
  });
  voxelWorld?.addEventListener('pointerleave', () => parallaxLayers.forEach((layer) => { layer.style.transform = ''; }));

  const solutionSequences = {
    monitoring: ['三台模擬主機正常回報', '其中一台狀態轉為注意', '掃描完成：發現異常', '已整理成 MIS 優先處理摘要'],
    ai: ['事件方塊進入 AI 核心', '依一般、注意、重要進行分類', '產生可能原因與檢查建議', 'AI 提供判讀，最終由 MIS 確認'],
    anonymization: ['讀取模擬事件欄位', '通過匿名化閘門', '已轉換為 HOST-01／USER-A／NET-X', '原始資料未送入公開服務'],
    oncall: ['切換為夜間值班場景', '維運中心依序亮燈', '摘要送往抽象通知管道', '等待 MIS 人工確認'],
    readonly: ['查詢方塊進入 Read Only 閘門', '回傳最多五筆模擬結果', '超出範圍與寫入動作已阻擋', '目前正式能力維持唯讀'],
    approval: ['AI 已產生處置建議', '動作停在鎖定閘門', '等待 MIS 點擊「模擬核准」']
  };
  const solutionTimers = new WeakMap();
  const solutionCards = [...document.querySelectorAll('.solution-card')];
  solutionCards.forEach((card) => {
    const runButton = card.querySelector('.solution-run');
    const approveButton = card.querySelector('.solution-approve');
    const status = card.querySelector('.solution-status');
    const key = card.dataset.solution;
    runButton?.addEventListener('click', () => {
      solutionCards.forEach((candidate) => {
        (solutionTimers.get(candidate) || []).forEach(window.clearTimeout);
        candidate.classList.remove('is-running', 'is-approved');
        const candidateApproval = candidate.querySelector('.solution-approve');
        if (candidateApproval) candidateApproval.disabled = true;
      });
      void card.offsetWidth;
      card.classList.add('is-running');
      if (approveButton) approveButton.disabled = true;
      const timers = [];
      const delay = root.dataset.motionEffective === 'static' ? 160 : 600;
      solutionSequences[key].forEach((message, index) => timers.push(window.setTimeout(() => {
        status.textContent = message;
        if (key === 'approval' && index === solutionSequences[key].length - 1) approveButton.disabled = false;
      }, index * delay)));
      solutionTimers.set(card, timers);
    });
    approveButton?.addEventListener('click', () => {
      card.classList.add('is-approved');
      approveButton.disabled = true;
      status.textContent = '模擬核准完成：可進入受控處置流程（未執行真實 Action）';
    });
  });

  const technology = {
    'local-ai': { mark: 'AI', title: 'Local AI／Qwen', stage: 'PILOT · 離線驗證', summary: '在受控的本機環境協助整理告警與產生檢查建議。', what: '可在本機執行的語言模型能力，用來理解維運文字與事件脈絡。', role: '把分散訊號整理成白話摘要、可能原因與後續檢查清單。', problem: '降低人員閱讀大量原始告警的時間，但不取代專業判斷。', safety: '不直接取得正式寫入權限；輸入需先匿名化，結果由 MIS 確認。' },
    ollama: { mark: 'OR', title: 'Ollama Runtime', stage: '離線驗證', summary: '提供本機模型載入與執行環境。', what: '在指定主機上管理與執行本機模型的 Runtime。', role: '承載 AI 判讀流程，讓測試不必把事件內容送往公開服務。', problem: '協助建立可控、可重現的離線模型驗證環境。', safety: '模型與版本必須受控；Runtime 本身不取得設備操作權限。' },
    wazuh: { mark: 'WQ', title: 'Wazuh Read-only Query', stage: 'READ ONLY · Pilot', summary: '只在核准範圍讀取有限筆數的模擬事件。', what: '受限的資安事件查詢介面。', role: '提供 AI 判讀所需的最少事件脈絡。', problem: '避免為了分析而暴露過多資料或開放修改權限。', safety: '禁止寫入、刪除與設定變更；本展示不連接任何 Wazuh 環境。' },
    gateway: { mark: 'AG', title: 'Anonymization Gateway', stage: 'PILOT · 資料保護', summary: '在資料進入 AI 前先遮蔽敏感欄位。', what: '位於資料來源與分析端之間的匿名化與欄位檢查閘門。', role: '把主機、帳號與位址換成一致的代碼。', problem: '保留判讀關聯，同時降低敏感資訊進入通知或模型的風險。', safety: '採最少資料原則；原始值不顯示於本網站，也不送往外部服務。' },
    chat: { mark: 'GC', title: 'Google Chat Notification', stage: '未來整合規劃', summary: '把核准後的事件摘要送往團隊通訊空間。', what: '企業協作通知管道之一。', role: '傳遞已分級、已匿名化的值班摘要。', problem: '讓人員快速掌握事件類型與建議檢查方向。', safety: '本網站只有抽象圖示，沒有 Webhook、Token 或真實網路請求。' },
    telegram: { mark: 'TG', title: 'Telegram Notification', stage: '未來整合規劃', summary: '作為值班摘要的另一種可選通知管道。', what: '可傳送結構化訊息的通訊服務。', role: '依政策通知指定值班角色，而非廣播原始事件。', problem: '降低非上班時段錯過重要摘要的機率。', safety: '本網站未設定 Bot、Token、帳號或 Webhook，也不傳送任何內容。' },
    hash: { mark: '#', title: 'Hash Integrity', stage: '離線驗證', summary: '用雜湊摘要確認檔案或輸出是否被意外改變。', what: '把內容計算成固定摘要並進行前後比對。', role: '協助驗證離線輸出、設定或審核包的一致性。', problem: '讓審核者能發現內容在傳遞過程中的非預期變化。', safety: '雜湊不是加密也不保存密碼；敏感原文仍必須妥善保護。' },
    tls: { mark: 'TLS', title: 'TLS／憑證', stage: '安全基線', summary: '用加密傳輸與憑證驗證保護服務間連線。', what: 'TLS 提供傳輸加密，憑證協助確認連線對象。', role: '在未來核准整合中保護資料通道與服務身份。', problem: '降低資料被竊聽或連到錯誤端點的風險。', safety: '憑證與私鑰不得放入前端或 Repository；本展示沒有任何私鑰。' },
    audit: { mark: 'LOG', title: 'Audit Log', stage: 'PILOT 設計', summary: '保留查詢、建議、核准與結果的可追溯紀錄。', what: '以固定欄位記錄誰在何時做了哪一項決定。', role: '支援事件回顧、責任邊界與流程改善。', problem: '避免處置只存在口頭或散落訊息，難以追查。', safety: '日誌需限制存取與保存期間，且避免直接記錄不必要的敏感值。' },
    approval: { mark: '✓', title: 'Human Approval', stage: '必要安全閘門', summary: '由 MIS 決定建議是否能進入受控處置流程。', what: '將 AI 建議與實際動作明確分離的人工決策節點。', role: '檢查目標、原因、影響與回復方式後再核准。', problem: '防止模型或自動化流程在缺乏脈絡時執行高風險動作。', safety: '目前不執行任何正式 Action；未來操作仍需最小權限、雙重檢查與稽核。' }
  };

  const techBackdrop = document.querySelector('#techBackdrop');
  const techPanel = document.querySelector('#techPanel');
  const techClose = document.querySelector('#techPanelClose');
  const techLabWorld = document.querySelector('#techLabWorld');
  const techFields = {
    mark: document.querySelector('#techPanelMark'), stage: document.querySelector('#techPanelStage'), title: document.querySelector('#techPanelTitle'),
    summary: document.querySelector('#techPanelSummary'), what: document.querySelector('#techPanelWhat'), role: document.querySelector('#techPanelRole'),
    problem: document.querySelector('#techPanelProblem'), safety: document.querySelector('#techPanelSafety')
  };
  let activeTechTrigger = null;
  function openTech(button) {
    const detail = technology[button.dataset.tech];
    if (!detail || !techBackdrop) return;
    if (activeTechTrigger) activeTechTrigger.setAttribute('aria-expanded', 'false');
    activeTechTrigger = button;
    button.setAttribute('aria-expanded', 'true');
    if (techLabWorld) {
      techLabWorld.dataset.techIndex = button.dataset.techIndex;
      techLabWorld.classList.remove('is-linked');
      void techLabWorld.offsetWidth;
      techLabWorld.classList.add('is-linked');
    }
    Object.keys(techFields).forEach((key) => { techFields[key].textContent = detail[key]; });
    techBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => techPanel?.focus());
  }
  function closeTech(restoreFocus = true) {
    if (!techBackdrop || techBackdrop.hidden) return;
    techBackdrop.hidden = true;
    document.body.style.overflow = '';
    activeTechTrigger?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) activeTechTrigger?.focus();
    activeTechTrigger = null;
  }
  document.querySelectorAll('.tech-module').forEach((button, index) => {
    button.dataset.techIndex = String(index);
    button.addEventListener('click', () => openTech(button));
  });
  techClose?.addEventListener('click', () => closeTech());
  techBackdrop?.addEventListener('click', (event) => { if (event.target === techBackdrop) closeTech(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTech();
    if (event.key === 'Tab' && techBackdrop && !techBackdrop.hidden && techPanel) {
      const focusable = [...techPanel.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const flowDescriptions = [
    '監控事件：接收虛構設備與服務訊號，不包含真實主機資訊。',
    '唯讀查詢：只取得核准範圍與有限筆數，禁止寫入。',
    '匿名化：把主機、帳號與位址換成一致的代碼。',
    'AI 分析：協助分類、摘要與提出下一步檢查建議。',
    'MIS 人工確認：流程暫停，等待人員檢查目標、原因與風險。',
    '通訊通知：以抽象 Chat／Telegram 管道說明核准後的摘要傳遞。',
    '未來受控處置：本展示只說明可能流程，沒有執行任何真實 Action。'
  ];
  const flowBoard = document.querySelector('#flowBoard');
  const flowStatus = document.querySelector('#flowStatus');
  const flowPlay = document.querySelector('#flowPlay');
  const flowApprove = document.querySelector('#flowApprove');
  const flowStop = document.querySelector('#flowStop');
  const flowReplay = document.querySelector('#flowReplay');
  const flowStations = [...document.querySelectorAll('.flow-station')];
  let flowStep = -1;
  let flowTimer = 0;
  let flowRunning = false;
  let flowWaiting = false;
  function showFlowStep(step) {
    flowStep = step;
    flowBoard.dataset.step = String(step);
    flowStations.forEach((station, index) => station.classList.toggle('is-active', index === step));
    if (step >= 0) flowStatus.textContent = flowDescriptions[step];
  }
  function setFlowButtons() {
    flowPlay.disabled = flowRunning || flowWaiting;
    flowApprove.disabled = !flowWaiting;
    flowStop.disabled = !flowRunning && !flowWaiting;
  }
  function scheduleNext() {
    if (!flowRunning) return;
    if (flowStep === 4) {
      flowRunning = false;
      flowWaiting = true;
      flowStatus.textContent += ' 請點擊「模擬 MIS 核准」才能繼續。';
      setFlowButtons();
      return;
    }
    if (flowStep >= 6) {
      flowRunning = false;
      flowStatus.textContent = '流程展示完成：simulate_only=true，未執行真實 Action。';
      setFlowButtons();
      return;
    }
    const delay = root.dataset.motionEffective === 'static' ? 260 : 900;
    flowTimer = window.setTimeout(() => { showFlowStep(flowStep + 1); scheduleNext(); }, delay);
  }
  function startFlow(reset = false) {
    window.clearTimeout(flowTimer);
    if (reset || flowStep >= 6 || flowStep < 0) showFlowStep(-1);
    flowWaiting = false;
    flowRunning = true;
    setFlowButtons();
    showFlowStep(flowStep + 1);
    scheduleNext();
  }
  flowPlay?.addEventListener('click', () => startFlow(false));
  flowReplay?.addEventListener('click', () => startFlow(true));
  flowApprove?.addEventListener('click', () => {
    if (!flowWaiting) return;
    flowWaiting = false;
    flowRunning = true;
    flowStatus.textContent = 'MIS 模擬核准完成；繼續展示通知與未來受控流程。';
    setFlowButtons();
    showFlowStep(5);
    scheduleNext();
  });
  flowStop?.addEventListener('click', () => {
    window.clearTimeout(flowTimer);
    flowRunning = false;
    flowWaiting = false;
    flowStatus.textContent = '動畫已停止；未執行真實 Action。';
    setFlowButtons();
  });
  flowStations.forEach((station, index) => station.addEventListener('click', () => {
    if (!flowRunning && !flowWaiting) { showFlowStep(index); flowStatus.textContent += '（單步說明）'; }
  }));
  setFlowButtons();

  const demoEventPanel = document.querySelector('#demoEventPanel');
  const demoEventStart = document.querySelector('#demoEventStart');
  const demoEventCheck = document.querySelector('#demoEventCheck');
  const demoEventReplay = document.querySelector('#demoEventReplay');
  const demoEventStatus = document.querySelector('#demoEventStatus');
  const demoHost = document.querySelector('#demoHost');
  const demoService = document.querySelector('#demoService');
  const demoRisk = document.querySelector('#demoRisk');
  const demoDevices = [...document.querySelectorAll('.demo-devices i')];
  let demoEventTimer = 0;

  function setDemoEventState(state, message) {
    worldState.demoEventState = state;
    root.dataset.demoEventState = state;
    if (demoEventPanel) demoEventPanel.dataset.eventState = state;
    if (demoEventStatus) demoEventStatus.textContent = message;
  }
  function resetDemoWorld() {
    window.clearTimeout(demoEventTimer);
    voxelWorld?.classList.remove('demo-alert', 'demo-checking', 'demo-done');
    demoDevices.forEach((device) => device.classList.remove('is-target'));
  }
  function startDemoEvent() {
    resetDemoWorld();
    const index = Math.floor(Math.random() * demoDevices.length);
    const selectedDevice = demoDevices[index];
    selectedDevice?.classList.add('is-target');
    voxelWorld?.classList.add('demo-alert');
    if (demoHost) demoHost.textContent = `HOST-DEMO-0${index + 1}`;
    if (demoService) demoService.textContent = 'Unexpected Stop';
    if (demoRisk) demoRisk.textContent = index === 2 ? 'High (Demo)' : 'Medium';
    demoEventStart.disabled = true;
    demoEventCheck.disabled = true;
    demoEventReplay.disabled = true;
    setDemoEventState('alert', '發現匿名模擬事件；工程員正前往檢視。');
    const delay = root.dataset.motionEffective === 'static' ? 260 : 1250;
    demoEventTimer = window.setTimeout(() => {
      setDemoEventState('awaiting', 'AI 已提出檢查建議；等待 MIS 點擊「執行模擬檢查」。');
      demoEventCheck.disabled = false;
    }, delay);
  }
  function runDemoCheck() {
    if (worldState.demoEventState !== 'awaiting') return;
    voxelWorld?.classList.remove('demo-alert');
    voxelWorld?.classList.add('demo-checking');
    demoEventCheck.disabled = true;
    setDemoEventState('checking', '模擬工具與資料掃描中；未執行 Restart、SSH、Shell 或 Firewall Action。');
    const delay = root.dataset.motionEffective === 'static' ? 300 : 1700;
    demoEventTimer = window.setTimeout(() => {
      voxelWorld?.classList.remove('demo-checking');
      voxelWorld?.classList.add('demo-done');
      if (demoService) demoService.textContent = 'Stable (Simulated)';
      if (demoRisk) demoRisk.textContent = 'Resolved (Demo)';
      setDemoEventState('done', 'DEMO COMPLETED｜simulate_only=true｜實際 Action：0｜未操作真實設備');
      demoEventReplay.disabled = false;
    }, delay);
  }
  demoEventStart?.addEventListener('click', startDemoEvent);
  demoEventCheck?.addEventListener('click', runDemoCheck);
  demoEventReplay?.addEventListener('click', startDemoEvent);

  const milestoneButtons = [...document.querySelectorAll('[data-milestone]')];
  const stationWhiteboard = document.querySelector('#stationWhiteboard');
  milestoneButtons.forEach((button) => button.addEventListener('click', () => {
    milestoneButtons.forEach((candidate) => candidate.setAttribute('aria-pressed', String(candidate === button)));
    if (stationWhiteboard) stationWhiteboard.textContent = button.dataset.milestone;
  }));

  const quickLinks = [...document.querySelectorAll('.quickbar a')];
  const quickTargets = quickLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) return;
    const index = Number(event.key) - 1;
    if (index >= 0 && index < quickLinks.length) { event.preventDefault(); quickLinks[index].click(); }
  });
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) quickLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-35% 0px -55% 0px' });
    quickTargets.forEach((target) => navObserver.observe(target));
  }

  const contactForm = document.querySelector('#contactForm');
  const formStatus = document.querySelector('#formStatus');
  const messageStation = document.querySelector('#messageStation');
  let messageTimer = 0;
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    window.clearTimeout(messageTimer);
    const form = event.currentTarget;
    const nameValid = form.elements.name.value.trim().length > 0;
    const emailValue = form.elements.email.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const messageValid = form.elements.message.value.trim().length > 0;
    if (!nameValid || !emailValid || !messageValid) {
      form.classList.add('has-error');
      messageStation.dataset.messageState = 'error';
      formStatus.textContent = !nameValid ? '請先填寫姓名；內容只留在目前頁面。' : !emailValid ? '請輸入正確的 Email 格式；不會傳送資料。' : '請填寫想討論的內容。';
      return;
    }
    form.classList.remove('has-error');
    messageStation.dataset.messageState = 'packing';
    messageStation.querySelector('p').textContent = '正在封裝抽象訊息方塊…';
    formStatus.textContent = '展示模式：正在播放本機封裝動畫，沒有送出 Request。';
    messageTimer = window.setTimeout(() => {
      messageStation.dataset.messageState = 'done';
      messageStation.querySelector('p').textContent = '展示完成，未傳送真實資料。';
      formStatus.textContent = '展示完成，未傳送真實資料。';
    }, root.dataset.motionEffective === 'static' ? 250 : 1100);
  });
})();
