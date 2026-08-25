# Elias Net Dual Kinetic AI Typography Polish — 2026-08-25

## Final status

**PASS WITH KNOWN TECHNICAL DEBT**

本輪在獨立工作副本完成；來源 ZIP 未覆寫。未 Commit、Push、Merge 或 Deploy。

## Scope delivered

- 八個主要 Section 順序維持不變。
- 移除各 Section 的 `00–07 /` 可見頁碼。
- 移除 Header `04 / 07` 計數器與空白容器；保留需求指定的上一頁／下一頁、disabled、ARIA、Scroll Spy 與 Hash。
- 移除核心能力卡片及組裝模組的 `01–06`。
- 移除 AI 工作路徑右側與底部的 `01–04`，保留文字 Tab。
- 六張既有能力語意 SVG 保持 6/6，未重製。
- 核心能力中央改為原創 Inline SVG「Elias Net Kinetic AI Core」。
- AI 工作路徑改為原創 Inline SVG 四階段 AI 筆畫狀態。
- 中英文、手機、鍵盤操作、reduced-motion 與 GitHub Pages base path 保持相容。

## Visible numbering removed

| Surface | Before | After |
|---|---|---|
| Section eyebrow | `00 / HOME` 到 `07 / ...` | `HOME`、`CHALLENGES`、`CAPABILITIES` 等文字分類 |
| Header | `EN ← 04 / 07 →` | `EN ← →` |
| Capability cards | `01–06 + 能力名稱` | 只顯示能力名稱 |
| Capability assembly | 六個編號模組 | 六個具名模組 |
| AI work path kicker | `03 / 人員確認` | `人員確認` |
| AI work path tabs | `01–04 + 階段` | `需求／脈絡／人員確認／成果` |

案例與導入方法內的編號仍作為案例／流程順序，不是 Section 頁碼，故依範圍保留。

## Kinetic AI Core — three stages

1. **理解**：冷青訊號進入，A／I 分拆筆畫描繪。
2. **整合**：六項能力連線接入；A 左右筆畫外展、橫槓延伸，I 主幹縮短成整合節點；玫瑰金呈現人員、體驗與責任。
3. **形成能力**：A／I 從已保存的整合形態連續收束，轉為香檳金完成態，輸出至「可使用的 AI 工作能力」。

首次進入只播放一次，離開 Viewport 或頁面隱藏時停止；提供 44px 高的「重播能力如何形成」。Reduced motion 直接呈現完成態。

## AI work path — four stages

| Stage | Word | SVG state |
|---|---|---|
| 需求 | 理解需求 / UNDERSTAND | A 保持開放入口，I 由短訊號構成，冷青訊號進入 |
| 脈絡 | 建立脈絡 / CONNECT | A 分支外展，I 分為資料軸，冷青與玫瑰金節點交會 |
| 人員確認 | 等待確認 / PAUSE | I 主幹移至清楚的確認界線，責任框出現，輸出維持停止 |
| 成果 | 形成成果 / ENABLE | A／I 收束為象牙白與香檳金，確認後才點亮成果路徑 |

首次進入完整示範一次，每階段約 3.1 秒；示範期間按鈕顯示「暫停示範」。使用者點 Tab、暫停、離開 Viewport 或切至背景分頁後立即停止。完成後恢復「重播完整流程」。支援 ArrowLeft、ArrowRight、Home、End。

## Accessibility and lifecycle

- `prefers-reduced-motion`：不自動切換，不播放筆畫，第一階段靜態可讀，重播隱藏／停用。
- JavaScript 失效：首階段內容與 SVG 仍存在於 HTML。
- Tab 使用 `role=tab`、`aria-selected`、roving `tabindex`、`aria-controls`。
- 兩組動畫皆具備初始化、播放、停止／取消、重設與 cleanup 路徑。
- WAAPI finished effect 會 cancel，再由確定性的 CSS state 接管，避免快速切換殘留。
- 無持續 `requestAnimationFrame`；AI 工作路徑沒有無限 Timer。
- 對比：主標 `#F1EDE4` / `#11181C` = **15.35:1**；說明 `#C5CCCA` / `#11181C` = **10.98:1**，均高於 WCAG AA。

