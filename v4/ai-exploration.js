(() => {
  'use strict';
  const body = document.body;
  const themeButton = document.querySelector('#contentThemeToggle');
  const viewport = document.querySelector('#aiUsesViewport');
  const cards = [...document.querySelectorAll('.ai-use-card')];
  const previous = document.querySelector('#aiUsesPrev');
  const next = document.querySelector('#aiUsesNext');
  const status = document.querySelector('#aiUsesStatus');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storedTheme = localStorage.getItem('blockops-content-theme');

  function setTheme(theme) {
    const dark = theme === 'dark';
    body.dataset.contentTheme = dark ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? '切換主要內容為淺色模式' : '切換主要內容為深色模式');
    themeButton.querySelector('b').textContent = dark ? 'DARK' : 'LIGHT';
  }
  setTheme(storedTheme === 'dark' ? 'dark' : 'light');
  themeButton.addEventListener('click', () => {
    const theme = body.dataset.contentTheme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    localStorage.setItem('blockops-content-theme', theme);
  });

  function visibleCount() {
    if (!cards.length) return 1;
    return Math.max(1, Math.floor((viewport.clientWidth + 22) / (cards[0].getBoundingClientRect().width + 22)));
  }
  function currentIndex() {
    const left = viewport.getBoundingClientRect().left;
    let best = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const value = Math.abs(card.getBoundingClientRect().left - left);
      if (value < distance) { distance = value; best = index; }
    });
    return best;
  }
  function updateStatus() {
    const start = currentIndex();
    const end = Math.min(cards.length, start + visibleCount());
    status.textContent = `顯示第 ${start + 1} 至 ${end} 項，共 ${cards.length} 項`;
    previous.disabled = viewport.scrollLeft <= 4;
    next.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;
  }
  function move(direction) {
    const card = cards[0];
    if (!card) return;
    const amount = (card.getBoundingClientRect().width + 22) * Math.max(1, visibleCount() - 1);
    viewport.scrollBy({left: direction * amount, behavior: reduceMotion.matches ? 'auto' : 'smooth'});
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  viewport.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  let scrollFrame = 0;
  viewport.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(updateStatus);
  }, {passive:true});
  window.addEventListener('resize', updateStatus, {passive:true});
  updateStatus();

  const companyViewport = document.querySelector('#companyStoriesViewport');
  const companyCards = [...document.querySelectorAll('.company-story-card')];
  const companyPrevious = document.querySelector('#companyStoriesPrev');
  const companyNext = document.querySelector('#companyStoriesNext');
  const companyStatus = document.querySelector('#companyStoriesStatus');
  function companyVisibleCount() {
    if (!companyCards.length) return 1;
    return Math.max(1, Math.floor((companyViewport.clientWidth + 22) / (companyCards[0].getBoundingClientRect().width + 22)));
  }
  function companyIndex() {
    const left = companyViewport.getBoundingClientRect().left;
    let best = 0;
    let distance = Infinity;
    companyCards.forEach((card, index) => {
      const value = Math.abs(card.getBoundingClientRect().left - left);
      if (value < distance) { distance = value; best = index; }
    });
    return best;
  }
  function updateCompanyStatus() {
    const start = companyIndex();
    const end = Math.min(companyCards.length, start + companyVisibleCount());
    companyStatus.textContent = `顯示第 ${start + 1} 至 ${end} 段，共 ${companyCards.length} 段`;
    companyPrevious.disabled = companyViewport.scrollLeft <= 4;
    companyNext.disabled = companyViewport.scrollLeft + companyViewport.clientWidth >= companyViewport.scrollWidth - 4;
  }
  function moveCompany(direction) {
    if (!companyCards.length) return;
    const amount = (companyCards[0].getBoundingClientRect().width + 22) * Math.max(1, companyVisibleCount() - 1);
    companyViewport.scrollBy({left:direction * amount,behavior:reduceMotion.matches ? 'auto' : 'smooth'});
  }
  companyPrevious.addEventListener('click', () => moveCompany(-1));
  companyNext.addEventListener('click', () => moveCompany(1));
  companyViewport.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveCompany(event.key === 'ArrowRight' ? 1 : -1);
  });
  let companyFrame = 0;
  companyViewport.addEventListener('scroll', () => {
    cancelAnimationFrame(companyFrame);
    companyFrame = requestAnimationFrame(updateCompanyStatus);
  }, {passive:true});
  window.addEventListener('resize', updateCompanyStatus, {passive:true});
  updateCompanyStatus();

  const footerStatus = document.querySelector('#footerDemoStatus');
  document.querySelector('#footerSubscribeDemo')?.addEventListener('click', () => {
    footerStatus.textContent = '展示模式：訂閱功能尚未連接，沒有儲存資料或送出網路 Request。';
  });
  document.querySelectorAll('[data-footer-channel]').forEach(button => button.addEventListener('click', () => {
    footerStatus.textContent = `${button.textContent} 為 Elias Net 概念頻道展示，尚未連接外部平台。`;
  }));
})();
