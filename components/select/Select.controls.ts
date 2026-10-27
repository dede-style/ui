import type { SchemaFor } from "../../props/controls"
import type { SelectProps } from "./Select"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "One choice from a list that opens over the page. Same box as TextInput, keyboard and type-ahead like a native select, and form participation through `name`."

/*  No row for `options` (an array the panel's widgets cannot edit) or `value`
    (the specimen is the control). */

export const selectControls: SchemaFor<SelectProps> = [
    { prop: "placeholder", type: "text", default: "", placeholder: "Choose a size", help: "shown until an option is chosen. Not a label" },
    { prop: "size", type: "select", options: ["8", "10", "12"], default: "10", help: "height: 32, 40 (default) or 48px, matching TextInput and Button" },
    { prop: "variant", type: "select", options: ["frame", "plain"], default: "frame", help: "frame (default) draws the box; plain has no box, for a toolbar" },
    { prop: "width", type: "select", options: ["2", "3", "4", "5", "10", "20", "full"], default: "full", help: "how many characters the trigger fits. full fills the container" },
    { prop: "disabled", type: "boolean", default: false, help: "disables the select and dims it" },
    { prop: "required", type: "boolean", default: false, help: "requires a choice before the form submits. No asterisk is shown" },
    { prop: "invalid", type: "boolean", default: false, help: "shows the error state. Inside a Field it follows the Field's error" },
]
