import type { IconSize } from "./Icon"

/*  A control's glyph is half its height: 24 → 12, 32 → 16, 40 → 20, 48 → 24.
    One rule for Button, IconButton, Segmented, TextInput and Select, so a glyph
    is the same size in every control of one height. Set through Icon's `size`
    prop: a CSS descendant rule would out-specify the Icon's own size. Internal,
    not in the barrel. select.css derives the chevron's room from the same rule. */

export type ControlSize = "6" | "8" | "10" | "12"

const HALF: Record<ControlSize, IconSize> = { "6": "3", "8": "4", "10": "5", "12": "6" }

export function controlGlyph(size: ControlSize): IconSize {
    return HALF[size]
}
