import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";
import { resolveTheme, themeInitializationScript, THEME_STORAGE_KEY, getTheme, setTheme, subscribeTheme } from "../src/lib/theme.ts";

test("saved preference wins; missing or invalid preference follows the device", () => {
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("invalid", false), "light");
});

for (const { saved, dark, blocked, expected } of [
  { saved: "dark", dark: false, expected: "dark" },
  { saved: "light", dark: true, expected: "light" },
  { saved: null, dark: true, expected: "dark" },
  { saved: "invalid", dark: false, expected: "light" },
  { blocked: true, dark: true, expected: "dark" },
]) {
  test(`before-paint script: ${JSON.stringify({ saved, dark, blocked })}`, () => {
    const document = { documentElement: { dataset: {} } };
    vm.runInNewContext(themeInitializationScript, {
      document,
      localStorage: { getItem() { if (blocked) throw new Error("Storage blocked"); return saved; } },
      window: { matchMedia: () => ({ matches: dark }) },
    });
    assert.equal(document.documentElement.dataset.theme, expected);
  });
}

test("toggle, persistence, device changes, other tabs, and blocked storage", () => {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  const storage = new Map();
  const media = Object.assign(new EventTarget(), { matches: false });
  const window = Object.assign(new EventTarget(), {
    matchMedia: () => media,
    localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  });
  globalThis.window = window;
  globalThis.document = { documentElement: { dataset: { theme: "light" } } };
  let updates = 0;
  const unsubscribe = subscribeTheme(() => updates++);
  try {
    media.matches = true;
    media.dispatchEvent(new Event("change"));
    assert.equal(getTheme(), "dark");
    setTheme("light");
    assert.equal(storage.get(THEME_STORAGE_KEY), "light");
    media.dispatchEvent(new Event("change"));
    assert.equal(getTheme(), "light", "device must not override a saved choice");
    storage.set(THEME_STORAGE_KEY, "dark");
    window.dispatchEvent(Object.assign(new Event("storage"), { key: THEME_STORAGE_KEY, newValue: "dark", storageArea: window.localStorage }));
    assert.equal(getTheme(), "dark");
    storage.clear();
    media.matches = false;
    window.dispatchEvent(Object.assign(new Event("storage"), { key: null, newValue: null, storageArea: window.localStorage }));
    assert.equal(getTheme(), "light");
    window.localStorage.setItem = () => { throw new Error("Blocked"); };
    assert.doesNotThrow(() => setTheme("dark"));
    media.dispatchEvent(new Event("change"));
    assert.equal(getTheme(), "dark", "manual choice survives a storage write failure");
    window.localStorage.getItem = () => { throw new Error("Blocked"); };
    assert.doesNotThrow(() => setTheme("dark"));
    media.dispatchEvent(new Event("change"));
    assert.equal(getTheme(), "dark", "manual choice survives blocked storage during this session");
    const previousUpdates = updates;
    unsubscribe();
    window.dispatchEvent(new Event("portfolio-blog:theme-change"));
    assert.equal(updates, previousUpdates, "listeners must be cleaned up");
  } finally {
    unsubscribe();
    globalThis.window = previousWindow;
    globalThis.document = previousDocument;
  }
});

test("every CSS color token is defined, and dark theme includes readable surfaces", () => {
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const tokens = readFileSync(new URL("../src/app/theme.css", import.meta.url), "utf8");
  const defined = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]));
  for (const [, token] of css.matchAll(/var\((--[\w-]+)\)/g)) assert.ok(defined.has(token), `Undefined token: ${token}`);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i, "component colors belong in theme.css");
  const dark = tokens.split(':root[data-theme="dark"]')[1];
  for (const token of ["--background", "--foreground", "--surface", "--line", "--muted", "--accent"]) assert.ok(dark.includes(`${token}:`));
});

test("primary and secondary body text meet 4.5:1 contrast in both themes", () => {
  const tokens = readFileSync(new URL("../src/app/theme.css", import.meta.url), "utf8");
  const [lightSource, darkSource] = tokens.split(':root[data-theme="dark"]');
  const palette = (source) => Object.fromEntries([...source.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6});/g)].map(([, key, value]) => [key, value]));
  const light = palette(lightSource);
  const dark = { ...light, ...palette(darkSource) };
  const luminance = (hex) => {
    const [r, g, b] = hex.slice(1).match(/../g).map((part) => {
      const value = parseInt(part, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  for (const [name, colors] of [["light", light], ["dark", dark]]) {
    for (const text of ["foreground", "muted", "text-subtle"]) {
      for (const background of ["background", "surface", "surface-soft"]) {
        const a = luminance(colors[text]);
        const b = luminance(colors[background]);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        assert.ok(ratio >= 4.5, `${name}: ${text} on ${background} contrast ${ratio.toFixed(2)}`);
      }
    }
  }
});
