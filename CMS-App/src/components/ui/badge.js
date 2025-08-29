import { forwardRef } from "react"

const Badge = forwardRef(({ style = {}, variant = "default", ...props }, ref) => {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "20px",
    border: "1px solid",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }

  const variantStyles = {
    default: {
      backgroundColor: "#FF0000",
      color: "#ffffff",
      borderColor: "#FF0000",
    },
    secondary: {
      backgroundColor: "#000000",
      color: "#ffffff",
      borderColor: "#000000",
    },
    success: {
      backgroundColor: "#10B981",
      color: "#ffffff",
      borderColor: "#10B981",
    },
    warning: {
      backgroundColor: "#F59E0B",
      color: "#ffffff",
      borderColor: "#F59E0B",
    },
    destructive: {
      backgroundColor: "#EF4444",
      color: "#ffffff",
      borderColor: "#EF4444",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#FF0000",
      borderColor: "#FF0000",
    },
  }

  return (
    <div
      ref={ref}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
