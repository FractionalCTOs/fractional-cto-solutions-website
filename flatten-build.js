// Post-build script to flatten Eleventy's directory structure
// Copies /page-name/index.html to /page-name.html for backwards compatibility.
// Also creates /blog/post-name.html for blog post compatibility.

const fs = require('fs');
const path = require('path');

const siteDir = './_site';

const excludedDirs = new Set(['CLAUDE', 'README']);

function flattenIndexes(parentDir) {
  const entries = fs.readdirSync(parentDir, { withFileTypes: true });

  entries.forEach(entry => {
    if (!entry.isDirectory() || excludedDirs.has(entry.name)) {
      return;
    }

    const dirPath = path.join(parentDir, entry.name);
    const indexFile = path.join(dirPath, 'index.html');
    const flatFile = path.join(parentDir, `${entry.name}.html`);

    if (fs.existsSync(indexFile)) {
      fs.copyFileSync(indexFile, flatFile);
      console.log(`✓ Created ${path.relative(siteDir, flatFile)} from ${path.relative(siteDir, indexFile)}`);
    }

    flattenIndexes(dirPath);
  });
}

flattenIndexes(siteDir);

console.log('\n✓ Build flattening complete!');
