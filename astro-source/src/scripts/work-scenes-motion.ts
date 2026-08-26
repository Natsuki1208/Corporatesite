import { all, one } from './dom';
import { initWorkSceneTabs } from './tabs';

export function initWorkScenesMotion(reduced: MediaQueryList) {
  const root=one<HTMLElement>('[data-scene-console]');
  const stage=one<HTMLElement>('[data-scene-stage]');
  if(!root||!stage)return()=>{};
  const tabCleanup=initWorkSceneTabs();
  const panels=all<HTMLElement>('[data-scene-panel]',root);
  let animations:Animation[]=[];
  const stop=()=>{animations.forEach((animation)=>animation.cancel());animations=[];};
  const render=(index:number)=>{
    stop();
    const panel=panels[index];
    const sceneId=panel?.id.replace('scene-panel-','')??'';
    stage.dataset.sceneId=sceneId;
    const plot=one<SVGGElement>(`[data-scene-plot="${sceneId}"]`,stage);
    if(reduced.matches||!plot||!Element.prototype.animate)return;
    const sequence=[...all<SVGElement>('.scene-input',plot),...all<SVGElement>('.scene-route',plot),...all<SVGElement>('.scene-ai',plot),...all<SVGElement>('.scene-review',plot),...all<SVGElement>('.scene-result',plot)];
    sequence.forEach((item,itemIndex)=>{
      animations.push(item.animate([
        {opacity:.08,transform:itemIndex<2?'translateX(-12px)':'scale(.92)'},
        {opacity:1,transform:'none'}
      ],{duration:520,delay:itemIndex*150,easing:'cubic-bezier(.22,.8,.26,1)',fill:'both'}));
      if(item instanceof SVGGeometryElement){let length=0;try{length=item.getTotalLength();}catch{/* static fallback */}if(length)animations.push(item.animate([{strokeDasharray:`${length}`,strokeDashoffset:length},{strokeDasharray:`${length}`,strokeDashoffset:0}],{duration:820,delay:itemIndex*150,easing:'cubic-bezier(.22,.8,.26,1)',fill:'both'}));}
    });
  };
  const change=(event:Event)=>render((event as CustomEvent<{index:number}>).detail.index);
  root.addEventListener('sectiontabchange',change);
  render(0);
  const motionChange=()=>render(panels.findIndex((panel)=>!panel.hidden));reduced.addEventListener('change',motionChange);
  return()=>{root.removeEventListener('sectiontabchange',change);reduced.removeEventListener('change',motionChange);stop();tabCleanup();};
}
