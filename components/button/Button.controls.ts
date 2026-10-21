import type { PropSchema } from "../../props/controls"
import * as icons from "../../icons"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A button that does something on this page. `variant` sets how much emphasis it claims — one `primary` per view, `secondary` by default, `tertiary` for the quietest, `destructive` for a dangerous action. It hugs its label; `fullWidth` fills the container. With `href` it renders a link instead, for an action that goes somewhere — Sign up, Try the demo."

//  The glyph list is generated from the icon module; iconPosition shows only with a glyph.

const GLYPHS = ["none", ...Object.keys(icons).map((name) => name.replace(/^icon/, ""))]

export const buttonControls: PropSchema = [
    { prop: "variant", type: "select", options: ["primary", "secondary", "tertiary", "destructive"], default: "secondary", help: "emphasis: primary for the main action (one per view), secondary (default), tertiary for the quietest, destructive for a dangerous action" },
    { prop: "size", type: "select", options: ["6", "8", "10", "12"], default: "10", help: "height: 24, 32, 40 or 48px. 24 is for icon buttons only" },
    { prop: "shape", type: "select", options: ["rounded", "pill", "square"], default: "rounded", help: "corners: rounded (default), pill or square" },
    { prop: "glyph", type: "select", options: GLYPHS, default: "none", valuesHref: "/icons", help: "an optional icon beside the label. In code, import it by its full name: icon plus this (Star is iconStar)" },
    { prop: "iconPosition", type: "select", options: ["start", "end"], default: "start", help: "which side of the label the icon sits on", showWhen: { prop: "glyph", not: "none" } },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables the button and dims it" },
    { prop: "fullWidth", type: "boolean", default: false, help: "fill the container's width. Off, the button fits its label" },
    { prop: "type", type: "select", options: ["button", "submit", "reset"], default: "button", help: "the HTML button type. Default button, so it never submits a form by accident; use submit to submit" },
]
