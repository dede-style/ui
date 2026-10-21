import { useId, type CSSProperties } from "react"
import { Choice, type ChoicePosition, type ChoiceSize } from "../checkbox/choice"

/*  Switch — a setting you flip: on, and effective now.

    An <input type="checkbox"> with role="switch", so it can join a form and its
    state is `:checked` (the thumb moves in CSS). It stands in the shared choice
    row with Checkbox and Radio, but sits after its words by default — the
    settings convention. Controlled, no hooks beyond useId. */

export type SwitchProps = {
    /** Whether the switch is on. Controlled. */
    checked: boolean
    onChange: (checked: boolean) => void
    /** The visible words and the accessible name. Name the setting, not the
     *  state: "Show guides", never "Guides on". */
    label: string
    /** A quieter line under the label, announced as the description. */
    description?: string
    /** Keep the name, hide the words — when the name is already on screen.
     *  Hides the description too. */
    hideLabel?: boolean
    /** The height: 16 / 20 / 24px, a --size-element-* step. Default "6". */
    size?: ChoiceSize
    /** Which side of the words the switch sits. Default "end". */
    controlPosition?: ChoicePosition
    /** Spread the row across its container, the switch at the far edge. */
    fullWidth?: boolean
    isDisabled?: boolean
    className?: string
    style?: CSSProperties
}

export function Switch({
    checked,
    onChange,
    label,
    description,
    hideLabel = false,
    size = "6",
    controlPosition = "end",
    fullWidth = false,
    isDisabled = false,
    className,
    style,
}: SwitchProps) {
    const inputId = useId()
    const labelId = `${inputId}-label`
    //  Never point aria-describedby at an id that is not in the document.
    const descriptionId = description ? `${inputId}-description` : undefined

    return (
        <Choice
            data-component="Switch"
            label={label}
            description={description}
            hideLabel={hideLabel}
            size={size}
            controlPosition={controlPosition}
            fullWidth={fullWidth}
            labelId={labelId}
            descriptionId={descriptionId}
            className={className}
            style={style}
            control={
                <input
                    type="checkbox"
                    role="switch"
                    id={inputId}
                    className="dede-switch"
                    checked={checked}
                    disabled={isDisabled}
                    aria-labelledby={labelId}
                    aria-describedby={descriptionId}
                    onChange={(event) => onChange(event.target.checked)}
                />
            }
        />
    )
}
