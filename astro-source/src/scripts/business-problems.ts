import { all, one } from './dom';

export function initBusinessProblems(reduced: MediaQueryList) {
  const root = one<HTMLElement>('#problems');
  if (!root) return () => {};
  const rows = all<HTMLElement>('[data-problem-row]', root);
  const timers = new Set<number>();
  const running = new Map<HTMLElement,Set<Animation>>();
  const play = (row: HTMLElement) => {
    if (reduced.matches || !Element.prototype.animate) { row.classList.add('motion-static'); return; }
    running.get(row)?.forEach((animation) => animation.cancel());
    const rowAnimations = new Set<Animation>(); running.set(row,rowAnimations);
    row.classList.add('motion-active');
    const pieces = all<HTMLElement>('.problem-mark > *', row);
    pieces.forEach((piece,index) => {
      const animation = piece.animate(
        [{opacity:.15,transform:'translateX(-18px) scale(.65)'},{opacity:1,transform:'translateX(0) scale(1)'}],
        {duration:420,delay:index*75,easing:'cubic-bezier(.2,.72,.22,1)',fill:'both'}
      );
      rowAnimations.add(animation); animation.addEventListener('finish',()=>rowAnimations.delete(animation),{once:true});
    });
    const timer = window.setTimeout(()=>{row.classList.remove('motion-active');timers.delete(timer);},760); timers.add(timer);
  };
  const cleanups: Array<() => void> = [];
  rows.forEach((row) => { const replay = () => play(row); row.addEventListener('pointerenter',replay); cleanups.push(()=>row.removeEventListener('pointerenter',replay)); });
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry])=>{ if (!entry?.isIntersecting) return; rows.forEach((row,index)=>{const timer=window.setTimeout(()=>play(row),index*110);timers.add(timer);}); observer?.disconnect(); },{threshold:.2}) : null;
  if (observer) observer.observe(root); else rows.forEach((row)=>row.classList.add('motion-static'));
  return () => { observer?.disconnect(); timers.forEach(window.clearTimeout); running.forEach((group)=>group.forEach((animation)=>animation.cancel())); cleanups.forEach((cleanup)=>cleanup()); };
}
