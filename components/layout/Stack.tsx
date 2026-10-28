"use client"

import type { CSSProperties, ReactElement, ReactNode } from "react"
import { Children, cloneElement, Fragment, isValidElement } from "react"
import { StackDepthContext, useGuides, useNestedStack } from "./context"
import type { LayoutStep } from "./steps"

/*  Stack — the layout arranger: lanes, gaps and band padding, on one of two
    CSS grid engines.

    ratio (default): a weight is a column count. "1|2|1" lays out 4 equal tracks
      and each lane spans its weight, so arrangements whose totals share a
      multiple line up ("2|1" with "1|1|1"). A wide lane absorbs the gutters it
      spans, so "2|1" is ~2.14:1.
    snap: the fixed 25-column grid, gutters as reserved columns; one coordinate
      system across Sections.

    Responsive values take `{ base, sm, md, lg, xl, 2xl }`, mobile-first,
    measured against the Section. Band padding defaults to step 2 on all four
    dials and is dropped when nested; nothing inherits. Children are cloned to
    inject their placement (--dede-col). */

const TOTAL_COLUMNS = 25

export type StackPattern = "ratio" | "snap"
//  Tailwind's breakpoints, each applying at that width and up, measured on the Section.
export type StackBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

export const STACK_BREAKPOINTS: StackBreakpoint[] = ["sm", "md", "lg", "xl", "2xl"]

//  One arrangement, or one per breakpoint; each falls through to the one below.
export type StackLanesByBreakpoint = { base: string | number } & Partial<
    Record<StackBreakpoint, string | number>
>

export type StackLanes = string | number | StackLanesByBreakpoint
export type StackAlign = "start" | "center" | "end" | "stretch"
export type StackDirection = "horizontal" | "vertical"
/** Lane order reversed: `true` at every width, or per breakpoint with the same
 *  mobile-first object as `lanes` (`{ base: true, md: false }`). */
export type StackReverseByBreakpoint = { base: boolean } & Partial<Record<StackBreakpoint, boolean>>
export type StackReverse = boolean | StackReverseByBreakpoint
/** A `--size-measure-*` token name, or any raw CSS length ("60rem", "900px"). */
export type StackMaxWidth = "prose" | "panel" | "content" | "wide" | (string & {})

export type StackProps = {
    /** Grid engine: "ratio" (default) or "snap", the 25-column grid. */
    pattern?: StackPattern
    /** Lane weights ("1|2|1") or a count of equal lanes, or one per breakpoint.
     *  Weights are dealt to children in order; fewer children leave lanes
     *  empty, more start a new row. Default "1". */
    lanes?: StackLanes
    /** Ratio only: lanes as columns (default) or rows. */
    direction?: StackDirection
    /** Reverse lane order: `true`, or per breakpoint (`{ base: true, md: false }`).
     *  In snap, a breakpoint reverse shows only where the lanes are one column. */
    reverse?: StackReverse
    /** Cross-axis alignment of the lanes. Default "stretch" (equal heights). */
    align?: StackAlign
    /** Cap the measure and centre it: a --size-measure-* name or a CSS length.
     *  A width, not a query container — breakpoints still measure the Section. */
    maxWidth?: StackMaxWidth
    /** Snap only: reserve edge gutter columns. Default true. */
    edges?: boolean
    /** Snap only: gutter width in columns. Default 1. */
    gutter?: number
    /** Gap between lanes, a --space-layout-* step. Default --stack-space
     *  (step 2). Not inherited: on a vertical Stack it is the row rhythm, on a
     *  horizontal one the gutter. */
    gap?: LayoutStep
    /** Ratio only: inline band padding, a step or "none". Default
     *  --stack-space in a frame, "none" when nested or in a nested Section —
     *  the frame owns the edge. */
    paddingX?: LayoutStep | "none"
    /** Top band padding, a step or "none". Default --stack-space at band
     *  level, "none" when nested. */
    paddingTop?: LayoutStep | "none"
    /** Bottom band padding, as paddingTop. */
    paddingBottom?: LayoutStep | "none"
    /** The guide overlay's label; "" suppresses it. */
    guideLabel?: string
    className?: string
    style?: CSSProperties
    children: ReactNode
}

type Placement = { start: number; span: number }

function isLaneSet(lanes: StackLanes): lanes is StackLanesByBreakpoint {
    return typeof lanes === "object" && lanes !== null
}

function baseLanes(lanes: StackLanes): string | number {
    return isLaneSet(lanes) ? lanes.base : lanes
}

function parseWeights(lanes: string | number): number[] {
    if (typeof lanes === "number") return Array(Math.max(1, Math.floor(lanes))).fill(1)
    const spec = lanes.trim()
    // A lone integer is a count of equal lanes; a pipe spec is weights.
    if (!spec.includes("|")) {
        const n = Number(spec)
        if (Number.isInteger(n) && n > 0) return Array(n).fill(1)
        return [1]
    }
    const weights = spec
        .split("|")
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isFinite(n) && n > 0)
    return weights.length ? weights : [1]
}

