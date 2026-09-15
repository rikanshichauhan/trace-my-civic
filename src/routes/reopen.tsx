import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/reopen.html?raw";
import script from "@/content/reopen.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/reopen")({
  head: () => ({
    meta: [
      { title: "Reopen Complaint — CivicTrace" },
      {
        name: "description",
        content:
          "Reopen a closed complaint when the issue persists, with fresh evidence and an escalation reason.",
      },
      { property: "og:title", content: "Reopen Complaint — CivicTrace" },
      {
        property: "og:description",
        content: "Escalate an unresolved civic issue back to the municipal team.",
      },
    ],
  }),
  component: () => (
    <DesignPage html={html} script={script} backTo="/my-complaints" backLabel="Back to My Complaints" />
  ),
});