## Validation

| Check | Result |
|---|---|
| `npm ci` | PASS（Lockfile 同步後乾淨安裝；0 vulnerabilities） |
| `npm run check` | PASS — 37 files, 0 errors, 0 warnings, 0 hints |
| `npm run build` | PASS — 中文／英文 2 routes |
| `npm run qa:static` | PASS |
| 中文 `/Corporatesite/` | PASS |
| 英文 `/Corporatesite/en/` | PASS |
| 八頁順序 | PASS |
| Header / Footer navigation | PASS |
| Visible `00–07 /` Section page numbers | 0 |
| Header counter | 0 |
| Capability numbering | 0 |
| AI path numbering | 0 |
| Six capability SVGs | 6/6 |
| Broken hash | 0 |
| Duplicate ID | 0 |
| Missing local assets | 0 |
| External runtime resources | 0 |
| Browser console errors / warnings | 0 |
| Horizontal overflow 1440 / 1024 / 390 | 0 / 0 / 0 |
| Keyboard AI tabs | PASS |
| Reduced-motion implementation | PASS（程式與靜態狀態檢查） |
| Secret / credential scan | NONE |

## Browser QA screenshots

1. `qa/screenshots/04-capabilities-final-1440.png` — 中文核心能力頁首與完成態
2. `qa/screenshots/05-ai-work-human-review-1440.png` — 人員確認階段
3. `qa/screenshots/06-ai-work-path-mobile-390.png` — 390px Tab 與文案
4. `qa/screenshots/07-ai-workmark-mobile-390.png` — 390px AI 字標
5. `qa/screenshots/08-capabilities-en-1024.png` — 英文 1024px
6. `qa/screenshots/09-final-human-review-1440.png` — 最終桌面回歸

本機瀏覽器不提供 WAAPI 動畫錄製能力，因此未產出會誤導的 GIF／影片；已保留各靜態階段、程式生命週期、互動與 fallback 證據。

## Review results

- **市場／品牌：APPROVED WITH CHANGES**。主要建議移除上一／下一區段箭頭，但本輪明確要求保留，故不採用；已採用企業價值導向的 replay 文案。
- **動態／UI：APPROVED**。兩輪 Grill 發現並修正 finished-fill 殘留、A 筆畫跳回、I 主幹跳接及暫停標籤狀態。
- **工程／Grill：APPROVED**。建置、頁序、資源、Hash、cleanup、快速重播與 reduced-motion 無本輪阻擋。

## Modified files

- `package-lock.json`
- `scripts/verify-static.mjs`
- `src/components/Header.astro`
- `src/components/Hero.astro`
- `src/components/BusinessProblems.astro`
- `src/components/InnovationPromise.astro`
- `src/components/WorkScenes.astro`
- `src/components/Capabilities.astro`
- `src/components/AIChangePath.astro`
- `src/components/InnovationCases.astro`
- `src/components/AdoptionMethod.astro`
- `src/components/CollaborationEntry.astro`
- `src/scripts/navigation-ui.ts`
- `src/scripts/capability-motion.ts`
- `src/scripts/ai-change.ts`
- `src/styles/capabilities.css`
- `src/styles/kinetic-ai.css`

## Known technical debt

- 既有 Business Problems 卡片只提供 pointer hover 動畫，尚未提供 focus 等價重播；依本輪「不得修改其他 Section」界線未更動。
- 瀏覽器 QA 環境未提供原生 reduced-motion 模擬與 WAAPI 錄影；reduced-motion 以程式分支、CSS media query 與靜態 fallback 驗證。
- Header 上一／下一區段箭頭仍帶少量簡報式語感，但本輪規格明確要求保留。

## Final state

`PASS WITH KNOWN TECHNICAL DEBT`

`WAITING FOR HUMAN REVIEW`
