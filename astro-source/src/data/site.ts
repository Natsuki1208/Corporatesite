export type Locale = 'zh-TW' | 'en';

export interface LocalizedText { zh: string; en: string }
export const text = (value: LocalizedText, locale: Locale) => locale === 'en' ? value.en : value.zh;

export interface ProblemItem {
  id: string;
  title: LocalizedText;
  copy: LocalizedText;
}

export interface CapabilityItem {
  id: string;
  name: LocalizedText;
  headline: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  assistance: LocalizedText;
  outcome: LocalizedText;
}

export interface WorkScene {
  id: string;
  role: LocalizedText;
  problem: LocalizedText;
  assistance: LocalizedText;
  human: LocalizedText;
  measure: LocalizedText;
}

export interface AdoptionStage {
  id: string;
  name: LocalizedText;
  action: LocalizedText;
  input: LocalizedText;
  delivery: LocalizedText;
  check: LocalizedText;
}

export interface CaseStudy {
  id: string;
  tag: LocalizedText;
  title: LocalizedText;
  problem: LocalizedText;
  assistance: LocalizedText;
  human: LocalizedText;
  image: string;
}

export const problems: ProblemItem[] = [
  { id:'knowledge', title:{zh:'文件很多，需要時卻找不到',en:'Documents everywhere. Answers nowhere.'}, copy:{zh:'資訊散落在資料夾、信件與不同版本裡，查找與確認都耗費時間。',en:'Information is scattered across folders, messages and versions, making every search and verification slower.'} },
  { id:'repetition', title:{zh:'重複工作，占用真正思考的時間',en:'Repetitive work crowds out real thinking'}, copy:{zh:'複製、整理、摘要與追蹤每天反覆發生，團隊難以把時間留給判斷。',en:'Copying, organizing, summarizing and tracking repeat every day, leaving less time for judgment.'} },
  { id:'service', title:{zh:'訊息很多，回覆品質不一致',en:'More requests, less consistent service'}, copy:{zh:'同類問題由不同人處理，內容、速度與交接方式容易出現落差。',en:'Similar requests receive different answers, response times and handoffs depending on who handles them.'} },
  { id:'systems', title:{zh:'資料分散，工作必須跨系統拼接',en:'Work is fragmented across systems'}, copy:{zh:'每個工具只看見一部分，團隊必須人工搬運資料才能完成一件事。',en:'Each tool sees only part of the work, forcing teams to manually move information between systems.'} },
  { id:'signals', title:{zh:'重要訊號，容易埋在日常雜訊裡',en:'Important signals hide inside everyday noise'}, copy:{zh:'異常、趨勢與待辦混在大量更新中，真正需要注意的事情不易浮現。',en:'Anomalies, trends and actions get buried in updates, making urgent signals hard to recognize.'} },
  { id:'trust', title:{zh:'開始使用 AI，卻不確定資料界線',en:'AI is useful—but where is the data boundary?'}, copy:{zh:'缺少清楚的資料範圍、權限與紀錄，讓企業難以安心擴大使用。',en:'Without clear data scope, permissions and records, organizations hesitate to expand adoption.'} }
];

