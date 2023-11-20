import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://thereview.club",
      lastModified: new Date(),
    },
  ];
}
