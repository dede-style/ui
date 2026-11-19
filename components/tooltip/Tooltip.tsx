"use client"

import {
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
    type CSSProperties,
    type FocusEvent,
    type PointerEvent,
    type ReactElement,
} from "react"

/*  Tooltip — a short line of text beside a control, naming what it does. A
    wrapper: the child is the trigger and the anchor. It shows on keyboard
    focus at once and on hover after --tooltip-delay; never on touch. It hides
    at once on leave, blur, Escape or a press. The text is hidden from the
    accessibility tree, so the trigger's own name must say everything.

    The bubble is a manual popover in the top layer, placed by CSS anchor
    positioning, which flips it at a screen edge. Where anchor positioning is
    missing, it is placed once in script at the author's placement, unflipped. */

export type TooltipPlacement = "above" | "below" | "start" | "end"

export type TooltipAlign = "start" | "center" | "end"

export type TooltipProps = {
    /** The text. Short, one line. Hidden from screen readers, so the
     *  trigger's accessible name must already carry it. */
    content: string
    /** Which side of the trigger it sits on. Logical: start and end mirror
     *  in right-to-left text. Default "above". */
    placement?: TooltipPlacement
    /** Where it lines up along that side. Default "center". */
    align?: TooltipAlign
    /** The trigger: one focusable element, such as an IconButton. */
    children: ReactElement
    className?: string
    style?: CSSProperties
}

/*  Once one tooltip closes, a neighbour reached within the delay opens at
    once, so a pointer moving along a toolbar reads each name in turn. */
let warmUntil = 0

//  The one feature the stylesheet relies on, tested as written there.
const anchored = () =>
    typeof CSS !== "undefined" && CSS.supports("position-area", "block-start span-all")

const delayOf = (el: Element) => {
    const raw = getComputedStyle(el).getPropertyValue("--tooltip-delay").trim()
    const n = parseFloat(raw)
    if (Number.isNaN(n)) return 0
    return raw.endsWith("ms") ? n : n * 1000
}

/*  The fallback: the bubble's box, beside the anchor's, at the author's
    placement and alignment. The bubble's padding is the gap, so the two
    boxes touch. */
function placeByHand(bubble: HTMLElement, anchor: HTMLElement, placement: TooltipPlacement, align: TooltipAlign) {
    const a = anchor.getBoundingClientRect()
    const b = bubble.getBoundingClientRect()
    const rtl = getComputedStyle(anchor).direction === "rtl"
    let top: number
    let left: number
    if (placement === "above" || placement === "below") {
        top = placement === "above" ? a.top - b.height : a.bottom
        const start = rtl ? a.right - b.width : a.left
        const end = rtl ? a.left : a.right - b.width
        left = align === "center" ? a.left + (a.width - b.width) / 2 : align === "start" ? start : end
    } else {
        const onLeft = (placement === "start") !== rtl
        left = onLeft ? a.left - b.width : a.right
        top = align === "center" ? a.top + (a.height - b.height) / 2 : align === "start" ? a.top : a.bottom - b.height
    }
    bubble.style.top = `${top}px`
    bubble.style.left = `${left}px`
}

export function Tooltip({
    content,
    placement = "above",
    align = "center",
    children,
    className,
    style,
}: TooltipProps) {
    const uid = useId()
    const anchorName = `--dede-tooltip-${uid.replace(/[^\w-]/g, "")}`

    const rootRef = useRef<HTMLSpanElement>(null)
    const bubbleRef = useRef<HTMLSpanElement>(null)
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    //  Set by Escape or a press; cleared once the pointer and focus have left.
    const dismissed = useRef(false)
    const hovered = useRef(false)
    const [open, setOpen] = useState(false)

    const show = useCallback(() => {
        clearTimeout(timer.current)
        const root = rootRef.current
        //  A disabled trigger cannot take focus, so a tooltip on it would
        //  reach pointer users only. It shows nothing.
        if (dismissed.current || !root || root.querySelector(":disabled")) return
        setOpen(true)
    }, [])

    const hide = useCallback(() => {
        clearTimeout(timer.current)
        const root = rootRef.current
        if (root && bubbleRef.current?.matches(":popover-open")) warmUntil = Date.now() + delayOf(root)
        setOpen(false)
    }, [])

    const dismiss = useCallback(() => {
        dismissed.current = true
        hide()
    }, [hide])

    //  The top layer follows the state.
    useEffect(() => {
        const bubble = bubbleRef.current
        const root = rootRef.current
        if (!bubble || !root) return
        if (open && !bubble.matches(":popover-open")) {
            bubble.showPopover()
            if (!anchored()) placeByHand(bubble, root, placement, align)
        } else if (!open && bubble.matches(":popover-open")) {
            bubble.hidePopover()
        }
    }, [open, placement, align])

    //  Escape from anywhere: the pointer may rest here while focus is elsewhere.
    useEffect(() => {
        if (!open) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") dismiss()
        }
        document.addEventListener("keydown", onKey)
        return () => document.removeEventListener("keydown", onKey)
    }, [open, dismiss])

    useEffect(() => () => clearTimeout(timer.current), [])

    const onPointerEnter = (event: PointerEvent) => {
        if (event.pointerType === "touch") return
        const root = rootRef.current
        if (!root) return
        hovered.current = true
        if (Date.now() < warmUntil) return show()
        clearTimeout(timer.current)
        timer.current = setTimeout(show, delayOf(root))
    }

    const onPointerLeave = (event: PointerEvent) => {
        if (event.pointerType === "touch") return
        hovered.current = false
        //  Keyboard focus keeps it open until blur.
        const root = rootRef.current
        if (root?.querySelector(":focus-visible")) {
            clearTimeout(timer.current)
            return
        }
        dismissed.current = false
        hide()
    }

    //  Keyboard focus only: a click or tap also focuses, and shows nothing.
    const onFocus = (event: FocusEvent) => {
        if ((event.target as Element).matches(":focus-visible")) show()
    }

    const onBlur = (event: FocusEvent) => {
        if (rootRef.current?.contains(event.relatedTarget as Node | null)) return
        //  A press that moves focus away (a menu opening its panel) stays
        //  dismissed while the pointer rests here.
        if (!hovered.current) dismissed.current = false
        hide()
    }

    const classes = ["dede-tooltip", className].filter(Boolean).join(" ")

    return (
        <span
            data-component="Tooltip"
            ref={rootRef}
            className={classes}
            //  The anchor's name is unique per instance, so it is set here.
            style={{ ...style, "--dede-tooltip-anchor": anchorName } as CSSProperties}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerDown={dismiss}
            onClick={dismiss}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {children}
            <span
                ref={bubbleRef}
                popover="manual"
                aria-hidden="true"
                className={`dede-tooltip-bubble dede-tooltip-bubble--placement-${placement} dede-tooltip-bubble--align-${align}`}
            >
                <span className="dede-tooltip-text">{content}</span>
            </span>
        </span>
    )
}
