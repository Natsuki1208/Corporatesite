export const zh = String.raw`
    <section id="trust" class="main-section trust light-section" data-section="trust" aria-labelledby="trust-title">
      <div class="shell reveal">
        <p class="eyebrow dark">SERVICE PROCESS & TRUST</p>
        <h2 id="trust-title" data-en="From deployment onward, we keep systems running">從建置開始，陪企業持續運作</h2>
        <p class="section-copy dark-copy" data-en="Integration does not end on launch day. We begin with assessment, design, implementation and verification, then refine operations over time. Data scope, permissions, human responsibility and audit records are defined before adoption.">系統整合不在上線那一天結束。我們從盤點、規劃、建置與驗證開始，再依營運狀況持續調整。資料範圍、權限、人工責任與稽核紀錄會在導入前說清楚。</p>
        <div class="delivery-console" data-delivery-console>
          <div class="delivery-heading"><div><h3>Digital Delivery Twin</h3><p data-en="A local simulation of how an integration engagement moves from assessment to continuous operations. It does not represent a completed customer deployment.">以本機動畫呈現整合服務如何從盤點走到持續維運，不代表已完成任何客戶正式部署。</p></div><div class="delivery-controls"><button class="text-button" type="button" data-delivery-play data-en="Play">播放</button><button class="text-button" type="button" data-delivery-pause disabled data-en="Pause">暫停</button><button class="text-button" type="button" data-delivery-replay data-en="Replay">重播</button></div></div>
          <div class="delivery-twin">
            <div class="delivery-track" aria-hidden="true"><i></i></div>
            <ol aria-label="服務交付五階段" data-label-en="Five-stage delivery lifecycle">
              <li><button type="button" data-delivery-stage="0" aria-current="step"><span>01</span><b data-en="Assess">盤點</b><small data-en="Asset relationship map">交付 · 資產關係圖</small></button></li>
              <li><button type="button" data-delivery-stage="1"><span>02</span><b data-en="Design">設計</b><small data-en="Architecture and boundary plan">交付 · 架構與邊界設計</small></button></li>
              <li><button type="button" data-delivery-stage="2"><span>03</span><b data-en="Build">建置</b><small data-en="Approved change record">交付 · 核准變更紀錄</small></button></li>
              <li><button type="button" data-delivery-stage="3"><span>04</span><b data-en="Verify">驗證</b><small data-en="Functional and recovery evidence">交付 · 功能與回復證據</small></button></li>
              <li><button type="button" data-delivery-stage="4"><span>05</span><b data-en="Operate">持續維運</b><small data-en="Operations improvement log">交付 · 維運改善紀錄</small></button></li>
            </ol>
            <div class="delivery-readout" role="status" aria-live="polite"><span data-delivery-index>01 / ASSESS</span><b data-delivery-title data-en="Map before changing">先盤點，再改變</b><p data-delivery-description>掃描資產、服務關係與風險斷點。</p><em data-en="SIMULATION · NO CUSTOMER SYSTEM CONNECTED">模擬展示 · 未連接客戶系統</em></div>
          </div>
          <div class="governance-orbit"><div class="governance-core"><span>CONTROLLED DELIVERY</span><b data-en="Boundaries remain visible through every stage">每個階段都保留安全界線</b></div><div class="governance-layers" role="group" aria-label="五項安全治理" data-label-en="Five governance controls">
            <button type="button" class="active" data-governance="0" data-protect="權限與可操作範圍" data-protect-en="Permissions and action scope" data-apply="依工作需要核准最小權限，不預設開放高風險能力。" data-apply-en="Approve the minimum access needed for the task; high-risk capability is not open by default." data-why="降低誤用與權限擴散。" data-why-en="Reduces misuse and privilege spread." aria-pressed="true" data-en="Least privilege">最小權限</button>
            <button type="button" data-governance="1" data-protect="正式資料與設備狀態" data-protect-en="Production data and device state" data-apply="查詢與驗證先採唯讀模式。" data-apply-en="Queries and validation start in read-only mode." data-why="避免分析流程意外改變環境。" data-why-en="Prevents analysis from changing the environment." aria-pressed="false" data-en="Read-only first">唯讀優先</button>
            <button type="button" data-governance="2" data-protect="帳號、位址與敏感識別資訊" data-protect-en="Accounts, addresses and sensitive identifiers" data-apply="保留判讀所需脈絡，同時遮蔽不必要欄位。" data-apply-en="Keep needed context while masking unnecessary fields." data-why="減少資料暴露並維持可判讀性。" data-why-en="Reduces exposure while keeping data useful." aria-pressed="false" data-en="Data masking">資料遮蔽</button>
            <button type="button" data-governance="3" data-protect="高影響操作與責任界線" data-protect-en="High-impact actions and accountability" data-apply="流程在執行前停止，呈現目標、原因與風險。" data-apply-en="Stop before execution and show target, reason and risk." data-why="讓重要操作由資訊人員決定。" data-why-en="Keeps critical actions under human decision." aria-pressed="false" data-en="Human review">人員確認</button>
            <button type="button" data-governance="4" data-protect="決策與變更歷程" data-protect-en="Decision and change history" data-apply="保留時間、範圍、核准與結果紀錄。" data-apply-en="Record time, scope, approval and outcome." data-why="讓事件可回顧、可交接、可稽核。" data-why-en="Makes events reviewable, transferable and auditable." aria-pressed="false" data-en="Audit trail">稽核留痕</button>
          </div><div class="governance-detail" role="status" aria-live="polite"><span data-en="Protects">保護</span><b data-governance-protect>權限與可操作範圍</b><span data-en="How">實施</span><p data-governance-apply>依工作需要核准最小權限，不預設開放高風險能力。</p><span data-en="Why it matters">重要性</span><p data-governance-why>降低誤用與權限擴散。</p></div></div>
        </div>
      </div>
    </section>
`;

