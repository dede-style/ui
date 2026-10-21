"use client"

import { createContext, useContext } from "react"

/*  The wiring between a Field and its control: the id, aria-describedby and
    aria-invalid, computed together. Optional: `null` means the control stands
    on its own and uses its own props. `disabled` is not here; Field reads it
    from the DOM (`:has(:disabled)`). */
export type FieldContextValue = {
    /** The control's `id`. The <label>'s `htmlFor` already points at it. */
    id: string
    /** The hint's id then the error's, space-joined; either may be absent. */
    describedBy?: string
    /** Whether the Field has an error. */
    invalid: boolean
}

export const FieldContext = createContext<FieldContextValue | null>(null)

/** The Field above this control, or `null` when it is standing on its own. */
export const useField = () => useContext(FieldContext)
