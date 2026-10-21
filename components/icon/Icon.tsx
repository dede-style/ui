import type { CSSProperties } from "react"
import type { IconDefinition } from "../../icons"

/*  Icon — the box, the size and the accessible name. The glyph is a value, so
    only imported icons ship; it paints with `currentColor`, so hover, disabled
    and the mode flip reach it with no prop. No hooks: it renders on the server. */

export type IconSize = "3" | "4" | "5" | "6" | "8" | "10" | "12" | "text" | "fill"

//  The set's grid; a glyph may declare its own.
const DEFAULT_VIEWBOX = "0 0 24 24"

export type IconProps = {
    /** The artwork, imported from design-system/icons. */
    glyph: IconDefinition
    /** A --size-element-* step, "text" (1em) or "fill" (100%). Default "6". */
    size?: IconSize
    /** Omit for a decorative icon (the common case). Set it only when the icon
     *  IS the content; an icon-only control takes its name on the control. */
    label?: string
    className?: string
    style?: CSSProperties
}

export function Icon({ glyph, size = "6", label, className, style }: IconProps) {
    const classes = ["dede-icon", `dede-icon--size-${size}`, className]
        .filter(Boolean)
        .join(" ")

    //  role="img" because an <svg> has no implicit role that takes a name in
    //  every browser.
    const a11y = label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true }

    return (
        <svg
            data-component="Icon"
            className={classes}
            style={style}
            viewBox={glyph.viewBox ?? DEFAULT_VIEWBOX}
            {...a11y}
        >
            {glyph.paths.map((d) => (
                <path key={d} d={d} />
            ))}
        </svg>
    )
}
