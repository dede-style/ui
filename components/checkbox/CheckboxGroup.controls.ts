import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "A labelled set of Checkboxes: a fieldset whose legend names the set. Each Checkbox stays controlled on its own."

//  No value row: the options are independent, each controlled on its own.

export const checkboxGroupControls: PropSchema = [
    { prop: "label", type: "text", default: "", placeholder: "Notifications", help: "the group's name, shown above the options. Required" },
    { prop: "hideLabel", type: "boolean", default: false, help: "hide the name visually but keep it for screen readers, when a heading already says it" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables every checkbox in the group" },
]
