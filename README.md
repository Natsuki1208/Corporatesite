# ELIAS NET

ELIAS NET 是一間正在建立中的**虛擬科技公司**，協助企業把 AI 安全、有效且可追溯地帶進真實工作。網站不把 ELIAS NET 定位成單一產品頁，而是以公司級數位總部呈現創辦人、董事會、高階管理團隊、解決方案、技術、信任治理、證據、洞察、人才與合作入口。

> **公司承諾：可用・可控・可證明。**

## 虛擬公司架構

網站目前展示以下虛擬角色：

| 領域 | 角色 |
|---|---|
| 公司治理 | 虛擬創辦人暨董事長、虛擬董事會 |
| 高階管理 | CEO、COO、CTO、CIO、CPO、CBO |
| 品質與責任 | QA／Grill 品質與確認總監 |
| 思維模型 | Steve Jobs 型產品體驗、Elon Musk 型第一性原理、Mark Zuckerberg 型平台成長 |

這些角色與思維模型是 ELIAS NET 的虛擬公司設定，不代表真實人物任職、加入、授權或背書。所有產品、案例與成熟度都應區分 Concept、Lab、Pilot 與 Production；目前不宣稱正式客戶成果。

## 解決方案

目前公開的概念解決方案包括：

- **Elias Knowledge Hub**：協助知識、行政與營運團隊從核准文件中找到可追溯的答案。
- **Elias Service Copilot**：協助服務台與客服團隊整理案件、建立摘要與準備建議回覆。
- **Elias Ops Sentinel**：協助 IT、MIS 與營運團隊關聯事件、建立脈絡並優先進行唯讀檢查。

## 技術與動畫

網站使用 Astro 靜態輸出、TypeScript、原生 CSS、Canvas 2D 與 GSAP。GSAP 目前用於 Hero 與公司領導區段的層次進場、受控視差與卡片揭示；既有互動動畫則維持模組化腳本。所有非必要動態效果都應尊重 `prefers-reduced-motion`，並以靜態內容作為降級方案。

## 多語系網站

| 語言 | 網址 |
|---|---|
| 繁體中文 | <https://natsuki1208.github.io/Corporatesite/> |
| 簡體中文 | <https://natsuki1208.github.io/Corporatesite/zh-cn/> |
| English | <https://natsuki1208.github.io/Corporatesite/en/> |

簡體中文由共用資料層與內建繁簡字映射產生，三種語言共用同一套頁面結構、產品資料與治理內容。

## 專案結構

- `astro-source/`：Astro、TypeScript 與樣式原始碼。
- `site/`：GitHub Pages 靜態輸出。
- `docs/`：公司治理、顧問角色、上市科技網站借鑑與網站改版規格。
- `astro-source/src/components/Leadership.astro`：虛擬創辦人、董事會與高階管理團隊。
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

建置完成後，Astro 會輸出 `/`、`/zh-cn/` 與 `/en/` 三個靜態路由；GitHub Pages 由 `site/` 目錄提供發布內容。

## 顧問與規格文件

- [NATSUKI 高階顧問公司組織架構](docs/NATSUKI_高階顧問公司_組織架構.md)
- [NATSUKI 高階經理人候選與角色扮演名單](docs/NATSUKI_高階經理人候選與角色扮演名單.md)
- [NATSUKI 網站多角色評估與重新設計建議](docs/NATSUKI_網站多角色評估與重新設計建議.md)
- [ELIAS NET 虛擬科技公司與上市科技網站借鑑規劃](docs/ELIAS_NET_虛擬科技公司與上市科技網站借鑑規劃.md)

## 資料與聯絡表單

聯絡表單只在瀏覽器產生 `mailto:` 郵件草稿，不由網站傳送或儲存填寫內容。請勿在示範表單中輸入個人、機密或正式客戶資料。
