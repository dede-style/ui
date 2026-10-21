"use client"

import type { CSSProperties } from "react"
import { Icon } from "../icon"
import { controlGlyph } from "../icon/control"
import type { IconDefinition } from "../../icons"
import { useSegmented } from "./context"

//  SegmentedItem — one segment; everything but its own props comes from the group.

export type SegmentedItemProps = {
    /** What the form submits and the group's `value` matches. */
    value: string
    /** The words on the segment; with a `glyph`, the accessible name instead. */
    label: string
    /** The announced name when it differs from the visible words ("H" shown,
     *  "Horizontal" announced). */
    a11yLabel?: string
    /** Replaces the words (not joins them); `label` becomes the accessible name.
     *  How three or four items fit a narrow track. */
    glyph?: IconDefinition
}

export function SegmentedItem({ value, label, a11yLabel, glyph }: SegmentedItemProps) {
    const group = useSegmented()

    return (
        //  The <label> is the painted segment and names the radio.
        <label data-component="SegmentedItem" className="dede-segmented-option">
            <input
                className="dede-segmented-input"
                type="radio"
                name={group.name}
                value={value}
                checked={group.value === value}
                disabled={group.isDisabled}
                onChange={() => group.onChange(value)}
                //  Always with a glyph; otherwise only when it differs from the words.
                aria-label={a11yLabel ?? (glyph ? label : undefined)}
            />
            {glyph ? (
                <Icon glyph={glyph} size={controlGlyph(group.size)} />
            ) : (
                /*  The label carries its own text into a custom property, so a
                    hidden ::after reserves its width at the selected (heavier)
                    weight and the track does not resize when the selection moves. */
                <span
                    className="dede-segmented-label"
                    style={{ "--dede-segmented-text": JSON.stringify(label) } as CSSProperties}
                >
                    {label}
                </span>
            )}
        </label>
    )
}
