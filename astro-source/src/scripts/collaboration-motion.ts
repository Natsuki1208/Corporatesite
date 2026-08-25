import { all, one } from './dom';

export function initCollaborationMotion(reduced: MediaQueryList) {
  const root=one<HTMLElement>('[data-contact-convergence]');const form=one<HTMLFormElement>('[data-concept-form]');if(!root)return()=>{};const signals=all<HTMLElement>('i',root);let animations:Animation[]=[];
  const complete=()=>{root.classList.add('converged');if(reduced.matches)return;animations=signals.map((signal,index)=>signal.animate([{opacity:0,transform:`translate(${index%2?80:-80}px,${index<3?-45:45}px) scaleX(.3)`},{opacity:1,transform:'none'}],{duration:650,delay:index*90,easing:'cubic-bezier(.2,.72,.22,1)',fill:'both'}));};
  const observer='IntersectionObserver'in window?new IntersectionObserver(([entry])=>{if(entry?.isIntersecting){complete();observer?.disconnect();}},{threshold:.25}):null;if(observer)observer.observe(root);else complete();
  const change=(event:Event)=>{const input=(event.target as Element|null)?.closest<HTMLInputElement>('input[type="radio"]');if(input)form?.setAttribute('data-selection-confirmed',input.value);};form?.addEventListener('change',change);
  return()=>{observer?.disconnect();animations.forEach((animation)=>animation.cancel());form?.removeEventListener('change',change);};
}
