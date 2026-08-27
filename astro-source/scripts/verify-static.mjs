import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const expected = ['hero','leadership','problems','products','trust','evidence','innovation','scenes','capabilities','cases','method','contact'];
const headerNavigation = ['leadership','products','trust','capabilities','method','contact'];
const footerNavigation = ['leadership','products','trust','capabilities','evidence','cases','method','contact'];
const pages = ['dist/index.html','dist/zh-cn/index.html','dist/en/index.html'];
let failed = false;

for (const page of pages) {
  const html = await readFile(page,'utf8');
  const positions = expected.map((id)=>html.indexOf(`<section id="${id}"`));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match)=>match[1]);
  const duplicateIds = [...new Set(ids.filter((id,index)=>ids.indexOf(id)!==index))];
  const hashes = [...html.matchAll(/href="#([^"]+)"/g)].map((match)=>match[1]);
  const brokenHashes = [...new Set(hashes.filter((id)=>!ids.includes(id)))];
  const navBlocks = [...html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/g)].map((match)=>match[1]);
  const orderedHashes = (block = '', expectedNavigation = []) => expectedNavigation.every((id,index,array) => block.indexOf(`href="#${id}"`) >= 0 && (index === 0 || block.indexOf(`href="#${id}"`) > block.indexOf(`href="#${array[index-1]}"`)));
  const headerOrder = orderedHashes(navBlocks[0], headerNavigation);
  const footerOrder = orderedHashes(navBlocks.at(-1), footerNavigation);
  const visiblePageNumbers = [...html.matchAll(/(?:class="[^"]*(?:page|counter)[^"]*"[^>]*>\s*|data-page-number[^>]*>)(?:00|01|02|03|04|05|06|07)\s*\//g)].length;
  const initialCounter = html.includes('data-section-count');
  const capabilityNumbers = /<article[^>]+data-solution-card[\s\S]*?<div class="solution-top"><b>0[1-6]<\/b>/.test(html);
  const aiPathNumbers = /data-ai-change-tab[^>]*><span>0[1-4]<\/span>/.test(html);
  const resourceRefs = [
    ...[...html.matchAll(/<(?:script|img)[^>]+src="([^"]+)"/g)].map((match)=>match[1]),
    ...[...html.matchAll(/<link[^>]+rel="(?:stylesheet|icon)"[^>]+href="([^"]+)"/g)].map((match)=>match[1]),
  ];
  const externalResources = resourceRefs.filter((value)=>/^https?:\/\//.test(value));
  const localResources = resourceRefs.filter((value)=>value.startsWith('/Corporatesite/'));
  const missingResources = [];
  for (const value of localResources) {
    const path = resolve('dist', value.replace(/^\/Corporatesite\//,''));
    try { await access(path); } catch { missingResources.push(value); }
  }
  const ordered = positions.every((position,index)=>position>=0&&(index===0||position>positions[index-1]));
  const productMaturity = ['PILOT CONCEPT','CONCEPT','LAB VALIDATED'].every((label)=>html.includes(label));
  const workingContact = html.includes('mailto:') || html.includes('data-contact-email');
  const hasLeadership = html.includes('Mira Lin') && html.includes('data-section="leadership"');
  const languageMarker = page.includes('/zh-cn/') ? html.includes('lang="zh-CN"') && html.includes('把 AI 安全地带入企业日常工作') : true;
  if (!ordered || !headerOrder || !footerOrder || !productMaturity || !workingContact || !hasLeadership || !languageMarker || visiblePageNumbers || initialCounter || capabilityNumbers || aiPathNumbers || duplicateIds.length || brokenHashes.length || missingResources.length || externalResources.length) failed = true;
  console.log(`${page}: order=${ordered?'PASS':'FAIL'} leadership=${hasLeadership?'PASS':'FAIL'} header=${headerOrder?'PASS':'FAIL'} footer=${footerOrder?'PASS':'FAIL'} language=${languageMarker?'PASS':'FAIL'} product_maturity=${productMaturity?'PASS':'FAIL'} contact=${workingContact?'PASS':'FAIL'} visible_page_numbers=${visiblePageNumbers} counter=${initialCounter?'FAIL':'PASS'} capability_numbers=${capabilityNumbers?'FAIL':'PASS'} ai_path_numbers=${aiPathNumbers?'FAIL':'PASS'} duplicate_ids=${duplicateIds.length} broken_hashes=${brokenHashes.length} missing_assets=${missingResources.length} external_resources=${externalResources.length}`);
}

if (failed) process.exitCode = 1;
