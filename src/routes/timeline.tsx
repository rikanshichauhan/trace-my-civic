import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/timeline.html?raw";
import script from "@/content/timeline.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Complaint Timeline — CivicTrace" },
      {
        name: "description",
        content:
          "The full tamper-evident timeline of a complaint: filing, assignment, field work and verification.",
      },
      { property: "og:title", content: "Complaint Timeline — CivicTrace" },
      {
        property: "og:description",
        content: "Every action on a complaint, timestamped and permanently recorded.",
      },
    ],
  }),
  component: () => (
    <DesignPage html={html} script={script} backTo="/my-complaints" backLabel="Back to My Complaints" />
  ),
});
