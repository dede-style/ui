import type { SchemaFor } from "../../props/controls"
import type { RadioGroupProps } from "./RadioGroup"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One choice from a set where every option is visible and can carry a description. A fieldset with a legend; controlled by `value` and `onChange`."

//  No row for `value`: choosing on the stage is the demonstration.

export const radioGroupControls: SchemaFor<RadioGroupProps> = [
    { prop: "label", type: "text", default: "", placeholder: "Delivery", help: "the group's name, shown above the options. Required" },
    { prop: "hideLabel", type: "boolean", default: false, help: "hide the name visually but keep it for screen readers, when a heading already says it" },
    { prop: "isDisabled", type: "boolean", default: false, help: "disables every option" },
    { prop: "required", type: "boolean", default: false, help: "requires a choice before the form submits (browser validation)" },
]
