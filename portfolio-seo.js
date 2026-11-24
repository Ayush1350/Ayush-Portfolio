import { profile } from "./src/portfolio.js";

const routes = ["/", "/about/", "/projects/", "/resume/"];

export function portfolioSeo(siteUrl) {
  const origin = siteUrl && new URL(siteUrl).origin;
  if (origin && !/^https?:\/\//.test(origin)) throw new Error("SITE_URL must be an HTTP(S) origin");
  return {
    name: "portfolio-seo",
    transformIndexHtml(html, context) {
      const path = context.path.replace(/index\.html$/, "");
      const title = html.match(/<title>(.*?)<\/title>/)[1];
      const description = html.match(/name="description"\s+content="([^"]+)"/)[1];
      const meta = (property, content) => ({ tag: "meta", attrs: { property, content } });
      const tags = [
        meta("og:title", title), meta("og:description", description),
        meta("og:type", "website"), meta("og:site_name", "Ayush Patel"),
        meta("og:image", (origin || "") + "/social-preview.png"),
        meta("og:image:alt", "Ayush Patel, Full Stack Developer in Ahmedabad"),
        {tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" }},
      ];
      if (origin) tags.push(meta("og:url", origin + path), {tag: "link", attrs: {rel: "canonical", href: origin + path}});
      if (path === "/") tags.push({ tag: "script", attrs: {type: "application/ld+json"}, children: JSON.stringify({
        "@context": "https://schema.org", "@graph": [
          {"@type": "Person", name: profile.name, jobTitle: profile.role, sameAs: [profile.github, profile.linkedin], url: origin || undefined},
          {"@type": "WebSite", name: "Ayush Patel’s portfolio", url: origin || undefined},
        ],
      }) });
      return tags;
    },
    generateBundle() {
      const sitemap = origin ? "Sitemap: " + origin + "/sitemap.xml\n" : "";
      this.emitFile({type: "asset", fileName: "robots.txt", source: "User-agent: *\nAllow: /\n" + sitemap});
      if (origin) this.emitFile({type: "asset", fileName: "sitemap.xml", source:
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
        routes.map(path => "<url><loc>" + origin + path + "</loc></url>").join("") + "</urlset>"});
    },
  };
}
