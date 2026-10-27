import type { SchemaFor } from "../../props/controls"
import type { SegmentedItemProps } from "./SegmentedItem"
import * as icons from "../../icons"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One segment of a Segmented: its value, its words (or an icon in their place) and its accessible name. Only valid inside a Segmented."

/*  Drives one segment of a pair. No row for `value`: editing it live would
    desync the group's selection. */

const GLYPHS = ["none", ...Object.keys(icons).map((name) => name.replace(/^icon/, ""))]

export const segmentedItemControls: SchemaFor<SegmentedItemProps> = [
    { prop: "label", type: "text", default: "Start", placeholder: "Start", help: "the words on the segment. With a glyph, the accessible name instead" },
    //  Hidden once a glyph is chosen: with no visible words it would duplicate `label`.
    { prop: "a11yLabel", type: "text", default: "", placeholder: "Start of the line", help: "a longer name for screen readers when the visible label is short, such as H for Horizontal", showWhen: { prop: "glyph", equals: "none" } },
    { prop: "glyph", type: "select", options: GLYPHS, default: "none", valuesHref: "/icons", help: "an icon in place of the words, for three or four options in a narrow space" },
]
