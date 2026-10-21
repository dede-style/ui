"use client"

import { createContext, useContext } from "react"
import type { SegmentedSize } from "./Segmented"

/*  What every segment must agree with its group about. Not optional: an item
    outside a group is a programming error, so the hook throws, in production
    too. */
export type SegmentedContextValue = {
    /** The shared radio `name`, one per Segmented. */
    name: string
    /** The selected item's `value`. */
    value: string
    onChange: (value: string) => void
    /** Sets the glyph's size. */
    size: SegmentedSize
    /** The group's disabled state. */
    isDisabled: boolean
}

export const SegmentedContext = createContext<SegmentedContextValue | null>(null)

/** The Segmented above this item. Throws if there is none. */
export function useSegmented(): SegmentedContextValue {
    const group = useContext(SegmentedContext)
    if (!group) {
        throw new Error(
            "SegmentedItem must be rendered inside a Segmented — it takes its " +
                "radio group name, the selected value and the handler from it.",
        )
    }
    return group
}
