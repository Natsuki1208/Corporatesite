# ELIAS NET 實作驗證筆記

## 2026-08-27 預覽檢查

預覽網址：本地 Astro preview 的 `/Corporatesite/` 路徑。

繁體中文首頁成功載入，標題顯示「Elias Net｜把 AI 安全地接進企業工作」。導覽已包含「領導與治理、解決方案、信任原則、技術能力、導入方法、開始合作」，並提供「繁中、简中、EN」三個語言入口。

首頁成功顯示 ELIAS NET 的 Hero、AI 核心視覺與新增的「公司領導與治理」區段。Leadership 區段包含虛擬創辦人、虛擬董事會、Mira Lin（CEO）、Alex Wu（COO）、Noah Chen（CTO）、Iris Huang（CIO）、Sofia Park（CPO）、Ava Chen（CBO）與 Kei Sato（QA／Grill），並呈現每個角色的背景、思維設定與責任範圍。

初始檢查發現 Hero 文字被既有 `data-reveal` 與新 GSAP 標記重疊而卡在 opacity 0；已移除 Hero 外層 `.hero-copy` 的 `data-reveal` 與 `data-gsap-hero-item`，保留子元素的 GSAP 目標後重新建置。修正後首屏文字可見，Hero 標題、文案、CTA 與 AI 視覺同時呈現。

`npm run check` 與 `npm run build` 均已成功，Astro 輸出 `/index.html`、`/zh-cn/index.html` 與 `/en/index.html` 三個路由。
