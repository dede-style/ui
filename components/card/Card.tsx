import type { CSSProperties, ReactNode } from "react"
import { Sleeve, type ComponentStep, type SleeveAlign } from "../layout"

/*  Card — a surface that holds content. It paints (fill, edge, shadow, inset);
    it does not arrange. Width comes from the lane that holds it, and the Sleeve
    it renders as spaces its children — one element, no wrapper. */

export type CardElevation = "sunken" | "flush" | "raised"

export type CardProps = {
    /** Where the card sits relative to the page: `raised` is lighter than the
     *  page and `sunken` darker, in both modes. Default "raised". */
    elevation?: CardElevation
    /** Default true. Off keeps the border's width and drops its colour, so
     *  toggling it never moves content. */
    border?: boolean
    /** A --space-component-* step, or "none". Default "6" (24px). "none" lets
     *  an image bleed to the card's rounded edge. */
    padding?: ComponentStep | "none"
    /** Space between the card's children, a --space-component-* step. Forwarded
     *  to Sleeve; default 12px. */
    gap?: ComponentStep | "none"
    /** How the children sit on the inline axis. Forwarded to Sleeve. */
    justify?: SleeveAlign
    /** Where the children sit on the block axis when the card is taller than
     *  its content. Forwarded to Sleeve. */
    alignContent?: SleeveAlign
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

function stepValue(step: string): string {
    return step === "none" ? "0" : `var(--space-component-${step})`
}

export function Card({
    elevation = "raised",
    border = true,
    padding,
    gap,
    justify,
    alignContent,
    className,
    style,
    children,
}: CardProps) {
    //  Modifier classes, as Sleeve's own variants are: Sleeve has no attribute
    //  passthrough to carry data-* on.
    const classes = [
        "dede-card",
        `dede-card--elevation-${elevation}`,
        !border && "dede-card--borderless",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    //  The default lives in card.css; the style attribute carries overrides only.
    const paddingStyle =
        padding !== undefined ? { ["--dede-card-padding" as string]: stepValue(padding) } : null

    return (
        <Sleeve
            data-component="Card"
            gap={gap}
            justify={justify}
            alignContent={alignContent}
            className={classes}
            style={{ ...paddingStyle, ...style }}
        >
            {children}
        </Sleeve>
    )
}
