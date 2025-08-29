"use client"

import React from "react"

export const Button = ({ children, onClick, variant = "default", className = "", disabled = false, ...props }) => {
  const getButtonClasses = () => {
    const baseClasses = "btn"
    const variantClasses = {
      default: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "btn-ghost",
    }

    return `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`
  }

  return React.createElement(
    "button",
    {
      onClick,
      disabled,
      className: getButtonClasses(),
      ...props,
    },
    children,
  )
}
