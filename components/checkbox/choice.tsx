import type { CSSProperties, ReactNode } from "react"

/*  Choice — the selection row shared by Checkbox, Radio and Switch (internal).
    The row is the <label>, so clicking anywhere toggles the control; the
    control's `aria-labelledby` keeps the description out of its name. */

/** 16 / 20 / 24px. */
export type ChoiceSize = "4" | "5" | "6"

/** Which side of the words the control sits. */
export type ChoicePosition = "start" | "end"

export type ChoiceProps = {
    /** The owning control's name, written as the row's `data-component`. */
    "data-component": string
    /** The input and its mark, already wired with `id`, `aria-labelledby` and
     *  `aria-describedby`. */
    control: ReactNode
    label: string
    description?: string
    /** Keep the name, hide the words (and the description). */
    hideLabel?: boolean
    /** The control's box. On the row, so the first-line centring agrees. */
    size?: ChoiceSize
    /** "end" paints the control after the words; the DOM keeps it first.
     *  Ignored when the label is hidden. */
    controlPosition?: ChoicePosition
    /** Spread the row across its container. Off, the row hugs, so empty space
     *  is not a click target. */
    fullWidth?: boolean
    /** The id the control's `aria-labelledby` points at. */
    labelId: string
    /** The id the control's `aria-describedby` points at, if any. */
    descriptionId?: string
    className?: string
    style?: CSSProperties
}

export function Choice({
    "data-component": component,
    control,
    label,
    description,
    hideLabel = false,
    size = "5",
    controlPosition = "start",
    fullWidth = false,
    labelId,
    descriptionId,
    className,
    style,
}: ChoiceProps) {
    const classes = [
        "dede-choice",
        `dede-choice--size-${size}`,
        //  Hidden words drop the second column, so the row measures the box.
        hideLabel && "dede-choice--label-hidden",
        !hideLabel && controlPosition === "end" && "dede-choice--control-end",
        fullWidth && "dede-choice--full-width",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const hidden = hideLabel ? "dede-visually-hidden" : undefined

    return (
        <label data-component={component} className={classes} style={style}>
            <span className="dede-choice-control">{control}</span>
            <span id={labelId} className={["dede-choice-label", hidden].filter(Boolean).join(" ")}>
                {label}
            </span>
            {description && (
                <small
                    id={descriptionId}
                    className={["dede-choice-description", hidden].filter(Boolean).join(" ")}
                >
                    {description}
                </small>
            )}
        </label>
    )
}
