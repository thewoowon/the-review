import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dcrt.news",
      lastModified: new Date(),
    },
  ];
}
