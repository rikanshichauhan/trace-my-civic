# CivicTrace Backend Roadmap

## Goal
Transform the static CivicTrace prototype into a real full-stack app using Lovable Cloud (auth + database + storage).

## Tasks

### 1. Foundation
- [x] Enable Lovable Cloud
- [ ] Enable email/password auth
- [ ] Enable Google sign-in
- [ ] Create database schema (profiles, roles, complaints, evidence, timeline events)

### 2. Auth Pages
- [ ] Build `/auth` route with sign-in / sign-up toggle
- [ ] Email/password forms
- [ ] Google sign-in button
- [ ] Password reset flow

### 3. Route Protection
- [ ] Create `/_authenticated` layout (redirect to `/auth` when signed out)
- [ ] Move citizen-facing routes under `/_authenticated`
- [ ] Create `/_authenticated/_official` layout for `/government`
- [ ] Update `SiteHeader` to show sign-in/out state and user menu

### 4. Citizen Flow (End-to-End)
- [ ] Save new complaints from `/report-issue` with photo evidence, GPS, timestamp
- [ ] Upload before photos to storage
- [ ] List the signed-in citizen's complaints on `/my-complaints`
- [ ] Show complaint detail/timeline on `/timeline`
- [ ] Show before/after evidence on `/evidence`
- [ ] Citizen approval / rejection on `/verify-proof`
- [ ] Reopen flow on `/reopen`

### 5. Government Flow
- [ ] Restrict `/government` to officials/admins
- [ ] Build official dashboard with assigned complaints
- [ ] Allow officials to update status and upload after photos
- [ ] Show resolution deadlines and SLA tracking

### 6. Polish
- [ ] Seed sample data for demos
- [ ] Add toasts for errors/success
- [ ] Test all flows end-to-end
- [ ] Update meta/SEO on new routes

## In Progress
- Foundation + auth pages
