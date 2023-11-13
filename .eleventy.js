const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy("./src/js");

    eleventyConfig.addWatchTarget("./src/_includes/layout");

    eleventyConfig.addFilter("limit", function (array, limit) {
      return array.slice(0, limit);
    });

    eleventyConfig.addPlugin(pluginRss);

    return {
    passthroughFileCopy: true,
      dir: {
        input: "src",
        output: "public",
        includes: "_includes",
      },
    };
  };