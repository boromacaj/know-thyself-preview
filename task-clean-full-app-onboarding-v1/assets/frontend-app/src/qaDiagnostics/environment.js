/*
 * Which browser is this, really? Every iPhone browser renders with the same WebKit, but they differ in the shell around it (toolbars,
 * keyboard handling, web view flags, missing APIs). Messenger and Instagram open links in a WKWebView that is NOT Safari.
 * Pure function over the user-agent string so it is unit-tested without a device.
 */
const match = (ua, pattern) => {
    const result = pattern.exec(ua);
    return result ? result[1] ?? '' : null;
};
export function classifyUserAgent(ua, hints = {}) {
    const notes = [];
    const iphone = /iPhone/.test(ua);
    const ipad = /iPad/.test(ua);
    const ipod = /iPod/.test(ua);
    const desktopModeIpad = /Macintosh/.test(ua) && (hints.maxTouchPoints ?? 0) > 1;
    const ios = iphone || ipad || ipod || desktopModeIpad;
    const device = iphone ? 'iPhone' : ipad ? 'iPad' : ipod ? 'iPod' : desktopModeIpad ? 'iPad-desktop-mode' : null;
    const osVersion = match(ua, /OS (\d+[_.]\d+(?:[_.]\d+)?)/);
    const iosVersion = ios
        ? (osVersion ? osVersion.replace(/_/g, '.') : match(ua, /Version\/(\d+(?:\.\d+)*)/))
        : null;
    if (desktopModeIpad)
        notes.push('iPadOS "Request Desktop Website": the user agent says Macintosh, the touch points say iPad');
    if (hints.standalone)
        notes.push('launched from the home screen (standalone web app)');
    let browser = 'other';
    let browserVersion = null;
    let inAppBrowser = false;
    if (ios) {
        if (/MessengerForiOS|FBAN\/Messenger|Orca-iOS|MessengerLiteForiOS/.test(ua)) {
            browser = 'messenger-iab';
            inAppBrowser = true;
        }
        else if (/FBAN|FBAV|FB_IAB|FBIOS/.test(ua)) {
            browser = 'facebook-iab';
            inAppBrowser = true;
        }
        else if (/Instagram/.test(ua)) {
            browser = 'instagram-iab';
            inAppBrowser = true;
        }
        else if (/musical_ly|BytedanceWebview|TikTok|trill/i.test(ua)) {
            browser = 'tiktok-iab';
            inAppBrowser = true;
        }
        else if (/\bLine\//.test(ua)) {
            browser = 'line-iab';
            inAppBrowser = true;
        }
        else if (/Snapchat/.test(ua)) {
            browser = 'snapchat-iab';
            inAppBrowser = true;
        }
        else if (/LinkedInApp/.test(ua)) {
            browser = 'linkedin-iab';
            inAppBrowser = true;
        }
        else if (/Twitter/.test(ua)) {
            browser = 'twitter-iab';
            inAppBrowser = true;
        }
        else if (/CriOS\//.test(ua)) {
            browser = 'chrome-ios';
            browserVersion = match(ua, /CriOS\/([\d.]+)/);
        }
        else if (/FxiOS\//.test(ua)) {
            browser = 'firefox-ios';
            browserVersion = match(ua, /FxiOS\/([\d.]+)/);
        }
        else if (/EdgiOS\//.test(ua)) {
            browser = 'edge-ios';
            browserVersion = match(ua, /EdgiOS\/([\d.]+)/);
        }
        else if (/OPiOS\//.test(ua)) {
            browser = 'opera-ios';
            browserVersion = match(ua, /OPiOS\/([\d.]+)/);
        }
        else if (/Safari\//.test(ua) && /Version\//.test(ua)) {
            browser = 'safari';
            browserVersion = match(ua, /Version\/([\d.]+)/);
        }
        else {
            browser = 'ios-webview-other';
            inAppBrowser = true;
            notes.push('iOS user agent without a Safari token: a WKWebView embedded in another app');
        }
        if (inAppBrowser)
            notes.push('in-app browser: Safari-only features, toolbars and permission prompts may be absent or different');
        if (browser === 'chrome-ios' || browser === 'firefox-ios' || browser === 'edge-ios' || browser === 'opera-ios') {
            notes.push('third-party iOS browser: rendering is Apple WebKit, the shell (toolbar, keyboard, gestures) is not Safari');
        }
    }
    else if (/SamsungBrowser\//.test(ua)) {
        browser = 'samsung-internet';
        browserVersion = match(ua, /SamsungBrowser\/([\d.]+)/);
    }
    else if (/Android/.test(ua) && /Chrome\//.test(ua)) {
        browser = 'chrome-android';
        browserVersion = match(ua, /Chrome\/([\d.]+)/);
    }
    else if (/Firefox\//.test(ua)) {
        browser = 'firefox-desktop';
        browserVersion = match(ua, /Firefox\/([\d.]+)/);
    }
    else if (/Chrome\//.test(ua)) {
        browser = 'chromium-desktop';
        browserVersion = match(ua, /Chrome\/([\d.]+)/);
    }
    else if (/Safari\//.test(ua) && /Version\//.test(ua)) {
        browser = 'safari-desktop';
        browserVersion = match(ua, /Version\/([\d.]+)/);
    }
    const engine = ios
        ? 'webkit-ios'
        : /Firefox\//.test(ua)
            ? 'gecko'
            : /Chrome\//.test(ua)
                ? 'blink'
                : /AppleWebKit\//.test(ua)
                    ? 'webkit-desktop'
                    : 'unknown';
    return { ios, iosVersion, device, browser, browserVersion, inAppBrowser, engine, notes };
}
/** Parses an iOS version string ("17.4.1") into a comparable number, or null. */
export function iosMajorMinor(version) {
    if (!version)
        return null;
    const [major, minor] = version.split('.');
    const parsed = Number(major) + Number(minor ?? 0) / 100;
    return Number.isFinite(parsed) ? parsed : null;
}
/**
 * Hosts on which the diagnostics may run even when a build carries them: the local machine, a private network address used to test
 * from a phone on the same Wi-Fi, and the review hosting. Anything else (a production domain) is refused at runtime.
 */
export function isQaHost(hostname) {
    const host = hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1' || host.endsWith('.localhost'))
        return true;
    if (/^10\.\d+\.\d+\.\d+$/.test(host) || /^192\.168\.\d+\.\d+$/.test(host) || /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/.test(host))
        return true;
    if (host.endsWith('.local'))
        return true;
    return host.endsWith('.github.io') || host.endsWith('.pages.dev');
}
