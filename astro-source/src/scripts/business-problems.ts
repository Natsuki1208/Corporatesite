import { all, one } from './dom';

export function initBusinessProblems(reduced: MediaQueryList) {
  const root = one<HTMLElement>('#problems');
  if (!root) return () => {};
  const focusStage = one<HTMLElement>('[data-problem-focus]', root);
  const replayButton = one<HTMLButtonElement>('[data-problem-replay]', root);
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
  const finishFocus = () => {
    if (!focusStage) return;
    all<SVGElement>('[data-problem-motion]',focusStage).forEach((part)=>{part.style.opacity='1';part.style.transform='none';});
    all<SVGGeometryElement>('path,rect,circle',focusStage).forEach((shape)=>{shape.style.strokeDashoffset='0';shape.style.removeProperty('stroke-dasharray');});
  };
  const playFocus = () => {
    if (!focusStage || reduced.matches || !Element.prototype.animate) { finishFocus(); return; }
    const groups=all<SVGGElement>('[data-problem-motion]',focusStage);
    groups.forEach((group,index)=>{
      const animation=group.animate([{opacity:index===0 ? .4 : .06,transform:index===3?'scale(.82)':'translateY(8px)'},{opacity:1,transform:'none'}],{duration:620,delay:index*620,easing:'cubic-bezier(.22,.8,.26,1)',fill:'both'});
      const set=running.get(focusStage)??new Set<Animation>();running.set(focusStage,set);set.add(animation);
    });
  };
  const replayFocus=()=>playFocus();replayButton?.addEventListener('click',replayFocus);if(replayButton)cleanups.push(()=>replayButton.removeEventListener('click',replayFocus));
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry])=>{ if (!entry?.isIntersecting) return; playFocus(); rows.forEach((row,index)=>{const timer=window.setTimeout(()=>row.classList.add('motion-static'),index*70);timers.add(timer);}); observer?.disconnect(); },{threshold:.2}) : null;
  if (observer) observer.observe(root); else { rows.forEach((row)=>row.classList.add('motion-static')); finishFocus(); }
  const motionChange=()=>reduced.matches?finishFocus():playFocus();reduced.addEventListener('change',motionChange);
  return () => { observer?.disconnect(); timers.forEach(window.clearTimeout); running.forEach((group)=>group.forEach((animation)=>animation.cancel())); reduced.removeEventListener('change',motionChange);cleanups.forEach((cleanup)=>cleanup()); };
}
