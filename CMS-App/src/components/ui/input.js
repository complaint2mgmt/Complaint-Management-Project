"use client"

import React, { forwardRef } from "react"

const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return React.createElement("input", {
    type,
    className: `form-input ${className}`,
    ref,
    ...props,
  })
})

Input.displayName = "Input"

export { Input }
