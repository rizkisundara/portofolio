# Rizki Sundara — Portfolio V3

Personal portfolio using Next.js App Router, TypeScript, React, Tailwind CSS v4, Motion and Lucide. The UI has an original editorial/bento design, optimized original photos, a bilingual interface, persistent theme and language preferences, project filters, case-study dialogs, career accordion, photo lightbox and responsive navigation. Custom CSS handles the visual system; Tailwind is configured for future utility-based development.

## Local development

Use Node.js 22. From the directory containing `package.json`:

```sh
npm install
npm run typecheck
npm run dev
```

Open http://localhost:3000. Before deployment run `npm run build`, then `npm run start` to check the production site. Commit the generated `package-lock.json` after installing dependencies. Dependencies use semver ranges; a lockfile must be generated in an environment with npm access.

## GitHub + Vercel

Create a new empty GitHub repository named `portfolio` (private is fine if the Vercel integration can access it). From this folder:

```sh
git init
git add .
git commit -m "Build personal portfolio V3"
git branch -M main
git remote add origin https://github.com/rizkisundara/portfolio.git
git push -u origin main
```

Import the repository at https://vercel.com/new. Select Next.js, use the repository root, Node.js 22 if available, and the default install and build commands. No database or environment variables are needed. After the build succeeds, Vercel assigns a public URL. Use the final URL in LinkedIn and your CV.

## Content and privacy

- `components/Portfolio.tsx`: page, bilingual labels, interactions and career data.
- `components/content.json`: project descriptions and translations.
- `app/globals.css`: design tokens, components and responsive styles.
- `public/images/`: optimized original photos, not generated portraits.
- `app/layout.tsx`: metadata.

Product visuals are labeled concept illustrations, not actual app screenshots or measured statistics. The 2.5+ years, 2 public projects, and 3 professional roles are based on the provided career and project details, as of November 2026. The BNI experience is listed as a project placement pending confirmation of the formal employer. No internal banking screenshots, confidential system identifiers, personal CV documents, credentials, or private contact details are included. The AWS-logo photo is a personal photo, not an employment or certification claim. Public app URLs are included; private project repositories are not linked directly from project cards.

## Verification status

This environment cannot resolve registry.npmjs.org. The Next.js production build and dependency-backed TypeScript checking therefore require a local/CI run. Visual review of the generated static design preview is separate from the actual Next.js runtime. No GitHub repository was created, no code pushed, and no Vercel deployment performed.
