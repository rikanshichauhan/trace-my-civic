import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/government.html?raw";
import script from "@/content/government.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/government")({
  head: () => ({
    meta: [
      { title: "Government Complaints Console — CivicTrace" },
      {
        name: "description",
        content:
          "Authorized municipal console to triage, assign, inspect and resolve registered civic grievances.",
      },
      { property: "og:title", content: "Government Complaints Console — CivicTrace" },
      {
        property: "og:description",
        content: "Dispatch crews and close complaints with verified field evidence.",
      },
    ],
  }),
  component: () => (
    <DesignPage
      html={html}
      script={script}
      variant="government"
      backTo="/"
      backLabel="Back to Role Selection"
    />
  ),
});
