import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const dist=resolve('dist');
const products=['elias-knowledge','elias-care','elias-flow','elias-ops','elias-home','elias-rescue'];
const productHero={
 'elias-knowledge':'elias-knowledge-desktop.webp',
 'elias-care':'elias-care.webp',
 'elias-flow':'elias-flow.webp',
 'elias-ops':'elias-ops.webp',
 'elias-home':'elias-home-desktop.webp',
 'elias-rescue':'elias-rescue-desktop.webp'
};
const info=['technology','safety','research','about','contact']; const locales=['','zh-cn/','en/'];
const routes=locales.flatMap((prefix)=>[`${prefix}index.html`,`${prefix}digital-intelligence/index.html`,`${prefix}embodied-intelligence/index.html`,...products.map((slug)=>`${prefix}products/${slug}/index.html`),...info.map((page)=>`${prefix}${page}/index.html`)]);
const redirectTargets={
 'embodied-intelligence/index.html':'/Corporatesite/ai-robots/',
 'en/embodied-intelligence/index.html':'/Corporatesite/en/ai-robots/',
 'zh-cn/embodied-intelligence/index.html':'/Corporatesite/zh-cn/ai-robots/',
 'about/index.html':'/Corporatesite/company/',
 'en/about/index.html':'/Corporatesite/en/company/',
 'zh-cn/about/index.html':'/Corporatesite/zh-cn/company/'
};
let failed=false;const results=[];const mark=(name,pass,detail='')=>{results.push({name,pass,detail});if(!pass)failed=true};const exists=async(path)=>{try{await access(path);return true}catch{return false}};
for(const route of routes)mark(`route:${route}`,await exists(resolve(dist,route)));
for(const route of routes){
 const file=resolve(dist,route);if(!(await exists(file)))continue;const html=await readFile(file,'utf8');
 const redirectTarget=redirectTargets[route];if(redirectTarget){mark(`${route}:redirect`,html.includes(`url=${redirectTarget}`)&&html.includes(`href="${redirectTarget}"`));continue;}
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map((m)=>m[1]);const duplicates=[...new Set(ids.filter((id,index)=>ids.indexOf(id)!==index))];const hashes=[...html.matchAll(/href="#([^"]+)"/g)].map((m)=>m[1]);const broken=hashes.filter((id)=>!ids.includes(id));
 const home=/^(?:zh-cn\/|en\/)?index\.html$/.test(route);const productRoute=route.match(/products\/([^/]+)\/index\.html$/)?.[1];const lang=route.startsWith('en/')?'en':route.startsWith('zh-cn/')?'zh-Hans':'zh-Hant';
 mark(`${route}:lang`,html.includes(`<html lang="${lang}"`));mark(`${route}:shell`,html.includes('class="v2-header"')&&html.includes('class="v2-footer"'));mark(`${route}:language`,html.includes('data-v2-lang-button')&&html.includes('繁中')&&html.includes('简中')&&html.includes('USA'));mark(`${route}:keyboard`,html.includes('aria-expanded="false"')&&html.includes('aria-controls="v2-nav"'));mark(`${route}:ids`,duplicates.length===0,duplicates.join(','));mark(`${route}:hashes`,broken.length===0,broken.join(','));
 const canvases=(html.match(/<canvas/g)??[]).length;const allowsVideo=productRoute==='elias-home'||productRoute==='elias-rescue';mark(`${route}:motion-budget`,(!html.includes('<video')||allowsVideo)&&canvases<=(home?1:0),`canvas=${canvases}`);
 if(home){mark(`${route}:scenes`,(html.match(/<section[^>]+data-motion-scene/g)??[]).length===5);mark(`${route}:product-systems`,(html.match(/class="v2-architecture-families"/g)??[]).length===1&&html.includes('/digital-intelligence/')&&html.includes('/ai-robots/'));mark(`${route}:applications`,(html.match(/<article data-motion-reveal/g)??[]).length>=6&&html.includes('id="solutions"'));mark(`${route}:no-duplicate-product-list`,!html.includes('class="v2-product-row'));mark(`${route}:hero-media`,html.includes('/images/v2/elias-net-home-hero-desktop.jpg')&&html.includes('/images/v2/elias-net-home-hero-mobile.jpg'));mark(`${route}:hero-message`,html.includes('The future of yesterday, today.')&&html.includes('aria-label="SENSE, COORDINATE, AUTHORIZE, RESPOND"')&&html.includes('data-hero-replay'));mark(`${route}:logo-core`,html.includes('class="v2-brand-mark')&&html.includes('mark-module module-nw')&&html.includes('mark-module module-se')&&html.includes('mark-core-frame'));}
 if(productRoute){mark(`${route}:status`,html.includes('v2-status-row'));mark(`${route}:safety`,html.includes('v2-safety'));mark(`${route}:media`,html.includes(`/images/v2/products/${productHero[productRoute]}`)&&!html.includes('v2-picture-placeholder'));mark(`${route}:prototype`,html.includes('data-product-prototype')&&html.includes(`data-product="${productRoute}"`));if(allowsVideo){mark(`${route}:live-video`,html.includes(`/media/${productRoute}-live-scenario.mp4`)&&html.includes('data-product-video')&&html.includes(' muted')&&html.includes(' loop')&&html.includes(' playsinline'));}}
 if(route.endsWith('company/index.html')){mark(`${route}:company-v2`,html.includes('class="v2-company"')&&html.includes('v2-company-hero-grid'));mark(`${route}:company-order`,html.indexOf('company-mission')<html.indexOf('company-founder')&&html.indexOf('company-founder')<html.indexOf('company-solutions')&&html.indexOf('company-solutions')<html.indexOf('company-start'));mark(`${route}:company-systems`,(html.match(/class="v2-company-products is-systems"/g)??[]).length===1&&html.includes('/digital-intelligence/')&&html.includes('/ai-robots/'));}
 const refs=[...html.matchAll(/<(?:img|script)[^>]+src="([^"]+)"|<link[^>]+href="([^"]+)"/g)].map((m)=>m[1]||m[2]).filter(Boolean);for(const ref of refs.filter((v)=>v.startsWith('/Corporatesite/')))mark(`${route}:asset:${ref}`,await exists(resolve(dist,ref.replace('/Corporatesite/',''))));
 const hrefs=[...html.matchAll(/href="([^"]+)"/g)].map((m)=>m[1]).filter((href)=>href.startsWith('/Corporatesite/')&&!href.includes('#'));for(const href of hrefs){const clean=href.replace('/Corporatesite/','').split('?')[0];const target=clean.endsWith('/')?resolve(dist,clean,'index.html'):resolve(dist,clean);mark(`${route}:link:${href}`,await exists(target));}
}
const astroDir=resolve(dist,'_astro');const cssNames=(await readdir(astroDir)).filter((name)=>name.endsWith('.css'));const css=(await Promise.all(cssNames.map((name)=>readFile(resolve(astroDir,name),'utf8')))).join('\n');mark('reduced-motion',css.includes('prefers-reduced-motion'));mark('placeholder-ratios',css.includes('aspect-ratio:16/9')&&css.includes('aspect-ratio:4/5'));
const failures=results.filter((item)=>!item.pass);console.log(`static QA: ${results.length-failures.length}/${results.length} checks passed`);for(const item of failures)console.error(`FAIL ${item.name}${item.detail?` (${item.detail})`:''}`);if(failed)process.exitCode=1;
