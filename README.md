# ELIAS NET

ELIAS NET 是一間正在建立中的**虛擬科技公司**，協助企業把 AI 深入帶進真實工作，同時守住資料、權限、人工核准與責任。網站不把 ELIAS NET 定位成單一產品頁，而是以公司級數位總部呈現創辦人、董事會、高階管理團隊、五大產品領域、技術、信任治理、公司紀錄、概念案例與合作入口。

> **公司主張：深入企業工作的每一個斷點，讓 AI 看見脈絡、推動改變；但不越過人的責任。**

> **公司承諾：可用・可控・可證明。**

## 虛擬公司架構

網站目前展示以下虛擬角色與治理層級：

| 領域 | 角色 |
|---|---|
| 公司治理 | Elias Ren／虛擬創辦人暨執行董事長、虛擬董事會／治理委員會 |
| 高階管理 | Mira Lin／CEO、Alex Wu／COO、Noah Chen／CTO、Iris Huang／CIO、Sofia Park／CPO、Ava Chen／CBO |
| 品質與責任 | Kei Sato／QA 與 Grill 品質、驗證與發布閘門 |
| 思維模型 | Steve Jobs 型產品體驗、Elon Musk 型第一性原理、Mark Zuckerberg 型平台成長 |

這些角色與思維模型是 ELIAS NET 的虛擬公司設定，不代表真實人物任職、加入、授權或背書。所有產品、案例與成熟度都應區分 Concept、Lab、Pilot 與 Production；目前不宣稱正式客戶成果。

## 五大產品領域

| 領域 | 白話定位 | 主要邊界 |
|---|---|---|
| Elias Care Intelligence | 醫療與照護支援：整理核准資訊，讓專業團隊更快看懂現況。 | 不做診斷、不取代合格專業判斷。 |
| Elias Aegis | AI 防護與資料安全：先看清楚 AI 能看什麼、能做什麼。 | 不提供攻擊工具；高影響動作需要授權與紀錄。 |
| Elias Mission Support | 關鍵任務與應變支援：集合現場資訊、資源與交接。 | 不控制武器、不選擇目標、不自主執行高風險任務。 |
| Elias Enterprise Work | 企業知識與服務協作：減少重複查找、整理與回覆。 | 不代替企業承諾、不自行送出敏感內容或重大決定。 |
| Elias Global Signal | 多模態資訊與全球應變：把文件、聲音、影像與語言整理成重點。 | 不宣稱完美辨識、翻譯或取代專業判斷。 |

五大領域共用 Elias Control Layer，並由 Knowledge Hub、Service Copilot、Ops Sentinel、Workflow Orchestrator 與 Signal Studio 等核心引擎支援。產品卡片先使用一般人能理解的工作語言，技術名詞與實作邊界放在 Technology／Governance 區域。

## 技術與動畫

網站使用 Astro 靜態輸出、TypeScript、原生 CSS、Canvas 2D 與 GSAP。GSAP 用於 Hero、Leadership 與 Company 頁面的公司級進場、受控視差、階層揭示與治理路徑；產品圖片只負責建立情境，流程、來源、權限與狀態使用 HTML／CSS 呈現。所有非必要動態效果都應尊重 `prefers-reduced-motion`，並以靜態內容作為降級方案。

## 多語系網站

| 語言 | 首頁 | Company |
|---|---|---|
| 繁體中文 | <https://natsuki1208.github.io/Corporatesite/> | <https://natsuki1208.github.io/Corporatesite/company/> |
| 簡體中文 | <https://natsuki1208.github.io/Corporatesite/zh-cn/> | <https://natsuki1208.github.io/Corporatesite/zh-cn/company/> |
| English | <https://natsuki1208.github.io/Corporatesite/en/> | <https://natsuki1208.github.io/Corporatesite/en/company/> |

簡體中文由共用資料層與內建繁簡字映射產生，三種語言共用同一套公司結構、產品領域與治理內容。

## 專案結構

- `astro-source/`：Astro、TypeScript 與樣式原始碼。
- `site/`：GitHub Pages 靜態輸出副本。
- `docs/`：公司治理、顧問角色、科技公司網站借鑑、產品 UX、公司宇宙與簡報規格。
- `astro-source/src/components/CompanyPage.astro`：Company 三語頁面。
- `astro-source/src/components/Leadership.astro`：虛擬董事會與高階管理團隊。
- `astro-source/src/components/ProductPortfolio.astro`：五大產品領域與白話介面流程。
- `astro-source/src/scripts/company-motion.ts`：GSAP 公司級動態效果。
- `astro-source/src/data/site.ts`：共用內容資料與多語系工具。
- `astro-source/src/data/simplified-map.ts`：內建繁簡轉換映射。

## 本地開發與發布

```bash
cd astro-source
npm ci
npm run check
npm run build
npm run qa:static
```

建置會輸出首頁與 Company 的六個靜態路由。GitHub Actions 會從 `astro-source/dist` 建置並發布到 GitHub Pages；`site/` 保留一份同步的靜態輸出供檢查與存檔。

## 顧問與規格文件

- [NATSUKI 高階顧問公司組織架構](docs/NATSUKI_高階顧問公司_組織架構.md)
- [NATSUKI 高階經理人候選與角色扮演名單](docs/NATSUKI_高階經理人候選與角色扮演名單.md)
- [NATSUKI 網站多角色評估與重新設計建議](docs/NATSUKI_網站多角色評估與重新設計建議.md)
- [ELIAS NET 虛擬科技公司與上市科技網站借鑑規劃](docs/ELIAS_NET_虛擬科技公司與上市科技網站借鑑規劃.md)
- [ELIAS NET 五大產品領域與一般人使用情境](docs/ELIAS_NET_五大產品領域_一般人使用情境與介面規格.md)
- [ELIAS NET 虛構企業宇宙與 OCP 參考決議](docs/ELIAS_NET_虛構企業宇宙與OCP參考決議.md)
- [ELIAS NET 公司官網模型與 AURELIX 參考決議](docs/ELIAS_NET_公司官網模型與AURELIX參考決議.md)
- [ELIAS NET 公司介紹與願景簡報大綱](docs/ELIAS_NET_公司介紹與願景簡報大綱.md)

## 資料與聯絡表單

聯絡表單只在瀏覽器產生 `mailto:` 郵件草稿，不由網站傳送或儲存填寫內容。請勿在示範表單中輸入個人、機密或正式客戶資料。
