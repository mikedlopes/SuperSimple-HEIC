#!/usr/bin/env node
/**
 * Drop files the Node server never needs at runtime.
 * Safe after `NITRO_PRESET=node-server vite build`.
 */
import { rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), ".output");

function rm(path) {
  try {
    rmSync(path, { recursive: true, force: true });
    console.log("slim:", path.replace(process.cwd() + "/", ""));
  } catch {
    /* missing is fine */
  }
}

function walk(dir, visit) {
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, visit);
    else visit(path, name);
  }
}

rm(join(root, "nitro.json"));
rm(join(root, "server", "_libs", "heic-to.mjs"));
rm(join(root, "public", "__grok"));

walk(join(root, "public", "assets"), (path, name) => {
  if (/\.(map)$/i.test(name)) rm(path);
  if (/\.woff$/i.test(name)) rm(path);
  if (/(cyrillic|greek|vietnamese)/i.test(name)) rm(path);
});
