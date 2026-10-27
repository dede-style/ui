"use client"

import type { CSSProperties, ReactNode } from "react"
import { GuideContext, StackDepthContext, useGuides } from "./context"

/*  Section — a full-width band, and a frame: the query container cqi and
    @container measure. A nested one is not, unless `frame` (layout.css decides
    by position). Spacing lives on its Stack. */

export type SectionElement = "section" | "div" | "header" | "nav" | "aside" | "footer" | "article"

export type SectionMode = "light" | "dark" | "inverse"

export type SectionBg = "surface" | "raised" | "sunken"

export type SectionProps = {
    /** Make a nested band a frame: its own ruler and inline gutter. Costly:
     *  nothing inside aligns with anything outside. For a region that stands
     *  alone, not for grouping. */
    frame?: boolean
    /** Element to render. Default "section"; a landmark element when the band
     *  is that landmark, "div" for a purely visual band. */
    as?: SectionElement
    /** The band's name. An unnamed <section> is not a landmark. */
    "aria-label"?: string
    /** Put the band in a mode: its tokens, text and background follow it.
     *  "inverse" is the opposite of the page's mode. Omitted, it inherits. */
    mode?: SectionMode
    /** Paint the band with a surface role, in its mode. Omitted, the band is
     *  transparent, or `surface` when it has a mode. */
    bg?: SectionBg
    /** Clip content to the band. Default true; false lets content bleed. */
    clip?: boolean
    /** Draw the guide overlay here and below. Omitted, a nested Section
     *  inherits it; false turns it off for this band. */
    showGuides?: boolean
    /** The guide overlay's label for this band. */
    guideLabel?: string
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export function Section({
    as: Element = "section",
    "aria-label": ariaLabel,
    mode,
    bg,
    clip = true,
    frame = false,
    showGuides,
    guideLabel,
    className,
    style,
    children,
}: SectionProps) {
    //  Read unconditionally: `showGuides ?? useGuides()` would be a conditional hook.
    const inheritedGuides = useGuides()
    const guides = showGuides ?? inheritedGuides

    const sectionStyle: CSSProperties = {
        //  `content` takes a quoted string; inner quotes are stripped.
        ...(guideLabel
            ? { ["--dede-guide-label" as string]: `"${guideLabel.replace(/"/g, "")}"` }
            : null),
        ...style,
    }

    const classes = [
        "dede-section",
        frame && "dede-section--frame",
        bg && `dede-section--bg-${bg}`,
        !clip && "dede-section--no-clip",
        guides && "dede-section--guides",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <GuideContext.Provider value={guides}>
            {/*  A Section's Stack is band-level on the block axis. `false`,
                 not undefined: a Provider given undefined sets undefined. */}
            <StackDepthContext.Provider value={false}>
                <Element
                    data-component="Section"
                    data-mode={mode}
                    className={classes}
                    style={sectionStyle}
                    aria-label={ariaLabel}
                >
                    {children}
                </Element>
            </StackDepthContext.Provider>
        </GuideContext.Provider>
    )
}
