export const enterpriseServiceSlugs = ['elias-build', 'elias-data', 'elias-chain'] as const;
export type EnterpriseServiceSlug = typeof enterpriseServiceSlugs[number];

type LocalCopy = { zh: string; en: string };
type EnterpriseService = {
  name: string;
  eyebrow: string;
  label: LocalCopy;
  headline: LocalCopy;
  intro: LocalCopy;
  fitHeading: LocalCopy;
  fit: LocalCopy[];
  scope: LocalCopy[];
  process: LocalCopy[];
  boundary: LocalCopy;
};

export const enterpriseServices: Record<EnterpriseServiceSlug, EnterpriseService> = {
  'elias-build': {
    name: 'Elias Build',
    eyebrow: 'APPLICATION ENGINEERING',
    label: { zh: '應用軟體開發與維護', en: 'Application Software Development & Maintenance' },
    headline: { zh: '從需求到維護，建立能長期運作的軟體服務。', en: 'From requirements to maintenance, build software that lasts.' },
    intro: { zh: '從需求梳理、流程設計到應用開發，將測試、部署規劃與後續維護納入同一套交付方式。', en: 'From requirements and workflow design to application development, bring testing, deployment planning and ongoing maintenance into one delivery approach.' },
    fitHeading: { zh: '這些軟體需求，適合從 Elias Build 開始。', en: 'These software needs are a strong fit for Elias Build.' },
    fit: [
      { zh: '希望把仰賴人工整理的流程，建成專用應用', en: 'Turn a manually coordinated workflow into a purpose-built application' },
      { zh: '需要整合、改版或持續維護既有系統', en: 'Integrate, modernize or maintain an existing system' },
      { zh: '想先用小範圍原型，驗證新服務的核心流程', en: 'Validate a new service’s core workflow with a focused prototype' }
    ],
    scope: [
      { zh: '需求與流程盤點', en: 'Requirements and workflow mapping' },
      { zh: '介面、應用與系統整合', en: 'Interface, application and system integration' },
      { zh: '測試、部署規劃與維護', en: 'Testing, delivery planning and maintenance' }
    ],
    process: [
      { zh: '定義要改善的結果', en: 'Define the result to improve' },
      { zh: '驗證核心流程與風險', en: 'Validate the core workflow and risks' },
      { zh: '分階段交付並持續改善', en: 'Deliver in stages and improve continuously' }
    ],
    boundary: { zh: '實際功能、時程與維護範圍，依需求、環境與驗收條件確認。', en: 'Functions, timing and support scope are confirmed against requirements, environment and acceptance criteria.' }
  },
  'elias-data': {
    name: 'Elias Data',
    eyebrow: 'DATA INTELLIGENCE',
    label: { zh: '資料整合與效能優化', en: 'Data Integration & Performance' },
    headline: { zh: '整合分散資料，提升查詢效率與分析一致性。', en: 'Unify scattered data for faster queries and more consistent analysis.' },
    intro: { zh: '盤點資料來源、結構與品質，改善資料流程、查詢效率與呈現方式，為分析、自動化與 AI 應用建立可靠基礎。', en: 'Assess sources, structure and quality, then improve data flows, query performance and presentation to create a reliable foundation for analytics, automation and AI.' },
    fitHeading: { zh: '這些資料問題，適合優先處理。', en: 'These data issues are worth addressing first.' },
    fit: [
      { zh: '資料分散在不同系統、檔案或團隊之間', en: 'Data is scattered across systems, files or teams' },
      { zh: '查詢速度不足，報表與指標也難以維持一致', en: 'Queries are slow and reporting metrics are difficult to keep consistent' },
      { zh: '準備導入分析、自動化或 AI，需要先建立可靠的資料基礎', en: 'Analytics, automation or AI initiatives need a reliable data foundation first' }
    ],
    scope: [
      { zh: '資料來源與品質盤點', en: 'Source and data-quality assessment' },
      { zh: '資料流程、結構與查詢優化', en: 'Pipeline, structure and query optimization' },
      { zh: '指標、報表與資訊呈現規劃', en: 'Metrics, reporting and information design' }
    ],
    process: [
      { zh: '確認資料目的與責任邊界', en: 'Confirm data purpose and ownership' },
      { zh: '找出品質與效能瓶頸', en: 'Find quality and performance bottlenecks' },
      { zh: '建立可測量的改善路徑', en: 'Build a measurable improvement path' }
    ],
    boundary: { zh: '會先確認資料權限、品質與使用目的；效能成果需以實際資料量與環境驗證。', en: 'Permissions, quality and purpose are confirmed first; performance results require validation against real data volume and environment.' }
  },
  'elias-chain': {
    name: 'Elias Chain',
    eyebrow: 'BLOCKCHAIN & DIGITAL ASSETS',
    label: { zh: '區塊鏈與數位資產應用', en: 'Blockchain & Digital Asset Applications' },
    headline: { zh: '釐清共享與追溯需求，再規劃區塊鏈整合。', en: 'Clarify sharing and traceability needs before planning blockchain integration.' },
    intro: { zh: '當多方需要共享紀錄、追蹤交易，或串接鏈上資料與數位資產時，先評估適用性、法規與安全條件，再規劃可驗證的整合範圍。', en: 'When multiple parties need shared records, transaction traceability, on-chain data or digital assets, first assess fit, regulation and security, then define an integration scope that can be validated.' },
    fitHeading: { zh: '這些跨組織或鏈上需求，值得進一步評估。', en: 'These cross-organization or on-chain needs merit closer evaluation.' },
    fit: [
      { zh: '多個組織需要共享交易或資產紀錄，並保留可查驗的歷程', en: 'Multiple organizations need shared transaction or asset records with a verifiable history' },
      { zh: '現有應用需要串接鏈上資料、錢包或數位資產', en: 'An existing application needs on-chain data, wallet or digital-asset integration' },
      { zh: '需要設計資產權限、交易稽核與異常處理流程', en: 'Asset permissions, transaction audit and exception handling need deliberate design' }
    ],
    scope: [
      { zh: '應用情境與可行性評估', en: 'Use-case and feasibility assessment' },
      { zh: '鏈上資料、錢包與應用整合規劃', en: 'On-chain data, wallet and application integration planning' },
      { zh: '權限、稽核、安全與異常流程設計', en: 'Permission, audit, security and exception-flow design' }
    ],
    process: [
      { zh: '先驗證問題是否需要區塊鏈', en: 'First validate whether blockchain is needed' },
      { zh: '界定法遵、資產與安全條件', en: 'Bound regulatory, asset and security conditions' },
      { zh: '用受控原型驗證整合方式', en: 'Validate integration through a controlled prototype' }
    ],
    boundary: { zh: '本服務不構成投資或法律意見；原型也不代表可直接上線。正式應用須另行完成法遵、安全與營運驗證。', en: 'This service does not constitute investment or legal advice, and a prototype is not production approval. Production use requires separate compliance, security and operational validation.' }
  }
};
