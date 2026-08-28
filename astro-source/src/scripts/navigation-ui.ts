import { all, one } from './dom';

export function initNavigation() {
  const cleanups: Array<() => void> = [];
  const add = (target: EventTarget, type: string, listener: EventListener, options?: AddEventListenerOptions) => {
    target.addEventListener(type, listener, options);
    cleanups.push(() => target.removeEventListener(type, listener, options));
  };

  all<HTMLElement>('[data-language-switcher]').forEach((switcher) => {
    const toggle = one<HTMLButtonElement>('[data-language-toggle]', switcher);
    const menu = one<HTMLElement>('[data-language-menu]', switcher);
    if (!toggle || !menu) return;
    const close = (restore = false) => {
      const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      if (restore && wasOpen) toggle.focus();
    };
    const onToggle = () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      if (open) one<HTMLAnchorElement>('a', menu)?.focus();
    };
    const onDocument = (event: Event) => { if (!switcher.contains(event.target as Node)) close(); };
    const onKey = (event: Event) => { if ((event as KeyboardEvent).key === 'Escape') close(true); };
    add(toggle, 'click', onToggle);
    add(document, 'click', onDocument);
    add(document, 'keydown', onKey);
  });

  const mascot = one<HTMLElement>('[data-navigation-mascot]');
  if (mascot) {
    const toggle = one<HTMLButtonElement>('[data-mascot-toggle]', mascot);
    const closeButton = one<HTMLButtonElement>('[data-mascot-close]', mascot);
    const panel = one<HTMLElement>('[data-mascot-panel]', mascot);
    const panelLinks = panel ? all<HTMLAnchorElement>('a', panel) : [];
    if (toggle && panel) {
      const close = (restore = false) => {
        const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', toggle.dataset.openLabel ?? 'Open navigation');
        panel.hidden = true;
        if (restore && wasOpen) toggle.focus();
      };
      const open = () => {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', toggle.dataset.closeLabel ?? 'Close navigation');
        panel.hidden = false;
        panelLinks[0]?.focus();
      };
      const onToggle = () => toggle.getAttribute('aria-expanded') === 'true' ? close(true) : open();
      const onOutside = (event: Event) => { if (!mascot.contains(event.target as Node)) close(); };
      const onKey = (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (toggle.getAttribute('aria-expanded') !== 'true') return;
        if (keyboardEvent.key === 'Escape') { keyboardEvent.preventDefault(); close(true); return; }
        if (keyboardEvent.key !== 'Tab') return;
        const focusables = [closeButton, ...panelLinks].filter(Boolean) as HTMLElement[];
        const first = focusables[0];
        const last = focusables.at(-1);
        if (keyboardEvent.shiftKey && document.activeElement === first) { keyboardEvent.preventDefault(); last?.focus(); }
        else if (!keyboardEvent.shiftKey && document.activeElement === last) { keyboardEvent.preventDefault(); first?.focus(); }
      };
      add(toggle, 'click', onToggle);
      if (closeButton) add(closeButton, 'click', () => close(true));
      panelLinks.forEach((link) => add(link, 'click', () => close()));
      add(document, 'pointerdown', onOutside);
      add(document, 'keydown', onKey);
    }
  }

  const button = one<HTMLButtonElement>('[data-menu-toggle]');
  const nav = one<HTMLElement>('[data-nav]');
  if (button && nav) {
    const links = all<HTMLAnchorElement>('a[href^="#"]', nav);
    const sections = all<HTMLElement>('[data-section]');
    const prev = one<HTMLButtonElement>('[data-section-prev]');
    const next = one<HTMLButtonElement>('[data-section-next]');
    const progress = one<HTMLElement>('[data-journey-progress]');
    let active = 0;
    const close = (restore = false) => {
      const wasOpen = nav.classList.contains('open');
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', button.dataset.openLabel ?? 'Menu');
      document.body.classList.remove('menu-open');
      if (restore && wasOpen) button.focus();
    };
    const toggle = () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? button.dataset.closeLabel ?? 'Close menu' : button.dataset.openLabel ?? 'Open menu');
      document.body.classList.toggle('menu-open', open);
      if (open) links[0]?.focus();
    };
    const setActive = (index: number, updateHash = false) => {
      active = Math.max(0, Math.min(index, sections.length - 1));
      const id = sections[active]?.id;
      links.forEach((link) => link.getAttribute('href') === `#${id}` ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
      if (progress && sections.length) progress.style.width = `${((active + 1) / sections.length) * 100}%`;
      prev?.toggleAttribute('disabled', active === 0);
      next?.toggleAttribute('disabled', active === sections.length - 1);
      if (updateHash && id && location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
    };
    const move = (delta: number) => sections[Math.max(0, Math.min(active + delta, sections.length - 1))]?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    const onNavClick = (event: Event) => { if ((event.target as Element | null)?.closest('a')) close(); };
    const onKey = (event: Event) => { if (nav.classList.contains('open') && (event as KeyboardEvent).key === 'Escape') close(true); };
    const onResize = () => { if (innerWidth > 900) close(); };
    const prevClick = () => move(-1);
    const nextClick = () => move(1);
    let scrollFrame = 0;
    const updateFromScroll = () => {
      scrollFrame = 0;
      const probe = Math.min(innerHeight * .38, 320);
      let index = 0;
      sections.forEach((section, item) => { if (section.getBoundingClientRect().top <= probe) index = item; });
      setActive(index, true);
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateFromScroll); };
    add(button, 'click', toggle);
    add(nav, 'click', onNavClick);
    add(document, 'keydown', onKey);
    add(window, 'resize', onResize);
    add(window, 'scroll', onScroll, { passive:true });
    if (prev) add(prev, 'click', prevClick);
    if (next) add(next, 'click', nextClick);
    const initial = sections.findIndex((section) => `#${section.id}` === location.hash);
    setActive(initial >= 0 ? initial : 0);
    requestAnimationFrame(updateFromScroll);
    cleanups.push(() => { close(); if (scrollFrame) cancelAnimationFrame(scrollFrame); });
  }

  return () => cleanups.splice(0).reverse().forEach((cleanup) => cleanup());
}
