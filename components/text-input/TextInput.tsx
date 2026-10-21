"use client"

import type { CSSProperties, Ref } from "react"
import type { IconDefinition } from "../../icons"
import { Icon } from "../icon"
import { controlGlyph } from "../icon/control"
import { useField } from "../field/context"

/*  TextInput — one line of typed text: the box, its edge, its affixes and the
    <input> inside it.

    The wrapper carries the border and the focus ring (`:focus-within`, so the
    ring encloses the affixes); the input is borderless inside it. Affixes are
    flex siblings, not overlays, so a long value never scrolls under one and an
    interactive affix can later take a real tab stop. Controlled only;
    `onChange` receives the string. */

/*  `number` renders type="text" with a numeric inputMode and pattern:
    type="number" changes on the scroll wheel, ignores maxLength and reports ""
    for anything it cannot parse. */
export type TextInputType =
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "search"
    | "number"

/*  `frame` draws its own boundary; `plain` borrows its container's (a search in
    a toolbar) and is only honest where an icon or placeholder identifies it.
    Focus draws the full ring either way. */
export type TextInputVariant = "frame" | "plain"

export type TextInputSize = "8" | "10" | "12"

/** How many characters the box is sized to hold, or "full" for the width of
 *  whatever contains it. */
export type TextInputWidth = "2" | "3" | "4" | "5" | "10" | "20" | "full"

/*  What the type implies: keyboard, pattern, and whether to turn off spelling,
    capitalisation and autocorrect (`quiet`). */
const BEHAVIOUR: Record<
    TextInputType,
    {
        domType: string
        inputMode?: "text" | "email" | "tel" | "url" | "search" | "numeric"
        pattern?: string
        quiet?: boolean
    }
> = {
    text: { domType: "text" },
    email: { domType: "email", inputMode: "email", quiet: true },
    password: { domType: "password", quiet: true },
    tel: { domType: "tel", inputMode: "tel", quiet: true },
    url: { domType: "url", inputMode: "url", quiet: true },
    search: { domType: "search", inputMode: "search" },
    number: { domType: "text", inputMode: "numeric", pattern: "[0-9]*", quiet: true },
}

export type TextInputProps = {
    /** The value. Controlled. */
    value: string
    /** Receives the string, not the event. */
    onChange: (value: string) => void
    /** Fired when focus leaves — where a form validates. */
    onBlur?: () => void
    /** What is being typed: sets the keyboard and the browser's handling.
     *  Default "text". */
    type?: TextInputType
    /** Default "frame". */
    variant?: TextInputVariant
    /** A --size-element-* step: 32 / 40 / 48px, matching Button. Default "10". */
    size?: TextInputSize
    /** How many characters the box holds, or "full". A width signals how much
     *  to type. Default "full". */
    width?: TextInputWidth
    /** A format example, never a label: it disappears once anything is typed. */
    placeholder?: string
    /** Decorative text at the start — a currency mark, a scheme. */
    prefix?: string
    /** Decorative glyph at the start. Both may be set; the glyph comes first. */
    prefixIcon?: IconDefinition
    /** Decorative text at the end — a unit, a domain. */
    suffix?: string
    /** Decorative glyph at the end. */
    suffixIcon?: IconDefinition
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
    /** The platform's autofill token: "given-name", "postal-code" (WCAG 1.3.5). */
    autoComplete?: string
    /** Override the keyboard the type implies — e.g. "decimal" for a price. */
    inputMode?: "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"
    /** The attribute only; there is no counter. */
    maxLength?: number
    /** The name for a control with no Field above. Inside a Field, omit it. */
    "aria-label"?: string
    /** The <input>, e.g. to focus the first invalid field. */
    ref?: Ref<HTMLInputElement>
    className?: string
    style?: CSSProperties
}

export function TextInput({
    value,
    onChange,
    onBlur,
    type = "text",
    variant = "frame",
    size = "10",
    width = "full",
    placeholder,
    prefix,
    prefixIcon,
    suffix,
    suffixIcon,
    required = false,
    disabled = false,
    readOnly = false,
    name,
    id,
    autoComplete,
    inputMode,
    maxLength,
    "aria-label": ariaLabel,
    ref,
    className,
    style,
}: TextInputProps) {
    //  Null with no Field above; every value then falls back to own props.
    const field = useField()
    const behaviour = BEHAVIOUR[type]

    //  Invalid, disabled and read-only are styled off the input's own attributes.
    const classes = [
        "dede-text-input",
        `dede-text-input--variant-${variant}`,
        `dede-text-input--size-${size}`,
        `dede-text-input--width-${width}`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const iconSize = controlGlyph(size)

    return (
        <div data-component="TextInput" className={classes} style={style}>
            {/*  Affixes are decorative and unselectable. Glyph first, then text,
                 at both ends. */}
            {prefixIcon && (
                <Icon glyph={prefixIcon} size={iconSize} className="dede-text-input-affix" />
            )}
            {prefix && (
                <span className="dede-text-input-affix" aria-hidden="true">
                    {prefix}
                </span>
            )}

            <input
                className="dede-text-input-control"
                type={behaviour.domType}
                pattern={behaviour.pattern}
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
                inputMode={inputMode ?? behaviour.inputMode}
                maxLength={maxLength}
                spellCheck={behaviour.quiet ? false : undefined}
                autoCapitalize={behaviour.quiet ? "none" : undefined}
                autoCorrect={behaviour.quiet ? "off" : undefined}
                aria-label={ariaLabel}
                aria-describedby={field?.describedBy}
                //  Absent rather than "false".
                aria-invalid={field?.invalid ? true : undefined}
            />

            {suffixIcon && (
                <Icon glyph={suffixIcon} size={iconSize} className="dede-text-input-affix" />
            )}
            {suffix && (
                <span className="dede-text-input-affix" aria-hidden="true">
                    {suffix}
                </span>
            )}
        </div>
    )
}
