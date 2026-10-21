"use client"

import { useId, type CSSProperties, type ReactNode } from "react"
import { Sleeve } from "../layout"
import { Icon } from "../icon"
import { iconAlert } from "../../icons"
import { FieldContext } from "./context"

/*  Field — the label, the hint, the error, and the wiring (useField) that binds
    them to one control. Order: label, hint, control, error, so the hint is read
    before typing. Never validates; no required marker. Renders as a Sleeve. */

export type FieldProps = {
    /** The control's name, a <label> bound by `htmlFor`. Mark an optional
     *  field in these words: "Middle name (optional)". */
    label: string
    /** Hide the label but keep the name — only where the purpose is obvious
     *  from the surroundings (a search box beside its button). */
    labelHidden?: boolean
    /** One line of instructions, above the control; announced as the
     *  description. */
    hint?: string
    /** The error message. Its presence marks the field invalid. */
    error?: string
    /** Override the generated id, when something outside points at the control. */
    id?: string
    /** Exactly one control. */
    children: ReactNode
    className?: string
    style?: CSSProperties
}

export function Field({
    label,
    labelHidden = false,
    hint,
    error,
    id,
    children,
    className,
    style,
}: FieldProps) {
    const generated = useId()
    const fieldId = id ?? generated
    const hintId = `${fieldId}-hint`
    const errorId = `${fieldId}-error`

    //  Hint first: instructions, then the correction.
    const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ")

    const classes = ["dede-field", className].filter(Boolean).join(" ")

    return (
        <FieldContext.Provider
            value={{ id: fieldId, describedBy: describedBy || undefined, invalid: Boolean(error) }}
        >
            <Sleeve data-component="Field" gap="1" className={classes} style={style}>
                {/*  Label and hint are one unit, tighter than the rest. The hint
                     stays outside the <label>, or it would join the name. */}
                <Sleeve gap="none" className="dede-field-label-group">
                    <label
                        htmlFor={fieldId}
                        className={labelHidden ? "dede-visually-hidden" : undefined}
                    >
                        {label}
                    </label>

                    {hint && (
                        <p id={hintId} className="dede-field-hint">
                            {hint}
                        </p>
                    )}
                </Sleeve>

                {children}

                {/*  role="alert", inserted only when there is an error, so it is
                     announced when it appears — aria-describedby alone is read
                     only when focus arrives. */}
                {error && (
                    <p id={errorId} className="dede-field-error" role="alert">
                        {/*  Decorative: the text is already the non-colour signal. */}
                        <Icon glyph={iconAlert} size="text" className="dede-field-error-icon" />
                        {error}
                    </p>
                )}
            </Sleeve>
        </FieldContext.Provider>
    )
}
