# Elias Net 核心能力頁語意動畫重製與局部文案精修

日期：2026-08-25

來源封存：`Elias_Net_AI_Innovation_Motion_Autoplay_Review_20260825.zip`（未覆寫）

獨立工作副本：`elias-net-capabilities-semantic-motion-20260825/elias-net-ai-innovation`

## 結果摘要

- 核心能力 Section ID 與八頁順序維持不變。
- 六項能力完整保留；建立 6/6 組專屬 inline SVG 語意動畫。
- 舊 2 秒自動輪播、Timer、`auto-active` 與 `capability-scan` 樣式已移除。
- 上方改為「企業問題 → 六項能力 → 可使用的 AI 工作能力」組裝視覺。
- 首次進場播放一次；卡片進入 Viewport 後播放一次；Hover、Focus、展開時可重播。
- 同時最多展開一張；Escape 收合並把焦點送回原按鈕。
- 支援 `prefers-reduced-motion` 的靜態完成狀態與動態切換清理。
- 中文 SVG 標籤已本地化；英文文案採自然語氣。

## 修改檔案

1. `src/components/Capabilities.astro`
2. `src/data/site.ts`（只修改 capabilities 專屬文案）
3. `src/scripts/capability-motion.ts`
4. `src/styles/capabilities.css`（新增）
5. `src/styles/motion-polish.css`（只移除核心能力頁舊動畫死碼）
6. `scripts/capture-browser-qa.mjs`（測試網址與輸出目錄可由環境變數指定）
7. 本報告與 QA 截圖

與來源 ZIP 比對後，其他 Section 元件、資料、動畫與頁序未修改。

## 六項 SVG 設計

1. AI 策略與場景探索：多個企業場景通過價值／風險評估，聚焦第一個驗證場景。
2. AI 體驗設計：人員需求進入 AI 協助，一般路徑產生建議，例外路徑回到人員。
3. 資料與知識工程：三份具來源標記的文件匯入索引，再產生附引用的答案。
4. AI 助理與 Agent：任務進入有責任邊界的 AI 助理，核准工具可用，高影響事項停在人員確認。
5. 系統與流程整合：CRM、ERP 與文件系統連入整合層，形成連續流程及淡化的回復路徑。
6. AI 治理與持續改善：資料範圍、權限、人員確認與紀錄依序通過，結果回寫下一版本。

## 上方組裝動畫

企業問題訊號先出現，六個具名稱的能力模組依序啟用；冷青代表資料與 AI 訊號、玫瑰金代表體驗與責任、香檳金代表完成狀態。路徑最後聚合至 AI 核心，再形成「可使用的 AI 工作能力」。動畫約 3.3 秒，完成後保持靜態，不是 Loading Bar，也不會無限循環。

## 文案修改前後

- 中文主標：`從想法走到真正運作` → `讓 AI 構想，成為日常工作`
- 英文主標：→ `Turn AI ideas into everyday ways of working.`
- 頁首說明：改為由問題探索、體驗設計與系統整合出發的陪伴式說明。
- Agent 標題：`為角色建立有邊界的工作夥伴` → `為不同角色，打造責任清楚的 AI 夥伴`
- 英文 Agent 標題：`for every role` → `for different roles`
- 卡片按鈕：中文統一 `了解如何落地`；英文統一 `See how it works`。
- 中文 SVG 的價值、風險、優先場景、知識索引、人員確認、整合層、資料範圍、權限檢查與稽核紀錄均已本地化。

## 自動輪播移除證明

- `capability-motion.ts` 中 `setTimeout`：0
- `capability-motion.ts` 中 `setInterval`：0
- `capability-motion.ts` 中 `requestAnimationFrame`：0
- `auto-active`：0
- `capability-scan`：0
- 舊 `.solution-motion` 核心能力動畫：0

## 建置與靜態 QA

- `npm ci`：PASS（278 packages，0 vulnerabilities）
- `npm run check`：PASS（37 files，0 errors／warnings／hints）
- `npm run build`：PASS（中文與英文共 2 pages）
- `npm run qa:static`：PASS
- 中文／英文頁序：PASS
- Broken hash：0
- Duplicate ID：0
- Missing local asset：0
- External resource：0

## Browser QA

- 1440×900：6 cards、6 SVG、assembly 存在、水平溢位 0。
- 1024×768：雙欄卡片、水平溢位 0。
- 390×844：單欄卡片、2×3 組裝模組、水平溢位 0。
- 中文頁：PASS。
- 英文頁：PASS。
- 開啟 → 關閉 → 再開啟：PASS；第二次內容可見且高度正常。
- 單卡展開：PASS。
- Enter／Space 展開、Escape 收合並回焦：PASS。
- Console Error／Warning：0。
- 未預期 404：0（靜態資產掃描與本機預覽）。
- Reduced motion：CSS 媒體查詢、JS `MediaQueryList` change、動畫 cancel 與靜態終態均通過程式檢查及工程審核；本輪 Browser 控制介面未提供媒體模擬，未取得真實模擬截圖。

## 截圖索引

- `qa/screenshots/capabilities-zh-1440-top.png`
- `qa/screenshots/capabilities-zh-1024-top.png`
- `qa/screenshots/capabilities-zh-390-top.png`
- `qa/screenshots/capabilities-zh-390-expanded.png`
- `qa/screenshots/capabilities-en-1440-top.png`
- `qa/screenshots/card-strategy-complete.png`
- `qa/screenshots/card-experience-complete.png`
- `qa/screenshots/card-data-complete.png`
- `qa/screenshots/card-agent-complete.png`
- `qa/screenshots/card-integration-complete.png`
- `qa/screenshots/card-governance-complete.png`

未錄製影片，以避免不必要地擷取桌面、帳號或通知資訊；完整靜態截圖已提供。

## 可及性與效能

- 裝飾 SVG 為 `aria-hidden`，不進入 Tab 順序。
- 每個按鈕具 `aria-expanded`／`aria-controls`。
- Enter、Space、Escape 與清楚 Focus 樣式均可用。
- 卡片和組裝動畫無持續 RAF、Timer 或無限循環。
- 動畫完成、離開 Viewport、背景分頁、reduced-motion change 與 cleanup 均取消 WAAPI effect。
- `IntersectionObserver` 與 WAAPI 不支援時顯示完整靜態內容。
- 手機卡片各自進入 Viewport 才首次播放，避免在畫面外完成。

## 三角色檢閱

- 市場與品牌：APPROVED（High 0、Medium 0）
- 動態與 UI：APPROVED（High 0、Medium 0）
- 工程與 Grill：APPROVED（High 0、Medium 0）

第一輪提出的中文工程標籤、動畫 fill-effect 累積、卡片進場自取消、Accordion 重開不可見、IO／WAAPI 降級與手機畫面外播放均已修正，第二輪三方全數核准。

## 敏感資料掃描

- API Key／Token／Private Key 特徵：0
- 私有 IP（排除 lockfile 版本字串）：0
- 本機絕對路徑：0
- 外部 CDN／追蹤碼：0

## 已知技術債

1. Browser 控制介面無媒體模擬能力，因此 reduced-motion 本輪以程式檢查、CSS 規則與獨立工程審核驗證，未保存真實模擬截圖。
2. 未產生 30 秒檢閱影片；以隔離的瀏覽器截圖取代，避免擷取其他桌面資訊。

## 最終狀態

PASS WITH KNOWN TECHNICAL DEBT
