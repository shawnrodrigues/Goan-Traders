import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_ojo0rWMb.mjs';
import { manifest } from './manifest__IahCRPO.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/submit-form.astro.mjs');
const _page4 = () => import('./pages/coming-soon.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/gallery.astro.mjs');
const _page7 = () => import('./pages/privacy.astro.mjs');
const _page8 = () => import('./pages/products.astro.mjs');
const _page9 = () => import('./pages/reviews.astro.mjs');
const _page10 = () => import('./pages/sitemap.astro.mjs');
const _page11 = () => import('./pages/terms.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/submit-form.js", _page3],
    ["src/pages/coming-soon.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/gallery.astro", _page6],
    ["src/pages/privacy.astro", _page7],
    ["src/pages/products.astro", _page8],
    ["src/pages/reviews.astro", _page9],
    ["src/pages/sitemap.astro", _page10],
    ["src/pages/terms.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0076da84-a56f-4eb2-bddc-bff9a6d07dc2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
