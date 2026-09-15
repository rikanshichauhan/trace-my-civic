import { Link } from "@tanstack/react-router";

const citizenNav = [
  { label: "Home", to: "/citizen" as const },
  { label: "Report Issue", to: "/report-issue" as const },
  { label: "My Complaints", to: "/my-complaints" as const },
];

export function SiteHeader({ variant = "citizen" }: { variant?: "citizen" | "government" }) {
  const isGov = variant === "government";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary text-on-primary py-1.5 px-margin-mobile md:px-margin">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-space-sm font-label-sm text-label-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="material-symbols-outlined text-[15px] text-secondary-fixed">verified</span>
            <span className="truncate tracking-wide uppercase font-code-sm text-code-sm">
              Official Public Accountability System • Verifiable Resolution Protocol v2.4
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-secondary-container text-on-secondary-container font-code-sm text-code-sm whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Immutable Audit Trail Active
          </span>
        </div>
      </div>

      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-xl min-w-0">
          <Link to="/" className="flex items-center gap-space-md">
            <span
              className="material-symbols-outlined text-primary text-[30px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">CivicTrace</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {isGov ? "Government Dispatch Console" : "Public Verifiable Ledger"}
              </span>
            </span>
          </Link>

          {!isGov && (
            <nav className="hidden lg:flex items-center gap-space-lg">
              {citizenNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-on-surface-variant hover:text-on-surface transition-colors py-2 font-label-md text-label-md uppercase tracking-wider"
                  activeProps={{
                    className: "text-primary font-headline-sm border-b-2 border-primary",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-space-md">
          {!isGov && (
            <Link
              to="/report-issue"
              className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-sm rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
              <span>Report an Issue</span>
            </Link>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded border border-outline-variant text-on-surface-variant font-label-md text-label-md uppercase tracking-wider hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden sm:inline">Switch Role</span>
          </Link>
          <div className="flex items-center gap-space-sm pl-space-sm">
            <div className="hidden md:flex flex-col text-right">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {isGov ? "Officer Verified" : "Citizen Verified"}
              </span>
              <span className="font-code-sm text-code-sm text-on-surface-variant">
                {isGov ? "#GOV-1182" : "#CT-4091"}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                {isGov ? "badge" : "person"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
