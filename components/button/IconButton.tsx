import type { CSSProperties, MouseEventHandler, Ref } from "react"
import type { IconDefinition } from "../../icons"
import { Icon } from "../icon"
import { controlGlyph } from "../icon/control"
import type { ButtonShape, ButtonSize, ButtonVariant } from "./Button"

/*  IconButton — a Button with no words: a square box and a required name. Its
    own component so the compiler insists on `label` (a shared Button with an
    icon-only flag could not). It shares `.dede-button`, so every state and size
    is Button's; it does not render <Button>, which requires children. The name
    goes on the button, never the glyph. */

export type IconButtonProps = {
    /** The artwork, from @dede-style/ui/icons. */
    glyph: IconDefinition
    /** The accessible name (aria-label): there are no visible words. */
    label: string
    variant?: ButtonVariant
    /** A --size-element-* step. Default "10" (40px). */
    size?: ButtonSize
    /** Default "rounded". Because the box is square, "pill" renders a circle. */
    shape?: ButtonShape
    isDisabled?: boolean
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
    /** The <button>, so a focus trap can return focus to it. */
    ref?: Ref<HTMLButtonElement>
}

export function IconButton({
    glyph,
    label,
    variant = "secondary",
    size = "10",
    shape = "rounded",
    isDisabled = false,
    type = "button",
    onClick,
    className,
    style,
    href,
    target,
    rel,
    ref,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
}: IconButtonProps) {
    const classes = [
        "dede-button",
        "dede-icon-button",
        `dede-button--variant-${variant}`,
        `dede-button--size-${size}`,
        `dede-button--shape-${shape}`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    //  Shared by both branches. A link cannot be disabled, so isDisabled with
    //  href is unsupported.
    const shared = {
        "data-component": "IconButton",
        className: classes,
        style,
        "aria-label": label,
        "aria-expanded": ariaExpanded,
        "aria-controls": ariaControls,
    } as const

    if (href) {
        return (
            <a {...shared} href={href} target={target} rel={rel}>
                <Icon glyph={glyph} size={controlGlyph(size)} />
            </a>
        )
    }

    return (
        <button
            {...shared}
            type={type}
            disabled={isDisabled}
            ref={ref}
            onClick={onClick}
        >
            <Icon glyph={glyph} size={controlGlyph(size)} />
        </button>
    )
}
