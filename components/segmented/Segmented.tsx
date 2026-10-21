"use client"

import { Children, useId, type CSSProperties, type ReactNode } from "react"
import { SegmentedContext } from "./context"

/*  Segmented — one choice from a short list, every option on screen: a track,
    equal segments, the selected one raised.

    A group of real radios (role="radiogroup" on a div), so it can join a form
    and the browser supplies the keyboard: one tab stop, arrows, wrapping. Items
    are SegmentedItem children, so each has its own documented props. Context
    carries the shared name, value, handler, size and disabled state. */

/** A --size-element-* step: 32 / 40 / 48px, as Button, TextInput and Select. */
export type SegmentedSize = "8" | "10" | "12"

export type SegmentedProps = {
    /** The selected item's `value`. Controlled. */
    value: string
    onChange: (value: string) => void
    /** Two to four SegmentedItems. Segments are equal width, so past four the
     *  labels are too narrow; more throws in development. */
    children: ReactNode
    /** The group's accessible name: the items name themselves, but nothing on
     *  screen says what they are alternatives for. */
    label: string
    /** Default "10" (40px). */
    size?: SegmentedSize
    /** Fill the container rather than hugging the widest label. */
    fullWidth?: boolean
    /** Disables the whole group. There is no per-item disable. */
    isDisabled?: boolean
    className?: string
    style?: CSSProperties
}

export function Segmented({
    value,
    onChange,
    children,
    label,
    size = "10",
    fullWidth = false,
    isDisabled = false,
    className,
    style,
}: SegmentedProps) {
    //  One name per instance: two groups sharing a name would be one control.
    const name = useId()

    /*  Development only. It throws because five segments render, just
        unreadably. `toArray`, not `count`, so fragments flatten and nulls drop. */
    if (process.env.NODE_ENV !== "production") {
        const count = Children.toArray(children).length
        if (count < 2 || count > 4) {
            throw new Error(
                `Segmented takes 2 to 4 items and was given ${count}. ` +
                    "Every segment is equal width, so past four the labels are too " +
                    "narrow to read; use a Select instead.",
            )
        }
    }

    //  Disabled is read from the inputs (`:has(:disabled)`), not a class.
    const classes = [
        "dede-segmented",
        `dede-segmented--size-${size}`,
        fullWidth && "dede-segmented--full-width",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <SegmentedContext.Provider value={{ name, value, onChange, size, isDisabled }}>
            <div
                data-component="Segmented"
                className={classes}
                style={style}
                role="radiogroup"
                aria-label={label}
            >
                {children}
            </div>
        </SegmentedContext.Provider>
    )
}