export const capabilities: CapabilityItem[] = [
  { id:'strategy', name:{zh:'AI 策略與場景探索',en:'AI strategy & discovery'}, headline:{zh:'先找到值得改變的工作',en:'Find the work that is worth changing first'}, summary:{zh:'從企業問題與工作現況出發，找出價值清楚、風險可控的 AI 起點。',en:'Start from the business problem and current work to identify an AI opportunity with clear value and manageable risk.'}, problem:{zh:'想導入 AI，卻不知道哪個場景最值得先做。',en:'The organization wants AI but does not know where to begin.'}, assistance:{zh:'盤點角色、流程、資料與成功條件，排出驗證順序。',en:'Map roles, workflows, data and success criteria to prioritize validation.'}, outcome:{zh:'形成清楚的應用方向與分階段路線。',en:'A clear application direction and phased path.'} },
  { id:'experience', name:{zh:'AI 體驗設計',en:'AI experience design'}, headline:{zh:'讓 AI 的協助自然進入工作',en:'Make AI assistance feel natural inside the work'}, summary:{zh:'把理解、建議、人員接手與例外處理設計成清楚、可使用的互動。',en:'Design understanding, suggestions, human handoffs and exceptions as a clear, usable experience.'}, problem:{zh:'通用聊天視窗無法配合角色與流程。',en:'A generic chat box does not fit each role or workflow.'}, assistance:{zh:'設計對話、操作節點、停止點與回饋方式。',en:'Design conversations, action points, stop points and feedback.'}, outcome:{zh:'建立團隊願意採用、知道如何掌握的體驗。',en:'An experience teams can adopt and understand how to control.'} },
  { id:'data', name:{zh:'資料與知識工程',en:'Data & knowledge engineering'}, headline:{zh:'可靠的答案，來自清楚的資料脈絡',en:'Reliable answers begin with clear data context'}, summary:{zh:'整理核准知識、資料關係、來源與版本，讓 AI 能在明確範圍內工作。',en:'Organize approved knowledge, data relationships, sources and versions so AI works within a defined scope.'}, problem:{zh:'文件與資料分散，來源與版本不容易確認。',en:'Documents and data are scattered, with unclear sources and versions.'}, assistance:{zh:'建立資料邊界、索引、關聯與可追溯來源。',en:'Establish data boundaries, indexes, relationships and traceable sources.'}, outcome:{zh:'資訊更容易查找、驗證與持續更新。',en:'Information becomes easier to find, verify and maintain.'} },
  { id:'agent', name:{zh:'AI 助理與 Agent',en:'AI assistants & agents'}, headline:{zh:'為不同角色，打造責任清楚的 AI 夥伴',en:'Build AI partners with clear responsibilities for different roles'}, summary:{zh:'依客服、營運、行政、資訊與管理需求，設計可以協助任務的 AI。',en:'Design task-focused AI for service, operations, administration, IT and management needs.'}, problem:{zh:'通用 AI 不理解角色責任與工作限制。',en:'Generic AI does not understand role responsibilities or limits.'}, assistance:{zh:'定義任務、工具、資料、停止點與人員接手。',en:'Define tasks, tools, data, stop points and human handoffs.'}, outcome:{zh:'AI 能真正參與工作，同時保持責任清楚。',en:'AI can participate in work while responsibilities remain clear.'} },
  { id:'integration', name:{zh:'系統與流程整合',en:'System & workflow integration'}, headline:{zh:'把 AI 接進既有工具，而不是再多一座孤島',en:'Connect AI to existing work—not another isolated tool'}, summary:{zh:'以分階段方式連接企業工具、資料介面與日常流程，不必一次汰換既有系統。',en:'Connect business tools, data interfaces and daily workflows in stages without replacing everything at once.'}, problem:{zh:'工作跨越多個系統，資訊需要反覆搬運。',en:'Work spans multiple systems and information is repeatedly moved by hand.'}, assistance:{zh:'設計介面、流程節點、回復方式與導入順序。',en:'Design interfaces, workflow points, recovery paths and rollout order.'}, outcome:{zh:'形成連續、可追蹤且能逐步擴充的工作方式。',en:'A connected, traceable way of working that can expand over time.'} },
  { id:'governance', name:{zh:'AI 治理與持續改善',en:'AI governance & improvement'}, headline:{zh:'創新要能前進，也要知道界線',en:'Move innovation forward with visible boundaries'}, summary:{zh:'建立資料範圍、權限、人員確認、紀錄、測試與版本改善機制。',en:'Establish data scope, permissions, human review, records, testing and version improvement.'}, problem:{zh:'缺少界線與紀錄，AI 難以安心進入日常工作。',en:'Without boundaries and records, AI is difficult to trust in daily work.'}, assistance:{zh:'把允許、限制、例外、核准與驗證方式寫進流程。',en:'Build permissions, limits, exceptions, approvals and validation into the workflow.'}, outcome:{zh:'應用能被理解、管理並持續調整。',en:'Applications remain understandable, manageable and adaptable.'} }
];

