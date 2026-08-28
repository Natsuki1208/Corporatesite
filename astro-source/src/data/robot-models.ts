import type { SiteLocale } from './products';
import { simplify } from './simplified-map';

export interface RobotModel {
  code: string;
  name: string;
  family: 'home' | 'rescue';
  category: string;
  description: string;
  descriptionEn: string;
  image: string;
  alt: string;
  altEn: string;
  status: '概念機型';
}

export const robotModels: RobotModel[] = [
  { code:'LUMA-HC01', name:'晨光陪伴型', family:'home', category:'居家照顧', description:'遞送茶水、藥盒，陪伴長者並提供簡單照護提醒。', descriptionEn:'Carries drinks and pill organizers, offers companionship and provides simple care reminders.', image:'images/v2/robot-models/luma-hc01.jpg', alt:'LUMA-HC01 晨光陪伴型在明亮居家環境遞送飲水', altEn:'LUMA-HC01 companion model carrying water in a bright home', status:'概念機型' },
  { code:'CARE-ARC HC02', name:'行動扶助型', family:'home', category:'居家照顧', description:'協助長者行走、扶助平衡與進行居家移動訓練。', descriptionEn:'Supports walking, balance and guided mobility practice at home.', image:'images/v2/robot-models/care-arc-hc02.jpg', alt:'CARE-ARC HC02 行動扶助型概念機器人', altEn:'CARE-ARC HC02 mobility assistance robot concept', status:'概念機型' },
  { code:'NESTER HC03', name:'家務照護型', family:'home', category:'居家照顧', description:'端送茶水、整理桌面、收納物品並協助簡單家務。', descriptionEn:'Serves drinks, organizes surfaces, stores everyday items and assists with light household tasks.', image:'images/v2/robot-models/nester-hc03.jpg', alt:'NESTER HC03 家務照護型為長者遞送飲水', altEn:'NESTER HC03 home-care model bringing water to an older adult', status:'概念機型' },
  { code:'ATLAS-RS01', name:'災區搜尋型', family:'rescue', category:'救援', description:'在地震瓦礫區進行搜尋、照明與救援物資搬運。', descriptionEn:'Supports search, illumination and supply transport in earthquake debris zones.', image:'images/v2/robot-models/atlas-rs01.jpg', alt:'ATLAS-RS01 災區搜尋型在瓦礫環境執行搜尋', altEn:'ATLAS-RS01 search model operating in earthquake rubble', status:'概念機型' },
  { code:'EMBER-RF02', name:'消防滅火型', family:'rescue', category:'救援', description:'進入高溫區域執行滅火、降溫並支援消防人員。', descriptionEn:'Enters high-temperature areas for fire suppression, cooling and firefighter support.', image:'images/v2/robot-models/ember-rf02.jpg', alt:'EMBER-RF02 消防滅火型協助消防人員控制火勢', altEn:'EMBER-RF02 firefighting model helping crews control a fire', status:'概念機型' },
  { code:'TIDE-RW03', name:'洪災水域救援型', family:'rescue', category:'救援', description:'在洪水環境中運送物資、提供漂浮救援與通訊支援。', descriptionEn:'Transports supplies and supports flotation rescue and communications in flood environments.', image:'images/v2/robot-models/tide-rw03.jpg', alt:'TIDE-RW03 洪災水域救援型運送飲水與救援物資', altEn:'TIDE-RW03 flood-response model transporting water and rescue supplies', status:'概念機型' }
];

export const modelText = (model: RobotModel, field: 'category'|'description'|'alt', locale: SiteLocale) => {
  if (locale === 'en') return field === 'description' ? model.descriptionEn : field === 'alt' ? model.altEn : model.family === 'home' ? 'Home Care' : 'Rescue';
  const value = model[field];
  return locale === 'zh-CN' ? simplify(value) : value;
};
