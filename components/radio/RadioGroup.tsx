"use client"

import { useId, type CSSProperties, type ReactNode } from "react"
import { ChoiceGroup } from "../checkbox/group"
import { RadioGroupContext } from "./context"

/*  RadioGroup — one choice from a set, every option on screen, each with room
    for a description.

    The shared fieldset (group.tsx) with role="radiogroup", plus what a set of
    radios adds: one selected value, its handler, and the shared `name` that
    makes the inputs one control. These reach each Radio by context. Controlled;
    no defaultValue. */

export type RadioGroupProps = {
    /** The group's name, rendered as the <legend>. */
    label: string
    /** Keep the legend's name, hide its words. */
    hideLabel?: boolean
    /** The selected Radio's value, or null when nothing is chosen yet. */
    value: string | null
    onChange: (value: string) => void
    /** The form field name every Radio shares. Generated when omitted. */
    name?: string
    /** Disables every option. A single option is disabled on the Radio. */
    isDisabled?: boolean
    /** Forwarded to every input for browser validation only. */
    required?: boolean
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export function RadioGroup({
    label,
    hideLabel = false,
    value,
    onChange,
    name,
    isDisabled = false,
    required = false,
    className,
    style,
    children,
}: RadioGroupProps) {
    //  One name per instance: two groups sharing a name would be one control.
    const generated = useId()

    return (
        <RadioGroupContext.Provider
            value={{ name: name ?? generated, value, onChange, isDisabled, required }}
        >
            <ChoiceGroup
                data-component="RadioGroup"
                role="radiogroup"
                label={label}
                hideLabel={hideLabel}
                isDisabled={isDisabled}
                className={className}
                style={style}
            >
                {children}
            </ChoiceGroup>
        </RadioGroupContext.Provider>
    )
}
