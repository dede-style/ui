import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A setting that takes effect immediately: on or off. A checkbox input with `role=\"switch\"`, a visible label, and the control after the words by default."

//  `checked` is in the panel although the stage is clickable: it is the prop
//  this component exists for.

export const switchControls: PropSchema = [
    { prop: "checked", type: "boolean", default: false, help: "whether the setting is on. Controlled: pass it with onChange" },
    { prop: "label", type: "text", default: "", placeholder: "Show guides", help: "the visible label and the accessible name. Required. Name the setting (Show guides), not its state (Guides on)" },
    { prop: "description", type: "text", default: "", placeholder: "Outline every region", help: "an optional second line under the label" },
    { prop: "size", type: "select", options: ["4", "5", "6"], default: "6", help: "height 16, 20 or 24px (default). 24 is the comfortable touch target" },
    { prop: "controlPosition", type: "select", options: ["start", "end"], default: "end", help: "the switch after the label (end, default) or before it" },
    { prop: "fullWidth", type: "boolean", default: false, help: "spread the row across its container, the switch at the far edge, as in a settings list" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables the switch and dims the row" },
    { prop: "hideLabel", type: "boolean", default: false, help: "hide the label visually but keep it for screen readers, when the name is already on screen" },
]
