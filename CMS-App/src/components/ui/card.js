"use client"

import React, { forwardRef } from "react"

const Card = forwardRef(({ className = "", ...props }, ref) =>
  React.createElement("div", {
    ref,
    className: `card ${className}`,
    ...props,
  }),
)
Card.displayName = "Card"

const CardHeader = forwardRef(({ className = "", ...props }, ref) =>
  React.createElement("div", {
    ref,
    className: `card-header ${className}`,
    ...props,
  }),
)
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className = "", ...props }, ref) =>
  React.createElement("h3", {
    ref,
    className: `card-title ${className}`,
    ...props,
  }),
)
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef(({ className = "", ...props }, ref) =>
  React.createElement("p", {
    ref,
    className: `card-description ${className}`,
    ...props,
  }),
)
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef(({ className = "", ...props }, ref) =>
  React.createElement("div", {
    ref,
    className: `card-content ${className}`,
    ...props,
  }),
)
CardContent.displayName = "CardContent"

const CardFooter = forwardRef(({ className = "", ...props }, ref) =>
  React.createElement("div", {
    ref,
    className: `card-footer ${className}`,
    ...props,
  }),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
