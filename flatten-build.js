// Post-build script to flatten Eleventy's directory structure
// Copies /page-name/index.html to /page-name.html for backwards compatibility

const fs = require('fs');
const path = require('path');

const siteDir = './_site';

// Get all directories in _site (excluding blog and special directories)
const entries = fs.readdirSync(siteDir, { withFileTypes: true });

entries.forEach(entry => {
  if (entry.isDirectory() && !['blog', 'CLAUDE', 'README'].includes(entry.name)) {
    const dirPath = path.join(siteDir, entry.name);
    const indexFile = path.join(dirPath, 'index.html');
    const flatFile = path.join(siteDir, `${entry.name}.html`);

    if (fs.existsSync(indexFile)) {
      // Copy index.html to flat .html file
      fs.copyFileSync(indexFile, flatFile);
      console.log(`✓ Created ${entry.name}.html from ${entry.name}/index.html`);
    }
  }
});

console.log('\n✓ Build flattening complete!');
