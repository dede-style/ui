import type { PropSchema } from "../../props/controls"
import * as icons from "../../icons"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A button with an icon and no visible words. `label` is required and becomes its accessible name. Same variants, sizes and shapes as Button; with `href` it renders a link instead."

/*  Button's rows minus iconPosition and fullWidth, plus a required label. Not
    derived by filtering: the help text differs too. */

const GLYPHS = Object.keys(icons).map((name) => name.replace(/^icon/, ""))

export const iconButtonControls: PropSchema = [
    { prop: "glyph", type: "select", options: GLYPHS, default: "Star", valuesHref: "/icons", help: "the icon. In code, import it by its full name: icon plus this (Star is iconStar)" },
    { prop: "label", type: "text", default: "", placeholder: "required", help: "required: the button's accessible name, since it has no visible words" },
    { prop: "variant", type: "select", options: ["primary", "secondary", "tertiary", "destructive"], default: "secondary", help: "emphasis: primary, secondary (default), tertiary or destructive" },
    { prop: "size", type: "select", options: ["6", "8", "10", "12"], default: "10", help: "24, 32, 40 or 48px square. Use 24 only where space demands it: it is the minimum touch target" },
    { prop: "shape", type: "select", options: ["rounded", "pill", "square"], default: "rounded", help: "corners: rounded (default), pill (a circle) or square" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables the button and dims it" },
    { prop: "type", type: "select", options: ["button", "submit", "reset"], default: "button", help: "the HTML button type. Default button, so it never submits a form by accident" },
]
