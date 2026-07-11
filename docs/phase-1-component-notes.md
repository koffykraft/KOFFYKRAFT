# Phase 1 Component Notes

## Button System

- Primary: `.button`
  - Dark coffee background, light text, 48px minimum touch height.
- Secondary: `.button.secondary`
  - Pale natural background, dark text, 48px minimum touch height.
- Tertiary: `.text-link`
  - Text-only link with 48px minimum touch height where used as a CTA.

## Coffee Card

Template used on the homepage:

1. `.tag`
2. `h3` coffee name
3. `.taste` description
4. `dl` metadata with `ROAST` and `BEST FOR`
5. `.text-link` CTA

All three homepage coffee cards follow this structure.

## Process Step Card

Template used on the homepage:

1. number `span`
2. `h3` step title
3. concise process description

All four process cards follow this structure.

## Guide Card

Template used on the homepage:

1. category `span`
2. `h3` guide title
3. description

Guide cards share the same card frame language as coffee cards.

## Shared Systems

- `assets/site/styles.css`: spacing tokens, card frames, button variants, active nav, focus states, dividers, responsive grids.
- `assets/site/site.js`: active navigation state for homepage sections and interior pages.
