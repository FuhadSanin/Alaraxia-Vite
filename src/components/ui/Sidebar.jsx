// Sidebar component
import React, { useContext } from "react"
import logo from "../../assets/logo.svg"
import { SidebarContext } from "@/layouts/layout"
import { Link } from "react-router-dom"

export default function Sidebar({ children }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <aside className="h-screen p-8 pr-4">
      <nav className=" h-full flex flex-col bg-white border border-[gold] dark:border-[gray] rounded-3xl shadow-xl dark:bg-[#181818]">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-14" : "w-11"
            }`}
            alt="logo"
          />
        </div>

        <ul className="flex-1 px-3 flex flex-col items-center justify-center">
          {children}
        </ul>

        <div className=" flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
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
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, onClick, as, to }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-normal text-sm rounded-full cursor-pointer
        transition-colors group
        ${
          active
            ? " from-indigo-200 to-indigo-100 text-white bg-[#0C2556]"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {as ? <as to={to}>{text}</as> : <span>{text}</span>}
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
  )
}
