#!/usr/bin/env node
/* ============================================================
   build.mjs — compile index.html (source) → dist/index.html (production)

   What it does
   ------------
   1. Reads the source index.html (the editable, single-file version that
      uses <script type="text/babel"> blocks + CDN dev React + Babel).
   2. Replaces the three unpkg CDN <script> tags with INLINED production
      React + ReactDOM (vendored in ./vendor — no CDN dependency at all).
   3. Extracts each text/babel block, compiles it with esbuild
      (JSX → React.createElement, minified), and re-inlines the result
      as a plain <script> in the same position. Order — and therefore the
      window-global handoff between blocks — is preserved.
   4. Writes dist/index.html: still a single self-contained file, but
      ~25× lighter on JS and with zero runtime compilation.

   Usage:  node build.mjs        (or: npm run build)
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { transformSync } from "esbuild";

const SRC  = new URL("./index.html", import.meta.url);
const OUT  = new URL("./dist/index.html", import.meta.url);

let html = readFileSync(SRC, "utf8");
const srcBytes = Buffer.byteLength(html);

/* ---- 1. Swap CDN dev React for inlined production builds ------------- */
const react    = readFileSync(new URL("./vendor/react.production.min.js", import.meta.url), "utf8");
const reactDom = readFileSync(new URL("./vendor/react-dom.production.min.js", import.meta.url), "utf8");

const cdnTag = (lib) =>
  new RegExp(`<script src="https://unpkg\\.com/${lib}[^"]*"[^>]*></script>`);

if (!cdnTag("react@").test(html) || !cdnTag("react-dom@").test(html) || !cdnTag("@babel/standalone").test(html)) {
  console.error("✗ Expected the three unpkg script tags in index.html — structure changed?");
  process.exit(1);
}

html = html.replace(cdnTag("react@"),    () => `<script>/* React 18.3.1 production (inlined) */\n${react}</script>`);
html = html.replace(cdnTag("react-dom@"), () => `<script>/* ReactDOM 18.3.1 production (inlined) */\n${reactDom}</script>`);
html = html.replace(cdnTag("@babel/standalone"), ""); // compiler no longer ships to visitors

/* ---- 2. Compile every text/babel block in place ---------------------- */
let blockCount = 0;
html = html.replace(
  /<script type="text\/babel">([\s\S]*?)<\/script>/g,
  (_, code) => {
    blockCount++;
    const { code: js } = transformSync(code, {
      loader: "jsx",
      jsx: "transform",            // JSX → React.createElement / React.Fragment
      minify: true,
      target: "es2019",
    });
    /* IIFE wrapper — critical. Babel-standalone runs each block in its own
       function scope, so top-level `const X` in two different blocks never
       collided. Classic <script> tags share ONE global lexical scope, so the
       same code throws "Identifier already declared". The wrapper restores
       per-block isolation; blocks still talk via window.* (Object.assign). */
    return `<script>(function(){${js}})();</script>`;
  }
);

/* ---- 3. Write the production file ------------------------------------ */
mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(OUT, html);

const outBytes = Buffer.byteLength(html);
console.log(`✓ Compiled ${blockCount} JSX blocks`);
console.log(`  source : ${(srcBytes  / 1024).toFixed(0)} KB (+ ~4.2 MB CDN JS at runtime)`);
console.log(`  dist   : ${(outBytes  / 1024).toFixed(0)} KB total — self-contained, zero CDN, zero runtime compile`);
