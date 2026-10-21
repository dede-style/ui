//  A component's PropsPanel schema: plain data, no UI import. `type` picks the widget.

type ControlBase = {
    /** The component prop this control drives. */
    prop: string
    /** Display label. Defaults to `prop`. */
    label?: string
    /** The Description column. */
    help?: string
    /** The Default column. */
    default?: string | number | boolean
    /** Show only when another prop matches (`equals`) or does not (`not`). */
    showWhen?:
        | { prop: string; equals: string | readonly string[]; not?: never }
        | { prop: string; not: string | readonly string[]; equals?: never }
    /** For a `select` too long to print: a link to the full catalogue. */
    valuesHref?: string
}

export type PropControl =
    | (ControlBase & { type: "boolean" })
    | (ControlBase & { type: "select"; options: readonly string[] })
    | (ControlBase & { type: "text"; placeholder?: string })
    | (ControlBase & { type: "number"; min?: number; max?: number; step?: number })

export type PropControlType = PropControl["type"]

/** A component's full schema — the list the PropsPanel renders. */
export type PropSchema = readonly PropControl[]
