import type { CSSProperties } from "react"
import type { ComponentStep } from "../layout"

/*  Divider — a 1px line between items, as an <hr>. It has no margin: the
    parent's gap spaces it. */

export type DividerOrientation = "horizontal" | "vertical"

export type DividerVariant = "subtle" | "strong"

export type DividerInset = ComponentStep | "none" | "text"

export type DividerProps = {
    /** Which way the line runs. Default "horizontal". */
    orientation?: DividerOrientation
    /** How much it stands out: subtle uses --color-border-subtle, strong
     *  --color-border-strong. Default "subtle". */
    variant?: DividerVariant
    /** A --space-component-* step, "none" or "text". A step stops the line
     *  this far short of each end: top and bottom when vertical, start and
     *  end when horizontal. "text" makes a vertical line one line of the
     *  surrounding text tall, centred in the row; on a horizontal line it
     *  is the same as "none". Default "none". */
    inset?: DividerInset
    className?: string
    style?: CSSProperties
}

export function Divider({
    orientation = "horizontal",
    variant = "subtle",
    inset,
    className,
    style,
}: DividerProps) {
    const classes = [
        "dede-divider",
        `dede-divider--orientation-${orientation}`,
        `dede-divider--variant-${variant}`,
        inset === "text" && "dede-divider--inset-text",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    //  The default (no inset) lives in divider.css; the style carries overrides only.
    const insetStyle =
        inset !== undefined && inset !== "none" && inset !== "text"
            ? { ["--dede-divider-inset" as string]: `var(--space-component-${inset})` }
            : null

    return (
        <hr
            data-component="Divider"
            className={classes}
            aria-orientation={orientation === "vertical" ? "vertical" : undefined}
            style={insetStyle || style ? { ...insetStyle, ...style } : undefined}
        />
    )
}
