import { all, one } from './dom';
function initTabSet(tabSelector: string, panelSelector: string, rootSelector: string) {
  const root = one<HTMLElement>(rootSelector); if (!root) return () => {};
  const tabs = all<HTMLButtonElement>(tabSelector,root); const panels = all<HTMLElement>(panelSelector,root); const timers = new Set<number>();
  const activate = (index: number, focus = false) => { tabs.forEach((tab,itemIndex) => { const active = index === itemIndex; tab.setAttribute('aria-selected',String(active)); tab.tabIndex = active ? 0 : -1; }); panels.forEach((panel,itemIndex) => { panel.hidden = index !== itemIndex; }); root.style.setProperty('--active-index',String(index)); root.dataset.activeTab = String(index); root.dispatchEvent(new CustomEvent('sectiontabchange',{detail:{index}})); root.classList.add('changing'); const timer = window.setTimeout(() => { root.classList.remove('changing'); timers.delete(timer); },460); timers.add(timer); if (focus) tabs[index]?.focus(); };
  const cleanups: Array<() => void> = [];
  tabs.forEach((tab,index) => { const click = () => activate(index); const keydown = (event: KeyboardEvent) => { if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return; event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; activate(next,true); }; tab.addEventListener('click',click); tab.addEventListener('keydown',keydown); cleanups.push(() => { tab.removeEventListener('click',click); tab.removeEventListener('keydown',keydown); }); });
  return () => { cleanups.forEach((cleanup) => cleanup()); timers.forEach(window.clearTimeout); };
}
export const initWorkSceneTabs = () => initTabSet('[data-scene-tab]','[data-scene-panel]','[data-scene-console]');
export const initCaseTabs = () => initTabSet('[data-case-tab]','[data-case-panel]','#cases');
