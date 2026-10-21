import type { CSSProperties, ReactNode } from "react"

/*  Table — rows of records in a real <table>, which supplies the roles, the
    keyboard and the screen-reader grid. Each part is a thin wrapper adding a
    class, a `data-component` and the props it owns: Table (what is true of the
    whole table), TableHead/Body/Foot, TableRow (`selected`), TableCell (<td>,
    or <th> when given a `scope`, so no context and no client boundary).

    Composed, not `columns` + `data`: cells hold swatches, code and controls. A
    data-driven layer can be built on these parts later.

    Padding belongs to the table (`size`); a cell takes only a named case. Row
    heights come from --size-element-*, the controls' ramp: a single-line row
    is exactly 32 / 40 / 48. */

export type TableSize = "8" | "10" | "12"
export type TableAlign = "baseline" | "top" | "middle"
export type TableDividers = "rows" | "grid" | "none"

export type TableProps = {
    /** A --size-element-* step: a single-line row of 32 / 40 / 48px, so a
     *  control sits in a row without growing it. Type is `sm` at 8 and 10,
     *  `base` at 12. Default "10". */
    size?: TableSize
    /** The block axis of every cell. Default "baseline", so first lines stay
     *  aligned when a neighbour wraps. "middle" centres on the row; "top" is
     *  for cells deliberately different in size (a type specimen beside its
     *  name). Control cells align themselves. */
    align?: TableAlign
    /** A wash on the row under the pointer, for rows that are things to pick. */
    hover?: boolean
    /** A wash on every second body row, for a table wide enough to lose the row. */
    striped?: boolean
    /** Which hairlines are drawn: "rows" (default) between rows, "grid" between
     *  rows and columns, "none". */
    dividers?: TableDividers
    /** The table's title, as a <caption>. */
    caption?: ReactNode
    /** The id of a heading outside the table that names it. Use this or
     *  `caption`, not both. */
    labelledBy?: string
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export function Table({
    size = "10",
    align = "baseline",
    hover = false,
    striped = false,
    dividers = "rows",
    caption,
    labelledBy,
    className,
    style,
    children,
}: TableProps) {
    const classes = [
        "dede-table",
        `dede-table--size-${size}`,
        `dede-table--align-${align}`,
        `dede-table--dividers-${dividers}`,
        hover && "dede-table--hover",
        striped && "dede-table--striped",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <table data-component="Table" className={classes} style={style} aria-labelledby={labelledBy}>
            {caption !== undefined && <caption className="dede-table-caption">{caption}</caption>}
            {children}
        </table>
    )
}

//  The sections: no props, but a `data-component` on every part.

export type TableSectionProps = {
    className?: string
    children: ReactNode
}

export function TableHead({ className, children }: TableSectionProps) {
    return (
        <thead data-component="TableHead" className={join("dede-table-head", className)}>
            {children}
        </thead>
    )
}

export function TableBody({ className, children }: TableSectionProps) {
    return (
        <tbody data-component="TableBody" className={join("dede-table-body", className)}>
            {children}
        </tbody>
    )
}

export function TableFoot({ className, children }: TableSectionProps) {
    return (
        <tfoot data-component="TableFoot" className={join("dede-table-foot", className)}>
            {children}
        </tfoot>
    )
}

/*  The row paints `selected`; it never holds or sets it. The Checkbox in the
    row is the state for assistive tech, so no aria-selected (valid only in a
    grid). No select-on-click: a row holds links and controls. */

export type TableRowProps = {
    /** Paints the row as chosen. The consumer holds the selection. Replaces a
     *  stripe; hover composes over it. */
    selected?: boolean
    className?: string
    children: ReactNode
}

export function TableRow({ selected = false, className, children }: TableRowProps) {
    const classes = ["dede-table-row", selected && "dede-table-row--selected", className]
        .filter(Boolean)
        .join(" ")

    return (
        <tr data-component="TableRow" className={classes}>
            {children}
        </tr>
    )
}


export type TableCellJustify = "start" | "end" | "center"
export type TableCellScope = "col" | "row"

export type TableCellProps = {
    /** Makes this a <th>: "col" for a column header, "row" for the cell that
     *  names its row. */
    scope?: TableCellScope
    /** The inline axis. Default "start"; "end" for numbers. A header takes its
     *  column's. */
    justify?: TableCellJustify
    /** A number: justifies end and uses tabular figures. */
    numeric?: boolean
    /** A named case instead of the table's inset. "none": the content is its
     *  own box. "control": a control one step below its row, pinned to the top
     *  (an icon-only control has no baseline). "checkbox": a hidden-label 16px
     *  Checkbox, centred in the row, column forced to its content. */
    padding?: "none" | "control" | "checkbox"
    /** Forwarded as is. */
    colSpan?: number
    rowSpan?: number
    className?: string
    children?: ReactNode
}

export function TableCell({
    scope,
    justify,
    numeric = false,
    padding,
    colSpan,
    rowSpan,
    className,
    children,
}: TableCellProps) {
    const inline = justify ?? (numeric ? "end" : undefined)
    const classes = [
        "dede-table-cell",
        inline && `dede-table-cell--justify-${inline}`,
        numeric && "dede-table-cell--numeric",
        padding && `dede-table-cell--padding-${padding}`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return scope ?
            <th data-component="TableCell" scope={scope} className={classes} colSpan={colSpan} rowSpan={rowSpan}>
                {children}
            </th>
        :   <td data-component="TableCell" className={classes} colSpan={colSpan} rowSpan={rowSpan}>
                {children}
            </td>
}

function join(base: string, className?: string): string {
    return className ? `${base} ${className}` : base
}
