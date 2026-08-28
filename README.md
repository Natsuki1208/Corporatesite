# ELIAS NET

**The future of yesterday, today.**

Elias Net 研發能理解資訊、協調任務，並走進真實環境的人工智能與仿生人系統。我們相信人工智能可以陪伴人類，看見更多、準備下一步，並和我們一起創造未來。

## 產品系統

- **Digital Intelligence／數位智慧**：Elias Knowledge、Elias Care、Elias Flow、Elias Ops。
- **Embodied Intelligence／實體智慧**：Elias Home、Elias Rescue。

四項數位產品協助整理知識、服務、流程與營運資訊；兩項實體智慧概念探索居家協助與非武裝救援。各產品頁會依現有證據標示概念或原型狀態，不把概念圖片描述成已量產或已部署的成果。

## 三語網站

| 語言 | 正式網站 |
|---|---|
| 繁體中文 | <https://natsuki1208.github.io/Corporatesite/> |
| 简体中文 | <https://natsuki1208.github.io/Corporatesite/zh-cn/> |
| English | <https://natsuki1208.github.io/Corporatesite/en/> |

## 本地開發

```bash
cd astro-source
npm ci
npm run check
npm run build
npm run qa:static
```

GitHub Pages 由 `.github/workflows/deploy-pages.yml` 建置 `astro-source/`，並發布產生的 `astro-source/dist/`。正式發布不依賴舊版 `site/` 靜態快照。

## 設計與可及性

- 支援繁體中文、簡體中文與英文對應路由。
- 支援鍵盤操作、語意化 HTML 與 `prefers-reduced-motion`。
- 產品影片進入可視範圍時才播放，離開畫面後暫停。
- Elias Home 與 Elias Rescue 為概念研究，不代表量產、部署或立即供應。

© 2026 Elias Net
