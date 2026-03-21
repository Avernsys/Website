import test from "node:test";
import assert from "node:assert/strict";
import robots from "./robots";
import sitemap from "./sitemap";

test("publishes a crawlable robots policy with sitemap", () => {
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules];

  assert.equal(result.host, "https://avernsys.com");
  assert.equal(result.sitemap, "https://avernsys.com/sitemap.xml");
  assert.equal(rules[0]?.allow, "/");
});

test("publishes sitemap entries for every indexable page", () => {
  const entries = sitemap();

  assert.equal(entries.length, 5);
  assert.equal(entries[0]?.url, "https://avernsys.com/");
  assert.ok(entries.every((entry) => entry.lastModified instanceof Date));
});
