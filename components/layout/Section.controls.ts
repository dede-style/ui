import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A full-width band of the page and the measuring stick for everything inside it: spacing and breakpoints measure the Section. Holds one or more Stacks; can paint a background."

/*  Section's live-edit schema for the viewer PropsPanel. Section is the band —
    bg + clip + the guide overlay; spacing lives on Stack. bg is a select of the
    semantic --color-* tokens (the playground maps the choice to a var()); "none"
    = transparent. (bg-image / gradient / mode-context come later.) */

export const sectionControls: PropSchema = [
    { prop: "as", type: "select", options: ["section", "div", "header", "nav", "aside", "footer", "article"], default: "section", help: "element to render: section by default, or header, nav, aside, footer, article, div" },
    { prop: "aria-label", type: "text", placeholder: "e.g. Section views", help: "the band's accessible name. Set it when the band is a landmark: an unnamed section or nav is not one" },
    { prop: "bg", type: "select", options: ["none", "surface-1", "surface-2", "surface-3", "bg", "bg-overlay"], default: "none", help: "a background for the band, from the colour roles" },
    { prop: "clip", type: "boolean", default: true, help: "clip content to the band. Off lets content overlap the band's edge" },
    { prop: "queryContainer", type: "boolean", default: false, help: "for a nested band that stands alone (a card, a demo): spacing and breakpoints inside it measure this band, not the page. Nothing inside then aligns with the rest of the page" },
    { prop: "showGuides", type: "boolean", default: false, help: "draw the layout guide overlay, for development" },
]
