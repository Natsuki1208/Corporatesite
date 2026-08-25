import { all, one } from './dom';
import { initWorkSceneTabs } from './tabs';

export function initWorkScenesMotion(reduced: MediaQueryList) {
  const root=one<HTMLElement>('[data-scene-console]');const stage=one<HTMLElement>('[data-scene-stage]');if(!root||!stage)return()=>{};
  const tabCleanup=initWorkSceneTabs();const panels=all<HTMLElement>('[data-scene-panel]',root);const visual=one<HTMLElement>('.scene-visual',stage);let animations:Animation[]=[];
  const layouts=[['0','10px','0'],['22px','-8px','18px'],['-10px','20px','-14px'],['18px','12px','-20px'],['-18px','-12px','24px'],['8px','-22px','12px']];
  const render=(index:number)=>{animations.forEach((animation)=>animation.cancel());animations=[];const panel=panels[index];stage.dataset.sceneId=panel?.id.replace('scene-panel-','')??'';if(reduced.matches||!visual||!Element.prototype.animate)return;all<HTMLElement>('span,b,i,em',visual).forEach((item,itemIndex)=>{const offset=layouts[index]?.[itemIndex%3]??'0';animations.push(item.animate([{opacity:.2,transform:`translate(${offset},10px) scale(.9)`},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:430,delay:itemIndex*65,easing:'cubic-bezier(.2,.72,.22,1)',fill:'both'}));});};
  const change=(event:Event)=>render((event as CustomEvent<{index:number}>).detail.index);root.addEventListener('sectiontabchange',change);render(0);
  return()=>{root.removeEventListener('sectiontabchange',change);animations.forEach((animation)=>animation.cancel());tabCleanup();};
}
