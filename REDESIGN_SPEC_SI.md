# Elias Net SI Brand Redesign Specification

Status: `MARKETING AGENT APPROVED — HUMAN REVIEW PENDING`

Version: `SI Brand v1 / 2026-08-25`

Implementation target: `si-v1/`（獨立於既有 `v4/`）

Stage 3 record: the independent Marketing Director Agent returned `APPROVED` on 2026-08-25 after its requested copy and metric corrections were incorporated. This is an internal Agent gate, not human approval. The implementation remains uncommitted, unpublished and subject to the user's visual review.

## 1. Decision Context

- 正式公司名稱：`ELIAS NET`／`Elias Net`
- 中文定位：企業 IT 與 AI 智慧維運系統整合服務商
- English positioning：Infrastructure, Security & AI Operations Integrator
- Slogan：理解每個訊號，掌握每次行動。
- Vision：讓複雜的系統，成為企業穩定前進的力量。
- AI safety claim：AI 協助判斷，重要操作由人決定。
- 核心價值：整合、穩定、安全、清楚、可持續維運。

Elias Net 不是單一 AI 產品公司，也不是只處理夜間告警的服務商。AI 智慧維運是五大核心服務之一，也是相較傳統 SI 的差異化能力。網站不可宣稱無人維運、全面自動化、任意設備控制、零事故或永不誤判。

## 2. Baseline Audit

前一版 `REDESIGN_SPEC.md` 在工作樹、HEAD 與可見 Git history 中均不存在，狀態記為 `UNKNOWN / MISSING`，本規格不假設其內容。

| Check | Baseline |
| --- | --- |
| Current branch | `leo/blockops-v4-corporate` |
| Current commit | `6979f3d3659bcd63c40a049897e458e6ce770694` |
| Git status | clean, tracking origin |
| Current positioning | Human-Governed AI Operations concept platform |
| Unique broken anchors | 1 (`#pilot`, 3 references) |
| External resources | 0 |
| Secret exposure | none detected |
| Public/raw MIS sources | 55 raw occurrences including translations |
| Old brand/game references in v4 | 13 occurrences |
| Missing local assets | 0 |

Stage 1 verdict：`REVISE`。不得只換顏色或修改 Hero，必須重整資訊架構。

## 3. Audiences and Problems

### Primary audiences

- 資訊人力有限的中小企業。
- 多主機、多系統或多據點企業。
- 需要夜間與假日值班的團隊。
- 已有監控工具但告警過多的公司。
- 正在導入雲端或混合雲的企業。
- 希望安全採用 AI 的 IT 與資安團隊。

### Problems to explain in plain language

1. 系統與供應商分散，缺乏整體管理。
2. 告警很多，重要事件容易被淹沒。
3. 權限、帳號與雲端服務難以統一。
4. 夜間與假日處理速度不足。
5. 自動化缺乏核准與稽核紀錄。
6. 維運知識集中在少數人員。
7. 系統建置後缺乏持續維護。

## 4. Information Architecture — Eight Sections

網站僅保留下列 8 個主要區塊。技術細節使用展開面板或 Dialog，不再新增同質卡片區。

### 01 Hero — Brand Positioning

Eyebrow：`INFRASTRUCTURE · SECURITY · AI OPERATIONS`

Brand：`ELIAS NET`

Headline：

> 理解每個訊號，
> 掌握每次行動。

Positioning：

> 企業 IT 與 AI 智慧維運系統整合服務商

Summary：

> Elias Net 整合企業的基礎架構、雲端、資安監控與維運流程，讓分散的設備與資訊形成一套清楚、穩定且可持續管理的系統。

Differentiator：

> AI 協助判斷，重要操作由人決定。

Primary CTA：`探索整合服務` → `#services`

Secondary CTA：`了解 AI 智慧維運` → `#ai-operations`

Hero 固定顯示公司定位，不使用會改變定位的六頁輪播。背景動畫只支援敘事：分散訊號匯入 Elias 核心，整理為基礎架構、資安、營運三條穩定狀態線，最後停在金色人工確認節點。

3-second acceptance：未捲動、未互動時，訪客能讀到公司名稱、SI 定位、整合範圍、AI 差異化與兩個 CTA。

### 02 Vision — Company Vision

Headline：`讓複雜系統，成為穩定力量`

Copy：

