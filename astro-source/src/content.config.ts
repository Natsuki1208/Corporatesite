import { defineCollection } from 'astro:content';

// Elias Net uses typed TypeScript modules for localized copy. Declaring no
// file-backed collections prevents Astro from treating those modules as CMS
// content directories during check/build.
export const collections = {} satisfies Record<string, ReturnType<typeof defineCollection>>;
