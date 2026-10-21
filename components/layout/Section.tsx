"use client"

import type { CSSProperties, ReactNode } from "react"
import {
    GuideContext,
    SectionDepthContext,
    SectionFrameContext,
    StackDepthContext,
    useGuides,
    useNestedSection,
} from "./context"

/*  Section — a full-width band. The outermost Section is the query container,
    so every cqi value and @container query measures it, and a nested Section is
    not (unless `queryContainer`): one ruler per page. It paints the band; the
    spacing lives on its Stack. Guides set here light the whole subtree. */

export type SectionElement = "section" | "div" | "header" | "nav" | "aside" | "footer" | "article"

export type SectionProps = {
    /** Make a nested band its own query container, so `cqi` and `@container`
     *  inside it measure this band. It also restores the band's inline edge.
     *  Costly: nothing inside can align with anything outside. For a region
     *  that stands alone (a card, a demo stage), not for grouping. */
    queryContainer?: boolean
    /** Element to render. Default "section"; a landmark element when the band
     *  is that landmark, "div" for a purely visual band. */
    as?: SectionElement
    /** The band's name. An unnamed <section> is not a landmark. */
    "aria-label"?: string
    /** A CSS background value. */
    bg?: string
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
    bg,
    clip = true,
    queryContainer = false,
    showGuides,
    guideLabel,
    className,
    style,
    children,
}: SectionProps) {
    //  Read unconditionally: `showGuides ?? useGuides()` would be a conditional hook.
    const inheritedGuides = useGuides()
    const guides = showGuides ?? inheritedGuides

    //  The outermost Section is the frame, by position; nested, only by opting in.
    const nested = useNestedSection()
    const isFrame = nested ? queryContainer : true

    const sectionStyle: CSSProperties = {
        ...(bg ? { background: bg } : null),
        //  `content` takes a quoted string; inner quotes are stripped.
        ...(guideLabel
            ? { ["--dede-guide-label" as string]: `"${guideLabel.replace(/"/g, "")}"` }
            : null),
        ...style,
    }

    const classes = [
        "dede-section",
        isFrame && "dede-section--query-container",
        !clip && "dede-section--no-clip",
        guides && "dede-section--guides",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <GuideContext.Provider value={guides}>
            {/*  Depth is read by Section (am I the frame?); frame by Stack
                 (do I own the inline edge?). They differ at a nested band that
                 opted in. */}
            <SectionDepthContext.Provider value={true}>
                <SectionFrameContext.Provider value={isFrame}>
                {/*  A Section's Stack is band-level on the block axis. `false`,
                     not undefined: a Provider given undefined sets undefined. */}
                <StackDepthContext.Provider value={false}>
                    <Element
                        data-component="Section"
                        className={classes}
                        style={sectionStyle}
                        aria-label={ariaLabel}
                    >
                        {children}
                    </Element>
                    </StackDepthContext.Provider>
                </SectionFrameContext.Provider>
            </SectionDepthContext.Provider>
        </GuideContext.Provider>
    )
}