export const workScenes: WorkScene[] = [
  {id:'service',role:{zh:'客服',en:'Customer service'},problem:{zh:'大量問題重複出現，複雜案件難以快速交接。',en:'Questions repeat while complex cases are difficult to hand over quickly.'},assistance:{zh:'整理意圖、摘要對話、建議回覆並找到適合的承接角色。',en:'Organize intent, summarize conversations, suggest responses and identify the right owner.'},human:{zh:'人員確認敏感內容、例外處理與最終回覆。',en:'People review sensitive content, exceptions and final responses.'},measure:{zh:'改善回覆一致性、縮短分類時間',en:'Improve response consistency and reduce triage time'}},
  {id:'operations',role:{zh:'營運',en:'Operations'},problem:{zh:'跨部門更新分散，異常與待辦不易整理。',en:'Cross-team updates are scattered, making anomalies and actions difficult to organize.'},assistance:{zh:'彙整狀態、找出差異並提出下一步檢查。',en:'Consolidate status, identify differences and suggest the next check.'},human:{zh:'負責人確認優先順序與資源安排。',en:'Owners confirm priorities and resource decisions.'},measure:{zh:'提升事件掌握速度、保留處理紀錄',en:'Increase event awareness and preserve action records'}},
  {id:'admin',role:{zh:'行政',en:'Administration'},problem:{zh:'表單、會議與文件整理占用大量時間。',en:'Forms, meetings and document preparation consume substantial time.'},assistance:{zh:'產生摘要、整理欄位、建立任務並追蹤待辦。',en:'Create summaries, organize fields, generate tasks and track follow-ups.'},human:{zh:'人員確認正式內容、規則與發布範圍。',en:'People confirm official content, rules and publication scope.'},measure:{zh:'減少重複整理、縮短文件準備時間',en:'Reduce repetitive organization and document preparation time'}},
  {id:'it',role:{zh:'資訊',en:'IT'},problem:{zh:'服務、事件與知識散落在不同工具。',en:'Services, events and knowledge are distributed across tools.'},assistance:{zh:'整理事件脈絡、提供查詢入口並建議檢查順序。',en:'Assemble event context, provide a query entry point and suggest check order.'},human:{zh:'資訊人員確認權限、變更與重要操作。',en:'IT staff confirm permissions, changes and critical actions.'},measure:{zh:'縮短查找時間、提升事件掌握速度',en:'Reduce search time and improve event awareness'}},
  {id:'management',role:{zh:'管理決策',en:'Management'},problem:{zh:'關鍵資訊分散，會議前仍需人工拼接。',en:'Critical information is scattered and still manually assembled before decisions.'},assistance:{zh:'整理重點、差異、風險與需要確認的假設。',en:'Organize key points, changes, risks and assumptions that require confirmation.'},human:{zh:'管理者保留判斷、取捨與最終決策。',en:'Leaders retain judgment, trade-offs and final decisions.'},measure:{zh:'縮短資訊準備時間、提升決策可追溯性',en:'Reduce preparation time and improve decision traceability'}},
  {id:'knowledge',role:{zh:'知識工作',en:'Knowledge work'},problem:{zh:'研究、規範與經驗分散，難以快速建立可靠脈絡。',en:'Research, policies and experience are scattered, slowing reliable context building.'},assistance:{zh:'搜尋核准內容、整理引用並建立可回顧草稿。',en:'Search approved content, organize references and create reviewable drafts.'},human:{zh:'專業人員驗證內容、補足判斷並負責成果。',en:'Experts validate content, add judgment and own the outcome.'},measure:{zh:'縮短查找時間、保留來源與修訂紀錄',en:'Reduce retrieval time and preserve sources and revisions'}}
];

export const adoptionStages: AdoptionStage[] = [
  {id:'discover',name:{zh:'了解現況',en:'Understand today'},action:{zh:'梳理工作、資料與真正耗時的地方。',en:'Map the work, data and where time is actually spent.'},input:{zh:'現行流程、使用角色與已知限制。',en:'Current workflow, user roles and known constraints.'},delivery:{zh:'現況圖與可改善問題清單。',en:'Current-state map and improvement opportunities.'},check:{zh:'共同確認問題與優先順序。',en:'Agree on the problem and priority.'}},
  {id:'focus',name:{zh:'找出適合的場景',en:'Choose the right use case'},action:{zh:'挑選價值清楚、風險可控的起點。',en:'Choose a starting point with clear value and manageable risk.'},input:{zh:'成功條件、資料範圍與例外情況。',en:'Success criteria, data scope and exceptions.'},delivery:{zh:'場景定義與衡量方式。',en:'Use-case definition and measures.'},check:{zh:'確認邊界與不做事項。',en:'Confirm boundaries and exclusions.'}},
  {id:'prototype',name:{zh:'建立小型原型',en:'Build a focused prototype'},action:{zh:'用有限資料驗證核心體驗。',en:'Validate the core experience with limited data.'},input:{zh:'核准樣本與代表性任務。',en:'Approved samples and representative tasks.'},delivery:{zh:'可操作原型與初步假設。',en:'Working prototype and initial assumptions.'},check:{zh:'由實際使用者判斷是否值得繼續。',en:'Real users decide whether it is worth continuing.'}},
  {id:'validate',name:{zh:'使用真實流程驗證',en:'Validate in the real workflow'},action:{zh:'在受控範圍觀察使用與例外。',en:'Observe use and exceptions within a controlled scope.'},input:{zh:'實際流程、測試角色與回饋。',en:'Real workflow, test roles and feedback.'},delivery:{zh:'驗證結果、風險與改善清單。',en:'Validation findings, risks and improvements.'},check:{zh:'確認價值、準確性與人員接手方式。',en:'Confirm value, quality and human handoffs.'}},
  {id:'integrate',name:{zh:'分階段串接與導入',en:'Integrate in stages'},action:{zh:'依核准範圍連接工具、資料與流程。',en:'Connect tools, data and workflows within approved scope.'},input:{zh:'權限、介面與變更時程。',en:'Permissions, interfaces and change schedule.'},delivery:{zh:'分階段整合與回復方案。',en:'Phased integration and recovery plan.'},check:{zh:'每階段驗證後才進入下一步。',en:'Validate each phase before moving forward.'}},
  {id:'improve',name:{zh:'持續衡量與改善',en:'Measure and improve'},action:{zh:'追蹤使用情況、品質與新需求。',en:'Track adoption, quality and emerging needs.'},input:{zh:'使用回饋、紀錄與衡量結果。',en:'Usage feedback, records and measurements.'},delivery:{zh:'改善節奏、版本與治理紀錄。',en:'Improvement cadence, versions and governance records.'},check:{zh:'定期確認是否仍符合工作與安全需求。',en:'Regularly confirm continued fit for work and safety.'}}
];

