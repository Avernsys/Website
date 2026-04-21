import test from "node:test";
import assert from "node:assert/strict";
import {
  buildIndexNowPayload,
  getDefaultIndexNowUrls,
  getIndexNowConfig,
} from "./indexnow";

function createEnv(values: Record<string, string>): NodeJS.ProcessEnv {
  return values as unknown as NodeJS.ProcessEnv;
}

test("builds IndexNow config from env", () => {
  const config = getIndexNowConfig(
    createEnv({
      INDEXNOW_KEY: "indexnow-key",
      INDEXNOW_ENDPOINT: "https://example.com/indexnow",
    }),
  );

  assert.equal(config.endpoint, "https://example.com/indexnow");
  assert.equal(config.key, "indexnow-key");
  assert.equal(config.keyLocation, "https://avernsys.com/indexnow-key.txt");
});

test("builds an IndexNow payload with deduplicated absolute URLs", () => {
  const payload = buildIndexNowPayload(
    ["/flowsys", "https://avernsys.com/flowsys", "/tr/flowsys"],
    createEnv({
      INDEXNOW_KEY: "indexnow-key",
    }),
  );

  assert.ok(payload);
  assert.equal(payload?.key, "indexnow-key");
  assert.deepEqual(payload?.urlList, [
    "https://avernsys.com/flowsys",
    "https://avernsys.com/tr/flowsys",
  ]);
});

test("returns undefined when IndexNow is not configured", () => {
  const payload = buildIndexNowPayload(["/"], createEnv({}));

  assert.equal(payload, undefined);
});

test("provides default IndexNow URLs for every supported locale", () => {
  const urls = getDefaultIndexNowUrls();

  assert.equal(urls.length, 24);
  assert.ok(urls.includes("https://avernsys.com/flowsys"));
  assert.ok(urls.includes("https://avernsys.com/about/doruk-yalcin"));
  assert.ok(urls.includes("https://avernsys.com/tr/flowsys"));
  assert.ok(urls.includes("https://avernsys.com/de/flowsys"));
  assert.ok(urls.includes("https://avernsys.com/nl/flowsys"));
  assert.equal(urls.some((url) => url.includes("chaptersys")), false);
});
