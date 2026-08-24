(() => {
  'use strict';
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = motionQuery.matches;
  const timers = new Set();
  function later(callback, delay) { const id = window.setTimeout(() => { timers.delete(id); callback(); }, delay); timers.add(id); return id; }
  function cancel(id) { window.clearTimeout(id); timers.delete(id); }

  const journeyRoot = document.querySelector('#event-journey');
  const cube = document.querySelector('#journeyCube');
  const journeyTrack = journeyRoot.querySelector('.journey-track');
  const journeyTitle = document.querySelector('#journeyStepTitle');
  const badge = document.querySelector('#journeyBadge');
  const fields = document.querySelector('#journeyFields');
  const explain = document.querySelector('#journeyExplain');
  const details = document.querySelector('#journeyDetails');
  const journeyStatus = document.querySelector('#journeyStatus');
  const approve = document.querySelector('#journeyApprove');
  const approveTop = document.querySelector('#journeyApproveTop');
  const pause = document.querySelector('#journeyPause');
  const journeyNodes = [...document.querySelectorAll('[data-journey-node]')];
  const journey = {status:'idle',step:0,timer:0,visible:false,userPaused:false};
  const stages = [
    {badge:'DEMO EVENT',title:'收到本機模擬事件',fields:[['Event','EVENT-DEMO-1042'],['Host','DEMO-HOST-RAW'],['Account','DEMO-OPERATOR'],['Address','ADDR-DEMO-27']],text:'DEMO IDENTIFIERS · NOT REAL DATA。事件只存在於瀏覽器記憶體，不會送到任何服務。',items:['Service State：Unexpected Stop','Risk：Medium','Generated in browser']},
    {badge:'READ ONLY',title:'唯讀查詢核准範圍',fields:[['DEMO QUERY','POLICY ALLOWED'],['Limit','1 / 5 DEMO RECORDS'],['Write','BLOCKED']],text:'資料存取政策在查詢前檢查欄位、範圍與筆數；任何寫入要求都不會通過。',items:['只讀取核准的模擬欄位','不執行 SSH 或 Shell']},
    {badge:'MASKED + CODED',title:'敏感欄位完成遮蔽與代碼化',fields:[['Host','DEMO-HOST-RAW → HOST-DEMO-03'],['User','DEMO-OPERATOR → USER-A'],['Network','ADDR-DEMO-27 → NET-X'],['Event','EVENT-DEMO-1042 → unchanged']],text:'原始對照只留在本機 Gateway 的受控映射區；AI 只接收代碼化的必要營運脈絡。',items:['保留事件關聯能力','原始識別資料不進入 AI 分析流程']},
    {badge:'AI ASSIST',title:'AI 產生輔助判讀',fields:[['OBSERVED','Service State：Unexpected Stop'],['AI HYPOTHESIS','單一示範服務可能受影響'],['SUGGESTED CHECKS','檢查服務狀態與近期事件']],text:'AI 整理證據、提出可能原因與檢查方向；推測不是已確認事實，也不是執行命令。',items:['事件摘要：非預期停止','可能影響：單一示範服務','建議檢查：狀態與近期事件']},
    {badge:'ACTION POLICY',title:'政策引擎限制建議範圍',fields:[['QUERY','ALLOWED'],['NOTIFY','SIMULATED'],['RESTART','BLOCKED'],['FIREWALL','BLOCKED']],text:'即使 AI 提出動作，也不代表它具有執行權。會改變系統狀態的操作一律阻擋。',items:['SSH／Shell／帳號修改：BLOCKED','Policy Scope：DEMO-READONLY-01']},
    {badge:'WAITING FOR HUMAN',title:'等待 MIS 人工確認',fields:[['Decision','PENDING'],['Approval Scope','DEMO PRESENTATION ONLY'],['Actual Action','0']],text:'流程已在人工閘門暫停。確認只會繼續展示，不會授權網站操作設備。',items:['查看建議後再作判斷','未操作真實設備']},
    {badge:'WORKFLOW DEMO COMPLETED',title:'事件處理展示完成',fields:[['Decision','DEMO CONTINUE CONFIRMED'],['Execution','NOT PERFORMED'],['Actual Action','0'],['Mode','simulate_only=true']],text:'完成的是事件處理示範，不是實際排除或設備恢復。',items:['Demo Audit Receipt 已建立','不執行 Restart、SSH、Shell 或 Firewall Action']}
  ];
  function clearJourneyTimer() { if (journey.timer) cancel(journey.timer); journey.timer = 0; }
  function positionJourneyCube() {
    const node = journeyNodes[journey.step];
    if (!node) return;
    const first = journeyNodes[0];
    const last = journeyNodes[journeyNodes.length - 1];
    const trackRect = journeyTrack.getBoundingClientRect();
    const centerOf = item => {
      const rect = item.getBoundingClientRect();
      return rect.left - trackRect.left + rect.width / 2;
    };
    cube.style.setProperty('--journey-x', `${centerOf(node)}px`);
    journeyTrack.style.setProperty('--journey-line-start', `${centerOf(first)}px`);
    journeyTrack.style.setProperty('--journey-line-end', `${centerOf(last)}px`);
  }
  function renderJourney(index) {
    journey.step = index;
    const stage = stages[index];
    positionJourneyCube();
    journeyNodes.forEach((node, i) => { node.classList.toggle('is-current', i === index); node.classList.toggle('is-done', i < index); });
    badge.textContent = stage.badge; journeyTitle.textContent = stage.title; explain.textContent = stage.text;
    fields.innerHTML = stage.fields.map(([key,value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');
    details.innerHTML = stage.items.map(item => `<li>${item}</li>`).join('');
    journeyRoot.dataset.step = String(index);
    journeyRoot.classList.toggle('is-policy', index === 4);
    journeyRoot.classList.toggle('is-waiting', index === 5);
    journeyRoot.classList.toggle('is-complete', index === 6);
    approve.disabled = index !== 5; approveTop.disabled = index !== 5;
    if (index === 5) journey.status = 'awaitingApproval';
    if (index === 6) journey.status = 'completed';
    pause.disabled = journey.status !== 'running' && journey.status !== 'paused';
    pause.setAttribute('aria-pressed', String(journey.status === 'paused'));
    pause.textContent = journey.status === 'paused' ? '繼續自動播放' : '暫停自動播放';
    const action = index === 5 ? '流程已暫停，確認並繼續展示按鈕現在可用。' : index === 6 ? '展示完成，Actual Action 仍為 0。' : '';
    journeyStatus.textContent = `第 ${index + 1}／7 步：${stage.title}。${action}`;
  }
  function scheduleJourney() {
    clearJourneyTimer();
    if (journey.status !== 'running' || !journey.visible || document.hidden || reduceMotion) return;
    journey.timer = later(nextJourney, 3000);
  }
  function nextJourney() {
    if (journey.step >= 4) { renderJourney(5); return; }
    renderJourney(journey.step + 1); scheduleJourney();
  }
  function startJourney() {
    clearJourneyTimer();
    journey.userPaused = false;
    if (reduceMotion) { journey.status = 'awaitingApproval'; renderJourney(5); return; }
    journey.status = 'running'; renderJourney(0); scheduleJourney();
  }
  function pauseJourney(message = true, byUser = true) {
    if (journey.status !== 'running') return;
    clearJourneyTimer(); journey.status = 'paused'; journey.userPaused = byUser; renderJourney(journey.step);
    if (message) journeyStatus.textContent = `第 ${journey.step + 1}／7 步：自動播放已暫停。`;
  }
  function resumeJourney() {
    if (journey.status !== 'paused') return;
    journey.userPaused = false; journey.status = 'running'; renderJourney(journey.step); scheduleJourney();
  }
  pause.addEventListener('click', () => journey.status === 'paused' ? resumeJourney() : pauseJourney());
  approve.addEventListener('click', () => { if (journey.status === 'awaitingApproval') { renderJourney(6); } });
  approveTop.addEventListener('click', () => { if (journey.status === 'awaitingApproval') { renderJourney(6); } });
  window.addEventListener('resize', positionJourneyCube, {passive:true});
  renderJourney(0);

  const futureRoot = document.querySelector('#futureFlow');
  const futureNodes = [...document.querySelectorAll('[data-future-node]')];
  const futurePacket = futureRoot.querySelector('.future-packet');
  const futureStatus = document.querySelector('#futureStatus');
  const futurePause = document.querySelector('#futurePause');
  const future = {status:'idle',step:0,timer:0,visible:false,userPaused:false};
  const futureLabels = ['模擬事件','Classifier：事件分類','Local AI：代碼化脈絡處理','Reasoning：產生檢查建議','Rule Engine：限制允許範圍','Human Gate：最後決定'];
  function clearFutureTimer(){ if(future.timer) cancel(future.timer); future.timer=0; }
  function positionFuturePacket(){
    const node=futureNodes[future.step];
    if(!node)return;
    const first=futureNodes[0];
    const last=futureNodes[futureNodes.length-1];
    const rootRect=futureRoot.getBoundingClientRect();
    const centerOf=item=>{const rect=item.getBoundingClientRect();return rect.left-rootRect.left+rect.width/2};
    futurePacket.style.setProperty('--future-x',`${centerOf(node)}px`);
    futureRoot.style.setProperty('--future-line-start',`${centerOf(first)}px`);
    futureRoot.style.setProperty('--future-line-end',`${centerOf(last)}px`);
  }
  function renderFuture(index){
    future.step=index; positionFuturePacket();
    futureNodes.forEach((node,i)=>{node.classList.toggle('is-current',i===index);node.classList.toggle('is-done',i<index)});
    futureStatus.textContent=`步驟 ${index+1}／6：${futureLabels[index]} · CONCEPT / FUTURE ARCHITECTURE`;
    futurePause.disabled=future.status!=='running'&&future.status!=='paused'; futurePause.setAttribute('aria-pressed',String(future.status==='paused')); futurePause.textContent=future.status==='paused'?'繼續自動播放':'暫停自動播放';
  }
  function scheduleFuture(){ clearFutureTimer(); if(future.status!=='running'||!future.visible||document.hidden||reduceMotion)return; future.timer=later(()=>{if(future.step>=4){future.status='completed';renderFuture(5);return}renderFuture(future.step+1);scheduleFuture()},3000); }
  function startFuture(){clearFutureTimer();future.userPaused=false;future.status=reduceMotion?'completed':'running';renderFuture(reduceMotion?5:0);scheduleFuture()}
  function pauseFuture(byUser=true){if(future.status==='running'){clearFutureTimer();future.status='paused';future.userPaused=byUser;renderFuture(future.step);futureStatus.textContent=`步驟 ${future.step+1}／6：自動播放已暫停 · ${futureLabels[future.step]}`}}
  function resumeFuture(){if(future.status==='paused'){future.userPaused=false;future.status='running';renderFuture(future.step);scheduleFuture()}}
  futurePause.addEventListener('click',()=>future.status==='paused'?resumeFuture():pauseFuture());
  window.addEventListener('resize',positionFuturePacket,{passive:true});
  renderFuture(0);

  const capabilityCopy = {
    command:'COMMAND：多個模擬訊號收斂成單一任務線。',observe:'OBSERVE：主機、網路與服務節點依序建立關聯。',defend:'DEFEND：異常節點經掃描後被清楚標記。',control:'CONTROL：工作流停在金色人工核准閘門。',connect:'CONNECT：機房、雲端與據點只交換狀態摘要。',learn:'LEARN：事件、建議與人工決定進入知識循環。'
  };
  const capabilityCards = [...document.querySelectorAll('[data-capability]')];
  const capabilityStatus = document.querySelector('#capabilityStatus');
  function activateCapability(card) {
    capabilityCards.forEach(item => item.classList.remove('is-animating'));
    if (!reduceMotion) { void card.offsetWidth; card.classList.add('is-animating'); }
    capabilityStatus.textContent = capabilityCopy[card.dataset.capability];
  }
  capabilityCards.forEach(card => {
    card.addEventListener('pointerenter',()=>activateCapability(card));
    card.addEventListener('focusin',()=>activateCapability(card));
    card.addEventListener('click',()=>activateCapability(card));
    card.addEventListener('pointerleave',()=>card.classList.remove('is-animating'));
    card.addEventListener('focusout',(event)=>{if(!card.contains(event.relatedTarget))card.classList.remove('is-animating')});
  });

  const hero = document.querySelector('#hero');
  const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
    if (entry.target === journeyRoot) {
      journey.visible = entry.isIntersecting;
      if (entry.isIntersecting && journey.status === 'idle') startJourney();
      else if (entry.isIntersecting && journey.status === 'paused' && !journey.userPaused) resumeJourney();
      else if (!entry.isIntersecting && journey.status === 'running') pauseJourney(false, false);
    }
    else if (entry.target === futureRoot) {
      future.visible = entry.isIntersecting;
      if (entry.isIntersecting && future.status === 'idle') startFuture();
      else if (entry.isIntersecting && future.status === 'paused' && !future.userPaused) resumeFuture();
      else if (!entry.isIntersecting && future.status === 'running') pauseFuture(false);
    }
    else if (entry.target === hero) hero.querySelector('#heroProductMotion').classList.toggle('is-active', entry.isIntersecting);
  }),{threshold:.12});
  observer.observe(journeyRoot); observer.observe(futureRoot); observer.observe(hero);
  document.addEventListener('visibilitychange',()=>{
    document.body.classList.toggle('page-hidden',document.hidden);
    if(document.hidden){pauseJourney(false,false);pauseFuture(false)}
    else {
      if(journey.visible&&journey.status==='paused'&&!journey.userPaused)resumeJourney();
      if(future.visible&&future.status==='paused'&&!future.userPaused)resumeFuture();
    }
  });
  motionQuery.addEventListener('change',(event)=>{
    reduceMotion=event.matches;
    if(reduceMotion){pauseJourney(false,false);pauseFuture(false);document.body.classList.add('reduce-motion-active')}
    else {
      document.body.classList.remove('reduce-motion-active');
      if(journey.visible&&journey.status==='paused'&&!journey.userPaused)resumeJourney();
      if(future.visible&&future.status==='paused'&&!future.userPaused)resumeFuture();
    }
  });
})();
