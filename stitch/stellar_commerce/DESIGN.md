```markdown
# Design System Specification: The Architectural Authority

## 1. Overview & Creative North Star
### The Creative North Star: "The Digital Concierge"
This design system moves away from the cluttered, "spreadsheet-style" density of traditional B2B marketplaces. Instead, it adopts the persona of a high-end architectural firm: authoritative, precise, and effortlessly organized. We reject the "standard" boxy UI in favor of a **Layered Editorial** approach. 

By utilizing intentional asymmetry, expansive white space, and a sophisticated hierarchy of surfaces, we transform a wholesale marketplace into an elite procurement experience. This system signals to the user that they aren't just buying goods; they are engaging in a premium professional partnership.

---

## 2. Colors: Tonal Depth over Structural Lines
Our palette is rooted in a deep, "Midnight Navy" to establish immediate trust, supported by cool grays that provide a modern, industrial polish.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders (`#CCCCCC`) are strictly prohibited for sectioning. Boundaries must be defined through background shifts or tonal transitions. To separate a product grid from a filter sidebar, use `surface-container-low` against a `surface` background. 

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical materials.
*   **Base Layer:** `surface` (#f7f9fc) – The canvas.
*   **Secondary Content:** `surface-container-low` (#f2f4f7) – Used for subtle grouping of secondary information.
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) – Reserved for high-priority interactive cards to make them "pop" against the gray base.
*   **Active Overlays:** `surface-bright` (#f7f9fc) – Used for elevated navigation or active states.

### The "Glass & Gradient" Rule
To inject "soul" into the professional gray, utilize:
*   **Signature Gradients:** For 'Order Now' CTAs, use a linear gradient from `primary` (#000666) to `primary_container` (#1a237e) at a 135-degree angle. This prevents the primary action from feeling flat and static.
*   **Glassmorphism:** For mobile navigation bars and floating headers, use `surface` at 80% opacity with a `backdrop-blur: 20px`. This integrates the UI and makes the marketplace feel like a singular, fluid environment.

---

## 3. Typography: The Editorial Scale
We use a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision. Use `display-lg` (3.5rem) and `headline-md` (1.75rem) to create an "Editorial" feel in hero sections. This conveys B2B authority.
*   **Body & UI (Inter):** The workhorse. Inter provides maximum legibility for SKU numbers, pricing tables, and logistics data. 
*   **The Hierarchy Rule:** Never use more than three levels of typography on a single screen. Use `title-lg` for product names and `label-sm` for technical specifications to create an immediate visual "scan-path."

---

## 4. Elevation & Depth
In this system, depth is a functional tool, not a decorative one.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card on top of a `surface-container-low` section to create a soft, natural lift.

### Ambient Shadows
When a floating effect is required (e.g., a "Request Quote" modal), use the following:
*   **Blur:** 32px to 48px.
*   **Opacity:** 4% - 6%.
*   **Tint:** Use a shadow color derived from `on_surface` (#191c1e) to ensure the shadow feels like a natural obstruction of light, not a "dark smudge."

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use the `outline_variant` (#c6c5d4) at **20% opacity**. Never use 100% opaque borders; they disrupt the "Digital Concierge" flow.

---

## 5. Components

### Buttons: The "Power Actions"
*   **Primary (Order Now):** Filled with the signature `primary` to `primary_container` gradient. Border radius: `md` (0.375rem). High-contrast white text (`on_primary`).
*   **Secondary (Request Quote):** `surface-container-lowest` background with a `primary` ghost border (20% opacity). This maintains visibility without competing with the final conversion button.
*   **Tertiary:** Text-only with `label-md` styling, used for "cancel" or "back" actions.

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Execution:** Use `24px` of vertical white space (the Spacing Scale) and subtle background shifts (`surface-container-low` to `surface-container-lowest`) to separate line items in a wholesale order list.

### Input Fields
*   **Style:** Minimalist. No bottom line or full box. Use a `surface-container-highest` background with a `sm` (0.125rem) rounded corner. 
*   **Focus State:** Shift background to `surface-container-lowest` and apply a subtle `primary` glow (ambient shadow).

### Wholesale Progress Tracker (Custom Component)
A horizontal stepper for "Quote -> Approval -> Shipping." Use `secondary_container` for inactive steps and a pulsing `primary` for the active state. No connecting lines; use proximity and typography to imply flow.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use "Breathing Room." If you think a section needs more space, add 8px more. B2B complexity requires visual "quiet."
*   **DO** use `tertiary` (#380b00) tokens sparingly for "Urgent" notices or "Low Stock" alerts to provide a professional warmth that isn't as aggressive as "Error Red."
*   **DO** prioritize the mobile experience. Ensure all touch targets for "Add to Quote" are at least 44px in height.

### Don't:
*   **DON'T** use pure black (#000000). Always use `on_surface` (#191c1e) for text to maintain the high-end, softened aesthetic.
*   **DON'T** use standard "Drop Shadows" from a UI kit. Always use the Ambient Shadow formula defined in Section 4.
*   **DON'T** clutter the product grid. Use "Asymmetric Loading"—where some images are slightly larger than others—to break the monotony of a 500-item catalog.