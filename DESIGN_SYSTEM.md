# ÆTHER Design System

## Philosophy
NOT dark hacker terminal. NOT Palantir brutalism.
Think JWST imagery. Aurora borealis. Light through ice.
Space is luminous — the darkness is just the canvas.
The UI is the glow. Everything breathes. Nothing is static.

The aesthetic is called: CELESTIAL GLASSMORPHISM

## Colour Tokens
Canvas (background):     #05091A  — deep midnight indigo, never pure black
Glass panels:            rgba(255, 255, 255, 0.035) + backdrop-filter: blur(20px)
Glass hover:             rgba(255, 255, 255, 0.055)
Border default:          rgba(127, 236, 220, 0.12)
Border hover:            rgba(127, 236, 220, 0.28)
Accent Teal (primary):   #7FECDC  — aurora, ISS window light
Accent Violet:           #C084FC  — nebula, Orion glow
Accent Amber:            #FFD97D  — solar corona, stellar
Accent Rose:             #FF8FAB  — alerts, warnings, urgency
Text primary:            #E8F0FF  — cool lunar white
Text dim:                rgba(232, 240, 255, 0.45)
Text muted:              rgba(232, 240, 255, 0.22)

## Typography
Display / Headings:      Cormorant Garamond — elegant, scientific
Body / UI:               DM Sans — clean, modern, readable  
Data / Coordinates:      JetBrains Mono — precise, technical

Font sizes:
Display hero:            72px / weight 300
Section heading:         36px / weight 300
Card heading:            22px / weight 300
Body:                    14px / weight 400
Small / label:           12px / weight 400
Micro / mono:            10px / weight 300
  
## Glass Panel Rules
Every panel must have:
  background: rgba(255, 255, 255, 0.035)
  border: 1px solid rgba(127, 236, 220, 0.12)
  backdrop-filter: blur(20px)
  border-radius: 16px
On hover:
  border-color: rgba(127, 236, 220, 0.28)
  background: rgba(255, 255, 255, 0.055)
Transition: all 300ms ease

## Background Layers (always present)
Layer 1: #05091A solid canvas
Layer 2: Animated star field canvas (280 stars, subtle twinkle)
Layer 3: Nebula blobs — 3 gradient orbs, filter: blur(120px), opacity: 0.07
  Blob 1: #C084FC — top right
  Blob 2: #7FECDC — bottom left  
  Blob 3: #FFD97D — mid left

## Animation Principles
Page load: staggered fade + slide up (0.15s delays between elements)
Hover: 200-300ms ease transitions only
Data loading: signal-received style — not a spinner
Live indicators: pulse ring animation on teal dot
Stars: gentle twinkle via sin wave opacity
No jarring transitions. No bounce. Everything feels like zero gravity.

## Component Patterns
Pills/Badges:   border-radius 99px, mono font, 10px, border + bg tint
Buttons:        glass background, teal border, teal text, blur backdrop
Inputs:         glass bg, teal border on focus, lunar white text
Reaction bars:  icon + count, subtle hover glow in accent colour
Live dot:       7px teal circle + pulse ring animation

## What To Never Do
- Never use pure #000000 black anywhere
- Never use purple gradients on white (generic AI look)
- Never use Inter, Roboto, or Arial
- Never use hard opaque backgrounds on cards
- Never use red for anything except critical system errors
- Never use generic loading spinners
