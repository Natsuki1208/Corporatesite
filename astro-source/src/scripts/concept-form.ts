import { one } from './dom';
export function initConceptForm() {
  const form = one<HTMLFormElement>('[data-concept-form]'); const status = one<HTMLElement>('[data-form-status]'); if (!form || !status) return () => {};
  const handler = (event: SubmitEvent) => {
    event.preventDefault();
    const en = document.documentElement.lang === 'en';
    const email = form.dataset.contactEmail;
    const selected = form.querySelector<HTMLInputElement>('input[name="focus"]:checked');
    const context = form.querySelector<HTMLTextAreaElement>('textarea[name="context"]');
    if (!email || !selected) return;
    const label = selected.nextElementSibling?.textContent?.trim() ?? selected.value;
    const subject = en ? `Elias Net pilot discussion: ${label}` : `Elias Net Pilot 討論：${label}`;
    const body = en
      ? `Area to improve: ${label}\n\nContext (no confidential information):\n${context?.value.trim() || 'Not provided'}\n\nPlease contact me to discuss whether this workflow is suitable for a pilot.`
      : `希望改善的方向：${label}\n\n工作情境（不含機密資料）：\n${context?.value.trim() || '未填寫'}\n\n希望進一步討論這個流程是否適合建立 Pilot。`;
    status.textContent = en ? 'Opening your email app. Review the message before sending.' : '正在開啟郵件 App，寄出前請再次確認內容。';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  form.addEventListener('submit',handler); return () => form.removeEventListener('submit',handler);
}
