# BLOCKOPS QA Report

BRAND_NAME=麥塊智慧維運
ENGLISH_BRAND=BLOCKOPS
CURRENT_BRANCH=leo/voxel-tech-site-v1
FILES_CREATED=12 (.gitignore, index.html, assets/css/style.css, assets/js/main.js, 5 branding SVGs, assets/icons/voxel-symbols.svg, docs/BRAND_GUIDE.md, docs/QA_REPORT.md)
FILES_MODIFIED=README.md; visual enhancement round updated index.html, assets/css/style.css, assets/js/main.js, README.md and docs/QA_REPORT.md; local-audio round additionally updated .gitignore and the same frontend/docs files
EXTERNAL_ASSET_COUNT=0
EXTERNAL_REQUEST_COUNT=0
COPYRIGHTED_GAME_ASSET_COUNT=0 IN TRACKED SOURCE; USER REFERENCES AND 3 GENERATED ORIGINAL PREVIEW PNGs ARE GIT-IGNORED
SECRET_DETECTION_STATUS=PASS — no secret, token, credential, password assignment, webhook or .env detected
DESKTOP_1440_STATUS=PASS — 1440 × 900 browser validation; no horizontal overflow
TABLET_768_STATUS=PASS — 768 × 900 browser validation; single-column solutions and no horizontal overflow
MOBILE_390_STATUS=PASS — 390 × 844 browser validation; compact scenes, two-column technology modules and no horizontal overflow
WORLD_STATE_STATUS=PASS — worldMode, worldPhase, effectLevel, soundEnabled, reducedMotion, activeSection and demoEventState are synchronized in one state
WORLD_TIME_STATUS=PASS — realtime, 75-second demo and manual controls verified; demo reached DAY, SUNSET, NIGHT and SUNRISE
WORLD_EFFECT_STATUS=PASS — static 0 moving characters; standard 2 engineers/2 animals/1 anomaly; rich 3 engineers/5 animals/2 anomalies
WORLD_MOBILE_DENSITY_STATUS=PASS — rich mode reduced to 1 engineer, 1 animal and 1 anomaly at 390px
DEMO_EVENT_STATUS=PASS — random HOST-DEMO target, AI advice, MIS-gated check, simulated recovery and replay verified; Actual Action 0
SECTION_STORY_STATUS=PASS — exclusive solution buildings, data rail, research lab, night defense, engineering station, message station and footer horizon verified
KEYBOARD_NAVIGATION_STATUS=PASS — semantic buttons, visible focus, keys 1–6, modal focus handling and ESC close verified
REDUCED_MOTION_STATUS=PASS — media query overrides animation/transition duration, reveals content and hides nonessential beams, particles and flow packet
DAY_NIGHT_TOGGLE_STATUS=PASS — toggle, aria-pressed and localStorage persistence verified in browser
CRAFTING_INTERACTION_STATUS=PASS — replaced by the expanded seven-station event flow; pause, approval, replay and stop states verified
FORM_DEMO_STATUS=PASS — preventDefault and demo-only message verified; no request or input storage path exists
LOCAL_PREVIEW_STATUS=PASS — Python server bound to 127.0.0.1:8080; visual and interaction checks completed
LOCAL_PREVIEW_AUDIO_STATUS=PASS — click-gated playback, 20% default volume, loop, play, pause, mute, volume and missing-file fallback verified — LOCAL PREVIEW ONLY — REPLACEMENT REQUIRED BEFORE PUBLICATION
LOCAL_PREVIEW_AUDIO_GIT_STATUS=PASS — .gitignore matched the MP3; git status reported ignored; git ls-files returned no entry
LOCAL_PREVIEW_IMAGE_STATUS=PASS — generated BLOCKOPS engineer, sheep and anomaly PNGs load from localhost only; colored masks reduce visible rectangular edges
LOCAL_PREVIEW_IMAGE_GIT_STATUS=PASS — assets/local-preview/ is ignored; git ls-files returned no entry
CONSOLE_ERROR_COUNT=0
EXTERNAL_NETWORK_REQUEST_COUNT=0
PERSISTENT_REQUEST_ANIMATION_FRAME_COUNT=1
SET_INTERVAL_COUNT=0
COMMIT_COUNT=0
PUSH_COUNT=0
FINAL_STATUS=PASS — READY FOR USER VISUAL REVIEW

## Visual enhancement validation — 2026-08-24

