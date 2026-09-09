import type { SiteLocale } from './products';
import { simplify } from './simplified-map';

export interface CareerRole {
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  responsibilities: string[];
  responsibilitiesEn: string[];
  skills: string[];
  skillsEn: string[];
}

export const careerRoles: CareerRole[] = [
  { slug:'ai-engineer', title:'AI 工程師', titleEn:'AI Engineer', summary:'把模型能力變成一般人能理解、能實際使用的產品功能。', summaryEn:'Turn model capabilities into useful product experiences people can understand.', responsibilities:['設計與驗證企業 AI 應用','串接模型、資料與產品介面','設計測試，評估品質、風險與效能'], responsibilitiesEn:['Design and validate enterprise AI applications','Connect models, data and product interfaces','Design tests to assess quality, risk and performance'], skills:['Python 或 TypeScript','LLM、RAG 或 Agent 應用經驗','API 與軟體工程基礎','能清楚說明模型限制'], skillsEn:['Python or TypeScript','Experience with LLM, RAG or agent applications','API and software engineering fundamentals','Ability to explain model limitations clearly'] },
  { slug:'application-engineer', title:'應用軟體工程師', titleEn:'Application Software Engineer', summary:'從使用需求到系統維護，把流程建成穩定、可持續改善的軟體服務。', summaryEn:'Turn real workflows into dependable software services that can be maintained and improved over time.', responsibilities:['釐清需求與核心工作流程','開發前後端功能與 API 整合','建立測試、部署與後續維護方式'], responsibilitiesEn:['Clarify requirements and core workflows','Build front-end, back-end and API integrations','Establish testing, deployment and ongoing maintenance'], skills:['TypeScript、Python、C# 或 Java 任一實務經驗','Web、後端或 API 整合基礎','Git、測試與 CI/CD 經驗','能與使用者和跨職能團隊釐清需求'], skillsEn:['Practical experience with TypeScript, Python, C# or Java','Web, back-end or API integration fundamentals','Experience with Git, testing and CI/CD','Ability to clarify requirements with users and cross-functional teams'] },
  { slug:'operations-engineer', title:'維運工程師', titleEn:'Operations Engineer', summary:'維持服務穩定運作，追蹤異常、釐清原因並推動改善。', summaryEn:'Keep services reliable, track incidents, understand their causes and drive improvements.', responsibilities:['維護雲端與服務執行環境','建立監控、告警與事件紀錄','參與事故分析與復原演練'], responsibilitiesEn:['Maintain cloud and service environments','Build monitoring, alerts and incident records','Contribute to incident analysis and recovery exercises'], skills:['Linux、網路與容器基礎','雲端平台或 CI/CD 經驗','可觀測性與事件處理能力','能與產品和 AI 團隊協作'], skillsEn:['Linux, networking and container fundamentals','Cloud platform or CI/CD experience','Observability and incident-response skills','Ability to work across product and AI teams'] },
  { slug:'data-blockchain-engineer', title:'資料與區塊鏈工程師', titleEn:'Data & Blockchain Engineer', summary:'整理企業資料與鏈上資訊，讓查詢、追溯與系統整合有清楚的品質與安全基礎。', summaryEn:'Build reliable data and on-chain integrations with clear foundations for quality, traceability and security.', responsibilities:['盤點資料來源、結構與品質','設計資料流程、優化查詢效能並串接鏈上資料','規劃權限、稽核與異常處理機制'], responsibilitiesEn:['Assess data sources, structure and quality','Design data pipelines, optimize queries and integrate on-chain data','Plan permissions, audit and exception handling'], skills:['SQL、Python 與資料工程基礎','資料庫、ETL 或查詢優化經驗','區塊鏈 API、錢包或智慧合約整合經驗','重視權限、資料追溯與安全邊界'], skillsEn:['SQL, Python and data engineering fundamentals','Experience with databases, ETL or query optimization','Experience integrating blockchain APIs, wallets or smart contracts','Care for permissions, data traceability and security boundaries'] },
  { slug:'product-ux-designer', title:'產品與 UX 設計師', titleEn:'Product & UX Designer', summary:'把 AI、軟體與資料服務，設計成容易理解、操作順手的產品。', summaryEn:'Design AI, software and data services that are easy to understand and use.', responsibilities:['研究企業工作流程與使用者需求','設計介面、服務流程與產品原型','與工程團隊共同驗證可用性'], responsibilitiesEn:['Research enterprise workflows and user needs','Design interfaces, service flows and product prototypes','Validate usability with engineering teams'], skills:['產品策略與 UX 研究','Figma 與互動原型能力','資訊架構與無障礙基礎','能以白話溝通技術內容'], skillsEn:['Product strategy and UX research','Figma and interaction prototyping','Information architecture and accessibility fundamentals','Ability to communicate technology in plain language'] }
];

export const careerText = (role: CareerRole, field: 'title'|'summary'|'responsibilities'|'skills', locale: SiteLocale): string|string[] => {
  const enKey = `${field}En` as keyof CareerRole;
  const value = locale === 'en' ? role[enKey] : role[field];
  if (locale !== 'zh-CN') return value as string|string[];
  return Array.isArray(value) ? value.map(simplify) : simplify(String(value));
};
