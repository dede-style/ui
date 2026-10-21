"use client"

import type { CSSProperties, ReactNode } from "react"
import { Children } from "react"
import { useGuides } from "./context"
import { STACK_BREAKPOINTS, type StackBreakpoint } from "./Stack"

/*  Grid — the collection arranger, a peer of Stack. It tiles a uniform
    collection of unknown count into as many equal columns of at least
    `minColumnWidth` as fit, reflowing with its own width, not breakpoints.
    Mechanics only: no paint.

    A list by default: a <ul> with each child wrapped in an <li>, which is the
    grid item (pass items, never <li>s). `as="div"` opts out; `as="ol"` orders.
    It is the one component that generates markup for its children, because it
    already has a per-child wrapper to hand the <li> to. */

//  `justify` inline, `align` block (align-items); `alignContent` is reserved.
export type GridAlign = "start" | "center" | "end" | "stretch"

export type GridElement = "div" | "ul" | "ol"

/** A column ceiling, or one per breakpoint — the same mobile-first object as
 *  Stack's `lanes`: `{ base: 1, sm: 3 }`. */
export type GridMaxColumnsByBreakpoint = { base: number } & Partial<Record<StackBreakpoint, number>>
export type GridMaxColumns = number | GridMaxColumnsByBreakpoint

export type GridProps = {
    /** Default "ul" (each child wrapped in an <li>); "ol" when order matters;
     *  "div" when it is not a collection. */
    as?: GridElement
    /** The guide overlay's label for this grid. */
    guideLabel?: string
    /** The narrowest a column may be. Default "16rem". A bare number is px.
     *  Wider than the container, it gives one full-width column. */
    minColumnWidth?: string | number
    /** A ceiling on the column count, or one per breakpoint
     *  (`{ base: 1, sm: 3 }`). Omit for as many as fit. For when a rem floor
     *  cannot keep a comparison row together on a phone. */
    maxColumns?: GridMaxColumns
    /** The gap step, both axes. Default "4". */
    gap?: string
    /** "component" (fixed, default) or "layout" (fluid) spacing scale. */
    gapScale?: "component" | "layout"
    /** Cell aspect ratio ("16:9"), for media. Off by default. */
    ratio?: string
    /** Position each item in its cell, inline axis. Default stretch. */
    justify?: GridAlign
    /** Position each item in its cell, block axis. Default stretch. */
    align?: GridAlign
    /** Items stretch to fill a part-empty row (auto-fit). Default true. */
    stretch?: boolean
    /** The list's accessible name. Applied only while the Grid is a list. */
    "aria-label"?: string
    className?: string
    style?: CSSProperties
    children: ReactNode
}

/*  CSS math functions reject unitless numbers, and an invalid template
    silently renders one column, so numbers become px and anything unrecognised
    falls back to the default. */
const LENGTH = /^-?(\d+\.?\d*|\.\d+)(px|rem|em|ch|ex|vw|vh|vmin|vmax|cqi|cqw|cqb|cqh|%)$/

function toLength(value: string | number, fallback: string): string {
    if (typeof value === "number") return Number.isFinite(value) ? `${value}px` : fallback
    const v = value.trim()
    if (v === "") return fallback
    if (/^-?(\d+\.?\d*|\.\d+)$/.test(v)) return `${v}px`
    //  Math functions and var() pass through.
    if (/^(calc|min|max|clamp|var)\(/.test(v)) return v
    return LENGTH.test(v) ? v : fallback
}

function parseRatio(ratio: string): string | undefined {
    const parts = ratio.split(/[:/]/).map((s) => Number(s.trim()))
    if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n) || n <= 0)) return undefined
    return `${parts[0]} / ${parts[1]}`
}

export function Grid({
    as: Element = "ul",
    guideLabel,
    minColumnWidth = "16rem",
    maxColumns,
    gap = "4",
    gapScale = "component",
    ratio,
    justify,
    align,
    stretch = true,
    "aria-label": ariaLabel,
    className,
    style,
    children,
}: GridProps) {
    const guides = useGuides()
    const aspect = ratio ? parseRatio(ratio) : undefined

    //  A count ceiling from an intrinsic mechanism: raising the floor to
    //  (100% − (N−1) gaps) / N makes an (N+1)th track impossible.
    const gapVar = `var(--space-${gapScale}-${gap})`
    const min = toLength(minColumnWidth, "16rem")
    const columnsFor = (ceiling: number | undefined) => {
        const floor =
            ceiling && ceiling > 0
                ? `max(${min}, (100% - ${ceiling - 1} * ${gapVar}) / ${ceiling})`
                : min
        return `repeat(auto-${stretch ? "fit" : "fill"}, minmax(min(${floor}, 100%), 1fr))`
    }
    const maxSet = typeof maxColumns === "object" && maxColumns !== null ? maxColumns : null
    const baseMax = maxSet ? maxSet.base : (maxColumns as number | undefined)

    //  `content` takes a quoted string; inner quotes are stripped.
    const gridStyle: CSSProperties = {
        ...(guideLabel
            ? { ["--dede-guide-label" as string]: `"${guideLabel.replace(/"/g, "")}"` }
            : null),
        //  min(w, 100%) keeps a too-wide floor from overflowing the container.
        ["--dede-grid-cols" as string]: columnsFor(baseMax),
        //  One template per declared breakpoint.
        ...(maxSet
            ? Object.fromEntries(
                  STACK_BREAKPOINTS.filter((bp) => maxSet[bp] !== undefined).map((bp) => [
                      `--dede-grid-cols-${bp}`,
                      columnsFor(maxSet[bp]),
                  ]),
              )
            : null),
        ["--dede-grid-gap" as string]: gapVar,
        ...(aspect ? { ["--dede-grid-ratio" as string]: aspect } : null),
        ...style,
    }

    const classes = [
        "dede-grid",
        aspect && "dede-grid--ratio",
        justify && `dede-grid--justify-${justify}`,
        align && `dede-grid--align-${align}`,
        guides && "dede-grid--guides",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    //  A list wraps each child in an <li> (the cell, with a ratio); a div wraps
    //  only for a ratio. Empty children get no <li>, or a reader counts them.
    const isList = Element === "ul" || Element === "ol"
    const content =
        isList ?
            Children.map(children, (child) =>
                child == null || typeof child === "boolean" ? null : (
                    <li className={aspect ? "dede-grid-cell" : undefined}>{child}</li>
                ),
            )
        : aspect ? Children.map(children, (child) => <div className="dede-grid-cell">{child}</div>)
        : children

    return (
        //  role="list": Safari drops the role with list-style.
        <Element
            data-component="Grid"
            className={classes}
            style={gridStyle}
            {...(isList ? { role: "list", "aria-label": ariaLabel } : null)}
        >
            {content}
        </Element>
    )
}
