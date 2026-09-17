import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = [
  'index.html',
  'pages/tiposDeVinos.html',
  'pages/conocenos.html',
  'pages/contacto.html',
  'pages/subscribite.html',
];
const errors = [];

function fail(message) {
  errors.push(message);
}

function localReference(file, raw) {
  if (
    raw.startsWith('http://') ||
    raw.startsWith('https://') ||
    raw.startsWith('mailto:') ||
    raw.startsWith('tel:') ||
    raw.startsWith('#') ||
    raw.startsWith('data:')
  ) {
    return;
  }

  if (raw.startsWith('/')) {
    fail(`${file}: local reference must be relative, not root-absolute: ${raw}`);
    return;
  }

  const clean = raw.split('#', 1)[0].split('?', 1)[0];
  if (!clean) return;

  const target = resolve(root, dirname(file), clean);
  if (!target.startsWith(root) || !existsSync(target)) {
    fail(`${file}: local reference does not resolve: ${raw}`);
  }
}

for (const file of htmlFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) {
    fail(`${file}: expected HTML page is missing`);
    continue;
  }

  const html = readFileSync(path, 'utf8');
  if (!/^<!DOCTYPE html>/i.test(html.trimStart())) fail(`${file}: missing HTML5 doctype`);
  if (!/<html\s+lang="es">/i.test(html)) fail(`${file}: document language must be es`);
  if (!/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0">/i.test(html)) {
    fail(`${file}: viewport contract is missing or invalid`);
  }
  if (/<a\b[^>]*>\s*<li\b/i.test(html)) fail(`${file}: navigation must use li > a, not a > li`);
  if (/<script\b[^>]*\bsrc="https?:\/\//i.test(html)) {
    fail(`${file}: remote JavaScript is not required by this static exercise`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    localReference(file, match[1]);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const alt = match[1].match(/\balt="([^"]*)"/i);
    if (!alt || !alt[1].trim()) fail(`${file}: every image must have non-empty alt text`);
  }
}

for (const formPage of ['pages/contacto.html', 'pages/subscribite.html']) {
  const html = readFileSync(resolve(root, formPage), 'utf8');
  if (!/<form\b[^>]*\bdata-demo-form="true"/i.test(html)) {
    fail(`${formPage}: demo form must declare data-demo-form="true"`);
  }
  if (/<form\b[^>]*\b(?:action|method)=/i.test(html)) {
    fail(`${formPage}: demo form must not declare an action or method`);
  }
  if (/<button\b[^>]*\btype="submit"/i.test(html)) {
    fail(`${formPage}: demo form must not contain a submit button`);
  }
  if (!/Este formulario es demostrativo/i.test(html)) {
    fail(`${formPage}: demo limitation must be visible to users`);
  }
}

const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
if (packageJson.devDependencies?.sass !== '1.104.1') fail('package.json: Sass must be pinned to 1.104.1');
if (packageJson.devDependencies?.['node-sass']) fail('package.json: node-sass must not return');
if (packageJson.devDependencies?.nodemon) fail('package.json: nodemon is unnecessary for Sass watch mode');

const styleSource = readFileSync(resolve(root, 'scss/style.scss'), 'utf8');
if (/^\s*@import\b/m.test(styleSource)) fail('scss/style.scss: legacy Sass @import must not return');

const trackedNodeModules = execFileSync('git', ['ls-files', 'node_modules'], {
  cwd: root,
  encoding: 'utf8',
}).trim();
if (trackedNodeModules) fail('node_modules must not be tracked');

if (errors.length) {
  console.error('Site validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site validation passed for ${htmlFiles.length} HTML pages.`);
