import React, { createContext, useState } from "react"

import { ModeToggle } from "@components/ui/mode-toggle"
import { Card } from "@components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar, { SidebarSubItem } from "@/components/Demo/Sidebar"

import { Link } from "react-router-dom"

import { Home, Ticket, Users, ClipboardMinus, Menu } from "lucide-react"

import logo from "@/assets/logo.svg"

const Navbarmob = () => {
  const [active, setActive] = useState("Dashboard")


  return (
    <Card className="w-full flex justify-between items-center mb-5 p-2 pl-4 pr-4">
      <div>
        <Sheet>
          <SheetTrigger>
            <Menu strokeWidth={1.5} />
          </SheetTrigger>
          <SheetContent>
            <Sidebar className="w-full p-0 pr-0 ">
              <SidebarSubItem
                icon={<Home strokeWidth={1} />}
                text="Dashboard"
                active={active === "Dashboard"}
                // onClick={() => handleSetActive("Dashboard")}
                as={Link}
                to="/"
              />
              <SidebarSubItem
                icon={<Ticket strokeWidth={1} />}
                text="Tickets"
                active={active === "Tickets"}
                // onClick={() => handleSetActive("Tickets")}
                as={Link}
                to="/ticket"
                submenus={[
                  {
                    text: "All Tickets",
                    to: "/ticket",
                  },
                  {
                    text: "Create Ticket",
                    to: "/ticket/create",
                  },
                ]}
              />
              <SidebarSubItem
                icon={<Users strokeWidth={1} />}
                text="User Management"
                active={active === "User Management"}
                // onClick={() => handleSetActive("User Management")}
                as={Link}
                to="/management"
              />
              <SidebarSubItem
                icon={<ClipboardMinus strokeWidth={1} />}
                text="Reports"
                active={active === "Reports"}
                // onClick={() => handleSetActive("Reports")}
                as={Link}
                to="/reports"
              />
            </Sidebar>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <img src={logo} width={50} height={50} alt="" />
      </div>
      <div>
        <ModeToggle />
      </div>
    </Card>
  )
}

export default Navbarmob
