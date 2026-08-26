type Target = { x:number; y:number; color:string; size?:number };
type Particle = { x:number; y:number; tx:number; ty:number; color:string; size?:number; vx:number; vy:number; alpha:number; phase:number };
type Stage = { canvas:HTMLCanvasElement; ctx:CanvasRenderingContext2D; kind:string; particles:Particle[]; visible:boolean; settled:boolean; started:boolean; width:number; height:number; dpr:number; observer?:MutationObserver };

const palette = { cyan:'#55cbd0', rose:'#b88679', champagne:'#e4c98f', gold:'#c99743', ivory:'#e9e4d8', dim:'#536160' };
const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
const seeded=(seed:number)=>{const value=Math.sin(seed*9283.17)*43758.5453;return value-Math.floor(value);};

const line=(out:Target[],x1:number,y1:number,x2:number,y2:number,count:number,color:string,size=1.6)=>{
  for(let i=0;i<count;i++){const t=count===1?0:i/(count-1);out.push({x:x1+(x2-x1)*t,y:y1+(y2-y1)*t,color,size});}
};
const ring=(out:Target[],cx:number,cy:number,rx:number,ry:number,count:number,color:string,offset=0,size=1.7)=>{
  for(let i=0;i<count;i++){const a=offset+Math.PI*2*i/count;out.push({x:cx+Math.cos(a)*rx,y:cy+Math.sin(a)*ry,color,size});}
};
const wave=(out:Target[],x1:number,x2:number,cy:number,amp:number,count:number,color:string,cycles=1,size=1.7)=>{
  for(let i=0;i<count;i++){const t=i/(count-1);out.push({x:x1+(x2-x1)*t,y:cy+Math.sin(t*Math.PI*2*cycles)*amp,color,size});}
};
const rect=(out:Target[],x:number,y:number,w:number,h:number,count:number,color:string,size=1.6)=>{
  const each=Math.max(3,Math.floor(count/4));line(out,x,y,x+w,y,each,color,size);line(out,x+w,y,x+w,y+h,each,color,size);line(out,x+w,y+h,x,y+h,each,color,size);line(out,x,y+h,x,y,each,color,size);
};
const bezier=(out:Target[],p0:[number,number],p1:[number,number],p2:[number,number],p3:[number,number],count:number,color:string,size=1.7)=>{
  for(let i=0;i<count;i++){const t=i/(count-1),u=1-t;out.push({x:u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],y:u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1],color,size});}
};
const cluster=(out:Target[],cx:number,cy:number,r:number,count:number,color:string,size=1.8)=>{
  for(let i=0;i<count;i++){const a=seeded(i+cx)*Math.PI*2,d=Math.sqrt(seeded(i+cy+44))*r;out.push({x:cx+Math.cos(a)*d,y:cy+Math.sin(a)*d,color,size:size+seeded(i+9)*1.2});}
};

type ParticleMaterial='dot'|'capsule'|'spark'|'paper'|'packet'|'bar'|'fragment';
const materialFor=(kind:string,index:number):ParticleMaterial=>{
  if(kind==='scene-service'||kind==='case-service')return index%5===0?'capsule':'dot';
  if(kind==='scene-operations'||kind==='case-operations')return index%3===0?'spark':'dot';
  if(kind==='scene-admin'||kind==='case-knowledge')return index%4===0?'paper':'dot';
  if(kind==='scene-it')return index%3===0?'packet':'dot';
  if(kind==='scene-management')return index%4===0?'bar':'dot';
  if(kind==='scene-knowledge')return index%4===0?'fragment':'dot';
  if(kind==='contact')return index%6===0?'spark':'dot';
  return 'dot';
};

