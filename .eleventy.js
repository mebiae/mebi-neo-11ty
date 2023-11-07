module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy("./src/js");

    return {
    passthroughFileCopy: true,
      dir: {
        input: "src",
        output: "public",
        includes: "_includes",
      },
    };
  };