import React, { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { Skeleton } from "@components/ui/skeleton"
import { SelectDemo } from "@components/Demo/SelectDemo"
import { Card, CardContent, CardDescription } from "@components/ui/card"
import { DatePickerDemo } from "@components/ui/datepicker"
import { Button } from "@components/ui/button"
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
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { CallType, LocationMap, TicketStatus } from "@constants/constants"
import { Download, SlidersHorizontal, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { Eye, Pencil } from "lucide-react"

const useTicketsQuery = (
  authToken,
  itemsPerPage,
  searchInput,
  selectedLocation,
  selectedFromDate,
  selectedToDate
) => {
  return useQuery({
    queryKey: [
      "tickets",
      authToken,
      itemsPerPage,
      searchInput,
      selectedLocation,
      selectedFromDate,
      selectedToDate,
    ],
    queryFn: async () => {
      try {
        let response
        const data = {
          limit: itemsPerPage,
          search: searchInput,
          location: selectedLocation,
          created_at_after: selectedFromDate,
          created_at_before: selectedToDate,
          ticket_status: 2,
        }
        response = await Services.getTickets(authToken, data)

        return response.data.results
      } catch (error) {
        throw new Error(`Failed to fetch tickets: ${error.message}`)
      }
    },
  })
}

const SkeletonRows = ({ rows, columns }) => (
  <div>
    {[...Array(rows)].map((_, rowIndex) => (
      <div key={rowIndex} className="flex p-4 justify-between">
        {[...Array(columns)].map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 w-32" />
        ))}
      </div>
    ))}
  </div>
)

const TicketTable = ({ tickets }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Ticket ID</TableCell>
        <TableCell>Customer Name</TableCell>
        <TableCell>Product Type</TableCell>
        <TableCell>Call Type</TableCell>
        <TableCell>Assigned On</TableCell>
        <TableCell>Location</TableCell>
        <TableCell>Technician</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {tickets &&
        tickets.map((ticket, index) => (
          <TableRow key={index}>
            <TableCell>{ticket.ticket_id}</TableCell>
            <TableCell className="flex flex-col">
              {ticket.customer_name}
              <span className="text-[13px] text-gray-500">
                {ticket.customer_id}
              </span>
            </TableCell>
            <TableCell>{ticket.product_name}</TableCell>
            <TableCell>{CallType[ticket.call_type]}</TableCell>
            <TableCell>{ticket.assigned_on?.slice(0, 10)}</TableCell>
            <TableCell>{LocationMap[ticket.location]}</TableCell>
            <TableCell>{ticket.assigned_technician_name}</TableCell>

            <TableCell>
              <div className="flex gap-3 items-center cursor-pointer">
                <Link to={`/ticket/view/${ticket.uuid}`}>
                  <Eye size={20} />
                </Link>
                <Pencil size={20} />
              </div>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
)

const TicketMobileView = ({ tickets }) => (
  <div className="w-full flex flex-col gap-5">
    {tickets.map((ticket, index) => (
      <Card className="bg-white p-0" key={index}>
        <div className="flex bg-[#0C2556] mb-5 text-white p-5 rounded-t-3xl items-center justify-between">
          <h4>{ticket.ticket_id}</h4>
          <Link
            to={"/ticket/view/" + ticket.uuid}
            className="bg-white rounded-full text-gray-500 p-1"
          >
            <ChevronRight size={20} />
          </Link>
        </div>
        <CardContent>
          <table className="w-full">
            <tbody>
              <tr>
                <CardDescription>Name</CardDescription>
                <td className="text-right">{ticket.customer_name || "N/A"}</td>
              </tr>
              <tr>
                <CardDescription>Product Type</CardDescription>
                <td className="text-right">{ticket.product_name || "N/A"}</td>
              </tr>
              <tr>
                <CardDescription>Assgined On</CardDescription>
                <td className="text-right">
                  {ticket.assigned_on?.slice(0, 10) || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Address</CardDescription>
                <td className="text-right">
                  {`${ticket.house_number}, ${ticket.street}, ${
                    LocationMap[ticket.location] || "N/A"
                  }`}
                </td>
              </tr>
              <tr>
                <CardDescription>Status</CardDescription>
                <td className="text-right">
                  <Button
                    variant={`${TicketStatus[ticket.ticket_status]}`}
                    className="h-6 w-20"
                  >
                    {TicketStatus[ticket.ticket_status] || "N/A"}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    ))}
  </div>
)

const PreventingMaintanence = () => {
  const { authToken } = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [state, setState] = useState({
    searchInput: "",
    selectedLocation: undefined,
    selectedFromDate: null,
    selectedToDate: null,
    itemsPerPage: 5,
  })

  const {
    searchInput,
    selectedLocation,
    selectedFromDate,
    selectedToDate,
    itemsPerPage,
  } = state

  const {
    isLoading,
    isError,
    error,
    data: tickets,
  } = useTicketsQuery(
    authToken,
    itemsPerPage,
    searchInput,
    selectedLocation,
    selectedFromDate,
    selectedToDate
  )

  const { data: locations } = useQuery({
    queryKey: ["locations", authToken],
    queryFn: async () => {
      const response = await Services.getLocations(authToken)
      const mappedLocations = response.data.results.map(location => ({
        value: location.uuid,
        label: location.name,
      }))
      return mappedLocations
    },
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        debouncedSearchInput: searchInput,
      }))
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchInput])

  const handleSearchInputChange = e => {
    const { value } = e.target
    setState(prevState => ({
      ...prevState,
      searchInput: value,
    }))
  }

  const handleFromDate = date => {
    setState(prevState => ({
      ...prevState,
      selectedFromDate: JSON.stringify(date).slice(1, 11),
    }))
  }

  const handleToDate = date => {
    setState(prevState => ({
      ...prevState,
      selectedToDate: JSON.stringify(date).slice(1, 11),
    }))
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <p>
          Something went wrong. Please try again later.
          <br />
          Error: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Preventing Maintenance</h1>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="w-fit">
              <Input
                placeholder="Search Customer"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="flex gap-5 items-center justify-center">
              <SelectDemo
                label="Status"
                options={locations}
                value={selectedLocation}
                onChange={value =>
                  setState(prevState => ({
                    ...prevState,
                    selectedLocation: value,
                  }))
                }
              />
            </div>
          </div>
          {isLoading ? (
            <SkeletonRows rows={4} columns={6} />
          ) : (
            <div className="mb-8">
              {tickets.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-500">No tickets found</p>
                </div>
              ) : !isMobile ? (
                <TicketTable tickets={tickets} />
              ) : (
                <TicketMobileView tickets={tickets} />
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between">
            <div>
              <SelectDemo
                options={[
                  { value: 5, label: 5 },
                  { value: 10, label: 10 },
                  { value: 50, label: 50 },
                ]}
                value={itemsPerPage}
                onChange={value =>
                  setState(prevState => ({
                    ...prevState,
                    itemsPerPage: value,
                  }))
                }
              />
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext />
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

export default PreventingMaintanence
