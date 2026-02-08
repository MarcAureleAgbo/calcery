# SEO On-Page Audit Report (EN Blog)

Date: 2026-02-08
Scope: `src/content/blogEn/*.md` + template `src/pages/en/blog/[slug].astro`

## 1) Automated checks

- H1 handling: OK (`H1` rendered from frontmatter `title` in `src/pages/en/blog/[slug].astro`)
- H2/H3 hierarchy: OK (no article starts with `###`)
- SEO consistency: OK (`title` = H1, `meta description` = frontmatter description, canonical/OG/Twitter via `BaseLayout` + `SEO.astro`)
- Meta description target length (120-160 chars): OK on all 12 EN articles after update

## 2) Updated articles (before/after)

| Article | Title before | Title after |
|---|---|---|
| `budget-couple-methode-simple.md` | Couple budget system that stays simple and fair | Couple Budget Guide: Simple Method to Manage Money Together Without Conflict |
| `budget-mensuel-mode-emploi.md` | Monthly budget guide to manage money with clarity | Monthly Budget Guide: Step-by-Step Method to Manage Money and Save More |
| `calcul-impot-revenu-sans-stress.md` | Income tax estimate method to plan with less stress | Income Tax Estimate Guide: Plan Cash Flow and Reduce Tax Stress |
| `epargne-automatique-strategies.md` | Automatic savings strategy that remains sustainable | Automatic Savings Strategy: Build Consistent Savings All Year |
| `fonds-urgence-combien-mettre.md` | Emergency fund target how much should you save | Emergency Fund Guide: How Much to Save for Financial Security |
| `interets-composes-erreurs-a-eviter.md` | Compound interest mistakes that slow your growth | Compound Interest Mistakes: 5 Errors That Hurt Long-Term Growth |
| `investissement-progressif-dca.md` | Progressive investing with DCA to smooth market timing | DCA Investing Guide: Progressive Investing Without Market Timing |
| `methode-50-30-20.md` | The 50/30/20 method for budget planning | 50/30/20 Budget Rule: Practical Guide to Balance Spending and Savings |
| `optimiser-quotient-familial-legalement.md` | Family tax share optimization legal and practical basics | Family Tax Shares: Legal Ways to Optimize Household Tax Planning |
| `partage-addition-entre-amis-guide.md` | Split bill with friends a clear and fair method | Split Bill with Friends: Fair Method to Share Costs and Tips |
| `petites-depenses-qui-comptent.md` | Small expenses that add up | Small Expenses That Add Up: How to Cut Daily Money Leaks |
| `pourboire-regles-pratiques-voyage.md` | Tipping basics in practice at home and while traveling | Tipping Guide: Practical Rules for Home and Travel |

| Article | Meta description before | Meta description after |
|---|---|---|
| `budget-couple-methode-simple.md` | Practical framework to manage money as a couple, split expenses fairly, and stay aligned on goals. | Learn a practical couple budget system to split shared expenses fairly, align money goals, and run stress-free monthly check-ins together. |
| `budget-mensuel-mode-emploi.md` | Step-by-step method to build a realistic monthly budget, avoid overdrafts, and improve your savings rate. | Follow a practical monthly budget method to control spending, avoid overdrafts, and increase savings with clear category limits and weekly reviews. |
| `calcul-impot-revenu-sans-stress.md` | Clear method to estimate income tax and prepare monthly cash flow with realistic scenarios. | Use a simple income tax estimation method to model scenarios, plan monthly cash flow, and avoid unpleasant surprises when your annual tax bill arrives. |
| `epargne-automatique-strategies.md` | Build an automatic savings plan, increase contributions progressively, and stay consistent all year. | Create an automatic savings plan you can sustain, raise contributions progressively, and protect your goals even during difficult financial months. |
| `fonds-urgence-combien-mettre.md` | Practical framework to size your emergency fund based on fixed costs, income stability, and risk profile. | Set the right emergency fund target based on fixed costs, income stability, and risk level, then build it steadily with a practical monthly savings plan. |
| `interets-composes-erreurs-a-eviter.md` | The most common compound interest mistakes and practical ways to improve long-term outcomes. | Avoid the most common compound interest mistakes, from late starts to unrealistic return assumptions, and improve your long-term investing outcomes. |
| `investissement-progressif-dca.md` | Understand the DCA strategy, when it helps, and how to apply it with consistency. | Understand how dollar-cost averaging works, when it helps, and how to apply a disciplined DCA plan that reduces stress and supports long-term progress. |
| `methode-50-30-20.md` | Learn how to apply the 50/30/20 rule to balance your personal finances. | Learn how to apply the 50/30/20 budget rule, adjust ratios to your reality, and build a sustainable plan for essentials, lifestyle, and savings goals. |
| `optimiser-quotient-familial-legalement.md` | Understand household tax shares, avoid reporting mistakes, and improve tax anticipation. | Understand how family tax shares affect your income tax, avoid declaration mistakes, and simulate legal scenarios to improve yearly tax planning. |
| `partage-addition-entre-amis-guide.md` | Practical method to split bills transparently, include tips, and avoid friction in group payments. | Use a clear split-bill method to handle totals, tips, and rounding fairly, so group payments stay transparent and stress-free in any situation. |
| `petites-depenses-qui-comptent.md` | Understand the long-term impact of recurring small expenses and how to control them. | Identify recurring small expenses, measure their real annual impact, and apply simple habits to reduce daily money leaks without extreme lifestyle changes. |
| `pourboire-regles-pratiques-voyage.md` | Practical tipping guide with simple ranges to decide faster depending on context and service quality. | Use simple tipping ranges by service quality and local context, then split totals clearly in groups to avoid confusion when paying at home or abroad. |

## 3) Internal linking

Already implemented and confirmed in `src/pages/en/blog/[slug].astro`:

- **Useful tools** section (3 internal links to `/en/calculateurs/...`)
- **Related articles** section (2 internal links to other EN blog posts)

Total: 5 contextual internal links at the end of each EN article page.

## 4) Reusable SEO component

Reusable component confirmed: `src/components/SEO.astro`.

Managed automatically:
- title
- meta description
- canonical
- Open Graph
- Twitter Cards

## 5) Technical control table

| article | desc_len | h1_in_markdown | h2 | h3 |
|---|---:|---:|---:|---:|
| budget-couple-methode-simple.md | 138 | 0 | 6 | 0 |
| budget-mensuel-mode-emploi.md | 147 | 0 | 6 | 0 |
| calcul-impot-revenu-sans-stress.md | 151 | 0 | 5 | 0 |
| epargne-automatique-strategies.md | 147 | 0 | 6 | 0 |
| fonds-urgence-combien-mettre.md | 153 | 0 | 5 | 0 |
| interets-composes-erreurs-a-eviter.md | 148 | 0 | 6 | 0 |
| investissement-progressif-dca.md | 151 | 0 | 5 | 0 |
| methode-50-30-20.md | 150 | 0 | 7 | 4 |
| optimiser-quotient-familial-legalement.md | 145 | 0 | 4 | 0 |
| partage-addition-entre-amis-guide.md | 143 | 0 | 5 | 0 |
| petites-depenses-qui-comptent.md | 155 | 0 | 6 | 9 |
| pourboire-regles-pratiques-voyage.md | 149 | 0 | 5 | 0 |

Note: Markdown files intentionally do not contain `# H1` because the unique H1 is rendered in `src/pages/en/blog/[slug].astro`.
