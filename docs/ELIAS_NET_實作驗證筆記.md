# ELIAS NET 實作驗證筆記

## 2026-08-27 預覽檢查

預覽網址：本地 Astro preview 的 `/Corporatesite/` 路徑。

繁體中文首頁成功載入，標題顯示「Elias Net｜把 AI 安全地接進企業工作」。導覽已包含「領導與治理、解決方案、信任原則、技術能力、導入方法、開始合作」，並提供「繁中、简中、EN」三個語言入口。

首頁成功顯示 ELIAS NET 的 Hero、AI 核心視覺與新增的「公司領導與治理」區段。Leadership 區段包含虛擬創辦人、虛擬董事會、Mira Lin（CEO）、Alex Wu（COO）、Noah Chen（CTO）、Iris Huang（CIO）、Sofia Park（CPO）、Ava Chen（CBO）與 Kei Sato（QA／Grill），並呈現每個角色的背景、思維設定與責任範圍。

初始檢查發現 Hero 文字被既有 `data-reveal` 與新 GSAP 標記重疊而卡在 opacity 0；已移除 Hero 外層 `.hero-copy` 的 `data-reveal` 與 `data-gsap-hero-item`，保留子元素的 GSAP 目標後重新建置。修正後首屏文字可見，Hero 標題、文案、CTA 與 AI 視覺同時呈現。

`npm run check` 與 `npm run build` 均已成功，Astro 輸出 `/index.html`、`/zh-cn/index.html` 與 `/en/index.html` 三個路由。

## Company 三語頁面與五大產品第二階段驗證

2026-08-27：本地 Astro 預覽已成功載入 `/Corporatesite/company/`。首屏可見 ELIAS NET 公司開場、強力穿透感主標、虛構創辦人 Elias Ren 的寫實概念肖像、`FICTIONAL / ACCOUNTABLE` 身份標示與 `SYSTEM // ONLINE` 訊號。Company 頁面依序渲染使命、虛擬創辦人、公司組織／權責地圖、治理協議、五大產品領域、虛擬公司紀錄與開始合作入口。

Company 頁面 Header 顯示「公司使命、組織架構、治理制度、解決方案、開始合作」，語言切換提供繁中、简中、EN；瀏覽器抽取內容確認六個導覽入口與頁尾完整存在。首頁已成功建置五張產品卡片，五大產品領域的白話介面流程、控制方式與產品視覺均被輸出。

本地預覽首屏截圖的檢查標記為瀏覽器檢查層，不屬於網站本身。Company 頁面建置路由為 `/company/`、`/zh-cn/company/`、`/en/company/`，Astro check、build 與 qa:static 均已通過。

## Capabilities 區段改版前線上檢查

2026-08-27：線上 `/Corporatesite/#capabilities` 可載入既有內容與 Leadership，但目前能力區段的第一層標題仍偏抽象，頁面需要訪客理解 AI 如何進入工作、誰負責與何時停止。瀏覽器抽取確認現有能力資料包含資料、系統、AI、治理與產品入口；畫面截取時內容呈現偏淡，可能與進場動畫時機有關，也應在改版中加強靜態對比與動畫完成後的可見保底。

顧問團隊改版重點：把 capabilities 從「技術能力清單」改為「ELIAS NET 如何把 AI 帶進工作的控制路徑」，先用人話說明，再提供技術深入內容；加入五個可理解的能力站點、具體介面流程、停止／交接節點、角色責任與 Concept／Lab／Pilot／Production 成熟度，不把技術能力誤寫成已完成的正式產品或客戶成果。

## Capabilities 改版後本地瀏覽器驗證

2026-08-27：本地預覽的首頁已更新為「從一個工作問題，到一個有責任的 AI 工作方式」。Capabilities 現在以五步白話工作路徑呈現：真實工作問題、核准資料、AI 協助、人的確認、可追蹤結果；六張能力卡也改用「從問題找起、把 AI 放進工作流程、把資料整理成可信脈絡、建立有界線的 AI 協助、接上原本的工具、把規則寫進每天的工作」等第一層名稱。

瀏覽器抽取確認五步路徑、五項產品、Leadership、治理、三語導覽與既有內容均存在；點擊「技術能力」可保留 `#capabilities` 路徑。截圖當下受到平滑捲動／GSAP 進場時機影響，視覺層可能暫時偏暗，但 HTML 文字已完整載入；靜態 QA 已通過。
