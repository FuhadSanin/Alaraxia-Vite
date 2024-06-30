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
import {
  CallType,
  LocationMap,
  TicketStatus,
  UserType,
  UserTypeMap,
} from "@constants/constants"
import { Download, SlidersHorizontal, Archive } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { Eye, Pencil, EllipsisVertical } from "lucide-react"
import ModalUserAdd from "./ModalUserAdd"
import ModalUserDelete from "./ModalUserDelete"

const useUsersQuery = (authToken, itemsPerPage, searchInput, kind) => {
  return useQuery({
    queryKey: ["users", authToken, itemsPerPage, searchInput, kind],
    queryFn: async () => {
      try {
        const data = {
          limit: itemsPerPage,
          search: searchInput,
          kind: kind,
        }
        const response = await Services.getUsers(authToken, data)
        return response.data.results
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`)
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

const UserTable = ({ users }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Staff Name</TableCell>
        <TableCell>User Role</TableCell>
        <TableCell>Email Address</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user, index) => (
        <TableRow key={index}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{UserTypeMap[user.kind]}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone_number}</TableCell>
          <TableCell>
            <div className="flex gap-3 items-center cursor-pointer">
              <Eye size={20} />
              <Pencil size={20} />
              <ModalUserDelete id={user.uuid} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const UserMobileView = ({ users }) => (
  <div className="w-full flex flex-col gap-5">
    {users.map((user, index) => (
      <Card className="bg-white p-0" key={index}>
        <div className="flex bg-[#0C2556] mb-5 text-white p-5 rounded-t-3xl items-center justify-between">
          <h4>{user.user_id}</h4>
          <Link className="bg-white rounded-full text-gray-500 p-1">
            <ChevronRight size={20} />
          </Link>
        </div>
        <CardContent>
          <table className="w-full">
            <tbody>
              <tr>
                <CardDescription>Name</CardDescription>
                <td className="text-right">{user.customer_name || "N/A"}</td>
              </tr>
              <tr>
                <CardDescription>Product Type</CardDescription>
                <td className="text-right">{user.product_name || "N/A"}</td>
              </tr>
              <tr>
                <CardDescription>CallType</CardDescription>
                <td className="text-right">
                  {CallType[user.call_type] || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Location</CardDescription>
                <td className="text-right">
                  {LocationMap[user.location] || "N/A"}
                </td>
              </tr>
              <tr>
                <CardDescription>Landmark</CardDescription>
                <td className="text-right">{user.landmark || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    ))}
  </div>
)

const ManagementStaff = () => {
  const { authToken } = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const [state, setState] = useState({
    searchInput: "",
    kind: undefined,
    itemsPerPage: 5,
  })

  const { searchInput, kind, itemsPerPage } = state

  const {
    isLoading,
    isError,
    error,
    data: users,
  } = useUsersQuery(authToken, itemsPerPage, searchInput, kind)

  const {
    data: userSummary,
    isLoading: isLoadingUserSummary,
    isError: isErrorUserSummary,
  } = useQuery({
    queryKey: ["userSummary", authToken],
    queryFn: async () => {
      const response = await Services.getUsersSummary(authToken)
      return response.data
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
        <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          {
            // User Summary
            isLoadingUserSummary ? (
              <div>Loading...</div>
            ) : isErrorUserSummary ? (
              <div>Error loading user summary</div>
            ) : (
              <div class="p-4 mb-8">
                <div class="flex flex-wrap">
                  <div class="w-full md:w-1/4 border-b-2 border-green-500">
                    <div class="p-3 flex justify-between items-center">
                      <h6 class="text-green-500">
                        Total <br />
                        Technicians
                      </h6>
                      <h3 class="text-green-500 text-3xl font-semibold">
                        {userSummary["Technician"]}
                      </h3>
                    </div>
                  </div>
                  <div class="w-full md:w-1/4 border-b-2 border-orange-500">
                    <div class="p-3 flex justify-between items-center">
                      <h6 class="text-orange-500">
                        Total Customer <br />
                        Care Officers
                      </h6>
                      <h3 class="text-orange-500 text-3xl font-semibold">
                        {userSummary["Customer Care Officer"]}
                      </h3>
                    </div>
                  </div>
                  <div class="w-full md:w-1/4 border-b-2 dark:border-white border-gray-800">
                    <div class="p-3 flex justify-between items-center">
                      <h6 class="text-gray-800 dark:text-white">
                        Total Area Service
                        <br />
                        Managers
                      </h6>
                      <h3 class="text-gray-800 dark:text-white text-3xl font-semibold">
                        {userSummary["Customer Care Agent"]}
                      </h3>
                    </div>
                  </div>
                  <div class="w-full md:w-1/4 border-b-2 border-red-500">
                    <div class="p-3 flex justify-between items-center">
                      <h6 class="text-red-500">
                        Total Call Centre <br />
                        Agents
                      </h6>
                      <h3 class="text-red-500 text-3xl font-semibold">
                        {userSummary["Area Service Manager"]}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

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
                label="User Role"
                options={UserType}
                value={kind}
                onChange={value =>
                  setState(prevState => ({
                    ...prevState,
                    kind: value,
                  }))
                }
              />
              <ModalUserAdd />
              <Button variant="secondary">
                Export
                <span className="ml-2">
                  <Download strokeWidth={1.2} />
                </span>
              </Button>
            </div>
          </div>
          {isLoading ? (
            <SkeletonRows rows={5} columns={7} />
          ) : (
            <>
              {users.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-500">No Users found</p>
                </div>
              ) : isMobile ? (
                <UserMobileView users={users} />
              ) : (
                <UserTable users={users} />
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

export default ManagementStaff
