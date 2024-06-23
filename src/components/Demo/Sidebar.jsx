// Sidebar component
import React, { useContext } from "react"
import logo from "../../assets/logo.svg"
import { SidebarContext } from "@layouts/layout"
import { Link, useNavigate } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRight, LogOut, Settings, User } from "lucide-react"
import { Home, Ticket, Users, ClipboardMinus } from "lucide-react"

import { useAuth } from "@context/AuthContext"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { useToast } from "@components/ui/use-toast"
import { useMediaQuery } from "react-responsive"

function Sidebar({ children }) {
  const { authToken, userProfile, setAuthToken, setUserProfile } = useAuth()
  const { expanded } = useContext(SidebarContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handlelogout = () => {
    setAuthToken(null)
    setUserProfile(null)
    if (!authToken && !userProfile) {
      navigate("/login")
      toast({
        title: "Success! You are now signed out.",
        description: "You have successfully signed out.",
        variant: "success",
      })
    }
  }

  return (
    <aside className="h-screen p-8 pr-4">
      <nav
        className={`h-full  flex flex-col bg-white   dark:bg-[#181818] ${
          !isMobile &&
          "border-2 border-[gold] dark:border-[gray] rounded-3xl shadow-xl"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-14" : "w-11"
            }`}
            alt="logo"
          />
        </div>

        <ul className="flex-1 px-3 ">{children}</ul>

        <div className=" flex p-3 justify-between items-center">
          <div className="flex">
            <img
              src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${userProfile.name}`}
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">
                  {userProfile.name || "User Name"}
                </h4>
                <span className="text-xs text-gray-600">
                  {userProfile.kind === 5 ? "Administrator" : "Technician"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Popover>
              <PopoverTrigger>
                <Settings size={20} />
              </PopoverTrigger>
              <PopoverContent>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User size={20} />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      onClick={handlelogout}
                      className="flex items-center gap-2"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </aside>
  )
}

function SidebarSubItem({
  icon,
  text,
  active,
  alert,
  onClick,
  as,
  to,
  submenus,
}) {
  const { expanded, activeSubmenu, setActiveSubmenu } =
    useContext(SidebarContext)

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" onClick={onClick}>
        <Link to={to}>
          <AccordionTrigger>
            <li
              to={to}
              className={`
                relative flex items-center py-2 px-3 my-1
                font-normal text-sm rounded-full cursor-pointer
                group
                ${
                  active
                    ? "from-indigo-200 to-indigo-100 text-white bg-[#0C2556]"
                    : "hover:bg-blue-50 text-gray-600 dark:text-white dark:hover:bg-gray-800"
                }
              `}
            >
              {icon}
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-52 ml-3" : "w-0"
                }`}
              >
                <span>{text}</span>
              </span>
              {alert && (
                <div
                  className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                    expanded ? "" : "top-2"
                  }`}
                />
              )}
              {!expanded && (
                <div
                  className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                  `}
                >
                  {text}
                </div>
              )}
            </li>
          </AccordionTrigger>
        </Link>
        {expanded && submenus && (
          <AccordionContent className="flex flex-col items-start justify-start">
            {submenus.map((submenu, index) => (
              <ul
                className="flex-1 px-3 flex flex-col items-center justify-center"
                key={index}
              >
                <Link
                  to={submenu.to}
                  key={index}
                  onClick={() => setActiveSubmenu(submenu.text)}
                  className={`flex gap-2 items-start justify-start p-2 ${
                    activeSubmenu === submenu.text
                      ? "text-blue-500"
                      : "text-gray-600 dark:text-white"
                  }`}
                >
                  <ChevronRight size={20} strokeWidth={1} />
                  <span className="text-md">{submenu.text}</span>
                </Link>
              </ul>
            ))}
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  )
}

const sidebarConfig = {
  5: [
    {
      icon: <Home size={20} />,
      text: "Dashboard",
      to: "/",
    },
    {
      icon: <Ticket size={20} />,
      text: "Tickets",
      to: "/ticket",
      submenus: [
        { text: "All Tickets", to: "/ticket" },
        { text: "Open Ticket", to: "/ticket/open" },
        { text: "Assigned Ticket", to: "/ticket/assigned" },
        { text: "Pending Ticket", to: "/ticket/pending" },
        { text: "Cancelled Ticket", to: "/ticket/cancelled" },
        { text: "Closed Ticket", to: "/ticket/closed" },
      ],
    },
    {
      icon: <Users size={20} />,
      text: "User Management",
      to: "/management/staff",
      submenus: [
        { text: "Staff Management", to: "/management/staff" },
        { text: "Customer Management", to: "/management/customer" },
      ],
    },
    {
      icon: <ClipboardMinus size={20} />,
      text: "Reports",
      to: "/reports",
    },
  ],
  1: [
    {
      icon: <Home size={20} />,
      text: "Dashboard",
      to: "/",
    },
    {
      icon: <Ticket size={20} />,
      text: "Assigned Tickets",
      to: "/ticket/assigned",
    },
  ],
}

const SidebarDemo = () => {
  const { active, setActive, activeSubmenu, setActiveSubmenu } =
    useContext(SidebarContext)
  const { userProfile } = useAuth()
  const kind = userProfile?.kind

  const renderSidebarItems = items =>
    items.map(item => (
      <SidebarSubItem
        key={item.text}
        icon={item.icon}
        text={item.text}
        active={active === item.text}
        onClick={() => setActive(item.text)}
        as={Link}
        to={item.to}
        submenus={
          item.submenus &&
          item.submenus.map(submenu => ({
            ...submenu,
            active: activeSubmenu === submenu.text,
            onClick: () => setActiveSubmenu(submenu.text),
          }))
        }
      />
    ))

  return (
    <Sidebar>
      {sidebarConfig[kind] ? renderSidebarItems(sidebarConfig[kind]) : null}
    </Sidebar>
  )
}

export default SidebarDemo
