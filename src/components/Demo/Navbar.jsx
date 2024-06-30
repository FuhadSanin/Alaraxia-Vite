// Header component
import React, { useState } from "react"
import { Menu, ChevronLast, Bell } from "lucide-react"
import { ModeToggle } from "@components/ui/mode-toggle"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"

const Header = ({ expanded, toggleExpanded }) => {
  const { authToken } = useAuth()

  const { data: count } = useQuery({
    queryKey: "notifications",
    queryFn: async () => {
      const response = await Services.getNotifications(authToken)
      return response.data.count
    },
  })
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
        <div className="flex items-center gap-7">
          <ModeToggle />
          <div className="relative inline-block">
            <Link to="/notification">
              <Bell size={20} className="bell-icon" />
              {count > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center h-5 w-5">
                  {count}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
