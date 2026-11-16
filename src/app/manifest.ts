import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ovels",
    short_name: "Ovels",
    description: "Indie software studio by Ishan Jaiswal: a free Discord bot and an AI fitness coach app.",
    start_url: "/",
    display: "browser",
    background_color: "#04130e",
    theme_color: "#04130e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
