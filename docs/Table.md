# Table

Rows of records in a real `<table>`, built from TableHead, TableBody, TableFoot, TableRow and TableCell. Size, alignment, dividers, stripes and hover are set once on the Table; TableContainer adds horizontal scrolling.

```tsx
import { Table, TableCell, TableContainer, TableRow } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `size` | `8` · `10` · `12` | `10` | row height: 32, 40 (default) or 48px. A control fits in a row without growing it |
| `align` | `baseline` · `top` · `middle` | `baseline` | vertical alignment of every cell: baseline (default) lines up first lines, middle centres, top for cells of very different sizes |
| `dividers` | `rows` · `grid` · `none` | `rows` | lines between rows (default), between rows and columns (grid), or none |
| `hover` | `true` · `false` | `false` | highlight the row under the pointer, for rows that are things to pick |
| `striped` | `true` · `false` | `false` | shade every second row, for wide tables |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## TableCell

| Prop | Values | Default | Description |
|---|---|---|---|
| `scope` | `col` · `row` | — | makes the cell a header: col for a column header, row for the cell that names its row |
| `justify` | `start` · `end` · `center` | `start` | horizontal alignment of this cell's content. A header takes its column's |
| `numeric` | `true` · `false` | `false` | a number: right-aligned, with equal-width digits so a column lines up |
| `padding` | `none` · `control` · `checkbox` | — | replaces the cell's padding for special content: none for an image or swatch, control for a button or select, checkbox for a selection checkbox |
| `colSpan` | number | — | the number of columns the cell spans |
| `rowSpan` | number | — | the number of rows the cell spans |

## TableContainer

| Prop | Values | Default | Description |
|---|---|---|---|
| `label` | string | — | the scrolling region's accessible name, announced when it takes focus. Required |

## TableRow

| Prop | Values | Default | Description |
|---|---|---|---|
| `selected` | `true` · `false` | `false` | shows the row as selected. You hold the selection; usually paired with a checkbox in the row |

Live examples: https://dede.style/components/table

_Generated from the component's schema by `npm run build:docs`._
