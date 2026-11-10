export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-blog.theme";
const THEME_EVENT = "portfolio-blog:theme-change";
let sessionPreference: Theme | null = null;

export function resolveTheme(saved: string | null, systemDark: boolean): Theme {
  return saved === "light" || saved === "dark" ? saved : systemDark ? "dark" : "light";
}

// Runs in <head> before the first paint. Keep storage access optional.
export const themeInitializationScript = `(function(){var saved=null;try{saved=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}var dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=saved==='light'||saved==='dark'?saved:dark?'dark':'light'})()`;

function readPreference(): Theme | null {
  if (sessionPreference !== null) return sessionPreference;
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return sessionPreference;
  }
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getServerTheme(): Theme {
  return "light";
}

export function setTheme(theme: Theme) {
  sessionPreference = theme;
  document.documentElement.dataset.theme = theme;
  try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* Theme still works for this session. */ }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncSystem = () => {
    if (readPreference() === null) document.documentElement.dataset.theme = resolveTheme(null, media.matches);
    onChange();
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    if (event.storageArea && event.storageArea !== window.localStorage) return;
    sessionPreference = event.newValue === "light" || event.newValue === "dark" ? event.newValue : null;
    document.documentElement.dataset.theme = resolveTheme(sessionPreference, media.matches);
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", syncStorage);
  media.addEventListener("change", syncSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", syncStorage);
    media.removeEventListener("change", syncSystem);
  };
}
