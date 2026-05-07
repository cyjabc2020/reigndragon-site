# Style guide — watercolor dragon series

**Apply both sections below to every prompt.** Treat them as a system
prompt that goes before the per-image content.

---

## Style guardrails

> Editorial watercolor illustration. Soft brush strokes, wet-on-wet
> washes, gentle color bleeding at the edges of forms, visible cold-press
> paper texture, varying pigment density with occasional pooling and
> granulation. No ink outlines, no pen lines, no hard contour drawing —
> all forms defined by tonal contrast, edge softness, and color-on-color.
> No glow, no gradients, no digital airbrush, no 3D rendering, no glossy
> plastic look. Generous negative space rendered as warm cream/parchment
> paper. Warm, contemplative, slightly whimsical character — feel of a
> Beatrix Potter scene reimagined with a small dose of editorial drama.
> No text, no labels, no UI elements, no logos.

## Dragon character lock — same dragon in every image

> A small, slim, serpentine dragon with an S-curved neck and a long
> curling tail. Teal-blue body wash (`#2a8fa8`) with deeper teal pooling
> at the edges (`#13434f`) and a paler cyan belly wash (`#cdeef4`). Two
> short cream-colored horn shapes (`#f1ead4`) on top of the head. A row
> of warm yellow-gold spine ridges (`#ffd166`) running down the back,
> painted as small petal-like marks. Eyes are tiny round dots of pure
> white pigment with darker centers. Tiny dark claws as small brush
> dabs. Bat-style translucent teal wings only when in flight. The dragon
> should read as the same individual character across all illustrations —
> same proportions, same facial expression range, same palette.

## Palette

| Role | Hex | Notes |
|---|---|---|
| Body | `#2a8fa8` | Main teal wash |
| Body shadow | `#13434f` | Deep teal pooling at edges |
| Belly | `#cdeef4` | Pale cyan |
| Horn | `#f1ead4` | Cream |
| Spine ridge / accent | `#ffd166` | Warm yellow-gold |
| Paper background | `#fdf8ec` | Warm cream/parchment |
| Eye | white dot, dark center |  |

## Character consistency tactics

Pure prompting drifts in watercolor. Lock the character one of these ways:

- **Midjourney**: generate the canonical reference, then use `--cref
  <url>` on every subsequent image. Add `--cw 100` for max character
  weight.
- **Recraft v3**: upload the reference as a style/character reference.
- **Flux dev / SDXL**: train a tiny LoRA on the canonical character (5-10
  reference images) — strongest result for repeat work.

## Aspect & output

- 2400 px on the long edge minimum
- Square (1:1), 4:3, 16:9, or 21:9 depending on surface — see
  `README.md` table
- Save as PNG with transparent or cream-paper background (cream
  preferred so it composites cleanly into the dark UI without halos)
