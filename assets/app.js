const toggle = document.getElementById("lang-toggle");
const html = document.documentElement;
const title = document.getElementById("page-title");
const metaDescription = document.getElementById("meta-description");
const scrollTopButton = document.getElementById("scroll-top");

let currentLang = "el";

function detectPreferredLanguage() {
    const candidates = Array.isArray(navigator.languages)
        ? navigator.languages
        : [navigator.language || "el"];
    const normalized = candidates
        .filter(Boolean)
        .map((value) => value.toLowerCase());
    const prefersEnglish = normalized.some((value) => value.startsWith("en"));
    const prefersGreek = normalized.some((value) => value.startsWith("el"));

    if (prefersEnglish && !prefersGreek) {
        return "en";
    }

    return "el";
}

function setLanguage(lang) {
    currentLang = lang;
    html.lang = lang;

    document.querySelectorAll("[data-el]").forEach((el) => {
        el.textContent = el.getAttribute("data-" + lang);
    });

    if (lang === "el") {
        title.textContent =
            "AccessCity — Χαρτογράφηση & βελτίωση αστικής προσβασιμότητας";
        metaDescription.content =
            "Το AccessCity μετατρέπει παρατηρήσεις σε δομημένα δεδομένα για πιο προσβάσιμες πόλεις.";
        toggle.textContent = "EN";
        toggle.setAttribute("aria-label", "Change language to English");
    } else {
        title.textContent = "AccessCity — Urban Accessibility Data Platform";
        metaDescription.content =
            "AccessCity turns accessibility observations into structured data that supports inclusive cities.";
        toggle.textContent = "EL";
        toggle.setAttribute("aria-label", "Αλλαγή γλώσσας στα Ελληνικά");
    }
}

toggle.addEventListener("click", () => {
    setLanguage(currentLang === "el" ? "en" : "el");
});

setLanguage(detectPreferredLanguage());

if (scrollTopButton) {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const toggleScrollTop = () => {
        const shouldShow = window.scrollY > 480;
        scrollTopButton.classList.toggle("is-visible", shouldShow);
    };

    toggleScrollTop();

    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    });
}

document.getElementById("copyright").textContent =
    "© " + new Date().getFullYear() + " AccessCity";
