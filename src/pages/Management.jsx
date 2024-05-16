// app/Dashboard/Dashboard.js
import React, { useState } from "react"
import { SelectDemo } from "@/components/Demo/selectDemo"
import { Card, CardContent } from "@/components/ui/card"
import { DatePickerDemo } from "@/components/ui/datepicker"
import { Button } from "@/components/ui/button"
import { Command, CommandInput } from "@/components/ui/command"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
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
//icons
import { Plus, Download, Eye, Pencil, EllipsisVertical } from "lucide-react"

const tickets = [
  {
    ticketId: "TID101",
    customerName: "Hari Menon",
    productType: "Air Conditioner",
    dealerName: "Anand Pillai",
    createdOn: "2024-07-10",
    location: "Ernakulam",
    status: "Pending",
    dealerCode: "C4712",
    Action: "",
  },
  {
    ticketId: "TID102",
    customerName: "Hari Menon",
    productType: "Air Conditioner",
    dealerName: "Anand Pillai",
    createdOn: "2024-07-10",
    location: "Ernakulam",
    status: "Assigned",
    dealerCode: "C4712",
  },
]
const Management = ({ title }) => {
  const headers = Object.keys(tickets[0])
  const itemsPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(tickets.length / itemsPerPage)
  const indexOfLastTicket = currentPage * itemsPerPage
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket)

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      </div>
      <Card>
        <CardContent>
          <div class="p-4 mb-8">
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/4 border-b-2 border-green-500">
                <div class="p-3 flex justify-between items-center">
                  <h6 class="text-green-500">
                    Total <br />
                    Technicians
                  </h6>
                  <h3 class="text-green-500 text-3xl font-semibold">18</h3>
                </div>
              </div>
              <div class="w-full md:w-1/4 border-b-2 border-orange-500">
                <div class="p-3 flex justify-between items-center">
                  <h6 class="text-orange-500">
                    Total Customer <br />
                    Care Officers
                  </h6>
                  <h3 class="text-orange-500 text-3xl font-semibold">18</h3>
                </div>
              </div>
              <div class="w-full md:w-1/4 border-b-2 border-gray-800">
                <div class="p-3 flex justify-between items-center">
                  <h6 class="text-gray-800">
                    Total Area Service
                    <br />
                    Managers
                  </h6>
                  <h3 class="text-gray-800 text-3xl font-semibold">18</h3>
                </div>
              </div>
              <div class="w-full md:w-1/4 border-b-2 border-red-500">
                <div class="p-3 flex justify-between items-center">
                  <h6 class="text-red-500">
                    Total Call Centre <br />
                    Agents
                  </h6>
                  <h3 class="text-red-500 text-3xl font-semibold">18</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="w-fit">
              <Command className="rounded-full border ">
                <CommandInput placeholder="Search Customers" />
              </Command>
            </div>
            <div className="flex flex-wrap gap-5 items-center justify-center">
              <div>
                <SelectDemo label="Location" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <DatePickerDemo placeholder="From Date" />
                <span className="text-gray-600">To</span>
                <DatePickerDemo placeholder="To Date" />
              </div>
              <div>
                <Button variant="blue">
                  Add a new Ticket{" "}
                  <span className="ml-2">
                    <Plus strokeWidth={1.2} />
                  </span>
                </Button>
              </div>
              <div>
                <Button variant="secondary">
                  Export{" "}
                  <span className="ml-2">
                    <Download strokeWidth={1.2} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead className="capitalize" key={index}>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTickets.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell>{ticket.ticketId}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.customerName}</TableCell>
                    <TableCell>{ticket.productType}</TableCell>
                    <TableCell>{ticket.dealerName}</TableCell>
                    <TableCell>{ticket.createdOn}</TableCell>
                    <TableCell>
                      <Button variant="blue">Assign</Button>
                    </TableCell>
                    <TableCell>{ticket.dealerCode}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center cursor-pointer">
                        <Eye strokeWidth={1} size={20} />
                        <Pencil strokeWidth={1} size={20} />
                        <EllipsisVertical strokeWidth={1} size={20} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <SelectDemo label="10" />
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={handlePreviousPage} />
                  </PaginationItem>
                  {[...Array(totalPages).keys()].map(number => (
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
                    <PaginationNext onClick={handleNextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Management
