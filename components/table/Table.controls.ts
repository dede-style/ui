import type { SchemaFor } from "../../props/controls"
import type { TableCellProps, TableProps, TableRowProps } from "./Table"
import type { TableContainerProps } from "./container"

//  The intro for this component's generated doc and DESIGN.md.
export const summary =
    "Rows of records in a real `<table>`, built from TableHead, TableBody, TableFoot, TableRow and TableCell. Size, alignment, dividers, stripes and hover are set once on the Table; TableContainer adds horizontal scrolling."

/*  The panel drives the table's own props only. Row, cell and container props
    are per-row or per-cell, so they are documented as static tables. */

export const tableControls: SchemaFor<TableProps> = [
    { prop: "size", type: "select", options: ["8", "10", "12"], default: "10", help: "row height: 32, 40 (default) or 48px. A control fits in a row without growing it" },
    { prop: "align", type: "select", options: ["baseline", "top", "middle"], default: "baseline", help: "vertical alignment of every cell: baseline (default) lines up first lines, middle centres, top for cells of very different sizes" },
    { prop: "dividers", type: "select", options: ["rows", "grid", "none"], default: "rows", help: "lines between rows (default), between rows and columns (grid), or none" },
    { prop: "hover", type: "boolean", default: false, help: "highlight the row under the pointer, for rows that are things to pick" },
    { prop: "striped", type: "boolean", default: false, help: "shade every second row, for wide tables" },
]

//  TableRow — documented, not driven.
export const tableRowControls: SchemaFor<TableRowProps> = [
    { prop: "selected", type: "boolean", default: false, help: "shows the row as selected. You hold the selection; usually paired with a checkbox in the row" },
]

//  TableCell — documented, not driven.
export const tableCellControls: SchemaFor<TableCellProps> = [
    { prop: "scope", type: "select", options: ["col", "row"], help: "makes the cell a header: col for a column header, row for the cell that names its row" },
    { prop: "justify", type: "select", options: ["start", "end", "center"], default: "start", help: "horizontal alignment of this cell's content. A header takes its column's" },
    { prop: "numeric", type: "boolean", default: false, help: "a number: right-aligned, with equal-width digits so a column lines up" },
    { prop: "padding", type: "select", options: ["none", "control", "checkbox"], help: "replaces the cell's padding for special content: none for an image or swatch, control for a button or select, checkbox for a selection checkbox" },
    { prop: "colSpan", type: "number", min: 1, help: "the number of columns the cell spans" },
    { prop: "rowSpan", type: "number", min: 1, help: "the number of rows the cell spans" },
]

//  TableContainer.
export const tableContainerControls: SchemaFor<TableContainerProps> = [
    { prop: "label", type: "text", help: "the scrolling region's accessible name, announced when it takes focus. Required" },
]
