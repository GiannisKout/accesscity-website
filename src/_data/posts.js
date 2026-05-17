const fs = require("node:fs");
const path = require("node:path");

const postsDirectory = path.join(process.cwd(), "content", "blog");
const requiredFields = [
    "slug",
    "status",
    "publishDate",
    "dateLabelEl",
    "dateLabelEn",
    "categoryEl",
    "categoryEn",
    "titleEl",
    "titleEn",
    "excerptEl",
    "excerptEn",
    "seoTitleEl",
    "seoTitleEn",
    "seoDescriptionEl",
    "seoDescriptionEn",
    "bodyEl",
    "bodyEn",
];

function assertField(entry, fieldName, filename) {
    const value = entry[fieldName];

    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`Missing required field \"${fieldName}\" in ${filename}`);
    }

    return value.trim();
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

            for (const fieldName of requiredFields) {
                assertField(entry, fieldName, filename);
            }

            const slug = entry.slug.trim();

            if (seenSlugs.has(slug)) {
                throw new Error(`Duplicate blog slug \"${slug}\" in ${filename}`);
            }

            seenSlugs.add(slug);

            return {
                slug,
                status: entry.status.trim().toLowerCase(),
                publishDate: entry.publishDate.trim(),
                dateLabelEl: entry.dateLabelEl.trim(),
                dateLabelEn: entry.dateLabelEn.trim(),
                categoryEl: entry.categoryEl.trim(),
                categoryEn: entry.categoryEn.trim(),
                titleEl: entry.titleEl.trim(),
                titleEn: entry.titleEn.trim(),
                excerptEl: entry.excerptEl.trim(),
                excerptEn: entry.excerptEn.trim(),
                seoTitleEl: entry.seoTitleEl.trim(),
                seoTitleEn: entry.seoTitleEn.trim(),
                seoDescriptionEl: entry.seoDescriptionEl.trim(),
                seoDescriptionEn: entry.seoDescriptionEn.trim(),
                bodyEl: entry.bodyEl,
                bodyEn: entry.bodyEn,
                tagStyle: (entry.tagStyle || "default").trim(),
                cardTheme: (entry.cardTheme || "default").trim(),
            };
        })
        .sort((left, right) => {
            return new Date(right.publishDate) - new Date(left.publishDate);
        });
};