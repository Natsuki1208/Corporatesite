import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCompanyMotion(reduced: MediaQueryList) {
  if (reduced.matches) return () => {};
  const root = document.documentElement;
  root.classList.add('gsap-ready');
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

    gsap.utils.toArray<HTMLElement>('[data-gsap="section-heading"]').forEach((heading) => {
      gsap.from(heading, {
        y: 18,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 86%', once: true }
      });
    });
  });

  return () => {
    context.revert();
    root.classList.remove('gsap-ready');
  };
}
