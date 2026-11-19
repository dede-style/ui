import type { CSSProperties, ReactNode } from "react"

/*  Badge — a short label in a pill. Its width is never less than its height,
    so one character is a circle and a word is a pill. Plain text: no role, no
    focus, read with whatever it sits beside. `variant` sets the emphasis and
    `tone` the meaning; a site gives one badge its own look with a class. */

export type BadgeVariant = "quiet" | "strong"

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "error"

export type BadgeProps = {
    /** The label: a character, a number or a word or two. One line. */
    children: ReactNode
    /** How much it stands out. Default "quiet". */
    variant?: BadgeVariant
    /** What it means: neutral, or a status. Default "neutral". */
    tone?: BadgeTone
    /** Draw a 1px inset edge in the tone's border colour. It takes no room,
     *  so the box is the same size either way. Strong has no edge: its fill
     *  is the edge. Default false. */
    border?: boolean
    className?: string
    style?: CSSProperties
}

export function Badge({
    children,
    variant = "quiet",
    tone = "neutral",
    border = false,
    className,
    style,
}: BadgeProps) {
    const classes = [
        "dede-badge",
        `dede-badge--variant-${variant}`,
        `dede-badge--tone-${tone}`,
        border && "dede-badge--border",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <span data-component="Badge" className={classes} style={style}>
            {children}
        </span>
    )
}
