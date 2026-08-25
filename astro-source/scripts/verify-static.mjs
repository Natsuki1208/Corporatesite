import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const expected = ['hero','problems','innovation','scenes','capabilities','cases','method','contact'];
const pages = ['dist/index.html','dist/en/index.html'];
let failed = false;

for (const page of pages) {
  const html = await readFile(page,'utf8');
  const positions = expected.map((id)=>html.indexOf(`id="${id}"`));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match)=>match[1]);
  const duplicateIds = [...new Set(ids.filter((id,index)=>ids.indexOf(id)!==index))];
  const hashes = [...html.matchAll(/href="#([^"]+)"/g)].map((match)=>match[1]);
  const brokenHashes = [...new Set(hashes.filter((id)=>!ids.includes(id)))];
  const navBlocks = [...html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/g)].map((match)=>match[1]);
  const orderedHashes = (block = '') => expected.slice(1).every((id,index,array)=>block.indexOf(`href="#${id}"`) >= 0 && (index === 0 || block.indexOf(`href="#${id}"`) > block.indexOf(`href="#${array[index-1]}"`)));
  const headerOrder = orderedHashes(navBlocks[0]);
  const footerOrder = orderedHashes(navBlocks.at(-1));
  const sectionIndices = expected.every((_,index)=>html.includes(`${String(index).padStart(2,'0')} /`));
  const initialCounter = html.includes('<span data-section-count>00 / 07</span>');
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
  if (!ordered || !headerOrder || !footerOrder || !sectionIndices || !initialCounter || duplicateIds.length || brokenHashes.length || missingResources.length || externalResources.length) failed = true;
  console.log(`${page}: order=${ordered?'PASS':'FAIL'} header=${headerOrder?'PASS':'FAIL'} footer=${footerOrder?'PASS':'FAIL'} indices=${sectionIndices?'PASS':'FAIL'} counter=${initialCounter?'PASS':'FAIL'} duplicate_ids=${duplicateIds.length} broken_hashes=${brokenHashes.length} missing_assets=${missingResources.length} external_resources=${externalResources.length}`);
}

if (failed) process.exitCode = 1;
