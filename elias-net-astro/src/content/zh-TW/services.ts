import type { Service } from '../types';
export const services: Service[] = [
  { id:'foundation', title:'IT 基礎架構整合', strongTitle:'讓基礎穩，擴充才有餘裕', scope:'伺服器、虛擬化、網路、儲存、備份、容災規劃', copy:'協助企業整理既有環境與系統斷點，建立容易維護、可以擴充並具備回復路徑的基礎。先釐清現況，再安排改善順序，不為了更新而更新。', scenario:'多代設備、備份與網路缺乏一張完整架構圖。' },
  { id:'cloud', title:'雲端與協作服務', strongTitle:'帳號、資料與協作，一套界線', scope:'Microsoft 365、Google Workspace、Cloudflare、SaaS、混合雲、身分與存取', copy:'整合雲端服務、帳號與協作環境，讓人員、資料及系統在清楚的權限界線下工作。重點不只是啟用服務，而是讓權限、流程與責任能被持續管理。', scenario:'多套 SaaS 的帳號生命週期與存取權限分散。' },
  { id:'security', title:'資安與監控整合', strongTitle:'告警很多，先理出處理順序', scope:'Wazuh、Zabbix、日誌、端點防護、告警整合、事件追蹤', copy:'將分散的監控與資安事件集中整理，放回資產、服務與時間脈絡。資訊團隊可以先看真正需要處理的異常，不必在大量重複通知中尋找線索。', scenario:'監控、端點與日誌各自告警，無法快速判斷同一事件。' },
  { id:'automation', title:'自動化與持續維運', strongTitle:'重複工作，也要清楚可控', scope:'PowerShell、Bash、Ansible、例行巡檢、標準作業、稽核紀錄', copy:'將重複工作整理成有步驟、有核准、有紀錄的維運流程，降低人工作業落差。自動化不是略過責任，而是讓每次執行更一致、更容易回顧。', scenario:'巡檢腳本由個人維護，執行結果與變更原因難追蹤。' },
  { id:'ai', title:'AI 智慧維運', strongTitle:'把事件脈絡，整理成下一步', scope:'事件摘要、異常分類、影響整理、夜間通知、處理建議、執行前確認', copy:'AI 協助資訊人員理解事件、整理上下文並提出下一步建議。涉及重新啟動、服務關閉、設備管控或權限異動時，流程必須先停下，交由人員確認。', scenario:'夜間告警缺乏脈絡，值班人員需快速辨識影響與優先順序。' }
];
