import type { SchemaFor } from "../../props/controls"
import type { TextareaProps } from "./Textarea"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Several lines of typed text, in the same box as TextInput. `rows` sets the height in lines and the smallest it can be dragged to. It fills its container's width. Put it in a Field for a label, hint and error. Controlled."

export const notes = [
    "**`rows` is the height and the minimum.** The person can drag the box taller (`resize=\"vertical\"`, the default) but never shorter than `rows`. `resize=\"none\"` removes the drag handle. It never resizes sideways: it fills its container.",
    "**`autoSize` grows the box as the person types**, from `rows` up, using CSS `field-sizing: content`. Chrome and Edge 123+, Safari 26.2+ and Firefox 152+ support it. In older browsers the box stays at `rows` and keeps its drag handle. Where it grows, the drag handle is removed.",
    "**`size` matches a TextInput of the same size:** the same text size, and the same space above the first line, so a Textarea and a TextInput line up in one form.",
    "**No character counter.** `maxLength` sets the attribute only.",
]

/*  No rows for name, id, autoComplete or aria-label: they change no pixel. */
export const textareaControls: SchemaFor<TextareaProps> = [
    { prop: "value", type: "text", default: "", help: "the text. Controlled: pass it with onChange" },
    { prop: "rows", type: "select", options: ["2", "3", "4", "5", "6", "8"], default: "3", help: "the height in lines: 2, 3 (default), 4, 5, 6 or 8. It is also the smallest the box can be dragged to" },
    { prop: "resize", type: "select", options: ["vertical", "none"], default: "vertical", help: "vertical (default) lets the person drag the box taller; none removes the drag handle. Never sideways" },
    { prop: "autoSize", type: "boolean", default: false, help: "grows the box as the person types, from rows up. Works in Chrome and Edge 123+, Safari 26.2+ and Firefox 152+; older browsers keep the rows height and the drag handle" },
    { prop: "variant", type: "select", options: ["frame", "plain"], default: "frame", help: "frame (default) draws the box; plain has no box, only the focus ring" },
    { prop: "size", type: "select", options: ["8", "10", "12"], default: "10", help: "the text size and padding of a TextInput of this size (32, 40 or 48px), so the two line up in a form. The height comes from rows" },
    { prop: "placeholder", type: "text", default: "", help: "an example of what to write, shown until something is typed. Not a label" },
    { prop: "required", type: "boolean", default: false, help: "requires a value before the form submits. No asterisk is shown; mark optional fields in their label" },
    { prop: "disabled", type: "boolean", default: false, help: "disables the field and dims it. Prefer readOnly when the text should still be read or copied" },
    { prop: "readOnly", type: "boolean", default: false, help: "the text can be read, selected and copied, and is submitted, but not edited" },
    { prop: "maxLength", type: "number", min: 0, max: 2000, help: "the most characters allowed. There is no counter" },
]
