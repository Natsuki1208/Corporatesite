# ELIAS NET

ELIAS NET 是一間虛構的自主系統科技公司，連結 AI、關鍵基礎設施與非武裝救援系統，協助團隊理解風險、協調回應並保護生命。

> **Autonomous systems. Human command.** 自主系統，由人類指揮。

本專案把 ELIAS NET 當作一個可被理解、記得並持續發展的虛擬企業宇宙，而不是單一產品展示頁。所有規劃中的能力都以 `LAB`、`CONCEPT` 或 `PILOT` 標示，不將概念描述成既有部署成果。

## Company 2.0

Company 頁面採用「減法＋產品化」方向，固定閱讀順序為：

```text
公司主張 → 創辦理念 → 治理制度 → 三項產品系統 → 組織架構 → 公司發展紀錄 → PoC 合作入口
```

公司核心主張是：

> **自主能力越強，人類的指揮權就必須越清楚。**

Company 2.0 的三項產品都以以下四步說明：

```text
輸入 → AI 協助 → 人類控制 → 驗證結果
INPUT → AI ASSISTANCE → HUMAN CONTROL → VERIFIABLE RESULT
```

## 三項產品

| 產品 | 一般人能理解的定位 | 成熟度 | 安全界線 |
|---|---|---|---|
| ELIAS NETOPS | 把監控、日誌、資安與備份事件放在同一張圖上，協助團隊先看懂問題再處理 | `LAB` | 只提供受控建議，不直接改動正式環境 |
| ELIAS GUARDIAN | 協調非武裝設備、感測器與通訊資源，支援救援與巡檢團隊掌握現場 | `CONCEPT` | 不控制武器、不選擇攻擊目標、不自主執行高風險行動 |
| ELIAS MEDIC | 整理位置、生命徵象、照護資訊與資源，協助合格專業人員完成交接 | `CONCEPT` | 不做診斷、不取代醫療專業、不自行發布醫療結論 |

三項產品共用 **ELIAS CONTROL** 人類指揮與治理層，負責身分、權限、核准、停止、稽核與成熟度。CONTROL 是共同底座，不另算第四項產品。

## 虛構公司與治理

ELIAS NET 的公司宇宙包含虛構創辦人 Helena Vale、董事會／治理委員會、執行長 Adrian Mercer、首席人類控制與安全主管 Daniel Kwan、專業中心與獨立 QA／Grill。人物設定是公司敘事的一部分，不代表真實任職、合作、客戶關係或公開人物背書。

治理流程從定義問題開始，依序確認資料、畫出界線、實際測試、由人核准，再持續觀察變更。沒有證據，不進下一階段。

## 三語系網站

| 語言 | 首頁 | Company |
|---|---|---|
| 繁體中文 | <https://natsuki1208.github.io/Corporatesite/> | <https://natsuki1208.github.io/Corporatesite/company/> |
| 簡體中文 | <https://natsuki1208.github.io/Corporatesite/zh-cn/> | <https://natsuki1208.github.io/Corporatesite/zh-cn/company/> |
| English | <https://natsuki1208.github.io/Corporatesite/en/> | <https://natsuki1208.github.io/Corporatesite/en/company/> |

## 動畫與可及性

網站使用 HTML、SVG、CSS 與 GSAP／TypeScript 動畫，把問題、脈絡、授權、回應與證據串成可讀的工作路徑。Company 2.0 的產品流程會依序揭示輸入、AI 協助、人類控制與驗證結果；動畫只負責增強理解，文字內容不依賴動畫才能讀取。

動畫主要使用 `transform` 與 `opacity`，避免常駐高耗能畫面；`prefers-reduced-motion` 會提供完整靜態內容。介面保留鍵盤焦點、`aria-pressed` 選取狀態、三語路由與手機版閱讀保底。

## 本地開發與發布

```bash
cd astro-source
npm ci
npm run check
npm run build
npm run qa:static
```

Astro 會輸出六個靜態路由：繁中、簡中與英文首頁，以及三個 Company 頁面。GitHub Pages workflow 從 `astro-source/dist` 建置並發布。

聯絡表單只在瀏覽器建立寄往 `natsuki12089212@gmail.com` 的 `mailto:` 草稿，不會由網站儲存內容。請勿輸入病歷、正式系統憑證、身分資料或未公開事件資訊。

## 專案文件

| 文件 | 用途 |
|---|---|
| [`docs/ELIAS_NET_Company_2.0_減法與產品化決議.md`](docs/ELIAS_NET_Company_2.0_減法與產品化決議.md) | Company 2.0 的三方決議、產品化標準與驗收門檻 |
| [`docs/ELIAS_NET_五大產品領域_一般人使用情境與介面規格.md`](docs/ELIAS_NET_五大產品領域_一般人使用情境與介面規格.md) | 首頁五大產品領域的白話使用情境與介面規格 |
| [`docs/ELIAS_NET_公司官網模型與AURELIX參考決議.md`](docs/ELIAS_NET_公司官網模型與AURELIX參考決議.md) | 科技公司與顧問公司官網模式參考 |
| [`docs/ELIAS_NET_虛構企業宇宙與OCP參考決議.md`](docs/ELIAS_NET_虛構企業宇宙與OCP參考決議.md) | 虛構企業宇宙與 OCP 的可借鑑邊界 |
| [`docs/ELIAS_NET_公司介紹與願景簡報大綱.md`](docs/ELIAS_NET_公司介紹與願景簡報大綱.md) | 公司介紹與願景簡報內容大綱 |
| [`docs/ELIAS_NET_capabilities_顧問評估與改版決議.md`](docs/ELIAS_NET_capabilities_顧問評估與改版決議.md) | capabilities 白話能力與人類控制路徑決議 |
| [`docs/ELIAS_NET_實作驗證筆記.md`](docs/ELIAS_NET_實作驗證筆記.md) | 本地預覽、部署與 Company 2.0 驗證紀錄 |

## 身份與內容聲明

ELIAS NET 是虛構科技公司與概念示範網站。網站中的創辦人、董事、主管、產品、時間線與產品畫面皆為概念設定；真實人物僅可作為文字化的思維模型參考，不代表任職、合作、投資或背書。網站不宣稱已上市、已部署、已有客戶成果或具備未經驗證的醫療、軍事與自主操作能力。
