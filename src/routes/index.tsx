import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicTrace — Public Grievance Redressal Portal" },
      {
        name: "description",
        content:
          "Choose your access route into CivicTrace: citizen complaint tracking or authorized government dispatch and resolution.",
      },
      { property: "og:title", content: "CivicTrace — Public Grievance Redressal Portal" },
      {
        property: "og:description",
        content:
          "Report, track and verify municipal complaints on a transparent, tamper-evident civic record.",
      },
    ],
  }),
  component: RoleSelection,
});

function RoleSelection() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin h-20 flex items-center gap-space-md">
          <span
            className="material-symbols-outlined text-primary text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_balance
          </span>
          <span className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">CivicTrace</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Public Verifiable Ledger
            </span>
          </span>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto w-full px-margin-mobile md:px-margin py-space-xl flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
          <div className="flex flex-col items-center text-center mb-space-xl">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-space-md">
              <span
                className="material-symbols-outlined text-primary text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance
              </span>
            </div>
            <span className="font-code-sm text-code-sm text-secondary uppercase tracking-widest font-semibold mb-space-xs">
              Public Grievance Redressal System
            </span>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mb-space-xs">
              CivicTrace
            </h1>
            <p className="font-headline-sm text-headline-sm text-on-surface-variant max-w-md font-normal">
              Civic Complaint Management
            </p>
          </div>

          <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-xl p-space-lg md:p-space-xl">
            <div className="flex items-center gap-space-xs mb-space-lg">
              <span className="material-symbols-outlined text-secondary text-[18px]">how_to_reg</span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Select your access route
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              <Link
                to="/citizen"
                className="group flex flex-col justify-between p-space-lg bg-surface-container-low border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[26px]">person</span>
                  </div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <h2 className="font-headline-md text-headline-md text-primary font-semibold">
                      Citizen Login
                    </h2>
                    <span className="font-code-sm text-code-sm text-secondary px-2 py-0.5 rounded bg-secondary-container/40">
                      Public Access
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Report and track civic issues with live photo evidence, GPS records and real-time
                    resolution status.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-sm flex items-center gap-space-xs text-primary font-label-md text-label-md font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Enter Citizen Portal</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </Link>

              <Link
                to="/government"
                className="group flex flex-col justify-between p-space-lg bg-surface-container-low border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary mb-space-md group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[26px]">badge</span>
                  </div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <h2 className="font-headline-md text-headline-md text-primary font-semibold">
                      Government Personnel
                    </h2>
                    <span className="font-code-sm text-code-sm text-on-surface-variant px-2 py-0.5 rounded bg-surface-container-high">
                      Authorized Only
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Manage, inspect, assign and resolve registered grievances across municipal
                    jurisdictions.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-sm flex items-center gap-space-xs text-primary font-label-md text-label-md font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Official Login &amp; Dispatch</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center pt-space-lg">
            <div className="inline-flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
              <span>Municipal Corporation Public Grievance Portal • Ghaziabad Nagar Nigam</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