export const cases: CaseStudy[] = [
  {id:'knowledge',tag:{zh:'概念示範 A',en:'Concept demo A'},title:{zh:'企業知識搜尋助理',en:'Enterprise knowledge search assistant'},problem:{zh:'文件分散，員工查找與確認耗時。',en:'Documents are scattered, making employee search and verification slow.'},assistance:{zh:'整合核准文件，提供附來源、可追溯的回答。',en:'Connect approved documents and provide sourced, traceable answers.'},human:{zh:'人員確認重要資訊、文件權限與正式內容。',en:'People confirm important information, document access and official content.'},image:'/images/elias-net-shared-knowledge.jpg'},
  {id:'service',tag:{zh:'概念示範 B',en:'Concept demo B'},title:{zh:'智慧客服協作助理',en:'AI-assisted service companion'},problem:{zh:'大量重複詢問與轉派，交接內容不一致。',en:'Repeated questions and routing create inconsistent handoffs.'},assistance:{zh:'整理意圖、建立摘要並提出建議回覆。',en:'Organize intent, create a summary and suggest a response.'},human:{zh:'人員處理例外、敏感內容與最終回覆。',en:'People handle exceptions, sensitive content and final replies.'},image:'/images/elias-net-services-landscape.jpg'},
  {id:'operations',tag:{zh:'概念示範 C',en:'Concept demo C'},title:{zh:'夜間維運協作助理',en:'Off-hours operations assistant'},problem:{zh:'非上班時段的異常資訊分散，影響難以快速判斷。',en:'Off-hours anomaly information is scattered, making impact hard to assess.'},assistance:{zh:'以唯讀方式整理事件、影響與處理建議。',en:'Organize events, impact and suggested checks through read-only access.'},human:{zh:'重要操作必須等待資訊人員確認；展示不連接真實設備。',en:'Critical actions wait for IT confirmation; the demo connects to no real device.'},image:'/images/elias-net-ai-operations.jpg'}
];

export const governanceItems = [
  {id:'data',title:{zh:'企業資料整合',en:'Enterprise data integration'},copy:{zh:'從核准來源取得必要資訊，不任意擴大資料範圍。',en:'Use necessary information from approved sources without expanding scope by default.'}},
  {id:'design',title:{zh:'AI 模型與應用設計',en:'AI model and application design'},copy:{zh:'依任務、資料敏感度與成本選擇合適方式。',en:'Choose an approach based on the task, data sensitivity and cost.'}},
  {id:'workflow',title:{zh:'工作流程與 Agent',en:'Workflows and agents'},copy:{zh:'定義任務邊界、工具、停止點與人員交接。',en:'Define task boundaries, tools, stop points and human handoffs.'}},
  {id:'access',title:{zh:'權限與資料範圍',en:'Permissions and data scope'},copy:{zh:'讓每個角色只存取完成工作所需的資訊。',en:'Give each role access only to the information needed for the work.'}},
  {id:'human',title:{zh:'人員確認與例外處理',en:'Human review and exceptions'},copy:{zh:'重要決策、敏感內容與高影響操作由人掌握。',en:'People retain control of important decisions, sensitive content and high-impact actions.'}},
  {id:'record',title:{zh:'紀錄、驗證與持續改善',en:'Records, validation and improvement'},copy:{zh:'保留版本、結果與修訂依據，讓應用可以持續調整。',en:'Preserve versions, outcomes and revision context so the application can keep improving.'}}
] as const;
