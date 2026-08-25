import { all, one } from './dom';
import { initCaseTabs } from './tabs';

export function initCaseMotion(reduced: MediaQueryList) {
  const root=one<HTMLElement>('#cases');if(!root)return()=>{};const tabCleanup=initCaseTabs();let animations:Animation[]=[];
  const play=(index:number)=>{animations.forEach((animation)=>animation.cancel());animations=[];const panel=all<HTMLElement>('[data-case-panel]',root)[index];if(!panel||reduced.matches||!('animate' in Element.prototype))return;all<HTMLElement>('.case-flow span',panel).forEach((step,stepIndex)=>{animations.push(step.animate([{opacity:.1,transform:'translateX(-22px) scale(.92)'},{opacity:1,transform:'none'}],{duration:420,delay:stepIndex*120,easing:'cubic-bezier(.2,.72,.22,1)',fill:'both'}));});};
  const change=(event:Event)=>play((event as CustomEvent<{index:number}>).detail.index);root.addEventListener('sectiontabchange',change);play(0);
  return()=>{root.removeEventListener('sectiontabchange',change);animations.forEach((animation)=>animation.cancel());tabCleanup();};
}
