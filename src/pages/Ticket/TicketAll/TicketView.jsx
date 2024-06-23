import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronsLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@components/ui/card"
import ModalAssign from "./ModalAssign"
import ModalCancel from "./ModalCancel"
import ImageUpload from "./ImageUpload"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { Button } from "@components/ui/button"
import {
  CallType,
  WarrantyStatus,
  LocationMap,
  ServiceType,
  CustomerDemand,
  PendingReasonMap,
  TicketStatus,
  CancellationReasonMap,
} from "@constants/constants"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@components/ui/skeleton"

const TicketView = () => {
  const kind = 5
  const { id } = useParams()
  const { authToken } = useAuth()

  const [customer, setCustomer] = useState({})
  const [product, setProduct] = useState({})
  const [ticket, setTicket] = useState({})
  const [technician, setTechnician] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketResponse = await Services.getTicketsById(authToken, id)
        const ticketData = ticketResponse.data
        setTicket(ticketData)

        if (ticketData) {
          try {
            const customerResponse = await Services.getCustomersById(
              authToken,
              ticketData.customer
            )
            setCustomer(customerResponse.data)
          } catch (error) {
            console.error("Error fetching customer:", error)
          }

          try {
            const productResponse = await Services.getProductsById(
              authToken,
              ticketData.product
            )
            setProduct(productResponse.data)
          } catch (error) {
            console.error("Error fetching product:", error)
          }

          if (ticketData.assignee) {
            try {
              const technicianResponse = await Services.getUsersById(
                authToken,
                ticketData.assignee
              )
              setTechnician(technicianResponse.data.name)
            } catch (error) {
              console.error("Error fetching technician:", error)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching ticket:", error)
      }
    }

    fetchData()
  }, [id, authToken])

  const renderTicketActions = () => {
    if (
      ticket.ticket_status !== 3 &&
      ticket.ticket_status !== 6 &&
      ticket.ticket_status !== 4
    ) {
      if (ticket.ticket_status === 5) {
        return (
          <div className="flex gap-5">
            <ModalAssign title="Reassign" id={ticket?.uuid} />
            <ModalCancel />
          </div>
        )
      } else if (!ticket.assignee) {
        return <ModalAssign />
      } else {
        return (
          <div>
            <p className="text-right text-xs text-gray-500">Technician</p>
            <p className="font-semibold">{technician}</p>
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center">
        <Link to="/ticket" className="flex">
          <ChevronsLeft className="mr-2" />
        </Link>
        <h1 className="text-2xl font-bold">
          View{" "}
          {(ticket?.ticket_status === 5 || ticket?.ticket_status === 3) && (
            <span> Pending </span>
          )}
          Ticket
        </h1>
      </div>

      {/* Ticket Details */}
      <Card className="mb-5">
        <CardContent className="flex justify-between items-center">
          <div className="flex flex-col">
            <h6 className="font-bold">{customer?.name || "Name"}</h6>
            <div className="flex flex-wrap items-center mt-2">
              <ul className="list-none flex flex-wrap mb-0 md:space-x-3 space-x-0">
                <li className="flex items-center text-gray-500">
                  <span className="text-blue-500 mr-1">&#9679;</span>
                  {customer?.customer_id}
                </li>
                <li className="flex items-center text-gray-500">
                  <span className="text-blue-500 mr-1">&#9679;</span>
                  {ticket?.ticket_id}
                </li>
              </ul>
            </div>
          </div>
          {renderTicketActions()}
        </CardContent>
      </Card>

      {/* Customer and Product Details */}
      <div className="flex flex-wrap md:flex-nowrap gap-5 mb-5">
        <Card className="w-full md:w-1/2">
          <CardContent className="flex justify-between items-center">
            <h6 className="font-bold">Customer Details</h6>
            {kind !== 1 && (
              <Link
                to={`/customer/edit/customerid/${customer.uuid}/ticketid/${id}`}
              >
                <Button variant="blue" className="h-7">
                  Edit
                </Button>
              </Link>
            )}
          </CardContent>
          <hr />
          <CardContent className="mt-2">
            {ticket && customer && (
              <table className="w-full">
                <tbody>
                  <tr>
                    <CardDescription>Address</CardDescription>
                    <td className="text-right">
                      {ticket?.house_number || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Street</CardDescription>
                    <td className="text-right">{ticket?.street || "N/A"}</td>
                  </tr>
                  <tr>
                    <CardDescription>Location</CardDescription>
                    <td className="text-right">
                      {LocationMap[ticket?.location] || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Landmark</CardDescription>
                    <td className="text-right">{ticket?.landmark || "N/A"}</td>
                  </tr>
                  <tr>
                    <CardDescription>Country</CardDescription>
                    <td className="text-right">Kerala</td>
                  </tr>
                  <tr>
                    <CardDescription>Contact Information 1</CardDescription>
                    <td className="text-right">
                      {customer?.phone_number || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Contact Information 2</CardDescription>
                    <td className="text-right">
                      {customer?.secondary_contact_number || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Email Address</CardDescription>
                    <td className="text-right">{customer?.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <CardDescription>Dealer’s name</CardDescription>
                    <td className="text-right">{ticket?.dealer || "N/A"}</td>
                  </tr>
                  <tr>
                    <CardDescription>Created On</CardDescription>
                    <td className="text-right">
                      {customer?.created_at || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
        {/* Product Details */}
        <Card className="w-full md:w-1/2">
          <CardContent className="flex justify-between items-center">
            <h6 className="font-bold">Product Details</h6>
          </CardContent>
          <hr />
          <CardContent className="mt-2">
            {ticket && product && (
              <table className="w-full">
                <tbody>
                  <tr>
                    <CardDescription>Product name</CardDescription>
                    <td className="text-right">{product?.name || "N/A"}</td>
                  </tr>
                  <tr>
                    <CardDescription>Brand name</CardDescription>
                    <td className="text-right">{product?.brand || "N/A"}</td>
                  </tr>
                  <tr>
                    <CardDescription>Model number</CardDescription>
                    <td className="text-right">
                      {product?.model_number || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Customer remarks</CardDescription>
                    <td className="text-right">
                      {ticket?.customer_remarks || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Call type</CardDescription>
                    <td className="text-right">
                      {CallType[ticket?.call_type] || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Service type</CardDescription>
                    <td className="text-right">
                      {ServiceType[ticket?.service_type] || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Warranty flag</CardDescription>
                    <td className="text-right">
                      {WarrantyStatus[ticket?.warranty_flag] || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Customer Demand</CardDescription>
                    <td className="text-right">
                      {CustomerDemand[ticket?.customer_demand] || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Service Requested By</CardDescription>
                    <td className="text-right">
                      {ticket?.service_requested_by || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Appointment date</CardDescription>
                    <td className="text-right">
                      {ticket?.created_at || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <CardDescription>Appointment Time</CardDescription>
                    <td className="text-right">
                      {ticket?.created_at || "N/A"}
                    </td>
                  </tr>
                  {ticket?.ticket_status === 5 && (
                    <tr>
                      <CardDescription>Pending Reason</CardDescription>
                      <td className="text-right text-destructive">
                        {PendingReasonMap[ticket?.pending_reason] || "N/A"}
                      </td>
                    </tr>
                  )}

                  {ticket?.ticket_status === 3 && (
                    <>
                      <tr>
                        <CardDescription>Cancelled Reason</CardDescription>
                        <td className="text-right text-destructive">
                          {CancellationReasonMap[ticket?.cancellation_reason]}
                        </td>
                      </tr>
                      <tr>
                        <CardDescription>Ageing</CardDescription>
                        <td className="text-right">
                          {ticket?.ageing || "N/A"}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Section */}
      {kind === 1 ? <ImageUpload /> : renderServiceHistory(ticket.customer_id)}
    </div>
  )
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

const renderServiceHistory = customer_id => {
  const { authToken } = useAuth()
  const {
    isLoading,
    error,
    data: tickets,
  } = useQuery({
    querykey: ["tickets", customer_id],
    queryFn: async () => {
      if (customer_id) {
        const response = await Services.getTickets(authToken, {
          customer_id: customer_id,
        })
        return response.data.results
      }
    },
  })

  console.log("tickets", tickets)

  return (
    <Card className="mb-5">
      <CardTitle> Service History</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Last Service Date</TableCell>
              <TableCell>Ticket No</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Technician Assigned</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonRows rows={5} columns={7} />
            ) : (
              tickets &&
              tickets.map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.ticket_id}</TableCell>
                  <TableCell className="flex flex-col">
                    {ticket.ticket_id}
                  </TableCell>
                  <TableCell>{ServiceType[ticket.service_type]}</TableCell>
                  <TableCell>{ticket.assigned_technician_name}</TableCell>
                  <TableCell>{ticket.phone_number}</TableCell>
                  <TableCell>{ticket.customer_remarks}</TableCell>
                  <TableCell>
                    <Button
                      className="h-7"
                      variant={TicketStatus[ticket.ticket_status]}
                    >
                      {TicketStatus[ticket.ticket_status]}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>{" "}
      </CardContent>
    </Card>
  )
}

export default TicketView
