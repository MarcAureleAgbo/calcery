# Legal Update Report - Calcery

Date: 2026-02-08

## Scope

Legal information update with real company details for:

- FR pages:
  - `src/pages/mentions-legales.astro`
  - `src/pages/confidentialite.astro`
  - `src/pages/contact.astro`
  - `src/pages/a-propos.astro`
- EN pages:
  - `src/pages/en/mentions-legales.astro`
  - `src/pages/en/confidentialite.astro`
  - `src/pages/en/contact.astro`
  - `src/pages/en/a-propos.astro`

## Company data integrated

- Trade name: **Maison Ellis**
- Legal representative: **Sacla Medesse Emmanuella Ingrid**
- Registration: **RCS Paris 938 302 239**
- Registered office: **60 rue François Ier, 75008 Paris**
- Activity: **Vente en ligne de différents produits**
- Domiciliation: **LEGALPLACE (RCS 814 428 785)**

## Changes applied

### 1) Centralized legal configuration

Updated `src/lib/site.ts` with structured legal fields:

- `legalRepresentative`
- `rcsNumber`
- `companyActivity`
- `domiciliationProvider`
- `domiciliationRcs`
- updated `editorAddress` (official address format)

### 2) Legal notice pages (FR/EN)

Updated:

- `src/pages/mentions-legales.astro`
- `src/pages/en/mentions-legales.astro`

Content now explicitly includes:

- site edited by Maison Ellis
- legal representative name
- RCS number
- registered office
- domiciliation LEGALPLACE
- dedicated sections for:
  - Website publisher
  - Publication director
  - Hosting (Cloudflare)
  - Intellectual property
  - Cookies / Analytics
  - Liability disclaimer

### 3) Privacy policy pages (FR/EN)

Updated:

- `src/pages/confidentialite.astro`
- `src/pages/en/confidentialite.astro`

Controller section now set to:

- Maison Ellis / Sacla Medesse Emmanuella Ingrid
- RCS + official address
- GDPR contact details (email + postal address)

RGPD/GDPR structure kept and aligned:

- purposes
- legal bases
- recipients
- international transfers
- retention periods
- data subject rights
- GA4 + consent mechanism

### 4) Contact pages (FR/EN)

Updated:

- `src/pages/contact.astro`
- `src/pages/en/contact.astro`

Added legal data-controller block in form area with:

- Maison Ellis
- legal representative
- RCS
- official address

Existing GDPR consent checkbox preserved.

### 5) About pages (FR/EN)

Updated:

- `src/pages/a-propos.astro`
- `src/pages/en/a-propos.astro`

Added explicit publisher/company section with official legal details.

### 6) Footer update

Updated `src/layouts/BaseLayout.astro`:

- kept legal links visible:
  - legal notice
  - privacy policy
  - contact
  - manage cookies
- updated copyright:
  - `© 2026 Maison Ellis`
- improved labels:
  - FR: "Politique de confidentialité"
  - EN: "Privacy policy"

## Technical constraints respected

- No changes made to GA loading logic in `Analytics.astro`.
- Cookie consent mechanism remains intact.
- Astro architecture preserved.
- FR/EN legal information harmonized.

## Build verification

- `npm run build` -> OK
