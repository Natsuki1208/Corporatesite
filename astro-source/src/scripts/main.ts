import { createLifecycle } from './dom';
import { initNavigation } from './navigation-ui';
import { initRevealMotion, initSectionActivity } from './reveal-motion';
import { initConceptForm } from './concept-form';
import { initCompanyMotion } from './company-motion';
import { initMissionSequence } from './mission-sequence';

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
initialize(() => initCompanyMotion(reduced));
initialize(() => initMissionSequence(reduced));
initialize(initConceptForm);
