import { simplify } from './simplified-map';
export type SiteLocale = 'zh-TW' | 'zh-CN' | 'en';
export type ProductStatusValue = '概念' | '研究中' | '原型' | '測試中' | '可展示' | '可部署';
export type Localized = { zh: string; en: string };
export const l = (value: Localized, locale: SiteLocale) => locale === 'en' ? value.en : locale === 'zh-CN' ? simplify(value.zh) : value.zh;

export interface ProductDefinition {
  slug: string;
  family: 'digital' | 'embodied';
  name: string;
  chineseName: string;
  status: ProductStatusValue;
  statusNote: Localized;
  headline: Localized;
  intro: Localized;
  audience: Localized[];
  problem: Localized;
  values: Localized[];
  capabilities: Localized[];
  scenario: Localized;
  collaboration: Localized;
  dataPermissions: Localized;
  safeguards: Localized[];
  limitations: Localized[];
  next: Localized;
  cta: Localized;
  media: {
    hero: { desktop: string; mobile: string; alt: Localized };
    secondary?: { desktop: string; mobile: string; alt: Localized };
  };
}

const L = (zh: string, en: string): Localized => ({ zh, en });

export const products: ProductDefinition[] = [
  {
    slug:'elias-knowledge', family:'digital', name:'Elias Knowledge', chineseName:'企業知識助理', status:'原型',
    media:{hero:{desktop:'images/v2/products/elias-knowledge-desktop.webp',mobile:'images/v2/products/elias-knowledge-mobile.webp',alt:L('員工使用 Elias Knowledge 搜尋核准文件並查看來源','An employee using Elias Knowledge to search approved documents and review sources')},secondary:{desktop:'images/v2/products/elias-knowledge-02.webp',mobile:'images/v2/products/elias-knowledge-02.webp',alt:L('團隊在會議中核對企業知識助理提供的引用與文件版本','A team reviewing citations and document versions provided by the enterprise knowledge assistant')}},
    statusNote:L('目前為可操作原型，正準備測試真實資料與使用體驗。','This is an interactive prototype preparing for real-data and user-experience testing.'),
    headline:L('讓公司的知識更容易找到。','Make company knowledge easier to find.'),
    intro:L('Elias Knowledge 幫團隊找到可靠資訊，並在回答旁標示來源。每個人都能回到原文確認，再繼續工作。','Elias Knowledge finds reliable information and shows the source beside each answer. Anyone can check the original before continuing.'),
    audience:[L('一般員工','Employees'),L('專案團隊','Project teams'),L('人資與法務','HR and legal'),L('內部服務台','Internal service desks')],
    problem:L('文件散落、版本不一，搜尋結果也常缺少可核對的來源。','Documents are scattered, versions differ and search results often lack verifiable sources.'),
    values:[L('更快掌握工作重點','Find the essentials faster'),L('答案附上可追溯來源','Keep sources traceable'),L('沿用既有文件權限','Retain document permissions')],
    capabilities:[L('搜尋核准的企業文件','Search approved enterprise documents'),L('整理相關段落','Organize relevant passages'),L('準備附來源的回答草稿','Prepare sourced answer drafts'),L('辨識文件版本','Identify document versions'),L('依角色限制結果','Restrict results by role')],
    scenario:L('員工詢問遠距工作設備補助。系統找到核准的人資政策、顯示版本與引用；員工開啟原文確認後，再完成申請。','An employee asks about remote-work equipment reimbursement. The system finds approved HR policies, shows versions and citations, and lets the employee verify the original before applying.'),
    collaboration:L('AI 搜尋、整理並準備回答；使用者判斷來源是否適用，專業人員保留正式解釋與決定。','AI searches, organizes and prepares an answer. Users judge whether the source applies, while qualified staff retain formal interpretation and decisions.'),
    dataPermissions:L('需要核准文件、版本資訊、文件擁有者、角色權限、索引更新規則與存取紀錄。','Requires approved documents, version metadata, ownership, role permissions, index update rules and access logs.'),
    safeguards:[L('來源白名單與權限繼承','Source allowlists and inherited permissions'),L('引用與版本清楚顯示','Visible citations and versions'),L('敏感資料遮蔽與查詢紀錄','Sensitive-data masking and query records')],
    limitations:[L('回答可能遺漏或誤解內容','Answers may omit or misunderstand information'),L('不取代法務、人資或專業意見','Does not replace legal, HR or professional advice'),L('不能繞過文件權限','Cannot bypass document permissions')],
    next:L('建立測試資料集、權限模型、來源更新與回答評估流程。','Build a test dataset, permission model, source update process and answer-evaluation workflow.'), cta:L('討論合作可能','Discuss collaboration possibilities')
  },
  {
    slug:'elias-care', family:'digital', name:'Elias Care', chineseName:'客服協作助理', status:'原型',
    media:{hero:{desktop:'images/v2/products/elias-care.webp',mobile:'images/v2/products/elias-care.webp',alt:L('客服團隊檢視 AI 準備的回覆與敏感內容提醒','A service team reviewing an AI-prepared response and sensitive-content notice')}},
    statusNote:L('目前為客服工作台原型，正準備測試服務流程與使用體驗。','This is a service-workbench prototype preparing for workflow and user-experience testing.'),
    headline:L('讓客服更快看懂每一次需求。','Help service teams understand every request faster.'),
    intro:L('Elias Care 整理客戶訊息、案件紀錄與服務規範，先準備回覆；退款、個資與重要承諾仍由客服確認。','Elias Care organizes messages, case history and service policies, then prepares a reply. Service teams still confirm refunds, personal data and important commitments.'),
    audience:[L('客服人員','Service agents'),L('客服主管','Service managers'),L('售後服務團隊','After-sales teams'),L('品質管理人員','Quality managers')],
    problem:L('訊息量大、歷史紀錄分散，敏感內容與交接重點容易被忽略。','Message volume is high, history is scattered, and sensitive content or handoff details can be missed.'),
    values:[L('更快理解案件','Understand cases faster'),L('維持回覆一致性','Improve response consistency'),L('重要判斷留給服務團隊','Keep important judgment with the service team')],
    capabilities:[L('整理客戶問題','Organize customer requests'),L('搜尋案件紀錄','Retrieve case history'),L('準備回覆草稿','Prepare response drafts'),L('提醒敏感內容','Flag sensitive content'),L('建立轉派摘要','Create handoff summaries')],
    scenario:L('客戶反映重複扣款。AI 整理訂單、對話與退款規範，提出草稿並標示需要人工確認的承諾；客服修改後送出。','A customer reports a duplicate charge. AI organizes the order, conversation and refund policy, drafts a response and marks commitments that require review. The agent edits and sends it.'),
    collaboration:L('AI 整理資料並準備文字；客服確認事實、語氣、退款與正式承諾。','AI organizes information and prepares language; the agent verifies facts, tone, refunds and formal commitments.'),
    dataPermissions:L('需要客戶訊息、案件紀錄、訂單唯讀資料、核准規範與敏感資料權限。','Requires customer messages, case history, read-only order data, approved policies and sensitive-data permissions.'),
    safeguards:[L('個資最小化','Data minimization'),L('敏感主題與承諾提示','Sensitive-topic and commitment flags'),L('修訂與送出紀錄','Revision and sending records')],
    limitations:[L('不自動解決所有客訴','Does not automatically resolve every complaint'),L('未經確認，不承諾賠償','Does not promise compensation without approval'),L('不取代客服人員','Does not replace service agents')],
    next:L('建立政策測試集、敏感內容規則、角色權限與人工回覆評測。','Build policy test sets, sensitive-content rules, role permissions and human response evaluation.'), cta:L('查看產品概念','View the product concept')
  },
  {
    slug:'elias-flow', family:'digital', name:'Elias Flow', chineseName:'流程協作助理', status:'原型',
    media:{hero:{desktop:'images/v2/products/elias-flow.webp',mobile:'images/v2/products/elias-flow.webp',alt:L('工作人員在同一畫面確認發票資料、審核與系統更新進度','A worker reviewing invoice data, approval and system-update progress in one view')},secondary:{desktop:'images/v2/products/elias-flow-02.webp',mobile:'images/v2/products/elias-flow-02.webp',alt:L('團隊共同檢視流程例外、處理進度與稽核紀錄','A team reviewing workflow exceptions, progress and audit records together')}},
    statusNote:L('目前為流程介面原型，正準備測試常見工作情境。','This is a workflow prototype preparing for common workplace scenarios.'),
    headline:L('讓重複工作順暢往前走。','Keep repetitive work moving smoothly.'),
    intro:L('Elias Flow 把 Email、表單與文件整理成清楚的待辦，提醒負責的人並追蹤進度。重要決定由人確認，完成後留下紀錄。','Elias Flow turns email, forms and documents into clear tasks, reminds the right people and tracks progress. People confirm important decisions, and completed work leaves a record.'),
    audience:[L('行政人員','Administration'),L('營運團隊','Operations'),L('採購與財務','Procurement and finance'),L('流程管理人員','Process managers')],
    problem:L('資料反覆抄寫、責任人不清、審核進度分散，例外也難以追蹤。','Data is repeatedly re-entered, ownership is unclear, approval status is scattered and exceptions are hard to track.'),
    values:[L('減少重複整理','Reduce repetitive organization'),L('讓責任與進度可見','Make ownership and progress visible'),L('保留核准與例外紀錄','Record approvals and exceptions')],
    capabilities:[L('擷取表單欄位','Extract form fields'),L('建立待辦事項','Create tasks'),L('通知負責人','Notify owners'),L('追蹤核准狀態','Track approvals'),L('準備跨系統更新','Prepare cross-system updates')],
    scenario:L('供應商發票進入信箱。AI 整理金額與編號、建立審核任務；財務確認後才準備更新系統並留下紀錄。','A supplier invoice arrives by email. AI organizes the amount and number and creates a review task. Only after finance approval does it prepare the system update and record.'),
    collaboration:L('AI 整理與追蹤；指定人員核對資料、處理例外並核准關鍵更新。','AI organizes and tracks. Designated people verify data, handle exceptions and approve critical updates.'),
    dataPermissions:L('需要表單與 Email、欄位規則、流程角色、核准層級、目標 API 與復原方式。','Requires forms and email, field rules, workflow roles, approval levels, destination APIs and recovery procedures.'),
    safeguards:[L('最小權限與執行前預覽','Least privilege and pre-execution preview'),L('確認步驟與例外清單','Review steps and exception lists'),L('失敗重試、復原與完整紀錄','Retry, recovery and complete records')],
    limitations:[L('未經授權，不會批准','Does not approve without authorization'),L('不自動執行高風險交易','Does not autonomously execute high-risk transactions'),L('不會完全取代人工管理','Does not eliminate human management')],
    next:L('選定單一低風險流程，驗證欄位、權限、例外與復原。','Select one low-risk workflow and validate fields, permissions, exceptions and recovery.'), cta:L('與我們交流','Talk with us')
  },
  {
    slug:'elias-ops', family:'digital', name:'Elias Ops', chineseName:'系統維運協作助理', status:'原型',
    media:{hero:{desktop:'images/v2/products/elias-ops.webp',mobile:'images/v2/products/elias-ops.webp',alt:L('維運人員檢視整併後的告警、時間線與處置建議','An operations specialist reviewing consolidated alerts, a timeline and response suggestions')},secondary:{desktop:'images/v2/products/elias-ops-02.webp',mobile:'images/v2/products/elias-ops-02.webp',alt:L('維運團隊確認服務影響與等待人員授權的下一步','An operations team reviewing service impact and the next step awaiting human authorization')}},
    statusNote:L('目前為維運介面原型，正準備測試告警整理與使用流程。','This is an operations prototype preparing for alert and workflow testing.'),
    headline:L('把複雜異常整理成清楚的下一步。','Turn complex incidents into a clear next step.'),
    intro:L('Elias Ops 整理分散的告警與處理紀錄，讓團隊看清影響。AI 準備建議，實際操作由工程師決定。','Elias Ops organizes scattered alerts and response history so teams can see the impact. AI prepares suggestions while engineers decide what action to take.'),
    audience:[L('IT 維運','IT operations'),L('維運與可靠性團隊','Operations and reliability teams'),L('系統管理員','System administrators'),L('營運管理人員','Operations managers')],
    problem:L('告警重複、訊號分散、影響難判斷，處理紀錄也不完整。','Alerts repeat, signals are scattered, impact is difficult to assess and response records are incomplete.'),
    values:[L('減少重複告警','Reduce duplicate alerts'),L('看清事件前後','See the incident clearly'),L('保留決定與操作紀錄','Keep decisions and actions traceable')],
    capabilities:[L('彙整告警與紀錄','Bring alerts and records together'),L('找出可能相關的異常','Find potentially related issues'),L('整理事件時間線','Build incident timelines'),L('說明可能影響','Explain possible impact'),L('提出檢查順序','Suggest a check sequence')],
    scenario:L('系統與網路服務出現多項告警。AI 合併重複事件、標示影響與相關證據；工程師決定觀察、轉派或申請操作授權。','Multiple alerts affect system and network services. AI groups duplicates and shows impact and related evidence; an engineer decides whether to observe, escalate or request action authorization.'),
    collaboration:L('AI 整理與建議；維運人員判斷根因、風險、優先順序與實際操作。','AI organizes and suggests. Operations staff decide root cause, risk, priority and actual action.'),
    dataPermissions:L('需要監控、日誌、事件單、系統關係、唯讀查詢，以及另行核准的操作權。','Requires monitoring, logs, incident tickets, system relationships, read-only queries and separately approved action rights.'),
    safeguards:[L('預設唯讀與操作分級','Read-only by default and tiered actions'),L('執行前預覽與人工授權','Pre-execution preview and human authorization'),L('緊急停止、復原與稽核','Emergency stop, recovery and audit trails')],
    limitations:[L('不自動修復所有問題','Does not automatically repair every problem'),L('未經授權，不會重啟或變更','Does not restart or change systems without authorization'),L('不保證系統永不中斷','Does not guarantee uninterrupted service')],
    next:L('以唯讀測試資料驗證事件關聯、告警去重、證據顯示與人工評估。','Use read-only test data to validate correlation, deduplication, evidence display and human assessment.'), cta:L('了解技術方向','Explore the technology direction')
  },
  {
    slug:'elias-home', family:'embodied', name:'Elias Home', chineseName:'居家人工智慧機器人概念', status:'概念',
    media:{hero:{desktop:'images/v2/products/elias-home-desktop.webp',mobile:'images/v2/products/elias-home-mobile.webp',alt:L('Elias Home 在明亮居家環境中協助高齡者處理日常用品','Elias Home assisting an older adult with an everyday item in a bright home')},secondary:{desktop:'images/v2/products/elias-home-02-desktop.webp',mobile:'images/v2/products/elias-home-02-mobile.webp',alt:L('Elias Home 與家庭成員在日常生活中自然協作','Elias Home working naturally alongside family members in daily life')}},
    statusNote:L('目前為概念設計，正聚焦安全移動與簡單物品遞送。','This concept currently focuses on safe movement and simple object delivery.'),
    headline:L('了解生活需要，讓協助自然出現。','Understand everyday needs and offer help naturally.'),
    intro:L('Elias Home 探索機器人如何在家中安全移動、遞送物品並協助日常小事。它陪伴生活，也尊重使用者、家人與照護者的選擇。','Elias Home explores how robots can move safely at home, deliver items and help with everyday tasks. It supports daily life while respecting the choices of users, families and caregivers.'),
    audience:[L('一般家庭','Households'),L('高齡者生活支持','Independent-living support'),L('行動不便者','People with mobility limitations'),L('共同生活家庭','Shared family living')],
    problem:L('日常小任務有時不方便，家庭協助也必須兼顧隱私與自主性。','Small daily tasks can be difficult, while assistance must respect privacy and autonomy.'),
    values:[L('在需要時提供協助','Assist when requested'),L('安全理解居家環境','Understand the home safely'),L('使用者保有拒絕與停止權','Users retain refusal and stop controls')],
    capabilities:[L('語音與自然互動研究','Natural interaction research'),L('居家環境理解','Home environment understanding'),L('安全移動','Safe navigation'),L('簡單物品遞送','Simple object delivery'),L('家庭設備協作','Smart-home coordination')],
    scenario:L('高齡使用者請機器人拿取桌上的日用品。系統確認目標與路徑、低速移動並遞送；使用者可隨時停止。','An older adult asks the robot to bring an everyday item from a table. The system confirms the object and path, moves slowly and hands it over; the user can stop it at any time.'),
    collaboration:L('人提出需求、設定空間與家庭權限；系統感知、確認、執行簡單動作並回報。','People request help and define household and spatial permissions. The system senses, confirms, performs a simple action and reports completion.'),
    dataPermissions:L('需要家庭成員同意、空間地圖、設備權限、任務歷史與可刪除偏好。','Requires household consent, spatial maps, device permissions, task history and deletable preferences.'),
    safeguards:[L('低速與力矩限制','Speed and force limits'),L('碰撞避免與實體急停','Collision avoidance and physical emergency stop'),L('感測器狀態與本地資料選項','Visible sensor status and local-data options')],
    limitations:[L('不提供醫療診斷','No medical diagnosis'),L('不取代照護者','Does not replace caregivers'),L('不處理所有家務或持續監控全家','Does not handle every task or continuously monitor everyone')],
    next:L('定義產品設計原則、尺寸與力矩邊界、家庭權限模型及單一物品遞送測試。','Define product design principles, size and force boundaries, a household permission model and a single object-delivery test.'), cta:L('了解研發方向','Explore the research direction')
  },
  {
    slug:'elias-rescue', family:'embodied', name:'Elias Rescue', chineseName:'救援人工智慧機器人概念', status:'概念',
    media:{hero:{desktop:'images/v2/products/elias-rescue-desktop.webp',mobile:'images/v2/products/elias-rescue-mobile.webp',alt:L('Elias Rescue 與專業搜救人員在日間災區共同工作','Elias Rescue working with professional responders at a daytime disaster site')},secondary:{desktop:'images/v2/products/elias-rescue-02-desktop.webp',mobile:'images/v2/products/elias-rescue-02-mobile.webp',alt:L('Elias Rescue 協助救援人員運送物資與撤離設備','Elias Rescue helping responders transport supplies and evacuation equipment')}},
    statusNote:L('目前為概念研究，正聚焦感測、遠端操作與安全測試。','This concept currently focuses on sensing, remote operation and safety testing.'),
    headline:L('先看見危險，讓救援更安心。','See danger earlier and make rescue safer.'),
    intro:L('Elias Rescue 探索機器人如何先進入危險區域，回傳現場資訊並運送物資。它與救援人員並肩工作，由專業團隊指揮每一次行動。','Elias Rescue explores how robots can enter dangerous areas first, report conditions and carry supplies. It works alongside responders, with every action directed by professionals.'),
    audience:[L('地震與倒塌救援','Earthquake and collapse response'),L('火災後與工業事故','Post-fire and industrial incidents'),L('有毒或缺氧環境','Toxic or oxygen-poor environments'),L('人道救援物流','Humanitarian logistics')],
    problem:L('人員難以安全進入，現場資訊不足，設備與物資運送也受限。','People may not be able to enter safely, field information is limited and equipment or supply transport is constrained.'),
    values:[L('先取得環境資訊','Gather environmental information first'),L('減少不必要的人員暴露','Reduce unnecessary human exposure'),L('支援而不取代現場指揮','Support rather than replace field command')],
    capabilities:[L('危險環境感測研究','Hazard sensing research'),L('搜尋與資訊回傳','Search and information relay'),L('物資運送','Supply transport'),L('救援路線協助','Route assistance'),L('遠端控制','Remote control')],
    scenario:L('在模擬倒塌場域中，救援人員遠端指揮機器人量測風險、回傳影像並運送輕量物資；現場指揮決定下一步。','In a simulated collapse site, responders remotely direct the robot to measure hazards, relay video and carry lightweight supplies; incident command decides what comes next.'),
    collaboration:L('人員設定任務、路線限制與停止條件；系統感測與回傳，不自行改變救援目標。','Responders define the task, route limits and stop conditions. The system senses and reports without changing rescue objectives autonomously.'),
    dataPermissions:L('需要任務地圖、感測資料、遠端控制權、角色授權、通訊紀錄與保留政策。','Requires mission maps, sensor data, remote-control rights, role authorization, communications logs and retention policies.'),
    safeguards:[L('遠端優先與通訊失效安全','Remote-first operation and communications fail-safe'),L('任務界線與緊急停止','Mission boundaries and emergency stop'),L('動作、載重與完整事件紀錄','Motion and load limits with complete event records')],
    limitations:[L('不使用武器或追蹤人類目標','No weapons or targeting of people'),L('不自主排序救援','No autonomous rescue prioritization'),L('不取代消防、醫療或指揮人員','Does not replace firefighters, medical staff or command')],
    next:L('定義感測套件、通訊失效策略、遠端控制介面與受控場域測試計畫。','Define the sensor package, communications-loss strategy, remote-control interface and controlled-site test plan.'), cta:L('與我們交流','Talk with us')
  }
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getFamilyProducts = (family: ProductDefinition['family']) => products.filter((product) => product.family === family);
