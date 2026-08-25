# Elias Net AI Innovation｜內頁敘事動畫精修報告

日期：2026-08-25
狀態：PASS WITH KNOWN TECHNICAL DEBT
預覽：http://127.0.0.1:4331/Corporatesite/

## 範圍與安全界線

- 來源封存：`Elias_Net_AI_Innovation_Review_20260825.zip`，未修改。
- 獨立副本：`elias-net-inner-page-motion-polish-20260825/elias-net-ai-innovation/`。
- 未 Commit、Push、Merge、Deploy；未接後端、外部表單、追蹤碼或正式資料。
- 保留 Elias Net「AI 創新與企業轉型夥伴」定位與首頁 Canvas 核心。

## 最終八頁資訊架構

| 編號 | Section | 回答的問題 |
|---|---|---|
| 00 | Hero | Elias Net 是誰？ |
| 01 | BusinessProblems | 你們理解我的問題嗎？ |
| 02 | InnovationPromise | 你們對 AI 有什麼不同看法？ |
| 03 | WorkScenes | 可以協助哪些工作？ |
| 04 | Capabilities | 如何把它做出來？ |
| 05 | InnovationCases | 實際使用情境是什麼？ |
| 06 | AdoptionMethod | 如何開始合作？ |
| 07 | CollaborationEntry | 下一步做什麼？ |

`SitePage.astro`、中英文 Header、行動選單、Footer、Section Index、Scroll Spy、Hash、頁面進度與上一／下一段皆同步此順序。

## 全站動畫敘事

- Hero：保留原 Canvas 2D 粒子核心，訊號由企業的人、知識、資料與系統匯聚產生。
- 企業挑戰：六種阻力各有專屬圖形變化；動畫改為逐列獨立，不再互相取消。
- AI 創新觀點：企業需求與資料進入 AI 理解，清楚停在 Human Review，再分流至六種工作場景；可操作節點精簡為 AI 與人員確認兩個重點。
- 工作應用：同一訊號依客服、營運、行政、資訊、管理與知識工作重新排列。
- 核心能力：新增「企業需求 → 六能力節點 → 完整工作方案」聚合帶；六張卡保留各自動畫與可展開詳情。
- 創新案例：知識搜尋、客服協作、夜間維運各有不同五段因果流程與使用邊界。
- 導入方法：六階段路徑逐站點亮，頁籤支援方向鍵、Home、End。
- 願景與合作：六條訊號在文案與表單之間聚合成 Elias Net，完成品牌收束後再進入本機概念表單。

各 Section 可獨立初始化與清理；主初始化使用錯誤隔離。`prefers-reduced-motion` 會取消既有 Web Animations、停止 Canvas RAF，並顯示完整靜態狀態。

### 2 秒自動循環補強

- 「從想法走到真正運作」：六項能力每 2 秒依序切換；卡片、專屬微動畫與上方組裝節點同步更新，完成第六項後由第一項重新開始。
- 「AI SIGNAL／AI CHANGE」：訊號、脈絡、人員決定與受控成果四個階段每 2 秒循環，手動點選後會由所選階段繼續播放。
- 兩組循環只在各自動畫進入 Viewport 且分頁可見時執行；離開畫面或 `document.hidden` 時暫停，以避免背景耗能。
- `prefers-reduced-motion` 不建立循環計時器，直接顯示完整／最終狀態。

## 主要修改檔案

相較來源封存，共 30 個新增、修改或移除項目：

- 元件：`SitePage.astro`、`Header.astro`、`Footer.astro`、`Hero.astro`、`BusinessProblems.astro`、`InnovationPromise.astro`、`AIChangePath.astro`、`WorkScenes.astro`、`Capabilities.astro`、`InnovationCases.astro`、`AdoptionMethod.astro`、`CollaborationEntry.astro`。
- Layout：`BaseLayout.astro`。
- 動畫／互動：新增 `business-problems.ts`、`innovation-promise.ts`、`work-scenes-motion.ts`、`capability-motion.ts`、`case-motion.ts`、`adoption-journey.ts`、`collaboration-motion.ts`；修改 `main.ts`、`navigation-ui.ts`、`tabs.ts`、`ai-change.ts`、`dom.ts`；移除舊 `solution-cards.ts`、`adoption-method.ts`。
- 樣式：新增 `motion-polish.css`。
- QA：新增 `verify-static.mjs`、`capture-browser-qa.mjs` 與 `qa-screenshots/`。
- 工具：`package.json` 新增 `qa:static`；Lockfile 依賴未變更。

## Build Gate

在全新、未含既有依賴的暫存副本執行：

- `npm ci`：PASS；278 packages；0 vulnerabilities。
- `npm run check`：PASS；37 files；0 errors、0 warnings、0 hints。
- `npm run build`：PASS；中文 `/` 與英文 `/en/` 共 2 pages。
- `npm run qa:static`：PASS。
  - DOM order：PASS
  - Header／Footer order：PASS
  - Section indices／counter：PASS
  - Duplicate ID：0
  - Broken hash：0
  - Missing local asset：0
  - External runtime resource：0

