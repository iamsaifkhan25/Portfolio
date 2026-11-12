import type { Metadata } from "next";

export const siteUrl = "https://saifkhans.netlify.app";
export const socialImageAlt = "Saif Khan - I build things I'm curious about.";
const socialImage = { url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: socialImageAlt };

// Netlify supplies CONTEXT at build time. Production remains indexable.
export const isPreviewDeploy = process.env.CONTEXT === "branch-deploy"
  || process.env.CONTEXT === "deploy-preview";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website",
      siteName: "Saif Khan",
      title: `${title} | Saif Khan`,
      description,
      url: `${siteUrl}${path}`,
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title: `${title} | Saif Khan`, description, images: [socialImage] },
  };
}