function targetsFor(kind:string,width:number,height:number,count:number):Target[]{
  const out:Target[]=[]; const w=width,h=height;
  if(kind==='problems'){
    for(let i=0;i<6;i++) bezier(out,[w*.04,h*(.16+i*.12)],[w*.30,h*(.04+i*.15)],[w*.34,h*.48],[w*.48,h*.50],18,i%2?palette.dim:palette.cyan,1.4);
    for(let i=0;i<4;i++) bezier(out,[w*.96,h*(.18+i*.18)],[w*.72,h*(.10+i*.2)],[w*.66,h*.50],[w*.52,h*.50],18,i%2?palette.dim:palette.rose,1.4);
    ring(out,w*.5,h*.5,Math.min(w,h)*.17,Math.min(w,h)*.17,58,palette.champagne,0,2);
    ring(out,w*.5,h*.5,Math.min(w,h)*.07,Math.min(w,h)*.07,30,palette.gold,0,2.3);cluster(out,w*.5,h*.5,10,18,palette.ivory,2.2);
  } else if(kind==='partner'){
    line(out,w*.37,h*.73,w*.47,h*.28,34,palette.champagne,2);line(out,w*.47,h*.28,w*.57,h*.73,34,palette.champagne,2);line(out,w*.41,h*.56,w*.53,h*.56,20,palette.champagne,2);
    line(out,w*.63,h*.31,w*.63,h*.73,34,palette.champagne,2);line(out,w*.60,h*.31,w*.66,h*.31,9,palette.champagne,2);line(out,w*.60,h*.73,w*.66,h*.73,9,palette.champagne,2);
    bezier(out,[w*.03,h*.62],[w*.24,h*.62],[w*.26,h*.77],[w*.52,h*.78],42,palette.rose,2);
    bezier(out,[w*.04,h*.27],[w*.25,h*.27],[w*.26,h*.42],[w*.44,h*.47],40,palette.cyan,1.8);
    bezier(out,[w*.52,h*.78],[w*.70,h*.78],[w*.73,h*.62],[w*.88,h*.61],32,palette.rose,2);bezier(out,[w*.65,h*.48],[w*.73,h*.48],[w*.76,h*.61],[w*.88,h*.61],28,palette.champagne,2);
    ring(out,w*.91,h*.61,Math.min(w,h)*.07,Math.min(w,h)*.07,28,palette.gold,0,2.2);cluster(out,w*.91,h*.61,9,14,palette.ivory,2.1);
  } else if(kind==='work-scenes'){
    return targetsFor('scene-service',width,height,count);
  } else if(kind==='scene-service'){
    rect(out,w*.06,h*.18,w*.30,h*.18,42,palette.cyan,2);rect(out,w*.12,h*.47,w*.36,h*.20,48,palette.cyan,2);line(out,w*.25,h*.36,w*.22,h*.43,8,palette.cyan,2);cluster(out,w*.58,h*.47,Math.min(w,h)*.13,44,palette.champagne,2);bezier(out,[w*.68,h*.47],[w*.76,h*.47],[w*.75,h*.69],[w*.90,h*.69],30,palette.rose,2);rect(out,w*.80,h*.22,w*.15,h*.22,32,palette.gold,2);
  } else if(kind==='scene-operations'){
    wave(out,w*.04,w*.48,h*.52,h*.20,72,palette.cyan,2.4,2);cluster(out,w*.58,h*.48,Math.min(w,h)*.12,40,palette.champagne,2);line(out,w*.69,h*.50,w*.76,h*.50,14,palette.rose,2);for(let i=0;i<4;i++)line(out,w*(.78+i*.045),h*.74,w*(.78+i*.045),h*(.58-i*.09),13,palette.gold,2);
  } else if(kind==='scene-admin'){
    rect(out,w*.05,h*.13,w*.26,h*.24,34,palette.cyan,2);rect(out,w*.12,h*.31,w*.28,h*.25,36,palette.cyan,2);rect(out,w*.20,h*.49,w*.28,h*.25,36,palette.cyan,2);cluster(out,w*.59,h*.48,Math.min(w,h)*.11,36,palette.champagne,2);ring(out,w*.77,h*.53,Math.min(w,h)*.07,Math.min(w,h)*.07,24,palette.rose,0,2);rect(out,w*.84,h*.25,w*.11,h*.48,40,palette.gold,2);
  } else if(kind==='scene-it'){
    const nodes:[[number,number],...Array<[number,number]>]=[[.12,.23],[.18,.70],[.34,.36],[.39,.72],[.58,.50]];nodes.forEach((n,i)=>{ring(out,w*n[0],h*n[1],13,13,12,i===nodes.length-1?palette.champagne:palette.cyan);if(i<nodes.length-1)line(out,w*n[0],h*n[1],w*.58,h*.50,15,palette.dim,1.2)});ring(out,w*.58,h*.50,Math.min(w,h)*.15,Math.min(w,h)*.15,38,palette.champagne);bezier(out,[w*.70,h*.5],[w*.78,h*.5],[w*.80,h*.66],[w*.92,h*.66],30,palette.rose,2);ring(out,w*.92,h*.66,16,16,16,palette.gold);
  } else if(kind==='scene-management'){
    for(let i=0;i<5;i++)line(out,w*(.08+i*.07),h*.76,w*(.08+i*.07),h*(.70-i*.10),15,palette.cyan,2);bezier(out,[w*.07,h*.68],[w*.30,h*.52],[w*.42,h*.23],[w*.60,h*.35],46,palette.champagne,2);ring(out,w*.69,h*.42,Math.min(w,h)*.11,Math.min(w,h)*.11,34,palette.rose);bezier(out,[w*.78,h*.42],[w*.84,h*.42],[w*.87,h*.28],[w*.95,h*.28],24,palette.gold,2);
  } else if(kind==='scene-knowledge'){
    rect(out,w*.05,h*.13,w*.22,h*.21,30,palette.cyan,2);rect(out,w*.10,h*.40,w*.22,h*.21,30,palette.cyan,2);rect(out,w*.18,h*.65,w*.22,h*.20,30,palette.cyan,2);for(let i=0;i<62;i++){const a=i*.34,r=2+i*1.25;out.push({x:w*.58+Math.cos(a)*r,y:h*.5+Math.sin(a)*r,color:i%3?palette.champagne:palette.cyan,size:2});}rect(out,w*.79,h*.26,w*.16,h*.48,42,palette.gold,2);
  } else if(kind==='capabilities'){
    const cx=w*.5,cy=h*.5,r=Math.min(w,h)*.31;for(let i=0;i<6;i++){const a=-Math.PI/2+i*Math.PI/3,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;cluster(out,x,y,22,24,[palette.cyan,palette.rose,palette.champagne,palette.gold,palette.cyan,palette.rose][i],1.8);bezier(out,[x,y],[x+(cx-x)*.35,y+(cy-y)*.1],[cx+(x-cx)*.15,cy+(y-cy)*.4],[cx,cy],18,palette.dim,1.2);}ring(out,cx,cy,Math.min(w,h)*.13,Math.min(w,h)*.13,44,palette.gold,0,2.1);cluster(out,cx,cy,12,20,palette.ivory,2.2);
  } else if(kind==='adoption'){
    const colors=[palette.rose,palette.cyan,palette.champagne,palette.cyan,palette.gold,palette.ivory];
    bezier(out,[w*.035,h*.66],[w*.27,h*.06],[w*.69,h*.94],[w*.965,h*.36],96,palette.dim,1.2);
    for(let i=0;i<6;i++){const t=i/5,x=w*(.07+t*.86),y=h*(.58+Math.sin(t*Math.PI*2)*.20);cluster(out,x,y,9+i*1.4,18,colors[i],1.8);if(i<5)bezier(out,[x,y],[x+w*.055,y],[x+w*.10,h*(.58+Math.sin((t+.15)*Math.PI*2)*.20)],[w*(.07+(i+1)/5*.86),h*(.58+Math.sin((i+1)/5*Math.PI*2)*.20)],16,colors[i],1.4);}
  } else if(kind.startsWith('capability-')){
    const id=kind.slice(11);
    if(id==='strategy'){for(let i=0;i<6;i++)cluster(out,w*.12,h*(.14+i*.14),9,10,i===2?palette.gold:palette.dim,1.7);bezier(out,[w*.18,h*.5],[w*.42,h*.5],[w*.55,h*.5],[w*.78,h*.5],46,palette.cyan,1.7);ring(out,w*.84,h*.5,26,26,24,palette.gold);}
    else if(id==='experience'){bezier(out,[w*.08,h*.28],[w*.28,h*.28],[w*.30,h*.48],[w*.50,h*.48],42,palette.rose,2);bezier(out,[w*.08,h*.72],[w*.28,h*.72],[w*.30,h*.52],[w*.50,h*.52],42,palette.cyan,2);ring(out,w*.58,h*.5,34,34,28,palette.champagne);bezier(out,[w*.66,h*.5],[w*.78,h*.5],[w*.78,h*.28],[w*.92,h*.28],24,palette.gold,2);bezier(out,[w*.66,h*.5],[w*.78,h*.5],[w*.78,h*.72],[w*.92,h*.72],24,palette.rose,2);}
    else if(id==='data'){for(let i=0;i<3;i++)rect(out,w*.06,h*(.12+i*.27),w*.18,h*.18,24,palette.cyan);for(let i=0;i<58;i++){const a=i*.4,r=2+i*.8;out.push({x:w*.52+Math.cos(a)*r,y:h*.5+Math.sin(a)*r,color:palette.champagne,size:1.8});}rect(out,w*.76,h*.20,w*.18,h*.60,38,palette.gold,2);}
    else if(id==='agent'){cluster(out,w*.12,h*.5,18,20,palette.cyan);ring(out,w*.46,h*.5,42,42,34,palette.champagne);ring(out,w*.46,h*.5,70,70,44,palette.rose);for(let i=0;i<3;i++)cluster(out,w*(.73+i*.09),h*.5,12,12,i===2?palette.dim:palette.gold);}
    else if(id==='integration'){for(let i=0;i<3;i++)cluster(out,w*.10,h*(.22+i*.28),15,18,palette.cyan);for(let i=0;i<3;i++)bezier(out,[w*.16,h*(.22+i*.28)],[w*.34,h*(.22+i*.28)],[w*.39,h*.5],[w*.54,h*.5],24,palette.champagne);wave(out,w*.54,w*.94,h*.5,h*.12,58,palette.gold,1.5,2);}
    else {ring(out,w*.5,h*.5,Math.min(w,h)*.32,Math.min(w,h)*.32,72,palette.cyan);[.15,.34,.53,.72].forEach((t,i)=>cluster(out,w*.5+Math.cos(t*Math.PI*2)*Math.min(w,h)*.32,h*.5+Math.sin(t*Math.PI*2)*Math.min(w,h)*.32,10,12,[palette.rose,palette.champagne,palette.gold,palette.rose][i]));ring(out,w*.5,h*.5,28,28,26,palette.gold);}
  } else if(kind==='case-knowledge'){
    for(let i=0;i<4;i++)rect(out,w*(.05+i*.06),h*(.14+i*.13),w*.18,h*.16,24,palette.cyan);for(let i=0;i<70;i++){const a=i*.38,r=2+i*.9;out.push({x:w*.55+Math.cos(a)*r,y:h*.5+Math.sin(a)*r,color:i%4?palette.champagne:palette.cyan,size:1.9});}rect(out,w*.78,h*.24,w*.17,h*.50,42,palette.gold,2);
  } else if(kind==='case-service'){
    for(let i=0;i<4;i++)rect(out,w*.04,h*(.12+i*.2),w*(.20+i*.025),h*.12,22,palette.cyan);cluster(out,w*.51,h*.5,45,48,palette.champagne);bezier(out,[w*.60,h*.5],[w*.72,h*.5],[w*.74,h*.28],[w*.91,h*.28],30,palette.gold,2);bezier(out,[w*.60,h*.5],[w*.72,h*.5],[w*.74,h*.72],[w*.91,h*.72],30,palette.rose,2);
  } else if(kind==='case-operations'){
    wave(out,w*.03,w*.44,h*.5,h*.25,90,palette.cyan,3,2);ring(out,w*.54,h*.5,45,45,38,palette.champagne);line(out,w*.60,h*.5,w*.72,h*.5,22,palette.rose,2);ring(out,w*.78,h*.5,28,28,24,palette.rose);bezier(out,[w*.82,h*.5],[w*.87,h*.5],[w*.89,h*.31],[w*.96,h*.31],24,palette.gold,2);
  } else if(kind==='contact'){
    for(let i=0;i<6;i++)bezier(out,[w*.02,h*(.12+i*.15)],[w*.30,h*(.12+i*.12)],[w*.46,h*.5],[w*.64,h*.5],28,[palette.dim,palette.rose,palette.champagne,palette.dim,palette.rose,palette.champagne][i],1.8);
    line(out,w*.64,h*.50,w*.78,h*.34,26,palette.gold,2.1);line(out,w*.64,h*.50,w*.78,h*.66,26,palette.gold,2.1);line(out,w*.78,h*.34,w*.78,h*.66,20,palette.gold,2.1);cluster(out,w*.69,h*.5,13,18,palette.ivory,2.2);bezier(out,[w*.78,h*.5],[w*.86,h*.5],[w*.90,h*.5],[w*.98,h*.5],34,palette.cyan,2.2);
  }
  if(!out.length)cluster(out,w*.5,h*.5,Math.min(w,h)*.3,count,palette.cyan);
  while(out.length<count){const base=out[out.length%Math.max(1,out.length)]??{x:w*.5,y:h*.5,color:palette.cyan,size:1.7};const i=out.length;out.push({...base,x:base.x+(seeded(i)-.5)*8,y:base.y+(seeded(i+55)-.5)*8,size:(base.size??1.7)+seeded(i+8)});}
  if(out.length===count)return out;
  // Preserve every narrative phase on smaller screens instead of trimming the
  // later review/result targets merely because they were appended last.
  return Array.from({length:count},(_,i)=>out[Math.min(out.length-1,Math.floor((i+.5)*out.length/count))]);
}

