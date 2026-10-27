import type { SchemaFor } from "../../props/controls"
import type { SleeveProps } from "./Sleeve"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Spaces the content inside one region — a heading, its text, a table — in a single column on the fixed component scale. Goes inside a Slot."

/*  Gap options are --space-component-* steps (fixed), not layout steps. The
    1px and 2px micro steps are left out: no content rhythm wants them. */

export const sleeveControls: SchemaFor<SleeveProps> = [
    { prop: "gap", type: "select", options: ["none", "1", "2", "3", "4", "5", "6", "8"], default: "3", help: "space between children, a fixed --space-component-* step. Default 3 (12px)" },
    { prop: "justify", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where children sit across the Sleeve. Anything but stretch makes each child as wide as its content" },
    { prop: "alignContent", type: "select", options: ["start", "center", "end", "stretch"], default: "start", help: "where the content sits when the Sleeve is taller than it. Default start" },
]