> 企業不需要更多彼此分離的工具，而需要一個能長期維護的整體。Elias Net 從現況與需求出發，把設備、雲端、監控與作業流程放回同一張藍圖。讓每次建置都有方向，每次維運都有依據。

Visual：象牙白宣言區，五個核心價值沿金屬刻度依序顯示。不得使用五張同款卡片。

### 03 Problems — Integration Problems

Headline：`系統很多，管理不該更混亂`

Copy：

> 設備、帳號、供應商與告警各自運作，資訊團隊往往需要在不同畫面之間拼湊答案。當權限、紀錄與維護責任不清楚，問題就更難被快速定位。我們先整理關係與斷點，再決定真正需要補強的地方。

Interaction：五個分散島（設備、雲端帳號、監控告警、供應商、團隊知識）可由滑鼠、鍵盤或觸控選取；中央顯示一句影響與對應服務。紅色只標記事件，不製造恐慌。

Audience cue（不增加新 section）：`適合資訊人力有限、多據點、告警過多、正在雲端轉型或需要夜間值班的企業。` 使用可展開的簡短說明，避免壓過問題主線。

### 04 Core Services — Five Services

Headline：`不是更多工具，是更好的整合`

Intro：

> 我們從基礎架構開始，串起雲端、資安、維運流程與 AI 輔助能力。每一項服務都能獨立導入，也能依企業現況組合成持續維運的整體方案。

#### Service 1 — IT 基礎架構整合

- Strong title：`讓基礎穩，擴充才有餘裕`
- Scope：伺服器、虛擬化、網路、儲存、備份、容災規劃。
- Copy：協助企業整理既有環境與系統斷點，建立容易維護、可以擴充並具備回復路徑的基礎。先釐清現況，再安排改善順序，不為了更新而更新。
- Scenario：多代設備、備份與網路缺乏一張完整架構圖。
- Motion：六個灰色節點依序接成穩定基線，完成後顯示 `BASELINE MAPPED／架構基線已整理`。
- AI 協作覆蓋度：第一層不顯示；詳細層在流程盤點前顯示 `待流程盤點`。

#### Service 2 — 雲端與協作服務

- Strong title：`帳號、資料與協作，一套界線`
- Scope：Microsoft 365、Google Workspace、Cloudflare、SaaS、混合雲、身分與存取。
- Copy：整合雲端服務、帳號與協作環境，讓人員、資料及系統在清楚的權限界線下工作。重點不只是啟用服務，而是讓權限、流程與責任能被持續管理。
- Scenario：多套 SaaS 的帳號生命週期與存取權限分散。
- Motion：人員與雲端節點先通過身分環，再跨越權限橋連接。
- AI 協作覆蓋度：第一層不顯示；詳細層在流程盤點前顯示 `待流程盤點`。

#### Service 3 — 資安與監控整合

- Strong title：`告警很多，先理出處理順序`
- Scope：Wazuh、Zabbix、日誌、端點防護、告警整合、事件追蹤。
- Copy：將分散的監控與資安事件集中整理，放回資產、服務與時間脈絡。資訊團隊可以先看真正需要處理的異常，不必在大量重複通知中尋找線索。
- Scenario：監控、端點與日誌各自告警，無法快速判斷同一事件。
- Motion：多色訊號通過篩選帶，收斂成一條可讀事件線。
- AI 協作覆蓋度：第一層不顯示；詳細層在流程盤點前顯示 `待流程盤點`。

#### Service 4 — 自動化與持續維運

- Strong title：`重複工作，也要清楚可控`
- Scope：PowerShell、Bash、Ansible、例行巡檢、標準作業、稽核紀錄。
- Copy：將重複工作整理成有步驟、有核准、有紀錄的維運流程，降低人工作業落差。自動化不是略過責任，而是讓每次執行更一致、更容易回顧。
- Scenario：巡檢腳本由個人維護，執行結果與變更原因難追蹤。
- Motion：Runbook 方塊逐步前進，高風險步驟停在金色閘門。
- AI 協作覆蓋度：第一層不顯示；詳細層在流程盤點前顯示 `待流程盤點`。

#### Service 5 — AI 智慧維運

