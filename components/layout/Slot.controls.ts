import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One region in a Stack lane. The Stack places it; the Slot can position its own content and render a semantic element (`article`, `nav`, `ul`…)."

//  A Slot's size comes from its Stack, so there are no sizing controls.

export const slotControls: PropSchema = [
    { prop: "as", type: "select", options: ["div", "article", "aside", "figure", "header", "footer", "nav", "ul", "ol"], default: "div", help: "element to render: div by default, or article, main, aside, figure, header, footer, nav, ul, ol" },
    { prop: "alignSelf", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where this slot sits in its lane, overriding the Stack's align" },
    { prop: "justify", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where the slot's content sits across it" },
    { prop: "align", type: "select", options: ["stretch", "start", "center", "end"], default: "stretch", help: "where the slot's content sits down it, when the slot is taller than its content" },
]
