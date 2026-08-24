# BLOCKOPS v3 Issue Records

## BLOCKOPS-ISSUE-002

- issue_id: `BLOCKOPS-ISSUE-002`
- raised_by: Visual Asset / Frontend / QA
- problem: 三個角色 PNG 與 MP3 只供本機預覽，PNG 沒有透明 Alpha，正式發布權限尚未核准。
- evidence: 檔案位於 `assets/local-preview/` 與 `assets/audio/local-preview/`；`git check-ignore` 命中；`git ls-files` 為 0。
- severity: L4
- affected_tasks: World Entrance、Review Bundle、正式發布
- possible_options: 本機 Prototype 使用；重製可發布透明素材；改用 CSS/SVG fallback。
- recommended_option: Prototype 使用本機素材，正式發布前重製或改用 fallback。
- recommendation_reason: 不阻塞體驗驗證，同時避免未核准素材進入 Git。
- human_decision_required: YES_BEFORE_PUBLICATION
- current_status: RESOLVED_FOR_LOCAL_PROTOTYPE_ONLY / PUBLICATION_BLOCKED

## BLOCKOPS-ISSUE-006

- issue_id: `BLOCKOPS-ISSUE-006`
- raised_by: Creative / UX / Frontend Architect
- problem: v2 長頁式卡片與分散 Timer 無法形成單一活動世界。
- evidence: v2 使用 solution grid 與長頁 anchor；v3 需要 Scene lifecycle 與 Mission FSM。
- severity: L3
- affected_tasks: World Entrance、Atlas、Mission、效能、Accessibility
- possible_options: 放大卡片；新增 SceneDirector/TimerScope；改大型 Framework。
- recommended_option: 保留原生程式，加入單一 Scene 與共用 TimerScope。
- recommendation_reason: 可保留安全文字與邏輯，也能客觀驗證離場清理。
- human_decision_required: NO（使用者已核准 v3 原型）
- current_status: IMPLEMENTED_FOR_PROTOTYPE / QA_REQUIRED

## BLOCKOPS-ISSUE-008

- issue_id: `BLOCKOPS-ISSUE-008`
- raised_by: Lead QA
- problem: CSS `.mission-result { display:grid }` 曾覆蓋 HTML `hidden`，讓完成結果提前顯示。
- evidence: 首次監控任務畫面在 READY 階段顯示 DEMO COMPLETED。
- severity: L1
- affected_tasks: Mission FSM 視覺狀態
- possible_options: 個別 selector 修正；加入全域 `[hidden]` 規則。
- recommended_option: `[hidden]{display:none!important}`。
- recommendation_reason: 對所有 scene/panel 保持一致且可測。
- human_decision_required: NO
- current_status: RESOLVED_AND_RETESTED

## BLOCKOPS-ISSUE-009

- issue_id: `BLOCKOPS-ISSUE-009`
- raised_by: Accessibility QA
- problem: Technology Core 的 button 被 `role=listitem` 覆蓋，失去 button 語意。
- evidence: 首次 DOM snapshot 僅顯示 generic，無法用 role=button 操作。
- severity: L1
- affected_tasks: Technology Core 鍵盤操作
- possible_options: 外包 listitem；移除覆蓋角色並將容器改為 group。
- recommended_option: 容器 `role=group`，保留原生 button。
- recommendation_reason: 保留正確按鈕語意與鍵盤行為。
- human_decision_required: NO
- current_status: RESOLVED_AND_RETESTED
