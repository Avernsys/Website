import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "./Footer";
import { AboutPageView } from "./pages/AboutPageView";

test("footer renders the shared brand logo asset", () => {
  const markup = renderToStaticMarkup(createElement(Footer, { locale: "en" }));

  assert.match(markup, /src="\/brand\/logo\.jpg"/);
});

test("about page renders the founder portrait assets", () => {
  const markup = renderToStaticMarkup(
    createElement(AboutPageView, { locale: "en" }),
  );

  assert.match(markup, /src="\/founders\/doruk\.jpg"/);
  assert.match(markup, /src="\/founders\/murat\.jpeg"/);
});
