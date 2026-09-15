import { createFileRoute } from "@tanstack/react-router";

import html from "@/content/verify-proof.html?raw";
import script from "@/content/verify-proof.js?raw";
import { DesignPage } from "@/components/civic/DesignPage";

export const Route = createFileRoute("/verify-proof")({
  head: () => ({
    meta: [
      { title: "Approve Resolution Proof — CivicTrace" },
      {
        name: "description",
        content:
          "Review the repair proof submitted by the municipal crew and approve or reject the resolution.",
      },
      { property: "og:title", content: "Approve Resolution Proof — CivicTrace" },
      {
        property: "og:description",
        content: "Citizen verification is required before a complaint can be closed.",
      },
    ],
  }),
  component: () => (
    <DesignPage html={html} script={script} backTo="/my-complaints" backLabel="Back to My Complaints" />
  ),
});
