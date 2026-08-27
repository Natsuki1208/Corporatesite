import { one } from './dom';
export function initConceptForm() {
  const form = one<HTMLFormElement>('[data-concept-form]'); const status = one<HTMLElement>('[data-form-status]'); if (!form || !status) return () => {};
  const handler = (event: SubmitEvent) => { event.preventDefault(); const en = document.documentElement.lang === 'en'; status.textContent = en ? 'This is a demonstration form. No information was sent.' : '這是展示版表單，目前未傳送任何資料。'; form.reset(); };
  form.addEventListener('submit',handler); return () => form.removeEventListener('submit',handler);
}
