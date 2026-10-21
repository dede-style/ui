import type { CSSProperties, ReactNode } from "react"

/*  ChoiceGroup — the <fieldset> and <legend> shared by CheckboxGroup and
    RadioGroup. Internal: not in the barrel. The element brings the group role,
    the legend as its name, and `disabled` cascading to every control inside.
    Its UA styles are reset in checkbox.css, scoped to this class. */

export type ChoiceGroupProps = {
    /** The owning group's name, written as the fieldset's `data-component`. */
    "data-component": string
    /** RadioGroup passes "radiogroup"; CheckboxGroup keeps the implicit `group`. */
    role?: "radiogroup"
    /** The group's name, rendered as the <legend>. */
    label: string
    /** Keep the legend's name, hide its words. */
    hideLabel?: boolean
    /** `disabled` on the <fieldset>, which cascades to every control inside. */
    isDisabled?: boolean
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export function ChoiceGroup({
    "data-component": component,
    role,
    label,
    hideLabel = false,
    isDisabled = false,
    className,
    style,
    children,
}: ChoiceGroupProps) {
    const classes = ["dede-choice-group", className].filter(Boolean).join(" ")
    //  A visually hidden legend still names the group.
    const legendClasses = ["dede-choice-group-label", hideLabel && "dede-visually-hidden"]
        .filter(Boolean)
        .join(" ")

    return (
        <fieldset
            data-component={component}
            role={role}
            className={classes}
            style={style}
            disabled={isDisabled}
        >
            <legend className={legendClasses}>{label}</legend>
            {children}
        </fieldset>
    )
}
