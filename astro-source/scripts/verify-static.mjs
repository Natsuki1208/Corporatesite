import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const homeSections = ['hero','products','control','leadership','contact'];
const enterpriseHomeSections = ['eh-hero','eh-products','eh-how','eh-difference','eh-adoption','eh-cases','eh-start'];
const companySections = ['company-hero','company-founder','company-governance','company-products','company-organization','company-record','company-start'];
const pages = [
  'dist/index.html',
  'dist/zh-cn/index.html',
  'dist/en/index.html',
  'dist/company/index.html',
  'dist/zh-cn/company/index.html',
  'dist/en/company/index.html'
];
let failed = false;

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const isCompany = page.includes('/company/');
  const isEnterpriseHome = page === 'dist/index.html';
  const expected = isCompany ? companySections : isEnterpriseHome ? enterpriseHomeSections : homeSections;
  const positions = expected.map((id) => html.indexOf(`<section id="${id}"`));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const hashes = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  const brokenHashes = [...new Set(hashes.filter((id) => !ids.includes(id)))];
  const navBlocks = [...html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/g)].map((match) => match[1]);
  const footerNavBlock = html.match(/<footer[^>]*>[\s\S]*?<nav[^>]*>([\s\S]*?)<\/nav>[\s\S]*?<\/footer>/)?.[1] ?? '';
  const orderedHashes = (block = '', expectedNavigation = []) => expectedNavigation.every((id, index, array) => { const match = block.match(new RegExp(`href="[^"]*#${id}"`)); const previous = index === 0 ? null : block.match(new RegExp(`href="[^"]*#${array[index - 1]}"`)); return Boolean(match) && (!previous || (match.index ?? 0) > (previous.index ?? 0)); });
  const headerOrder = isCompany
    ? orderedHashes(navBlocks[0], ['company-founder','company-governance','company-products','company-organization','company-start'])
    : isEnterpriseHome
      ? orderedHashes(navBlocks[0], ['eh-products','eh-how','eh-difference','eh-start'])
    : orderedHashes(navBlocks[0], ['products','control','leadership','contact']);
  const footerOrder = isCompany
    ? ['companyPath','company-founder','company-governance','company-products','company-organization','company-start'].every((needle) => {
        const token = needle === 'companyPath' ? 'company/' : `#${needle}`;
        return footerNavBlock.includes(token);
      })
    : isEnterpriseHome || orderedHashes(footerNavBlock, ['products','control','leadership','contact']);
  const visiblePageNumbers = [...html.matchAll(/(?:class="[^"]*(?:page|counter)[^"]*"[^>]*>\s*|data-page-number[^>]*>)(?:00|01|02|03|04|05|06|07)\s*\//g)].length;
  const initialCounter = html.includes('data-section-count');
  const capabilityNumbers = false;
  const aiPathNumbers = false;
  const threeProducts = !isCompany && (html.match(/class="autonomy-product product-/g) ?? []).length === 3;
  const enterpriseExperience = isEnterpriseHome
    && (html.match(/eh-entry-card/g) ?? []).length === 8
    && (html.match(/data-work-scene/g) ?? []).length >= 4
    && html.includes('eh-hero-photo')
    && html.includes('elias-net-home-hero.webp')
    && html.includes('人類想像未來，')
    && html.includes('我們讓智慧與之同行。')
    && (html.match(/images\/product-[^"']+\.webp/g) ?? []).length === 7
    && html.includes('正式資產待重新提供')
    && html.includes('NEW LOGO PENDING')
    && html.includes('Elias Rescue／救援仿生人')
    && html.includes('Elias Home／居家仿生人');
  const companyIdentity = isCompany && html.includes('company-hero') && html.includes('company-title') && (html.includes('自主系統公司') || html.includes('自主系统公司') || html.includes('AUTONOMOUS SYSTEMS'));
  const companyOrganization = isCompany && html.includes('company-organization') && (html.includes('FOUNDER &amp; CHAIR') || html.includes('創辦人暨董事長') || html.includes('创办人暨董事长')) && (html.includes('INDEPENDENT ASSURANCE') || html.includes('獨立驗收') || html.includes('独立验收'));
  const companyProducts = isCompany && html.includes('company-products') && (html.match(/class="product-system-card/g) ?? []).length === 3 && html.includes('ELIAS NETOPS') && html.includes('ELIAS GUARDIAN') && html.includes('ELIAS MEDIC');
  const pocEntry = isCompany && html.includes('data-poc-option') && html.includes('ELIAS CONTROL') && html.includes('data-poc-start');
  const resourceRefs = [
    ...[...html.matchAll(/<(?:script|img)[^>]+src="([^"]+)"/g)].map((match) => match[1]),
    ...[...html.matchAll(/<link[^>]+rel="(?:stylesheet|icon)"[^>]+href="([^"]+)"/g)].map((match) => match[1])
  ];
  const externalResources = resourceRefs.filter((value) => /^https?:\/\//.test(value));
  const localResources = resourceRefs.filter((value) => value.startsWith('/Corporatesite/'));
  const missingResources = [];
  for (const value of localResources) {
    const path = resolve('dist', value.replace(/^\/Corporatesite\//, ''));
    try { await access(path); } catch { missingResources.push(value); }
  }
  const ordered = positions.every((position, index) => position >= 0 && (index === 0 || position > positions[index - 1]));
  const productMaturity = isCompany || isEnterpriseHome || ['CONCEPT','LAB'].every((label) => html.includes(label));
  const workingContact = isCompany ? html.includes('company-start') : html.includes('mailto:') || html.includes('data-contact-email');
  const hasLeadership = isCompany || isEnterpriseHome || (html.includes('Helena Vale') && html.includes('Daniel Kwan') && html.includes('data-section="leadership"'));
  const languageMarker = page.includes('/zh-cn/') ? html.includes('lang="zh-CN"') && html.includes('自主系统') : true;
  const humanControl = isCompany || (isEnterpriseHome ? html.includes('重要選擇由我們掌握') : (html.includes('AUTHORIZED ACTION') && html.includes('HUMAN OVERRIDE') && html.includes('data-mission-sequence')));
  const safetyBoundary = isCompany || (isEnterpriseHome ? html.includes('確認後才會繼續') : (html.includes('不自主選擇') || html.includes('不自主选择') || html.includes('never autonomous selection')));
  const mascotAsset = html.includes('/Corporatesite/images/elias-net-nav-hello-mascot.png');
  const mascotA11y = html.includes('data-navigation-mascot') && html.includes('data-mascot-toggle') && html.includes('aria-expanded="false"') && (html.includes('開啟 ELIAS NET 導覽') || html.includes('开启 ELIAS NET 导览') || html.includes('Open ELIAS NET navigation'));
  const mascotEntries = html.includes('data-mascot-panel') && (html.includes('公司介紹') || html.includes('公司介绍') || html.includes('Company')) && (html.includes('產品系統') || html.includes('产品系统') || html.includes('Product systems')) && (html.includes('技術能力') || html.includes('技术能力') || html.includes('Capabilities')) && (html.includes('人類控制') || html.includes('人类控制') || html.includes('Human Control')) && (html.includes('領導與治理') || html.includes('领导与治理') || html.includes('Leadership')) && (html.includes('開始合作') || html.includes('开始合作') || html.includes('Start a conversation'));
  const mascotRoutes = isCompany
    ? ['company-founder','company-products','company-governance','company-organization','company-start'].every((id) => html.includes(`href="#${id}"`))
    : isEnterpriseHome
      ? ['eh-products','eh-difference','eh-how','eh-start'].every((id) => html.includes(`href="#${id}"`))
      : ['products','control','leadership','contact'].every((id) => html.includes(`href="#${id}"`));
  const languagePicker = html.includes('data-language-switcher') && html.includes('data-language-toggle') && html.includes('data-language-menu') && html.includes('繁體中文') && html.includes('简体中文') && html.includes('English');
  const pageSpecific = isCompany ? companyIdentity && companyOrganization && companyProducts && pocEntry : isEnterpriseHome ? enterpriseExperience && humanControl && safetyBoundary : threeProducts && humanControl && safetyBoundary;
  if (!ordered || !headerOrder || !footerOrder || !productMaturity || !workingContact || !hasLeadership || !languageMarker || !languagePicker || !mascotAsset || !mascotA11y || !mascotEntries || !mascotRoutes || !pageSpecific || visiblePageNumbers || initialCounter || capabilityNumbers || aiPathNumbers || duplicateIds.length || brokenHashes.length || missingResources.length || externalResources.length) failed = true;
  console.log(`${page}: order=${ordered?'PASS':'FAIL'} enterprise_home=${isEnterpriseHome ? (enterpriseExperience?'PASS':'FAIL') : 'N/A'} identity=${isCompany ? (companyIdentity?'PASS':'FAIL') : 'N/A'} organization=${isCompany ? (companyOrganization?'PASS':'FAIL') : 'N/A'} company_products=${isCompany ? (companyProducts?'PASS':'FAIL') : 'N/A'} poc_entry=${isCompany ? (pocEntry?'PASS':'FAIL') : 'N/A'} three_products=${!isCompany && !isEnterpriseHome ? (threeProducts?'PASS':'FAIL') : 'N/A'} human_control=${humanControl?'PASS':'FAIL'} safety_boundary=${safetyBoundary?'PASS':'FAIL'} leadership=${hasLeadership?'PASS':'FAIL'} header=${headerOrder?'PASS':'FAIL'} footer=${footerOrder?'PASS':'FAIL'} language=${languageMarker?'PASS':'FAIL'} language_picker=${languagePicker?'PASS':'FAIL'} mascot_asset=${mascotAsset?'PASS':'FAIL'} mascot_a11y=${mascotA11y?'PASS':'FAIL'} mascot_entries=${mascotEntries?'PASS':'FAIL'} mascot_routes=${mascotRoutes?'PASS':'FAIL'} product_maturity=${productMaturity?'PASS':'FAIL'} contact=${workingContact?'PASS':'FAIL'} visible_page_numbers=${visiblePageNumbers} counter=${initialCounter?'FAIL':'PASS'} duplicate_ids=${duplicateIds.length} broken_hashes=${brokenHashes.length} missing_assets=${missingResources.length} external_resources=${externalResources.length}`);
}

if (failed) process.exitCode = 1;
