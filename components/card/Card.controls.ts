import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A surface that holds content. It paints (fill, edge, shadow, inset) but does not arrange: its width comes from the lane or Grid cell it sits in, and its children are spaced like a Sleeve's."

/*  `padding` is a dropdown because the prop takes a step, not a length. The
    small steps are left out: a card wants none or the large end. */

export const cardControls: PropSchema = [
    { prop: "elevation", type: "select", options: ["sunken", "flush", "raised"], default: "raised", help: "raised (default) sits above the page, flush on it, sunken below it" },
    { prop: "border", type: "boolean", default: true, help: "draw the card's edge. Off keeps the card the same size" },
    { prop: "padding", type: "select", options: ["none", "3", "4", "5", "6", "8", "10", "12"], default: "6", help: "space inside the card, a fixed spacing step. none lets an image reach the card's edges" },
    { prop: "gap", type: "select", options: ["none", "1", "2", "3", "4", "6"], default: "3", help: "space between the card's children. none puts an image flush against the content below it" },
    { prop: "justify", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where the card's children sit across it. Default stretch fills the card's width" },
]
