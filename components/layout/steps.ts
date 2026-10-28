/*  The spacing steps tokens.css declares, as the values a step prop takes.
    check:tokens keeps each list equal to the declared tokens. */

/** --space-layout-* steps: fluid, measured on the Section. */
export const LAYOUT_STEPS = ["0", "0-25", "0-5", "1", "1-5", "2", "3", "4", "6", "8"] as const

/** --space-component-* steps: fixed, 4px × N. */
export const COMPONENT_STEPS = ["0", "0-25", "0-5", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] as const

export type LayoutStep = (typeof LAYOUT_STEPS)[number]
export type ComponentStep = (typeof COMPONENT_STEPS)[number]

/** A step both scales declare, for a gap that can switch scale (Grid). */
export type SharedStep = LayoutStep & ComponentStep
