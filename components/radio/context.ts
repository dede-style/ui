"use client"

import { createContext, useContext } from "react"

/*  What every Radio must agree with its group about. A context because the
    options are the caller's children, and cloning breaks when a Radio is
    wrapped. Unlike Field's, it is not optional: a radio with no group is a bug,
    so the hook throws in development. */
export type RadioGroupContextValue = {
    /** The shared radio `name`. */
    name: string
    /** The selected option's `value`, or null. */
    value: string | null
    onChange: (value: string) => void
    /** The group's disabled state, also written on each input. */
    isDisabled: boolean
    /** Forwarded to every input. */
    required: boolean
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

/** The RadioGroup above this option. Throws in development if there is none. */
export function useRadioGroup(): RadioGroupContextValue | null {
    const group = useContext(RadioGroupContext)
    if (!group && process.env.NODE_ENV !== "production") {
        throw new Error(
            "Radio must be rendered inside a RadioGroup — it takes its name, the " +
                "selected value and the handler from the group, and a radio with no " +
                "group has nothing to join.",
        )
    }
    return group
}
