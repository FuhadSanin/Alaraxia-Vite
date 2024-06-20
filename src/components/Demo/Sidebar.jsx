// Sidebar component
import React, { useContext } from "react"
import logo from "../../assets/logo.svg"
import { SidebarContext } from "@/layouts/layout"
import { Link } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRight, User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function Sidebar({ children }) {
  const { expanded } = useContext(SidebarContext)
  const { authToken } = useAuth()

  return (
    <aside className="h-screen p-8 pr-4">
      <nav className=" h-full  flex flex-col bg-white border-2 border-[gold] dark:border-[gray] rounded-3xl shadow-xl dark:bg-[#181818]">
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

        {authToken ? (
          <div className=" flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <Link
              to="/profile"
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">
                  {authToken.user_email}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div className=" flex p-3 ">
            <User size={24} strokeWidth={1.5} />
            <Link
              to="/login"
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Login</h4>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  )
}

export function SidebarSubItem({
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
