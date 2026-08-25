export const zh = String.raw`
    <section id="problems" class="main-section problems" data-section="problems" aria-labelledby="problems-title">
      <div class="shell reveal">
        <p class="eyebrow">INTEGRATION FIRST</p>
        <h2 id="problems-title" data-en="Many systems should not mean more chaos">系統很多，管理不該更混亂</h2>
        <p class="section-copy" data-en="Devices, accounts, suppliers and alerts often operate apart, forcing IT teams to assemble answers across screens. We map relationships and breakpoints first, then decide what truly needs reinforcement.">設備、帳號、供應商與告警各自運作，資訊團隊往往需要在不同畫面之間拼湊答案。當權限、紀錄與維護責任不清楚，問題就更難被快速定位。我們先整理關係與斷點，再決定真正需要補強的地方。</p>
        <p class="topology-hint" data-en="Select a node to inspect its impact. The opening sequence demonstrates how scattered problems converge.">點選節點查看影響；開場動畫會示範分散問題如何被關聯整理。</p>
        <div class="topology" data-problem-topology>
          <div class="topology-core"><span>ELIAS NET</span><b data-problem-impact role="status" aria-live="polite" data-en="Mapping relationships between systems">正在整理系統關聯</b><small data-topology-state>RELATIONSHIP MAPPING</small></div>
          <div class="problem-nodes" role="group" aria-label="常見整合問題" data-label-en="Common integration problems">
            <button type="button" aria-pressed="false" data-problem="設備版本分散，架構與回復路徑難以掌握。" data-problem-en="Mixed device generations make architecture and recovery paths hard to see." data-service="IT 基礎架構整合" data-service-en="IT Infrastructure Integration"><i></i><strong data-en="Devices">設備</strong><span data-en="Versions and recovery paths differ">版本與回復路徑不一致</span><em data-en="STATUS · BASELINE NEEDED">狀態 · 需要基線</em><small data-en="IT Infrastructure Integration">對應 · IT 基礎架構整合</small></button>
            <button type="button" aria-pressed="false" data-problem="帳號生命週期與權限散落在不同雲端服務。" data-problem-en="Account lifecycles and permissions are scattered across cloud services." data-service="雲端與協作服務" data-service-en="Cloud & Collaboration"><i></i><strong data-en="Cloud identities">雲端帳號</strong><span data-en="Permissions are distributed">權限分散在不同服務</span><em data-en="STATUS · BOUNDARY NEEDED">狀態 · 需要界線</em><small data-en="Cloud & Collaboration">對應 · 雲端與協作服務</small></button>
            <button type="button" aria-pressed="false" data-problem="重複告警淹沒真正需要處理的事件。" data-problem-en="Repeated alerts hide the events that truly need attention." data-service="資安與監控整合" data-service-en="Security & Monitoring"><i></i><strong data-en="Monitoring alerts">監控告警</strong><span data-en="Repeated notices hide priority events">重複通知淹沒重要事件</span><em data-en="STATUS · CONVERGENCE NEEDED">狀態 · 需要收斂</em><small data-en="Security & Monitoring">對應 · 資安與監控整合</small></button>
            <button type="button" aria-pressed="false" data-problem="跨供應商的責任與交接缺少共同脈絡。" data-problem-en="Cross-vendor ownership and handoffs lack shared context." data-service="整合規劃" data-service-en="Integration Planning"><i></i><strong data-en="Suppliers">供應商</strong><span data-en="Ownership breaks across handoffs">跨團隊交接責任斷點</span><em data-en="STATUS · OWNERSHIP NEEDED">狀態 · 需要責任界線</em><small data-en="Integration Planning">對應 · 整合規劃</small></button>
            <button type="button" aria-pressed="false" data-problem="維運判斷集中在少數人，經驗難以延續。" data-problem-en="Operational knowledge stays with a few people and is hard to sustain." data-service="自動化與持續維運" data-service-en="Automation & Continuous Operations"><i></i><strong data-en="Team knowledge">團隊知識</strong><span data-en="Operational judgment has a single point">重要經驗集中在少數人員</span><em data-en="STATUS · CONTINUITY NEEDED">狀態 · 需要延續</em><small data-en="Automation & Continuous Operations">對應 · 自動化與持續維運</small></button>
          </div>
        </div>
        <details class="audience-note">
          <summary data-en="Who is this for?">適合哪些企業？</summary>
          <p data-en="For lean IT teams, multi-site environments, alert-heavy operations, cloud transformation and teams that need night or holiday coverage.">適合資訊人力有限、多據點、告警過多、正在雲端轉型，或需要夜間與假日值班的企業。</p>
        </details>
      </div>
    </section>
`;

