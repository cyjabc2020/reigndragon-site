# Image prompts

Reference prompts for generating illustrations across the ReignDragon Institute site.

All site illustrations follow a single visual system:
**watercolor + dragon + cream-paper background**, with the same mascot
character across every image. This directory locks the style guardrails
and per-image prompts so future generations stay on-model.

## Files

- [`style-guide.md`](./style-guide.md) — Style guardrails, character lock,
  and palette. **Apply to every prompt.**
- [`findings.md`](./findings.md) — The four research findings on
  `/findings/[slug]` and the homepage cards.
- [`homepage-and-pages.md`](./homepage-and-pages.md) — Hero, Method (4
  cards), Why It Matters, Our Story, and Research Hero.

## Workflow

1. Open `style-guide.md` and prepend the **Style guardrails + Dragon
   character lock** sections to whatever per-image prompt you're using.
2. Generate one image first to confirm the look. Use it as a
   character/style reference for the rest of the batch (Midjourney
   `--cref`, Recraft style ref, etc.) — pure prompting won't hold
   character consistency in watercolor.
3. Output at 2400px on the long edge minimum.
4. Save to `public/images/findings/16-9/{slug}.png` for paper-page heroes,
   `public/images/findings/1-1/{slug}.png` for thumbnails, and
   `public/images/{name}.png` for everything else (matching the existing
   filenames in `app/page.tsx` etc.).

## Models that work

Best results: **Midjourney v7** with `--style raw` + watercolor in prompt,
**Recraft v3** with watercolor preset, **Flux dev** with a watercolor
LoRA, **Imagen 4**.

Avoid **DALL-E 3** — it tends to render watercolor as digital airbrush.
If you must use it, push hard with: *"no digital painting, no airbrush,
real cold-press paper, visible granulation."*

## Aspect ratios

| Surface | Aspect | Path |
|---|---|---|
| Paper-page hero (`/findings/[slug]`) | 16:9 | `public/images/findings/16-9/{slug}.png` |
| Homepage findings card thumbnail | 16:9 (also uses 16-9 file) | same as above |
| `/findings` index portrait row | 1:1 | `public/images/findings/1-1/{slug}.png` |
| Homepage hero (full-bleed bg) | very wide (21:9) | `public/images/hero.png` |
| Homepage Method cards | 4:3 | `public/images/{name}.png` |
| Homepage Why It Matters / Our Story | 16:9 | `public/images/{name}.png` |
| Research page hero | 1:1 | `public/images/research-hero.png` |
