"use client"

import type { CSSProperties, ReactNode } from "react"
import { useGuides } from "./context"

/*  Sleeve — the content inside a region, in one column, spaced on the fixed
    --space-component-* scale (a heading and its table are a fixed pair). Gap
    gives the rhythm; a heading's margin adds the asymmetry. Caps nothing. */

export type SleeveAlign = "start" | "center" | "end" | "stretch"

export type SleeveProps = {
    /** Space between children, a --space-component-* step or "none". Default
     *  "3" (12px), the paragraph spacing. */
    gap?: string
    /** Position the children on the inline axis. Default stretch. There is no
     *  `align`: rows hug their content; use `alignContent`. To place the Sleeve
     *  itself, align its Slot. */
    justify?: SleeveAlign
    /** Position the rows on the block axis when the Sleeve is taller than its
     *  content. Default start. */
    alignContent?: SleeveAlign
    /** The guide overlay's label for this sleeve. */
    guideLabel?: string
    /** For a component that renders as a Sleeve (Card), so the root names that
     *  component. Never set on a Sleeve a page renders directly. */
    "data-component"?: string
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

//  A --space-component-* step (Stack's maps to --space-layout-*).
function stepValue(step: string): string {
    return step === "none" ? "0" : `var(--space-component-${step})`
}

export function Sleeve({
    gap,
    justify,
    alignContent,
    guideLabel,
    "data-component": dataComponent = "Sleeve",
    className,
    style,
    children,
}: SleeveProps) {
    const guides = useGuides()

    //  The default lives in layout.css; the style attribute carries overrides only.
    const gapStyle = gap ? { ["--dede-sleeve-gap" as string]: stepValue(gap) } : null

    //  `content` takes a quoted string; inner quotes are stripped.
    const labelStyle = guideLabel
        ? { ["--dede-guide-label" as string]: `"${guideLabel.replace(/"/g, "")}"` }
        : null

    const classes = [
        "dede-sleeve",
        justify && `dede-sleeve--justify-${justify}`,
        alignContent && `dede-sleeve--align-content-${alignContent}`,
        guides && "dede-sleeve--guides",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <div
            data-component={dataComponent}
            className={classes}
            style={{ ...gapStyle, ...labelStyle, ...style }}
        >
            {children}
        </div>
    )
}
