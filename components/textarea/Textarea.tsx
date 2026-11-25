"use client"

import type { CSSProperties, Ref } from "react"
import { useField } from "../field/context"

/*  Textarea — several lines of typed text. The <textarea> is the box, sharing
    TextInput's CSS; textarea.css adds the height. Controlled. */

/** The height in lines, and its minimum. Never 1: that is a TextInput. */
export type TextareaRows = 2 | 3 | 4 | 5 | 6 | 8

/** Whether the person can drag the box taller. Never sideways. */
export type TextareaResize = "vertical" | "none"

export type TextareaVariant = "frame" | "plain"

export type TextareaSize = "8" | "10" | "12"

export type TextareaProps = {
    /** The value. Controlled. */
    value: string
    /** Receives the string, not the event. */
    onChange: (value: string) => void
    /** Fired when focus leaves — where a form validates. */
    onBlur?: () => void
    /** The height in lines, and the smallest it can be dragged to. Default 3. */
    rows?: TextareaRows
    /** Drag taller ("vertical") or not ("none"). Default "vertical". */
    resize?: TextareaResize
    /** Grows from `rows` as the person types, where `field-sizing` works. */
    autoSize?: boolean
    /** Default "frame". */
    variant?: TextareaVariant
    /** Matches a TextInput of this size. Default "10". */
    size?: TextareaSize
    /** A format example, never a label: it disappears once anything is typed. */
    placeholder?: string
    /** The attribute only; no marker is rendered. */
    required?: boolean
    /** Prefer `readOnly`: a disabled control is not focusable or submitted. */
    disabled?: boolean
    /** Focusable, selectable, announced and submitted. */
    readOnly?: boolean
    /** Form participation. */
    name?: string
    /** Supplied by Field; set it only with no Field above. */
    id?: string
    /** The platform's autofill token. */
    autoComplete?: string
    /** The attribute only; there is no counter. */
    maxLength?: number
    /** The name for a control with no Field above. Inside a Field, omit it. */
    "aria-label"?: string
    /** The <textarea>, e.g. to focus the first invalid field. */
    ref?: Ref<HTMLTextAreaElement>
    className?: string
    style?: CSSProperties
}

export function Textarea({
    value,
    onChange,
    onBlur,
    rows = 3,
    resize = "vertical",
    autoSize = false,
    variant = "frame",
    size = "10",
    placeholder,
    required = false,
    disabled = false,
    readOnly = false,
    name,
    id,
    autoComplete,
    maxLength,
    "aria-label": ariaLabel,
    ref,
    className,
    style,
}: TextareaProps) {
    //  Null with no Field above; every value then falls back to own props.
    const field = useField()

    const classes = [
        "dede-textarea",
        `dede-textarea--variant-${variant}`,
        `dede-textarea--size-${size}`,
        `dede-textarea--rows-${rows}`,
        `dede-textarea--resize-${resize}`,
        autoSize && "dede-textarea--auto-size",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <textarea
            data-component="Textarea"
            className={classes}
            style={style}
            rows={rows}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            name={name}
            id={id ?? field?.id}
            ref={ref}
            autoComplete={autoComplete}
            maxLength={maxLength}
            aria-label={ariaLabel}
            aria-describedby={field?.describedBy}
            //  Absent rather than "false".
            aria-invalid={field?.invalid ? true : undefined}
        />
    )
}
