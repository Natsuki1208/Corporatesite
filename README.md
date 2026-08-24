# 麥塊智慧維運｜BLOCKOPS

## v3 Experience Prototype

`v3/` 是獨立的全螢幕世界探索原型，不覆蓋 v2。入口網址為 `http://127.0.0.1:8081/v3/`，內容包括 World Entrance、Operations Atlas、六區任務、Technology Core、Operations Record 與 Contact Station。

v3 仍為純前端本機展示：`simulate_only=true`、`Actual Action：0`。沒有後端、API、正式設備、外部資源、追蹤或資料傳送。角色 PNG 與本機音訊為 `LOCAL VISUAL REVIEW ONLY — NOT FOR PUBLICATION`，已由 `.gitignore` 排除，發布前必須替換。

BLOCKOPS 是一個原創、明亮且繽紛的 Voxel 方塊科技概念單頁網站。第一版聚焦於 AI 智慧維運、IT 基礎架構、資安監控、企業自動化、夜間／假日協助與營運狀態分析。

> 一格一格建構，讓企業穩定運行。
> Build Smart. Operate Strong.

## 專案定位

- 中文品牌：麥塊智慧維運
- 英文品牌：BLOCKOPS
- 視覺主題：原創 Voxel 方塊世界 × AI 智慧維運控制台
- 技術：純 HTML、CSS、JavaScript 與原創 SVG
- 資料：所有案例、節點與狀態皆為虛構展示資料

## 方案與安全邊界

網站以六座獨立互動小場景說明系統與設備監控、AI 事件判讀、資料匿名化、夜間與假日協作、唯讀安全查詢，以及人工核准與受控處置。另有可播放的事件流程，會在 MIS 人工確認站暫停。

目前能力以離線驗證、Pilot 與唯讀查詢為主。AI 只協助判讀、整理與提出建議，不自行重啟設備、不控制 ESXi、不修改帳號或防火牆，也不取代 MIS。未來若加入任何處置能力，仍須具備人工核准、最小權限與稽核紀錄。

技術研究區提供 Local AI／Qwen、Ollama Runtime、Wazuh Read-only Query、Anonymization Gateway、通訊通知規劃、Hash Integrity、TLS／憑證、Audit Log 與 Human Approval 的用途、成熟階段和安全限制說明。

## 網站結構

```text
.
├── index.html
├── assets/
│   ├── branding/   # 原創 SVG Logo 與 favicon
│   ├── audio/      # 被 Git 忽略的 localhost 本機測試音訊
│   ├── local-preview/ # 被 Git 忽略的本機參考圖替換
│   ├── css/        # 視覺、響應式與減少動態樣式
│   ├── icons/      # 原創 SVG 圖示資產
│   └── js/         # 前端互動
├── docs/
│   ├── BRAND_GUIDE.md
│   └── QA_REPORT.md
└── README.md
```

## 本機預覽

不需要安裝任何套件。從 Repository 根目錄執行：

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

再開啟 `http://127.0.0.1:8080/`。驗證後以 `Ctrl+C` 停止 Server。

## 原創 Voxel 動態世界

全站由單一 World State 同步控制時間、環境色、效果密度、音訊狀態、目前區塊與模擬事件。狀態包含 `worldMode`、`worldPhase`、`effectLevel`、`soundEnabled`、`reducedMotion`、`activeSection` 與 `demoEventState`。

- 世界時間提供即時、75 秒展示循環與手動太陽／月亮三種模式；即時模式以本機 07:00～17:59 為白天。
- 首頁中央基地包含原創工程員、穩定環境動物、能源塔、資料線、防護閘門、夜間異常單位與匿名模擬告警。
- DEMO EVENT 只使用 `HOST-DEMO-01` 至 `HOST-DEMO-03`，等待 MIS 點擊模擬檢查後才繼續，結束固定顯示 `simulate_only=true` 與實際 Action 0。
- 六項方案分別呈現監控塔、AI 判讀、匿名化閘門、夜間通知、唯讀查詢與人工核准故事，同時間只播放一項。
- 自動化資料軌道由原創方塊羊慢走與停站吃草帶出流程，並在 MIS 人工確認站暫停；技術研究中心、夜間防護區、維運工程站、訊息傳送站與 Footer 遠景各自使用不同動畫。
- 世界效果分為靜態、標準、豐富。標準顯示 2 名工程員與 2 隻動物；豐富顯示 3 名工程員與 5 隻動物；手機版降為 1 名與 1 隻。
- IntersectionObserver 只讓可視區塊保留主要動畫，頁面隱藏後也會暫停環境動畫。程式沒有使用 `setInterval`，只有一個持續的世界時間更新迴圈。

