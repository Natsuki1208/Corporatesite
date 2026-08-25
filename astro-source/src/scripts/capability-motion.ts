import { all, one } from './dom';

export function initCapabilityMotion(reduced: MediaQueryList) {
  const root=one<HTMLElement>('#capabilities');
  const cards=all<HTMLElement>('[data-solution-card]',root ?? document);
  const nodes=all<HTMLElement>('[data-assembly-node]',root ?? document);
  if(!root||!cards.length)return()=>{};
  const panelAnimations=new Map<HTMLElement,Animation>();
  const cardAnimations=new Set<Animation>();
  const cleanups:Array<()=>void>=[];
  let active=0,timer=0,visible=false;

  const stopPanel=(panel:HTMLElement)=>{panelAnimations.get(panel)?.cancel();panelAnimations.delete(panel);};
  const close=(card:HTMLElement,button:HTMLButtonElement,panel:HTMLElement)=>{stopPanel(panel);button.setAttribute('aria-expanded','false');card.classList.remove('expanded');button.querySelector('i')!.textContent='＋';if(reduced.matches||!panel.animate){panel.hidden=true;return;}const animation=panel.animate([{height:`${panel.scrollHeight}px`,opacity:1},{height:'0px',opacity:0}],{duration:260,easing:'ease',fill:'both'});panelAnimations.set(panel,animation);animation.addEventListener('finish',()=>{if(button.getAttribute('aria-expanded')==='false')panel.hidden=true;animation.cancel();panelAnimations.delete(panel);},{once:true});};
  const open=(card:HTMLElement,button:HTMLButtonElement,panel:HTMLElement)=>{stopPanel(panel);cards.forEach((other)=>{if(other===card)return;const otherButton=other.querySelector<HTMLButtonElement>('[data-solution-toggle]');const otherPanel=otherButton?.getAttribute('aria-controls')?document.getElementById(otherButton.getAttribute('aria-controls')!):null;if(otherButton&&otherPanel&&otherButton.getAttribute('aria-expanded')==='true')close(other,otherButton,otherPanel);});button.setAttribute('aria-expanded','true');card.classList.add('expanded');button.querySelector('i')!.textContent='−';panel.hidden=false;if(reduced.matches||!panel.animate)return;const animation=panel.animate([{height:'0px',opacity:0},{height:`${panel.scrollHeight}px`,opacity:1}],{duration:340,easing:'cubic-bezier(.2,.72,.22,1)'});panelAnimations.set(panel,animation);animation.addEventListener('finish',()=>panelAnimations.delete(panel),{once:true});};

  const frames=[
    ['translateX(-14px) rotate(45deg)','translateX(12px) rotate(45deg)'],
    ['translate(-18px,-8px) scale(.7)','translate(130px,18px) scale(1)'],
    ['translateX(-20px) scale(1)','translateX(90px) scale(.65)'],
    ['translateY(14px) scale(.55)','translateY(0) scale(1.25)'],
    ['scaleX(.25)','scaleX(1)'],
    ['translateY(-16px) scaleX(.4)','translateY(0) scaleX(1)'],
  ];
  const show=(index:number)=>{active=index;root.dataset.activeCapability=String(index);cards.forEach((card,item)=>card.classList.toggle('auto-active',item===index));nodes.forEach((node,item)=>node.classList.toggle('active',item<=index));cardAnimations.forEach((animation)=>animation.cancel());cardAnimations.clear();if(reduced.matches||!('animate' in Element.prototype))return;const [from,to]=frames[index]??frames[0];all<HTMLElement>('.solution-motion i',cards[index]).forEach((piece,item)=>{const animation=piece.animate([{opacity:.25,transform:from},{opacity:1,transform:to},{opacity:.72,transform:'none'}],{duration:1150,delay:item*70,easing:'cubic-bezier(.2,.72,.22,1)'});cardAnimations.add(animation);animation.addEventListener('finish',()=>cardAnimations.delete(animation),{once:true});});};
  const stopCycle=()=>{window.clearTimeout(timer);timer=0;};
  const schedule=()=>{stopCycle();if(!visible||document.hidden||reduced.matches)return;timer=window.setTimeout(()=>{show((active+1)%cards.length);schedule();},2000);};

  cards.forEach((card)=>{const button=card.querySelector<HTMLButtonElement>('[data-solution-toggle]');const id=button?.getAttribute('aria-controls');const panel=id?document.getElementById(id):null;if(!button||!panel)return;const click=()=>button.getAttribute('aria-expanded')==='true'?close(card,button,panel):open(card,button,panel);const key=(event:KeyboardEvent)=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){event.preventDefault();close(card,button,panel);button.focus();}};button.addEventListener('click',click);card.addEventListener('keydown',key);cleanups.push(()=>{button.removeEventListener('click',click);card.removeEventListener('keydown',key);});});
  const observer='IntersectionObserver'in window?new IntersectionObserver(([entry])=>{visible=Boolean(entry?.isIntersecting);visible?schedule():stopCycle();},{threshold:.12}):null;
  if(observer)observer.observe(root);else{visible=true;schedule();}
  const visibility=()=>document.hidden?stopCycle():schedule();
  const motionChange=()=>{stopCycle();panelAnimations.forEach((animation)=>animation.cancel());panelAnimations.clear();cards.forEach((card)=>{const button=card.querySelector<HTMLButtonElement>('[data-solution-toggle]');const panel=button?.getAttribute('aria-controls')?document.getElementById(button.getAttribute('aria-controls')!):null;if(button&&panel)panel.hidden=button.getAttribute('aria-expanded')!=='true';});show(reduced.matches?cards.length-1:active);schedule();};
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',motionChange);show(reduced.matches?cards.length-1:0);
  return()=>{stopCycle();observer?.disconnect();cardAnimations.forEach((animation)=>animation.cancel());panelAnimations.forEach((animation)=>animation.cancel());document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',motionChange);cleanups.forEach((cleanup)=>cleanup());};
}
