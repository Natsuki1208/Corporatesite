type MotionStage = HTMLElement & { _motionAnimations?: Animation[] };

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const productVideo = (stage: MotionStage) => stage.closest('.v2-prototype-stage')?.querySelector<HTMLVideoElement>('[data-product-video]');

function setFinal(stage: MotionStage) {
  stage._motionAnimations?.forEach((animation) => animation.cancel());
  stage._motionAnimations = [];
  stage.dataset.motionState = 'complete';
  productVideo(stage)?.pause();
  stage.querySelectorAll<HTMLElement>('[data-motion-step]').forEach((step) => {
    step.style.opacity = '1';
    step.style.transform = 'none';
  });
  const status = stage.querySelector<HTMLElement>('[data-motion-status]');
  if (status) status.textContent = status.closest('html')?.lang === 'en' ? 'Ready for human decision' : '等待人員決定';
}

function stop(stage: MotionStage) {
  stage._motionAnimations?.forEach((animation) => animation.pause());
  productVideo(stage)?.pause();
}

function play(stage: MotionStage, restart = false) {
  document.querySelectorAll<MotionStage>('[data-product-motion-stage]').forEach((other) => {
    if (other !== stage) stop(other);
  });
  const connection = (navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  if (reducedMotion() || connection?.saveData) { setFinal(stage); return; }
  stage._motionAnimations?.forEach((animation) => animation.cancel());
  stage.dataset.motionState = 'idle';
  void stage.offsetWidth;
  stage.dataset.motionState = 'playing';
  const status = stage.querySelector<HTMLElement>('[data-motion-status]');
  if (status) status.textContent = document.documentElement.lang === 'en' ? 'Understanding work context' : '正在理解工作脈絡';
  const video = productVideo(stage);
  if (video) {
    if (restart) video.currentTime = 0;
    video.play().catch(() => {
      if (status) status.textContent = document.documentElement.lang === 'en' ? 'Press play to view the scenario' : '按下播放以觀看情境';
    });
  }
  const steps = [...stage.querySelectorAll<HTMLElement>('[data-motion-step]')];
  const embodied = stage.dataset.product === 'elias-home' || stage.dataset.product === 'elias-rescue';
  const stepGap = embodied ? 600 : 620;
  const stepDuration = embodied ? 320 : 560;
  stage._motionAnimations = steps.map((step,index) => step.animate(
    [{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],
    {duration:stepDuration,delay:index*stepGap,easing:'cubic-bezier(.2,.75,.2,1)',fill:'both'}
  ));
  const last = stage._motionAnimations.at(-1);
  last?.finished.then(() => {
    if (stage.dataset.motionState !== 'playing') return;
    stage.dataset.motionState = 'complete';
    if (status) status.textContent = document.documentElement.lang === 'en' ? 'Ready for human decision' : '等待人員決定';
  }).catch(() => {});
}

export function initProductMotionControllers(root: ParentNode = document) {
  const stages = [...root.querySelectorAll<MotionStage>('[data-product-motion-stage]')];
  if (!stages.length) return () => {};
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    const stage = entry.target as MotionStage;
    if (entry.isIntersecting) play(stage); else stop(stage);
  }), {threshold:.35});
  stages.forEach((stage) => {
    if (stage.dataset.controllerReady) return;
    stage.dataset.controllerReady = 'true';
    stage.querySelector<HTMLButtonElement>('[data-motion-replay]')?.addEventListener('click', () => play(stage, true));
    if (reducedMotion()) setFinal(stage); else observer.observe(stage);
  });
  const onVisibility = () => {
    if (document.hidden) stages.forEach(stop);
    else stages.filter((stage) => stage.getBoundingClientRect().top < innerHeight && stage.getBoundingClientRect().bottom > 0).forEach((stage) => play(stage));
  };
  document.addEventListener('visibilitychange', onVisibility);
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); stages.forEach((stage) => { stage._motionAnimations?.forEach((animation) => animation.cancel()); productVideo(stage)?.pause(); }); };
}
