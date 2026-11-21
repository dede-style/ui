import type { CSSProperties, ReactNode } from "react"
import type { LayoutStep } from "../layout/steps"

/*  Figure — content (an image, a video, an SVG, a component) with an optional
    caption under it, and optionally a panel behind it. It fills its lane. A
    caption makes it a <figure> with a <figcaption>; without one it is a plain
    wrapper. The caption always sits under the frame, never inside the panel. */

export type FigureSurface = "none" | "sunken"

export type FigureMode = "light" | "dark" | "inverse"

export type FigurePlace = "start" | "center" | "end"

export type FigureOverflow = "hidden" | "visible"

export type FigurePadding = LayoutStep | "none"

export type FigurePosition = "center" | "top" | "bottom" | "start" | "end"

/** A width-to-height ratio: "16:9", "16/9" or "16 / 9"; decimals allowed. */
export type FigureRatio =
    | `${number}:${number}`
    | `${number}/${number}`
    | `${number} : ${number}`
    | `${number} / ${number}`

export type FigureProps = {
    /** The content. Any element: the site's own <img>, a framework image, a
     *  <video>, an <svg> or a component. */
    children: ReactNode
    /** Text under the frame. Given, the root is a <figure> and this its
     *  <figcaption>. */
    caption?: ReactNode
    /** "sunken" puts the content in a panel. Default "none". */
    surface?: FigureSurface
    /** Put the panel in a mode, as Section's `mode`. Panel only. */
    mode?: FigureMode
    /** Crop the content to this ratio, such as "16:9". An img, video or svg
     *  inside fills it. */
    contentRatio?: FigureRatio
    /** Which part of the content a `contentRatio` crop keeps. Default
     *  "center". An inline svg follows its own preserveAspectRatio. */
    contentPosition?: FigurePosition
    /** Give the panel this ratio, such as "16:9". Without it the panel hugs
     *  the content. Panel only. */
    panelRatio?: FigureRatio
    /** The content's width as a share of the frame, 0 to 1. Without a panel
     *  the caption takes the same width. Default 1. */
    fit?: number
    /** Where the content sits along the line: start (left), center or end.
     *  Default "center". */
    justify?: FigurePlace
    /** Where the content sits top to bottom in a panel taller than it.
     *  Default "center". Content taller than the panel starts at the top,
     *  unless "end", which keeps its bottom on the panel's bottom. */
    align?: FigurePlace
    /** The panel's top padding, a layout step or "none". Default "2". */
    paddingTop?: FigurePadding
    /** The panel's bottom padding. Default "2". */
    paddingBottom?: FigurePadding
    /** The panel's start (left) padding. Default "2". */
    paddingStart?: FigurePadding
    /** The panel's end (right) padding. Default "2". */
    paddingEnd?: FigurePadding
    /** "hidden" (default) clips the content at the panel's edge; "visible"
     *  lets it spill past. Panel only. */
    overflow?: FigureOverflow
    /** A hairline round the content, drawn over it, so it takes no room. */
    border?: boolean
    /** Round the content's corners with --figure-radius. The panel is always
     *  rounded; its content is square unless this is set. */
    rounded?: boolean
    className?: string
    style?: CSSProperties
}

const RATIO = /^\s*(\d*\.?\d+)\s*[:/]\s*(\d*\.?\d+)\s*$/

/** "16:9", "16/9" or "16 / 9" as the CSS "16 / 9"; undefined if it is not a
 *  ratio of two positive numbers. */
function parseRatio(value: string | undefined): string | undefined {
    if (value === undefined || value.trim() === "") return undefined
    const match = RATIO.exec(value)
    if (match && Number(match[1]) > 0 && Number(match[2]) > 0) return `${Number(match[1])} / ${Number(match[2])}`
    if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
        console.warn(`Figure: "${value}" is not a ratio such as "16:9", so it is ignored.`)
    }
    return undefined
}

const padValue = (step: FigurePadding) => (step === "none" ? "0" : `var(--space-layout-${step})`)

export function Figure({
    children,
    caption,
    surface = "none",
    mode,
    contentRatio,
    contentPosition = "center",
    panelRatio,
    fit,
    justify = "center",
    align = "center",
    paddingTop,
    paddingBottom,
    paddingStart,
    paddingEnd,
    overflow = "hidden",
    border = false,
    rounded = false,
    className,
    style,
}: FigureProps) {
    const panel = surface === "sunken"
    const contentShape = parseRatio(contentRatio)
    const panelShape = panel ? parseRatio(panelRatio) : undefined

    const classes = [
        "dede-figure",
        panel && "dede-figure--panel",
        `dede-figure--justify-${justify}`,
        `dede-figure--align-${align}`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const contentClasses = [
        "dede-figure-content",
        contentShape && "dede-figure-content--ratio",
        contentShape && contentPosition !== "center" && `dede-figure-content--position-${contentPosition}`,
        border && "dede-figure-content--border",
        rounded && "dede-figure-content--rounded",
    ]
        .filter(Boolean)
        .join(" ")

    //  Defaults live in figure.css; the inline style carries stated values only.
    const set = (name: string, value: string | undefined) =>
        value === undefined ? null : { [name]: value }

    const rootStyle: CSSProperties = {
        ...set("--dede-figure-fit", fit === undefined ? undefined : String(Math.min(1, Math.max(0, fit)))),
        ...set("--dede-figure-content-ratio", contentShape),
        ...(panel
            ? {
                  ...set("--dede-figure-panel-ratio", panelShape),
                  ...set("--dede-figure-pt", paddingTop && padValue(paddingTop)),
                  ...set("--dede-figure-pb", paddingBottom && padValue(paddingBottom)),
                  ...set("--dede-figure-ps", paddingStart && padValue(paddingStart)),
                  ...set("--dede-figure-pe", paddingEnd && padValue(paddingEnd)),
              }
            : null),
        ...style,
    }

    const content = <div className={contentClasses}>{children}</div>

    const frame = panel ? (
        <div
            className={[
                "dede-figure-panel",
                panelShape && "dede-figure-panel--ratio",
                overflow === "visible" && "dede-figure-panel--overflow-visible",
            ]
                .filter(Boolean)
                .join(" ")}
            data-mode={mode}
        >
            {content}
        </div>
    ) : (
        content
    )

    if (caption === undefined || caption === null || caption === false || caption === "") {
        return (
            <div data-component="Figure" className={classes} style={rootStyle}>
                {frame}
            </div>
        )
    }

    return (
        <figure data-component="Figure" className={classes} style={rootStyle}>
            {frame}
            <figcaption className="dede-figure-caption">{caption}</figcaption>
        </figure>
    )
}
