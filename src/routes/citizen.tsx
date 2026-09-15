import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/citizen-dashboard.html?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/citizen")({
  head: () => ({
    meta: [
      { title: "Citizen Dashboard — CivicTrace" },
      {
        name: "description",
        content:
          "Your civic dashboard: open complaints, pending approvals, resolution progress and municipal SLA status.",
      },
      { property: "og:title", content: "Citizen Dashboard — CivicTrace" },
      {
        property: "og:description",
        content: "Track every reported civic issue from submission to verified resolution.",
      },
    ],
  }),
  component: () => <DesignPage html={html} />,
});
