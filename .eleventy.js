const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    const markdown = markdownIt({
        html: true,
        breaks: false,
        linkify: true,
    });

    eleventyConfig.addPassthroughCopy({ "assets": "assets" });
    eleventyConfig.addPassthroughCopy({ "index.html": "index.html" });
    eleventyConfig.addPassthroughCopy({ "media": "media" });
    eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
    eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
    eleventyConfig.addFilter("markdown", (value) => markdown.render(value || ""));

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "dist"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};