- Strong title：`把事件脈絡，整理成下一步`
- Scope：事件摘要、異常分類、影響整理、夜間通知、處理建議、執行前確認。
- Copy：AI 協助資訊人員理解事件、整理上下文並提出下一步建議。涉及重新啟動、服務關閉、設備管控或權限異動時，流程必須先停下，交由人員確認。
- Scenario：夜間告警缺乏脈絡，值班人員需快速辨識影響與優先順序。
- Motion：事件脈絡聚合為摘要與建議，停在金色 Human Gate。
- AI 協作覆蓋度：第一層不顯示；詳細層在流程盤點前顯示 `待流程盤點`。

Service layout：五項採不同空間構圖（foundation map、identity bridge、signal filter、runbook conveyor、decision core），同時間最多播放一項動畫。不可改成五張完全相同的卡片。

### 05 Solutions — Seven Customer Outcomes

Headline：`從問題出發，串成可維運的答案`

採一條可選取的客戶旅程軌道。一次只顯示一個方案的「問題／整合方式／交付成果」。AI 協作覆蓋度只在方案詳情且具備流程盤點證據後呈現；本原型顯示 `待流程盤點`。

| Solution | Customer outcome | AI coverage state |
| --- | --- | --- |
| 建立穩定的 IT 基礎 | 盤點環境、備份與容災，交付架構圖與改善順序。 | 待流程盤點 |
| 串起分散的系統與服務 | 統整據點、雲端、帳號與服務關係，減少跨供應商斷點。 | 待流程盤點 |
| 讓資安事件更容易理解 | 將監控、日誌與端點事件放回資產脈絡並協助排序。 | 待流程盤點 |
| 降低重複維運工作 | 將巡檢與標準作業轉為可核准、可追蹤流程。 | 待流程盤點 |
| 協助夜間與假日值班 | 摘要重要事件與可能影響，降低通知噪音。 | 待流程盤點 |
| 重要操作保留人員決定 | 高影響步驟停在核准點並留下完整紀錄。 | 待流程盤點 |
| 將處理經驗轉成團隊知識 | 將事件、Runbook、判斷與結果整理成可回顧知識。 | 待流程盤點 |

### 06 AI Operations — Differentiating Capability

Headline：`AI 看懂訊號，人員決定行動`

Copy：

> Elias Net 將分散的告警、事件與設備資訊整理成清楚摘要，協助資訊人員理解異常、影響範圍與處理優先順序。系統可以提出檢查建議，但涉及重新啟動、關閉服務、設備管控或權限異動時，必須先由人員確認。

Event Journey：

`事件來源 → 唯讀接收 → 資料匿名化 → AI 分析整理 → 提出處理建議 → 等待資訊人員確認 → 核准後才允許執行 → 保留稽核紀錄`

Prototype behavior：使用者啟動 Demo 才播放；到人員確認自動暫停；核准只完成模擬展示；固定顯示 `simulate_only=true`、`Actual Action: 0`、`未操作真實設備`。保留開始、暫停、繼續、重播與鍵盤節點操作。

### 07 Service Process & Trust

Headline：`從建置開始，陪企業持續運作`

Copy：

> 系統整合不在上線那一天結束。我們從盤點、規劃、建置與驗證開始，再依營運狀況持續調整。資料範圍、權限、人工責任與稽核紀錄會在導入前說清楚。

Delivery lifecycle：`盤點 → 設計 → 建置 → 驗證 → 持續維運`

Trust rail：`最小權限 → 唯讀優先 → 資料遮蔽 → 人員確認 → 稽核留痕`

### 08 CTA — Consultation

Headline：`先把系統看清楚，再一起前進`

Copy：

> 無論是整理既有環境、導入雲端、整合監控，或評估 AI 維運，第一步都是確認現況、範圍與責任。從一個清楚的小目標開始，再逐步建立可以長期維護的方案。

Primary CTA：`討論整合需求`

Secondary CTA：`了解 AI 維運驗證`

本輪只提供展示 Dialog／表單；不傳送資料、不儲存輸入、不建立外部 Request。Footer 只保留真實站內錨點與公司定位。

## 5. AI Collaboration Coverage Metric

對外名稱固定：`AI 協作覆蓋度（規劃評估）`。

Definition：在特定服務情境已定義的工作環節中，目前可由 AI 協助「整理、分類、比對或提出建議」的環節比例。不是模型準確率、成功率、自動化率、節省工時或 SLA。

初版不得顯示百分比或規劃區間。正式導入前必須重新盤點；沒有流程分母、樣本與驗證證據時顯示 `待流程盤點`，不得顯示 `0%`。原型若要展示量表，只能標示 `UI 示意，非能力數值`。