/*  Spans are whole tracks: fractional weights scale to the smallest integer set
    ("1|1.5" → "2|3"), or round if no multiplier up to 12 works. */
function toIntegerWeights(weights: number[]): number[] {
    if (weights.every(Number.isInteger)) return weights
    for (let m = 2; m <= 12; m++) {
        const scaled = weights.map((w) => w * m)
        if (scaled.every((w) => Math.abs(w - Math.round(w)) < 1e-9)) return scaled.map(Math.round)
    }
    return weights.map((w) => Math.max(1, Math.round(w)))
}

//  One equal track per unit of weight; minmax(0, …) so content cannot widen a track.
function ratioTemplate(total: number): string {
    return `repeat(${total}, minmax(0, 1fr))`
}

const MEASURE_TOKENS = new Set(["prose", "panel", "content", "wide"])

function resolveMaxWidth(value: string): string {
    return MEASURE_TOKENS.has(value) ? `var(--size-measure-${value})` : value
}

function stepValue(step: string): string {
    return step === "none" ? "0" : `var(--space-layout-${step})`
}



function isReverseSet(reverse: StackReverse): reverse is StackReverseByBreakpoint {
    return typeof reverse === "object" && reverse !== null
}

/*  Snap: share the content columns by weight (largest remainder) so spans and
    gutters sum to exactly 25. */
function computePlacements(weights: number[], gutter: number, edges: boolean): Placement[] {
    const n = weights.length
    const gutterCount = edges ? n + 1 : n - 1
    const contentCols = Math.max(n, TOTAL_COLUMNS - gutterCount * gutter)

    const total = weights.reduce((a, b) => a + b, 0)
    const raw = weights.map((w) => (contentCols * w) / total)
    const spans = raw.map(Math.floor)
    let remainder = contentCols - spans.reduce((a, b) => a + b, 0)

    raw.map((r, i) => ({ i, frac: r - Math.floor(r) }))
        .sort((a, b) => b.frac - a.frac)
        .forEach(({ i }) => {
            if (remainder > 0) {
                spans[i] += 1
                remainder -= 1
            }
        })

    const placements: Placement[] = []
    let line = 1 + (edges ? gutter : 0) // grid lines are 1-based
    for (let i = 0; i < n; i++) {
        placements.push({ start: line, span: spans[i] })
        line += spans[i]
        if (i < n - 1) line += gutter // between-slot gutter
    }
    return placements
}

/*  The lane occupants, with fragments flattened (recursively): a fragment
    cannot take the injected style, and `Children.toArray` would count it as
    one child. */
function laneChildren(nodes: ReactNode): ReactElement[] {
    return Children.toArray(nodes).flatMap((child) => {
        if (!isValidElement(child)) return []
        if (child.type === Fragment) {
            return laneChildren((child.props as { children?: ReactNode }).children)
        }
        return [child]
    })
}

