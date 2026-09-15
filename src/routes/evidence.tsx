import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/evidence.html?raw";
import script from "@/content/evidence.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Before & After Evidence — CivicTrace" },
      {
        name: "description",
        content:
          "Side-by-side before and after evidence with GPS coordinates, timestamps and verification hashes.",
      },
      { property: "og:title", content: "Before & After Evidence — CivicTrace" },
      {
        property: "og:description",
        content: "Compare the original report photo against the completed repair proof.",
      },
    ],
  }),
  component: () => (
    <DesignPage html={html} script={script} backTo="/my-complaints" backLabel="Back to My Complaints" />
  ),
});
