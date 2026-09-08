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
    headline: { zh: '從需求到長期運作，讓軟體服務更穩定。', en: 'From requirements to lasting operations, keep software dependable.' },
    intro: { zh: '協助釐清需求、設計流程、建置應用，並把測試、部署與後續維護納入同一套工作方式。', en: 'Clarify requirements, design workflows, build applications and connect testing, delivery and ongoing maintenance in one practical engagement.' },
    fitHeading: { zh: '從要改善的流程開始。', en: 'Begin with the workflow that needs to improve.' },
    fit: [
      { zh: '現有流程依賴人工整理，希望建立專用應用', en: 'Manual workflows need a purpose-built application' },
      { zh: '舊有系統需要整合、改版或持續維護', en: 'Existing systems need integration, renewal or ongoing support' },
      { zh: '需要先用小範圍原型驗證新服務', en: 'A focused prototype is needed before a larger build' }
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
    headline: { zh: '讓分散資料清楚連結，查詢與分析更有效率。', en: 'Connect scattered data and make retrieval and analysis more efficient.' },
    intro: { zh: '從資料來源、結構與品質開始，整理整合方式，改善查詢效率與資訊呈現，為後續應用建立穩定基礎。', en: 'Begin with sources, structure and quality, then improve integration, query efficiency and presentation to create a dependable foundation for future applications.' },
    fitHeading: { zh: '從資料用途與真正的瓶頸開始。', en: 'Begin with the data purpose and the real bottleneck.' },
    fit: [
      { zh: '資料分散於不同系統、檔案或團隊', en: 'Data is scattered across systems, files or teams' },
      { zh: '查詢緩慢，報表與指標難以維持一致', en: 'Queries are slow or reporting metrics are inconsistent' },
      { zh: '準備建立分析、自動化或 AI 應用', en: 'Analytics, automation or AI initiatives need a stronger data foundation' }
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
    headline: { zh: '先看清價值與風險，再選擇適合的整合方式。', en: 'Clarify value and risk before choosing the right integration.' },
    intro: { zh: '依實際需求、法規與安全條件，協助評估區塊鏈、通證或數位資產相關應用，並規劃可驗證的整合範圍。', en: 'Assess blockchain, token or digital-asset applications against real requirements, regulation and security, then define a scope that can be validated.' },
    fitHeading: { zh: '先確認問題是否真的需要區塊鏈。', en: 'First confirm whether the problem truly needs blockchain.' },
    fit: [
      { zh: '需要評估區塊鏈是否真的適合使用情境', en: 'A use case needs an honest blockchain fit assessment' },
      { zh: '現有應用需要整合數位資產或鏈上資訊', en: 'An application needs digital-asset or on-chain data integration' },
      { zh: '專案需要同時考量安全、法遵與營運風險', en: 'Security, compliance and operational risk must be considered together' }
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
    boundary: { zh: '不將評估或原型視為投資、法律或上線承諾；正式應用需另行確認法遵與安全要求。', en: 'Assessment and prototypes are not investment, legal or launch commitments; production use requires separate compliance and security confirmation.' }
  }
};
