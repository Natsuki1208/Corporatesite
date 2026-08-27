type ProductCopy = [string,string][];

export const initProductMotion = (reduced: MediaQueryList) => {
  const roots = [...document.querySelectorAll<HTMLElement>('[data-product-motion]')];
  const cleanups: Array<() => void> = [];
  roots.forEach((root) => {
    const source = root.querySelector<HTMLScriptElement>('[data-product-motion-copy]');
    const title = root.querySelector<HTMLElement>('[data-product-stage-title]');
    const body = root.querySelector<HTMLElement>('[data-product-stage-copy]');
    const number = root.querySelector<HTMLElement>('[data-product-stage-number]');
    const authority = root.querySelector<HTMLElement>('[data-product-authority]');
    const copy = JSON.parse(source?.textContent || '[]') as ProductCopy;
    let stage = reduced.matches ? 3 : 0;
    let visible = false;
    let timer = 0;
    const render = () => {
      root.dataset.stage = String(stage);
      if (title) title.textContent = copy[stage]?.[0] || '';
      if (body) body.textContent = copy[stage]?.[1] || '';
      if (number) number.textContent = String(stage + 1);
      if (authority) authority.hidden = stage !== 2;
    };
    const schedule = (delay = stage === 3 ? 2500 : 1500) => {
      window.clearTimeout(timer);
      if (!visible || document.hidden || reduced.matches) return;
      timer = window.setTimeout(() => { stage = (stage + 1) % 4; render(); schedule(); }, delay);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      visible ? schedule(600) : window.clearTimeout(timer);
    }, { threshold:.35 });
    const visibility = () => document.hidden ? window.clearTimeout(timer) : schedule(600);
    const preference = () => {
      window.clearTimeout(timer);
      stage = reduced.matches ? 3 : 0;
      render();
      schedule(600);
    };
    observer.observe(root);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', preference);
    render();
    cleanups.push(() => { observer.disconnect(); window.clearTimeout(timer); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', preference); });
  });
  return () => cleanups.splice(0).forEach((cleanup) => cleanup());
};
