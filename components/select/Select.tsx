"use client"

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"
import { Icon } from "../icon"
import { controlGlyph } from "../icon/control"
import { iconCheck, iconChevronDown } from "../../icons"
import { useField } from "../field/context"

/*  Select — one choice from a list: a trigger showing the current option, and
    a list that opens over the page.

    A custom listbox, not a native or `appearance: base-select` select: that is
    Chromium-only, and a custom list is what a future Combobox can reuse. The
    cost is no native mobile picker. The box is TextInput's, shared in
    text-input.css. `name` renders a hidden <select> so the value submits and
    `required` validates. Focus stays on the trigger; the list is marked by
    aria-activedescendant. Label, hint and error are Field's. */

/** One row: `value` is what `onChange` and a form receive; `label` is shown. */
export type SelectOption = {
    value: string
    label: string
    /** Skipped by the arrow keys, by type-ahead and by the pointer. */
    disabled?: boolean
}

export type SelectSize = "8" | "10" | "12"

export type SelectVariant = "frame" | "plain"

/** How many characters the trigger holds, or "full". */
export type SelectWidth = "2" | "3" | "4" | "5" | "10" | "20" | "full"

//  How long a type-ahead buffer survives a pause, as on Windows, macOS and APG.
const TYPEAHEAD_MS = 500

/** Space between the trigger and the list, in px. Zero doubles the two
 *  borders at the seam. */
const GAP = 1
/** The margin the list keeps from the edge of the window when it is shortened. */
const EDGE = 8
/** A list shorter than this is not worth flipping for — it would sit against the
 *  window edge showing two rows. */
const MIN_LIST = 120

export type SelectProps = {
    /** The current value. Controlled. */
    value: string
    /** Receives the option's value. */
    onChange: (value: string) => void
    options: readonly SelectOption[]
    /** Shown when `value` matches no option. A prompt, not a name. */
    placeholder?: string
    /** A --size-element-* step: 32 / 40 / 48px, as TextInput. Default "10". */
    size?: SelectSize
    /** `plain` drops the fill, edge and inset. Default "frame". */
    variant?: SelectVariant
    /** How many characters the trigger holds, or "full". Default "full". */
    width?: SelectWidth
    disabled?: boolean
    /** Validated on the form value; no marker is rendered. */
    required?: boolean
    /** Paint the error edge. Inside a Field it follows the error. */
    invalid?: boolean
    /** Supplied by Field; set it only with no Field above. */
    id?: string
    /** Form participation — renders a hidden input carrying the value. */
    name?: string
    /** The name for a control with no Field above. */
    "aria-label"?: string
    className?: string
    style?: CSSProperties
}

