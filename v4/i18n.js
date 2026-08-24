(() => {
  'use strict';

  const STORAGE_KEY = 'elias-net-language';
  const languages = ['zh-Hant', 'en', 'ja', 'ko'];
  const table = {
    '跳至主要內容':['Skip to main content','メインコンテンツへ移動','주요 콘텐츠로 이동'],
    'Elias Net 全球工具列':['Elias Net global toolbar','Elias Net グローバルツールバー','Elias Net 글로벌 도구 모음'],
    '選擇網站語言':['Select site language','サイト言語を選択','사이트 언어 선택'],
    '主要導覽':['Primary navigation','メインナビゲーション','주요 탐색'],
    '開啟導覽':['Open navigation','ナビゲーションを開く','탐색 열기'],
    '平台':['Platform','プラットフォーム','플랫폼'], '解決方案':['Solutions','ソリューション','솔루션'],
    '安全治理':['Security & Governance','セキュリティとガバナンス','보안 및 거버넌스'],
    '產業應用':['Industries','業界での活用','산업 활용'], '生態系':['Ecosystem','エコシステム','에코시스템'],
    '洞察':['Insights','インサイト','인사이트'], '關於我們':['About','私たちについて','회사 소개'],
    '規劃應用':['Plan an Application','活用を計画','활용 계획'],
    '探索 Operations Grid':['Explore Operations Grid','Operations Grid を探索','Operations Grid 살펴보기'],
    '探索 World Map':['Explore World Map','World Map を探索','World Map 살펴보기'],
    '探索 Cyber Grid':['Explore Cyber Grid','Cyber Grid を探索','Cyber Grid 살펴보기'],
    '探索 Flow Engine':['Explore Flow Engine','Flow Engine を探索','Flow Engine 살펴보기'],
    '探索 Fabric View':['Explore Fabric View','Fabric View を探索','Fabric View 살펴보기'],
    '探索 Insight Loop':['Explore Insight Loop','Insight Loop を探索','Insight Loop 살펴보기'],
    'AI 營運指揮 · CONCEPT / DEMO':['AI Operations Command · CONCEPT / DEMO','AI 運用指揮 · CONCEPT / DEMO','AI 운영 지휘 · CONCEPT / DEMO'],
    '讓訊號清楚可讀，':['Make signals understandable,','シグナルを分かりやすく、','신호를 명확하게 이해하고,'],
    '讓行動保有控制。':['while keeping action controlled.','行動には制御を。','실행은 통제된 상태로 유지합니다.'],
    'Elias Net 將監控、遮蔽與代碼化、AI 判讀與人工核准整合成一套受控營運流程。':['Elias Net unifies monitoring, masking and coding, AI interpretation, and human approval into one controlled operations flow.','Elias Net は監視、マスキングとコード化、AI 判定、人による承認を一つの制御された運用フローに統合します。','Elias Net은 모니터링, 마스킹 및 코드화, AI 판단, 사람의 승인을 하나의 통제된 운영 흐름으로 통합합니다.'],
    '營運世界模型 · CONCEPT / DEMO':['Operations World Model · CONCEPT / DEMO','運用ワールドモデル · CONCEPT / DEMO','운영 월드 모델 · CONCEPT / DEMO'],
    '看見服務關係，':['See service relationships,','サービスの関係を捉え、','서비스 관계를 파악하고,'],
    '不只是監控圖表。':['not just monitoring charts.','監視チャートだけに頼らない。','모니터링 차트 그 이상을 봅니다.'],
    '將主機、網路、服務與事件擴散路徑映射成可探索的營運世界。':['Map hosts, networks, services, and incident paths into an explorable operations world.','ホスト、ネットワーク、サービス、イベントの波及経路を探索可能な運用世界として可視化します。','호스트, 네트워크, 서비스 및 이벤트 확산 경로를 탐색 가능한 운영 세계로 표현합니다.'],
    '資安韌性 · CONCEPT / DEMO':['Cyber Resilience · CONCEPT / DEMO','サイバーレジリエンス · CONCEPT / DEMO','사이버 복원력 · CONCEPT / DEMO'],
    '讓安全訊號，':['Bring security signals','セキュリティシグナルを','보안 신호를'],
    '回到營運脈絡。':['back into operational context.','運用コンテキストへ。','운영 맥락으로 되돌립니다.'],
    '在隔離或處置之前，先理解身分、端點與服務之間的影響關係。':['Understand the impact among identities, endpoints, and services before isolation or response.','隔離や対処の前に、ID、エンドポイント、サービス間の影響を把握します。','격리나 조치 전에 ID, 엔드포인트, 서비스 간 영향을 먼저 이해합니다.'],
    '可控自動化 · CONCEPT / DEMO':['Controlled Automation · CONCEPT / DEMO','制御可能な自動化 · CONCEPT / DEMO','통제 가능한 자동화 · CONCEPT / DEMO'],
    '可靠的自動化，':['Reliable automation','信頼できる自動化は、','신뢰할 수 있는 자동화는'],
    '知道何時該停下。':['knows when to stop.','止まるべき時を知っています。','언제 멈춰야 하는지 압니다.'],
    '將檢查、通知與建議組合成可追蹤、可核准、可回復的工作流。':['Combine checks, notifications, and recommendations into traceable, approvable, reversible workflows.','確認、通知、提案を、追跡・承認・復元可能なワークフローにまとめます。','점검, 알림, 제안을 추적·승인·복구 가능한 워크플로로 구성합니다.'],
    '混合基礎設施 · CONCEPT / DEMO':['Hybrid Infrastructure · CONCEPT / DEMO','ハイブリッド基盤 · CONCEPT / DEMO','하이브리드 인프라 · CONCEPT / DEMO'],
    '從機房到遠端據點，':['From data centers to remote sites,','データセンターから遠隔拠点まで、','데이터센터에서 원격 지점까지,'],
    '維持一致營運視野。':['maintain one operational view.','一貫した運用ビューを維持。','일관된 운영 시야를 유지합니다.'],
    '統整虛擬化、雲端、網路與邊緣節點，同時保留在地操作權限。':['Unify virtualization, cloud, networks, and edge nodes while retaining local control.','仮想化、クラウド、ネットワーク、エッジを統合しつつ、現場の操作権限を保持します。','가상화, 클라우드, 네트워크, 엣지를 통합하면서 현장 통제권을 유지합니다.'],
    '營運知識循環 · CONCEPT / DEMO':['Operations Knowledge Loop · CONCEPT / DEMO','運用ナレッジループ · CONCEPT / DEMO','운영 지식 순환 · CONCEPT / DEMO'],
    '讓每次處理經驗，':['Turn every response','すべての対応経験を、','모든 처리 경험을'],
    '成為下一次判斷依據。':['into context for the next decision.','次の判断材料へ。','다음 판단의 근거로 만듭니다.'],
    '把事件、建議、核准與結果整理成可追溯的營運知識。':['Organize incidents, recommendations, approvals, and outcomes into traceable operations knowledge.','イベント、提案、承認、結果を追跡可能な運用知識として整理します。','이벤트, 제안, 승인, 결과를 추적 가능한 운영 지식으로 정리합니다.'],
    '播放事件旅程':['Play Event Journey','イベントジャーニーを再生','이벤트 여정 재생'],
    '暫停自動播放':['Pause autoplay','自動再生を一時停止','자동 재생 일시정지'],
    '繼續自動播放':['Resume autoplay','自動再生を再開','자동 재생 계속'],
    '重播':['Replay','リプレイ','다시 재생'], '模擬核准':['Simulate Approval','承認をシミュレート','승인 시뮬레이션'],
    '讓模型、規則與人，各自負責適合的決定。':['Let models, rules, and people make the decisions each is suited for.','モデル、ルール、人が、それぞれ適した判断を担います。','모델, 규칙, 사람이 각자 적합한 결정을 담당합니다.'],
    '讓模型、規則與人，':['Let models, rules, and people','モデル、ルール、人が、','모델, 규칙, 사람이'],
    '各自負責適合的決定。':['make the decisions each is suited for.','それぞれ適した判断を担います。','각자 적합한 결정을 담당합니다.'],
    '讓事件處理從告警回應，':['Move incident handling beyond alert response,','イベント処理をアラート対応から、','이벤트 처리를 알림 대응에서'],
    '進化為可控的 AI 協作。':['toward controlled AI collaboration.','制御可能な AI 協働へ。','통제 가능한 AI 협업으로 발전시킵니다.'],
    '此段為未來產品架構概念，並不代表已在正式環境部署。Gateway 在隔離區保存原始映射；模型只接收代碼化的必要營運脈絡。分類模型整理事件、本機 AI 處理代碼化脈絡、推理模型提出檢查建議，規則引擎限制允許範圍，最後停在 MIS 人工核准。':['This is a future product architecture concept, not a production deployment. The Gateway keeps original mappings in an isolated zone; models receive only coded operational context. Classification organizes events, local AI processes coded context, reasoning proposes checks, the rule engine limits scope, and the flow stops for MIS approval.','これは将来の製品アーキテクチャ構想であり、本番環境への導入を示すものではありません。Gateway は隔離領域に元の対応表を保持し、モデルはコード化された必要最小限の運用情報のみを受け取ります。分類、本機 AI、推論、ルールエンジンを経て、最後は MIS の承認で停止します。','이는 향후 제품 아키텍처 개념이며 운영 환경에 배포되었다는 의미가 아닙니다. Gateway는 격리 영역에 원본 매핑을 보관하고 모델은 코드화된 필수 운영 맥락만 받습니다. 분류, 로컬 AI, 추론, 규칙 엔진을 거쳐 마지막에는 MIS 승인에서 멈춥니다.'],
    '播放':['Play','再生','재생'], '暫停':['Pause','一時停止','일시정지'], '文字說明 ↗':['Text explanation ↗','テキスト説明 ↗','텍스트 설명 ↗'],
    '六種能力，一套共同控制面。':['Six capabilities. One shared control plane.','6つの能力、1つの共通制御面。','여섯 가지 역량, 하나의 공통 제어면.'],
    '從事件匯整、可觀測性、資安脈絡到受控自動化，讓資料、模型、政策與人以同一套語言協作。':['From event aggregation and observability to security context and controlled automation, data, models, policy, and people collaborate through one shared language.','イベント集約、可観測性、セキュリティ文脈、制御可能な自動化まで、データ、モデル、ポリシー、人が共通言語で連携します。','이벤트 집계, 관측 가능성, 보안 맥락, 통제 자동화까지 데이터, 모델, 정책, 사람이 하나의 언어로 협업합니다.'],
    '智慧營運指揮':['Intelligent Operations Command','インテリジェント運用指揮','지능형 운영 지휘'],
    '把監控訊號、AI 建議與人工決定收斂到同一視野。':['Unify monitoring signals, AI recommendations, and human decisions in one view.','監視シグナル、AI 提案、人の判断を一つのビューに集約します。','모니터링 신호, AI 제안, 사람의 결정을 하나의 화면에 모읍니다.'],
    '可觀測性':['Observability','可観測性','관측 가능성'], '建立服務、主機、網路與事件之間的關聯視圖。':['Build relational views across services, hosts, networks, and incidents.','サービス、ホスト、ネットワーク、イベント間の関係を可視化します。','서비스, 호스트, 네트워크, 이벤트 간 관계를 시각화합니다.'],
    '資安韌性':['Cyber Resilience','サイバーレジリエンス','사이버 복원력'], '讓安全事件回到身分、端點與服務脈絡中判讀。':['Interpret security events in the context of identities, endpoints, and services.','セキュリティイベントを ID、エンドポイント、サービスの文脈で判断します。','보안 이벤트를 ID, 엔드포인트, 서비스 맥락에서 판단합니다.'],
    '可控自動化':['Controlled Automation','制御可能な自動化','통제 가능한 자동화'], '低風險步驟可編排，高風險動作必須停在人工閘門。':['Orchestrate low-risk steps while high-risk actions stop at the human gate.','低リスク手順は編成し、高リスク操作は人の承認ゲートで停止します。','저위험 단계는 구성하고 고위험 동작은 사람 승인 게이트에서 멈춥니다.'],
    '混合基礎設施':['Hybrid Infrastructure','ハイブリッド基盤','하이브리드 인프라'], '從核心機房、雲端到據點，維持一致的營運語言。':['Maintain one operations language across core sites, cloud, and remote locations.','中核拠点、クラウド、遠隔拠点で一貫した運用言語を維持します。','핵심 시설, 클라우드, 원격 지점 전반에 일관된 운영 언어를 유지합니다.'],
    '營運洞察':['Operations Insights','運用インサイト','운영 인사이트'], '把事件、判斷與結果留下，形成下一次決策的知識。':['Retain incidents, decisions, and outcomes as knowledge for the next decision.','イベント、判断、結果を次の意思決定の知識として残します。','이벤트, 판단, 결과를 다음 의사결정의 지식으로 남깁니다.'],
    'AI 可以協助調查，':['AI can assist investigations,','AI は調査を支援できますが、','AI는 조사를 지원할 수 있지만,'], '不能跳過責任邊界。':['but cannot bypass accountability.','責任の境界を越えることはできません。','책임의 경계를 건너뛸 수 없습니다.'],
    '查詢限制於核准範圍與筆數。':['Queries are limited to approved scope and volume.','クエリは承認範囲と件数に制限されます。','조회는 승인된 범위와 건수로 제한됩니다.'],
    '送入模型前先遮蔽帳號與位址。':['Accounts and addresses are masked before model access.','モデルへ送る前にアカウントとアドレスをマスクします。','모델에 전달하기 전에 계정과 주소를 마스킹합니다.'],
    '高風險處置由 MIS 做最後決定。':['MIS makes the final decision on high-risk responses.','高リスク対応は MIS が最終判断します。','고위험 조치는 MIS가 최종 결정합니다.'],
    '目標、原因、核准與結果都有紀錄。':['Targets, reasons, approvals, and outcomes are recorded.','対象、理由、承認、結果を記録します。','대상, 이유, 승인, 결과를 기록합니다.'],
    '目前階段：離線驗證／應用規劃／唯讀':['Current stage: Offline validation / Application planning / Read only','現在の段階：オフライン検証／活用計画／読み取り専用','현재 단계: 오프라인 검증 / 활용 계획 / 읽기 전용'],
    '讓 AI 進入不同產業，':['Bring AI into diverse industries,','AI をさまざまな業界へ、','AI를 다양한 산업에 적용하면서,'], '同時保留人的判斷。':['while preserving human judgment.','人の判断を守りながら。','사람의 판단을 유지합니다.'],
    'Elias Net 將共同的維運方法套用到不同營運情境：先觀察、再理解、保護資料、提出建議，最後由負責人員確認。':['Elias Net applies a shared operations method across industries: observe, understand, protect data, recommend, and let accountable people confirm.','Elias Net は共通の運用手法をさまざまな現場へ適用します。観察し、理解し、データを守り、提案し、最後は責任者が確認します。','Elias Net은 공통 운영 방식을 다양한 환경에 적용합니다. 관찰하고, 이해하고, 데이터를 보호하고, 제안한 뒤 최종적으로 담당자가 확인합니다.'],
    '智慧製造':['Smart Manufacturing','スマート製造','스마트 제조'], '資料中心':['Data Centers','データセンター','데이터센터'], '醫療營運':['Healthcare Operations','医療運用','의료 운영'], '物流與據點':['Logistics & Sites','物流と拠点','물류 및 지점'], '企業 IT':['Enterprise IT','エンタープライズ IT','기업 IT'],
    '目前情境：跨產業受控維運概念。':['Current scenario: Cross-industry controlled operations concept.','現在のシナリオ：業界横断の制御型運用構想。','현재 시나리오: 산업 전반의 통제 운영 개념.'],
    '人工智慧與資料科學':['Artificial Intelligence and Data Science','人工知能とデータサイエンス','인공지능과 데이터 과학'],
    'AI 的價值不只在於更快運算，而是協助人們從複雜資料中找出線索、比較選項並改善日常工作。以下十種用途是教育性概念，不代表 Elias Net 已提供相關產業產品。':['AI is valuable not only for faster computation, but for helping people find clues in complex data, compare options, and improve daily work. These ten educational examples do not imply that Elias Net offers products in these industries.','AI の価値は計算速度だけではなく、複雑なデータから手掛かりを見つけ、選択肢を比較し、日々の仕事を改善することにあります。以下の10例は教育的な構想であり、Elias Net が各業界向け製品を提供していることを示しません。','AI의 가치는 빠른 연산뿐 아니라 복잡한 데이터에서 단서를 찾고, 선택지를 비교하며, 일상 업무를 개선하도록 돕는 데 있습니다. 다음 10가지 예시는 교육 목적이며 Elias Net이 해당 산업 제품을 제공한다는 의미가 아닙니다.'],
    '健康與照護':['Health & Care','健康とケア','건강 및 돌봄'], '協助整理醫療資訊':['Help organize medical information','医療情報の整理を支援','의료 정보 정리 지원'],
    '科學探索':['Scientific Discovery','科学的探究','과학 탐구'], '加速比較研究假設':['Compare research hypotheses faster','研究仮説の比較を加速','연구 가설 비교 가속'],
    '教育學習':['Education','教育と学習','교육 및 학습'], '提供適性的學習協助':['Support adaptive learning','適応的な学習を支援','맞춤형 학습 지원'],
    '無障礙科技':['Accessibility','アクセシビリティ技術','접근성 기술'], '降低溝通與操作門檻':['Lower communication and interaction barriers','コミュニケーションと操作の障壁を下げる','소통과 조작 장벽 낮추기'],
    '氣候與能源':['Climate & Energy','気候とエネルギー','기후 및 에너지'], '理解環境變化與用能':['Understand environmental change and energy use','環境変化とエネルギー利用を理解','환경 변화와 에너지 사용 이해'],
    '永續農業':['Sustainable Agriculture','持続可能な農業','지속가능한 농업'], '更精準地使用資源':['Use resources more precisely','資源をより正確に活用','자원을 더 정밀하게 활용'],
    '災害應變':['Disaster Response','災害対応','재난 대응'], '協助整理快速變動資訊':['Organize rapidly changing information','急速に変化する情報を整理','빠르게 변하는 정보 정리'],
    '公共基礎設施':['Public Infrastructure','公共インフラ','공공 인프라'], '提早發現維護需求':['Identify maintenance needs earlier','保守ニーズを早期発見','유지보수 필요 조기 발견'],
    '創意協作':['Creative Collaboration','クリエイティブ協働','창의적 협업'], '擴展表達與原型速度':['Expand expression and prototyping speed','表現と試作を加速','표현과 프로토타이핑 가속'],
    '工作與決策':['Work & Decisions','仕事と意思決定','업무 및 의사결정'], '讓資訊更容易理解':['Make information easier to understand','情報をより理解しやすく','정보를 더 쉽게 이해'],
    '共同原則：':['Shared principles:','共通原則：','공통 원칙:'], '資料品質、隱私、安全、可解釋性與人工責任缺一不可。':['Data quality, privacy, security, explainability, and human accountability are all essential.','データ品質、プライバシー、安全性、説明可能性、人の責任はすべて不可欠です。','데이터 품질, 개인정보 보호, 보안, 설명 가능성, 사람의 책임은 모두 필수입니다.'],
    '攜手建立可被信任的 AI 營運生態。':['Building a trustworthy AI operations ecosystem together.','信頼できる AI 運用エコシステムを共に。','신뢰할 수 있는 AI 운영 생태계를 함께 만듭니다.'],
    '以下品牌皆為本網站世界觀中的虛構展示，不代表真實合作、客戶或認證。':['All brands below are fictional parts of this site concept and do not represent real partners, customers, or certifications.','以下のブランドは本サイトの世界観における架空の表現であり、実在の提携、顧客、認証を示しません。','아래 브랜드는 모두 이 사이트 세계관의 가상 표현이며 실제 협력사, 고객 또는 인증을 의미하지 않습니다.'],
    '觀點、活動與技術現場。':['Perspectives, events, and technical field notes.','視点、イベント、技術の現場。','관점, 이벤트, 기술 현장.'], '以下內容為 v4 體驗原型的虛構示例。':['The following is fictional content for the v4 experience prototype.','以下は v4 体験プロトタイプの架空コンテンツです。','다음 내용은 v4 경험 프로토타입의 가상 예시입니다.'],
    '多模型協同不是模型大會議：如何設計清楚的任務邊界':['Multi-model orchestration is not a model meeting: designing clear task boundaries','マルチモデル連携はモデル会議ではない：明確な役割境界の設計','다중 모델 협업은 모델 회의가 아닙니다: 명확한 업무 경계 설계'],
    '為什麼「停止」也是自動化能力的一部分':['Why stopping is also an automation capability','なぜ「停止」も自動化能力なのか','왜 ‘중지’도 자동화 역량의 일부인가'],
    '營運世界模型：把關聯帶回事件判讀':['Operations world model: returning relationships to incident interpretation','運用ワールドモデル：関係性をイベント判断へ','운영 월드 모델: 이벤트 판단에 관계성 더하기'],
    '規劃應用前，先確認四道安全界線':['Confirm four safety boundaries before planning an application','活用計画の前に4つの安全境界を確認','활용 계획 전에 네 가지 안전 경계 확인'],
    '閱讀概念摘要 →':['Read concept summary →','構想概要を読む →','개념 요약 읽기 →'], '查看活動概念 →':['View event concept →','イベント構想を見る →','이벤트 개념 보기 →'], '查看檢核摘要 →':['View checklist summary →','チェック概要を見る →','점검 요약 보기 →'],
    '讓 AI 成為可靠協作者，':['Make AI a reliable collaborator,','AI を信頼できる協働者に、','AI를 신뢰할 수 있는 협업자로 만들고,'], '讓人保有最後決定。':['while people retain the final decision.','最後の判断は人の手に。','최종 결정은 사람이 유지합니다.'],
    'Elias Net 是本網站建立的原創概念公司，專注於 AI 智慧維運、資料理解與受控自動化。團隊希望協助 MIS 整理訊號、理解影響並提出下一步建議，讓人工判斷擁有更完整脈絡。':['Elias Net is an original concept company created for this site, focused on AI operations, data understanding, and controlled automation. It helps MIS teams organize signals, understand impact, and consider next steps with richer context for human judgment.','Elias Net は本サイトのために創作されたコンセプト企業で、AI 運用、データ理解、制御可能な自動化に注力します。MIS がシグナルを整理し、影響を理解し、次の手順を検討できるよう支援し、人の判断に十分な文脈を提供します。','Elias Net은 이 사이트를 위해 만든 가상 개념 기업으로 AI 운영, 데이터 이해, 통제 자동화에 집중합니다. MIS가 신호를 정리하고 영향을 이해하며 다음 단계를 검토하도록 도와 사람의 판단에 충분한 맥락을 제공합니다.'],
    '目前展示皆為本機模擬，不連接生產設備、不執行 Restart、SSH、Shell、帳號或 Firewall Action。':['All demonstrations are local simulations. They do not connect to production equipment or execute Restart, SSH, Shell, account, or Firewall actions.','すべてローカルシミュレーションであり、本番機器への接続や Restart、SSH、Shell、アカウント、Firewall 操作は行いません。','모든 시연은 로컬 시뮬레이션이며 운영 장비에 연결하거나 Restart, SSH, Shell, 계정, Firewall 작업을 실행하지 않습니다.'],
    '閱讀 Elias Net 故事':['Read the Elias Net story','Elias Net の物語を読む','Elias Net 이야기 읽기'],
    '從維運現場出發，走向人本 AI。':['From operations reality toward human-centered AI.','運用現場から、人を中心とした AI へ。','운영 현장에서 사람 중심 AI로.'],
    '以下七段是 Elias Net 的品牌故事草案，用來說明我們希望建立的企業文化與產品原則，不代表已完成的商業里程碑。':['These seven chapters are draft brand stories describing the culture and product principles Elias Net aims to build; they do not represent completed business milestones.','以下の7章は、Elias Net が目指す企業文化と製品原則を示すブランドストーリー案であり、達成済みの事業マイルストーンではありません。','다음 일곱 장은 Elias Net이 지향하는 기업 문화와 제품 원칙을 설명하는 브랜드 스토리 초안이며 완료된 사업 성과를 의미하지 않습니다.'],
    '從看不完的告警開始':['It began with endless alerts','終わりのないアラートから始まった','끝없는 알림에서 시작'], 'AI 協助，人負責決定':['AI assists. People decide.','AI が支援し、人が決める','AI는 돕고 사람은 결정'], '讓複雜技術更容易被理解':['Make complex technology easier to understand','複雑な技術を分かりやすく','복잡한 기술을 더 이해하기 쉽게'], '先建立界線，再談自動化':['Set boundaries before automation','自動化の前に境界を定める','자동화 전에 경계부터 설정'], '從小範圍規劃應用':['Plan applications from a limited scope','小さな範囲から活用を計画','작은 범위에서 활용 계획'], '讓經驗成為團隊資產':['Turn experience into team knowledge','経験をチームの資産に','경험을 팀의 자산으로'], '攜手守護人本 AI 時代':['Safeguarding a human-centered AI era together','人を中心とした AI 時代を共に守る','사람 중심 AI 시대를 함께 지키기'],
    '公司資訊':['Company Information','企業情報','기업 정보'], '最新消息及活動':['News & Events','最新情報とイベント','최신 소식 및 이벤트'], '熱門連結':['Popular Links','人気のリンク','인기 링크'],
    '關於 Elias Net':['About Elias Net','Elias Net について','Elias Net 소개'], '企業故事':['Company Stories','企業ストーリー','기업 이야기'], '人本 AI 原則':['Human-Centered AI Principles','人中心 AI の原則','사람 중심 AI 원칙'], '安全與治理':['Security & Governance','セキュリティとガバナンス','보안 및 거버넌스'], '技術研究':['Technology Research','技術研究','기술 연구'], '合作生態構想':['Ecosystem Concept','協働エコシステム構想','협력 생태계 구상'], '應用規劃':['Application Planning','活用計画','활용 계획'], '品牌概念':['Brand Concept','ブランドコンセプト','브랜드 개념'],
    'Elias Net 新聞中心':['Elias Net Newsroom','Elias Net ニュースルーム','Elias Net 뉴스룸'], '公司技術部落格':['Technology Blog','技術ブログ','기술 블로그'], '事件旅程展示':['Event Journey Demo','イベントジャーニー・デモ','이벤트 여정 데모'], '未來架構專題':['Future Architecture','将来アーキテクチャ','미래 아키텍처'], '人工智慧與資料科學':['Artificial Intelligence & Data Science','人工知能とデータサイエンス','인공지능과 데이터 과학'], '產業應用觀點':['Industry Perspectives','業界活用の視点','산업 활용 관점'], '概念活動行事曆':['Concept Event Calendar','コンセプトイベントカレンダー','개념 이벤트 일정'],
    '智慧維運平台':['Intelligent Operations Platform','インテリジェント運用基盤','지능형 운영 플랫폼'], '六項產品能力':['Six Product Capabilities','6つの製品能力','여섯 가지 제품 역량'], '唯讀事件查詢':['Read-only Event Query','読み取り専用イベント照会','읽기 전용 이벤트 조회'], '資料匿名化':['Data Anonymization','データ匿名化','데이터 익명화'], '人工核准閘門':['Human Approval Gate','人による承認ゲート','사람 승인 게이트'], '企業 AI 應用':['Enterprise AI Applications','企業 AI 活用','기업 AI 활용'], 'AI 十種人本用途':['Ten Human-Centered Uses of AI','AI の人中心な10の用途','AI의 사람 중심 활용 10가지'], 'Elias Net 發展方向':['Elias Net Direction','Elias Net の方向性','Elias Net 발전 방향'],
    '訂閱 Elias Net 最新消息':['Subscribe to Elias Net updates','Elias Net 最新情報を購読','Elias Net 최신 소식 구독'], '訂閱':['Subscribe','購読','구독'], '關注 ELIAS NET':['Follow ELIAS NET','ELIAS NET をフォロー','ELIAS NET 팔로우'],
    '隱私與資料界線':['Privacy & Data Boundaries','プライバシーとデータ境界','개인정보 및 데이터 경계'], '服務與應用規劃原則':['Service & Application Planning Principles','サービスと活用計画の原則','서비스 및 활용 계획 원칙'], '輔助使用':['Accessibility','アクセシビリティ','접근성'], '公司政策':['Company Policies','企業ポリシー','회사 정책'],
    '關閉影片概念視窗':['Close video concept dialog','動画コンセプトを閉じる','영상 개념 창 닫기'], '多模型協同維運':['Multi-model Operations Orchestration','マルチモデル運用連携','다중 모델 운영 협업'], '目前狀態':['Current Status','現在の状態','현재 상태'], '正式連結':['Official Link','正式リンク','공식 링크'], '等待自有 YouTube 網址':['Awaiting an owned YouTube URL','自社 YouTube URL を準備中','자체 YouTube URL 준비 중'],
    '關閉應用規劃說明':['Close application planning information','活用計画の説明を閉じる','활용 계획 설명 닫기'], '從唯讀情境開始規劃應用。':['Plan an application from a read-only scenario.','読み取り専用シナリオから活用を計画。','읽기 전용 시나리오에서 활용을 계획합니다.'], '此入口只提供應用規劃說明，不會送出表單或建立案件。建議先選一個虛構告警情境，確認資料範圍、遮蔽規則、人工核准點與驗收方式。':['This entry provides application planning information only. It does not submit forms or create cases. Start with one fictional alert scenario and define data scope, masking rules, human approval points, and acceptance criteria.','この入口は活用計画の説明のみを提供し、フォーム送信や案件作成は行いません。架空のアラートシナリオを一つ選び、データ範囲、マスキング規則、人による承認点、受入条件を確認してください。','이 메뉴는 활용 계획 안내만 제공하며 양식을 전송하거나 사례를 생성하지 않습니다. 가상 알림 시나리오 하나를 선택해 데이터 범위, 마스킹 규칙, 사람 승인 지점 및 승인 기준을 확인하세요.'],
    '定義唯讀資料範圍':['Define read-only data scope','読み取り専用データ範囲を定義','읽기 전용 데이터 범위 정의'], '建立代碼化與安全界線':['Establish coding and safety boundaries','コード化と安全境界を設定','코드화 및 안전 경계 설정'], '離線驗證 AI 判讀':['Validate AI interpretation offline','AI 判断をオフライン検証','AI 판단 오프라인 검증'], '由 MIS 人工確認結果':['Have MIS confirm the result','MIS が結果を確認','MIS가 결과 확인']
  };

  Object.assign(table, {
    '選單':['Menu','メニュー','메뉴'], 'AI 用途':['AI Uses','AI の活用','AI 활용'], '技術資源':['Technology','技術リソース','기술 자료'], '公司':['Company','企業','회사'],
    '觀看多模型協作概念影片':['Watch Multi-model Concept Video','マルチモデル連携のコンセプト動画を見る','다중 모델 협업 개념 영상 보기'],
    '已依減少動態設定停用':['Disabled by reduced-motion preference','モーション低減設定により停止','동작 줄이기 설정으로 중지'],
    '減少動態：手動切換':['Reduced motion: manual controls','モーション低減：手動切替','동작 줄이기: 수동 전환'],
    '切換主要內容為淺色模式':['Switch main content to light mode','メインコンテンツをライトモードへ','주요 콘텐츠를 라이트 모드로 전환'],
    '切換主要內容為深色模式':['Switch main content to dark mode','メインコンテンツをダークモードへ','주요 콘텐츠를 다크 모드로 전환'],
    'Gate：LOCKED · MIS 決定':['Gate: LOCKED · MIS DECIDES','Gate：LOCKED · MIS が決定','Gate: LOCKED · MIS 결정'],
    'AI 營運指揮':['AI Operations Command','AI 運用指揮','AI 운영 지휘'], '營運世界模型':['Operations World Model','運用ワールドモデル','운영 월드 모델'], '觀看事件旅程':['View Event Journey','イベントジャーニーを見る','이벤트 여정 보기'], '安全與人工治理':['Security & Human Governance','セキュリティと人による統制','보안 및 사람 중심 거버넌스'], 'Blog 與活動':['Blog & Events','ブログとイベント','블로그 및 이벤트'],
    '代理式營運 · CONCEPT / DEMO':['Agentic Operations · CONCEPT / DEMO','エージェント型運用 · CONCEPT / DEMO','에이전트형 운영 · CONCEPT / DEMO'],
    'Elias Net Mission Control 將告警、資產關係、歷史事件與操作程序整理成單一任務脈絡。AI 可以提出調查路徑與建議，但所有高風險動作仍由人員核准。':['Elias Net Mission Control organizes alerts, asset relationships, incident history, and procedures into one mission context. AI can suggest investigation paths, but people approve every high-risk action.','Elias Net Mission Control はアラート、資産関係、履歴、手順を一つのミッション文脈に整理します。AI は調査経路を提案できますが、高リスク操作はすべて人が承認します。','Elias Net Mission Control은 알림, 자산 관계, 이벤트 이력, 절차를 하나의 임무 맥락으로 정리합니다. AI는 조사 경로를 제안하지만 모든 고위험 작업은 사람이 승인합니다.'],
    '多模型事件摘要':['Multi-model Incident Summary','マルチモデルイベント要約','다중 모델 이벤트 요약'], '任務時間軸':['Mission Timeline','ミッションタイムライン','임무 타임라인'], 'Runbook 建議':['Runbook Recommendations','Runbook 提案','Runbook 제안'], '人工核准':['Human Approval','人による承認','사람 승인'],
    '事件如何被安全處理':['How an event is handled safely','イベントを安全に処理する流れ','이벤트를 안전하게 처리하는 방법'], '確認並繼續展示':['Confirm and Continue Demo','確認してデモを続行','확인 후 데모 계속'],
    '接收本機模擬事件':['Receive Local Demo Event','ローカル模擬イベントを受信','로컬 데모 이벤트 수신'], '唯讀查詢政策':['Read-only Query Policy','読み取り専用クエリポリシー','읽기 전용 조회 정책'], '資料遮蔽與代碼化':['Mask and Code Data','データのマスキングとコード化','데이터 마스킹 및 코드화'], 'AI 協助判讀':['AI-assisted Interpretation','AI による判断支援','AI 판단 지원'], '動作政策檢查':['Action Policy Check','アクションポリシー確認','작업 정책 점검'], 'MIS 人工確認':['MIS Human Confirmation','MIS による確認','MIS 사람 확인'], '展示完成':['Demo Complete','デモ完了','데모 완료'],
    '事件':['Event','イベント','이벤트'], '唯讀':['Read Only','読み取り専用','읽기 전용'], '匿名化':['Anonymize','匿名化','익명화'], '政策':['Policy','ポリシー','정책'], '完成':['Complete','完了','완료'], '模擬事件':['Demo Event','模擬イベント','데모 이벤트'], '事件分類':['Event Classification','イベント分類','이벤트 분류'], '代碼化脈絡處理':['Coded Context Processing','コード化文脈処理','코드화 맥락 처리'], '產生檢查建議':['Generate Check Recommendations','確認提案を生成','점검 제안 생성'], '限制允許範圍':['Limit Allowed Scope','許可範囲を制限','허용 범위 제한'], '最後決定':['Final Decision','最終決定','최종 결정'],
    '收到本機模擬事件':['Local Demo Event Received','ローカル模擬イベントを受信','로컬 데모 이벤트 수신'], '唯讀查詢核准範圍':['Read-only Query in Approved Scope','承認範囲の読み取り専用クエリ','승인 범위 내 읽기 전용 조회'], '敏感欄位完成遮蔽與代碼化':['Sensitive Fields Masked and Coded','機密フィールドをマスク・コード化','민감 필드 마스킹 및 코드화 완료'], 'AI 產生輔助判讀':['AI Generates Assisted Interpretation','AI が判断支援を生成','AI가 보조 판단 생성'], '政策引擎限制建議範圍':['Policy Engine Limits Recommendation Scope','ポリシーエンジンが提案範囲を制限','정책 엔진이 제안 범위 제한'], '等待 MIS 人工確認':['Waiting for MIS Confirmation','MIS の確認待ち','MIS 확인 대기'], '事件處理展示完成':['Event Handling Demo Complete','イベント処理デモ完了','이벤트 처리 데모 완료'],
    'DEMO IDENTIFIERS · NOT REAL DATA。事件只存在於瀏覽器記憶體，不會送到任何服務。':['DEMO IDENTIFIERS · NOT REAL DATA. The event exists only in browser memory and is not sent to any service.','DEMO IDENTIFIERS · NOT REAL DATA。イベントはブラウザメモリ内にのみ存在し、外部サービスへ送信されません。','DEMO IDENTIFIERS · NOT REAL DATA. 이벤트는 브라우저 메모리에만 존재하며 어떤 서비스에도 전송되지 않습니다.'],
    '資料存取政策在查詢前檢查欄位、範圍與筆數；任何寫入要求都不會通過。':['Data access policy checks fields, scope, and volume before querying; no write request can pass.','データアクセスポリシーはクエリ前にフィールド、範囲、件数を確認し、書き込み要求は通しません。','데이터 접근 정책은 조회 전에 필드, 범위, 건수를 확인하며 쓰기 요청은 허용하지 않습니다.'],
    '原始對照只留在本機 Gateway 的受控映射區；AI 只接收代碼化的必要營運脈絡。':['Original mappings stay in the controlled local Gateway zone; AI receives only coded operational context.','元の対応表はローカル Gateway の制御領域にのみ保持され、AI はコード化された必要な運用文脈だけを受け取ります。','원본 매핑은 로컬 Gateway의 통제 영역에만 남고 AI는 코드화된 필수 운영 맥락만 받습니다.'],
    'AI 整理證據、提出可能原因與檢查方向；推測不是已確認事實，也不是執行命令。':['AI organizes evidence and suggests possible causes and checks; a hypothesis is neither a confirmed fact nor an execution command.','AI は証拠を整理し、原因候補と確認方向を提案します。推測は確認済みの事実でも実行命令でもありません。','AI는 근거를 정리하고 가능한 원인과 점검 방향을 제안합니다. 추정은 확인된 사실이나 실행 명령이 아닙니다.'],
    '即使 AI 提出動作，也不代表它具有執行權。會改變系統狀態的操作一律阻擋。':['An AI suggestion does not grant execution authority. Operations that change system state are blocked.','AI の提案は実行権限を意味しません。システム状態を変える操作はすべて遮断されます。','AI 제안이 실행 권한을 의미하지 않습니다. 시스템 상태를 바꾸는 작업은 모두 차단됩니다.'],
    '流程已在人工閘門暫停。確認只會繼續展示，不會授權網站操作設備。':['The flow is paused at the human gate. Confirmation continues the demo only and does not authorize device operations.','フローは人の承認ゲートで停止中です。確認してもデモが続くだけで、機器操作は許可されません。','흐름은 사람 승인 게이트에서 멈춰 있습니다. 확인은 데모만 계속하며 장비 작업 권한을 부여하지 않습니다.'],
    '完成的是事件處理示範，不是實際排除或設備恢復。':['This completes an event-handling demonstration, not real remediation or device recovery.','完了するのはイベント処理デモであり、実際の復旧や機器回復ではありません。','완료되는 것은 이벤트 처리 데모이며 실제 조치나 장비 복구가 아닙니다.'],
    '六個能力領域，組成一套受控營運網格。':['Six capability domains form one controlled operations grid.','6つの能力領域で一つの制御された運用グリッドを構成します。','여섯 역량 영역이 하나의 통제 운영 그리드를 구성합니다.'], '從看見異常到留下決策紀錄，每一層都有清楚責任與安全界線。':['From detecting anomalies to recording decisions, every layer has clear accountability and safety boundaries.','異常の検知から判断記録まで、各層に明確な責任と安全境界があります。','이상 징후 발견부터 의사결정 기록까지 모든 계층에 명확한 책임과 안전 경계가 있습니다.'],
    '把告警、資產關係與處理程序組成一條可理解的任務線。':['Turn alerts, asset relationships, and procedures into one understandable mission path.','アラート、資産関係、手順を理解しやすいミッション経路にまとめます。','알림, 자산 관계, 처리 절차를 이해하기 쉬운 임무 흐름으로 구성합니다.'], '將主機、網路、服務與依賴關係映射成連續視野。':['Map hosts, networks, services, and dependencies into a continuous view.','ホスト、ネットワーク、サービス、依存関係を連続したビューに可視化します。','호스트, 네트워크, 서비스, 종속 관계를 연속된 시야로 표현합니다.'],
    '探索 Mission Control →':['Explore Mission Control →','Mission Control を探索 →','Mission Control 살펴보기 →'], '查看可觀測場景 →':['View Observability Scene →','可観測性シーンを見る →','관측 가능성 장면 보기 →'], '查看治理邊界 →':['View Governance Boundaries →','統制境界を見る →','거버넌스 경계 보기 →'], '了解 Human Gate →':['Learn about Human Gate →','Human Gate を知る →','Human Gate 알아보기 →'], '探索 Infrastructure Fabric →':['Explore Infrastructure Fabric →','Infrastructure Fabric を探索 →','Infrastructure Fabric 살펴보기 →'], '閱讀 Insight Loop →':['Read Insight Loop →','Insight Loop を読む →','Insight Loop 읽기 →'],
    '將游標移到能力區域，或使用鍵盤 Tab，查看一次性的產品能力動畫。':['Hover over a capability or use the Tab key to play its one-time product animation.','能力領域にカーソルを合わせるか Tab キーを使用して、一度だけ再生される製品アニメーションを確認してください。','역량 영역에 마우스를 올리거나 Tab 키를 사용해 한 번 재생되는 제품 애니메이션을 확인하세요.'],
    'AI 可協助整理影像、紀錄與研究資料，讓專業人員更快找到需要注意的線索；診斷與治療仍由合格人員決定。':['AI can organize images, records, and research so professionals find relevant clues faster; qualified people still decide diagnosis and treatment.','AI は画像、記録、研究データを整理し、専門家が重要な手掛かりを早く見つけるのを支援します。診断と治療は有資格者が決定します。','AI는 영상, 기록, 연구 자료를 정리해 전문가가 중요한 단서를 더 빨리 찾도록 돕습니다. 진단과 치료는 자격을 갖춘 사람이 결정합니다.'],
    '資料科學能協助研究者比較大量結果、發現關聯與安排下一步實驗，但不取代驗證、同儕審查與科學判斷。':['Data science helps researchers compare results, find relationships, and plan experiments, but does not replace validation, peer review, or scientific judgment.','データサイエンスは結果比較、関係発見、実験計画を支援しますが、検証、査読、科学的判断に代わるものではありません。','데이터 과학은 결과 비교, 연관성 발견, 실험 계획을 돕지만 검증, 동료 평가, 과학적 판단을 대체하지 않습니다.'],
    'AI 可以依學習進度整理教材、提供練習與不同解釋方式；教師仍負責目標、脈絡與學生的整體成長。':['AI can organize materials and offer practice and alternative explanations; teachers remain responsible for goals, context, and learner development.','AI は進度に応じて教材、練習、別の説明を提供できますが、目標、文脈、学習者の成長は教師が担います。','AI는 진도에 맞춰 자료, 연습, 다양한 설명을 제공할 수 있지만 목표, 맥락, 학습자의 성장은 교사가 책임집니다.'],
    '語音、字幕、影像描述與輔助輸入可讓更多人取得資訊；設計時仍需邀請真實使用者參與測試。':['Speech, captions, image descriptions, and assistive input can broaden access; real users must still participate in testing.','音声、字幕、画像説明、補助入力は情報へのアクセスを広げます。設計時には実際の利用者によるテストが必要です。','음성, 자막, 이미지 설명, 보조 입력은 정보 접근성을 넓힙니다. 설계에는 실제 사용자의 테스트 참여가 필요합니다.'],
    '模型可協助分析天氣、能源需求與設備效率，支援規劃者比較方案；重要決策需結合在地資料與專家判讀。':['Models can analyze weather, energy demand, and equipment efficiency to compare options; important decisions need local data and expert judgment.','モデルは天候、需要、設備効率を分析して案の比較を支援します。重要な判断には地域データと専門家の判断が必要です。','모델은 날씨, 에너지 수요, 장비 효율을 분석해 대안 비교를 돕습니다. 중요한 결정에는 현지 데이터와 전문가 판단이 필요합니다.'],
    '感測資料能協助農業工作者掌握土壤、水分與作物趨勢，在人員確認後調整灌溉或巡檢安排。':['Sensor data helps agricultural teams understand soil, moisture, and crop trends, then adjust irrigation or inspections after human confirmation.','センサーデータで土壌、水分、作物傾向を把握し、人の確認後に灌漑や点検計画を調整できます。','센서 데이터로 토양, 수분, 작물 추세를 파악하고 사람의 확인 후 관개나 점검 일정을 조정할 수 있습니다.'],
    'AI 可彙整天候、道路與現場回報，幫助團隊建立共同情勢；資源調度與公共決策仍由負責單位執行。':['AI can combine weather, road, and field reports into shared awareness; responsible authorities still allocate resources and make public decisions.','AI は天候、道路、現場報告を統合できますが、資源配分と公共判断は責任ある機関が行います。','AI는 날씨, 도로, 현장 보고를 통합해 공동 상황 인식을 돕지만 자원 배분과 공공 결정은 담당 기관이 수행합니다.'],
    '從交通、水電到公共設備，資料分析能協助找出異常趨勢並排序巡檢工作，不代表自動接管設施。':['Across transport, utilities, and public equipment, analytics can identify trends and prioritize inspections; it does not mean autonomous control.','交通、公共設備の分析で異常傾向を見つけ、点検を優先できますが、施設の自動制御を意味しません。','교통, 유틸리티, 공공 장비 분석으로 이상 추세를 찾고 점검 우선순위를 정할 수 있지만 시설의 자동 통제를 의미하지 않습니다.'],
    'AI 可以協助發想、整理素材與快速建立草稿；方向、品味、授權與最後作品仍由創作者負責。':['AI can support ideation, organize materials, and create drafts; direction, taste, rights, and final work remain the creator’s responsibility.','AI は発想、素材整理、草稿作成を支援できますが、方向性、センス、権利、最終作品は制作者が責任を持ちます。','AI는 아이디어, 자료 정리, 초안 작성을 도울 수 있지만 방향, 취향, 권리, 최종 결과는 창작자가 책임집니다.'],
    'AI 能摘要文件、比較選項並提出待查事項，讓人把時間放在溝通與判斷；高影響決定必須保留人工覆核。':['AI can summarize documents, compare options, and surface open questions so people focus on communication and judgment; high-impact decisions require human review.','AI は文書要約、選択肢比較、確認事項の提示を行えます。人は対話と判断に集中し、影響の大きい決定は人が確認します。','AI는 문서 요약, 선택지 비교, 확인 사항 제시를 도와 사람이 소통과 판단에 집중하게 합니다. 영향이 큰 결정은 사람이 검토해야 합니다.'],
    '從事件分流、本機判讀到人工核准，拆解每一層真正該負責的工作。':['From event routing and local interpretation to human approval, define what each layer is truly responsible for.','イベント振り分け、本機判断、人の承認まで、各層の役割を明確にします。','이벤트 분류, 로컬 판단, 사람 승인까지 각 계층의 책임을 명확히 합니다.'], '線上展示受控 AI 維運流程與六大能力領域。':['An online demonstration of controlled AI operations and six capability domains.','制御された AI 運用フローと6つの能力領域をオンラインで紹介します。','통제된 AI 운영 흐름과 여섯 역량 영역을 온라인으로 보여줍니다.'], '從唯讀查詢、匿名化到核准閘門的安全設計。':['Safety design from read-only queries and anonymization to approval gates.','読み取り専用クエリ、匿名化、承認ゲートまでの安全設計。','읽기 전용 조회, 익명화, 승인 게이트까지의 안전 설계.'], '不再只看一排紅燈，而是理解服務如何互相影響。':['Move beyond rows of red lights to understand how services affect one another.','赤い警告の列だけでなく、サービス間の影響を理解します。','빨간 경고 목록을 넘어 서비스 간 영향을 이해합니다.'], '資料遮蔽、唯讀範圍、人工責任與回復方式都清楚後，才逐步擴大驗證。':['Expand validation only after masking, read-only scope, human accountability, and recovery paths are clear.','マスキング、読み取り範囲、人の責任、復元方法を明確にしてから検証を段階的に広げます。','마스킹, 읽기 전용 범위, 사람의 책임, 복구 방법을 명확히 한 뒤 검증을 단계적으로 확대합니다.'],
    '我們的故事從一個簡單問題出發：能否讓維運人員先看懂真正重要的訊號，再決定下一步？Elias Net 因此把可讀性與人工控制放在產品起點。':['Our story began with one question: can operators understand what truly matters before deciding what to do next? Elias Net therefore starts with clarity and human control.','私たちの物語は「運用担当者が重要なシグナルを理解してから次を決められるか」という問いから始まりました。Elias Net は可読性と人の制御を出発点にします。','우리의 이야기는 운영자가 중요한 신호를 먼저 이해한 후 다음 단계를 결정할 수 있는가라는 질문에서 시작했습니다. Elias Net은 명확성과 사람의 통제를 출발점으로 삼습니다.'],
    'Elias Net 不以取代 MIS 為目標。AI 整理脈絡與建議，規則限制允許範圍，高影響處置則停在清楚可見的 Human Gate。':['Elias Net does not aim to replace MIS. AI organizes context and recommendations, rules limit scope, and high-impact responses stop at a visible Human Gate.','Elias Net は MIS の代替を目指しません。AI が文脈と提案を整理し、ルールが範囲を制限し、高影響の対応は見える Human Gate で止まります。','Elias Net은 MIS를 대체하지 않습니다. AI는 맥락과 제안을 정리하고 규칙은 범위를 제한하며 영향이 큰 조치는 보이는 Human Gate에서 멈춥니다.'],
    '好的維運工具不應只服務少數專家。我們希望以清楚語言、可操作介面與無障礙設計，讓團隊更容易共享判斷依據。':['Good operations tools should not serve only a few experts. Clear language, usable interfaces, and accessible design help teams share decision context.','優れた運用ツールは一部の専門家だけのものではありません。明確な言葉、操作しやすい UI、アクセシブルな設計で判断根拠を共有しやすくします。','좋은 운영 도구는 소수 전문가만을 위한 것이 아닙니다. 명확한 언어, 사용 가능한 인터페이스, 접근성 설계로 판단 근거를 쉽게 공유합니다.'],
    '唯讀查詢、資料遮蔽、政策檢查與稽核紀錄不是附加功能，而是 Elias Net 構想中每一次 AI 協作的基本結構。':['Read-only queries, masking, policy checks, and audit records are not add-ons; they are the foundation of every AI collaboration in the Elias Net concept.','読み取り専用クエリ、マスキング、ポリシー確認、監査記録は追加機能ではなく、Elias Net のすべての AI 協働の基盤です。','읽기 전용 조회, 마스킹, 정책 점검, 감사 기록은 부가 기능이 아니라 Elias Net의 모든 AI 협업을 위한 기본 구조입니다.'],
    '我們主張先用虛構或匿名化資料離線測試，再逐步驗證唯讀情境；沒有清楚驗收與人工責任，就不擴大操作範圍。':['We begin with offline tests using fictional or anonymized data, then validate read-only scenarios. Scope does not expand without clear acceptance and human accountability.','架空または匿名データでオフライン検証を始め、読み取り専用シナリオを段階的に確認します。明確な受入条件と人の責任なしに範囲を広げません。','가상 또는 익명화 데이터로 오프라인 테스트를 시작하고 읽기 전용 시나리오를 단계적으로 검증합니다. 명확한 승인 기준과 사람의 책임 없이는 범위를 확대하지 않습니다.'],
    '事件處理不應隨著值班結束而消失。Elias Net 希望把判斷理由、核准與結果整理成可回顧的營運知識。':['Incident knowledge should not disappear after a shift. Elias Net organizes reasoning, approvals, and outcomes into reviewable operations knowledge.','イベント対応の知識は当番終了とともに消えるべきではありません。判断理由、承認、結果を振り返れる運用知識として整理します。','이벤트 처리 지식은 근무 종료와 함께 사라져서는 안 됩니다. 판단 근거, 승인, 결과를 검토 가능한 운영 지식으로 정리합니다.'],
    '未來的 AI 系統需要速度，也需要責任。Elias Net 將持續探索本機 AI、規則引擎與人工核准如何形成值得信任的協作方式。':['Future AI systems need both speed and accountability. Elias Net will continue exploring how local AI, rule engines, and human approval can form trustworthy collaboration.','将来の AI には速度と責任の両方が必要です。Elias Net は本機 AI、ルールエンジン、人の承認による信頼できる協働を探究します。','미래 AI 시스템에는 속도와 책임이 모두 필요합니다. Elias Net은 로컬 AI, 규칙 엔진, 사람 승인이 신뢰할 수 있는 협업을 만드는 방법을 계속 탐구합니다.'],
    'Operations Grid 發表':['Operations Grid Launch','Operations Grid 発表','Operations Grid 발표'],
    '此為未來產品架構概念，不代表已在正式環境部署。Classifier、Local AI、Reasoning 與 Rule Engine 分別處理分類、代碼化脈絡、檢查建議與政策範圍；流程最終停在人工核准閘門。':['This is a future architecture concept, not a production deployment. Classifier, Local AI, Reasoning, and Rule Engine handle classification, coded context, check recommendations, and policy scope; the flow ends at human approval.','これは将来の製品構想であり、本番導入を示しません。Classifier、Local AI、Reasoning、Rule Engine が分類、コード化文脈、確認提案、ポリシー範囲を担い、最後は人の承認で停止します。','이는 향후 제품 아키텍처 개념이며 운영 배포를 의미하지 않습니다. Classifier, Local AI, Reasoning, Rule Engine이 분류, 코드화 맥락, 점검 제안, 정책 범위를 담당하며 마지막에는 사람 승인에서 멈춥니다.']
  });
  ['健康與照護','科學探索','教育學習','無障礙科技','氣候與能源','永續農業','災害應變','公共基礎設施','創意協作','工作與決策'].forEach((label, index) => {
    const number = String(index + 1).padStart(2, '0');
    table[`${number} · ${label}`] = table[label].map((translation) => `${number} · ${translation}`);
  });

  const languageIndex = {en:0, ja:1, ko:2};
  const textRecords = new Map();
  const attributeRecords = new Map();
  let currentLanguage = 'zh-Hant';
  let applying = false;

  function translated(source, language) {
    if (language === 'zh-Hant') return source;
    if (table[source]) return table[source][languageIndex[language]];
    if (source.endsWith('。') && table[source.slice(0, -1)]) return `${translated(source.slice(0, -1), language)}${language === 'ja' ? '。' : '.'}`;
    const conceptSuffix = ' · CONCEPT / FUTURE ARCHITECTURE';
    if (source.endsWith(conceptSuffix) && table[source.slice(0, -conceptSuffix.length)]) return `${translated(source.slice(0, -conceptSuffix.length), language)}${conceptSuffix}`;
    let numbered = source.match(/^(\d{2}) · (.+)$/);
    if (numbered && table[numbered[2]]) return `${numbered[1]} · ${translated(numbered[2], language)}`;
    let match = source.match(/^顯示第 (\d+) 至 (\d+) 項，共 (\d+) 項$/);
    if (match) return language === 'en' ? `Showing items ${match[1]}–${match[2]} of ${match[3]}` : language === 'ja' ? `${match[3]}件中 ${match[1]}～${match[2]}件を表示` : `총 ${match[3]}개 중 ${match[1]}–${match[2]}개 표시`;
    match = source.match(/^顯示第 (\d+) 至 (\d+) 段，共 (\d+) 段$/);
    if (match) return language === 'en' ? `Showing stories ${match[1]}–${match[2]} of ${match[3]}` : language === 'ja' ? `${match[3]}章中 ${match[1]}～${match[2]}章を表示` : `총 ${match[3]}개 이야기 중 ${match[1]}–${match[2]}개 표시`;
    match = source.match(/^第 (\d+)／7 步：(.*)$/);
    if (match) return language === 'en' ? `Step ${match[1]} of 7: ${translated(match[2], language)}` : language === 'ja' ? `7ステップ中 ${match[1]}：${translated(match[2], language)}` : `7단계 중 ${match[1]}: ${translated(match[2], language)}`;
    match = source.match(/^步驟 (\d+)／6：(.*)$/);
    if (match) return language === 'en' ? `Step ${match[1]} of 6: ${translated(match[2], language)}` : language === 'ja' ? `6ステップ中 ${match[1]}：${translated(match[2], language)}` : `6단계 중 ${match[1]}: ${translated(match[2], language)}`;
    return source;
  }

  function canTranslate(value) {
    const numbered = value.match(/^\d{2} · (.+)$/);
    return Boolean(table[value] || (numbered && table[numbered[2]]) || /^顯示第 \d+ 至 \d+ (項|段)，共 \d+ (項|段)$/.test(value) || /^(第 \d+／7 步|步驟 \d+／6)：/.test(value));
  }

  function captureText(node) {
    const value = node.nodeValue || '';
    const trimmed = value.trim();
    if (!trimmed || !canTranslate(trimmed)) return;
    const leading = value.match(/^\s*/)[0];
    const trailing = value.match(/\s*$/)[0];
    textRecords.set(node, {source:trimmed, leading, trailing});
  }

  function captureAttributes(element) {
    if (!(element instanceof Element)) return;
    ['aria-label','title','placeholder','alt'].forEach((name) => {
      const value = element.getAttribute(name);
      if (!value || !canTranslate(value)) return;
      if (!attributeRecords.has(element)) attributeRecords.set(element, {});
      attributeRecords.get(element)[name] = value;
    });
  }

  function scan(root) {
    if (root.nodeType === Node.TEXT_NODE) captureText(root);
    if (root.nodeType === Node.ELEMENT_NODE) captureAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.TEXT_NODE) captureText(node); else captureAttributes(node);
    }
  }

  function applyRecords() {
    applying = true;
    textRecords.forEach((record, node) => {
      if (node.isConnected) {
        const nextValue = record.leading + translated(record.source, currentLanguage) + record.trailing;
        if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
      }
      else textRecords.delete(node);
    });
    attributeRecords.forEach((record, element) => {
      if (!element.isConnected) return attributeRecords.delete(element);
      Object.entries(record).forEach(([name, source]) => {
        const nextValue = translated(source, currentLanguage);
        if (element.getAttribute(name) !== nextValue) element.setAttribute(name, nextValue);
      });
    });
    document.documentElement.lang = currentLanguage;
    const titles = {en:'Elias Net | Human-Governed AI Operations',ja:'Elias Net｜人が統制する AI 運用',ko:'Elias Net | 사람 중심 AI 운영'};
    const nextTitle = currentLanguage === 'zh-Hant' ? 'Elias Net｜人本治理 AI 智慧維運' : titles[currentLanguage];
    if (document.title !== nextTitle) document.title = nextTitle;
    const descriptions = {
      en:'Elias Net is an original human-governed AI operations concept featuring read-only access, anonymization, AI-assisted interpretation, and human approval.',
      ja:'Elias Net は、読み取り専用アクセス、匿名化、AI による判断支援、人による承認を備えた、人が統制する AI 運用の独自コンセプトです。',
      ko:'Elias Net은 읽기 전용 접근, 익명화, AI 판단 지원, 사람 승인을 갖춘 사람 중심 AI 운영 개념입니다.'
    };
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      const nextDescription = currentLanguage === 'zh-Hant' ? 'Elias Net 原創人本治理 AI 智慧維運概念：唯讀查詢、匿名化、AI 輔助判讀與 MIS 人工核准。' : descriptions[currentLanguage];
      if (meta.content !== nextDescription) meta.content = nextDescription;
    }
    document.querySelectorAll('[data-language]').forEach((button) => {
      const nextPressed = String(button.dataset.language === currentLanguage);
      if (button.getAttribute('aria-pressed') !== nextPressed) button.setAttribute('aria-pressed', nextPressed);
    });
    applying = false;
  }

  function setLanguage(language, persist = true) {
    currentLanguage = languages.includes(language) ? language : 'zh-Hant';
    applyRecords();
    if (persist) localStorage.setItem(STORAGE_KEY, currentLanguage);
    window.dispatchEvent(new CustomEvent('elias-language-change', {detail:{language:currentLanguage}}));
  }

  scan(document.body);
  const observer = new MutationObserver((mutations) => {
    if (applying) return;
    let changed = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        const value = mutation.target.nodeValue.trim();
        if (canTranslate(value)) { captureText(mutation.target); changed = true; }
      } else if (mutation.type === 'attributes') {
        const value = mutation.target.getAttribute(mutation.attributeName);
        if (value && canTranslate(value)) { captureAttributes(mutation.target); changed = true; }
      } else {
        mutation.addedNodes.forEach((node) => { scan(node); changed = true; });
      }
    });
    if (changed && currentLanguage !== 'zh-Hant') applyRecords();
  });
  observer.observe(document.body, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['aria-label','title','placeholder','alt']});
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  setLanguage(localStorage.getItem(STORAGE_KEY) || 'zh-Hant', false);
})();
