import { one } from './dom';
import { gsap } from 'gsap';

type Particle = { x:number; y:number; z:number; size:number; color:string; drift:number };

export function initInnovationCore(reduced: MediaQueryList) {
  const root = one<HTMLElement>('[data-innovation-core]');
  const canvas = one<HTMLCanvasElement>('[data-core-canvas]',root ?? document);
  if (!root || !canvas) return () => {};
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  let particles: Particle[] = [];
  let frame = 0;
  let visible = false;
  let resizeTimer = 0;
  let settleTimer = 0;
  let settled = false;
  let width = 1;
  let height = 1;
  let phase = 0;
  let pointerX = 0;
  let pointerY = 0;
  const entrance = reduced.matches ? null : gsap.fromTo(root,
    { autoAlpha:.35, scale:.985 },
    { autoAlpha:1, scale:1, duration:1.15, ease:'power3.out', clearProps:'transform' }
  );

  const colors = ['#e5c783','#c99743','#b88679','#e9e4d8','#55cbd0'];
  const particleCount = () => innerWidth <= 600 ? 220 : innerWidth <= 1024 ? 420 : 700;
  const seed = () => {
    particles = Array.from({ length: particleCount() },(_,index) => {
      const angle = index * 2.399963 + Math.random() * .08;
      const radius = Math.sqrt((index + .5) / particleCount()) * .92;
      return { x:Math.cos(angle) * radius, y:Math.sin(angle) * radius * .72, z:(Math.random() - .5) * 1.5, size:.6 + Math.random() * 1.8, color:colors[index % colors.length], drift:.75 + Math.random() * .55 };
    });
  };
  const resize = () => {
    const rect = root.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1,2);
    width = Math.max(1,rect.width); height = Math.max(1,rect.height);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    context.setTransform(dpr,0,0,dpr,0,0); seed(); draw(true);
  };
  const drawOrbit = (radius:number,tilt:number,rotation:number,alpha:number) => {
    context.save(); context.translate(width/2,height/2); context.rotate(rotation); context.scale(1,tilt);
    context.beginPath(); context.arc(0,0,radius,0,Math.PI*2); context.strokeStyle=`rgba(229,199,131,${alpha})`; context.lineWidth=1; context.stroke(); context.restore();
  };
  const draw = (staticFrame=false) => {
    context.clearRect(0,0,width,height);
    const cx=width/2 + pointerX*10, cy=height/2 + pointerY*7;
    const radius=Math.min(width,height)*.31;
    drawOrbit(radius*1.34,.44,phase*.25,.28); drawOrbit(radius*1.08,.72,-.64-phase*.16,.2); drawOrbit(radius*1.48,.24,.7+phase*.12,.14);
    const cosine=Math.cos(phase), sine=Math.sin(phase);
    particles.forEach((particle,index) => {
      const rotation=phase*particle.drift;
      const cr=Math.cos(rotation), sr=Math.sin(rotation);
      const x1=particle.x*cr-particle.z*sr;
      const z1=particle.x*sr+particle.z*cr;
      const y1=particle.y*cosine*.94-z1*sine*.18;
      const scale=.74+(z1+1.5)*.18;
      const x=cx+x1*radius, y=cy+y1*radius;
      context.globalAlpha=Math.max(.16,Math.min(.9,.35+z1*.22)); context.fillStyle=particle.color;
      context.beginPath(); context.arc(x,y,particle.size*scale,0,Math.PI*2); context.fill();
      if(index%85===0){context.globalAlpha=.24;context.strokeStyle=particle.color;context.beginPath();context.moveTo(cx,cy);context.lineTo(x,y);context.stroke();}
    });
    context.globalAlpha=1;
    const glow=context.createRadialGradient(cx,cy,0,cx,cy,radius*.55); glow.addColorStop(0,'rgba(229,199,131,.22)'); glow.addColorStop(1,'rgba(8,10,13,0)'); context.fillStyle=glow; context.beginPath(); context.arc(cx,cy,radius*.58,0,Math.PI*2); context.fill();
    if(!staticFrame) phase+=.0028;
  };
  const loop = () => { frame=0; if(!visible || document.hidden || reduced.matches) return; draw(); frame=requestAnimationFrame(loop); };
  const start = () => {
    if(settled || frame || !visible || document.hidden || reduced.matches) return;
    frame=requestAnimationFrame(loop);
    if(!settleTimer) settleTimer=window.setTimeout(()=>{settleTimer=0;settled=true;stop();draw(true);root.dataset.coreComplete='true';},6500);
  };
  const stop = () => { if(frame) cancelAnimationFrame(frame); frame=0; };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; visible ? start() : stop(); },{threshold:.08}) : null;
  const visibility = () => document.hidden ? stop() : start();
  const motionChange = () => { stop(); window.clearTimeout(settleTimer); settleTimer=0; settled=reduced.matches; draw(true); if (!reduced.matches) start(); };
  const resizeHandler = () => { window.clearTimeout(resizeTimer); resizeTimer=window.setTimeout(()=>{stop();resize();start();},150); };
  const pointer = (event:PointerEvent) => { if(innerWidth<=900 || reduced.matches) return; const rect=root.getBoundingClientRect(); pointerX=(event.clientX-rect.left)/rect.width-.5; pointerY=(event.clientY-rect.top)/rect.height-.5; if(settled)draw(true); };
  const pointerLeave = () => { pointerX=0; pointerY=0; };
  resize(); if(observer)observer.observe(root);else{visible=true;draw(true);start();} document.addEventListener('visibilitychange',visibility); reduced.addEventListener('change',motionChange); window.addEventListener('resize',resizeHandler,{passive:true}); root.addEventListener('pointermove',pointer,{passive:true}); root.addEventListener('pointerleave',pointerLeave);
  if(reduced.matches) draw(true);
  return () => { entrance?.kill(); stop(); observer?.disconnect(); window.clearTimeout(resizeTimer); window.clearTimeout(settleTimer); document.removeEventListener('visibilitychange',visibility); reduced.removeEventListener('change',motionChange); window.removeEventListener('resize',resizeHandler); root.removeEventListener('pointermove',pointer); root.removeEventListener('pointerleave',pointerLeave); };
}
