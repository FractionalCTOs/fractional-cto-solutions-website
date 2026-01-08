module.exports = function(eleventyConfig) {
  // Copy static assets to output directory
  eleventyConfig.addPassthroughCopy("*.svg");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.jpeg");
  eleventyConfig.addPassthroughCopy("*.gif");
  eleventyConfig.addPassthroughCopy("*.ico");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Watch for changes to CSS/JS (if you add any local files later)
  eleventyConfig.addWatchTarget("./assets/");

  // Don't use gitignore for Eleventy (we'll use .eleventyignore instead)
  eleventyConfig.setUseGitIgnore(false);

  // Set template engine for HTML files
  eleventyConfig.setTemplateFormats([
    "html",
    "md",
    "liquid"
  ]);

  return {
    // Use Liquid for includes
    htmlTemplateEngine: "liquid",

    // Input directory (current directory)
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
