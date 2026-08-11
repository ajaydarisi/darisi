import { ImageResponse } from "next/og";
import { seoConfig } from "@/lib/seo";
import { skillAreas } from "@/lib/site-content";

// Required for `output: "export"`, same as sitemap.ts and robots.ts.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = seoConfig.ogImageAlt;

// Design-system roles. Kept literal because Satori resolves no CSS variables.
const CANVAS = "#0F2724";
const TEXT = "#F6F2EA";
const SUPPORTING = "#C8DAD6";
const ACCENT = "#DDA082";
const RULE = "#2A4A47";

// The brand D, identical to the path in logo.svg / icon.svg.
const D_PATH =
  "M 120 56 L 120 456 C 460 456 460 56 120 56 Z M 192 120 L 192 392 C 400 392 400 120 192 120 Z";

/**
 * The social card every share of the site produces. Generated from `seoConfig`
 * at build time rather than hand-authored, because the PNG this replaced still
 * advertised a studio identity the site had been repositioned away from months
 * earlier — the same drift that left the favicon and wordmark stale.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: CANVAS,
          padding: "0 88px",
        }}
      >
        {/* Eyebrow: short rule + role and location */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 2, background: ACCENT }} />
          <div
            style={{
              fontSize: 25,
              letterSpacing: 5,
              color: SUPPORTING,
              textTransform: "uppercase",
            }}
          >
            {`${seoConfig.jobTitle} · ${seoConfig.location.city}, ${seoConfig.location.country}`}
          </div>
        </div>

        {/* Name + accent dot, mirroring the hero lockup */}
        <div style={{ display: "flex", alignItems: "flex-end", marginTop: 26 }}>
          <div style={{ fontSize: 116, color: TEXT, letterSpacing: -3, lineHeight: 1.1 }}>
            {seoConfig.personName}
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: ACCENT,
              marginLeft: 18,
              marginBottom: 22,
            }}
          />
        </div>

        <div style={{ width: "100%", height: 1, background: RULE, marginTop: 40 }} />

        {/* What the work actually is, straight from the shared skill areas */}
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          {skillAreas.map((area) => (
            <div
              key={area.title}
              style={{
                display: "flex",
                border: `1px solid ${RULE}`,
                color: SUPPORTING,
                fontSize: 23,
                padding: "13px 22px",
              }}
            >
              {area.title}
            </div>
          ))}
        </div>

        {/* Brand mark, bottom-right */}
        <div style={{ display: "flex", position: "absolute", right: 88, top: 76 }}>
          {/* Same centred viewBox as icon.svg — the glyph's ink box is
              x 120..375, so the default 0 0 512 512 frame renders it clipped. */}
          <svg width="96" height="96" viewBox="-38.5 -30 572 572">
            <path fillRule="evenodd" clipRule="evenodd" d={D_PATH} fill={SUPPORTING} />
            <circle cx="427" cy="416" r="40" fill={ACCENT} />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
