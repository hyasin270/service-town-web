# Service Town Website — Improvement Plan

**Created:** 2026-02-25
**Status:** In Progress

---

## Overview

Seven major improvements to transform Service Town from a scrollable document into an immersive, scroll-driven experience.

---

## Phase 1: Content & Framing (This Session)

### 1.1 — Sharper Service Definition
**Status:** Ready to execute
**Files:** `src/App.jsx`, `src/data/content.js`

Rewrite the "What is a Service?" callout to emphasize:
- **Central** — lives in the Armory, consumed by all Squads
- **Sufficiently complex** OR **abnormally simple/accessible** — the FDS team finds it inherently useful and cannot replicate it (not because they're lazy, but because it's genuinely valuable)
- **Value comes from**: complex business logic imported, technically sound + pedagogically sound, or a unique WhatsApp-delivered flow
- Link to the standards section below ("Refer to the standards below")

### 1.2 — Front-End Jurisdiction / Who Owns What
**Status:** Ready to execute
**Files:** `src/App.jsx`

Add a new callout box in the "Inside a Service" (Section 3) or "Two Teams" (Section 2) section:
- The customer of the services team IS the forward deployed (FDS) team
- The product is measured by **accessibility** and **how quickly people in FDS can use it**
- Front-end is often built by FDS, but product standards (Pillar 3) measure usability for FDS and end users
- Frame it as: the Services team owns the service (back-end, logic, data) and the **quality** of the front-end interface — but FDS teams may build their own front-ends that consume the service
- The jurisdiction stops where consumption begins — the service must be so good that FDS teams WANT to use it

### 1.3 — Replace "Which Team?" Poll
**Status:** Ready to execute
**Files:** `src/data/content.js`

Replace "Which team do you most identify with?" (superficial) with something more meaningful:
- **New poll:** "What's the biggest friction between field teams and central services today?"
- Options: "Services don't fit our context", "Too slow to ship", "We don't know what's available", "No feedback loop"

### 1.4 — Embed Lesson Plan Screenshots
**Status:** Ready to execute
**Files:** `src/App.jsx`, new images in `public/images/lesson-plans/`

In the Standards Gate (Section 5), add expandable image boxes showing three different lesson plans:
1. **LP1: Photosynthesis (HTML)** — polished, structured weekly overview with Oral Language, Science, Reading, Writing sections
2. **LP2: WhatsApp Lesson Plan** — plain text delivered via WhatsApp, no formatting structure
3. **LP3: Fractions (HTML)** — basic web page with SLO, Hook, content

Caption: "Three lesson plans. Three different places. No coherent spine. No shared pedagogical standards. No tracking for effectiveness. This is what happens without a service."

---

## Phase 2: Fix Building Hotspots (This Session)

### 2.1 — Accurate Building Hotspots
**Status:** Ready to execute
**Files:** `src/components/TownMap.jsx`, `src/data/content.js`, `src/index.css`

**Problem:** The yellow highlight boxes are misaligned — the box for "Registry Office" doesn't actually cover the Registry Office building.

**Approach:**
- Re-examine the `s04_six_services.jpg` aerial map image carefully
- Adjust the CSS coordinates (`left`, `top`, `width`, `height`) for each building to accurately match where buildings actually appear in the image
- Make the highlight more precise — use a tighter bounding box around each building
- Use a softer highlight effect (no hard rectangle, use a glow/shadow effect)

---

## Phase 3: Standards Scroll Experience (This Session)

### 3.1 — Replace Small Tabs with Scroll-Driven Standards
**Status:** Ready to execute
**Files:** `src/components/PillarTabs.jsx`, `src/App.jsx`, `src/index.css`

**Problem:** The Technical / Pedagogical / Product tabs are small and most people skip over them.

**Approach:**
- Instead of tabs, render ALL THREE pillars sequentially as scroll sections
- Each pillar gets its own image, title, description, and standards list
- As user scrolls, the current pillar name becomes a sticky header
- Standards appear with fade-in animations as they scroll into view
- Each pillar is visually distinct (BLU-team blue for Technical, RED-team red for Pedagogical, Gold for Product)

---

## Phase 4: Scroll-Driven Immersive Experience (Future Session)

### 4.1 — Pudding.cool-Style Scrollytelling
**Status:** Planning (requires dedicated session)
**Files:** Major architectural changes across all files

**Inspiration:** [pudding.cool/2026/02/womens-sizing/](https://pudding.cool/2026/02/womens-sizing/)

**Key patterns to implement:**
1. **Scroll-triggered zoom into buildings** — As you scroll past the aerial map, it zooms into specific buildings. E.g., scrolling into "Inside a Service" zooms into a building and shows the Front Counter, Forge, Vault layers
2. **Sticky image + scrolling text** — Image stays pinned while text paragraphs scroll alongside, changing the image/annotation at specific scroll positions
3. **Progressive content reveal** — Elements animate in based on scroll position, not just viewport entry
4. **Parallax depth** — Background layers move slower than foreground
5. **Visual transitions** — Sections don't just cut; they transform (fade, slide, scale)

**Technical approach:**
- Use Intersection Observer with `rootMargin` for precise scroll triggers
- CSS `position: sticky` for pinned elements
- `scroll-timeline` CSS property (modern browsers) or JS-based scroll progress tracking
- Generate new interior artwork for each building (Kie.ai) — Front Counter, Forge, Vault, Watchers views
- Generate building-specific transition images

**New images needed (Kie.ai):**
- Interior: Front Counter desk/reception view
- Interior: The Forge — blacksmith/factory floor with anvils and code
- Interior: The Vault — data archives, glowing storage
- Interior: The Watchers — observatory/monitoring room with screens
- Each building's interior for the zoom-in transition

**Estimated effort:** 2-3 dedicated sessions

---

## Execution Order

| Phase | Items | Status |
|-------|-------|--------|
| Phase 1 | 1.1, 1.2, 1.3, 1.4 | **This session** |
| Phase 2 | 2.1 | **This session** |
| Phase 3 | 3.1 | **This session** |
| Phase 4 | 4.1 | Future (2-3 sessions) |
