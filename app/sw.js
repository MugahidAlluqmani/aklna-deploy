if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>n(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/404.html",revision:"0a27a4163254fc8fce870c8cc3a3f94f"},{url:"/_next/app-build-manifest.json",revision:"9cfbdca06218d2ca805e74ee7fb5140d"},{url:"/_next/static/M_VnaVZYEOR9L167MGioW/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/M_VnaVZYEOR9L167MGioW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-73e0d318c5cf1447.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/457b8330-5a986fc04de07cc8.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/60-f364ec92ba1bb98e.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/app/_not-found/page-b62982a1b0a6c401.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/app/camera/page-a4032b3f288615be.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/app/layout-2e920ef5f041fc78.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/app/page-98fdaca464734cf2.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/d441faa4-ab6beddb0b25baba.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/fd9d1056-13baa9b2029d31fe.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/main-378693854799dd9a.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/main-app-080531052138092f.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-5bb9dd3cb1899428.js",revision:"M_VnaVZYEOR9L167MGioW"},{url:"/_next/static/css/db4782adfffbcd6c.css",revision:"db4782adfffbcd6c"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/firebase-messaging-sw.js",revision:"4b54b17e279fc1a45e3624f47450c117"},{url:"/index.html",revision:"28eb8988903571610948725fefd9c42a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
