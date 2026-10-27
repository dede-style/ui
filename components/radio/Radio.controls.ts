import type { SchemaFor } from "../../props/controls"
import type { RadioProps } from "./Radio"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One option of a RadioGroup. It takes its name and the selected value from the group, so it cannot be used on its own."

//  No row for `value`: editing it live would desync the group's selection.

export const radioControls: SchemaFor<RadioProps> = [
    { prop: "label", type: "text", default: "", placeholder: "Standard", help: "the visible label and the accessible name. Required" },
    { prop: "description", type: "text", default: "", placeholder: "5–7 business days", help: "an optional second line under the label" },
    { prop: "size", type: "select", options: ["4", "5", "6"], default: "5", help: "the circle: 16, 20 (default) or 24px" },
    { prop: "controlPosition", type: "select", options: ["start", "end"], default: "start", help: "the circle before the label (start) or after it (end)" },
    { prop: "fullWidth", type: "boolean", default: false, help: "spread the row across its container. Off, the row fits its content" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables this option only; disable the whole set on the RadioGroup" },
    { prop: "hideLabel", type: "boolean", default: false, help: "hide the label visually but keep it for screen readers" },
]
