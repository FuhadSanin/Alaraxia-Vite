import React, { createContext, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { cn } from "../lib/utils"
import { Link, Outlet } from "react-router-dom"

//components
import Sidebar, { SidebarSubItem } from "@/components/Demo/Sidebar"
import Header from "@/components/Demo/Navbar"

//icons
import { Home, Ticket, Users, ClipboardMinus } from "lucide-react"
import Navbarmob from "@components/Demo/NavbarMob"

// Create context
export const SidebarContext = createContext()

export default function Layout() {
  const [expanded, setExpanded] = useState(true)
  const [active, setActive] = useState("Dashboard")
  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handleSetActive = menu => {
    setActive(menu)
  }

  return (
    <div
      className={cn("h-screen w-full    dark:text-white text-black flex ", {
        "debug-screens": process.env.NODE_ENV === "development",
      })}
    >
      <SidebarContext.Provider
        value={{ expanded, toggleExpanded, active, setActive }}
      >
        {!isMobile && (
          <Sidebar>
            <SidebarSubItem
              icon={<Home size={20} />}
              text="Dashboard"
              active={active === "Dashboard"}
              onClick={() => handleSetActive("Dashboard")}
              as={Link}
              to="/"
            />
            <SidebarSubItem
              icon={<Ticket size={20} />}
              text="Tickets"
              active={active === "Tickets"}
              onClick={() => handleSetActive("Tickets")}
              as={Link}
              to="/ticket"
              submenus={[
                {
                  text: "All Tickets",
                  to: "/ticket",
                },
                {
                  text: "Open Ticket",
                  to: "/ticket/open",
                },
                {
                  text: "Assigned Ticket",
                  to: "/ticket/assigned",
                },
                {
                  text: "Pending Ticket",
                  to: "/ticket/pending",
                },
                {
                  text: "Cancelled Ticket",
                  to: "/ticket/cancelled",
                },
                {
                  text: "Closed Ticket",
                  to: "/ticket/closed",
                },
              ]}
            />
            <SidebarSubItem
              icon={<Users size={20} />}
              text="User Management"
              active={active === "User Management"}
              onClick={() => handleSetActive("User Management")}
              as={Link}
              to="/management/staff"
              submenus={[
                {
                  text: "Staff Management",
                  to: "/management/staff",
                },
                {
                  text: "Customer Management",
                  to: "/management/customer",
                },
              ]}
            />
            <SidebarSubItem
              icon={<ClipboardMinus size={20} />}
              text="Reports"
              active={active === "Reports"}
              onClick={() => handleSetActive("Reports")}
              as={Link}
              to="/reports"
            />
          </Sidebar>
        )}
        <div className={`w-full h-screen ${!isMobile ? "p-7" : "p-2"} `}>
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