function dynamicKind(stage:Stage){
  if(stage.kind==='work-scenes') return `scene-${stage.canvas.closest('[data-scene-stage]')?.getAttribute('data-scene-id')??'service'}`;
  return stage.kind;
}

function energyCore(kind:string,width:number,height:number){
  if(kind==='problems'||kind==='capabilities')return{x:width*.5,y:height*.5,r:Math.min(width,height)*(kind==='capabilities' ? .14 : .12),color:kind==='problems'?palette.champagne:palette.gold};
  if(kind==='partner')return{x:width*.91,y:height*.61,r:Math.min(width,height)*.075,color:palette.gold};
  if(kind==='capability-agent')return{x:width*.46,y:height*.5,r:Math.min(width,height)*.16,color:palette.champagne};
  return null;
}

export function initSectionParticles(reduced:MediaQueryList){
  const canvases=Array.from(document.querySelectorAll<HTMLCanvasElement>('[data-particle-stage]'));
  if(!canvases.length)return()=>{};
  const stages:Stage[]=[];let raf=0;let resizeTimer=0;
  const resize=(stage:Stage,reset=true)=>{
    const box=stage.canvas.getBoundingClientRect();if(box.width<2||box.height<2)return;
    stage.dpr=Math.min(window.devicePixelRatio||1,2);stage.width=box.width;stage.height=box.height;stage.canvas.width=Math.round(box.width*stage.dpr);stage.canvas.height=Math.round(box.height*stage.dpr);stage.ctx.setTransform(stage.dpr,0,0,stage.dpr,0,0);
    const count=clamp(Math.round(box.width*(innerWidth<620?.20:.30)),innerWidth<620?80:120,innerWidth<620?170:260);const targets=targetsFor(dynamicKind(stage),box.width,box.height,count);
    stage.particles=targets.map((target,i)=>({ color:target.color,size:target.size,tx:target.x,ty:target.y,x:reset?seeded(i+17)*box.width:target.x,y:reset?seeded(i+91)*box.height:target.y,vx:0,vy:0,alpha:.35+seeded(i+6)*.65,phase:seeded(i+3)*Math.PI*2 }));stage.settled=reduced.matches;stage.started=!reset;draw(stage,reduced.matches?1:0);
  };
  const draw=(stage:Stage,progress:number)=>{
    const {ctx,width,height}=stage;const kind=dynamicKind(stage);ctx.clearRect(0,0,width,height);const pulse=1-Math.min(1,progress);const core=energyCore(kind,width,height);
    if(core){
      const gradient=ctx.createRadialGradient(core.x,core.y,0,core.x,core.y,core.r*1.9);gradient.addColorStop(0,`${core.color}38`);gradient.addColorStop(.22,`${core.color}18`);gradient.addColorStop(1,`${core.color}00`);ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(core.x,core.y,core.r*1.9,0,Math.PI*2);ctx.fill();
      ctx.save();ctx.lineCap='round';for(let ringIndex=0;ringIndex<3;ringIndex++){ctx.strokeStyle=[palette.cyan,palette.rose,core.color][ringIndex];ctx.globalAlpha=.22+progress*.34;ctx.lineWidth=ringIndex===2?2:1;const radius=core.r*(.74+ringIndex*.34);for(let segment=0;segment<4;segment++){const start=segment*Math.PI/2+ringIndex*.31+progress*.25;ctx.beginPath();ctx.arc(core.x,core.y,radius,start,start+Math.PI*.34);ctx.stroke();}}ctx.restore();
    }
    if(kind==='problems'){
      const scanX=width*(.28+progress*.44),scan=ctx.createLinearGradient(scanX-38,0,scanX+38,0);scan.addColorStop(0,'rgba(85,203,208,0)');scan.addColorStop(.5,'rgba(85,203,208,.12)');scan.addColorStop(1,'rgba(85,203,208,0)');ctx.fillStyle=scan;ctx.fillRect(scanX-38,height*.08,76,height*.84);
    }
    for(let i=0;i<stage.particles.length;i++){
      const p=stage.particles[i],material=materialFor(kind,i),glow=i%17===0||p.color===palette.gold;
      const depth=.72+seeded(i+31)*.72,irrelevant=kind==='problems'&&p.color===palette.dim;
      ctx.save();ctx.globalAlpha=p.alpha*(.70+pulse*.30)*(irrelevant?Math.max(.16,1-progress*.82):1);ctx.fillStyle=p.color;ctx.strokeStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=glow?8+pulse*8:material==='spark'?5:0;const size=(p.size??1.7)*(glow?1.35:1)*depth;
      ctx.translate(p.x,p.y);ctx.beginPath();
      if(material==='capsule'){ctx.scale(2.8,.85);ctx.arc(0,0,size,0,Math.PI*2);ctx.fill();}
      else if(material==='spark'){ctx.rotate(-.45+seeded(i)*.9);ctx.lineWidth=Math.max(1,size*.55);ctx.moveTo(-size*3,0);ctx.lineTo(size*3,0);ctx.stroke();}
      else if(material==='paper'){ctx.rotate((seeded(i)-.5)*.45);ctx.fillRect(-size*1.8,-size*1.2,size*3.6,size*2.4);ctx.globalAlpha*=.55;ctx.strokeStyle=palette.ivory;ctx.strokeRect(-size*1.8,-size*1.2,size*3.6,size*2.4);}
      else if(material==='packet'){ctx.rotate(Math.PI/4);ctx.fillRect(-size*1.25,-size*1.25,size*2.5,size*2.5);}
      else if(material==='bar'){ctx.fillRect(-size*.7,-size*(1.5+seeded(i)*2),size*1.4,size*(3+seeded(i)*4));}
      else if(material==='fragment'){ctx.rotate((seeded(i)-.5)*1.1);ctx.moveTo(-size*1.8,size);ctx.lineTo(0,-size*1.4);ctx.lineTo(size*1.8,size);ctx.closePath();ctx.fill();}
      else if(i%11===0){ctx.rotate(Math.PI/4);ctx.fillRect(-size,-size,size*2,size*2);}
      else{ctx.arc(0,0,size,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    }
  };
  const start=()=>{if(!raf&&!reduced.matches&&!document.hidden)raf=requestAnimationFrame(tick);};
  const tick=()=>{raf=0;let active=false;for(const stage of stages){if(!stage.visible||stage.settled)continue;active=true;let remaining=0;const kind=dynamicKind(stage);const spring=kind.includes('operations')?.068:kind.includes('admin')||kind.includes('knowledge')?.032:kind==='contact'?.052:.045;const damping=kind.includes('operations')?.72:kind.includes('admin')||kind.includes('knowledge')?.84:.79;for(const p of stage.particles){const ax=(p.tx-p.x)*spring,ay=(p.ty-p.y)*spring;p.vx=(p.vx+ax)*damping;p.vy=(p.vy+ay)*damping;p.x+=p.vx;p.y+=p.vy;remaining+=Math.abs(p.tx-p.x)+Math.abs(p.ty-p.y);}const progress=1-clamp(remaining/(stage.particles.length*Math.max(stage.width,stage.height)*.42),0,1);if(remaining<stage.particles.length*.34){stage.particles.forEach(p=>{p.x=p.tx;p.y=p.ty;p.vx=p.vy=0;});stage.settled=true;draw(stage,1);}else draw(stage,progress);}if(active)start();};
  const reset=(stage:Stage)=>{resize(stage,true);stage.started=true;stage.settled=reduced.matches;if(reduced.matches){stage.particles.forEach(p=>{p.x=p.tx;p.y=p.ty;});draw(stage,1);}else start();};
  const io='IntersectionObserver'in window?new IntersectionObserver(entries=>{entries.forEach(entry=>{const stage=stages.find(item=>item.canvas===entry.target);if(!stage)return;stage.visible=entry.isIntersecting;if(entry.isIntersecting&&!stage.started)reset(stage);});start();},{threshold:.08}):null;
  canvases.forEach(canvas=>{const ctx=canvas.getContext('2d');if(!ctx)return;const stage:Stage={canvas,ctx,kind:canvas.dataset.particleStage??'',particles:[],visible:!io,settled:false,started:false,width:0,height:0,dpr:1};stages.push(stage);resize(stage,true);io?.observe(canvas);if(stage.kind==='work-scenes'){const parent=canvas.closest('[data-scene-stage]');if(parent){stage.observer=new MutationObserver(()=>reset(stage));stage.observer.observe(parent,{attributes:true,attributeFilter:['data-scene-id']});}}});
  const onTabs=()=>stages.forEach(stage=>{if(stage.kind.startsWith('case-'))requestAnimationFrame(()=>{if(stage.canvas.offsetParent)reset(stage);});});
  const replayBindings:Array<[Element,EventListener]>=[];
  const bindReplay=(selector:string,kind:string)=>{document.querySelectorAll(selector).forEach(button=>{const handler=()=>{const stage=stages.find(item=>item.kind===kind);if(stage)reset(stage);};button.addEventListener('click',handler);replayBindings.push([button,handler]);});};
  bindReplay('[data-problem-replay]','problems');bindReplay('[data-partner-replay]','partner');bindReplay('[data-core-replay]','capabilities');
  stages.filter(stage=>stage.kind.startsWith('capability-')).forEach(stage=>{const card=stage.canvas.closest('[data-capability-card]')??stage.canvas.closest('.solution-card');if(!card)return;const handler=()=>reset(stage);card.addEventListener('pointerenter',handler);card.addEventListener('focusin',handler);replayBindings.push([card,handler],[card,handler]);});
  document.querySelector('#cases')?.addEventListener('sectiontabchange',onTabs);
  const onResize=()=>{clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>stages.forEach(stage=>resize(stage,false)),160);};
  const onVisibility=()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;stages.forEach(stage=>{stage.particles.forEach(p=>{p.x=p.tx;p.y=p.ty;});stage.settled=true;draw(stage,1);});}else start();};
  const onReduced=()=>stages.forEach(stage=>reset(stage));window.addEventListener('resize',onResize,{passive:true});document.addEventListener('visibilitychange',onVisibility);reduced.addEventListener('change',onReduced);if(!io)stages.forEach(reset);
  return()=>{if(raf)cancelAnimationFrame(raf);clearTimeout(resizeTimer);io?.disconnect();stages.forEach(stage=>stage.observer?.disconnect());document.querySelector('#cases')?.removeEventListener('sectiontabchange',onTabs);replayBindings.forEach(([target,handler])=>{target.removeEventListener('click',handler);target.removeEventListener('pointerenter',handler);target.removeEventListener('focusin',handler);});window.removeEventListener('resize',onResize);document.removeEventListener('visibilitychange',onVisibility);reduced.removeEventListener('change',onReduced);};
}
