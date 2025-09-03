"use client"

import React, { useState, createContext, useContext } from "react"
import { ChevronDown } from "lucide-react"

const AccordionContext = createContext()

export const Accordion = ({ children, type = "single", collapsible = false, style = {} }) => {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (value) => {
    if (type === "single") {
      if (openItems.has(value)) {
        setOpenItems(collapsible ? new Set() : openItems)
      } else {
        setOpenItems(new Set([value]))
      }
    } else {
      const newOpenItems = new Set(openItems)
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value)
      } else {
        newOpenItems.add(value)
      }
      setOpenItems(newOpenItems)
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div style={style}>{children}</div>
    </AccordionContext.Provider>
  )
}

export const AccordionItem = ({ children, value, style = {} }) => {
  return <div style={style}>{React.Children.map(children, (child) => React.cloneElement(child, { value }))}</div>
}

export const AccordionTrigger = ({ children, value, style = {}, ...props }) => {
  const { openItems, toggleItem } = useContext(AccordionContext)
  const isOpen = openItems.has(value)

  return (
    <button
      onClick={() => toggleItem(value)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "500",
        textAlign: "left",
        transition: "background-color 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!style.backgroundColor || style.backgroundColor === "transparent") {
          e.target.style.backgroundColor = "#f9fafb"
        }
      }}
      onMouseLeave={(e) => {
        if (!style.backgroundColor || style.backgroundColor === "transparent") {
          e.target.style.backgroundColor = "transparent"
        }
      }}
      {...props}
    >
      <div style={{ flex: 1 }}>{children}</div>
      <ChevronDown
        style={{
          height: "16px",
          width: "16px",
          color: "#6b7280",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
        }}
      />
    </button>
  )
}

export const AccordionContent = ({ children, value, style = {} }) => {
  const { openItems } = useContext(AccordionContext)
  const isOpen = openItems.has(value)

  if (!isOpen) return null

  return (
    <div
      style={{
        overflow: "hidden",
        transition: "all 0.2s",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