export const en = String.raw`
    <section id="trust" class="main-section trust light-section" data-section="trust" aria-labelledby="trust-title">
      <div class="shell reveal">
        <p class="eyebrow dark">SERVICE PROCESS & TRUST</p>
        <h2 id="trust-title" data-en="From deployment onward, we keep systems running">From deployment onward, we keep systems running</h2>
        <p class="section-copy dark-copy" data-en="Integration does not end on launch day. We begin with assessment, design, implementation and verification, then refine operations over time. Data scope, permissions, human responsibility and audit records are defined before adoption.">Integration does not end on launch day. We begin with assessment, design, implementation and verification, then refine operations over time. Data scope, permissions, human responsibility and audit records are defined before adoption.</p>
        <div class="delivery-console" data-delivery-console>
          <div class="delivery-heading"><div><h3>Digital Delivery Twin</h3><p data-en="A local simulation of how an integration engagement moves from assessment to continuous operations. It does not represent a completed customer deployment.">A local simulation of how an integration engagement moves from assessment to continuous operations. It does not represent a completed customer deployment.</p></div><div class="delivery-controls"><button class="text-button" type="button" data-delivery-play data-en="Play">Play</button><button class="text-button" type="button" data-delivery-pause disabled data-en="Pause">Pause</button><button class="text-button" type="button" data-delivery-replay data-en="Replay">Replay</button></div></div>
          <div class="delivery-twin">
            <div class="delivery-track" aria-hidden="true"><i></i></div>
            <ol aria-label="Five-stage delivery lifecycle" data-label-en="Five-stage delivery lifecycle">
              <li><button type="button" data-delivery-stage="0" aria-current="step"><span>01</span><b data-en="Assess">Assess</b><small data-en="Asset relationship map">Asset relationship map</small></button></li>
              <li><button type="button" data-delivery-stage="1"><span>02</span><b data-en="Design">Design</b><small data-en="Architecture and boundary plan">Architecture and boundary plan</small></button></li>
              <li><button type="button" data-delivery-stage="2"><span>03</span><b data-en="Build">Build</b><small data-en="Approved change record">Approved change record</small></button></li>
              <li><button type="button" data-delivery-stage="3"><span>04</span><b data-en="Verify">Verify</b><small data-en="Functional and recovery evidence">Functional and recovery evidence</small></button></li>
              <li><button type="button" data-delivery-stage="4"><span>05</span><b data-en="Operate">Operate</b><small data-en="Operations improvement log">Operations improvement log</small></button></li>
            </ol>
            <div class="delivery-readout" role="status" aria-live="polite"><span data-delivery-index>01 / ASSESS</span><b data-delivery-title data-en="Map before changing">Map before changing</b><p data-delivery-description>Scan assets, service relationships and risk breakpoints.</p><em data-en="SIMULATION · NO CUSTOMER SYSTEM CONNECTED">SIMULATION · NO CUSTOMER SYSTEM CONNECTED</em></div>
          </div>
          <div class="governance-orbit"><div class="governance-core"><span>CONTROLLED DELIVERY</span><b data-en="Boundaries remain visible through every stage">Boundaries remain visible through every stage</b></div><div class="governance-layers" role="group" aria-label="Five governance controls" data-label-en="Five governance controls">
            <button type="button" class="active" data-governance="0" data-protect="權限與可操作範圍" data-protect-en="Permissions and action scope" data-apply="依工作需要核准最小權限，不預設開放高風險能力。" data-apply-en="Approve the minimum access needed for the task; high-risk capability is not open by default." data-why="降低誤用與權限擴散。" data-why-en="Reduces misuse and privilege spread." aria-pressed="true" data-en="Least privilege">Least privilege</button>
            <button type="button" data-governance="1" data-protect="正式資料與設備狀態" data-protect-en="Production data and device state" data-apply="查詢與驗證先採唯讀模式。" data-apply-en="Queries and validation start in read-only mode." data-why="避免分析流程意外改變環境。" data-why-en="Prevents analysis from changing the environment." aria-pressed="false" data-en="Read-only first">Read-only first</button>
            <button type="button" data-governance="2" data-protect="帳號、位址與敏感識別資訊" data-protect-en="Accounts, addresses and sensitive identifiers" data-apply="保留判讀所需脈絡，同時遮蔽不必要欄位。" data-apply-en="Keep needed context while masking unnecessary fields." data-why="減少資料暴露並維持可判讀性。" data-why-en="Reduces exposure while keeping data useful." aria-pressed="false" data-en="Data masking">Data masking</button>
            <button type="button" data-governance="3" data-protect="高影響操作與責任界線" data-protect-en="High-impact actions and accountability" data-apply="流程在執行前停止，呈現目標、原因與風險。" data-apply-en="Stop before execution and show target, reason and risk." data-why="讓重要操作由資訊人員決定。" data-why-en="Keeps critical actions under human decision." aria-pressed="false" data-en="Human review">Human review</button>
            <button type="button" data-governance="4" data-protect="決策與變更歷程" data-protect-en="Decision and change history" data-apply="保留時間、範圍、核准與結果紀錄。" data-apply-en="Record time, scope, approval and outcome." data-why="讓事件可回顧、可交接、可稽核。" data-why-en="Makes events reviewable, transferable and auditable." aria-pressed="false" data-en="Audit trail">Audit trail</button>
          </div><div class="governance-detail" role="status" aria-live="polite"><span data-en="Protects">Protects</span><b data-governance-protect>Permissions and action scope</b><span data-en="How">How</span><p data-governance-apply>Approve the minimum access needed for the task; high-risk capability is not open by default.</p><span data-en="Why it matters">Why it matters</span><p data-governance-why>Reduces misuse and privilege spread.</p></div></div>
        </div>
      </div>
    </section>
`;
