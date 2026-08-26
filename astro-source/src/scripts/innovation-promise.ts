import { all, one } from './dom';

export function initInnovationPromise(reduced: MediaQueryList) {
  const root = one<HTMLElement>('[data-partner-motion]');
  if (!root) return () => {};
  const replay = one<HTMLButtonElement>('[data-partner-replay]', root);
  const finalCopy = one<HTMLElement>('[data-partner-final]', root);
  const parts = ['us','context','ai','suggestion','decision','parallel','outcome']
    .map((name) => one<SVGGElement>(`[data-partner-part="${name}"]`, root))
    .filter((part): part is SVGGElement => Boolean(part));
  const running = new Set<Animation>();
  let observer: IntersectionObserver | null = null;
  let visible = false;
  let played = false;
  const cancel = () => { running.forEach((animation) => animation.cancel()); running.clear(); };
  const track = (animation: Animation) => {
    running.add(animation);
    const done = () => running.delete(animation);
    animation.addEventListener('finish', done, { once: true });
    animation.addEventListener('cancel', done, { once: true });
    return animation;
  };
  const finish = () => {
    cancel();
    parts.forEach((part) => { part.style.opacity = '1'; part.style.transform = 'none'; });
    all<SVGGeometryElement>('path,rect,circle', root).forEach((shape) => {
      shape.style.strokeDasharray = '';
      shape.style.strokeDashoffset = '0';
    });
    if (finalCopy) { finalCopy.style.opacity = '1'; finalCopy.style.transform = 'none'; }
    root.dataset.motionComplete = 'true';
  };
  const play = () => {
    cancel();
    played = true;
    root.dataset.motionComplete = 'false';
    if (reduced.matches || document.hidden || !visible || !('animate' in Element.prototype)) { finish(); return; }
    parts.forEach((part, partIndex) => {
      const delay = partIndex * 720;
      track(part.animate([
        { opacity: .08, transform: partIndex === 0 ? 'translateX(-14px)' : 'translateY(8px)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 560, delay, fill: 'both', easing: 'cubic-bezier(.22,.8,.26,1)' }));
      all<SVGGeometryElement>('path,rect,circle', part).forEach((shape, shapeIndex) => {
        let length = 0;
        try { length = shape.getTotalLength(); } catch { /* final-state fallback */ }
        if (!length) return;
        shape.style.strokeDasharray = `${length}`;
        track(shape.animate([
          { strokeDashoffset: length, opacity: .12 },
          { strokeDashoffset: 0, opacity: 1 },
        ], { duration: 920, delay: delay + shapeIndex * 70, fill: 'both', easing: 'cubic-bezier(.22,.8,.26,1)' }));
      });
    });
    if (finalCopy) track(finalCopy.animate([
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'none' },
    ], { duration: 600, delay: 5050, fill: 'both', easing: 'cubic-bezier(.22,.8,.26,1)' }));
  };
  const onReplay = () => play();
  replay?.addEventListener('click', onReplay);
  observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible && !played) play();
    if (!visible && played) finish();
  }, { threshold: .18 }) : null;
  if (observer) observer.observe(root); else { visible = true; finish(); }
  const onVisibility = () => { if (document.hidden) finish(); };
  const onMotion = () => reduced.matches ? finish() : (visible ? play() : finish());
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', onMotion);
  if (reduced.matches) finish();
  return () => { cancel(); observer?.disconnect(); replay?.removeEventListener('click', onReplay); document.removeEventListener('visibilitychange', onVisibility); reduced.removeEventListener('change', onMotion); };
}
