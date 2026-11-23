import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/lib/library";
import { services } from "@/lib/services";
import { doctors, practices, siteUrl } from "@/lib/site";

const staticPaths: [string, number][] = [
  ["/", 1.0],
  ["/about", 0.8],
  ["/doctors", 0.8],
  ["/services", 0.9],
  ["/practices", 0.9],
  ["/patient-information", 0.7],
  ["/health-library", 0.7],
  ["/contact", 0.8],
  ["/appointment", 0.9],
  ["/privacy-policy", 0.3],
  ["/popia-notice", 0.3],
  ["/terms-and-conditions", 0.3],
  ["/medical-disclaimer", 0.3],
  ["/cookie-policy", 0.2],
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths: [string, number][] = [
          ...staticPaths,
          ...doctors.map((d) => [`/doctors/${d.slug}`, 0.7] as [string, number]),
          ...services.map((s) => [`/services/${s.slug}`, 0.7] as [string, number]),
          ...practices.map((p) => [`/practices/${p.slug}`, 0.9] as [string, number]),
          ...articles.map((a) => [`/health-library/${a.slug}`, 0.5] as [string, number]),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map(
            ([p, pr]) =>
              `  <url><loc>${siteUrl}${p === "/" ? "/" : p}</loc><priority>${pr.toFixed(1)}</priority></url>`,
          )
          .join("\n")}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
