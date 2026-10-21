"use client"

import { useId } from "react"
import { Choice, type ChoicePosition, type ChoiceSize } from "../checkbox/choice"
import { useRadioGroup } from "./context"

/*  Radio — one option of a RadioGroup: choose this one, and only this one.

    It reads its name, the selected value and the handler from the group and
    owns none of them; `checked` is `group.value === value`. The same choice row
    as Checkbox; the dot is a ::before (radio.css). Keyboard is the browser's. */

export type RadioSize = ChoiceSize

export type RadioProps = {
    /** This option's value: what the group's `value` matches and the form
     *  submits. */
    value: string
    /** The visible label and the accessible name. */
    label: string
    /** A quieter line under the label, announced as the description. */
    description?: string
    /** Keep the name, hide the words. Hides the description too. */
    hideLabel?: boolean
    /** The circle: 16 / 20 / 24px. Default "5". */
    size?: RadioSize
    /** Which side of the words the control sits. Default "start". */
    controlPosition?: ChoicePosition
    /** Spread the row across its container. */
    fullWidth?: boolean
    /** This option only. The group's `isDisabled` covers all of them. */
    isDisabled?: boolean
    className?: string
}

export function Radio({
    value,
    label,
    description,
    hideLabel = false,
    size = "5",
    controlPosition = "start",
    fullWidth = false,
    isDisabled = false,
    className,
}: RadioProps) {
    //  Throws in development with no group above; in production the option
    //  renders dead (unchecked, disabled, no name) rather than blanking the page.
    const group = useRadioGroup()

    const inputId = useId()
    const labelId = `${inputId}-label`
    //  Never point aria-describedby at an id that is not in the document.
    const descriptionId = description ? `${inputId}-description` : undefined

    return (
        <Choice
            data-component="Radio"
            label={label}
            description={description}
            hideLabel={hideLabel}
            size={size}
            controlPosition={controlPosition}
            fullWidth={fullWidth}
            labelId={labelId}
            descriptionId={descriptionId}
            className={className}
            control={
                <input
                    type="radio"
                    id={inputId}
                    className="dede-radio"
                    name={group?.name}
                    value={value}
                    checked={group ? group.value === value : false}
                    disabled={isDisabled || !group || group.isDisabled}
                    required={group?.required}
                    aria-labelledby={labelId}
                    aria-describedby={descriptionId}
                    onChange={() => group?.onChange(value)}
                />
            }
        />
    )
}
