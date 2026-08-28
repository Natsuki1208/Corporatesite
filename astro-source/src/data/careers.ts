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
  { slug:'ai-engineer', title:'AI 工程師', titleEn:'AI Engineer', summary:'把模型能力變成一般人能理解、能實際使用的產品功能。', summaryEn:'Turn model capabilities into useful product experiences people can understand.', responsibilities:['設計與驗證企業 AI 應用','串接模型、資料與產品介面','建立品質、風險與效能測試'], responsibilitiesEn:['Design and validate enterprise AI applications','Connect models, data and product interfaces','Build quality, risk and performance tests'], skills:['Python 或 TypeScript','LLM、RAG 或 Agent 應用經驗','API 與軟體工程基礎','能清楚說明模型限制'], skillsEn:['Python or TypeScript','Experience with LLM, RAG or agent applications','API and software engineering fundamentals','Ability to explain model limitations clearly'] },
  { slug:'ai-training-engineer', title:'AI 訓練工程師', titleEn:'AI Training Engineer', summary:'讓資料、評估與回饋變成更可靠、更貼近使用情境的模型行為。', summaryEn:'Use data, evaluation and feedback to make model behavior more reliable and relevant.', responsibilities:['整理訓練與評估資料','設計可重複的模型評測','分析錯誤並改善資料品質'], responsibilitiesEn:['Prepare training and evaluation data','Design repeatable model evaluations','Analyze failures and improve data quality'], skills:['Python 與資料處理','資料標註或模型評估經驗','統計與實驗設計基礎','重視資料來源、授權與隱私'], skillsEn:['Python and data processing','Data labeling or model evaluation experience','Statistics and experimental design fundamentals','Care for data provenance, permission and privacy'] },
  { slug:'operations-engineer', title:'維運工程師', titleEn:'Operations Engineer', summary:'讓服務穩定運作，也讓每一次異常都能被看見、理解與改善。', summaryEn:'Keep services dependable and turn every incident into something visible, understandable and improvable.', responsibilities:['維護雲端與服務執行環境','建立監控、告警與事件紀錄','參與事故分析與復原演練'], responsibilitiesEn:['Maintain cloud and service environments','Build monitoring, alerts and incident records','Contribute to incident analysis and recovery exercises'], skills:['Linux、網路與容器基礎','雲端平台或 CI/CD 經驗','可觀測性與事件處理能力','能與產品和 AI 團隊協作'], skillsEn:['Linux, networking and container fundamentals','Cloud platform or CI/CD experience','Observability and incident-response skills','Ability to work across product and AI teams'] },
  { slug:'robotics-controls-engineer', title:'機器人與控制工程師', titleEn:'Robotics & Controls Engineer', summary:'把感知、控制與安全機制整合成可被人指揮的實體智慧系統。', summaryEn:'Integrate perception, control and safety into embodied systems people can direct.', responsibilities:['設計運動控制與感測整合','建立模擬、原型與安全測試','規劃遠端控制、停止與復原'], responsibilitiesEn:['Design motion control and sensor integration','Build simulation, prototype and safety tests','Plan remote control, stopping and recovery'], skills:['C++、Python 或 ROS 2','控制、定位或感測融合經驗','機電整合與測試能力','安全優先且理解非武器化原則'], skillsEn:['C++, Python or ROS 2','Experience in control, localization or sensor fusion','Mechatronics integration and testing','Safety-first mindset and commitment to non-weaponized systems'] },
  { slug:'product-ux-designer', title:'產品與 UX 設計', titleEn:'Product & UX Designer', summary:'讓複雜的人工智慧與機器人能力，成為安心、清楚且容易使用的體驗。', summaryEn:'Make complex AI and robotics capabilities feel clear, reassuring and easy to use.', responsibilities:['研究企業與生活使用情境','設計介面、服務流程與產品原型','與工程團隊共同驗證可用性'], responsibilitiesEn:['Research enterprise and everyday scenarios','Design interfaces, service flows and product prototypes','Validate usability with engineering teams'], skills:['產品策略與 UX 研究','Figma 與互動原型能力','資訊架構與無障礙基礎','能以白話溝通技術內容'], skillsEn:['Product strategy and UX research','Figma and interaction prototyping','Information architecture and accessibility fundamentals','Ability to communicate technology in plain language'] }
];

export const careerText = (role: CareerRole, field: 'title'|'summary'|'responsibilities'|'skills', locale: SiteLocale): string|string[] => {
  const enKey = `${field}En` as keyof CareerRole;
  const value = locale === 'en' ? role[enKey] : role[field];
  if (locale !== 'zh-CN') return value as string|string[];
  return Array.isArray(value) ? value.map(simplify) : simplify(String(value));
};