## Browser QA

| 項目 | 結果 |
|---|---|
| 1440×900 中文 | PASS；0 overflow；8 sections |
| 1024×768 中文 | PASS；0 overflow；8 sections |
| 390×844 中文／英文 | PASS；0 overflow；8 sections |
| Scroll Spy | PASS；Innovation=`02/#innovation`、Capabilities=`04/#capabilities` |
| Next/Previous | PASS；Capabilities 下一段正確到 Cases |
| Header／手機選單 | PASS；Escape 關閉、焦點圈限、開啟時 scroll lock |
| 主要觸控目標 | PASS；開啟選單後至少 44px |
| 能力卡 | PASS；單張展開、Escape 收合、快速連點無隱藏競態 |
| 能力頁 2 秒循環 | PASS；實測 `data-active-capability` 由 3 切換為 4，唯一高亮卡與組裝節點同步 |
| AI SIGNAL 2 秒循環 | PASS；實測 `data-active-change` 由 0 切換為 1；離開可視區後暫停 |
| WorkScenes／Cases／Method | PASS；點擊與鍵盤頁籤切換 |
| Concept form | PASS；只顯示「展示版，未傳送資料」 |
| prefers-reduced-motion | PASS；CDP 模擬並保留靜態完成狀態 |
| Console Error／Warning | 0／0 |
| Network／Asset 404 | 0 |
| 外部 Runtime Request | 0 |

## 截圖索引

位於 `qa-screenshots/`：

- Desktop：`desktop-00-hero.png` 至 `desktop-07-contact.png`。
- Mobile：`mobile-hero.png`、`mobile-innovation.png`、`mobile-capabilities.png`、`mobile-cases.png`、`mobile-contact.png`。
- Reduced Motion：`reduced-motion-innovation.png`。

## 三角色獨立檢閱

### A｜品牌／市場

最終：APPROVED。High 0、Medium 0。確認八頁敘事、非技術訪客理解、AI／人員責任、概念案例標示與 Elias Net 品牌收束一致。提出的 Header SSR `01/08` 已修為 `00/07`。

### B｜UX／動態設計

初審發現長 Section 的 Scroll Spy 錯判、能力頁缺少聚合、手機焦點逃逸及合作頁收束被遮擋。以上 blocker/high 已修正並實測。快速複查為 APPROVED WITH KNOWN DEBT；其後又將聚合圖加上 `role="img"` 並把脈衝改為一次性。

### C｜工程／Grill

初審發現逐列動畫互相取消、流程 timer 覆寫、能力卡動畫競態、API 降級與靜態測試範圍不足。已修正 row-scoped animation、timeline cancel、per-panel animation、IO/WAAPI guard、cleanup 隔離及擴充靜態測試。另補 `document.getAnimations` guard 與 reduced-motion 卡片 DOM 收斂。

## 敏感資料與外部依賴

- Secret／Token／Private Key／Credential：未發現。
- 真實 IP、主機名稱、個人 Email、本機絕對路徑：公開輸出未發現。
- 外部 CDN、分析追蹤、遠端字型、外部表單：0。
- `astro.config.mjs` 的 GitHub Pages `site` 與 `base=/Corporatesite` 為建置設定，不是執行期第三方請求。

## 已知技術債

- 觀點頁仍保留「主流程＋AI Change Path」兩層敘事，手機篇幅偏長；目前已把可聚焦流程節點從 13 個降為 2 個，功能與閱讀不受阻擋。
- 舊版 CSS 仍有少量未使用 selector，可在下一輪做 bundle 清理。
- 案例手機版仍使用桌面 JPG；圖片為 lazy loading，但下一輪可補 `<picture>`／`srcset` 降低進入案例頁的傳輸量。
- 企業挑戰列是閱讀內容而非控制，因此刻意不加入 Tab 順序；鍵盤使用者仍可完整閱讀，動畫由 Viewport 自動示範，Hover 重播僅為非必要視覺回饋。
- 2 秒是本輪指定的展示節奏；若下一輪使用者測試顯示文字閱讀時間不足，可保留動畫節奏並將說明文字固定在畫面上（目前重要文字不會因切換消失）。

## 最終摘要

```text
SECTION_COUNT=8
MODIFIED_FILE_COUNT=30
BROKEN_ANCHOR_COUNT=0
CONSOLE_ERROR_COUNT=0
CONSOLE_WARNING_COUNT=0
NETWORK_404_COUNT=0
EXTERNAL_RUNTIME_REFERENCE_COUNT=0
SECRET_EXPOSURE=NONE
RESPONSIVE_TEST=PASS
REDUCED_MOTION_TEST=PASS
MARKETING_REVIEW=APPROVED
UX_MOTION_REVIEW=APPROVED WITH KNOWN DEBT
ENGINEERING_GRILL=PASS WITH KNOWN TECHNICAL DEBT
FINAL_STATUS=PASS WITH KNOWN TECHNICAL DEBT
```
