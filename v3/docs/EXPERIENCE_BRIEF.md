# BLOCKOPS v3 Experience Brief

## 核心概念

一座持續運作、由 AI 協助但仍由 MIS 掌握最終控制權的原創 Voxel 智慧維運世界。訪客由 World Entrance 進入 Operations Atlas，選擇設施、播放任務、在 MIS Decision 停點確認，再返回地圖。

## v2 設計診斷

v2 的資訊完整，但同尺寸卡片、三欄排列與長頁錨點讓每個功能的視覺權重接近，場景只是卡片的背景，使用者沒有「進入、選區、執行任務、回到地圖」的空間記憶。v3 將內容改為單一活動場景、地標輪廓、任務三幕與固定 HUD。

## 資訊架構

1. World Entrance：單一品牌入口與世界控制。
2. Operations Atlas：六座功能地標與三座支援設施。
3. Mission Scene：Situation → BLOCKOPS Assist → MIS Decision。
4. Technology Core：十個技術模組環繞中央核心。
5. Operations Record：虛構事件處理軌跡。
6. Contact Station：不送出的展示表單。

## 六區

- 監控高塔：設備狀態偏移、唯讀掃描、MIS 模擬檢查。
- AI 核心城：事件分類、建議、人工確認。
- 匿名化閘門：同一資料方塊穿越遮罩閘門。
- 唯讀資料礦坑：核准範圍、五筆限制、禁止寫入。
- 夜間通知站：分類、匿名化、抽象通知與值班確認。
- 人工核准堡壘：建議停在鎖定閘門，由人決定。

## 技術決策

保留原生 HTML／CSS／JavaScript，不引入 Framework、WebGL、CDN 或動畫套件。全站使用單一 Scene 切換、共用 TimerScope、Mission FSM 與一個全域鍵盤 Listener。沒有後端、API、Telemetry、fetch、XHR、WebSocket 或 Beacon。

## 本機素材

角色 PNG 與預覽音訊只供本機視覺檢閱，位於 Git ignore 路徑，不得 Commit、Push、封裝為正式發布物或公開部署。

`LOCAL VISUAL REVIEW ONLY — NOT FOR PUBLICATION`
