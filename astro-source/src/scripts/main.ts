import { createLifecycle } from './dom';
import { initNavigation } from './navigation-ui';
import { initRevealMotion, initSectionActivity } from './reveal-motion';
import { initInnovationCore } from './innovation-core';
import { initBusinessProblems } from './business-problems';
import { initInnovationPromise } from './innovation-promise';
import { initWorkScenesMotion } from './work-scenes-motion';
import { initCapabilityMotion } from './capability-motion';
import { initCaseMotion } from './case-motion';
import { initAdoptionJourney } from './adoption-journey';
import { initCollaborationMotion } from './collaboration-motion';
import { initConceptForm } from './concept-form';
import { initAiChange } from './ai-change';
import { initSectionParticles } from './section-particles';

const lifecycle = createLifecycle();
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const syncMotionPreference=()=>{document.documentElement.classList.toggle('reduced-motion',reduced.matches);if(reduced.matches&&'getAnimations' in document)document.getAnimations().forEach((animation)=>animation.cancel());};
syncMotionPreference();reduced.addEventListener('change',syncMotionPreference);lifecycle.add(()=>reduced.removeEventListener('change',syncMotionPreference));
if (new URLSearchParams(window.location.search).has('qa-screenshot')) {
  document.documentElement.classList.add('qa-screenshot');
}
window.addEventListener('pagehide',() => lifecycle.destroy(),{ once:true });

const initialize = (factory: () => () => void) => {
  try { lifecycle.add(factory()); }
  catch { document.documentElement.classList.add('motion-fallback'); }
};

initialize(initNavigation);
initialize(() => initRevealMotion(reduced));
initialize(() => initSectionActivity(reduced));
initialize(() => initInnovationCore(reduced));
initialize(() => initSectionParticles(reduced));
initialize(() => initBusinessProblems(reduced));
initialize(() => initInnovationPromise(reduced));
initialize(() => initAiChange(reduced));
initialize(() => initWorkScenesMotion(reduced));
initialize(() => initCapabilityMotion(reduced));
initialize(() => initCaseMotion(reduced));
initialize(() => initAdoptionJourney(reduced));
initialize(() => initCollaborationMotion(reduced));
initialize(initConceptForm);
