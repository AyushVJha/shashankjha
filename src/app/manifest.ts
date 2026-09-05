import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Chambers of SSJ — Advocate Shashank Shekhar Jha",
    short_name: "Chambers of SSJ",
    description:
      "Official website of Advocate Shashank Shekhar Jha — Supreme Court lawyer, PIL filer, and constitutional rights advocate.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#0F1724",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
