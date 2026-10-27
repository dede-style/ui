"use client"

import { createContext, useContext } from "react"

//  Whether descendant primitives draw the guide overlay; set by Section.
export const GuideContext = createContext(false)

export const useGuides = () => useContext(GuideContext)

//  Inside another Stack: no band padding on either axis.
export const StackDepthContext = createContext(false)

export const useNestedStack = () => useContext(StackDepthContext)
