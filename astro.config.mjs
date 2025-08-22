import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

import node from '@astrojs/node';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://deft-syrniki-7ef652..app',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },

  adapter: node({
    mode: 'standalone'
  })
});
// This file is used to configure the Astro project, including environment variables.