# EREN.OS

The first visual prototype of a desktop-inspired developer portfolio.

## Local preview

Requires Node.js 20.19+ or a supported newer LTS release.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173/.

```sh
npm run build
npm run preview
```

The production output is in `dist/` and uses `/portfolio/` as its base path. The development server keeps relative paths for local use.

## GitHub Pages

The `.github/workflows/deploy.yml` workflow runs tests, builds the application and publishes `dist/` when `main` changes. GitHub Pages must use **GitHub Actions** as its source. The public URL is https://eren123h.github.io/portfolio/.

Original static-portfolio files remain in the repository for reference; only the Vite build output is published by the new workflow. Local QA screenshots in `docs/*.jpg` are not committed.

## Prototype scope

- Brief, skippable startup screen with a replaceable EU text placeholder.
- CSS blue-purple wallpaper, light glass menu bar and seven dock apps.
- Welcome actions open Projects and Terminal.
- Terminal opens with a Turkish command guide. Supports `help`, `about`, `projects`, `skills`, `clear`, Enter to submit, and Up/Down command history with draft restoration. Commands return local portfolio text only; user input is never executed as code or shell commands. Terminal history resets when its window is closed.
- One active app window at a time; close using the red control or Escape.
- Keyboard focus remains inside the open window and returns on close.
- Full-screen app presentation on mobile; reduced motion follows device preferences.
- A lightweight SVG astronaut floats and waves beside the welcome view. Its greeting appears briefly on startup; animation can be paused and respects reduced motion preferences. On smaller screens it moves below the welcome content to keep text and controls clear.
- A floating envelope opens a light glass contact card with verified email, LinkedIn and GitHub links. Hover/focus opens its flap; the initial drift lasts under five seconds. The card supports keyboard use, Escape, outside-click dismissal and reduced motion, and stays inside the viewport. On smaller screens the envelope sits beside the astronaut below the welcome content.

Portfolio content now comes from the user-provided CV and the existing `eren123H/portfolio` repository. Projects include four original screenshots, descriptions, technology tags and verified public repository links. About includes education, two internships and professional contact links. Skills are grouped with supporting work; Resume offers the original PDF and a page preview. See `docs/content-sources.md` for provenance.

The EU logo is still a replaceable placeholder. Yellow and green window controls are decorative. Minimize, maximize, dragging, multiple windows and editable settings are outside this milestone.

Run `npm test` for the terminal command tests and `npm run build` for TypeScript and the production build.

## Source layout

- `src/components/Desktop.tsx`: menu bar, welcome view and dock.
- `src/components/AppWindow.tsx`: reusable dialog and keyboard handling.
- `src/components/Logo.tsx`: replaceable logo placeholder.
- `src/apps/AppContent.tsx`: individual application previews.
- `src/data/apps.ts`: application metadata.
- `src/data/portfolio.ts`: shared profile, projects, experience and skills, also used by Terminal.
- `public/projects/`: project images from the existing portfolio.
- `public/resume/`: user-provided CV and its page preview.
- `src/styles.css`: visual tokens, wallpaper and responsive styling.

No backend, external font requests, AI integration or GitHub API is used.
