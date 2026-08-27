import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://natsuki1208.github.io',
  base: '/Corporatesite',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    server: {
      allowedHosts: ['.manus.computer']
    }
  }
});
