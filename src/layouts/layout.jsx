import React, { createContext, useState } from "react"
import { useMediaQuery } from "react-responsive"
import Sidebar, { SidebarItem } from "@/components/ui/Sidebar"
import Header from "@/components/ui/Header"
import { Home, Ticket } from "lucide-react"
import { cn } from "../lib/utils"
import { Link } from "react-router-dom"

// Create context
export const SidebarContext = createContext()

export default function Layout({ children }) {
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
      className={cn(
        "h-screen w-full bg-[#F9FBFE] dark:bg-[#212121] dark:text-white text-black flex ",
        { "debug-screens": process.env.NODE_ENV === "development" }
      )}
    >
      <SidebarContext.Provider value={{ expanded, toggleExpanded, active }}>
        {!isMobile && (
          <Sidebar>
            <SidebarItem
              icon={<Home strokeWidth={1} />}
              text="Dashboard"
              active={active === "Dashboard"}
              onClick={() => handleSetActive("Dashboard")}
              as={Link}
              to="/"
            />
            <SidebarItem
              icon={<Ticket strokeWidth={1} />}
              text="Tickets"
              active={active === "Tickets"}
              onClick={() => handleSetActive("Tickets")}
              as={Link}
              to="/ticket"
            />
          </Sidebar>
        )}
        <div className="w-full h-screen p-7 ">
          <div>
            {!isMobile && (
              <Header expanded={expanded} toggleExpanded={toggleExpanded} />
            )}
          </div>
          <div className={isMobile ? "pt-0" : "pt-8"}>{children}</div>
        </div>
      </SidebarContext.Provider>
    </div>
  )
}