未來計算方式：先列舉特定客戶流程的全部工作環節，再計算有證據支持 AI 可協助整理、分類、比對或建議的環節數。每個數值必須能展開查看情境、分子／分母、樣本量、資料日期、驗證階段、限制與責任邊界；不得以外部研究平均值替代 Elias Net 自有評估。

Fixed disclaimer：

> 數值為特定情境與已驗證流程的規劃評估，會隨資料品質、整合範圍、權限政策與人工流程而變動；不代表模型準確率、處理成功率、節省工時或可自動執行比例。重要操作仍須人員確認。

UI：本原型只顯示 `待流程盤點` 與「查看計算方式」。未來有證據時才使用 10 格離散矩陣與文字數值；不得使用 `role=progressbar`、數字滾動或只有顏色的長條。圖形 `aria-hidden=true`，外層 `aria-label` 完整說明數值、分母與非績效聲明。

Research context：產業研究只作背景材料，放在 AI 專區詳細說明，不轉換成 Elias Net 服務績效。AI 使用在不同任務與情境間高度不均，且 augmentation/automation 比例會隨時間變動。方法背景參考：

- Anthropic Economic Index, January 2026: https://www.anthropic.com/research/anthropic-economic-index-january-2026-report
- ILO, Generative AI and Jobs: A Refined Global Index, 2025: https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework

## 6. Brand and UI System

### Tokens

| Role | Value |
| --- | --- |
| Obsidian Black | `#080A0D` |
| Armor Dark Gray | `#17191C` |
| Titanium Gold | `#C99743` |
| Champagne Gold | `#E5C783` |
| Warm Copper Gold | `#8C6031` |
| Ivory | `#E9E4D8` |
| Metal Gray | `#8E9290` |
| Electric Cyan | `#42D4DA` |
| Alert Red | `#D9534F` |
| Safe Green | `#57B879` |

Target ratio：dark 65%、ivory 20%、gold 12%、signal/status 3%。Gold 代表品牌與人工核准；Cyan 代表資料流；Red/Green 只代表附有文字與圖示的狀態。

Contrast rules：Gold/Cyan/Metal 不可在 Ivory 上作小字；亮色區正文固定 Obsidian/Armor。Alert Red on Armor 約 4.45:1，只用大型狀態或圖形，正文使用 Ivory。焦點環使用 Champagne Gold 3px，touch target 至少 44×44px。

Typography：只用系統字體。Display 700–800；H1 `clamp(2.75rem,5vw,5.5rem)`；H2 `clamp(2.1rem,4vw,4.2rem)`；body `1–1.125rem/1.65`。中文標題不使用過度負字距。文字欄寬 42–48ch。

Spacing：8/16/24/32/48/72/96；內容寬度上限 1440px。

## 7. Motion and Lifecycle

- 主要使用 transform 與 opacity。
- 同時間只允許目前可見區塊的一個主要故事播放。
- 使用 IntersectionObserver 啟停，`document.hidden` 時暫停。
- 不建立多個永久 requestAnimationFrame 或大量 setInterval。
- reduced-motion 時停止自動播放、數字變化、位移、粒子與視差，直接呈現最終靜態狀態。
- 動畫不遮擋標題、CTA、說明或鍵盤焦點。
- 手機移除 50% 以上非必要光線與環境粒子。

## 8. Responsive Wireframes

### Desktop 1440

12-column。Hero copy 5 欄、視覺 7 欄；Vision 5/7；Problems 為全寬拓樸；Services 以 7/5、5/7 交錯藍圖；Solutions 8 欄場景＋4 欄說明；AI Journey 橫向；Process/Trust 對切；CTA 置中。

### Desktop/Tablet 1024

8-column。Hero 4/4；服務採 1 大＋2 並排＋2 並排但保持不同場景；流程允許水平切換並有明顯控制。

### Tablet 768

單欄主敘事；場景在上、文字在下；Header 使用可關閉選單；section padding 48–64px；AI Journey 改折行或垂直節點。

### Mobile 390

單欄；Hero 不強制滿屏，H1 2.5–3rem；背景維持核心可見；每次顯示一項服務；七方案使用可橫滑 tab 與單內容面板；AI Journey 為垂直 stepper；原型顯示 `待流程盤點`，未來有證據時 10 格矩陣採 2×5；關閉非必要景深、粒子與大圖裝飾。

