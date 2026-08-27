# ELIAS NET 寫實虛擬人物與科技官網升級規格

**文件狀態：** v1.0，開始執行前的製作基準  
**適用專案：** ELIAS NET 虛擬科技公司 GitHub Pages  ￼
**文件作者：** Manus AI

## 一、顧問公司共同決議

NATSUKI 高階顧問公司同意 ELIAS NET 採用**寫實風格的虛擬人物肖像**。寫實的目的是讓虛擬公司具有組織感、責任感與長期品牌記憶，而不是把虛構角色偽裝成真實員工。所有人物都是 ELIAS NET 自己建立的 Fictional Virtual Executive／Fictional Virtual Team，必須在網站中清楚揭露。

本決議不是聲稱 Steve Jobs、Elon Musk、Mark Zuckerberg、Satya Nadella、Javier Olivan、Kevin Scott 或其他真實人物曾經參與 ELIAS NET。這些名字只作為「思維模型」的分析框架，實際人物肖像、姓名與經歷全部使用虛構內容。

## 二、三種思想模型如何判定

### Steve Jobs 型：先確認一眼能否理解

產品體驗模型要求網站訪客一眼看懂這是一間虛擬科技公司、人物屬於哪一個管理層、每個角色負責什麼，以及產品解決哪一個工作問題。寫實人物可以增加信任感，但不能讓人物照片取代職位、責任、治理邊界與產品證據。人物卡片必須保持簡潔，避免履歷式的過量文字與裝飾。

### Elon Musk 型：從基本原理決定哪些人值得生成

第一性原理模型要求先問：「哪些肖像是理解公司所必需？哪些只是裝飾？」因此第一輪生成的資產應該覆蓋 Founder、CEO、COO、CTO、CIO、CPO、CBO、QA／Grill 八個核心角色，而不是製作大量沒有內容責任的臉孔。每張肖像都必須對應一個清楚的決策責任、產品領域或驗收閘門；若一張圖不能支持公司理解、產品理解或信任建立，就不生成。

同一輪生成必須使用一致的臉部身份、攝影比例、光線方向、背景深度與檔案規格，減少返工與維運成本。圖片應採用適合 GitHub Pages 的壓縮尺寸、延遲載入與手機裁切，不讓視覺資產拖慢網站。

### Mark Zuckerberg 型：把肖像變成可重用的內容系統

平台與擴張模型要求人物肖像不是一次性裝飾，而是可在 Leadership、Company、Insights、Concept Cases、Culture 與未來 Careers 中重用的角色資產。每個人物需要穩定的角色 ID、英文與三種中文頁面共用的身份、固定職位、固定責任與固定視覺標籤。新增角色時必須遵守同一套資產規格，才能形成可持續的公司內容系統。

## 三、Elias Net 公司階層

網站不應把所有人物平鋪在同一層，建議採用以下由上而下的公司階層：

```text
ELIAS NET 虛擬科技公司
│
├── Founder & Executive Chair
│   └── 虛擬創辦人暨執行董事長
│
├── Virtual Board & Governance Council
│   ├── Product & Experience Seat
│   ├── Technology & AI Seat
│   ├── Enterprise Trust & Data Seat
│   ├── Market & Ecosystem Seat
│   └── Independent Quality & Risk Seat
│
├── Executive Team
│   ├── CEO／Mira Lin
│   ├── COO／Alex Wu
│   ├── CTO／Noah Chen
│   ├── CIO／Iris Huang
│   ├── CPO／Sofia Park
│   └── CBO／Ava Chen
│
├── Professional Centers
│   ├── Brand, Product Experience & Market Content
│   ├── Frontend, Security & Network
│   ├── AI Platform & Generative AI Applications
│   └── Reliability & Operations
│
└── Independent Assurance
    ├── QA Director
    └── Grill／Delivery Gatekeeper
```

