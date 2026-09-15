import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, type MouseEvent } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type Props = {
  html: string;
  script?: string;
  variant?: "citizen" | "government";
  backTo?: string;
  backLabel?: string;
};

export function DesignPage({ html, script, variant = "citizen", backTo, backLabel }: Props) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!script) return;
    const el = document.createElement("script");
    el.type = "text/javascript";
    el.text = script;
    document.body.appendChild(el);
    document.dispatchEvent(new Event("DOMContentLoaded"));
    return () => {
      el.remove();
    };
  }, [script]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const routed = target?.closest?.("[data-route]") as HTMLElement | null;
    if (routed) {
      const to = routed.getAttribute("data-route");
      if (to) {
        event.preventDefault();
        void navigate({ to });
      }
      return;
    }
    const anchor = target?.closest?.('a[href="#"]') as HTMLElement | null;
    if (anchor) event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <SiteHeader variant={variant} />
      <main className="w-full pt-28 bg-surface flex-1">
        {backTo && (
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin pt-space-md">
            <button
              type="button"
              onClick={() => void navigate({ to: backTo })}
              className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              {backLabel ?? "Back"}
            </button>
          </div>
        )}
        <div
          ref={containerRef}
          onClick={onClick}
          className="civic-design-surface [&_[data-route]]:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