## 9. Preserve, Replace, Retire

### Preserve

- 原始 `v4/` 與 Git history。
- Elias Net 名稱與可辨識幾何 mark。
- 三套高品質主場景的 desktop/mobile 圖片。
- Event Journey 的唯讀、匿名化、AI 分析、人工確認與稽核邏輯。
- Skip link、焦點樣式、Dialog focus return、Escape、IntersectionObserver、visibilitychange、reduced motion。
- `human-decision`、`trust-boundary`、`shared-knowledge` 圖片作為候選。

### Replace in SI implementation

- Logo 副標改為 `INFRASTRUCTURE · SECURITY · AI OPERATIONS`。
- Hero、Nav、CTA、Footer 與 metadata 改 SI 定位。
- 公開 `MIS` 依語境改為資訊人員、IT 維運團隊、IT 與資安團隊。
- `blockops-*` 公開資產命名與 localStorage key 改 `elias-net-*`；如需保留偏好，只讀一次舊 key 後寫新 key。
- 只保留繁中／英文；移除公開日文與韓文選項及 runtime 路徑。

### Retire from SI homepage without deleting history/assets

- 通用 AI 十用途。
- 虛構合作夥伴 Logo／生態。
- 虛構活動與日期。
- 重複七篇公司故事與不必要產業分類。
- Minecraft／Mojang disclaimer。
- 單一 AI 產品平台的六能力卡片主敘事。
- `#pilot` broken anchor；改為真實 `#contact` 或按鈕 Dialog。

## 10. Accessibility and QA Acceptance

- 1440/1024/768/390 無明顯橫向溢出。
- Chrome console errors 0；missing local assets 0；external request 0。
- 所有內部 anchors 存在，broken anchor 0。
- 主要 CTA、服務、方案、AI Journey、Dialog、Menu 全部可由鍵盤操作。
- 焦點可見、順序合理；Dialog 有 focus trap/return，Escape 可關閉。
- 語意與 ARIA 不依賴顏色；動態狀態有可閱讀文字。
- `prefers-reduced-motion` runtime 驗證非必要動畫停止。
- 公開可見與 runtime 文案 `MIS` 為 0；不修改技術變數與歷史證據。
- SI 首頁可見 BLOCKOPS、Minecraft、Mojang、虛構夥伴、虛構活動為 0。
- 首頁主要 section 恰為 8；Core Services 5；Solutions 7。
- Hero 3 秒測試由獨立市場審核回答 4 個定位問題。
- Secret/Token/Private Key/Webhook/真實 IP 掃描 0。

## 11. Issue Records

### SI-001 — Missing previous specification

- raised_by: Content, UI, QA
- problem: `REDESIGN_SPEC.md` 不存在。
- evidence: worktree、HEAD、可見 history 均無檔案。
- severity: L2
- affected_tasks: Stage 2–4
- possible_options: 尋找外部封包／停止／建立新規格並標 UNKNOWN。
- recommended_option: 建立本文件並標 UNKNOWN。
- recommendation_reason: 不捏造舊規格，且使用者已提供完整新需求。
- human_decision_required: NO
- current_status: RESOLVED BY THIS SPEC

### SI-002 — Positioning and IA conflict

- raised_by: all auditors
- problem: v4 是單一 AI Operations 概念平台，不是 SI。
- evidence: Hero、metadata、14 個主要內容面向與 0 個完整 SI 核心服務。
- severity: L3
- affected_tasks: IA、Hero、Nav、copy、visual system
- possible_options: 只改 Hero／局部加服務／重構 8 區。
- recommended_option: 獨立 `si-v1/` 8 區實作。
- recommendation_reason: 保留 v4 並真正改變訪客心智。
- human_decision_required: NO
- current_status: SPECIFIED

### SI-003 — Public MIS wording

- raised_by: Content, QA
- problem: 公開與 runtime 文案仍有 MIS。
- evidence: 55 raw occurrences including translations。
- severity: L2
- affected_tasks: HTML、JS、metadata、ARIA、i18n
- recommended_option: 只修改新 SI 公開文案，不機械修改歷史文件或技術欄位。
- human_decision_required: NO
- current_status: IMPLEMENTED IN UNCOMMITTED `si-v1/` — FINAL QA PENDING

