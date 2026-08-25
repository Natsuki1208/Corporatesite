# Elias Net SI v1 — Astro Phase A Migration Report

Status: PHASE A STATIC MIGRATION PASSED — BROWSER VISUAL GATE PENDING

## Scope

- Source si-v1/ and REDESIGN_SPEC_SI.md were treated as read-only.
- The eight-section order, five services, seven solutions, three dialogs, local assets and existing interaction timings were retained.
- / is the Traditional Chinese route and /en/ is the English route.
- Every section, Footer and Dialog receives locale and selects complete zh/en markup at Astro build time. English body content is present without JavaScript; data-en attributes remain only as migration evidence.
- Astro output is static; no UI framework, backend, API, database, analytics, external font or CDN was added.
- GSAP is intentionally absent in Phase A.

## Architecture

- src/components/: Header, eight page sections, Footer and Dialogs.
- src/layouts/BaseLayout.astro: metadata, canonical, hreflang, favicon and global assets.
- src/content/{zh-TW,en}/: typed service and solution copy; src/content/fragments contains the lossless localized markup used at build time.
- src/scripts/main.ts: lossless legacy interaction orchestrator.
- Named script files record each interaction boundary and timing contract. Runtime extraction from main.ts is deferred until visual parity passes so Phase A does not alter listener order or shared state.
- src/styles/global.css: original cascade with public asset paths updated for the GitHub Pages base.
- The remaining style files are explicit extraction boundaries; Phase A does not reorder the legacy cascade.

## Preserved Safety and Accessibility

- Skip link, visible focus, keyboard solution tabs, mobile menu Escape/focus return.
- Native dialog focus trap, Escape, backdrop close and trigger focus return.
- prefers-reduced-motion, IntersectionObserver and visibilitychange.
- AI journey stops at human confirmation; simulated approval only; Actual Action: 0.
- Demo form and readiness console do not transmit or store input.

## Executed Gate Checks

- `npm install` and `npm ci`: PASS; `package-lock.json` created and reproducible install completed.
- Dependency audit: PASS; 0 known vulnerabilities after upgrading the new project to Astro 7.2.6 and applying the non-breaking Sharp update.
- `npm run check`: PASS; 41 files, 0 errors, 0 warnings, 0 hints.
- `npm run build`: PASS; static `/` and `/en/` routes generated.
- Local preview: PASS at `/Corporatesite/` and `/Corporatesite/en/`, HTTP 200.
- Structure: 8 sections, 5 services, 7 solutions and 8 event journey steps per locale.
- Static English: PASS; only the intentional `繁中` language-link label contains CJK text.
- Source integrity: PASS; all 14 `si-v1/` SHA-256 hashes match the pre-migration baseline.
- Anchors, duplicate IDs, missing assets, runtime external assets, network/storage API patterns, form actions, public MIS, old brands, secrets and non-zero Actual Action values: 0.
- Four CSS background URLs produced build-time resolution notices because they include the GitHub Pages base. All four returned HTTP 200 from the final preview and are not missing assets.

## Issue Records

### ASTRO-A-001 — Source is untracked and not recoverable through Git

- issue_id: ASTRO-A-001
- raised_by: QA / Lead Integrator
- problem: `si-v1/` and `REDESIGN_SPEC_SI.md` were untracked at migration start.
- evidence: Initial `git status --short` showed both paths as `??`.
- severity: L2
- affected_tasks: Source preservation, migration parity
- possible_options: Commit source first / copy source / record immutable hashes.
- recommended_option: Preserve source in place and record per-file SHA-256 before migration.
- recommendation_reason: Meets the no-commit rule while creating objective integrity evidence.
- human_decision_required: NO
- current_status: RESOLVED — 14/14 hashes verified unchanged after build.

### ASTRO-A-002 — English route initially depended on runtime page translation

- issue_id: ASTRO-A-002
- raised_by: Lead Integrator Gate review
- problem: Initial `/en/` component output still required JavaScript `data-en` mutation.
- evidence: `main.ts` contained `copyNodes`, `applyLanguage` and page-wide `innerHTML` replacement.
- severity: L2
- affected_tasks: Static English, no-JS accessibility, route architecture
- possible_options: Keep runtime translation / duplicate pages / build-time localized fragments.
- recommended_option: Select complete zh/en fragments at Astro build time and reserve TypeScript only for dynamic status text.
- recommendation_reason: Produces readable English without JavaScript and keeps `/` and `/en/` independently indexable.
- human_decision_required: NO
- current_status: RESOLVED — runtime page translation mutation count 0.

### ASTRO-A-003 — Installed Astro version had known security advisories

- issue_id: ASTRO-A-003
- raised_by: Lead Security review
- problem: Astro 5 and its Sharp dependency produced two high and one low audit finding.
- evidence: `npm audit --omit=dev` identified Astro and Sharp advisories.
- severity: L3
- affected_tasks: Dependency architecture, build safety
- possible_options: Ignore / force fix / upgrade the new migration project and retest.
- recommended_option: Upgrade to Astro 7.2.6, apply the normal non-force Sharp fix, then run `npm ci`, check and build again.
- recommendation_reason: The Astro directory is new and uncommitted, so the safer current release has no legacy production compatibility cost.
- human_decision_required: NO
- current_status: RESOLVED — audit reports 0 vulnerabilities; check/build pass.

### ASTRO-A-004 — Automated localhost browser evidence unavailable

- issue_id: ASTRO-A-004
- raised_by: Lead QA
- problem: Browser safety policy rejected automated control of the localhost URL.
- evidence: Browser runtime explicitly blocked localhost navigation and prohibited alternate browser-control workarounds.
- severity: L2
- affected_tasks: 1440/1024/768/390 screenshots, console, keyboard and animation runtime evidence
- possible_options: Bypass with another browser tool / infer success from build / request the user to open the preview for human review.
- recommended_option: Do not bypass; keep localhost running and wait for a user-opened preview before Phase B.
- recommendation_reason: The user defined a hard Phase A visual/interaction Gate, and success must not be fabricated.
- human_decision_required: YES — open the local preview and authorize continuation after visual review.
- current_status: NEEDS_HUMAN_DECISION

## Remaining Gate

The 1440×900, 1024×768, 768×1024 and 390×844 screenshot comparison, console inspection, complete keyboard traversal, reduced-motion runtime and animation controls still require an actual browser session. Phase A cannot be marked PASS and Phase B cannot start until that evidence exists.