export const en = String.raw`
    <section id="problems" class="main-section problems" data-section="problems" aria-labelledby="problems-title">
      <div class="shell reveal">
        <p class="eyebrow">INTEGRATION FIRST</p>
        <h2 id="problems-title" data-en="Many systems should not mean more chaos">Many systems should not mean more chaos</h2>
        <p class="section-copy" data-en="Devices, accounts, suppliers and alerts often operate apart, forcing IT teams to assemble answers across screens. We map relationships and breakpoints first, then decide what truly needs reinforcement.">Devices, accounts, suppliers and alerts often operate apart, forcing IT teams to assemble answers across screens. We map relationships and breakpoints first, then decide what truly needs reinforcement.</p>
        <p class="topology-hint" data-en="Select a node to inspect its impact. The opening sequence demonstrates how scattered problems converge.">Select a node to inspect its impact. The opening sequence demonstrates how scattered problems converge.</p>
        <div class="topology" data-problem-topology>
          <div class="topology-core"><span>ELIAS NET</span><b data-problem-impact role="status" aria-live="polite" data-en="Mapping relationships between systems">Mapping relationships between systems</b><small data-topology-state>RELATIONSHIP MAPPING</small></div>
          <div class="problem-nodes" role="group" aria-label="Common integration problems" data-label-en="Common integration problems">
            <button type="button" aria-pressed="false" data-problem="設備版本分散，架構與回復路徑難以掌握。" data-problem-en="Mixed device generations make architecture and recovery paths hard to see." data-service="IT 基礎架構整合" data-service-en="IT Infrastructure Integration"><i></i><strong data-en="Devices">Devices</strong><span data-en="Versions and recovery paths differ">Versions and recovery paths differ</span><em data-en="STATUS · BASELINE NEEDED">STATUS · BASELINE NEEDED</em><small data-en="IT Infrastructure Integration">IT Infrastructure Integration</small></button>
            <button type="button" aria-pressed="false" data-problem="帳號生命週期與權限散落在不同雲端服務。" data-problem-en="Account lifecycles and permissions are scattered across cloud services." data-service="雲端與協作服務" data-service-en="Cloud &amp; Collaboration"><i></i><strong data-en="Cloud identities">Cloud identities</strong><span data-en="Permissions are distributed">Permissions are distributed</span><em data-en="STATUS · BOUNDARY NEEDED">STATUS · BOUNDARY NEEDED</em><small data-en="Cloud &amp; Collaboration">Cloud &amp; Collaboration</small></button>
            <button type="button" aria-pressed="false" data-problem="重複告警淹沒真正需要處理的事件。" data-problem-en="Repeated alerts hide the events that truly need attention." data-service="資安與監控整合" data-service-en="Security &amp; Monitoring"><i></i><strong data-en="Monitoring alerts">Monitoring alerts</strong><span data-en="Repeated notices hide priority events">Repeated notices hide priority events</span><em data-en="STATUS · CONVERGENCE NEEDED">STATUS · CONVERGENCE NEEDED</em><small data-en="Security &amp; Monitoring">Security &amp; Monitoring</small></button>
            <button type="button" aria-pressed="false" data-problem="跨供應商的責任與交接缺少共同脈絡。" data-problem-en="Cross-vendor ownership and handoffs lack shared context." data-service="整合規劃" data-service-en="Integration Planning"><i></i><strong data-en="Suppliers">Suppliers</strong><span data-en="Ownership breaks across handoffs">Ownership breaks across handoffs</span><em data-en="STATUS · OWNERSHIP NEEDED">STATUS · OWNERSHIP NEEDED</em><small data-en="Integration Planning">Integration Planning</small></button>
            <button type="button" aria-pressed="false" data-problem="維運判斷集中在少數人，經驗難以延續。" data-problem-en="Operational knowledge stays with a few people and is hard to sustain." data-service="自動化與持續維運" data-service-en="Automation &amp; Continuous Operations"><i></i><strong data-en="Team knowledge">Team knowledge</strong><span data-en="Operational judgment has a single point">Operational judgment has a single point</span><em data-en="STATUS · CONTINUITY NEEDED">STATUS · CONTINUITY NEEDED</em><small data-en="Automation &amp; Continuous Operations">Automation &amp; Continuous Operations</small></button>
          </div>
        </div>
        <details class="audience-note">
          <summary data-en="Who is this for?">Who is this for?</summary>
          <p data-en="For lean IT teams, multi-site environments, alert-heavy operations, cloud transformation and teams that need night or holiday coverage.">For lean IT teams, multi-site environments, alert-heavy operations, cloud transformation and teams that need night or holiday coverage.</p>
        </details>
      </div>
    </section>
`;
