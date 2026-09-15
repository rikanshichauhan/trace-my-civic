# COPY of CivicTrace Connect

Build the CivicTrace web application using the attached stitch_civictrace_citizen_platform design package with the following routing and functionality:

1. Entry / Landing Page (Role Selection):
- Default route (/) must be 'Civic Trace Role Selection' (stitch_civictrace_citizen_platform/civictrace_role_selection/code.html).
- Remove the top navigation header options (Home, Profile, Report Complaint, Dashboard links). Only display the CivicTrace logo and a clean card with two primary options: 'Citizen Login' and 'Government Personnel'.

2. Role-Based Routing:
- Clicking 'Government Personnel' navigates to Government Complaints Civic Trace (stitch_civictrace_citizen_platform/government_complaints_civictrace/code.html).
- Clicking 'Citizen Login' navigates to CivicTrace Citizen Dashboard Overview (stitch_civictrace_citizen_platform/civictrace_citizen_dashboard_overview/code.html).

3. Citizen Dashboard & Report Issue:
- Clicking 'Report an Issue' / 'Report Issue' opens the issue reporting page.
- On this Report Issue page:
  - Add an inbuilt live camera feature (allowing live snapshot capture from device camera in addition to file upload).
  - Add live GPS location detection and live time/date tracking automatically attached to the submission.
  - Remove '(optional)' from the photo field; photo evidence is strictly mandatory.

4. Complaints Management & Detailed Flows:
- Clicking 'My Complaints' opens CivicTrace My Complaints (stitch_civictrace_citizen_platform/civictrace_my_complaints/code.html).
- Clicking 'Need Your Approval' / 'Need Approval' on a complaint opens Proof Before Resolve Citizen Verification (stitch_civictrace_citizen_platform/proof_before_resolve_citizen_verification/code.html).
- Clicking 'Timeline' opens CivicTrace Complaint Timeline (stitch_civictrace_citizen_platform/civictrace_complaint_timeline/code.html).
- Clicking 'Official Report' opens CivicTrace Official Complaint Report (stitch_civictrace_citizen_platform/civictrace_official_complaint_report/code.html).
- Clicking 'View Before and After' opens CivicTrace Evidence Verification (stitch_civictrace_citizen_platform/civictrace_evidence_verification/code.html).
- Clicking 'Reopen Complaint' opens CivicTrace Reopen Complaint (stitch_civictrace_citizen_platform/civictrace_reopen_complaint/code.html).

Make sure all shared navigation bars, back buttons, and status buttons route seamlessly between these pages with a polished, cohesive UI.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://trace-my-civic.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4e95b89c-ec17-486b-b19b-30b1c6744420).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
