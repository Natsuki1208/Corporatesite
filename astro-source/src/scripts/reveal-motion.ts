import { all } from './dom';
export function initRevealMotion(reduced: MediaQueryList) {
  const targets = all<HTMLElement>('[data-reveal]'); if (reduced.matches || !('IntersectionObserver' in window)) { targets.forEach((target) => target.classList.add('revealed')); return () => {}; }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('revealed'); observer.unobserve(entry.target); }), { threshold:.12, rootMargin:'0px 0px -6% 0px' });
  targets.forEach((target) => observer.observe(target)); return () => observer.disconnect();
}

export function initSectionActivity(reduced: MediaQueryList) {
  const sections = all<HTMLElement>('[data-section]');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('section-active'));
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('section-active', entry.isIntersecting));
  }, { threshold: 0.08, rootMargin: '8% 0px' });

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}
