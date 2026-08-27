import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCompanyMotion(reduced: MediaQueryList) {
  if (reduced.matches) return () => {};
  const root = document.documentElement;
  root.classList.add('gsap-ready');
  const cleanups: Array<() => void> = [];
  const context = gsap.context(() => {
    const hero = document.querySelector<HTMLElement>('[data-gsap-hero]');
    if (hero) {
      const heroItems = hero.querySelectorAll<HTMLElement>('[data-gsap-hero-item]');
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(heroItems, { y: 22, opacity: 0, duration: 0.72, stagger: 0.08, clearProps: 'transform' }, 0.12)
        .from(hero.querySelector('[data-gsap-hero-visual]'), { scale: 0.96, opacity: 0, duration: 1.05, ease: 'power2.out' }, 0.22);

      gsap.to(hero.querySelector('.hero-backdrop'), {
        yPercent: 8,
        opacity: 0.72,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
      });
    }

    const companyHero = document.querySelector<HTMLElement>('[data-company-hero]');
    if (companyHero) {
      const items = companyHero.querySelectorAll<HTMLElement>('[data-company-hero-item]');
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(items, { y: 20, opacity: 0, duration: 0.68, stagger: 0.08, clearProps: 'transform' }, 0.08)
        .from(companyHero.querySelector('[data-company-hero-visual]'), { x: 22, opacity: 0, scale: 0.98, duration: 0.9, ease: 'power2.out' }, 0.22);
      gsap.to(companyHero.querySelector('.company-portrait-frame'), {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: { trigger: companyHero, start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }

    const leadership = document.querySelector<HTMLElement>('[data-section="leadership"]');
    if (leadership) {
      const cards = leadership.querySelectorAll<HTMLElement>('[data-gsap="leader-card"]');
      gsap.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: leadership, start: 'top 72%', once: true }
      });
      gsap.from(leadership.querySelectorAll('[data-gsap="founder-card"], [data-gsap="board-card"]'), {
        y: 22,
        opacity: 0,
        duration: 0.86,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: leadership, start: 'top 84%', once: true }
      });
      gsap.from(leadership.querySelector('[data-gsap="decision-banner"]'), {
        y: 18,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: { trigger: leadership.querySelector('[data-gsap="decision-banner"]'), start: 'top 90%', once: true }
      });
      gsap.to(leadership.querySelector('.leadership-glow'), {
        xPercent: 8,
        yPercent: -5,
        ease: 'none',
        scrollTrigger: { trigger: leadership, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      });
    }

    const capabilityPath = document.querySelector<HTMLElement>('[data-capability-path]');
    if (capabilityPath) {
      gsap.from(capabilityPath.querySelectorAll<HTMLElement>('.capability-path-step'), {
        y: 18,
        opacity: 0,
        duration: 0.58,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: capabilityPath, start: 'top 86%', once: true }
      });
    }

    const companyCards = document.querySelectorAll<HTMLElement>('[data-company-card]');
    companyCards.forEach((card) => {
      gsap.from(card, {
        y: 20,
        opacity: 0,
        duration: 0.62,
        delay: Number(card.style.getPropertyValue('--i') || 0) * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      });
    });

    const governanceLine = document.querySelector<HTMLElement>('.company-governance-line');
    if (governanceLine) {
      gsap.fromTo(governanceLine.querySelector('i'), { scaleY: 0 }, { scaleY: 1, duration: 1.35, ease: 'power2.out', scrollTrigger: { trigger: governanceLine, start: 'top 78%', once: true } });
    }

    document.querySelectorAll<HTMLElement>('[data-product-card]').forEach((card) => {
      const steps = card.querySelectorAll<HTMLElement>('[data-product-flow-step]');
      if (!steps.length) return;
      gsap.from(steps, {
        y: 13,
        opacity: 0,
        duration: 0.46,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 78%', once: true }
      });
      gsap.from(card.querySelector('.product-system-media img'), {
        scale: 1.04,
        opacity: 0.72,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 78%', once: true }
      });
    });

    const picker = document.querySelector<HTMLElement>('[data-poc-picker]');
    if (picker) {
      const options = Array.from(picker.querySelectorAll<HTMLButtonElement>('[data-poc-option]'));
      const selected = picker.querySelector<HTMLElement>('[data-poc-selected]');
      const start = picker.querySelector<HTMLAnchorElement>('[data-poc-start]');
      const baseHref = start?.dataset.baseHref || start?.getAttribute('href') || '';
      const updateSelection = (option: HTMLButtonElement) => {
        options.forEach((item) => item.setAttribute('aria-pressed', String(item === option)));
        const name = option.querySelector('strong')?.textContent?.trim() || '';
        const key = option.dataset.pocKey || '';
        if (selected) selected.textContent = name;
        if (start && baseHref) {
          const separator = baseHref.includes('#') ? '&' : '?';
          const [path, hash] = baseHref.split('#');
          start.href = `${path}${path.includes('?') ? '&' : '?'}poc=${encodeURIComponent(key)}${hash ? `#${hash}` : ''}`;
          if (!hash && separator === '&') start.href = `${baseHref}&poc=${encodeURIComponent(key)}`;
        }
      };
      options.forEach((option) => {
        const onClick = () => updateSelection(option);
        option.addEventListener('click', onClick);
        cleanups.push(() => option.removeEventListener('click', onClick));
      });
    }

    gsap.utils.toArray<HTMLElement>('[data-gsap="section-heading"]').forEach((heading) => {
      gsap.from(heading, {
        y: 18,
        opacity: 0,
        duration: 0.68,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 86%', once: true }
      });
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    context.revert();
    root.classList.remove('gsap-ready');
  };
}
