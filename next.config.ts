import type { NextConfig } from "next";

// Adresele vechi de pe germanlingua.md duc la paginile noi, ca să nu se piardă linkurile din Google.
const oldUrls: Record<string, string> = {
  "/cursuri-limba-germana": "/ro/courses",
  "/curs-limba-germana-a1": "/ro/courses/a1",
  "/curs-limba-germana-a2": "/ro/courses/a2",
  "/curs-limba-germana-b1": "/ro/courses/b1",
  "/curs-limba-germana-b2": "/ro/courses/b2",
  "/curs-limba-germana-c1": "/ro/courses/c1",
  "/cursuri-limba-germana-online": "/ro/courses/online",
  "/cursuri-de-limba-germana-in-grup-cu-prezenta-fizica": "/ro/courses/group",
  "/curs-limba-germana-individual-semiindividual": "/ro/courses/individual",
  "/curs-limba-germana-pregatire-pentru-teste": "/ro/courses/exams",
  "/cursuri-limba-germana-medicala": "/ro/courses/medical",
  "/cursuri-limba-germana-pentru-companii": "/ro/courses/business",
  "/despre-noi1": "/ro/about",
  "/contacte": "/ro/contact",
  "/inscriere-curs-limba-germana": "/ro/enroll",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Limbile scoase (germană, engleză) duc la varianta în română.
      { source: "/:lang(de|en)", destination: "/ro", permanent: false },
      { source: "/:lang(de|en)/:path*", destination: "/ro/:path*", permanent: false },
      ...Object.entries(oldUrls).map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
