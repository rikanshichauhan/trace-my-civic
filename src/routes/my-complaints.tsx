import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/my-complaints.html?raw";
import script from "@/content/my-complaints.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/my-complaints")({
  head: () => ({
    meta: [
      { title: "My Complaints — CivicTrace" },
      {
        name: "description",
        content:
          "Every complaint you filed, with status, approval requests, timelines and official municipal reports.",
      },
      { property: "og:title", content: "My Complaints — CivicTrace" },
      {
        property: "og:description",
        content: "Filter complaints by status and act on the ones awaiting your verification.",
      },
    ],
  }),
  component: () => <DesignPage html={html} script={script} backTo="/citizen" backLabel="Back to Dashboard" />,
});
