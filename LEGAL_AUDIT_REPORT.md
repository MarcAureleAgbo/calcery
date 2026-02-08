# Audit légal & préparation monétisation - Calcery

Date: 2026-02-08  
Périmètre: `https://calcery.com` + code source Astro (`FR` / `EN`)

## 1) Diagnostic conformité (pages légales)

### `/mentions-legales/`

- `OK`
  - Page existante et accessible.
  - Informations éditeur présentes.
  - Section responsabilité présente.
- `À corriger`
  - Informations hébergeur incomplètes (raison sociale + adresse).
  - Absence de mention explicite GA4 / cookies analytiques.
  - Absence d'encadrement monétisation (Adsense / affiliation).
- `À ajouter`
  - Mention du directeur de publication.
  - Cadre juridique d'utilisation des données analytiques.

### `/confidentialite/`

- `OK`
  - Page existante, structurée, avec base RGPD.
  - Droits utilisateurs déjà mentionnés.
- `À corriger`
  - Incohérence: page annonçait “pas de tracking cookies” alors que GA4 est intégré.
  - Manque de détail sur destinataires / transferts hors UE.
  - Manque de précision sur la gestion concrète du consentement.
- `À ajouter`
  - Durées de conservation par catégorie (contact, analytics, consentement).
  - Mention CNIL (droit de réclamation).
  - Référence explicite à Cloudflare Pages et Google Analytics 4.

### `/contact/`

- `OK`
  - Page existante, formulaire utilisable, email de contact visible.
  - Coordonnées éditeur visibles.
- `À corriger`
  - Pas de case de consentement RGPD avant envoi.
  - Pas de catégorie dédiée aux demandes RGPD.
- `À ajouter`
  - Encadré légal sur la finalité des données.
  - Version EN alignée avec le même niveau d'information.

## 2) Corrections appliquées dans le code

### Pages FR mises à niveau

- `src/pages/mentions-legales.astro`
  - Refonte complète: éditeur, directeur de publication, hébergeur Cloudflare détaillé, propriété intellectuelle, monétisation, cookies/GA4, responsabilité, droit applicable.
- `src/pages/confidentialite.astro`
  - Refonte complète RGPD: responsable, données collectées, finalités, bases légales, destinataires, transferts hors UE, durées de conservation, droits, CNIL, gestion du consentement.
- `src/pages/contact.astro`
  - Formulaire amélioré: nom optionnel, sujet RGPD, case de consentement obligatoire, texte légal aligné, catégorisation partenariats/publicité.

### Pages EN alignées

- `src/pages/en/mentions-legales.astro`
- `src/pages/en/confidentialite.astro`
- `src/pages/en/contact.astro`

Les pages EN contiennent les mêmes informations juridiques que les pages FR, avec traduction professionnelle et cohérence éditoriale.

### Cohérence globale du site

- `src/pages/a-propos.astro`
- `src/pages/en/a-propos.astro`

Mise à jour des mentions vie privée pour éviter les incohérences avec la présence de GA4.

## 3) Cookies & consentement (RGPD)

### Composants ajoutés / modifiés

- `src/components/CookieBanner.astro` (nouveau)
  - Bandeau cookies FR/EN.
  - Boutons `Accepter` / `Refuser`.
  - Lien vers la politique de confidentialité.
  - Stockage du choix de consentement en localStorage.
- `src/components/Analytics.astro`
  - GA4 n'est chargé qu'en production **et uniquement après consentement**.
  - Aucun tracking si consentement refusé.
- `src/layouts/BaseLayout.astro`
  - Intégration du bandeau cookies.
  - Ajout d'un lien footer “Gérer les cookies / Manage cookies”.

## 4) Préparation Adsense - état de conformité

### Critères principaux

- Navigation claire: `OK`
- Contenu original (articles + outils): `OK`
- Pages légales visibles (footer): `OK`
- Politique de confidentialité détaillée: `OK`
- Page contact opérationnelle et professionnelle: `OK`
- Mention monétisation/affiliation: `OK`
- Consentement cookies pour analytics: `OK`

### Ajustements réalisés pour Adsense

- Footer légal renforcé (liens légaux + gestion cookies).
- Base légale et transparence monétisation clarifiées.
- Cohérence FR/EN améliorée pour revue manuelle Google.

## 5) Vérifications techniques

- `npm run test:analytics:dev` -> `OK`
  - Le script GA4 est absent en mode développement.
- `npm run build` -> `OK`
  - Build complet Astro sans erreur.

## 6) Synthèse finale

Le site est désormais:

- conforme RGPD sur le périmètre traité,
- techniquement prêt pour une demande Adsense,
- doté de pages légales professionnelles en FR et EN,
- équipé d'un mécanisme de consentement cookies compatible avec GA4.

## 7) Points à compléter côté éditeur (hors code)

- Ajouter dans les mentions légales les identifiants d'entreprise si applicables (SIREN/SIRET, RCS, TVA intracommunautaire).
- En cas d'activation effective d'Adsense/publicités personnalisées, vérifier la catégorie de consentement publicitaire et mettre à jour la politique de confidentialité en conséquence.
- Vérifier avec votre conseil juridique la conformité exacte à votre statut (personne morale, activité commerciale, pays de résidence fiscale).