可攜式網站原始設計以 HTML／CSS 幾何圖形建立場景。人工檢閱中的人物、羊與夜間異常目前改用依參考方向重新產生的三個原創 BLOCKOPS 角色，並以柔邊遮罩與環境色光暈融入場景。檔案暫放於 `assets/local-preview/`；該目錄已由 Git 排除，只能用於 localhost，不屬於可 Commit、封裝或發布的網站素材。

### 本機參考圖片

`assets/local-preview/` 內包含使用者參考圖與本輪產生的原創角色預覽，只用來確認角色外形與畫面方向。網站缺少這些檔案時仍保留主要文字與控制功能。這些圖片不得進入 Commit、Push、審核包或發布版本；正式版本須另行完成可發布資產整理。

### 繽紛方塊世界視覺

- 首頁採中央能量舞台、斜向光束、彩色資料方塊與海報式硬陰影，建立熱鬧但仍專業的第一印象。
- 控制台保留深色霓虹儀表風格；六項方案改成不同主色與輪廓的功能城鎮。
- 自動化流程使用草地運輸步道與慢走方塊羊；技術能力使用紫青研究島與彈出模組。
- 夜間區使用深紫防護城；關於區使用明亮工程工坊；聯絡區使用珊瑚色訊息車站。
- 角色圖片使用環境色底、混合模式與柔邊遮罩降低白邊感，並保持手機版角色密度限制。

**LOCAL PREVIEW ONLY — DO NOT PUBLISH OR COMMIT**

### 本機測試音訊

`assets/audio/local-preview/` 僅供 localhost 人工預覽，整個目錄已由 `.gitignore` 排除。背景音訊只有在使用者點擊「進入營運世界」後才會嘗試播放，預設音量為 20%、循環播放，並提供播放、暫停、靜音與音量控制。音訊不存在時，網站其餘內容與互動仍可正常使用。

**LOCAL PREVIEW ONLY — REPLACEMENT REQUIRED BEFORE PUBLICATION**

該音訊及其來源檔不得 Commit、Push、封裝或發布；正式發布前必須移除或換成已確認可公開使用的授權素材。

## 動畫與無障礙

- Logo 開場動畫約 1.5 秒，可略過，同一瀏覽器 Session 不重複強制播放。
- Hero 使用純 CSS 幾何圖形建立前景、中景、遠景、基地組裝、雲朵、資料光線與輕度景深。
- 六項方案動畫皆為獨立前端模擬；事件流程在人工確認站停下，核准後才繼續展示。
- 提供「精簡／標準／豐富」三種效果模式，預設標準並保存於 `localStorage`。
- 系統的 `prefers-reduced-motion: reduce` 永遠優先於網站效果設定。
- reduced-motion 會停止工程員行走、動物動作、錯誤封包、夜間掃描及非必要環境循環，靜態說明仍保留。
- 離開可視範圍或分頁隱藏時，非必要循環動畫會暫停。
- 支援鍵盤操作，快捷欄可用數字鍵 `1` 至 `6` 切換。
- 技術能力模組支援滑鼠、Enter／Space、焦點回復、焦點範圍與 `Esc` 關閉。
- 使用語意化 HTML、可見焦點、ARIA 狀態、SVG `title` 與即時狀態訊息區。
- 支援 `prefers-reduced-motion: reduce`；主要內容在 JavaScript 關閉時仍可閱讀。
- 手機版降低視差與複雜動畫，快捷欄可水平捲動。

## 純前端展示限制

- 沒有後端、API、追蹤碼、分析服務或第三方表單。
- 聯絡表單只顯示展示訊息，不儲存輸入、不傳送 Request。
- Google Chat 與 Telegram 僅以原創幾何圖示代表可能的未來通知管道。
- 所有主機、帳號、位址、狀態、事件與百分比均為虛構或保留示範值。

## 素材與品牌聲明

可發布的網站原始碼不引用外部 CDN、Font、動畫套件或追蹤服務；Logo、場景、方塊與圖示由本專案以 HTML、CSS、JavaScript 及 SVG 製作。本機參考 PNG 與測試 MP3 均被 Git 排除，只供 localhost 人工檢閱，不構成可發布素材，也不得用來聲稱與 Minecraft 或 Mojang 有任何關係。

Original voxel-inspired concept.
Not affiliated with or endorsed by Minecraft or Mojang.

## 發布狀態

此版本尚未正式發布；GitHub Pages 尚未啟用。網站表單為純展示模式，不會儲存、寄送或傳輸輸入資料。本機參考 PNG 與測試音訊不得進入任何 Commit、審核封裝或發布產物。
