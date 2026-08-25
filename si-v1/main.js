(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copyNodes = [...document.querySelectorAll('[data-en]')];
  copyNodes.forEach((node) => { node.dataset.zh = node.innerHTML; });
  const labelNodes = [...document.querySelectorAll('[data-label-en]')];
  labelNodes.forEach((node) => { node.dataset.labelZh = node.getAttribute('aria-label'); });
  let language = localStorage.getItem('elias-net-si-language') === 'en' ? 'en' : 'zh-Hant';

  const solutionCopy = [
    { zh:['建立穩定的 IT 基礎','環境、備份與容災現況缺少共同基線。','盤點資產與關係，找出斷點與改善順序。','架構圖、風險清單與分階段改善路徑。','準備汰換、擴充或重新整理既有環境的企業。'], en:['Build a stable IT foundation','The environment, backups and recovery plans lack a shared baseline.','Map assets and relationships, then identify breakpoints and priorities.','An architecture map, risk list and phased improvement path.','Organizations preparing to replace, expand or reorganize existing infrastructure.'] },
    { zh:['串起分散的系統與服務','據點、雲端、帳號與供應商各自運作。','建立服務關係與權限邊界，整理跨系統交接。','可維護的服務藍圖與清楚責任界線。','多據點、多雲端服務或跨供應商協作的環境。'], en:['Connect scattered systems','Sites, cloud, identities and suppliers operate separately.','Establish service relationships, access boundaries and handoffs.','A maintainable service blueprint with clear ownership.','Multi-site, multi-cloud or cross-supplier operating environments.'] },
    { zh:['讓資安事件更容易理解','監控、日誌與端點訊息重複且缺少脈絡。','依資產、服務與時間關聯事件並協助排序。','可閱讀的事件摘要與一致的追蹤路徑。','已有監控工具，但通知量大且事件難排序的團隊。'], en:['Make security events clear','Monitoring, log and endpoint messages repeat without context.','Correlate events by asset, service and time, then help prioritize.','Readable event summaries and a consistent tracking path.','Teams with monitoring tools but excessive notifications and unclear priorities.'] },
    { zh:['降低重複維運工作','例行作業依賴個人習慣，結果難以回顧。','把步驟、核准與結果整理成標準流程。','可控、可追蹤且能持續改善的作業方式。','巡檢、帳號或維護工作重複且缺乏一致紀錄的環境。'], en:['Reduce repetitive operations','Routine work depends on personal habits and is hard to review.','Turn steps, approvals and results into standard workflows.','Controlled, traceable operations that can improve over time.','Environments with repetitive inspections, identity or maintenance work and inconsistent records.'] },
    { zh:['協助夜間與假日值班','通知量大，值班人員難以快速掌握影響。','彙整重要事件、脈絡與建議檢查順序。','較低的通知噪音與更清楚的交接資訊。','需要非上班時段事件整理與人員接手的資訊團隊。'], en:['Support night and holiday duty','High notification volume makes impact hard to assess quickly.','Summarize important events, context and suggested checks.','Lower notification noise and clearer handoff information.','IT teams that need off-hours event context and clear human handoff.'] },
    { zh:['重要操作保留人員決定','高影響動作若缺少核准，責任與風險不清。','讓流程停在執行前確認點，記錄目標、原因與核准。','受控的決策路徑與完整稽核紀錄。','需要自動化，但必須保留核准與責任界線的環境。'], en:['Keep critical actions human-led','Without approval, high-impact actions lack clear accountability.','Stop at a pre-execution approval point and record target, reason and approval.','A controlled decision path with a complete audit trail.','Environments that need automation while preserving approval and accountability.'] },
    { zh:['將處理經驗轉成團隊知識','判斷依據散落在訊息與個人經驗中。','整理事件、Runbook、決策與處理結果。','可搜尋、可回顧且能交接的團隊知識。','維運知識集中、交接困難或需要建立共同處理方式的團隊。'], en:['Turn experience into team knowledge','Decision context is scattered across messages and personal experience.','Organize events, runbooks, decisions and outcomes.','Searchable, reviewable knowledge that can be handed over.','Teams with concentrated knowledge, difficult handoffs or a need for shared operating practices.'] }
  ];

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    root.lang = language;
    copyNodes.forEach((node) => { node.innerHTML = language === 'en' ? node.dataset.en : node.dataset.zh; });
    labelNodes.forEach((node) => node.setAttribute('aria-label', language === 'en' ? node.dataset.labelEn : node.dataset.labelZh));
    document.querySelectorAll('[data-lang]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    document.title = language === 'en' ? 'Elias Net | Infrastructure, Security & AI Operations Integrator' : 'Elias Net｜企業 IT 與 AI 智慧維運系統整合服務商';
    const activeSolution = Number(document.querySelector('[data-solution][aria-selected="true"]')?.dataset.solution || 0);
    renderSolution(activeSolution);
    renderVisionLanguage();
    renderProblemImpact();
    renderJourneyLanguage();
    renderDeliveryLanguage();
    renderGovernance();
    renderReadiness();
    localStorage.setItem('elias-net-si-language', language);
  }

  document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));

  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const closeMenu = (restoreFocus = false) => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(true); });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
      if (entry.target.matches('[data-service-item]')) entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal,[data-service-item]').forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-section]').forEach((section) => sectionObserver.observe(section));

  const visionSystem = document.querySelector('[data-vision-system]');
  const visionStages = [...document.querySelectorAll('[data-vision-stage]')];
  const visionStatus = document.querySelector('[data-vision-status]');
  const visionState = { timers: [], played: false, running: false, complete: false, stage: -1 };
  function clearVisionTimers() { visionState.timers.forEach(window.clearTimeout); visionState.timers = []; }
  function renderVisionLanguage() {
    if (visionState.complete) visionStatus.textContent = language === 'en' ? 'Complexity has become an operable blueprint' : '複雜系統，已形成穩定藍圖';
    else if (visionState.running) visionStatus.textContent = language === 'en' ? `Stage ${visionState.stage + 1} of 5 · Organizing the system` : `階段 ${visionState.stage + 1} / 5 · 正在整理系統`;
    else visionStatus.textContent = language === 'en' ? 'Ready to organize distributed signals' : '準備整理分散訊號';
  }
  function completeVision() {
    clearVisionTimers(); visionState.running = false; visionState.complete = true; visionState.stage = 4;
    visionSystem.classList.remove('running'); visionSystem.classList.add('complete');
    visionStages.forEach((stage) => stage.classList.add('complete'));
    renderVisionLanguage();
  }
  function runVision() {
    clearVisionTimers(); visionState.played = true; visionState.running = true; visionState.complete = false; visionState.stage = -1;
    visionSystem.classList.remove('complete'); visionSystem.classList.add('running'); visionStages.forEach((stage) => stage.classList.remove('active','complete'));
    if (reduceMotion.matches) { completeVision(); return; }
    visionStages.forEach((stage, index) => {
      visionState.timers.push(window.setTimeout(() => {
        visionState.stage = index;
        visionStages.forEach((item, itemIndex) => { item.classList.toggle('active', itemIndex === index); if (itemIndex < index) item.classList.add('complete'); });
        renderVisionLanguage();
      }, 600 + index * 1100));
    });
    visionState.timers.push(window.setTimeout(completeVision, 6300));
  }
  document.querySelector('[data-vision-replay]').addEventListener('click', runVision);
  const visionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting && !visionState.played) runVision();
  }), { threshold: 0.18 });
  visionObserver.observe(visionSystem);

  const problemImpact = document.querySelector('[data-problem-impact]');
  const problemTopology = document.querySelector('[data-problem-topology]');
  const problemButtons = [...document.querySelectorAll('[data-problem]')];
  const topologyState = document.querySelector('[data-topology-state]');
  const problemDemo = { timers: [], played: false, complete: false, locked: false };
  let activeProblem = null;
  function clearProblemTimers() { problemDemo.timers.forEach(window.clearTimeout); problemDemo.timers = []; }
  function renderProblemImpact() {
    if (activeProblem) {
      problemImpact.textContent = language === 'en'
        ? `${activeProblem.dataset.problemEn} · ${activeProblem.dataset.serviceEn}`
        : `${activeProblem.dataset.problem}｜${activeProblem.dataset.service}`;
      topologyState.textContent = problemDemo.locked ? 'NODE LOCKED · IMPACT VIEW' : 'IMPACT PREVIEW';
    } else if (problemDemo.complete) {
      problemImpact.textContent = language === 'en' ? 'Relationships mapped and routed to the right service' : '關聯完成，問題已分流至對應服務';
      topologyState.textContent = 'RELATIONSHIPS MAPPED';
    } else {
      problemImpact.textContent = language === 'en' ? 'Mapping relationships between systems' : '正在整理系統關聯';
      topologyState.textContent = 'RELATIONSHIP MAPPING';
    }
  }
  function finishProblemDemo() {
    clearProblemTimers(); problemDemo.complete = true; activeProblem = null;
    problemButtons.forEach((button) => button.classList.remove('demo-active'));
    problemTopology.classList.add('mapped'); renderProblemImpact();
  }
  function runProblemDemo() {
    clearProblemTimers(); problemDemo.played = true; problemDemo.complete = false; problemDemo.locked = false; activeProblem = null;
    problemTopology.classList.remove('mapped');
    problemButtons.forEach((button) => { button.classList.remove('active','demo-active'); button.setAttribute('aria-pressed','false'); });
    if (reduceMotion.matches) { finishProblemDemo(); return; }
    problemButtons.forEach((button, index) => problemDemo.timers.push(window.setTimeout(() => {
      problemButtons.forEach((item) => item.classList.remove('demo-active'));
      button.classList.add('demo-active'); activeProblem = button; renderProblemImpact();
    }, 450 + index * 720)));
    problemDemo.timers.push(window.setTimeout(finishProblemDemo, 4500));
  }
  problemButtons.forEach((button) => {
    button.addEventListener('pointerenter', () => { if (!problemDemo.locked) { activeProblem = button; renderProblemImpact(); } });
    button.addEventListener('pointerleave', () => { if (!problemDemo.locked) { activeProblem = null; renderProblemImpact(); } });
    button.addEventListener('click', () => {
      problemButtons.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-pressed','false'); });
      button.classList.add('active');
      button.setAttribute('aria-pressed','true'); activeProblem = button; problemDemo.locked = true;
      renderProblemImpact();
    });
  });
  const problemObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting && !problemDemo.played) runProblemDemo();
  }), { threshold: 0.1 });
  problemObserver.observe(problemTopology);

  const solutionPanel = document.querySelector('[data-solution-panel]');
  function renderSolution(index) {
    const item = solutionCopy[index][language === 'en' ? 'en' : 'zh'];
    solutionPanel.querySelector('.solution-index').textContent = `SOLUTION ${String(index + 1).padStart(2, '0')}`;
    solutionPanel.querySelector('[data-solution-title]').textContent = item[0];
    solutionPanel.querySelector('[data-solution-problem]').textContent = item[1];
    solutionPanel.querySelector('[data-solution-method]').textContent = item[2];
    solutionPanel.querySelector('[data-solution-outcome]').textContent = item[3];
    solutionPanel.querySelector('[data-solution-fit]').textContent = item[4];
    solutionPanel.setAttribute('aria-labelledby', `solution-tab-${index}`);
  }
  document.querySelectorAll('[data-solution]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-solution]').forEach((item) => {
        item.setAttribute('aria-selected', 'false');
        item.tabIndex = -1;
      });
      button.setAttribute('aria-selected', 'true');
      button.tabIndex = 0;
      renderSolution(Number(button.dataset.solution));
    });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const buttons = [...document.querySelectorAll('[data-solution]')];
      const offset = ['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1;
      const next = buttons[(buttons.indexOf(button) + offset + buttons.length) % buttons.length];
      next.click(); next.focus();
    });
  });

  const journey = {
    index: 0, timer: 0, running: false, paused: false, waiting: false, completed: false,
    items: [...document.querySelectorAll('[data-journey] li')],
    nodes: [...document.querySelectorAll('[data-journey-node]')],
    start: document.querySelector('[data-journey-start]'),
    pause: document.querySelector('[data-journey-pause]'),
    reset: document.querySelector('[data-journey-reset]'),
    approve: document.querySelector('[data-approve]'),
    status: document.querySelector('[data-journey-status]')
  };
  const journeyMessage = (zh, en) => { journey.status.textContent = language === 'en' ? en : zh; };
  function renderJourneyLanguage() {
    journey.pause.textContent = journey.paused
      ? (language === 'en' ? 'Resume' : '繼續')
      : (language === 'en' ? 'Pause' : '暫停');
    if (journey.waiting) {
      journeyMessage('流程已停在人員確認。模擬核准後才會繼續。','The flow is paused at human confirmation. Simulate approval to continue.');
    } else if (journey.paused) {
      journeyMessage('動畫已暫停。','Animation paused.');
    } else if (journey.completed) {
      journeyMessage('模擬完成。Actual Action：0，未操作真實設備。','Demo completed. Actual Action: 0. No real device was operated.');
    } else if (journey.running && journey.index === 0) {
      journeyMessage('事件旅程開始。僅播放本機模擬資料。','Event journey started with local demo data only.');
    } else if (journey.running) {
      journeyMessage(`步驟 ${journey.index + 1} / 8：${journey.items[journey.index].querySelector('b').textContent}`,`Step ${journey.index + 1} / 8: ${journey.items[journey.index].querySelector('b').textContent}`);
    } else {
      journeyMessage('準備完成。未連接真實設備。','Ready. No real device is connected.');
    }
  }
  function paintJourney() {
    journey.items.forEach((item, index) => {
      item.classList.toggle('active', index === journey.index);
      item.classList.toggle('complete', index < journey.index);
      journey.nodes[index].setAttribute('aria-current', index === journey.index ? 'step' : 'false');
    });
  }
  function clearJourneyTimer() { window.clearTimeout(journey.timer); journey.timer = 0; }
  function scheduleJourney() {
    clearJourneyTimer();
    if (!journey.running || journey.paused || journey.waiting || document.hidden) return;
    if (reduceMotion.matches) { stepJourney(); return; }
    journey.timer = window.setTimeout(stepJourney, 1150);
  }
  function stepJourney() {
    if (!journey.running || journey.paused || journey.waiting) return;
    if (journey.index === 5) {
      journey.waiting = true;
      journey.approve.hidden = false;
      journey.pause.disabled = true;
      journeyMessage('流程已停在人員確認。模擬核准後才會繼續。','The flow is paused at human confirmation. Simulate approval to continue.');
      return;
    }
    if (journey.index >= journey.items.length - 1) {
      journey.running = false; journey.completed = true; journey.pause.disabled = true;
      journeyMessage('模擬完成。Actual Action：0，未操作真實設備。','Demo completed. Actual Action: 0. No real device was operated.');
      return;
    }
    journey.index += 1; paintJourney();
    journeyMessage(`步驟 ${journey.index + 1} / 8：${journey.items[journey.index].querySelector('b').textContent}`,`Step ${journey.index + 1} / 8: ${journey.items[journey.index].querySelector('b').textContent}`);
    scheduleJourney();
  }
  function startJourney() {
    if (journey.index >= journey.items.length - 1) journey.index = 0;
    journey.running = true; journey.paused = false; journey.waiting = false; journey.completed = false;
    journey.approve.hidden = true; journey.pause.disabled = false;
    journey.pause.textContent = language === 'en' ? 'Pause' : '暫停';
    paintJourney(); journeyMessage('事件旅程開始。僅播放本機模擬資料。','Event journey started with local demo data only.'); scheduleJourney();
  }
  function resetJourney() {
    clearJourneyTimer(); journey.index = 0; journey.running = false; journey.paused = false; journey.waiting = false; journey.completed = false;
    journey.approve.hidden = true; journey.pause.disabled = true; paintJourney();
    journeyMessage('準備完成。未連接真實設備。','Ready. No real device is connected.');
  }
  journey.start.addEventListener('click', startJourney);
  journey.reset.addEventListener('click', () => { resetJourney(); startJourney(); });
  journey.pause.addEventListener('click', () => {
    journey.paused = !journey.paused;
    journey.pause.textContent = journey.paused ? (language === 'en' ? 'Resume' : '繼續') : (language === 'en' ? 'Pause' : '暫停');
    journeyMessage(journey.paused ? '動畫已暫停。' : '動畫繼續。',journey.paused ? 'Animation paused.' : 'Animation resumed.');
    if (journey.paused) clearJourneyTimer(); else scheduleJourney();
  });
  journey.approve.addEventListener('click', () => {
    journey.waiting = false; journey.approve.hidden = true; journey.pause.disabled = false; journey.index = 6; paintJourney();
    journeyMessage('已完成模擬核准；未執行真實操作。','Simulated approval completed; no real action was executed.'); scheduleJourney();
  });
  journey.nodes.forEach((node, index) => node.addEventListener('click', () => {
    journeyMessage(`檢視步驟 ${index + 1}：${node.querySelector('b').textContent}`,`Viewing step ${index + 1}: ${node.querySelector('b').textContent}`);
  }));

  const deliveryCopy = [
    { zh:['01 / 盤點','先盤點，再改變','掃描資產、服務關係與風險斷點。'], en:['01 / ASSESS','Map before changing','Scan assets, service relationships and risk breakpoints.'] },
    { zh:['02 / 設計','先定義界線，再安排路徑','建立架構、權限邊界與改善順序。'], en:['02 / DESIGN','Define boundaries before the path','Establish architecture, access boundaries and improvement priorities.'] },
    { zh:['03 / 建置','依核准範圍落實變更','依核准範圍部署並記錄每次變更。'], en:['03 / BUILD','Implement within approved scope','Deploy within approved scope and record each change.'] },
    { zh:['04 / 驗證','用證據確認可用與可回復','測試功能、回復、安全與監控結果。'], en:['04 / VERIFY','Prove function and recovery','Test functions, recovery, security and monitoring results.'] },
    { zh:['05 / 持續維運','讓改善成為持續循環','追蹤狀態、事件與後續改善。'], en:['05 / OPERATE','Keep improvement continuous','Track states, events and follow-up improvements.'] }
  ];
  const delivery = {
    root: document.querySelector('[data-delivery-console]'), stages: [...document.querySelectorAll('[data-delivery-stage]')],
    index: 0, timer: 0, running: false, paused: false, complete: false,
    play: document.querySelector('[data-delivery-play]'), pause: document.querySelector('[data-delivery-pause]'), replay: document.querySelector('[data-delivery-replay]')
  };
  function clearDeliveryTimer() { window.clearTimeout(delivery.timer); delivery.timer = 0; }
  function paintDelivery() {
    delivery.stages.forEach((button, index) => {
      button.closest('li').classList.toggle('complete', index <= delivery.index);
      button.classList.toggle('active', index === delivery.index);
      button.setAttribute('aria-current', index === delivery.index ? 'step' : 'false');
    });
    delivery.root.style.setProperty('--delivery-progress', `${delivery.index * 25}%`);
    const copy = deliveryCopy[delivery.index][language === 'en' ? 'en' : 'zh'];
    document.querySelector('[data-delivery-index]').textContent = copy[0];
    document.querySelector('[data-delivery-title]').textContent = copy[1];
    document.querySelector('[data-delivery-description]').textContent = copy[2];
  }
  function renderDeliveryLanguage() {
    delivery.pause.textContent = delivery.paused ? (language === 'en' ? 'Resume' : '繼續') : (language === 'en' ? 'Pause' : '暫停');
    paintDelivery();
  }
  function scheduleDelivery() {
    clearDeliveryTimer();
    if (!delivery.running || delivery.paused || document.hidden) return;
    if (reduceMotion.matches) { delivery.index = 4; delivery.running = false; delivery.complete = true; delivery.pause.disabled = true; paintDelivery(); return; }
    delivery.timer = window.setTimeout(() => {
      if (delivery.index >= 4) { delivery.running = false; delivery.complete = true; delivery.pause.disabled = true; return; }
      delivery.index += 1; paintDelivery(); scheduleDelivery();
    }, 1100);
  }
  function playDelivery(reset = false) {
    if (reset || delivery.complete) { delivery.index = 0; delivery.complete = false; delivery.stages.forEach((item) => item.closest('li').classList.remove('complete')); }
    delivery.running = true; delivery.paused = false; delivery.pause.disabled = false; renderDeliveryLanguage(); scheduleDelivery();
  }
  delivery.play.addEventListener('click', () => playDelivery(false));
  delivery.replay.addEventListener('click', () => playDelivery(true));
  delivery.pause.addEventListener('click', () => {
    delivery.paused = !delivery.paused; renderDeliveryLanguage();
    if (delivery.paused) clearDeliveryTimer(); else scheduleDelivery();
  });
  delivery.stages.forEach((button, index) => button.addEventListener('click', () => {
    clearDeliveryTimer(); delivery.index = index; delivery.running = false; delivery.paused = false; delivery.pause.disabled = true; paintDelivery();
  }));

  const governanceButtons = [...document.querySelectorAll('[data-governance]')];
  let activeGovernance = governanceButtons[0];
  function renderGovernance() {
    governanceButtons.forEach((button) => { const active = button === activeGovernance; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
    document.querySelector('[data-governance-protect]').textContent = language === 'en' ? activeGovernance.dataset.protectEn : activeGovernance.dataset.protect;
    document.querySelector('[data-governance-apply]').textContent = language === 'en' ? activeGovernance.dataset.applyEn : activeGovernance.dataset.apply;
    document.querySelector('[data-governance-why]').textContent = language === 'en' ? activeGovernance.dataset.whyEn : activeGovernance.dataset.why;
  }
  governanceButtons.forEach((button) => button.addEventListener('click', () => { activeGovernance = button; renderGovernance(); }));

  const readinessData = {
    infrastructure: { zh:['設備老舊或版本不一致','備份與回復路徑不清楚','缺少完整資產關係圖'], en:['Aging or inconsistent equipment','Unclear backup and recovery paths','No complete asset relationship map'], resultZh:'建議先從「現況盤點與風險排序」開始。', resultEn:'Start with current-state assessment and risk prioritization.', deliveryZh:'資產關係圖、風險清單與分階段改善方向。', deliveryEn:'Asset relationship map, risk list and phased improvement direction.' },
    cloud: { zh:['帳號生命週期分散','權限界線不清楚','雲端服務缺乏整體管理'], en:['Distributed account lifecycles','Unclear access boundaries','Cloud services lack unified management'], resultZh:'建議先從「身分與服務關係盤點」開始。', resultEn:'Start with identity and service relationship assessment.', deliveryZh:'帳號流程圖、權限邊界與服務責任清單。', deliveryEn:'Identity flow map, access boundaries and service ownership list.' },
    security: { zh:['告警量過多','事件缺少資產脈絡','跨工具追蹤困難'], en:['Excessive alert volume','Events lack asset context','Cross-tool tracking is difficult'], resultZh:'建議先從「事件來源與優先順序盤點」開始。', resultEn:'Start with event-source and priority assessment.', deliveryZh:'事件來源圖、重複規則與優先處理方向。', deliveryEn:'Event source map, duplication rules and priority actions.' },
    automation: { zh:['作業依賴個人習慣','核准流程不清楚','執行結果難以回顧'], en:['Work depends on personal habits','Approval flow is unclear','Execution results are hard to review'], resultZh:'建議先從「作業流程與核准點盤點」開始。', resultEn:'Start with workflow and approval-point assessment.', deliveryZh:'標準步驟、核准界線與稽核紀錄需求。', deliveryEn:'Standard steps, approval boundaries and audit record requirements.' },
    ai: { zh:['告警內容難以快速理解','值班通知缺少脈絡','重要操作需要人員確認'], en:['Alerts are hard to understand quickly','On-call notices lack context','Critical actions require human review'], resultZh:'建議先從「唯讀事件旅程驗證」開始。', resultEn:'Start with a read-only event journey validation.', deliveryZh:'匿名化樣本、判讀流程與執行前確認規則。', deliveryEn:'Anonymized samples, interpretation flow and pre-execution review rules.' }
  };
  const readiness = { type: null, difficulty: null, generated: false, difficulties: document.querySelector('[data-readiness-difficulties]'), generate: document.querySelector('[data-readiness-generate]'), result: document.querySelector('[data-readiness-result]') };
  function renderReadiness() {
    document.querySelectorAll('[data-readiness-type]').forEach((button) => button.setAttribute('aria-pressed',String(button.dataset.readinessType === readiness.type)));
    if (!readiness.type) { readiness.difficulties.innerHTML = `<p>${language === 'en' ? 'Select a priority in step one.' : '請先選擇第一步需求。'}</p>`; readiness.generate.disabled = true; return; }
    const data = readinessData[readiness.type];
    const labels = data[language === 'en' ? 'en' : 'zh'];
    readiness.difficulties.innerHTML = labels.map((label,index) => `<button type="button" data-readiness-difficulty="${index}" aria-pressed="${String(readiness.difficulty === index)}">${label}</button>`).join('');
    readiness.difficulties.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => { readiness.difficulty = Number(button.dataset.readinessDifficulty); readiness.generated = false; renderReadiness(); }));
    readiness.generate.disabled = readiness.difficulty === null;
    if (readiness.generated) {
      readiness.result.innerHTML = `<strong>${language === 'en' ? data.resultEn : data.resultZh}</strong><p>${language === 'en' ? 'Expected deliverables: ' + data.deliveryEn : '預計交付：' + data.deliveryZh}</p>`;
      readiness.result.closest('.readiness-output').classList.add('generated');
    } else {
      readiness.result.innerHTML = `<strong>${language === 'en' ? 'Ready to generate a local suggestion' : '可產生本機建議'}</strong><p>${language === 'en' ? 'No data will be sent or stored.' : '不會傳送或儲存任何資料。'}</p>`;
      readiness.result.closest('.readiness-output').classList.remove('generated');
    }
  }
  document.querySelectorAll('[data-readiness-type]').forEach((button) => button.addEventListener('click', () => { readiness.type = button.dataset.readinessType; readiness.difficulty = null; readiness.generated = false; renderReadiness(); }));
  readiness.generate.addEventListener('click', () => { if (readiness.type && readiness.difficulty !== null) { readiness.generated = true; renderReadiness(); } });
  document.querySelector('[data-footer-demo-subscribe]').addEventListener('click', () => {
    document.querySelector('[data-footer-subscribe-status]').textContent = language === 'en' ? 'Demo completed. No email was collected.' : '展示完成，未蒐集或傳送 Email。';
  });

  const deliveryObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting && !delivery.running && !delivery.complete) playDelivery(false);
  }), { threshold: 0.1 });
  deliveryObserver.observe(delivery.root);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearJourneyTimer(); clearVisionTimers(); clearProblemTimers(); clearDeliveryTimer(); }
    else {
      scheduleJourney();
      if (visionState.running) runVision();
      if (problemDemo.played && !problemDemo.complete) runProblemDemo();
      if (delivery.running && !delivery.paused) scheduleDelivery();
    }
  });

  let returnFocus = null;
  function openDialog(dialog, trigger) {
    returnFocus = trigger;
    dialog.showModal();
    requestAnimationFrame(() => (dialog.querySelector('button,input,select,textarea') || dialog).focus());
  }
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('close', () => { if (returnFocus) returnFocus.focus(); });
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); dialog.close(); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button:not([disabled]),input,select,textarea,a[href]')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
  const serviceDialog = document.querySelector('[data-service-dialog]');
  document.querySelectorAll('[data-detail-open]').forEach((button) => button.addEventListener('click', () => {
    serviceDialog.querySelector('[data-dialog-title]').textContent = language === 'en' ? button.dataset.titleEn : button.dataset.title;
    serviceDialog.querySelector('[data-dialog-scenario]').textContent = language === 'en' ? button.dataset.scenarioEn : button.dataset.scenario;
    openDialog(serviceDialog, button);
  }));
  const methodDialog = document.querySelector('[data-method-dialog]');
  document.querySelector('[data-method-open]').addEventListener('click', (event) => openDialog(methodDialog, event.currentTarget));
  const contactDialog = document.querySelector('[data-contact-dialog]');
  document.querySelectorAll('[data-contact-open]').forEach((button) => button.addEventListener('click', () => {
    contactDialog.querySelector('select').value = button.dataset.topic || 'integration'; openDialog(contactDialog, button);
  }));
  contactDialog.querySelector('[data-dialog-close]').addEventListener('click', () => contactDialog.close());
  contactDialog.querySelector('[data-demo-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const status = contactDialog.querySelector('[data-form-status]');
    status.textContent = language === 'en' ? 'Demo completed. No information was sent or stored.' : '展示完成，未傳送或儲存任何資料。';
    event.currentTarget.reset();
  });

  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
  applyLanguage(language);
  renderSolution(0);
  paintJourney();
})();