### SI-004 — Broken anchor

- raised_by: QA
- problem: `#pilot` target 不存在。
- evidence: 1 unique target, 3 references。
- severity: L1
- recommended_option: 新增真實 `#contact` CTA section；Dialog 使用 button。
- human_decision_required: NO
- current_status: IMPLEMENTED IN UNCOMMITTED `si-v1/` — STATIC ANCHOR CHECK PASSED, FINAL QA PENDING

### SI-005 — Old brand and storage residue

- raised_by: Content, UI, QA
- problem: BLOCKOPS 檔名/key 與遊戲 disclaimer 不符合 SI 品牌。
- evidence: 13 v4 occurrences。
- severity: L2
- recommended_option: SI 目錄使用 Elias 命名；不刪 v4；需要時做一次性 preference migration。
- human_decision_required: NO
- current_status: IMPLEMENTED IN UNCOMMITTED `si-v1/` — V4 PRESERVED, FINAL QA PENDING

### SI-006 — CSS and copy ownership overlap

- raised_by: UI, QA
- problem: 多套 token/CSS 與多個動態文案來源容易造成回歸。
- severity: L3
- recommended_option: SI 版本建立單一 tokens layer、單一 copy source 與分區元件責任。
- human_decision_required: NO
- current_status: IMPLEMENTED IN UNCOMMITTED `si-v1/` — FINAL QA PENDING

### SI-007 — AI percentage interpretation risk

- raised_by: user, Content, UI, QA
- problem: 百分比可能被看成成功率、自動化率或服務保證。
- severity: L3
- affected_tasks: Services、Solutions、Trust、QA
- possible_options: 固定精確值／不用百分比／規劃區間＋可追溯方法。
- recommended_option: 原型顯示 `待流程盤點`，設置證據門檻；未來完成盤點後才依可追溯分子／分母計算，並附固定免責。
- recommendation_reason: 回應使用者希望呈現 AI 協助程度的方向，同時避免把無證據區間當成能力宣稱。
- human_decision_required: NO（原型採待流程盤點；未來數值須通過證據門檻）
- current_status: RESOLVED IN SPEC / EVIDENCE PENDING

### SI-008 — Runtime evidence unavailable before implementation

- raised_by: QA
- problem: localhost 未運行，Stage 1 只有靜態證據。
- severity: L2
- affected_tasks: Stage 5
- recommended_option: 實作後啟動 `127.0.0.1` localhost 並完整回歸。
- human_decision_required: NO
- current_status: LOCAL CHROME EVIDENCE COLLECTED — FINAL REGRESSION PENDING

## 12. Market Review Gate

市場部總監只能輸出 `APPROVED`、`APPROVED WITH CHANGES` 或 `REJECTED`。只有在以下全部成立時才能 APPROVED：

1. Hero 3 秒內清楚說明 Elias Net 是 System Integrator。
2. 五大服務與 AI 差異化層級清楚。
3. 標題直接、有記憶點、無恐嚇或誇大。
4. 原型不顯示無證據百分比；未來數值須具定義、分子／分母、樣本、日期、驗證階段、責任與非績效聲明。
5. 首頁恰為 8 區，技術細節預設收合。
6. 曜石鈦金品牌與既有科技影像形成一致企業感。

## 13. SI v1.1 Interaction Enhancement Record — 2026-08-25

Status: IMPLEMENTED LOCALLY — QA PASSED — HUMAN REVIEW PENDING

### SI11-001 — Semantic animation is too subtle

- issue_id: SI11-001
- raised_by: User review
- problem: Vision、Problems、Trust 與 Contact 的動畫不足以解釋系統關聯、交付因果與人員責任。
- evidence: SI v1 僅有 reveal、靜態拓撲與簡單流程線。
- severity: L2
- affected_tasks: Sections 2, 3, 7, 8
- possible_options: 增加裝飾粒子／建立語意化流程動畫／全面重做。
- recommended_option: 保留八區架構，加入 system blueprint、impact topology、delivery twin、readiness console。
- recommendation_reason: 動畫直接對應整合、分流、交付、安全治理及建議起點，不改品牌與產品邊界。
- human_decision_required: NO
- current_status: RESOLVED — BROWSER AND CHROME QA PASSED

### SI11-002 — Solution choices lack decision context