這個階層的網站呈現順序是：先讓訪客知道公司由誰創立，再說明董事會用哪些角度檢查決策，接著展示 CEO／COO／CTO／CIO／CPO／CBO 的正式管理責任，再展示專業中心如何執行，最後以 QA／Grill 作為不受產品速度影響的獨立驗收閘門。

董事會席位可以使用抽象徽章、幾何符號與文字說明，不需要使用真實人物肖像。Steve Jobs 型、Elon Musk 型、Mark Zuckerberg 型只放在「思維模型檢視」內，不進入正式員工階層，也不製作可辨識的真人模擬照片。

## 四、第一輪寫實虛擬人物資產

第一輪建議製作八張寫實虛擬人物肖像，全部使用同一組攝影語言，但各角色用不同的服裝細節、色彩識別與工作背景表達責任差異。

| 資產 ID | 虛擬角色 | 職位層級 | 視覺方向 | 主要出現位置 |
|---|---|---|---|---|
| founder-mira | Elias Net 虛擬創辦人 | Founder & Executive Chair | 穩定、沉著、公司藍圖與金色光線 | Company、Leadership Hero |
| exec-mira | Mira Lin | CEO | 深色俐落西裝、企業策略與暖金光線 | Executive Team、Company |
| exec-alex | Alex Wu | COO | 深藍／青色、交付與營運控制室 | Executive Team、Approach |
| exec-noah | Noah Chen | CTO | 深色工程外套、藍色技術藍圖與冷光 | Executive Team、Technology |
| exec-iris | Iris Huang | CIO | 深灰／青綠、資料治理與稽核檔案 | Executive Team、Trust |
| exec-sofia | Sofia Park | CPO | 低飽和暖色、產品草圖與工作流程 | Executive Team、Solutions |
| exec-ava | Ava Chen | CBO | 香檳金／玫瑰色、品牌內容與市場研究 | Executive Team、Insights |
| assurance-kei | Kei Sato | QA／Grill | 黑／青／金、驗收控制台與獨立審查 | Assurance、Evidence、Release Gate |

上述姓名、經歷與肖像都是虛構設定。圖像提示詞不得包含真實企業家或高階經理人的姓名、臉部描述、標誌、簽名、服裝模仿或可辨識特徵。

## 五、人物肖像製作規格

人物肖像採用高端企業科技攝影風格，但不要做成名人肖像或過度未來科幻角色。每張圖以半身或三分之二身構圖為主，人物視線自然、表情克制、服裝現代、背景簡潔，保留一側的文字安全區。背景可使用 ELIAS NET 的深色藍黑、青色、香檳金與少量玫瑰色，但不放任何不可控的文字、Logo、假資料、證書或真實公司標誌。

圖片需保留可裁切空間，桌面版可使用 4:5 或 3:4 肖像比例，手機版可由同一張圖以 `object-position` 保持臉部與肩線完整。網站關鍵資訊不放在圖片內，而由可翻譯的 HTML 文字呈現。每個人物卡片旁必須顯示「虛構角色／Fictional Virtual Executive」標籤。

## 六、產品視覺製作規格

三個產品保留為 ELIAS NET 的旗艦解決方案，不立即增加產品數量。產品視覺應與人物肖像同樣具有寫實質感，但要服務工作流程，而不只是抽象科技背景。

| 產品 | 建議主視覺 | 必須用 HTML／SVG 補充的流程 |
|---|---|---|
| Elias Knowledge Hub | 企業知識檔案室、核准文件、來源與引用脈絡匯聚 | 核准文件 → 搜尋 → 回答＋引用 → 權限確認 |
| Elias Service Copilot | 服務案件控制台、分類、摘要、建議回覆與人工確認 | 案件 → 意圖分類 → 建議回覆 → 人員核准 |
| Elias Ops Sentinel | 深色維運控制台、事件時間線、唯讀檢查與政策閘門 | 事件關聯 → 唯讀檢查 → 政策閘門 → 等待核准 |

