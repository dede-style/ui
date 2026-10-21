import type { CSSProperties, ReactNode } from "react"
import { ChoiceGroup } from "./group"

/*  CheckboxGroup — a labelled set of Checkboxes: the shared fieldset (group.tsx)
    and its legend, which is announced before the first option. No state and no
    context: each Checkbox stays controlled on its own. */

export type CheckboxGroupProps = {
    /** The group's name, rendered as the <legend>. */
    label: string
    /** Keep the legend's name, hide its words. */
    hideLabel?: boolean
    /** Disables every Checkbox inside, through the <fieldset>. */
    isDisabled?: boolean
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export function CheckboxGroup({
    label,
    hideLabel = false,
    isDisabled = false,
    className,
    style,
    children,
}: CheckboxGroupProps) {
    return (
        <ChoiceGroup
            data-component="CheckboxGroup"
            label={label}
            hideLabel={hideLabel}
            isDisabled={isDisabled}
            className={className}
            style={style}
        >
            {children}
        </ChoiceGroup>
    )
}
