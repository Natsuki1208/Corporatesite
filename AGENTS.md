# Elias Net Website Agent Instructions

Follow the central [Elias Agent Standards](https://github.com/Natsuki1208/elias-agent-standards), especially its web design, QA, security and release governance. Keep this file limited to Elias Net facts and constraints; do not add a Git Submodule.

## Project identity and brand

- Elias Net presents human-directed artificial intelligence for work, life and non-weaponized rescue.
- Tone: refined, technological and humane. Prefer live human context, restrained light and clear editorial hierarchy; avoid dense HUDs, generic neon AI graphics and decorative effects without meaning.
- Preserve the established dark navy, teal, warm gold and soft off-white visual system.

## Routes and product truth

- Astro source is `astro-source/`; Traditional Chinese is the default, with `/zh-cn/` and `/en/` equivalents.
- Digital products: Elias Knowledge, Care, Flow and Ops. Embodied research concepts: Elias Home and Rescue.
- Never imply that concepts, simulated pricing, prototypes or generated media are deployed, certified, purchasable or production-ready without evidence.
- Human authorization remains explicit in consequential actions. Product pages with live-action video use the video-led, small-caption presentation.

## Technical and release constraints

- Astro 7 static site; base path `/Corporatesite`; GitHub Pages deploys `astro-source/dist/` from `main` through `.github/workflows/deploy-pages.yml`.
- Do not commit `dist/`, caches, temporary previews, local paths or unrelated user files.
- Validate with `npm run check`, `npm run qa:static` and `npm run build` from `astro-source/`, plus visual QA at the central standard's required widths.
- Stage reviewed files explicitly. Push approved releases with GitHub Desktop; never force-push or change repository access.
