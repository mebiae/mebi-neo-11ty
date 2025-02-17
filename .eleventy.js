const pluginRss = require("@11ty/eleventy-plugin-rss");
const path = require("node:path");
const browserlist = require("browserslist");
const { bundle, transform, browserslistToTargets, composeVisitors } = require("lightningcss");
const { type } = require("node:os");

module.exports = function (eleventyConfig) {

    // De-index.html the output
    eleventyConfig.addGlobalData("permalink", () => {
      return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    // Minify CSS
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
      outputFileExtension: "css",

      compile: async function(_inputContent, inputPath) {
        
        let targets = browserslistToTargets(browserlist("> 0.2% and not dead"))

        return async () => {
          let { code } = await bundle({
            filename: inputPath,
            minify: true,
            sourceMap: false,
            targets,
            drafts: {
              nesting: true
            },
          });
          return code;
        };
      },
    });

    // Get assets
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy("./src/js");
    eleventyConfig.addPassthroughCopy("./src/robots.txt");

    eleventyConfig.setTemplateFormats([
      "njk",
      "md",
      "css",
      "html"
    ]);

    // Filters
    eleventyConfig.addFilter("limit", function (array, limit) {
      return array.slice(0, limit);
    });

    eleventyConfig.addFilter("UTCA", function(val) {
      return new Date(val).toLocaleDateString("en-CA", {
        timeZone: "UTC"
      });
    });

    eleventyConfig.addFilter("stringToTime", function(time) {
      return new Date(time)
    });

    // Plugins
    eleventyConfig.addPlugin(pluginRss);

    return {
      passthroughFileCopy: true,
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
      dir: {
        input: "src",
        output: "public",
        includes: "_includes",
      },
    };
  };