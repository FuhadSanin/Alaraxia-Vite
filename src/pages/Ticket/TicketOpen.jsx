// Dashboard.js
import React, { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"

// components
import { Skeleton } from "@components/ui/skeleton"
import { SelectDemo } from "@components/Demo/SelectDemo"
import { Card, CardContent, CardDescription } from "@components/ui/card"
import { DatePickerDemo } from "@components/ui/datepicker"
import { Button } from "@components/ui/button"
import { Command, CommandInput } from "@components/ui/command"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination"
import ModalAddDemo from "@pages/Ticket/TicketAll/ModalTicketAdd"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"

// icons
import { Download, SlidersHorizontal, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Eye, Pencil, EllipsisVertical } from "lucide-react"
import { LocationMap, CallType } from "@constants/constants"
import ModalAssign from "./TicketAll/ModalAssign"

const TicketOpen = () => {
  const { authToken } = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [isLoading, setIsLoading] = useState(true) // Initial loading state
  const [tickets, setTickets] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        try {
          const response = await Services.getTicketsByStatus(authToken, 1)
          setTickets(response.data.results)
          setTimeout(() => {
            setIsLoading(false)
          }, 500)
          console.log("Tickets fetched successfully:", response.data.results)
        } catch (error) {
          console.error("Error fetching tickets:", error)
          setIsLoading(false) // Set loading to false even on error
        }
      }
    }
    fetchData()
  }, [authToken])

  const itemsPerPage = 3
  const totalPages = Math.ceil(tickets.length / itemsPerPage)
  const indexOfLastTicket = currentPage * itemsPerPage
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage
  const currentTickets = Array.isArray(tickets)
    ? tickets.slice(indexOfFirstTicket, indexOfLastTicket)
    : []
  const handleNextPage = () => {
    if (currentPage === totalPages) return
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Open Tickets</h1>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="w-fit">
              <Command className="rounded-full border ">
                <CommandInput placeholder="Search Customers" />
              </Command>
            </div>
            {!isMobile ? (
              <div className="flex gap-5 items-center justify-center">
                <div className="flex">
                  <SelectDemo label="Location" />
                </div>
                <div className="flex items-center gap-2">
                  <DatePickerDemo placeholder="From Date" />
                  <span className="text-gray-600">To</span>
                  <DatePickerDemo placeholder="To Date" />
                </div>
                <div>
                  <ModalAddDemo />
                </div>
                <div>
                  <Button variant="secondary">
                    Export
                    <span className="ml-2">
                      <Download strokeWidth={1.2} />
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between">
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline">
                      <SlidersHorizontal className="mr-2" /> Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="mb-3">Filter</DialogTitle>
                      <Card className="mb-5">
                        <CardContent className="flex  items-center p-0">
                          <div className="flex flex-col">
                            <h6 className="font-bold text-left">Hari Menon</h6>
                            <ul className="list-none flex  space-x-3">
                              <li className="flex items-center text-gray-500">
                                <span className="text-blue-500 mr-1">
                                  &#9679;
                                </span>
                                ACI-14275
                              </li>
                              <li className="flex items-center text-gray-500">
                                <span className="text-blue-500 mr-1">
                                  &#9679;
                                </span>
                                T-14275
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <div className="mb-8">
            {!isMobile ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Product Type</TableCell>
                    <TableCell>Call Type</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                      <TableCell className="pt-5 pb-5">
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    tickets &&
                    tickets.map((ticket, index) => (
                      <TableRow key={index}>
                        <TableCell>{ticket.ticket_id}</TableCell>
                        <TableCell className="flex flex-col">
                          {ticket.customer_name}{" "}
                          <span className="text-[13px] text-gray-500">
                            {ticket.customer_id}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.product_name}</TableCell>
                        <TableCell>{CallType[ticket.call_type]}</TableCell>
                        <TableCell>{ticket.created_at.slice(0, 10)}</TableCell>
                        <TableCell>{LocationMap[ticket.location]}</TableCell>
                        <TableCell>
                          <ModalAssign title="Assign" id={ticket.uuid} />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3 items-center cursor-pointer">
                            <Link to={`/ticket/view/${ticket.uuid}`}>
                              <Eye size={20} />
                            </Link>
                            <Pencil size={20} />
                            <EllipsisVertical size={20} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            ) : (
              <div className="w-full flex flex-col gap-5">
                {tickets &&
                  tickets.map((ticket, index) => (
                    <Card className="bg-white p-0 " key={index}>
                      <div className="flex bg-[#0C2556] mb-5 text-white p-5 rounded-t-3xl items-center justify-between">
                        <h4>{ticket["ticket_id"]}</h4>
                        <Link className="bg-white rounded-full text-gray-500 p-1">
                          <ChevronRight size={20} />
                        </Link>
                      </div>
                      <CardContent>
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <CardDescription>Name</CardDescription>
                              <td className="text-right">
                                {ticket.customer_name || "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <CardDescription>Product Type</CardDescription>
                              <td className="text-right">
                                {ticket.product_name || "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <CardDescription>CallType</CardDescription>
                              <td className="text-right">
                                {ticket.call_type || "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <CardDescription>Location</CardDescription>
                              <td className="text-right">
                                {ticket.location || "N/A"}
                              </td>
                            </tr>
                            <tr>
                              <CardDescription>Landmark</CardDescription>
                              <td className="text-right">
                                {ticket.landmark || "N/A"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <SelectDemo label="10" />
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={`${
                        currentPage === 1 ? " cursor-not-allowed" : ""
                      }`}
                    />
                  </PaginationItem>
                  {totalPages &&
                    [...Array(totalPages).keys()].map(number => (
                      <PaginationItem key={number}>
                        <PaginationLink
                          href="#"
                          isActive={number + 1 === currentPage}
                          onClick={() => setCurrentPage(number + 1)}
                        >
                          {number + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      className={`${
                        currentPage === totalPages ? " cursor-not-allowed" : ""
                      }`}
                      onClick={handleNextPage}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TicketOpen