圖片可以營造產品情境與品牌質感，但不能宣稱真實產品已經正式上線，也不能在圖片中放置虛假的客戶 Logo、KPI、認證或 Production 成效。產品成熟度必須由 HTML 文字標示為 Concept、Lab 或 Pilot。

## 七、各區段動畫造型

全站需要具有同等的精緻度，但不同區段使用不同的動畫語言。動畫只服務理解，不用來掩蓋產品資訊不足。

| 區段 | 造型 | 主要動態 |
|---|---|---|
| Company／Hero | 公司總部與受控資料軌道 | 慢速視差、公司定位與流程節點依序進場 |
| Leadership | 虛擬公司檔案室 | 肖像卡片階梯進場、層級線路連接、角色標籤亮起 |
| Solutions | 產品實驗室 | 主視覺遮罩揭示、流程節點脈衝、產品詳情展開 |
| Technology & AI | 技術藍圖 | 模組組裝、路徑描繪、低幅度座標移動 |
| Trust & Security | 稽核閘門 | 核准節點亮起、未授權路徑停止、紀錄落檔 |
| Concept Cases | 示範工作室 | 案例標籤切換、局部流程重播、明示虛擬概念 |
| Insights | 顧問研究編輯台 | 研究卡片切換、標籤分層、內容焦點移動 |
| Approach | 導入控制室 | 六階段進度線、目前階段突出、下一步解鎖 |
| Start a Pilot | 合作會議桌 | 少量暖色光線匯向表單，避免過多動態干擾填寫 |

所有動畫必須保留靜態內容、支援 `prefers-reduced-motion`、只優先動畫 `transform` 與 `opacity`，並在 JavaScript 載入延遲或失敗時保持內容可讀。圖片不得成為唯一內容來源。

## 八、生成與整合順序

第一步先製作八張人物肖像的統一視覺樣本，確認人物身份、攝影質感、裁切與品牌色；第二步製作三張產品主視覺，確認產品情境不會看起來像虛假正式產品截圖；第三步將人物插入 Founder、Executive Team 與 Assurance 層級，並加入虛構身份標籤；第四步深化三個產品的流程與內容；第五步再逐區段加入不同動畫造型；最後執行三語系、手機、無障礙、效能、靜態 QA 與 GitHub Pages 建置檢查。

## 九、不可違反的界線

ELIAS NET 可以使用寫實的虛構人物，但不得讓訪客誤以為真實人物已任職、合作、投資或背書。Steve Jobs、Elon Musk、Mark Zuckerberg 與其他真實人物只作為思維模型，不使用其肖像或模擬發言。不得虛構真實客戶、真實營收、真實 Production 成效、正式認證、股票代碼或上市身分。所有案例、人物、產品與治理內容均須符合 ELIAS NET 目前的虛擬公司與 Concept／Lab／Pilot 公開成熟度。

## 十、驗收標準

人物驗收需確認八個角色身份清楚、階層順序正確、虛構標示可見、三語頁面身份一致、圖片不含關鍵文字與真人模仿。產品驗收需確認三個產品均有清楚工作情境、流程、資料界線、人工核准、Pilot 交付與成熟度聲明。技術驗收需確認桌面與手機不破版、圖片適當壓縮與延遲載入、無障礙文字存在、reduced motion 可用、動畫失敗不會留下 `opacity: 0`，並通過 `npm run check`、`npm run build` 與 `npm run qa:static`。

## References

[1]: https://www.nvidia.com/en-us/solutions/ai/ "NVIDIA AI Solutions"

[2]: https://www.microsoft.com/en-us/ai "Microsoft AI"

[3]: https://cloud.google.com/products/ai "Google Cloud AI Products"

[4]: https://www.accenture.com/us-en "Accenture U.S. official homepage"

[5]: https://natsuki1208.github.io/Corporatesite/ "ELIAS NET GitHub Pages"
