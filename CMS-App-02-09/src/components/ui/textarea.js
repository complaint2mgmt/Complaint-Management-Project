"use client"

import React, { forwardRef } from "react"

const Textarea = forwardRef(({ className = "", ...props }, ref) => {
  return React.createElement("textarea", {
    className: `form-textarea ${className}`,
    ref,
    ...props,
  })
})

Textarea.displayName = "Textarea"

export { Textarea }
