import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/official-report.html?raw";
import script from "@/content/official-report.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/official-report")({
  head: () => ({
    meta: [
      { title: "Official Complaint Report — CivicTrace" },
      {
        name: "description",
        content:
          "The certified municipal report for a complaint, including evidence, signatures and case identifiers.",
      },
      { property: "og:title", content: "Official Complaint Report — CivicTrace" },
      {
        property: "og:description",
        content: "Download the official, sealed record of a civic complaint.",
      },
    ],
  }),
  component: () => (
    <DesignPage html={html} script={script} backTo="/my-complaints" backLabel="Back to My Complaints" />
  ),
});
