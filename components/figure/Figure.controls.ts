import type { SchemaFor } from "../../props/controls"
import { LAYOUT_STEPS } from "../layout/steps"
import type { FigureProps } from "./Figure"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Content with an optional caption under it: an image, a video, an SVG or a component. It fills its lane. `caption` makes it a `<figure>` with a `<figcaption>`. `surface=\"sunken\"` puts the content in a rounded panel, with padding per edge (`paddingTop`, `paddingBottom`, `paddingStart`, `paddingEnd`) and an optional `mode`. `contentRatio` crops the content to a ratio such as `\"16:9\"`, and `contentPosition` says which part it keeps; `panelRatio` gives the panel a ratio. `fit` sets the content's width as a share of the frame, and `justify` and `align` place it. Figure never renders the image itself: pass your own `<img>` or your framework's image."

const PAD_STEPS = ["none", ...LAYOUT_STEPS] as const

export const notes = [
    "**The caption is always under the frame**: under the panel when there is one, under the content when not. It is never inside the panel.",
    "**A panel colour of your own** is the sunken role set on your own class: `.canvas-brand { --color-surface-sunken: …; }` with `<Figure surface=\"sunken\" className=\"canvas-brand\">`. dede checks contrast only for its own colours.",
    "**Content taller than its panel** starts at the panel's top and runs off the bottom, unless `align=\"end\"`, which keeps its bottom edge on the panel's bottom and runs off the top. The panel clips it, unless `overflow=\"visible\"`.",
    "**A ratio is written with a colon**, `\"16:9\"`. `\"16/9\"` and `\"16 / 9\"` work too, and decimals are fine (`\"1:1.414\"`). A value that is not a ratio is ignored, with a warning in development.",
    "**Two ways to show part of an image.** The panel can cut it: give the panel a `panelRatio` and let a tall image run off an edge, which says there is more of it. Or crop the content itself with `contentRatio` and `contentPosition`, which gives the visible part a clean shape of its own.",
    "**Figure fills its lane by default**, unlike controls, which hug. An image has no natural size that suits a page. To make it narrower, use `fit` or put it in a narrower lane.",
]

export const figureControls: SchemaFor<FigureProps> = [
    { prop: "caption", type: "text", values: "text or any React content", default: "", placeholder: "A caption", help: "text under the frame. Given, the figure is a <figure> and this its <figcaption>. Blank, it is a plain wrapper" },
    { prop: "surface", type: "select", options: ["none", "sunken"], default: "none", help: "sunken puts the content in a rounded panel, in the sunken surface colour. None (default) shows the content alone" },
    { prop: "mode", type: "select", unset: "inherit", options: ["inherit", "light", "dark", "inverse"], default: "inherit", help: "put the panel in a mode, as Section’s mode. Light keeps a sketch’s panel light on a dark page. Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "contentRatio", type: "text", values: "a ratio written `16:9` or `16/9` (the exported type `FigureRatio`)", default: "", help: "crop the content to this ratio of width to height, such as 16:9 or 1:1. An image, video or SVG inside fills it and is cut to fit. Blank keeps the content’s own shape" },
    { prop: "contentPosition", type: "select", options: ["center", "top", "bottom", "start", "end"], default: "center", help: "which part of the content the crop keeps: center (default), top, bottom, start (left) or end (right). An inline SVG follows its own preserveAspectRatio instead. With contentRatio only", showWhen: { prop: "contentRatio", not: "" } },
    { prop: "panelRatio", type: "text", values: "a ratio written `16:9` or `16/9` (the exported type `FigureRatio`)", default: "", help: "give the panel this ratio of width to height, such as 16:9. Content taller than the panel runs off an edge. Blank, the panel is the content’s height plus its padding. Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "fit", type: "number", min: 0, max: 1, step: 0.05, default: 1, help: "the content’s width as a share of the frame: 0.85 is 85%. Without a panel, the caption takes the same width" },
    { prop: "justify", type: "select", options: ["start", "center", "end"], default: "center", help: "where the content sits from side to side: start (left), center (default) or end (right)" },
    { prop: "align", type: "select", options: ["start", "center", "end"], default: "center", help: "where the content sits from top to bottom, in a panel taller than it. Content taller than the panel starts at the top, unless end. Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "paddingTop", type: "select", options: [...PAD_STEPS], default: "2", help: "the panel’s padding at the top, a layout spacing step. None lets the content meet that edge. Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "paddingBottom", type: "select", options: [...PAD_STEPS], default: "2", help: "the panel’s padding at the bottom. None lets a tall document run off the bottom. Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "paddingStart", type: "select", options: [...PAD_STEPS], default: "2", help: "the panel’s padding at the start (left). Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "paddingEnd", type: "select", options: [...PAD_STEPS], default: "2", help: "the panel’s padding at the end (right). Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "overflow", type: "select", options: ["hidden", "visible"], default: "hidden", help: "hidden (default) cuts the content off at the panel’s edge; visible lets it spill past. Panel only", showWhen: { prop: "surface", equals: "sunken" } },
    { prop: "border", type: "boolean", default: false, help: "a hairline round the content, for an image whose own edge is white. It is drawn over the content, so it takes no room" },
    { prop: "rounded", type: "boolean", default: false, help: "round the content’s corners, for a photo standing alone. The panel is always rounded; content inside it is square unless this is on" },
]
