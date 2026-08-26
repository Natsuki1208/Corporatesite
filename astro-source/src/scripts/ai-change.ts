import { all, one } from './dom';

type Running = Set<Animation>;

export function initAiChange(reduced: MediaQueryList) {
  const stage = one<HTMLElement>('[data-ai-change]');
  if (!stage) return () => {};

  const tabs = all<HTMLButtonElement>('[data-ai-change-tab]', stage);
  const replay = one<HTMLButtonElement>('[data-ai-change-replay]', stage);
  const word = one<HTMLElement>('[data-ai-change-word]', stage);
  const kicker = one<HTMLElement>('[data-ai-change-kicker]', stage);
  const title = one<HTMLElement>('[data-ai-change-title]', stage);
  const copy = one<HTMLElement>('[data-ai-change-copy]', stage);
  const panel = one<HTMLElement>('[role="tabpanel"]', stage);
  const running: Running = new Set();
  const timers = new Set<number>();
  const cleanups: Array<() => void> = [];
  let active = 0;
  let visible = false;
  let demoPlayed = false;
  let autoRunning = false;
  const motionSupported = typeof stage.animate === 'function';

  const track = (animation: Animation) => {
    running.add(animation);
    animation.addEventListener('finish', () => {
      running.delete(animation);
      animation.cancel();
    }, { once: true });
    const remove = () => running.delete(animation);
    animation.addEventListener('cancel', remove, { once: true });
    return animation;
  };
  const clearTimers = () => {
    for (const timer of timers) window.clearTimeout(timer);
    timers.clear();
  };
  const cancelAnimations = () => {
    for (const animation of running) animation.cancel();
    running.clear();
  };
  const stopAuto = () => {
    autoRunning = false;
    clearTimers();
    cancelAnimations();
    if (replay) replay.textContent = replay.dataset.replayLabel ?? replay.textContent;
  };
  const later = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delay);
    timers.add(timer);
  };
  const draw = (selector: string, delay = 0, duration = 900) => {
    for (const element of all<SVGGeometryElement>(selector, stage)) {
      let length = 0;
      try { length = element.getTotalLength(); } catch { /* static fallback */ }
      if (!length) continue;
      track(element.animate([
        { opacity: .12, strokeDasharray: `${length}`, strokeDashoffset: length },
        { opacity: 1, strokeDasharray: `${length}`, strokeDashoffset: 0 },
      ], { duration, delay, fill: 'both', easing: 'cubic-bezier(.22,.8,.26,1)' }));
    }
  };
  const playStageMotion = (index: number) => {
    if (reduced.matches || !motionSupported || !visible || document.hidden) return;
    draw('[data-work-a] path, [data-work-i] path', 0, 760);
    if (index === 0) {
      draw('[data-work-signal] path', 180, 1000);
      all<SVGCircleElement>('[data-work-signal] circle', stage).forEach((node, nodeIndex) => track(node.animate([
        { opacity: .15, transform: 'translateX(-12px)' }, { opacity: 1, transform: 'translateX(0)' }
      ], { duration: 520, delay: 180 + nodeIndex * 140, fill: 'both', easing: 'ease-out' })));
    }
    if (index === 1) {
      draw('[data-work-context] path', 220, 1100);
      all<SVGCircleElement>('[data-work-context] circle', stage).forEach((node, nodeIndex) => track(node.animate([
        { opacity: .1, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1.16)' }, { opacity: 1, transform: 'scale(1)' }
      ], { duration: 720, delay: 460 + nodeIndex * 130, fill: 'both' })));
    }
    if (index === 2) {
      draw('[data-work-review] rect, [data-work-review] path', 180, 1050);
      const boundary = one<SVGCircleElement>('[data-work-review] circle', stage);
      if (boundary) track(boundary.animate([{ opacity: .25 }, { opacity: 1 }, { opacity: .55 }, { opacity: 1 }], { duration: 1250, delay: 700, fill: 'both' }));
    }
    if (index === 3) {
      draw('[data-work-output] path', 400, 1050);
      const output = one<SVGGElement>('[data-work-output]', stage);
      if (output) track(output.animate([{ opacity: .1, transform: 'translateX(-18px)' }, { opacity: 1, transform: 'translateX(0)' }], { duration: 850, delay: 450, fill: 'both', easing: 'ease-out' }));
    }
  };
  const render = (index: number, focus = false, animate = true) => {
    const tab = tabs[index];
    if (!tab || !word || !kicker || !title || !copy || !panel) return;
    cancelAnimations();
    active = index;
    stage.dataset.activeChange = String(index);
    word.textContent = tab.dataset.word ?? '';
    kicker.textContent = tab.dataset.kicker ?? '';
    title.textContent = tab.dataset.title ?? '';
    copy.textContent = tab.dataset.copy ?? '';
    panel.setAttribute('aria-labelledby', tab.id);
    tabs.forEach((item, itemIndex) => {
      const selected = itemIndex === index;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    if (animate && !reduced.matches && motionSupported && visible && !document.hidden) {
      [word, title, copy].forEach((item, itemIndex) => track(item.animate([
        { opacity: .18, transform: itemIndex ? 'translateY(14px)' : 'translateX(-10px)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 440 + itemIndex * 70, easing: 'cubic-bezier(.22,.8,.26,1)' })));
      playStageMotion(index);
    }
    if (focus) tab.focus();
  };
  const playFullDemo = () => {
    stopAuto();
    if (reduced.matches || !visible || document.hidden) {
      render(3, false, false);
      return;
    }
    demoPlayed = true;
    autoRunning = true;
    render(0);
    [1, 2, 3].forEach((index) => later(() => {
      if (!autoRunning || !visible || document.hidden) return;
      render(index);
      if (index === 3) {
        autoRunning = false;
        if (replay) replay.textContent = replay.dataset.replayLabel ?? replay.textContent;
      }
    }, index * 3100));
  };
  const choose = (index: number, focus = false) => {
    stopAuto();
    render(index, focus);
  };

  tabs.forEach((tab, index) => {
    const click = () => choose(index);
    const keydown = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      choose(next, true);
    };
    tab.addEventListener('click', click);
    tab.addEventListener('keydown', keydown);
    cleanups.push(() => { tab.removeEventListener('click', click); tab.removeEventListener('keydown', keydown); });
  });
  const onReplay = () => playFullDemo();
  replay?.addEventListener('click', onReplay);
  if (replay) cleanups.push(() => replay.removeEventListener('click', onReplay));

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (!visible) { stopAuto(); render(3, false, false); return; }
    if (!demoPlayed && !reduced.matches) playFullDemo();
  }, { threshold: .18 }) : null;
  if (observer) observer.observe(stage);
  else { visible = true; if (!reduced.matches) playFullDemo(); }

  const onVisibility = () => { if (document.hidden) { stopAuto(); render(3, false, false); } };
  const onMotionChange = () => {
    stopAuto();
    replay?.toggleAttribute('disabled', reduced.matches);
    render(reduced.matches ? 3 : active, false, false);
  };
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', onMotionChange);
  replay?.toggleAttribute('disabled', reduced.matches);
  render(reduced.matches ? 3 : 0, false, false);

  return () => {
    stopAuto();
    observer?.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    reduced.removeEventListener('change', onMotionChange);
    cleanups.forEach((cleanup) => cleanup());
  };
}
