import test from "node:test";
import assert from "node:assert/strict";
import {
  getPagePath,
  getPathnameLocale,
  localizePath,
  stripLocaleFromPathname,
  switchLocalePathname,
} from "./i18n";

test("localizePath keeps English unprefixed and prefixes Turkish paths", () => {
  assert.equal(localizePath("en", "/contact"), "/contact");
  assert.equal(localizePath("tr", "/contact"), "/tr/contact");
  assert.equal(localizePath("tr", "/"), "/tr");
});

test("getPagePath maps page keys to locale-aware routes", () => {
  assert.equal(getPagePath("en", "home"), "/");
  assert.equal(getPagePath("tr", "about"), "/tr/about");
});

test("pathname locale helpers detect and switch locale paths", () => {
  assert.equal(getPathnameLocale("/tr/contact"), "tr");
  assert.equal(getPathnameLocale("/contact"), "en");
  assert.equal(stripLocaleFromPathname("/tr/contact"), "/contact");
  assert.equal(switchLocalePathname("/tr/contact", "en"), "/contact");
  assert.equal(switchLocalePathname("/about", "tr"), "/tr/about");
});