- Bright original Voxel world: PASS. Hero uses CSS geometry for sky, clouds, layered hills, energy tower, technology tree, relay station, terrain, operations buildings, data beams and five data cubes.
- Dark-section boundary: PASS. Dark presentation is limited to the operations console, AI night collaboration and footer.
- Six independent solution scenes: PASS. Monitoring, AI interpretation, anonymization, on-call collaboration, read-only query and human approval each reached its documented final state.
- Human approval scene: PASS. Action remains locked until the explicit simulated approval button is enabled and selected.
- Technology lab: PASS. Ten modules open one shared accessible dialog; new selections replace prior content, ESC closes it and `aria-expanded` resets.
- Event flow: PASS. Playback pauses at step 5 for MIS confirmation, continues only after simulated approval, reaches step 7, replays and stops correctly.
- Effect modes: PASS. Minimal, standard and rich controls update ARIA state; standard is the default and the selected value persists in localStorage.
- Offscreen performance: PASS. IntersectionObserver pauses nonessential ambient animation outside the viewport; Page Visibility pauses it while the page is hidden.
- Responsive checks: PASS at 1440, 768 and 390 CSS pixels; measured document width did not exceed viewport content width.
- Accessibility: PASS for semantic controls, live status regions, skip link, focus visibility, dialog label, ESC handling, focus return, keyboard shortcuts and reduced-motion override.
- Console errors: 0 in browser validation.
- External resources/requests: 0 external network references; branding and local-preview images load only from localhost.
- Source validation: JavaScript syntax PASS, CSS braces 1022/1022, local references PASS, `git diff --check` PASS.
- Data and safety scan: no secret markers, token patterns, password assignments, webhooks, real IP addresses or external tracking code detected. Three user-provided character reference screenshots exist only in the ignored local-preview directory.
- Publication state: local preview only; no commit, push, merge, remote change or GitHub Pages publication performed.
- Local audio publication warning: **LOCAL PREVIEW ONLY — REPLACEMENT REQUIRED BEFORE PUBLICATION**. The MP3 must remain ignored and must not enter a commit, review package or release artifact.
- Local audio browser validation: PASS. Before entering the world, no audio `src` was assigned and all controls were disabled. After the click, the local file reached ready state 4 with loop enabled and volume 20%; play, pause, mute and volume controls worked.
- Missing-audio validation: PASS. The file was temporarily renamed, the page showed a non-blocking unavailable message, all six solution cards remained available and console errors stayed at 0; the MP3 was then restored.

## Continuous Voxel world validation — 2026-08-24

- Copyright boundary: LOCAL PREVIEW EXCEPTION. The portable scenery, buildings, tools and interactions remain project-authored geometry. Three user-provided character reference screenshots are loaded only from the Git-ignored local-preview directory and must be replaced before any commit, package or publication.
- Realtime mode: PASS. Browser-local 07:00–17:59 maps to day; remaining hours map to night.
- Demo mode: PASS. Direct browser observation reached DAY at 00:04, SUNSET at 10:47, NIGHT at 13:50 and SUNRISE at 23:27 during one approximately 75-second cycle.
- Manual mode: PASS. Both world controller and header sun/moon control switch to manual and alternate day/night; selected mode and effect level persist in localStorage.
- Hero population: PASS. Standard mode exposes two independently timed engineers and two animals; rich mode adds one engineer, three animals and one second anomaly. Mobile caps all three categories at one visible unit.
- Hero Demo Event: PASS. A random fictional device changed state, the engineer approached, AI advice appeared, the sequence paused for simulated MIS confirmation, then ended with DEMO COMPLETED, `simulate_only=true`, Actual Action 0 and no real-device operation.
- Night defense: PASS. Original abstract anomaly silhouettes and red error packets are detected by scan geometry and represented as green handled packets without combat, blood, death or violence.
- Solution exclusivity: PASS. Starting the AI scene after monitoring reset the prior card; browser state showed only the newly selected card running.
- Data rail: PASS. Playback paused at MIS step 5 and reached step 7 only after simulated approval.
- Technology lab: PASS. Selecting Hash Integrity linked the core, moved the research scene to module index 6 and opened the correct accessible panel; ESC behavior remains valid.
- Engineering station: PASS. Milestone selection updated the whiteboard and ARIA pressed state.
- Message station: PASS. Empty submission produced an inline block prompt; valid fictional demo input completed local packaging and displayed “未傳送真實資料” without a request.
- Visibility/performance: PASS. IntersectionObserver controls active-section classes and offscreen pause state. Source contains no `setInterval`; one persistent `requestAnimationFrame` updates world time, while other frame requests are one-shot event throttles or focus scheduling.
- Reduced motion: PASS by source and computed static-mode validation. Engineers, animals and error packets reported `animation-name: none`; the media query also stops night packets, scans, lab core, message track and footer motion.
- Responsive: PASS at 1440, 768 and 390 CSS pixels with no measured horizontal overflow.
- Data safety: PASS. Only fictional `HOST-DEMO-01` to `HOST-DEMO-03`, symbolic users and network labels are present; no real host, account, address or equipment data is included.
- Action safety: PASS. No backend/API integration and no Restart, SSH, Shell, account or Firewall execution path exists.
- Poster-world visual direction: PASS FOR LOCAL VISUAL REVIEW. Hero, solutions, flow, technology, night, about and contact use distinct scene palettes, asymmetric compositions and hard-shadow Voxel panels while retaining one continuous world language.
- Character reference preview: PASS FOR LOCAL VISUAL REVIEW. Engineers, sheep and night anomalies now use three newly generated original BLOCKOPS previews derived only from broad Voxel proportion and energetic color direction. Soft masks and environmental halos reduce rectangular white edges.
- Automation sheep flow: PASS. The generated BLOCKOPS sheep replaces the former data packet, moves between all seven stations, lowers toward a grass tuft and still pauses for MIS approval.
- Mobile poster-world validation: PASS at the active 444 px browser viewport; generated character images loaded successfully and measured document width remained below viewport width.
