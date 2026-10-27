import type { SchemaFor } from "../../props/controls"
import type { TextInputProps } from "./TextInput"
import * as icons from "../../icons"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One line of typed text. `type` sets the keyboard and browser handling; affixes (text or an icon) sit inside the box. Put it in a Field for a label, hint and error. Controlled."

/*  Affix glyph lists are generated from the icon module. No rows for name,
    autoComplete, inputMode or aria-label: they change no pixel. */

const GLYPHS = ["none", ...Object.keys(icons).map((name) => name.replace(/^icon/, ""))]

export const textInputControls: SchemaFor<TextInputProps> = [
    { prop: "value", type: "text", default: "", placeholder: "Ada Lovelace", help: "the text. Controlled: pass it with onChange" },
    { prop: "type", type: "select", options: ["text", "email", "password", "tel", "url", "search", "number"], default: "text", help: "what is being typed: text, email, password, tel, url, search or number. Sets the keyboard and browser behaviour" },
    { prop: "variant", type: "select", options: ["frame", "plain"], default: "frame", help: "frame (default) draws the box; plain has no box, for a search in a toolbar. Give a plain field an icon or placeholder" },
    { prop: "size", type: "select", options: ["8", "10", "12"], default: "10", help: "height: 32, 40 (default) or 48px, matching Button" },
    { prop: "width", type: "select", options: ["2", "3", "4", "5", "10", "20", "full"], default: "full", help: "how many characters the box fits, as a hint of the expected length. full fills the container" },
    { prop: "placeholder", type: "text", default: "", placeholder: "e.g. Ada Lovelace", help: "an example of the format, shown until something is typed. Not a label" },
    { prop: "prefix", type: "text", default: "", placeholder: "£", help: "text at the start of the box, such as a currency sign" },
    { prop: "prefixIcon", type: "select", options: GLYPHS, default: "none", valuesHref: "/icons", help: "an icon at the start of the box. In code, import it by its full name: icon plus this (Search is iconSearch)" },
    { prop: "suffix", type: "text", default: "", placeholder: "kg", help: "text at the end of the box, such as a unit" },
    { prop: "suffixIcon", type: "select", options: GLYPHS, default: "none", valuesHref: "/icons", help: "an icon at the end of the box" },
    { prop: "required", type: "boolean", default: false, help: "requires a value before the form submits. No asterisk is shown; mark optional fields in their label" },
    { prop: "disabled", type: "boolean", default: false, help: "disables the field and dims it. Prefer readOnly when the value should still be read or copied" },
    { prop: "readOnly", type: "boolean", default: false, help: "the value can be read, selected and copied, and is submitted, but not edited" },
    { prop: "maxLength", type: "number", min: 0, max: 200, help: "the most characters allowed" },
]