export function Select({
    value,
    onChange,
    options,
    placeholder,
    size = "10",
    variant = "frame",
    width = "full",
    disabled = false,
    required = false,
    invalid,
    id,
    name,
    "aria-label": ariaLabel,
    className,
    style,
}: SelectProps) {
    //  Null with no Field above; values then fall back to own props.
    const field = useField()

    const uid = useId()
    const listId = `${uid}-list`
    const optionId = (index: number) => `${uid}-option-${index}`

    const triggerRef = useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const typeahead = useRef({ buffer: "", at: 0 })
    //  The first scroll after opening centres; later ones do not.
    const justOpened = useRef(false)

    const selectedIndex = options.findIndex((option) => option.value === value)
    const selected = selectedIndex === -1 ? undefined : options[selectedIndex]

    /*  Positioned in JS (anchor positioning is Chromium-only), while the list is
        already shown, so its height is measured, not guessed. */
    const place = useCallback(() => {
        const trigger = triggerRef.current
        const list = listRef.current
        if (!trigger || !list) return

        const box = trigger.getBoundingClientRect()

        //  At least the trigger's width; a long label wraps.
        list.style.minInlineSize = `${box.width}px`

        /*  The room available is a second cap beside select.css's designed one,
            combined there with min(). Cleared first so the natural height is
            measured under the designed cap alone. */
        list.style.removeProperty("--dede-select-room")
        const natural = list.offsetHeight

        const below = window.innerHeight - box.bottom - GAP - EDGE
        const above = box.top - GAP - EDGE
        const flip = natural > below && above > below
        const room = Math.max(MIN_LIST, flip ? above : below)

        list.style.setProperty("--dede-select-room", `${room}px`)
        const height = Math.min(natural, room)

        list.style.insetInlineStart = `${box.left}px`
        list.style.insetBlockStart = flip
            ? `${box.top - GAP - height}px`
            : `${box.bottom + GAP}px`

    }, [])

    const show = useCallback(
        (index: number) => {
            setActiveIndex(index)
            justOpened.current = true
            setOpen(true)
            const list = listRef.current
            if (list && !list.matches(":popover-open")) {
                list.showPopover()
                place()
            }
        },
        [place],
    )

    const hide = useCallback(() => {
        setOpen(false)
        const list = listRef.current
        if (list?.matches(":popover-open")) list.hidePopover()
    }, [])

    const commit = useCallback(
        (index: number) => {
            const option = options[index]
            if (!option || option.disabled) return
            if (option.value !== value) onChange(option.value)
        },
        [onChange, options, value],
    )

    /*  The next enabled option from `from`, wrapping; -1 if none. One function
        for every key, so disabled options are always skipped. */
    const step = useCallback(
        (from: number, direction: 1 | -1) => {
            const count = options.length
            for (let i = 1; i <= count; i += 1) {
                const index = (from + direction * i + count * count) % count
                if (!options[index].disabled) return index
            }
            return -1
        },
        [options],
    )

    const edge = useCallback(
        (which: "first" | "last") =>
            which === "first" ? step(-1, 1) : step(options.length, -1),
        [options.length, step],
    )

    /*  Type-ahead: a quick string matches its prefix; repeating one character
        cycles through the options starting with it, as platform selects do. */
    const match = useCallback(
        (typed: string, from: number) => {
            const now = Date.now()
            const state = typeahead.current
            const buffer =
                now - state.at > TYPEAHEAD_MS ? typed : state.buffer + typed
            state.buffer = buffer
            state.at = now

            const repeat = buffer.length > 1 && [...buffer].every((c) => c === buffer[0])
            const needle = repeat ? buffer[0] : buffer
            //  A single or repeated character moves on; a growing buffer refines.
            const start = repeat || buffer.length === 1 ? from + 1 : from

            for (let i = 0; i < options.length; i += 1) {
                const index = (start + i + options.length) % options.length
                const option = options[index]
                if (option.disabled) continue
                if (option.label.toLowerCase().startsWith(needle)) return index
            }
            return -1
        },
        [options],
    )

    function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
        const key = event.key

        if (open) {
            switch (key) {
                case "ArrowDown":
                    //  Or the page scrolls under the open list.
                    event.preventDefault()
                    setActiveIndex(step(activeIndex, 1))
                    return
                case "ArrowUp":
                    event.preventDefault()
                    setActiveIndex(step(activeIndex, -1))
                    return
                case "Home":
                    event.preventDefault()
                    setActiveIndex(edge("first"))
                    return
                case "End":
                    event.preventDefault()
                    setActiveIndex(edge("last"))
                    return
                case "Enter":
                case " ":
                    event.preventDefault()
                    commit(activeIndex)
                    hide()
                    return
                case "Escape":
                    event.preventDefault()
                    hide()
                    return
                case "Tab":
                    //  Not prevented: Tab commits and moves on.
                    commit(activeIndex)
                    hide()
                    return
                default:
                    break
            }
        } else {
            switch (key) {
                case "ArrowDown":
                case "ArrowUp":
                case "Enter":
                case " ":
                    event.preventDefault()
                    show(selectedIndex === -1 ? edge("first") : selectedIndex)
                    return
                case "Home":
                    event.preventDefault()
                    show(edge("first"))
                    return
                case "End":
                    event.preventDefault()
                    show(edge("last"))
                    return
                default:
                    break
            }
        }

        //  A printable character: closed, it selects without opening (native);
        //  open, it moves the active option.
        if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
            const from = open ? activeIndex : selectedIndex
            const found = match(key, from)
            if (found === -1) return
            event.preventDefault()
            if (open) setActiveIndex(found)
            else commit(found)
        }
    }

    //  Follows the trigger on scroll (capture, so scrolling ancestors count).
    useEffect(() => {
        if (!open) return

        //  rAF-throttled: `place` reads layout.
        let frame = 0
        const onScroll = () => {
            if (frame === 0)
                frame = requestAnimationFrame(() => {
                    frame = 0
                    place()
                })
        }
        window.addEventListener("scroll", onScroll, true)
        window.addEventListener("resize", onScroll)
        return () => {
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener("scroll", onScroll, true)
            window.removeEventListener("resize", onScroll)
        }
    }, [open, place])

    /*  Light dismiss written out: popover="auto" closes on a pointerdown on the
        trigger, which the click then reopens. `manual` keeps the top layer. */
    useEffect(() => {
        if (!open) return
        const onDown = (event: PointerEvent) => {
            const target = event.target as Node | null
            if (!target) return
            if (listRef.current?.contains(target)) return
            if (triggerRef.current?.contains(target)) return
            hide()
        }
        document.addEventListener("pointerdown", onDown, true)
        return () => document.removeEventListener("pointerdown", onDown, true)
    }, [open, hide])

    //  Centred on open, so the current value shows its neighbours; `nearest`
    //  after, so arrowing does not scroll the list under the reader.
    useEffect(() => {
        if (!open || activeIndex === -1) return
        const block = justOpened.current ? "center" : "nearest"
        justOpened.current = false
        document.getElementById(optionId(activeIndex))?.scrollIntoView({ block })
        //  optionId is derived from a stable useId, so it never changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, activeIndex, uid])

    //  Select's own class names; text-input.css lists them beside TextInput's.
    const classes = [
        "dede-select",
        `dede-select--variant-${variant}`,
        `dede-select--size-${size}`,
        `dede-select--width-${width}`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const isInvalid = invalid ?? field?.invalid ?? false
    const shown = selected?.label ?? placeholder ?? ""

    return (
        <>
            <button
                data-component="Select"
                ref={triggerRef}
                type="button"
                id={id ?? field?.id}
                className={classes}
                style={style}
                disabled={disabled}
                //  role="combobox" on a real <button>: click, keys, focus and
                //  `disabled` come built in.
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open && activeIndex !== -1 ? optionId(activeIndex) : undefined}
                aria-label={ariaLabel}
                aria-describedby={field?.describedBy}
                aria-required={required || undefined}
                //  Absent rather than "false".
                aria-invalid={isInvalid ? true : undefined}
                onClick={() => (open ? hide() : show(selectedIndex === -1 ? edge("first") : selectedIndex))}
                onKeyDown={onKeyDown}
                //  A safety net for focus leaving by any unhandled route.
                onBlur={() => open && hide()}
            >
                <span
                    className={[
                        "dede-select-value",
                        selected ? undefined : "dede-select-value--placeholder",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {shown}
                </span>
                {/*  Styled as TextInput's affix. It does not rotate on open. */}
                <Icon
                    glyph={iconChevronDown}
                    size={controlGlyph(size)}
                    className="dede-select-chevron"
                />
            </button>

            {/*  The form value: a real <select>, because a hidden input is barred
                 from validation and `required` would be inert. Visually hidden,
                 never display:none (it must stay focusable to report). Out of the
                 tab order and the accessibility tree. */}
            {name && (
                <select
                    className="dede-select-form-value"
                    name={name}
                    value={value}
                    required={required || undefined}
                    disabled={disabled || undefined}
                    aria-hidden="true"
                    tabIndex={-1}
                    //  Controlled by `value`; nothing to handle.
                    onChange={() => {}}
                >
                    <option value="" />
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}

            {/*  A real <ul>/<li> under the listbox and option roles, so the
                 markup stays a list if the ARIA breaks. */}
            <ul
                ref={listRef}
                id={listId}
                //  Top layer, so a scrolling container cannot clip it.
                popover="manual"
                role="listbox"
                //  Named as the trigger is: by the Field's label, or aria-label.
                aria-label={field ? undefined : ariaLabel}
                aria-labelledby={field ? (id ?? field.id) : undefined}
                className="dede-select-list"
                //  Keeps focus on the trigger, or its blur would close the list
                //  before the click lands.
                onMouseDown={(event) => event.preventDefault()}
            >
                {options.map((option, index) => (
                    <li
                        key={option.value}
                        id={optionId(index)}
                        role="option"
                        aria-selected={option.value === value}
                        //  Still announced and counted.
                        aria-disabled={option.disabled || undefined}
                        className={[
                            "dede-select-option",
                            index === activeIndex ? "dede-select-option--active" : undefined,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        //  The pointer moves the keyboard's highlight.
                        onMouseMove={() => !option.disabled && setActiveIndex(index)}
                        onClick={() => {
                            if (option.disabled) return
                            commit(index)
                            hide()
                            triggerRef.current?.focus()
                        }}
                    >
                        <span className="dede-select-option-label">{option.label}</span>
                        {/*  The check sits at the end, rendered on every row and
                             hidden where it does not apply, so its column is
                             reserved and labels wrap alike. Decorative. */}
                        <Icon glyph={iconCheck} size="4" className="dede-select-option-check" />
                    </li>
                ))}
            </ul>
        </>
    )
}
