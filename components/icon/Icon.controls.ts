import type { SchemaFor } from "../../props/controls"
import type { IconProps } from "./Icon"
import * as icons from "../../icons"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "An SVG glyph from `@dede-style/ui/icons`, sized on the element ramp and coloured by `currentColor`. Decorative by default; give `label` only when the icon is the content."

/*  The glyph list is generated from the module, so it cannot fall behind it.
    The `icon` prefix is stripped because a native select's type-ahead matches
    on prefix. */

const GLYPHS = Object.keys(icons).map((name) => name.replace(/^icon/, ""))

export const iconControls: SchemaFor<IconProps> = [
    { prop: "glyph", type: "select", options: GLYPHS, default: "Star", valuesHref: "/icons", help: "the icon. In code, import it by its full name: icon plus this (Star is iconStar)" },
    { prop: "size", type: "select", options: ["3", "4", "5", "6", "8", "10", "12", "text", "fill"], default: "6", help: "a size step (16, 20, 24px…), or text to match the surrounding type, or fill to fill the container" },
    { prop: "label", type: "text", default: "", placeholder: "leave empty", help: "leave empty for a decorative icon. Set it only when the icon is the content; an icon button takes its name on the button" },
]
