import React, { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { Skeleton } from "@components/ui/skeleton"
import { SelectDemo } from "@components/Demo/SelectDemo"
import { Card, CardContent, CardDescription } from "@components/ui/card"
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
import { Download, SlidersHorizontal, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@components/ui/input"
import { useQuery } from "@tanstack/react-query"

const useCustomersQuery = (
  authToken,
  itemsPerPage,
  searchInput,
  selectedLocation,
  setCount
) => {
  return useQuery({
    queryKey: [
      "customers",
      authToken,
      itemsPerPage,
      searchInput,
      selectedLocation,
    ],
    queryFn: async () => {
      try {
        const response = await Services.getCustomers(authToken)
        setCount(response.data.count)
        return response.data.results
      } catch (error) {
        throw new Error(`Failed to fetch customers: ${error.message}`)
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

const CustomerTable = ({ customers }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Customer Name</TableCell>
        <TableCell>Email Address</TableCell>
        <TableCell>Phone</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {customers.map((customer, index) => (
        <TableRow key={index}>
          <TableCell className="flex flex-col">
            {customer.name}
            <span className="text-[13px] text-gray-500">
              {customer.customer_id}
            </span>
          </TableCell>
          <TableCell>{customer.email}</TableCell>
          <TableCell>{customer.phone_number}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const CustomerMobileView = ({ customers }) => (
  <div className="w-full flex flex-col gap-5">
    {customers.map((customer, index) => (
      <Card className="bg-white p-0" key={index}>
        <div className="flex bg-[#0C2556] mb-5 text-white p-5 rounded-t-3xl items-center justify-between">
          <h4>{customer.customer_id}</h4>
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
                  {customer.customer_name || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Product Type</CardDescription>
                <td className="text-right">{customer.product_name || "N/A"}</td>
              </tr>
              <tr>
                <CardDescription>CallType</CardDescription>
                <td className="text-right">
                  {CallType[customer.call_type] || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Landmark</CardDescription>
                <td className="text-right">{customer.landmark || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    ))}
  </div>
)

const ManagementCustomer = () => {
  const { authToken } = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [state, setState] = useState({
    searchInput: "",
    selectedLocation: undefined,
    itemsPerPage: 5,
  })
  const [count, setCount] = useState(0)

  const { searchInput, selectedLocation, itemsPerPage } = state

  const {
    isLoading,
    isError,
    error,
    data: customers,
  } = useCustomersQuery(
    authToken,
    itemsPerPage,
    searchInput,
    selectedLocation,
    setCount
  )

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
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div class="border-b-2 border-yellow-500 mb-5 text-yellow-500">
            <div class="p-3 flex justify-between items-center">
              <h6 class="text-warning">
                Total <br />
                Customers
              </h6>
              <h3 class="text-3xl font-bold">{count}</h3>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mb-8">
            <div>
              <Input
                placeholder="Search Customer"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div>
            <Button variant="secondary">
              Export
              <span className="ml-2">
                <Download strokeWidth={1.2} />
              </span>
            </Button>
          </div>

          {isLoading ? (
            <SkeletonRows rows={5} columns={7} />
          ) : (
            <>
              {isMobile ? (
                <CustomerMobileView customers={customers} />
              ) : (
                <CustomerTable customers={customers} />
              )}
            </>
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

export default ManagementCustomer
