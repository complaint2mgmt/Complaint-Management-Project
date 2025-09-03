"use client"

import React, { useState } from "react"

const { createElement: h } = React

const Tabs = ({ children, defaultValue, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return h(
    "div",
    {
      className: `tabs ${className || ""}`,
      "data-active-tab": activeTab,
      ...props,
    },
    React.Children.map(children, (child) => React.cloneElement(child, { activeTab, setActiveTab })),
  )
}

const TabsList = ({ children, className, activeTab, setActiveTab, ...props }) => {
  return h(
    "div",
    {
      className: `tabs-list ${className || ""}`,
      ...props,
    },
    children,
  )
}

const TabsTrigger = ({ children, value, className, activeTab, setActiveTab, ...props }) => {
  return h(
    "button",
    {
      className: `tabs-trigger ${activeTab === value ? "active" : ""} ${className || ""}`,
      onClick: () => setActiveTab && setActiveTab(value),
      type: "button",
      ...props,
    },
    children,
  )
}

const TabsContent = ({ children, value, className, activeTab, ...props }) => {
  if (activeTab !== value) return null

  return h(
    "div",
    {
      className: `tabs-content ${className || ""}`,
      ...props,
    },
    children,
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