- issue_id: SI11-002
- raised_by: User review
- problem: 七項方案未展開時只有編號與名稱，無法快速比較問題、協助方式與成果。
- evidence: 原 solution rail 僅有七個短標籤，詳細資訊集中於單一 panel。
- severity: L2
- affected_tasks: Section 5, responsive layout, keyboard tabs
- possible_options: 維持選單／自動輪播／七張資訊型互動卡。
- recommended_option: 七張卡片保留 tabs 語意，加入問題、協助、成果、適合情境及七種不同微動畫。
- recommendation_reason: 增加資訊密度且不強迫輪播；鍵盤與手機仍可完整閱讀。
- human_decision_required: NO
- current_status: RESOLVED — 7/7 CARDS PRESENT, NO OVERLAP AT 1440/1024/768/390

### SI11-003 — Footer does not function as an enterprise information hub

- issue_id: SI11-003
- raised_by: User review with screenshot reference
- problem: 原 Footer 資訊量不足，未延續企業網站的內容導覽與品牌收尾。
- evidence: 原 Footer 僅有 Logo、定位與四個連結。
- severity: L2
- affected_tasks: Footer, bilingual navigation, local demo disclosure
- possible_options: 保留精簡 Footer／複製參考版型／建立 Elias Net 原創資訊中心。
- recommended_option: 三欄 Elias Net 導覽、展示訂閱、LAB/OPS/COMM 快捷入口與品牌法律列。
- recommendation_reason: 採用使用者指定的資訊密度與配色方向，同時保留原創內容與有效站內目的地。
- human_decision_required: NO
- current_status: RESOLVED — LOCAL DEMO ONLY, NO EMAIL COLLECTION

### SI11-004 — Dialog Escape handling inconsistent

- issue_id: SI11-004
- raised_by: Lead QA
- problem: 部分瀏覽器中按 ESC 未可靠關閉詳細 Dialog。
- evidence: Browser regression returned dialog open after Escape.
- severity: L1
- affected_tasks: Keyboard navigation, focus restoration
- possible_options: 依賴原生行為／加入明確 Escape handler。
- recommended_option: 明確攔截 Escape、關閉 Dialog 並回焦原觸發按鈕。
- recommendation_reason: 跨瀏覽器行為一致且符合鍵盤操作預期。
- human_decision_required: NO
- current_status: RESOLVED — ESC CLOSE AND FOCUS RETURN PASSED

### SI11-005 — Mobile observer thresholds prevent activation

- issue_id: SI11-005
- raised_by: Chrome QA
- problem: 長區塊在 390px 無法同時達到較高 IntersectionObserver 比例，可能不觸發動畫或 reduced-motion 最終狀態。
- evidence: First reduced-motion run showed Vision 0/5、Topology incomplete、Delivery 01/05。
- severity: L1
- affected_tasks: Sections 2, 3, 7, mobile and reduced-motion
- possible_options: 固定計時啟動／降低 viewport threshold／永遠播放。
- recommended_option: 將長區塊門檻降至 0.10～0.18，仍只在進入可視區域時啟動。
- recommendation_reason: 解決行動版觸發，同時維持可見區域生命週期與效能限制。
- human_decision_required: NO
- current_status: RESOLVED — REDUCED MOTION FINAL STATES 5/5 PASSED

### SI11-006 — Core service scenes lack explanatory context

- issue_id: SI11-006
- raised_by: User visual review
- problem: 基礎架構、雲端協作與自動化場景只有方框、線段及編號，無法在不閱讀左側長文時理解動畫代表的服務步驟。
- evidence: 人工檢閱截圖顯示 `BASELINE MAPPED`、`IDENTITY / ACCESS BOUNDARY`、`1–4 / HUMAN REVIEW` 缺少節點名稱與狀態敘述。
- severity: L1
- affected_tasks: Section 4 Core Services, bilingual labels, mobile and reduced-motion
- possible_options: 增加裝飾細節／只在 Hover 顯示提示／直接在場景中加入精簡流程文字。
- recommended_option: 為三個場景加入可常駐閱讀的節點名稱、短狀態與完成結果，並沿既有動畫順序逐站點亮。
- recommendation_reason: 文字和動畫形成一對一因果，不增加新能力，也不需要使用者猜測幾何圖形含義。
- human_decision_required: NO
- current_status: RESOLVED LOCALLY — STATIC QA PASSED, HUMAN VISUAL REVIEW PENDING
