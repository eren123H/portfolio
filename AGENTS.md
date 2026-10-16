# EREN.OS — Project Agent Instructions

## Project Identity
EREN.OS is an interactive personal developer portfolio presented as an original, macOS-inspired desktop experience. Its goal is to be memorable and shareable without sacrificing clarity, accessibility, or professional credibility.

Follow the global Codex instructions for communication, code quality, testing, and safety. This file defines only EREN.OS-specific expectations.

## Product Direction
- Build a polished browser-based desktop, not a pixel-perfect macOS clone. Do not use Apple logos, proprietary icons, or branded assets.
- Visual language: restrained, premium, minimal; translucent glass surfaces, rounded windows, subtle shadows, smooth motion, and an abstract blue-purple wallpaper.
- Show the existing custom **EU logo** during startup and in the welcome experience. If the asset is missing, ask for it; use a clearly replaceable placeholder in the meantime. Never invent a final logo.
- Welcome copy: **"Hey, I'm Eren."** and **"Welcome to my digital workspace."**
- Primary welcome actions: **Explore My Work** and **Open Terminal**.
- Keep the first impression fast, legible, and immediately identifiable as a developer portfolio.

## Experience and Applications
Plan for these desktop applications, implemented incrementally:
- **Projects / Finder:** curated projects, descriptions, technology tags, GitHub links, and live demos where available.
- **Terminal:** safe simulated commands for exploring portfolio content; never execute visitor-entered shell commands.
- **About:** verified background and professional experience.
- **Skills:** meaningful, evidence-based technology presentation; avoid fabricated proficiency percentages.
- **Resume:** view/download a user-provided CV.
- **Contact:** verified contact and social links.
- **Settings:** theme and optional visual preferences.
- **Mini-game / Easter eggs:** optional enhancements after the core portfolio works.

Desktop shell requirements: top menu bar, animated dock, window open/close/focus/minimize/maximize, and sensible keyboard navigation. On mobile, favor full-screen app views over cramped draggable windows.

## Project-Specific Decision Protocol
Before implementing a **new visible feature, major interaction, layout direction, or architectural change**:
1. Describe the decision in plain Turkish.
2. Present **2–3 concrete options**, including their UX/performance trade-offs.
3. Recommend one option with a brief reason.
4. **Wait for the user's choice before implementing that decision.**

Once an option is approved, implement that scoped feature without asking about every small styling or code detail. If a task already specifies an approved design, proceed within that scope. When uncertain about portfolio facts or branding, ask rather than inventing details.

For visual choices, offer lightweight mockups or previews **when practical**, but do not block progress on image-generation tools.

## Technology and Architecture
Initial stack:
- Vite + React + TypeScript
- Tailwind CSS
- Motion for React for purposeful UI animations
- Lucide React for generic interface icons

Keep the site **static-host compatible**, with no backend, database, AI assistant, or paid API dependency in the initial version. Prefer local structured data for portfolio content. Avoid adding packages without a clear feature need.

Organize code by desktop shell, window management, individual apps, portfolio data, and shared UI. Keep app content separate from window logic so sections can evolve independently.

## Content Integrity
- Use only user-confirmed experience, skills, links, and project claims.
- Missing projects, resume, contact details, or logo must be marked as placeholders, not presented as facts.
- The website may use English UI copy, while development discussion remains in Turkish.
- Make GitHub repositories and live demos easy for recruiters to reach.

## Performance and Accessibility
- Prioritize a smooth first load over elaborate effects.
- Support keyboard use, visible focus states, readable contrast, and reduced-motion preferences.
- Keep animations short and non-blocking; do not force visitors to sit through a long startup sequence.
- Make the main portfolio content accessible even if decorative effects fail.
- Design mobile behavior intentionally rather than simply shrinking the desktop.

## Build Sequence
Work in small, reviewable milestones:
1. App foundation and design tokens.
2. Startup and welcome screen (EU logo placeholder until supplied).
3. Desktop shell: wallpaper, menu bar, dock.
4. Window manager and responsive app presentation.
5. Core content apps: Projects, About, Skills, Resume, Contact.
6. Terminal and optional discovery features.
7. Polish, accessibility, performance, and deployment readiness.

Before each **new milestone**, propose the intended UX and wait for approval. After each milestone, demonstrate what works and identify any placeholder content or unfinished behavior.

## Deployment Boundary
Develop and preview locally first. The eventual target is GitHub Pages, so avoid server-only runtime features and account for a possible repository base path. Do not publish, push, or deploy until the user explicitly requests it.
