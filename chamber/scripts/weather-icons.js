// “Line-art” style weather icons, in the site's colors
// (cobalt blue + vibrant orange), to replace OpenWeatherMap's cartoon-style PNGs.
//
// Usage: getWeatherIcon(code) returns an SVG string to be inserted
// directly into the DOM (innerHTML), where `code` is the
// `weather[0].icon` field returned by the API (e.g., “02d”, “10n”).

function getWeatherIcon(code) {
    const family = code.slice(0, 2);
    const isNight = code.endsWith("n");

    const icons = {
        // Clear skies
        "01": isNight ? moon() : sun(),
        // A few clouds
        "02": isNight ? cloudMoon() : cloudSun(),
        // Scattered clouds / overcast
        "03": cloud(),
        "04": cloud(),
        // Showers
        "09": cloudRain(),
        // Rain
        "10": cloudRain(),
        // Storm
        "11": cloudStorm(),
        // Snow
        "13": cloudSnow(),
        // Mist / fog
        "50": mist(),
    };

    return icons[family] || cloud();
}

function svgWrap(inner) {
    return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
}

function sun() {
    return svgWrap(`
        <circle cx="12" cy="12" r="4.5" stroke="var(--vibrant-orange)" stroke-width="1.6"/>
        <g stroke="var(--vibrant-orange)" stroke-width="1.6" stroke-linecap="round">
            <line x1="12" y1="1.5" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22.5"/>
            <line x1="1.5" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="22.5" y2="12"/>
            <line x1="4.2" y1="4.2" x2="6" y2="6"/>
            <line x1="18" y1="18" x2="19.8" y2="19.8"/>
            <line x1="19.8" y1="4.2" x2="18" y2="6"/>
            <line x1="6" y1="18" x2="4.2" y2="19.8"/>
        </g>
    `);
}

function moon() {
    return svgWrap(`
        <path d="M15.5 3.5a8.5 8.5 0 1 0 5 15.4 7 7 0 0 1-5-15.4Z"
              stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linejoin="round"/>
    `);
}

function cloud() {
    return svgWrap(cloudPath());
}

function cloudPath() {
    return `<path d="M6.5 18.5a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.66-2.2A4.5 4.5 0 0 1 17 18.5H6.5Z"
              stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linejoin="round"/>`;
}

function cloudSun() {
    return svgWrap(`
        <circle cx="7.5" cy="7" r="3" stroke="var(--vibrant-orange)" stroke-width="1.6"/>
        <g stroke="var(--vibrant-orange)" stroke-width="1.6" stroke-linecap="round">
            <line x1="7.5" y1="1.5" x2="7.5" y2="3"/>
            <line x1="2.5" y1="7" x2="4" y2="7"/>
            <line x1="3.4" y1="3.4" x2="4.5" y2="4.5"/>
        </g>
        <path d="M8 20a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.66-1.7A4.5 4.5 0 0 1 18.5 20H8Z"
              stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linejoin="round"/>
    `);
}

function cloudMoon() {
    return svgWrap(`
        <path d="M9.7 4.2A5 5 0 0 0 12.5 9 4.2 4.2 0 0 1 9.7 4.2Z"
              stroke="var(--cobalt-blue)" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="M8 20a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.66-1.7A4.5 4.5 0 0 1 18.5 20H8Z"
              stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linejoin="round"/>
    `);
}

function cloudRain() {
    return svgWrap(`
        ${cloudPath()}
        <g stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linecap="round">
            <line x1="9" y1="20" x2="8" y2="22.5"/>
            <line x1="13" y1="20" x2="12" y2="22.5"/>
            <line x1="17" y1="20" x2="16" y2="22.5"/>
        </g>
    `);
}

function cloudStorm() {
    return svgWrap(`
        ${cloudPath()}
        <path d="M13 14.5 10 19h3l-2 4 5-5.5h-3l2-3Z"
              stroke="var(--vibrant-orange)" stroke-width="1.4" stroke-linejoin="round" fill="var(--vibrant-orange)"/>
    `);
}

function cloudSnow() {
    return svgWrap(`
        ${cloudPath()}
        <g stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linecap="round">
            <line x1="9" y1="19.5" x2="9" y2="22.5"/>
            <line x1="7.7" y1="20.2" x2="10.3" y2="21.8"/>
            <line x1="10.3" y1="20.2" x2="7.7" y2="21.8"/>
            <line x1="15" y1="19.5" x2="15" y2="22.5"/>
            <line x1="13.7" y1="20.2" x2="16.3" y2="21.8"/>
            <line x1="16.3" y1="20.2" x2="13.7" y2="21.8"/>
        </g>
    `);
}

function mist() {
    return svgWrap(`
        <g stroke="var(--cobalt-blue)" stroke-width="1.6" stroke-linecap="round">
            <line x1="3" y1="8" x2="21" y2="8"/>
            <line x1="3" y1="12" x2="18" y2="12"/>
            <line x1="6" y1="16" x2="21" y2="16"/>
            <line x1="3" y1="20" x2="16" y2="20"/>
        </g>
    `);
}