// app/Dashboard/Dashboard.js
import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
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
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import ModalUserAdd from "./ModalUserAdd"

const ManagementStaff = () => {
  const { authToken } = useAuth()
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  useEffect(() => {
    // Fetch users data from API when authToken changes
    const fetchUsers = async () => {
      try {
        const response = await Services.getUsers(authToken)
        setUsers(response.data.results)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [authToken])
  console.log(users)

  // const data = useQuery({
  //   queryKey: ["users"],
  //   queryFn: Services.getUsers(authToken),
  // })
  // console.log(data)
  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / itemsPerPage)

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
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
                <ModalUserAdd />
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
                  <TableCell>Staff Name</TableCell>
                  <TableCell>User Role</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.staffName}</TableCell>
                    <TableCell>{user.userRole}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.location}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 items-center cursor-pointer">
                        <Eye size={20} />
                        <Pencil size={20} />
                        <EllipsisVertical size={20} />
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
    </div>
  )
}

export default ManagementStaff
