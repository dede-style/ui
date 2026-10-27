//  A component's PropsPanel schema: plain data, no UI import. `type` picks the widget.

type ControlBase<K extends string = string> = {
    /** The component prop this control drives. */
    prop: K
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
    | (ControlBase & { type: "select"; options: readonly string[]; unset?: string })
    | (ControlBase & { type: "text"; placeholder?: string })
    | (ControlBase & { type: "number"; min?: number; max?: number; step?: number })

export type PropControlType = PropControl["type"]

/** A component's full schema — the list the PropsPanel renders. */
export type PropSchema = readonly PropControl[]

/*  Checked against the props: a `prop` must exist and an option must be a
    value it takes. A glyph prop takes any name; `unset` means "leave it off". */
type Option<V> = [V] extends [string | number] ? `${V}` : string

type ControlFor<P, K extends keyof P & string> =
    | (ControlBase<K> & { type: "boolean" })
    | (ControlBase<K> & { type: "select"; options: readonly Option<NonNullable<P[K]>>[]; unset?: never })
    | (ControlBase<K> & {
          type: "select"
          unset: "none" | "inherit"
          options: readonly (Option<NonNullable<P[K]>> | "none" | "inherit")[]
      })
    | (ControlBase<K> & { type: "text"; placeholder?: string })
    | (ControlBase<K> & { type: "number"; min?: number; max?: number; step?: number })

export type SchemaFor<P> = readonly { [K in keyof P & string]: ControlFor<P, K> }[keyof P & string][]
