const stageNames = ['detect','context','authorize','respond','prove'] as const;
type Stage = typeof stageNames[number];

export const initMissionSequence = (reduced: MediaQueryList) => {
  const roots = [...document.querySelectorAll<HTMLElement>('[data-mission-sequence]')];
  const cleanups: Array<() => void> = [];
  roots.forEach((root) => {
    const steps = [...root.querySelectorAll<HTMLElement>('[data-mission-step]')];
    const status = root.querySelector<HTMLElement>('[data-mission-status]');
    let index = reduced.matches ? stageNames.length - 1 : 0;
    let timer = 0;
    let visible = false;
    const setStage = (next: number, manual = false) => {
      index = (next + stageNames.length) % stageNames.length;
      const stage = stageNames[index] as Stage;
      root.dataset.stage = stage;
      steps.forEach((step, current) => current === index ? step.setAttribute('aria-current','step') : step.removeAttribute('aria-current'));
      status && (status.textContent = steps[index]?.querySelector('small')?.textContent ?? '');
      if (manual && !reduced.matches) schedule(3600);
    };
    const schedule = (delay = index === stageNames.length - 1 ? 2500 : 1700) => {
      window.clearTimeout(timer);
      if (!visible || document.hidden || reduced.matches) return;
      timer = window.setTimeout(() => { setStage(index + 1); schedule(); }, delay);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); visible ? schedule(500) : window.clearTimeout(timer); }, { threshold:.3 });
    observer.observe(root);
    const clickHandlers = steps.map((step, stepIndex) => {
      const button = step.querySelector('button');
      const handler = () => setStage(stepIndex, true);
      button?.addEventListener('click', handler);
      return () => button?.removeEventListener('click', handler);
    });
    const visibility = () => document.hidden ? window.clearTimeout(timer) : schedule(600);
    const motionPreference = () => {
      window.clearTimeout(timer);
      if (reduced.matches) {
        setStage(stageNames.length - 1);
        return;
      }
      setStage(0);
      schedule(600);
    };
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', motionPreference);
    setStage(index);
    cleanups.push(() => { observer.disconnect(); window.clearTimeout(timer); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', motionPreference); clickHandlers.forEach((remove) => remove()); });
  });
  return () => cleanups.splice(0).forEach((cleanup) => cleanup());
};
