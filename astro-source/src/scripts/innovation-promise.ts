import { all, one } from './dom';

export function initInnovationPromise(reduced: MediaQueryList) {
  const root = one<HTMLElement>('[data-innovation-flow]'); if (!root) return () => {};
  const nodes = all<HTMLButtonElement>('[data-flow-node]',root); const explanation = one<HTMLElement>('[data-flow-explanation]',root); const timers = new Set<number>();
  const cancelTimeline=()=>{timers.forEach(window.clearTimeout);timers.clear();};
  const setStep = (step:number) => { root.dataset.flowStep=String(step); nodes.forEach((node)=>{const selected=Number(node.dataset.flowNode)===step;node.classList.toggle('selected',selected);node.setAttribute('aria-pressed',String(selected));}); };
  const explain = (node:HTMLButtonElement) => { cancelTimeline(); if (explanation) explanation.textContent=node.dataset.flowCopy ?? ''; setStep(Number(node.dataset.flowNode ?? 0)); };
  const cleanups:Array<()=>void>=[]; nodes.forEach((node)=>{const click=()=>explain(node);node.addEventListener('click',click);cleanups.push(()=>node.removeEventListener('click',click));});
  const play = () => { cancelTimeline(); if (reduced.matches){setStep(4);return;} [0,1,2,3,4].forEach((step,index)=>{const timer=window.setTimeout(()=>{setStep(step);timers.delete(timer);},index*430);timers.add(timer);}); };
  const observer='IntersectionObserver' in window?new IntersectionObserver(([entry])=>{if(entry?.isIntersecting){play();observer?.disconnect();}},{threshold:.28}):null;
  if(observer)observer.observe(root);else setStep(4);
  const motionChange=()=>{cancelTimeline();reduced.matches?setStep(4):play();}; reduced.addEventListener('change',motionChange);
  return()=>{observer?.disconnect();cancelTimeline();reduced.removeEventListener('change',motionChange);cleanups.forEach((cleanup)=>cleanup());};
}
