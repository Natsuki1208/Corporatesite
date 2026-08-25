export const zh = String.raw`
    <section id="ai-operations" class="main-section ai-operations" data-section="ai-operations" aria-labelledby="ai-title">
      <picture class="ai-media" aria-hidden="true"><source media="(max-width:600px)" srcset="/Corporatesite/images/elias-net-ai-operations-mobile.jpg"><img src="/Corporatesite/images/elias-net-ai-operations.jpg" alt="" loading="lazy"></picture>
      <div class="shell ai-layout reveal">
        <div class="ai-copy">
          <p class="eyebrow">AI OPERATIONS · CONTROLLED ASSISTANCE</p>
          <h2 id="ai-title" data-en="AI reads the signal. People decide the action.">AI 看懂訊號，人員決定行動</h2>
          <p data-en="Elias Net turns scattered alerts, events and device context into a clear summary, helping teams understand impact and priority. Suggestions are allowed; critical actions require human confirmation.">Elias Net 將分散的告警、事件與設備資訊整理成清楚摘要，協助資訊人員理解異常、影響範圍與處理優先順序。系統可以提出檢查建議，但涉及重新啟動、關閉服務、設備管控或權限異動時，必須先由人員確認。</p>
          <div class="journey-controls">
            <button class="button primary" type="button" data-journey-start data-en="Start event journey">播放事件旅程</button>
            <button class="button secondary" type="button" data-journey-pause disabled data-en="Pause">暫停</button>
            <button class="text-button" type="button" data-journey-reset data-en="Replay">重播</button>
          </div>
        </div>
        <div class="journey" data-journey aria-label="事件處理模擬流程" data-label-en="Simulated event handling journey">
          <ol>
            <li class="active"><button type="button" data-journey-node="0"><span>01</span><b data-en="Event source">事件來源</b><small>EVENT-DEMO-1042</small></button></li>
            <li><button type="button" data-journey-node="1"><span>02</span><b data-en="Read-only intake">唯讀接收</b><small>READ ONLY</small></button></li>
            <li><button type="button" data-journey-node="2"><span>03</span><b data-en="Anonymization">資料匿名化</b><small>HOST-DEMO-03 → HOST-A</small></button></li>
            <li><button type="button" data-journey-node="3"><span>04</span><b data-en="AI analysis">AI 分析整理</b><small data-en="Context grouped">脈絡已整理</small></button></li>
            <li><button type="button" data-journey-node="4"><span>05</span><b data-en="Recommendation">提出處理建議</b><small data-en="No action executed">未執行操作</small></button></li>
            <li class="gate"><button type="button" data-journey-node="5"><span>06</span><b data-en="Human review">等待資訊人員確認</b><small>APPROVAL REQUIRED</small></button></li>
            <li><button type="button" data-journey-node="6"><span>07</span><b data-en="Approved path">核准後才允許執行</b><small>SIMULATION ONLY</small></button></li>
            <li><button type="button" data-journey-node="7"><span>08</span><b data-en="Audit record">保留稽核紀錄</b><small>Actual Action: 0</small></button></li>
          </ol>
          <div class="journey-status" role="status" aria-live="polite"><span data-journey-status data-en="Ready. No real device is connected.">準備完成。未連接真實設備。</span><button type="button" data-approve hidden data-en="Simulate approval">模擬核准</button></div>
          <p class="demo-boundary"><code>simulate_only=true</code><span>Actual Action: 0</span><span data-en="No real device operated">未操作真實設備</span></p>
        </div>
      </div>
    </section>
`;

export const en = String.raw`
    <section id="ai-operations" class="main-section ai-operations" data-section="ai-operations" aria-labelledby="ai-title">
      <picture class="ai-media" aria-hidden="true"><source media="(max-width:600px)" srcset="/Corporatesite/images/elias-net-ai-operations-mobile.jpg"><img src="/Corporatesite/images/elias-net-ai-operations.jpg" alt="" loading="lazy"></picture>
      <div class="shell ai-layout reveal">
        <div class="ai-copy">
          <p class="eyebrow">AI OPERATIONS · CONTROLLED ASSISTANCE</p>
          <h2 id="ai-title" data-en="AI reads the signal. People decide the action.">AI reads the signal. People decide the action.</h2>
          <p data-en="Elias Net turns scattered alerts, events and device context into a clear summary, helping teams understand impact and priority. Suggestions are allowed; critical actions require human confirmation.">Elias Net turns scattered alerts, events and device context into a clear summary, helping teams understand impact and priority. Suggestions are allowed; critical actions require human confirmation.</p>
          <div class="journey-controls">
            <button class="button primary" type="button" data-journey-start data-en="Start event journey">Start event journey</button>
            <button class="button secondary" type="button" data-journey-pause disabled data-en="Pause">Pause</button>
            <button class="text-button" type="button" data-journey-reset data-en="Replay">Replay</button>
          </div>
        </div>
        <div class="journey" data-journey aria-label="Simulated event handling journey" data-label-en="Simulated event handling journey">
          <ol>
            <li class="active"><button type="button" data-journey-node="0"><span>01</span><b data-en="Event source">Event source</b><small>EVENT-DEMO-1042</small></button></li>
            <li><button type="button" data-journey-node="1"><span>02</span><b data-en="Read-only intake">Read-only intake</b><small>READ ONLY</small></button></li>
            <li><button type="button" data-journey-node="2"><span>03</span><b data-en="Anonymization">Anonymization</b><small>HOST-DEMO-03 → HOST-A</small></button></li>
            <li><button type="button" data-journey-node="3"><span>04</span><b data-en="AI analysis">AI analysis</b><small data-en="Context grouped">Context grouped</small></button></li>
            <li><button type="button" data-journey-node="4"><span>05</span><b data-en="Recommendation">Recommendation</b><small data-en="No action executed">No action executed</small></button></li>
            <li class="gate"><button type="button" data-journey-node="5"><span>06</span><b data-en="Human review">Human review</b><small>APPROVAL REQUIRED</small></button></li>
            <li><button type="button" data-journey-node="6"><span>07</span><b data-en="Approved path">Approved path</b><small>SIMULATION ONLY</small></button></li>
            <li><button type="button" data-journey-node="7"><span>08</span><b data-en="Audit record">Audit record</b><small>Actual Action: 0</small></button></li>
          </ol>
          <div class="journey-status" role="status" aria-live="polite"><span data-journey-status data-en="Ready. No real device is connected.">Ready. No real device is connected.</span><button type="button" data-approve hidden data-en="Simulate approval">Simulate approval</button></div>
          <p class="demo-boundary"><code>simulate_only=true</code><span>Actual Action: 0</span><span data-en="No real device operated">No real device operated</span></p>
        </div>
      </div>
    </section>
`;
