import { all, one } from './dom';

type AnimatedSet = Set<Animation>;

interface CapabilityCard {
  card: HTMLElement;
  button: HTMLButtonElement;
  panel: HTMLElement;
  animations: AnimatedSet;
}

const clearAnimation = (animation: Animation, set: AnimatedSet) => {
  set.delete(animation);
};

const track = (animation: Animation, set: AnimatedSet, done?: () => void) => {
  set.add(animation);
  animation.addEventListener('finish', () => {
    clearAnimation(animation, set);
    done?.();
    animation.cancel();
  }, { once: true });
  animation.addEventListener('cancel', () => clearAnimation(animation, set), { once: true });
  return animation;
};

const cancelAll = (set: AnimatedSet) => {
  for (const animation of set) animation.cancel();
  set.clear();
};

const animate = (
  element: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
  set: AnimatedSet,
  done?: () => void,
) => track(element.animate(keyframes, options), set, done);

const pathLength = (element: Element) => {
  if (!(element instanceof SVGGeometryElement)) return 0;
  try {
    return element.getTotalLength();
  } catch {
    return 0;
  }
};

export function initCapabilityMotion(reduced: MediaQueryList) {
  const root = one<HTMLElement>('[data-section="capabilities"]');
  if (!root) return () => {};

  const assembly = one<HTMLElement>('[data-capability-assembly]', root);
  const introAnimations: AnimatedSet = new Set();
  const entranceAnimations: AnimatedSet = new Set();
  const panelAnimations = new Map<HTMLElement, Animation>();
  const cleanups: Array<() => void> = [];
  const introducedCards = new WeakSet<HTMLElement>();
  let introPlayed = false;
  let sectionVisible = false;
  const motionSupported = typeof root.animate === 'function';

  const cards: CapabilityCard[] = all<HTMLElement>('[data-solution-card]', root).flatMap((card) => {
    const button = one<HTMLButtonElement>('[data-solution-toggle]', card);
    const panel = one<HTMLElement>('.solution-detail', card);
    return button && panel ? [{ card, button, panel, animations: new Set<Animation>() }] : [];
  });

  const setCardStatic = (entry: CapabilityCard) => {
    entry.card.classList.remove('is-replaying');
    for (const element of all<SVGElement>('[data-cap-path], [data-cap-node], [data-cap-result], .recovery-path, .improvement-loop', entry.card)) {
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
      element.style.removeProperty('stroke-dasharray');
      element.style.removeProperty('stroke-dashoffset');
    }
  };

  const stopCard = (entry: CapabilityCard) => {
    cancelAll(entry.animations);
    setCardStatic(entry);
  };

  const playCard = (entry: CapabilityCard, delay = 0) => {
    stopCard(entry);
    if (reduced.matches || !motionSupported || !sectionVisible) return;

    entry.card.classList.add('is-replaying');
    const paths = all<SVGElement>('[data-cap-path], .recovery-path, .improvement-loop', entry.card);
    const nodes = all<SVGElement>('[data-cap-node]', entry.card);
    const results = all<SVGElement>('[data-cap-result]', entry.card);

    paths.forEach((path, index) => {
      const length = pathLength(path);
      if (length) {
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = '0';
      }
      animate(path, [
        { opacity: 0.16, strokeDashoffset: length || 36 },
        { opacity: 1, strokeDashoffset: 0 },
      ], { duration: 640, delay: delay + 140 + index * 90, easing: 'cubic-bezier(.22,.8,.26,1)', fill: 'both' }, entry.animations);
    });

    nodes.forEach((node, index) => {
      animate(node, [
        { opacity: 0.3, transform: 'translateY(7px) scale(.94)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ], { duration: 480, delay: delay + index * 80, easing: 'cubic-bezier(.2,.76,.22,1)', fill: 'both' }, entry.animations);
    });

    results.forEach((result, index) => {
      animate(result, [
        { opacity: 0.18, transform: 'translateX(-8px) scale(.96)' },
        { opacity: 1, transform: 'translateX(0) scale(1)' },
      ], { duration: 560, delay: delay + 650 + index * 90, easing: 'cubic-bezier(.2,.76,.22,1)', fill: 'both' }, entry.animations);
    });

    const last = [...entry.animations].at(-1);
    last?.addEventListener('finish', () => entry.card.classList.remove('is-replaying'), { once: true });
  };

  const setAssemblyStatic = () => {
    if (!assembly) return;
    for (const element of all<HTMLElement | SVGElement>('[data-assembly-source], [data-assembly-path], [data-assembly-node], [data-assembly-core], [data-assembly-result]', assembly)) {
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
      element.style.removeProperty('stroke-dasharray');
      element.style.removeProperty('stroke-dashoffset');
    }
  };

  const stopAssembly = () => {
    cancelAll(introAnimations);
    setAssemblyStatic();
  };

  const playAssembly = () => {
    stopAssembly();
    if (!assembly || reduced.matches || !motionSupported || !sectionVisible) return;

    const source = one<HTMLElement>('[data-assembly-source]', assembly);
    const result = one<HTMLElement>('[data-assembly-result]', assembly);
    const core = one<HTMLElement>('[data-assembly-core]', assembly);
    const modules = all<HTMLElement>('[data-assembly-node]', assembly);
    const paths = all<SVGPathElement>('[data-assembly-path]', assembly);

    if (source) animate(source, [
      { opacity: 0.25, transform: 'translateX(-14px)' },
      { opacity: 1, transform: 'translateX(0)' },
    ], { duration: 520, easing: 'cubic-bezier(.22,.8,.26,1)', fill: 'both' }, introAnimations);

    modules.forEach((module, index) => animate(module, [
      { opacity: 0.22, transform: 'scale(.9)' },
      { opacity: 1, transform: 'scale(1)' },
    ], { duration: 460, delay: 430 + index * 260, easing: 'cubic-bezier(.22,.8,.26,1)', fill: 'both' }, introAnimations));

    paths.forEach((path, index) => {
      const length = pathLength(path);
      if (length) path.style.strokeDasharray = `${length}`;
      animate(path, [
        { opacity: 0.16, strokeDashoffset: length || 120 },
        { opacity: 1, strokeDashoffset: 0 },
      ], { duration: 1000, delay: 300 + index * 780, easing: 'cubic-bezier(.2,.72,.22,1)', fill: 'both' }, introAnimations);
    });

    if (core) animate(core, [
      { opacity: 0.25, transform: 'translate(-50%,-50%) scale(.72)' },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1.08)' },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
    ], { duration: 720, delay: 1850, easing: 'cubic-bezier(.22,.8,.26,1)', fill: 'both' }, introAnimations);

    if (result) animate(result, [
      { opacity: 0.2, transform: 'translateX(16px)' },
      { opacity: 1, transform: 'translateX(0)' },
    ], { duration: 720, delay: 2550, easing: 'cubic-bezier(.22,.8,.26,1)', fill: 'both' }, introAnimations);
  };

  const syncPanelState = (entry: CapabilityCard) => {
    const open = entry.button.getAttribute('aria-expanded') === 'true';
    entry.panel.hidden = !open;
    entry.card.classList.toggle('expanded', open);
    const icon = one<HTMLElement>('i', entry.button);
    if (icon) icon.textContent = open ? '−' : '＋';
  };

  const stopPanelAnimation = (panel: HTMLElement) => {
    const current = panelAnimations.get(panel);
    if (current) current.cancel();
    panelAnimations.delete(panel);
  };

  const closeCard = (entry: CapabilityCard, returnFocus = false) => {
    if (entry.button.getAttribute('aria-expanded') !== 'true') return;
    stopPanelAnimation(entry.panel);
    entry.button.setAttribute('aria-expanded', 'false');
    entry.card.classList.remove('expanded');
    const icon = one<HTMLElement>('i', entry.button);
    if (icon) icon.textContent = '＋';

    if (reduced.matches || !motionSupported) {
      entry.panel.hidden = true;
    } else {
      const height = entry.panel.getBoundingClientRect().height;
      const animation = entry.panel.animate([
        { height: `${height}px`, opacity: 1 },
        { height: '0px', opacity: 0 },
      ], { duration: 220, easing: 'ease-in', fill: 'both' });
      panelAnimations.set(entry.panel, animation);
      animation.addEventListener('finish', () => {
        panelAnimations.delete(entry.panel);
        if (entry.button.getAttribute('aria-expanded') === 'false') entry.panel.hidden = true;
        animation.cancel();
      }, { once: true });
      animation.addEventListener('cancel', () => panelAnimations.delete(entry.panel), { once: true });
    }
    if (returnFocus) entry.button.focus();
  };

  const openCard = (entry: CapabilityCard) => {
    for (const other of cards) if (other !== entry) closeCard(other);
    stopPanelAnimation(entry.panel);
    entry.button.setAttribute('aria-expanded', 'true');
    entry.card.classList.add('expanded');
    entry.panel.hidden = false;
    const icon = one<HTMLElement>('i', entry.button);
    if (icon) icon.textContent = '−';
    playCard(entry);

    if (reduced.matches || !motionSupported) return;
    const height = entry.panel.scrollHeight;
    const animation = entry.panel.animate([
      { height: '0px', opacity: 0 },
      { height: `${height}px`, opacity: 1 },
    ], { duration: 300, easing: 'cubic-bezier(.2,.72,.22,1)' });
    panelAnimations.set(entry.panel, animation);
    animation.addEventListener('finish', () => panelAnimations.delete(entry.panel), { once: true });
    animation.addEventListener('cancel', () => panelAnimations.delete(entry.panel), { once: true });
  };

  const playIntro = () => {
    if (introPlayed) return;
    introPlayed = true;
    playAssembly();
  };

  for (const entry of cards) {
    syncPanelState(entry);
    const replay = () => playCard(entry);
    const onClick = () => entry.button.getAttribute('aria-expanded') === 'true' ? closeCard(entry) : openCard(entry);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target === entry.button && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick();
        return;
      }
      if (event.key === 'Escape' && entry.button.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        closeCard(entry, true);
      }
    };
    entry.card.addEventListener('pointerenter', replay);
    entry.card.addEventListener('focusin', replay);
    entry.button.addEventListener('click', onClick);
    entry.card.addEventListener('keydown', onKeyDown);
    cleanups.push(() => {
      entry.card.removeEventListener('pointerenter', replay);
      entry.card.removeEventListener('focusin', replay);
      entry.button.removeEventListener('click', onClick);
      entry.card.removeEventListener('keydown', onKeyDown);
    });
  }

  let observer: IntersectionObserver | null = null;
  let cardObserver: IntersectionObserver | null = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      const state = entries[0];
      sectionVisible = Boolean(state?.isIntersecting);
      if (sectionVisible) playIntro();
      else {
        stopAssembly();
        cancelAll(entranceAnimations);
        cards.forEach(stopCard);
      }
    }, { threshold: 0.12 });
    observer.observe(root);

    cardObserver = new IntersectionObserver((entries) => {
      for (const state of entries) {
        if (!state.isIntersecting || !(state.target instanceof HTMLElement) || introducedCards.has(state.target)) continue;
        const entry = cards.find((candidate) => candidate.card === state.target);
        if (!entry) continue;
        sectionVisible = true;
        introducedCards.add(entry.card);
        cardObserver?.unobserve(entry.card);
        if (reduced.matches || !motionSupported) continue;
        animate(entry.card, [
          { opacity: 0.58, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 520, easing: 'cubic-bezier(.22,.8,.26,1)', fill: 'both' }, entranceAnimations);
        playCard(entry, 160);
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -5% 0px' });
    cards.forEach((entry) => cardObserver?.observe(entry.card));
  } else {
    sectionVisible = true;
    playIntro();
  }

  const onVisibility = () => {
    if (!document.hidden) return;
    stopAssembly();
    cancelAll(entranceAnimations);
    cards.forEach(stopCard);
  };
  const onReducedChange = () => {
    stopAssembly();
    cancelAll(entranceAnimations);
    cards.forEach(stopCard);
    panelAnimations.forEach((animation) => animation.cancel());
    panelAnimations.clear();
    cards.forEach(syncPanelState);
  };
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', onReducedChange);

  return () => {
    observer?.disconnect();
    cardObserver?.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    reduced.removeEventListener('change', onReducedChange);
    cleanups.forEach((cleanup) => cleanup());
    stopAssembly();
    cancelAll(entranceAnimations);
    cards.forEach(stopCard);
    panelAnimations.forEach((animation) => animation.cancel());
    panelAnimations.clear();
  };
}
