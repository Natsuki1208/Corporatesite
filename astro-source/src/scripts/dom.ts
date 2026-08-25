export const all = <T extends Element>(selector: string, root: ParentNode = document): T[] => Array.from(root.querySelectorAll<T>(selector));
export const one = <T extends Element>(selector: string, root: ParentNode = document): T | null => root.querySelector<T>(selector);
export function createLifecycle() { const cleanups: Array<() => void> = []; return { add:(cleanup:() => void) => cleanups.push(cleanup), destroy:() => cleanups.splice(0).forEach((cleanup) => { try { cleanup(); } catch { document.documentElement.classList.add('cleanup-fallback'); } }) }; }
