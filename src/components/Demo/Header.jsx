// Header component
"use client"
import React from "react"
import { Menu, ChevronLast } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"

const Header = ({ expanded, toggleExpanded }) => {
  return (
    <div className="w-full flex items-center">
      <div className="w-full h-16 p-5 bg-white rounded-full shadow-lg flex justify-between items-center dark:bg-[#181818]">
        <div>
          <button onClick={toggleExpanded} className="p-2">
            {expanded ? (
              <Menu strokeWidth={2} />
            ) : (
              <ChevronLast strokeWidth={2} />
            )}
          </button>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
