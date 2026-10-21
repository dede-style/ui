import type { PropSchema } from "../../props/controls"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "The label, hint and error around one form control (TextInput, Select). The hint sits above the control, the error below; passing `error` marks the control invalid. Field never validates — the form decides when."

//  Nothing from Sleeve is forwarded: a Field's four rows have a fixed rhythm.

export const fieldControls: PropSchema = [
    { prop: "label", type: "text", default: "", placeholder: "Email address", help: "the control's visible label. Required. Mark an optional field in these words: Middle name (optional)" },
    { prop: "labelHidden", type: "boolean", default: false, help: "hide the label visually but keep it for screen readers, only where the purpose is obvious (a search box beside its button)" },
    { prop: "hint", type: "text", default: "", placeholder: "We'll only use this to reply.", help: "one line of instructions, shown above the control" },
    { prop: "error", type: "text", default: "", placeholder: "Enter a valid email address", help: "an error message, shown below the control. Setting it marks the control invalid" },
    { prop: "id", type: "text", default: "", placeholder: "email", help: "the control's id. Generated if left empty" },
]
