"use client"

import { createContext, useContext } from "react"

//  Whether descendant primitives draw the guide overlay; set by Section.
export const GuideContext = createContext(false)

export const useGuides = () => useContext(GuideContext)

//  Inside another Stack: no band padding on either axis.
export const StackDepthContext = createContext(false)

export const useNestedStack = () => useContext(StackDepthContext)

//  Inside another Section: not the frame (no query container, no inline edge)
//  unless it opts in with `queryContainer`.
export const SectionDepthContext = createContext(false)

export const useNestedSection = () => useContext(SectionDepthContext)

//  Whether the nearest Section is a frame; Stack reads it for paddingX.
export const SectionFrameContext = createContext(true)

export const useSectionFrame = () => useContext(SectionFrameContext)
