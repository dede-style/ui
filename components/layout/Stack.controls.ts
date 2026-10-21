import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Divides a band into lanes and owns its padding and gap. `lanes=\"2|1\"` is two lanes; a responsive object (`{ base: 1, md: \"1|1\" }`) changes them by width. One row is one Stack."

/*  Stack's live-edit schema for the viewer PropsPanel. Hand-written — mirrors the
    props (and defaults) in Stack.tsx. `showWhen` hides engine- or
    direction-specific controls; `default` feeds the table's Default column. */

const LAYOUT_STEPS = ["0", "0-5", "1", "1-5", "2", "3", "4", "6", "8"] as const
const PAD_STEPS = ["none", "0", "0-5", "1", "1-5", "2", "3", "4", "6", "8"] as const

export const stackControls: PropSchema = [
    { prop: "pattern", type: "select", options: ["ratio", "snap"], default: "ratio", help: "ratio (default) lays lanes out by weight; snap places them on a fixed 25-column grid shared by every Section" },
    { prop: "lanes", type: "text", placeholder: "1|2|1", default: "1", help: "lane weights, such as 2|1, or a number of equal lanes. Children fill lanes in order; extra children start a new row. In code it can change by breakpoint: { base: 1, md: 1|1 }" },
    { prop: "direction", type: "select", options: ["horizontal", "vertical"], default: "horizontal", help: "lanes as columns (horizontal) or rows (vertical). Ratio only", showWhen: { prop: "pattern", equals: "ratio" } },
    { prop: "reverse", type: "boolean", default: false, help: "reverse the lane order. In code it can change by breakpoint: { base: true, md: false }" },
    { prop: "align", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "how lanes line up with each other. Default stretch makes them equal height" },
    { prop: "maxWidth", type: "text", placeholder: "content, 60rem, 900px…", default: "", help: "cap the content width and centre it: prose, panel, content, wide or a CSS length. Blank is full width" },
    { prop: "gap", type: "select", options: [...LAYOUT_STEPS], default: "2", help: "space between lanes, a layout spacing step. Default 2" },
    { prop: "paddingX", type: "select", options: [...PAD_STEPS], default: "2", help: "padding at the band's left and right edges. Default 2; none inside another Stack or a nested Section. Ratio only", showWhen: { prop: "pattern", equals: "ratio" } },
    { prop: "paddingTop", type: "select", options: [...PAD_STEPS], default: "2", help: "padding above the band. Default 2; none inside another Stack" },
    { prop: "paddingBottom", type: "select", options: [...PAD_STEPS], default: "2", help: "padding below the band. Default 2; none inside another Stack" },
    { prop: "edges", type: "boolean", default: true, help: "keep a gutter column at each edge. Snap only", showWhen: { prop: "pattern", equals: "snap" } },
    { prop: "gutter", type: "number", min: 0, max: 4, step: 1, default: 1, help: "gutter width in columns. Snap only", showWhen: { prop: "pattern", equals: "snap" } },
]
