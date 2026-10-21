import { useId, type CSSProperties } from "react"
import { Icon, type IconSize } from "../icon"
import { iconCheckBold, iconMinusBold } from "../../icons"
import { Choice, type ChoicePosition, type ChoiceSize } from "./choice"

/*  Checkbox — include this one, independently of its neighbours.

    A real <input type="checkbox"> painted with `appearance: none`, in the shared
    choice row. The input is the box; the tick and the mixed bar are Icons beside
    it. `indeterminate` is a display state independent of `checked` (a parent can
    be unchecked and mixed), set as a DOM property through a callback ref. */

export type CheckboxSize = ChoiceSize

//  The mark is 80% of the box, set through Icon's own size prop.
const MARK: Record<CheckboxSize, IconSize> = { "4": "3", "5": "4", "6": "5" }

export type CheckboxProps = {
    /** Whether it is ticked. Controlled. */
    checked: boolean
    onChange: (checked: boolean) => void
    /** The visible label and the accessible name. */
    label: string
    /** A quieter line under the label, announced as the description. */
    description?: string
    /** Keep the name, hide the words — e.g. a table's selection cell. */
    hideLabel?: boolean
    /** Some-but-not-all: the mark becomes a bar. Independent of `checked`. */
    indeterminate?: boolean
    /** The box: 16 / 20 / 24px. Default "5". */
    size?: CheckboxSize
    /** Which side of the words the control sits. Default "start". */
    controlPosition?: ChoicePosition
    /** Spread the row across its container. */
    fullWidth?: boolean
    isDisabled?: boolean
    required?: boolean
    /** Form participation, forwarded as is. */
    name?: string
    value?: string
    /** For a caller that owns the id (a Field, a table). Generated otherwise. */
    id?: string
    className?: string
    style?: CSSProperties
}

export function Checkbox({
    checked,
    onChange,
    label,
    description,
    hideLabel = false,
    indeterminate = false,
    size = "5",
    controlPosition = "start",
    fullWidth = false,
    isDisabled = false,
    required = false,
    name,
    value,
    id,
    className,
    style,
}: CheckboxProps) {
    const generated = useId()
    const inputId = id ?? generated
    const labelId = `${inputId}-label`
    //  Never point aria-describedby at an id that is not in the document.
    const descriptionId = description ? `${inputId}-description` : undefined

    return (
        <Choice
            data-component="Checkbox"
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
                <>
                    <input
                        type="checkbox"
                        id={inputId}
                        className="dede-checkbox"
                        checked={checked}
                        disabled={isDisabled}
                        required={required}
                        name={name}
                        value={value}
                        aria-labelledby={labelId}
                        aria-describedby={descriptionId}
                        //  `indeterminate` has no attribute, so it is set here.
                        ref={(el) => {
                            if (el) el.indeterminate = indeterminate
                        }}
                        onChange={(event) => onChange(event.target.checked)}
                    />
                    {/*  Decorative. Whether it shows is CSS, off :checked and
                         :indeterminate. */}
                    <Icon
                        glyph={indeterminate ? iconMinusBold : iconCheckBold}
                        size={MARK[size]}
                        className="dede-checkbox-mark"
                    />
                </>
            }
        />
    )
}
