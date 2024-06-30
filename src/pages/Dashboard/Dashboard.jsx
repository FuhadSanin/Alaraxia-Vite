import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { PieChart } from "@mui/x-charts/PieChart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { Card, CardContent, CardTitle } from "@components/ui/card"
import { Smallcards } from "@components/Demo/CardsDashboard"
import { Smallcolorcards } from "@components/Demo/CardsColorDashboard"
import { DatePickerDemo } from "@components/ui/datepicker"
import { useAuth } from "@context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import Services from "@services/services"
import { CallType, LocationMap } from "@constants/constants"
import { SelectDemo } from "@components/Demo/SelectDemo"

// Card Colors Images
import green from "@assets/Cards/green.png"
import red from "@assets/Cards/red.png"
import violet from "@assets/Cards/violet.png"
import orange from "@assets/Cards/orange.png"

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const { authToken } = useAuth()
  const [state, setState] = useState({
    selectedLocation: undefined,
    selectedFromDate: null,
    selectedToDate: null,
  })
  const filter = {
    location: state.selectedLocation,
    created_at_before: state.selectedFromDate,
    created_at_before: state.selectedToDate,
  }

  const {
    data: tickets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tickets", authToken, filter],
    queryFn: async () => {
      const response = await Services.getTickets(authToken, filter)
      return response.data.results
    },
  })

  const {
    data: userSummary,
    isLoading: isLoadingUserSummary,
    isError: isErrorUserSummary,
  } = useQuery({
    queryKey: ["userSummary", authToken],
    queryFn: async () => {
      const response = await Services.getUsersSummary(authToken, filter)
      return response.data
    },
  })

  const {
    data: ticketSummary,
    isLoading: isLoadingTicketSummary,
    isError: isErrorTicketSummary,
  } = useQuery({
    queryKey: ["ticketSummary", authToken],
    queryFn: async () => {
      const response = await Services.getTicketsSummary(authToken, filter)
      return response.data
    },
  })

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
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        {!isMobile && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex">
              <SelectDemo
                label="Location"
                options={locations}
                value={state.selectedLocation}
                onChange={value =>
                  setState(prevState => ({
                    ...prevState,
                    selectedLocation: value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <DatePickerDemo
                placeholder="From Date"
                onSelectDate={handleFromDate}
              />

              <span className="text-gray-600">To</span>
              <DatePickerDemo
                placeholder="To Date"
                onSelectDate={handleToDate}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <div>
          {isLoadingUserSummary ? (
            <div>Loading...</div>
          ) : isErrorUserSummary ? (
            <div>Error loading user summary</div>
          ) : (
            <Card>
              <CardTitle>Total Users</CardTitle>
              <div className="flex flex-wrap md:flex-nowrap justify-center gap-4">
                <Smallcolorcards
                  cardcolor={green}
                  title="Technicians"
                  value={userSummary["Technician"]}
                />
                <Smallcolorcards
                  cardcolor={violet}
                  title="CCOs"
                  value={userSummary["Customer Care Officer"]}
                />
                <Smallcolorcards
                  cardcolor={red}
                  title="CCAs"
                  value={userSummary["Customer Care Agent"]}
                />
                <Smallcolorcards
                  cardcolor={orange}
                  title="ASMs"
                  value={userSummary["Area Service Manager"]}
                />
              </div>
            </Card>
          )}

          {!isMobile && (
            <div className="flex gap-4 mt-4">
              {
                // Smallcards
                isLoadingTicketSummary ? (
                  <div>Loading...</div>
                ) : isErrorTicketSummary ? (
                  <div>Error loading ticket summary</div>
                ) : (
                  <>
                    <Smallcards
                      title="Total Tickets"
                      value={
                        ticketSummary["Open"] +
                        ticketSummary["Closed"] +
                        ticketSummary["Cancelled"] +
                        ticketSummary["Pending"] +
                        ticketSummary["Assigned"] +
                        ticketSummary["Requested for closing"]
                      }
                    />
                    <Smallcards
                      title="Total Pending"
                      value={ticketSummary["Pending"]}
                    />
                    <Smallcards
                      title="Total Assigned"
                      value={ticketSummary["Assigned"]}
                    />
                    <Smallcards
                      title="Total Escalated"
                      value={ticketSummary["escalated"]}
                    />
                  </>
                )
              }
            </div>
          )}
        </div>
        {!isMobile && (
          <Card className="flex flex-col flex-grow justify-center">
            <CardTitle>Ticket Status</CardTitle>
            <CardContent>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={200}
              />
            </CardContent>
          </Card>
        )}
      </div>
      <Card>
        <CardTitle>New Tickets</CardTitle>
        <CardContent className="p-0">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading tickets</div>
          ) : !isMobile ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Product Type</TableHead>
                  <TableHead>Call Type</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map(ticket => (
                  <TableRow key={ticket.ticket_id}>
                    <TableCell>{ticket.ticket_id}</TableCell>
                    <TableCell>{ticket.customer_name}</TableCell>
                    <TableCell>{ticket.product_name}</TableCell>
                    <TableCell>{CallType[ticket.call_type]}</TableCell>
                    <TableCell>{ticket.created_at?.slice(0, 10)}</TableCell>
                    <TableCell>{LocationMap[ticket.location]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
