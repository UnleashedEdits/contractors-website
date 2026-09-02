import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("../", import.meta.url);
const names = await readdir(root);
const htmlFiles = names.filter((name) => extname(name) === ".html");
const expected = ["index.html", "services.html", "residential.html", "commercial.html", "projects.html", "credentials.html", "service-areas.html", "faq.html", "contact.html", "privacy.html", "404.html"];
const missing = expected.filter((name) => !htmlFiles.includes(name));
const errors = [];

if (missing.length) errors.push(`Missing pages: ${missing.join(", ")}`);

for (const file of htmlFiles) {
  const html = await readFile(new URL(file, root), "utf8");
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${file}: missing title`);
  if (!/name="robots" content="noindex,nofollow"/i.test(html)) errors.push(`${file}: preview must remain noindex`);
  if (file !== "404.html" && !/data-site-footer/.test(html)) errors.push(`${file}: missing shared footer mount`);
  const localLinks = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)]
    .map((match) => match[1])
    .filter((href) => !/^(?:https?:|mailto:|tel:|data:)/.test(href));
  for (const href of localLinks) {
    const clean = href.split("?")[0];
    try { await readFile(new URL(clean, root)); }
    catch { errors.push(`${file}: broken local reference ${href}`); }
  }
}

const app = await readFile(new URL("app.js", root), "utf8");
const config = await readFile(new URL("business-config.js", root), "utf8");
new Function(app);
new Function(config);

for (const requiredField of ["property", "location", "service", "urgency", "contact", "photos"]) {
  const home = await readFile(new URL("index.html", root), "utf8");
  if (!new RegExp(requiredField, "i").test(home)) errors.push(`index.html: quote form missing ${requiredField}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${htmlFiles.length} HTML pages, local links, metadata, JavaScript syntax, and quote fields checked.`);
}
