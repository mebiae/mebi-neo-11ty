const pluginRss = require("@11ty/eleventy-plugin-rss");
const sass = require("sass");
const path = require("node:path");
const browserlist = require("browserslist");
const { bundle, transform, browserslistToTargets, composeVisitors } = require("lightningcss");
const { type } = require("node:os");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {

    let mdOptions = {
      html: true,
      breaks: true,
      linkify: true
    };

    eleventyConfig.setLibrary("md", markdownIt(mdOptions))

    // De-index.html the output
    eleventyConfig.addGlobalData("permalink", () => {
      return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    // Add Sass support
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
      outputFileExtension: "css",

      compile: async function(inputContent, inputPath) {
        let parsed = path.parse(inputPath);
        if (parsed.name.startsWith("_")) {
          return;
        }

        let result = sass.compileString(inputContent, {
          loadPaths: [parsed.dir || "."],
          sourceMap: false,
        });

        this.addDependencies(inputPath, result.loadedUrls);

        let targets = browserslistToTargets(browserlist("> 0.2% and not dead"))

        return async () => {
          let { code } = await transform({
            code: Buffer.from(result.css),
            minify: true,
            sourceMap: false,
            targets,
          });
          return code;
        };
      },
    });

    // Minify CSS if it ends with "min.css"
    eleventyConfig.addTemplateFormats("min.css");
    eleventyConfig.addExtension("min.css", {
      outputFileExtension: "min.css",

      compile: async function(_inputContent, inputPath) {
        
        let targets = browserslistToTargets(browserlist("> 0.2% and not dead"))

        return async () => {
          let { code } = await bundle({
            filename: inputPath,
            minify: true,
            sourceMap: false,
            targets,
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
      "css"
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
    
    // Shortcodes
    eleventyConfig.addShortcode(
      "logHTML",
      function (info) {

        let bulletList
        let globaL

        if (Array.isArray(info)) {
          bulletList = info.map((l) => `<li>${l}</li>`).join("");
        } else if (typeof info == "string") {
          bulletList = `<li>${info}</li>`;
        }
        
        // Not the best way, I just want to end this. (indented bullet items)
        bulletList = bulletList.replaceAll("-/", "<ul>");
        bulletList = bulletList.replaceAll("/-", "</ul>");
        bulletList = bulletList.replaceAll("~~", "<li>");
        bulletList = bulletList.replaceAll("~", "</li>");

        //let final = new markdownIt().render(bulletList);

        return `
        <ul>
        ${bulletList}
        </ul>
        `
      }
    );

    // Plugins
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