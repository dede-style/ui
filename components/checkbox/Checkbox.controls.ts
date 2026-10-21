import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Include this option, independently of the others. A real checkbox input with a visible label and an optional description; `indeterminate` shows a mixed state for a parent of partly selected items. Controlled."

//  No controls for onChange or the form attributes: forwarded as they are.

export const checkboxControls: PropSchema = [
    { prop: "label", type: "text", default: "", placeholder: "Standard", help: "the visible label and the accessible name. Required" },
    { prop: "description", type: "text", default: "", placeholder: "5–7 business days", help: "an optional second line under the label" },
    { prop: "checked", type: "boolean", default: false, help: "whether it is ticked. Controlled: pass it with onChange" },
    { prop: "size", type: "select", options: ["4", "5", "6"], default: "5", help: "the box: 16, 20 (default) or 24px" },
    { prop: "indeterminate", type: "boolean", default: false, help: "shows a mixed state, for a parent of partly selected items" },
    { prop: "controlPosition", type: "select", options: ["start", "end"], default: "start", help: "the box before the label (start) or after it (end)" },
    { prop: "fullWidth", type: "boolean", default: false, help: "spread the row across its container. Off, the row fits its content" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables the checkbox and dims the row" },
    { prop: "hideLabel", type: "boolean", default: false, help: "hide the label visually but keep it for screen readers, such as in a table's selection column" },
]