export function Stack({
    pattern = "ratio",
    lanes = "1",
    direction = "horizontal",
    reverse = false,
    align = "stretch",
    maxWidth,
    edges = true,
    gutter = 1,
    gap,
    paddingX,
    paddingTop,
    paddingBottom,
    guideLabel,
    className,
    style,
    children,
}: StackProps) {
    const guides = useGuides()
    const nested = useNestedStack()
    //  Nested Stacks give up all band padding. A band in a nested Section loses
    //  its inline edge in layout.css, so a stated paddingX is always written.
    const resolvedPaddingX = paddingX ?? (nested ? "none" : undefined)
    const resolvedPaddingTop = paddingTop ?? (nested ? "none" : undefined)
    const resolvedPaddingBottom = paddingBottom ?? (nested ? "none" : undefined)
    const weights = toIntegerWeights(parseWeights(baseLanes(lanes)))

    //  One entry per declared breakpoint, each with its own module and spans.
    const laneSets = isLaneSet(lanes)
        ? STACK_BREAKPOINTS.filter((bp) => lanes[bp] !== undefined).map((bp) => {
              const w = toIntegerWeights(parseWeights(lanes[bp]!))
              return { bp, weights: w, total: w.reduce((a, b) => a + b, 0) }
          })
        : []
    const laneTotal = weights.reduce((a, b) => a + b, 0)
    const multiLane = weights.length > 1
    const vertical = pattern === "ratio" && direction === "vertical"
    // `true` reverses the children; the object sets CSS `order` per breakpoint.
    const reverseAll = reverse === true
    const reverseSet = isReverseSet(reverse) ? reverse : null

    const orderStyle = (i: number, count: number): CSSProperties | null => {
        if (!reverseSet) return null
        const value = (flipped: boolean) => (flipped ? String(count - 1 - i) : "0")
        return {
            ["--dede-order" as string]: value(reverseSet.base),
            ...Object.fromEntries(
                STACK_BREAKPOINTS.filter((bp) => reverseSet[bp] !== undefined).map((bp) => [
                    `--dede-order-${bp}`,
                    value(reverseSet[bp]!),
                ]),
            ),
        }
    }

    const classes = [
        "dede-stack",
        `dede-stack--${pattern}`,
        vertical && "dede-stack--vertical",
        align !== "stretch" && `dede-stack--align-${align}`,
        maxWidth && "dede-stack--capped",
        guides && "dede-stack--guides",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    //  The inline style carries stated steps only; defaults are --stack-space,
    //  which a theme may move, so a stated "2" is still written.
    const bandMetric = (name: string, step: string | undefined) =>
        step === undefined ? null : { [name]: stepValue(step) }

    const baseStyle: CSSProperties = {
        ...bandMetric("--dede-stack-pt", resolvedPaddingTop),
        ...bandMetric("--dede-stack-pb", resolvedPaddingBottom),
        ...(maxWidth ? { ["--dede-stack-max" as string]: resolveMaxWidth(maxWidth) } : null),
        //  "" is a real value: it suppresses the label.
        ...(guideLabel !== undefined
            ? { ["--dede-guide-label" as string]: `"${guideLabel.replace(/"/g, "")}"` }
            : null),
    }

    if (pattern === "ratio") {
        const laneTracks = ratioTemplate(laneTotal)
        const stackStyle: CSSProperties = {
            ...baseStyle,
            ...(vertical
                ? { ["--dede-lanes-rows" as string]: multiLane ? laneTracks : "none" }
                : { ["--dede-lanes" as string]: multiLane ? laneTracks : "minmax(0, 1fr)" }),
            //  Breakpoint lanes are horizontal only.
            ...(vertical
                ? null
                : Object.fromEntries(
                      laneSets.map(({ bp, total }) => [
                          `--dede-lanes-${bp}`,
                          total > 1 ? ratioTemplate(total) : "minmax(0, 1fr)",
                      ])
                  )),
            ...bandMetric("--dede-stack-gap", gap),
            ...(resolvedPaddingX === undefined
                ? null
                : { ["--dede-stack-px" as string]: stepValue(resolvedPaddingX) }),
            ...style,
        }
        const items = laneChildren(children)
        const ordered = reverseAll ? [...items].reverse() : items
        const spanAxis = vertical ? "--dede-row" : "--dede-col"
        const content: ReactNode =
            //  A one-lane base still clones if a breakpoint gives spans.
            !multiLane && !reverseAll && !reverseSet && laneSets.length === 0
                ? children
                : ordered.map((child, i) => {
                      const element = child as ReactElement<{ style?: CSSProperties }>
                      return cloneElement(element, {
                          style: {
                              ...element.props.style,
                              ...(multiLane
                                  ? { [spanAxis]: `span ${weights[i % weights.length]}` }
                                  : null),
                              //  Spans dealt independently per breakpoint.
                              ...(vertical
                                  ? null
                                  : Object.fromEntries(
                                        laneSets.map(({ bp, weights: w, total }) => [
                                            `--dede-col-${bp}`,
                                            total > 1 ? `span ${w[i % w.length]}` : "auto",
                                        ])
                                    )),
                              ...orderStyle(i, items.length),
                          },
                      })
                  })
        return (
            <StackDepthContext.Provider value={true}>
                <div data-component="Stack" className={classes} style={stackStyle}>
                    {content}
                </div>
            </StackDepthContext.Provider>
        )
    }

    // Snap: each child's 25-column placement, base and per breakpoint; placements
    // cycle like ratio's weights.
    const placements = computePlacements(weights, gutter, edges)
    const placementSets = laneSets.map(({ bp, weights: w }) => ({
        bp,
        placements: computePlacements(w, gutter, edges),
    }))
    const at = (list: Placement[], i: number) => {
        const p = list[i % list.length]
        return `${p.start} / span ${p.span}`
    }
    const items = laneChildren(children)
    const ordered = reverseAll ? [...items].reverse() : items
    const placed = ordered.map((child, i) => {
        const element = child as ReactElement<{ style?: CSSProperties }>
        return cloneElement(element, {
            style: {
                ...element.props.style,
                ["--dede-col" as string]: at(placements, i),
                ...Object.fromEntries(placementSets.map(({ bp, placements: ps }) => [`--dede-col-${bp}`, at(ps, i)])),
                ...orderStyle(i, items.length),
            },
        })
    })

    const stackStyle: CSSProperties = {
        ...baseStyle,
        ...bandMetric("--dede-stack-gap", gap),
        ...style,
    }

    return (
        <StackDepthContext.Provider value={true}>
            <div data-component="Stack" className={classes} style={stackStyle}>
                {placed}
            </div>
        </StackDepthContext.Provider>
    )
}
