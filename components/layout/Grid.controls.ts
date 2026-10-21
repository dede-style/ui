import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Tiles a collection of unknown count — cards, images, logos — into as many equal columns of at least `minColumnWidth` as fit, reflowing with its own width. Renders a list (`<ul>`), wrapping each child in an `<li>`."

/*  Grid's live-edit schema for the viewer PropsPanel. Grid tiles a uniform
    collection that wraps and reflows its column count with the container width
    (no breakpoints) — `repeat(auto-fit, minmax(minColumnWidth, 1fr))`. */

// Every step exists in both families — component (fixed px) and layout (fluid
// clamp) — so any gap resolves under either gapScale.
const GAP_STEPS = ["0", "0-25", "0-5", "1", "2", "3", "4", "6", "8"] as const

export const gridControls: PropSchema = [
    { prop: "as", type: "select", options: ["ul", "ol", "div"], default: "ul", help: "element to render. ul by default, wrapping each child in an li; ol when order matters; div when it is not a collection" },
    { prop: "minColumnWidth", type: "text", placeholder: "16rem", default: "16rem", help: "the narrowest a column may be; as many columns as fit, then wrap. Any CSS length; a bare number is px" },
    { prop: "maxColumns", type: "number", default: 0, min: 0, max: 12, help: "the most columns allowed. Omit (0 here) for no limit. In code it can change by breakpoint: { base: 1, sm: 3 }" },
    { prop: "gap", type: "select", options: [...GAP_STEPS], default: "4", help: "space between items, a spacing step" },
    { prop: "gapScale", type: "select", options: ["component", "layout"], default: "component", help: "component for a fixed gap, layout for one that grows with the Section" },
    { prop: "ratio", type: "text", placeholder: "1:1, 16:9…", default: "", help: "a fixed aspect ratio for every cell, such as 16:9. Blank keeps each item's natural height" },
    { prop: "justify", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where each item sits across its cell. Default stretch fills the column" },
    { prop: "align", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where each item sits down its cell. Default stretch makes every item in a row the same height" },
    { prop: "stretch", type: "boolean", default: true, help: "when there are fewer items than columns, they widen to fill the row. Off leaves the spare columns empty" },
]
