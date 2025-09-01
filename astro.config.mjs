import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

import node from '@astrojs/node'; // Note: You are using the Vercel adapter, so this import is not needed unless you plan to switch to the Node.js adapter.
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
  })
});