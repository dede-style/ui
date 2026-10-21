"use client"

/*  TableContainer — the opt-in scroll region, because overflow is the
    consumer's decision. Focusable and named, so a keyboard user can scroll it.
    A client component because it fades whichever edge has more: the outer div
    carries the mask (it must not scroll), the inner one scrolls. The edges are
    read from the scroller's geometry on scroll and resize. */

import { useRef, useSyncExternalStore, type ReactNode } from "react"

export type TableContainerProps = {
    /** The scroll region's accessible name, announced on focus. */
    label: string
    className?: string
    children: ReactNode
}

export function TableContainer({ label, className, children }: TableContainerProps) {
    const scroller = useRef<HTMLDivElement>(null)

    const edges = useSyncExternalStore(
        (notify) => {
            const el = scroller.current
            if (!el) return () => {}
            el.addEventListener("scroll", notify, { passive: true })
            const ro = new ResizeObserver(notify)
            ro.observe(el)
            if (el.firstElementChild) ro.observe(el.firstElementChild)
            return () => {
                el.removeEventListener("scroll", notify)
                ro.disconnect()
            }
        },
        () => readEdges(scroller.current),
        () => "",
    )

    const classes = ["dede-table-container"]
    for (const edge of edges.split(" ")) if (edge) classes.push(`dede-table-container--${edge}`)
    if (className) classes.push(className)

    return (
        <div data-component="TableContainer" className={classes.join(" ")}>
            <div ref={scroller} className="dede-table-container-scroll" tabIndex={0} role="region" aria-label={label}>
                {children}
            </div>
        </div>
    )
}

//  Which edge has more, with 1px of tolerance for sub-pixel layout.
function readEdges(el: HTMLDivElement | null): string {
    if (!el) return ""
    const max = el.scrollWidth - el.clientWidth
    return [el.scrollLeft > 1 && "start", el.scrollLeft < max - 1 && "end"].filter(Boolean).join(" ")
}
