import type { SchemaFor } from "../../props/controls"
import type { SegmentedProps } from "./Segmented"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One choice from two to four short options, every option on screen in one track. Real radio inputs underneath, so it works with the keyboard and in forms. Children are SegmentedItems."

/*  No row for children (SegmentedItem has its own page) or `value` (the
    specimen is the control). `label` is editable because the group's name
    exists only in the accessibility tree. */

export const segmentedControls: SchemaFor<SegmentedProps> = [
    { prop: "label", type: "text", default: "", placeholder: "Direction", help: "the group's accessible name: what the options are a choice of. Required" },
    { prop: "size", type: "select", options: ["8", "10", "12"], default: "10", help: "height: 32, 40 (default) or 48px, matching Button" },
    { prop: "fullWidth", type: "boolean", default: false, help: "fill the container. Segments stay equal widths" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables the whole control; the selected option stays visible" },
]
