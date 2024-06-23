import React, { createContext, useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { cn } from "../lib/utils"
import { Link, Outlet, useLocation } from "react-router-dom"

//components
import Header from "@components/Demo/Navbar"

//icons
import SidebarDemo from "@components/Demo/Sidebar"
import Navbarmob from "@components/Demo/NavbarMob"

// Create context
export const SidebarContext = createContext()

export default function Layout() {
  const location = useLocation()
  const [expanded, setExpanded] = useState(true)
  const [active, setActive] = useState("")
  const [activeSubmenu, setActiveSubmenu] = useState("")

  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  const isMobile = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    // Update active and activeSubmenu state based on the current pathname
    if (location.pathname.startsWith("/ticket")) {
      setActive("Tickets")
      const ticketPath = location.pathname.split("/ticket")[1]
      if (ticketPath.startsWith("/open")) {
        setActiveSubmenu("Open Ticket")
      } else if (ticketPath.startsWith("/assigned")) {
        setActiveSubmenu("Assigned Ticket")
      } else if (ticketPath.startsWith("/pending")) {
        setActiveSubmenu("Pending Ticket")
      } else if (ticketPath.startsWith("/cancelled")) {
        setActiveSubmenu("Cancelled Ticket")
      } else if (ticketPath.startsWith("/closed")) {
        setActiveSubmenu("Closed Ticket")
      }
    } else if (location.pathname.startsWith("/management")) {
      setActive("User Management")
      const managementPath = location.pathname.split("/management")[1]
      if (managementPath.startsWith("/staff")) {
        setActiveSubmenu("Staff Management")
      } else if (managementPath.startsWith("/customer")) {
        setActiveSubmenu("Customer Management")
      }
    } else if (location.pathname.startsWith("/reports")) {
      setActive("Reports")
      setActiveSubmenu("") // No submenus for reports
    } else {
      setActive("Dashboard")
      setActiveSubmenu("") // No submenus for dashboard
    }
  }, [location.pathname])

  return (
    <div
      className={cn("h-screen w-full dark:text-white text-black flex", {
        "debug-screens": process.env.NODE_ENV === "development",
      })}
    >
      <SidebarContext.Provider
        value={{
          expanded,
          toggleExpanded,
          active,
          setActive,
          activeSubmenu,
          setActiveSubmenu,
        }}
      >
        {!isMobile && <SidebarDemo />}
        <div className={`w-full h-screen ${!isMobile ? "p-7" : "p-2"}`}>
          <div>
            {!isMobile ? (
              <Header expanded={expanded} toggleExpanded={toggleExpanded} />
            ) : (
              <Navbarmob />
            )}
          </div>
          <div className={isMobile ? "pt-0" : "pt-8"}>
            <Outlet />
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  )
}
