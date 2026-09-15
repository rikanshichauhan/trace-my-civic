export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl pb-space-lg">
          <div className="space-y-space-sm md:col-span-1">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[24px]">gavel</span>
              <span className="font-headline-sm text-headline-sm text-primary">CivicTrace Protocol</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Independent municipal resolution tracking anchored by decentralized SHA-256 cryptographic
              verification. Transparent. Auditable. Bound by civic statutory record standards.
            </p>
            <div className="pt-space-xs">
              <span className="inline-flex items-center gap-1 font-code-sm text-code-sm text-secondary bg-surface-container-lowest px-2 py-1 rounded">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                ISO/IEC 27001 Public Node
              </span>
            </div>
          </div>

          <div className="space-y-space-sm">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wider block">
              Accountability Standards
            </span>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>Verifiable Evidence Ledger</li>
              <li>Open Records Access</li>
              <li>Municipal SLA Standards</li>
              <li>Inspector General Oversight</li>
            </ul>
          </div>

          <div className="space-y-space-sm">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wider block">
              Civic Navigation
            </span>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li>Submit Verification Claim</li>
              <li>Public Evidence Archive</li>
              <li>Resolution Appeals Tribunal</li>
              <li>Whistleblower Protections</li>
            </ul>
          </div>

          <div className="space-y-space-sm">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wider block">
              Direct Civic Helpline
            </span>
            <div className="p-space-md rounded bg-surface-container-lowest">
              <p className="font-code-sm text-code-sm text-on-surface font-semibold">
                Emergency Municipal Line: 311
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Public Integrity Ombudsperson:
                <br />
                <span className="font-code-sm text-code-sm text-primary">audit-desk@civictrace.gov</span>
              </p>
              <div className="mt-space-sm pt-space-xs flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px] text-secondary">support_agent</span>
                Available 24/7/365 Official Dispatch
              </div>
            </div>
          </div>
        </div>

        <div className="pt-space-lg mt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span className="font-code-sm text-code-sm">NODE IDENTITY: IN-GZB-PUBLIC-491</span>
            <span>•</span>
            <span>Municipal Corporation Public Grievance Portal</span>
          </div>
          <div className="text-center md:text-right">
            © 2026 CivicTrace Municipal Trust Network. Verifiable Public Civic Infrastructure.
          </div>
        </div>
      </div>
    </footer>
  );
}
