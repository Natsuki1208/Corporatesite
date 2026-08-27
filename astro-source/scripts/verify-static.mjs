import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const homeSections = ['hero','products','control','leadership','contact'];
const companySections = ['company-hero','company-mission','company-founder','company-organization','company-governance','company-domains','company-record','company-start'];
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
  const expected = isCompany ? companySections : homeSections;
  const positions = expected.map((id) => html.indexOf(`<section id="${id}"`));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const hashes = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  const brokenHashes = [...new Set(hashes.filter((id) => !ids.includes(id)))];
  const navBlocks = [...html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/g)].map((match) => match[1]);
  const orderedHashes = (block = '', expectedNavigation = []) => expectedNavigation.every((id, index, array) => { const match = block.match(new RegExp(`href="[^"]*#${id}"`)); const previous = index === 0 ? null : block.match(new RegExp(`href="[^"]*#${array[index - 1]}"`)); return Boolean(match) && (!previous || (match.index ?? 0) > (previous.index ?? 0)); });
  const headerOrder = isCompany
    ? orderedHashes(navBlocks[0], ['company-mission','company-organization','company-governance'])
    : orderedHashes(navBlocks[0], ['products','control','leadership','contact']);
  const footerOrder = isCompany
    ? ['companyPath','products','control','leadership','contact'].every((needle) => {
        const token = needle === 'companyPath' ? 'company/' : `#${needle}`;
        return navBlocks.at(-1)?.includes(token);
      })
    : orderedHashes(navBlocks.at(-1), ['products','control','leadership','contact']);
  const visiblePageNumbers = [...html.matchAll(/(?:class="[^"]*(?:page|counter)[^"]*"[^>]*>\s*|data-page-number[^>]*>)(?:00|01|02|03|04|05|06|07)\s*\//g)].length;
  const initialCounter = html.includes('data-section-count');
  const capabilityNumbers = false;
  const aiPathNumbers = false;
  const threeProducts = !isCompany && (html.match(/class="autonomy-product product-/g) ?? []).length === 3;
  const companyIdentity = isCompany && html.includes('company-hero') && html.includes('company-title') && (html.includes('虛擬科技公司') || html.includes('虚拟科技公司') || html.includes('FICTIONAL VIRTUAL TECHNOLOGY COMPANY'));
  const companyOrganization = isCompany && html.includes('company-organization') && (html.includes('FOUNDER &amp; CHAIR') || html.includes('創辦人暨董事長') || html.includes('创办人暨董事长')) && (html.includes('INDEPENDENT ASSURANCE') || html.includes('獨立驗收') || html.includes('独立验收'));
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
  const productMaturity = isCompany || ['CONCEPT','LAB'].every((label) => html.includes(label));
  const workingContact = isCompany ? html.includes('company-start') : html.includes('mailto:') || html.includes('data-contact-email');
  const hasLeadership = isCompany || (html.includes('Helena Vale') && html.includes('Daniel Kwan') && html.includes('data-section="leadership"'));
  const languageMarker = page.includes('/zh-cn/') ? html.includes('lang="zh-CN"') && html.includes('虚拟科技公司') : true;
  const humanControl = isCompany || (html.includes('AUTHORIZED ACTION') && html.includes('HUMAN OVERRIDE') && html.includes('data-mission-sequence'));
  const safetyBoundary = isCompany || (html.includes('不自主選擇') || html.includes('不自主选择') || html.includes('never autonomous selection'));
  const pageSpecific = isCompany ? companyIdentity && companyOrganization : threeProducts && humanControl && safetyBoundary;
  if (!ordered || !headerOrder || !footerOrder || !productMaturity || !workingContact || !hasLeadership || !languageMarker || !pageSpecific || visiblePageNumbers || initialCounter || capabilityNumbers || aiPathNumbers || duplicateIds.length || brokenHashes.length || missingResources.length || externalResources.length) failed = true;
  console.log(`${page}: order=${ordered?'PASS':'FAIL'} identity=${isCompany ? (companyIdentity?'PASS':'FAIL') : 'N/A'} organization=${isCompany ? (companyOrganization?'PASS':'FAIL') : 'N/A'} three_products=${!isCompany ? (threeProducts?'PASS':'FAIL') : 'N/A'} human_control=${humanControl?'PASS':'FAIL'} safety_boundary=${safetyBoundary?'PASS':'FAIL'} leadership=${hasLeadership?'PASS':'FAIL'} header=${headerOrder?'PASS':'FAIL'} footer=${footerOrder?'PASS':'FAIL'} language=${languageMarker?'PASS':'FAIL'} product_maturity=${productMaturity?'PASS':'FAIL'} contact=${workingContact?'PASS':'FAIL'} visible_page_numbers=${visiblePageNumbers} counter=${initialCounter?'FAIL':'PASS'} duplicate_ids=${duplicateIds.length} broken_hashes=${brokenHashes.length} missing_assets=${missingResources.length} external_resources=${externalResources.length}`);
}

if (failed) process.exitCode = 1;
