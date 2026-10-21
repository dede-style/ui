import type { CSSProperties, MouseEventHandler, ReactNode } from "react"
import type { IconDefinition } from "../../icons"
import { Icon } from "../icon"
import { controlGlyph } from "../icon/control"

/*  Button — the box, the emphasis and the states. It owns the whole box, so an
    icon inside carries none of its own. Variants are ranks (how much emphasis),
    not looks; `destructive` names a purpose. Only `variant` and the named
    `shape` set paint — no free colour or radius. IconButton shares its styles.
    With `href` it renders a link that looks the same: it goes somewhere rather
    than doing something. No hooks, so a server page ships no JavaScript for it. */

/*  A --size-element-* step: 24 / 32 / 40 / 48px. 24 is for icon buttons: it is
    exactly the WCAG 2.5.8 minimum target. */
export type ButtonSize = "6" | "8" | "10" | "12"

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive"

export type ButtonShape = "rounded" | "pill" | "square"

export type ButtonProps = {
    /** The visible label, and the accessible name. Icon-only is IconButton. */
    children: ReactNode
    /** How much emphasis the action claims. Default "secondary": a page has one
     *  primary. */
    variant?: ButtonVariant
    /** A --size-element-* step. Default "10" (40px). */
    size?: ButtonSize
    /** Default "rounded". "pill" is --radius-full; "square" is no radius. */
    shape?: ButtonShape
    /** An optional icon from @dede-style/ui/icons, sized by the button and
     *  hidden from screen readers. */
    glyph?: IconDefinition
    /** Which side of the label the icon sits on. Default "start". */
    iconPosition?: "start" | "end"
    isDisabled?: boolean
    /** Fill the container's width. Off, the button hugs its content. */
    fullWidth?: boolean
    type?: "button" | "submit" | "reset"
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    style?: CSSProperties
    /** For a disclosure. ARIA is added by name, one per real consumer. */
    "aria-expanded"?: boolean
    "aria-controls"?: string
    /** Renders a link instead of a button: it goes somewhere rather than doing
     *  something. `target` and `rel` apply only with `href`. */
    href?: string
    target?: "_blank"
    rel?: string
}

export function Button({
    children,
    variant = "secondary",
    size = "10",
    shape = "rounded",
    glyph,
    iconPosition = "start",
    isDisabled = false,
    fullWidth = false,
    type = "button",
    onClick,
    className,
    style,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
    href,
    target,
    rel,
}: ButtonProps) {
    //  The icon modifier names the side: it takes one step less padding.
    const classes = [
        "dede-button",
        `dede-button--variant-${variant}`,
        `dede-button--size-${size}`,
        `dede-button--shape-${shape}`,
        glyph && `dede-button--icon-${iconPosition}`,
        fullWidth && "dede-button--full-width",
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const icon = glyph ? <Icon glyph={glyph} size={controlGlyph(size)} /> : null

    const content = (
        <>
            {iconPosition === "start" ? icon : null}
            {children}
            {iconPosition === "end" ? icon : null}
        </>
    )

    //  A link cannot be disabled, so isDisabled with href is unsupported.
    if (href) {
        return (
            <a
                data-component="Button"
                className={classes}
                style={style}
                href={href}
                target={target}
                rel={rel}
                aria-expanded={ariaExpanded}
                aria-controls={ariaControls}
            >
                {content}
            </a>
        )
    }

    return (
        <button
            data-component="Button"
            className={classes}
            style={style}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
        >
            {content}
        </button>
    )
}
