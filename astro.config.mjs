import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

import vercel from '@astrojs/vercel';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://goantraders.com',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  })
});