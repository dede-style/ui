"use client"

import type { CSSProperties, ReactNode } from "react"
import { useGuides } from "./context"

/*  Slot — one region in a Stack. The Stack places it (--dede-col); the Slot
    applies the placement and can position its own content.

    Alignment, the same on every primitive: unsuffixed (`align`, `justify`) is
    how my children sit; `Self` is how I sit in my parent. `justify` is always
    the inline axis and `align` the block axis — dede is grid, never flexbox.

    `as` takes generic block containers that are valid anywhere and can hold
    any content; `ul`/`ol` are the exception, and the caller passes the <li>s.
    `as` swaps a tag and never generates structure. */

export type SlotElement =
    | "div"
    | "article"
    | "main"
    | "aside"
    | "figure"
    | "header"
    | "footer"
    | "nav"
    | "ul"
    | "ol"

export type SlotAlign = "start" | "center" | "end" | "stretch"

export type SlotProps = {
    /** Element to render. Default "div". With `ul`/`ol`, pass the <li>s. */
    as?: SlotElement
    /** How this slot sits in the Stack, overriding the Stack's `align`. */
    alignSelf?: SlotAlign
    /** Position the content on the inline axis. Default stretch. */
    justify?: SlotAlign
    /** Position the content on the block axis, when the slot is taller than it.
     *  Default stretch. */
    align?: SlotAlign
    /** The guide overlay's label for this slot. */
    guideLabel?: string
    /** For an anchor, a skip link or `aria-labelledby` to point at. */
    id?: string
    /** Remove the region from the tab order and the accessibility tree — e.g.
     *  content under a modal. */
    inert?: boolean
    /** Makes the region a focus target (for a skip link) without a tab stop.
     *  Only -1: a region is not interactive. */
    tabIndex?: -1
    className?: string
    style?: CSSProperties
    children?: ReactNode
}

export function Slot({
    as: Element = "div",
    alignSelf,
    justify,
    align,
    guideLabel,
    id,
    inert,
    tabIndex,
    className,
    style,
    children,
}: SlotProps) {
    const guides = useGuides()

    //  `content` takes a quoted string; inner quotes are stripped.
    const labelStyle = guideLabel
        ? { ["--dede-guide-label" as string]: `"${guideLabel.replace(/"/g, "")}"` }
        : null

    const classes = [
        "dede-slot",
        alignSelf && `dede-slot--self-${alignSelf}`,
        //  A grid only when positioning content; otherwise a block box.
        (justify || align) && "dede-slot--items",
        justify && `dede-slot--justify-${justify}`,
        align && `dede-slot--align-${align}`,
        guides && "dede-slot--guides",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <Element
            data-component="Slot"
            id={id}
            inert={inert}
            tabIndex={tabIndex}
            className={classes}
            style={{ ...labelStyle, ...style }}
        >
            {children}
        </Element>
    )
}
