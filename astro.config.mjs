import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://deft-syrniki-7ef652..app',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  }
});
// This file is used to configure the Astro project, including environment variables.