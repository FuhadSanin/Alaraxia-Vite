// Dashboard.js
import React, { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"

// components
import { SelectDemo } from "@/components/Demo/SelectDemo"
import { Card, CardContent } from "@/components/ui/card"
import { DatePickerDemo } from "@/components/ui/datepicker"
import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import ModalAddDemo from "./ModalTicketAdd"
import Tablemob from "@components/Demo/TableMob"
import Services from "@services/services"
import { useAuth } from "@/context/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// icons
import { Download, SlidersHorizontal, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const Ticket = () => {
  const Demotickets = [
    {
      ticketId: "TKT-2024-001",
      customerName: "Hari Menon",
      productType: "Air Conditioner",
      callType: "Installation",
      createdOn: "Jun 5, 2024",
      location: "Ernakulam",
      status: "Pending",
      customerId: "CUST-1001",
    },
  ]
  const { authToken } = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [tickets, setTickets] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (authToken) {
      Services.getTickets(authToken)
        .then(response => {
          setTickets(response.data.results)
          console.log("Tickets fetched successfully:", response.data.results)
        })
        .catch(error => {
          console.error("Error fetching tickets:", error)
        })
    }
  }, [authToken])

  const locationMap = {
    "2741c98b-1313-45f5-aa70-26db4227ccec": "Hyderabad",
    "a9f48006-34b5-463f-a248-c7667ecd5b9f": "Kochi",
    "ecfe9b23-2c68-47e7-958b-3bd41c38ae04": "Bangalore",
    "66b42480-c555-4a83-934b-0a141b293c87": "Pune",
    "535be272-42ba-4872-8387-765b5a48bf2f": "Delhi",
    "4cbe3249-cb95-472f-8006-4ae6ea52953b": "Mumbai",
  }

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
        <h1 className="text-2xl font-bold mb-4">All Tickets</h1>
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets &&
                    tickets.map((ticket, index) => (
                      <TableRow key={index}>
                        <TableCell>{ticket.ticket_id}</TableCell>
                        <TableCell>{ticket.customer_name}</TableCell>
                        <TableCell>{ticket.product_name}</TableCell>
                        <TableCell>{ticket.call_type}</TableCell>
                        <TableCell>{ticket.created_at.slice(0, 10)}</TableCell>
                        <TableCell>{locationMap[ticket.location]}</TableCell>
                        {ticket.ticket_status === 1 ? (
                          <TableCell>
                            <Button variant="pending">Pending</Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Button variant="success">Completed</Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div className="w-full flex flex-col gap-5">
                {tickets &&
                  tickets.map((value, index) => (
                    <Card className="bg-white p-0 " key={index}>
                      <CardContent className="p-0">
                        <div className="flex bg-[#0C2556] text-white p-5 rounded-t-3xl items-center justify-between">
                          <h4>{value["ticked_id"]}</h4>
                          <Link className="bg-white rounded-full text-gray-500 p-1">
                            <ChevronRight size={20} />
                          </Link>
                        </div>
                        <div className="p-5">
                          {Object.entries(value).map(
                            ([key, val], index) =>
                              key !== "Customer ID" && (
                                <div
                                  className="flex justify-between items-center mt-2"
                                  key={index}
                                >
                                  <div className="text-sm text-gray-500">
                                    {key}
                                  </div>
                                  <div className="text-md font-semibold">
                                    {val}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
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

export default Ticket
