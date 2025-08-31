import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

import node from '@astrojs/node';

import vercel from '@astrojs/vercel';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://goantraders.com',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto',
  },

  adapter: vercel()
});
// This file is used to configure the Astro project, including environment variables.