const fs = require("node:fs");
const path = require("node:path");

const postsDirectory = path.join(process.cwd(), "content", "blog");
const requiredPostFields = [
    ["slug"],
    ["status"],
    ["publishDate"],
];

function getValueAtPath(entry, fieldPath) {
    return fieldPath.reduce((currentValue, segment) => {
        if (currentValue == null || typeof currentValue !== "object") {
            return undefined;
        }

        return currentValue[segment];
    }, entry);
}

function readRequiredString(entry, fieldPaths, filename, label, trimValue = true) {
    for (const fieldPath of fieldPaths) {
        const value = getValueAtPath(entry, fieldPath);

        if (typeof value === "string" && value.trim() !== "") {
            return trimValue ? value.trim() : value;
        }
    }

    throw new Error(`Missing required field \"${label}\" in ${filename}`);
}

module.exports = function () {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const seenSlugs = new Set();

    return fs
        .readdirSync(postsDirectory)
        .filter((filename) => filename.endsWith(".json"))
        .map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const entry = JSON.parse(fs.readFileSync(filePath, "utf8"));

            for (const fieldPath of requiredPostFields) {
                readRequiredString(entry, [fieldPath], filename, fieldPath.join("."));
            }

            const slug = readRequiredString(entry, [["slug"]], filename, "slug");

            if (seenSlugs.has(slug)) {
                throw new Error(`Duplicate blog slug \"${slug}\" in ${filename}`);
            }

            seenSlugs.add(slug);

            return {
                slug,
                status: readRequiredString(entry, [["status"]], filename, "status").toLowerCase(),
                publishDate: readRequiredString(entry, [["publishDate"]], filename, "publishDate"),
                dateLabelEl: readRequiredString(entry, [["greek", "dateLabel"], ["dateLabelEl"]], filename, "greek.dateLabel"),
                dateLabelEn: readRequiredString(entry, [["english", "dateLabel"], ["dateLabelEn"]], filename, "english.dateLabel"),
                categoryEl: readRequiredString(entry, [["greek", "category"], ["categoryEl"]], filename, "greek.category"),
                categoryEn: readRequiredString(entry, [["english", "category"], ["categoryEn"]], filename, "english.category"),
                titleEl: readRequiredString(entry, [["greek", "title"], ["titleEl"]], filename, "greek.title"),
                titleEn: readRequiredString(entry, [["english", "title"], ["titleEn"]], filename, "english.title"),
                excerptEl: readRequiredString(entry, [["greek", "excerpt"], ["excerptEl"]], filename, "greek.excerpt"),
                excerptEn: readRequiredString(entry, [["english", "excerpt"], ["excerptEn"]], filename, "english.excerpt"),
                seoTitleEl: readRequiredString(entry, [["greek", "seoTitle"], ["seoTitleEl"]], filename, "greek.seoTitle"),
                seoTitleEn: readRequiredString(entry, [["english", "seoTitle"], ["seoTitleEn"]], filename, "english.seoTitle"),
                seoDescriptionEl: readRequiredString(entry, [["greek", "seoDescription"], ["seoDescriptionEl"]], filename, "greek.seoDescription"),
                seoDescriptionEn: readRequiredString(entry, [["english", "seoDescription"], ["seoDescriptionEn"]], filename, "english.seoDescription"),
                bodyEl: readRequiredString(entry, [["greek", "body"], ["bodyEl"]], filename, "greek.body", false),
                bodyEn: readRequiredString(entry, [["english", "body"], ["bodyEn"]], filename, "english.body", false),
                tagStyle: ((entry.tagStyle || "default") + "").trim(),
                cardTheme: ((entry.cardTheme || "default") + "").trim(),
            };
        })
        .sort((left, right) => {
            return new Date(right.publishDate) - new Date(left.publishDate);
        });
};