# ELIAS NET

ELIAS NET 是一個自主系統品牌，連結 AI、關鍵基礎設施與非武裝救援設備，協助團隊理解風險、協調回應並保護生命。

> **Autonomous systems. Human command.** 自主系統，由人類指揮。

本站以 LAB、CONCEPT 與 PILOT 清楚標示產品開發階段，不將規劃中的能力描述成既有部署成果。

## 三項產品

| 產品 | 定位 | 成熟度 | 安全界線 |
|---|---|---|---|
| ELIAS NETOPS | AI 網路與基礎設施協作平台 | LAB | 重大變更須通過權限與人工核准 |
| ELIAS GUARDIAN | 高風險環境設備協作平台 | CONCEPT | 非武裝；不選擇、追蹤或攻擊人類目標 |
| ELIAS MEDIC | 醫療救援資訊協作平台 | CONCEPT | 不獨立診斷或自主分診，醫療決策由合格人員負責 |

三項產品共用 **ELIAS CONTROL** 人類指揮與治理層，負責身分、權限、核准、任務限制、緊急停止及稽核紀錄。CONTROL 是共用底座，不另算第四項產品。

## 領導團隊

- Helena Vale／創辦人暨董事長
- Adrian Mercer／執行長
- Daniel Kwan／首席人類控制與安全主管

網站使用明亮董事會合照、三位核心人物肖像及三項產品情境圖建立一致的企業視覺。人物與產品圖片皆為概念影像。

## 任務動畫

首頁任務動畫採用 HTML、SVG、CSS 與單一 TypeScript 狀態機：

```text
DETECT → CONTEXT → AUTHORIZE → RESPOND → PROVE
偵測 → 建立脈絡 → 人類授權 → 執行 → 留下證據
```

動畫只在可視範圍內播放；背景分頁會暫停，不使用常駐 Canvas RAF。`prefers-reduced-motion` 會直接顯示完整的最終狀態。

## 多語系網站

| 語言 | 首頁 | Company |
|---|---|---|
| 繁體中文 | <https://natsuki1208.github.io/Corporatesite/> | <https://natsuki1208.github.io/Corporatesite/company/> |
| 簡體中文 | <https://natsuki1208.github.io/Corporatesite/zh-cn/> | <https://natsuki1208.github.io/Corporatesite/zh-cn/company/> |
| English | <https://natsuki1208.github.io/Corporatesite/en/> | <https://natsuki1208.github.io/Corporatesite/en/company/> |

## 本地開發與發布

```bash
cd astro-source
npm ci
npm run check
npm run build
npm run qa:static
```

Astro 建置輸出六個靜態路由，GitHub Actions 從 `astro-source/dist` 發布至 GitHub Pages。

聯絡表單只在瀏覽器建立寄往 `natsuki12089212@gmail.com` 的 `mailto:` 草稿，不會由網站儲存內容。請勿輸入病歷、正式系統憑證、身分資料或未公開事件資訊。
