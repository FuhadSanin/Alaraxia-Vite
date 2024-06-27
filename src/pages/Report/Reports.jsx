import React, { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { Skeleton } from "@components/ui/skeleton"
import { SelectDemo } from "@components/Demo/SelectDemo"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
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
import { CallType, LocationMap, TicketStatus } from "@constants/constants"
import { Download, SlidersHorizontal, Archive, Smile } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { DatePickerDemo } from "@components/ui/datepicker"

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
          ticket_status: 4,
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
        <TableCell>Customer Name</TableCell>
        <TableCell>Service Date</TableCell>
        <TableCell>Service Type</TableCell>
        <TableCell>Technician</TableCell>
        <TableCell>Closed Status</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {tickets.map((ticket, index) => (
        <TableRow key={index}>
          <TableCell className="flex flex-col">
            {ticket.customer_name}{" "}
            <span className="text-[13px] text-gray-500">
              {ticket.customer_id}
            </span>
          </TableCell>
          <TableCell>{ticket.close_date?.slice(0, 10)}</TableCell>
          <TableCell>{ticket.service_type}</TableCell>
          <TableCell>{ticket.assigned_technician_name}</TableCell>
          <TableCell>
            {ticket.closed_with_happy_code ? (
              <Button variant="Closed" className="h-7 gap-2">
                With Code <Smile size={17} />
              </Button>
            ) : (
              <Button variant="Cancelled" className="h-7 gap-2">
                With out Code <Smile size={17} />
              </Button>
            )}
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
          <Link className="bg-white rounded-full text-gray-500 p-1">
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
                <CardDescription>CallType</CardDescription>
                <td className="text-right">
                  {CallType[ticket.call_type] || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Location</CardDescription>
                <td className="text-right">
                  {LocationMap[ticket.location] || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Landmark</CardDescription>
                <td className="text-right">{ticket.landmark || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    ))}
  </div>
)

const Reports = () => {
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

  const {
    data: closeSummary,
    isLoading: closeSummaryIsLoading,
    isError: closeSummaryIsError,
    error: closeSummaryError,
  } = useQuery({
    queryKey: ["closeSummary", authToken],
    queryFn: async () => {
      const response = await Services.getTicketClosedSummary(authToken)
      return response.data
    },
  })

  const {
    data: call_type_summary,
    isLoading: callTypeSummaryIsLoading,
    isError: callTypeSummaryIsError,
    error: callTypeSummaryError,
  } = useQuery({
    queryKey: ["call_type_summary", authToken],
    queryFn: async () => {
      const response = await Services.getTicketCallTypeSummary(authToken)
      return response.data
    },
  })

  console.log("closeSummary", closeSummary)
  console.log("call_type_summary", call_type_summary)

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

  return (
    <div className="container mx-auto p-4">
      <div className="pb-5 md:mb-0 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Reports</h1>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <div className="flex items-center gap-2">
            <DatePickerDemo
              placeholder="From Date"
              onSelectDate={handleFromDate}
            />

            <span className="text-gray-600">To</span>
            <DatePickerDemo placeholder="To Date" onSelectDate={handleToDate} />
          </div>
          <SelectDemo
            label="Location"
            options={locations}
            value={selectedLocation}
            onChange={value =>
              setState(prevState => ({
                ...prevState,
                selectedLocation: value,
              }))
            }
          />
          <SelectDemo
            label="Product Type"
            options={locations}
            value={selectedLocation}
            onChange={value =>
              setState(prevState => ({
                ...prevState,
                selectedLocation: value,
              }))
            }
          />
          <Button variant="secondary">
            Export
            <span className="ml-2">
              <Download strokeWidth={1.2} />
            </span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {closeSummaryIsLoading ? (
            <div>Loading</div>
          ) : closeSummaryIsError ? (
            <div>Error</div>
          ) : (
            <div class="p-4 mb-5">
              <div class="flex flex-wrap">
                <div class="w-full md:w-1/3 border-b-2 border-green-500">
                  <div class="p-3 flex justify-between items-center">
                    <h6 class="text-green-500">
                      Total <br />
                      Service Done
                    </h6>
                    <h3 class="text-green-500 text-3xl font-semibold">
                      {closeSummary["with_happy_code"] +
                        closeSummary["without_happy_code"]}
                    </h3>
                  </div>
                </div>
                <div class="w-full md:w-1/3 border-b-2 border-red-500">
                  <div class="p-3 flex justify-between items-center">
                    <h6 class="text-red-500">
                      Total Tickets Closed <br />
                      With Happy Code
                    </h6>
                    <h3 class="text-red-500 text-3xl font-semibold">
                      {closeSummary["with_happy_code"]}
                    </h3>
                  </div>
                </div>
                <div class="w-full md:w-1/3 border-b-2 dark:border-white border-blue-600">
                  <div class="p-3 flex justify-between items-center">
                    <h6 class="text-blue-600 dark:text-white">
                      Total Tickets Closed <br />
                      Without Happy Code
                    </h6>
                    <h3 class="text-blue-600 dark:text-white text-3xl font-semibold">
                      {closeSummary["without_happy_code"]}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {callTypeSummaryIsLoading ? (
            <div>Loading</div>
          ) : callTypeSummaryIsError ? (
            <div>Error</div>
          ) : (
            <div class="p-3 mb-5">
              <div class="flex flex-wrap">
                <Card className="p-2 w-full md:w-1/3 h-fit">
                  <CardHeader className="pb-1 pt-2">
                    <CardTitle className="text-xl pb-1">
                      {call_type_summary["Installation"]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <CardDescription>Total Installations</CardDescription>
                  </CardContent>
                </Card>
                <Card className="p-2 w-full md:w-1/3 h-fit">
                  <CardHeader className="pb-1 pt-2">
                    <CardTitle className="text-xl pb-1">
                      {call_type_summary["Repair"]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <CardDescription>Total Repair</CardDescription>
                  </CardContent>
                </Card>
                <Card className="p-2 w-full md:w-1/3 h-fit">
                  <CardHeader className="pb-1 pt-2">
                    <CardTitle className="text-xl pb-1">
                      {call_type_summary["Inspection"]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1 pb-1">
                    <CardDescription> Total Site Inspection</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="w-fit">
              <Input
                placeholder="Search Customer"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          {isLoading ? (
            <SkeletonRows rows={5} columns={7} />
          ) : isError ? (
            <div>Something went wrong</div>
          ) : tickets.length < 0 ? (
            <div>No tickets found</div>
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
          <div className="flex flex-wrap items-center justify-between mt-5">
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

export default Reports
