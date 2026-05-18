import fs from 'node:fs';
import path from 'node:path';

const siteDir = path.resolve('_site');
const internalHosts = new Set([
  'fractionalctosolutions.com',
  'www.fractionalctosolutions.com',
  'internal.test',
]);

const ignoredSchemes = /^(mailto|tel|sms|javascript|data):/i;
const hrefPattern = /\bhref\s*=\s*(["'])(.*?)\1/gi;

function walkHtmlFiles(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Build output not found: ${dir}`);
  }

  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function toPublicPath(filePath) {
  return `/${path.relative(siteDir, filePath).split(path.sep).join('/')}`;
}

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function resolveTarget(pathname) {
  const cleanPath = decodePathname(pathname);
  const targetPath = cleanPath === '/' ? '/index.html' : cleanPath;
  const candidates = [];

  if (targetPath.endsWith('/')) {
    candidates.push(path.join(siteDir, targetPath, 'index.html'));
  } else {
    const ext = path.extname(targetPath);
    candidates.push(path.join(siteDir, targetPath));

    if (!ext) {
      candidates.push(path.join(siteDir, `${targetPath}.html`));
      candidates.push(path.join(siteDir, targetPath, 'index.html'));
    }
  }

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function hasAnchor(filePath, hash) {
  if (!hash || hash === '#') {
    return true;
  }

  if (!filePath.endsWith('.html')) {
    return false;
  }

  const rawAnchor = hash.slice(1);
  const anchor = decodePathname(rawAnchor);
  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const content = fs.readFileSync(filePath, 'utf8');
  const anchorPattern = new RegExp(`\\s(?:id|name)\\s*=\\s*(["'])${escaped}\\1`, 'i');

  return anchorPattern.test(content);
}

function resolveHref(href, sourceFile) {
  const value = href.trim();
  if (!value || value === '#') {
    return null;
  }

  if (ignoredSchemes.test(value)) {
    return null;
  }

  const sourceRelativePath = path.relative(siteDir, sourceFile).split(path.sep).join('/');
  const base = new URL(sourceRelativePath, 'https://internal.test/');
  let parsed;

  try {
    parsed = new URL(value, base);
  } catch {
    return { type: 'invalid', value };
  }

  if (!internalHosts.has(parsed.hostname)) {
    return null;
  }

  return {
    type: 'internal',
    pathname: parsed.pathname,
    hash: parsed.hash,
  };
}

const failures = [];
const htmlFiles = walkHtmlFiles(siteDir);

for (const file of htmlFiles) {
  const source = toPublicPath(file);
  const html = fs.readFileSync(file, 'utf8');
  const matches = html.matchAll(hrefPattern);

  for (const match of matches) {
    const href = match[2];
    const resolved = resolveHref(href, file);

    if (!resolved) {
      continue;
    }

    if (resolved.type === 'invalid') {
      failures.push(`${source}: invalid href "${resolved.value}"`);
      continue;
    }

    const targetFile = resolveTarget(resolved.pathname);
    if (!fs.existsSync(targetFile)) {
      failures.push(`${source}: missing target "${href}"`);
      continue;
    }

    if (!hasAnchor(targetFile, resolved.hash)) {
      failures.push(`${source}: missing anchor "${href}"`);
    }
  }
}

if (failures.length) {
  console.error(`Internal link check failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Internal link check passed for ${htmlFiles.length} HTML files.`);
