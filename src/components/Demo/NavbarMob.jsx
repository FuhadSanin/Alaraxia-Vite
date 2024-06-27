import React, { createContext, useState } from "react"

import { ModeToggle } from "@components/ui/mode-toggle"
import { Card } from "@components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet"

import { Link } from "react-router-dom"

import { Home, Ticket, Users, ClipboardMinus, Menu } from "lucide-react"

import logo from "@assets/logo.svg"
import SidebarDemo from "./Sidebar"

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
            <SidebarDemo />
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
