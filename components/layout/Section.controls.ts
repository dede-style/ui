import type { SchemaFor } from "../../props/controls"
import type { SectionProps } from "./Section"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A full-width band of the page and the measuring stick for everything inside it: spacing and breakpoints measure the Section. Holds one or more Stacks; can paint a background."

export const notes = [
    "**A Section is a frame**: the query container that `cqi` and `@container` measure, and its Stack keeps the side gutter. A Section inside another Section is not, unless `frame`. Plain elements between them (`main`, `footer`, `div`) do not count, so a Section in a plain `<footer>` is still a frame.",
    "**The band's Stack is the Section's direct child.** The gutter rule finds it there; a wrapper between them keeps a nested band's gutter.",
    "**Site page**: no shell. Top-level Sections are the bands, each a frame with its own gutter, inside a plain `<main>` (and `<footer>`). **App page**: one Section holds a Stack whose lanes are the nav, `main` and an aside; the bands inside `main` are nested, so the frame's Stack sets the gutter once. Both shapes are in DESIGN.md, Layout.",
    "**`main` is not in `as`.** A Section is one band and `main` holds several, so `main` is a plain element around Sections. A landmark that is one band (`header`, `footer`) can be a Section.",
    "**Chrome with menus or popovers needs `clip={false}`**: a Section clips its content, so a popover opening outside the bar is cut off.",
    "**A frame's width cannot come from its content** (inline-size containment). A fixed or absolute Section needs a width, such as `inset-inline: 0`, or it collapses to nothing.",
    "**`mode` paints; `data-mode` on a plain element does not.** On any element, `data-mode` switches the colour tokens and the text inside; the background is yours. A bespoke background is a `className` with your own token, not a prop.",
    "Setting `container-type` on a Section from your own class depends on stylesheet order; use `frame`. A Section rendered in a portal (a dialog) is top level, so it is a frame.",
]

/*  Section's live-edit schema for the viewer PropsPanel. Section is the band —
    mode + bg + clip + the guide overlay; spacing lives on Stack. "inherit" and
    "none" are the panel's words for leaving a prop unset. */

export const sectionControls: SchemaFor<SectionProps> = [
    { prop: "as", type: "select", options: ["section", "div", "header", "nav", "aside", "footer", "article"], default: "section", help: "element to render: section by default, or header, nav, aside, footer, article, div" },
    { prop: "aria-label", type: "text", placeholder: "e.g. Section views", help: "the band's accessible name. Set it when the band is a landmark: an unnamed section or nav is not one" },
    { prop: "mode", type: "select", unset: "inherit", options: ["inherit", "light", "dark", "inverse"], default: "inherit", help: "put the band in a mode: its colours, text and background follow it. Inverse is the opposite of the page's mode; inherit takes the mode around it" },
    { prop: "bg", type: "select", unset: "none", options: ["none", "surface", "raised", "sunken"], default: "none", help: "paint the band with a surface role, in its mode. None is transparent, or surface when the band has a mode" },
    { prop: "clip", type: "boolean", default: true, help: "clip content to the band. Off lets content overlap the band's edge" },
    { prop: "frame", type: "boolean", default: false, help: "make a nested Section a frame again, for one that stands alone. Nothing inside it aligns with the rest of the page: spacing and breakpoints measure this band, not the page, and its Stack keeps the inline gutter. A top-level Section is a frame already" },
    { prop: "showGuides", type: "boolean", default: false, help: "draw the layout guide overlay, for development" },
]
