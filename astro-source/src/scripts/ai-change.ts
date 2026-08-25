import { all, one } from './dom';

export function initAiChange(reduced: MediaQueryList) {
  const stage=one<HTMLElement>('[data-ai-change]');if(!stage)return()=>{};
  const tabs=all<HTMLButtonElement>('[data-ai-change-tab]',stage);
  const word=one<HTMLElement>('[data-ai-change-word]',stage),kicker=one<HTMLElement>('[data-ai-change-kicker]',stage),title=one<HTMLElement>('[data-ai-change-title]',stage),copy=one<HTMLElement>('[data-ai-change-copy]',stage),panel=one<HTMLElement>('[role="tabpanel"]',stage);
  const running=new Set<Animation>();const cleanups:Array<()=>void>=[];
  let active=0,timer=0,visible=false;
  const render=(index:number,focus=false)=>{const tab=tabs[index];if(!tab||!word||!kicker||!title||!copy||!panel)return;active=index;running.forEach((animation)=>animation.cancel());running.clear();stage.dataset.activeChange=String(index);word.textContent=tab.dataset.word??'';kicker.textContent=tab.dataset.kicker??'';title.textContent=tab.dataset.title??'';copy.textContent=tab.dataset.copy??'';panel.setAttribute('aria-labelledby',tab.id);tabs.forEach((item,itemIndex)=>{const selected=itemIndex===index;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;});if(!reduced.matches&&'animate'in Element.prototype){[word,title,copy].forEach((item,itemIndex)=>running.add(item.animate([{opacity:.12,transform:itemIndex?'translateY(18px)':'scaleX(.86)'},{opacity:1,transform:'none'}],{duration:460+itemIndex*80,easing:'cubic-bezier(.22,.8,.22,1)'})));all<HTMLElement>('.ai-change-visual i',stage).forEach((rail,itemIndex)=>running.add(rail.animate([{opacity:0,transform:'scaleX(0)'},{opacity:.9,transform:'scaleX(1)'},{opacity:.45,transform:'scaleX(.78)'}],{duration:1250,delay:itemIndex*100,easing:'cubic-bezier(.22,.8,.22,1)',fill:'both'})));}if(focus)tab.focus();};
  const stop=()=>{window.clearTimeout(timer);timer=0;};
  const schedule=()=>{stop();if(!visible||document.hidden||reduced.matches)return;timer=window.setTimeout(()=>{render((active+1)%tabs.length);schedule();},2000);};
  const choose=(index:number,focus=false)=>{render(index,focus);schedule();};
  tabs.forEach((tab,index)=>{const click=()=>choose(index);const keydown=(event:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;choose(next,true);};tab.addEventListener('click',click);tab.addEventListener('keydown',keydown);cleanups.push(()=>{tab.removeEventListener('click',click);tab.removeEventListener('keydown',keydown);});});
  const observer='IntersectionObserver'in window?new IntersectionObserver(([entry])=>{visible=Boolean(entry?.isIntersecting);visible?schedule():stop();},{threshold:.18}):null;
  if(observer)observer.observe(stage);else{visible=true;schedule();}
  const visibility=()=>document.hidden?stop():schedule();
  const motionChange=()=>{stop();running.forEach((animation)=>animation.cancel());running.clear();render(reduced.matches?tabs.length-1:active);schedule();};
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',motionChange);render(reduced.matches?tabs.length-1:0);
  return()=>{stop();observer?.disconnect();running.forEach((animation)=>animation.cancel());document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',motionChange);cleanups.forEach((cleanup)=>cleanup());};
}
