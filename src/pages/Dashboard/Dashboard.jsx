import React from "react"
import { PieChart } from "@mui/x-charts/PieChart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"

import { Card, CardContent, CardTitle } from "../../components/ui/card"
import { Smallcards } from "./smallcards"
import { Smallcolorcards } from "./small-color-cards"
import { DatePickerDemo } from "../../components/ui/datepicker"

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold mb-4">Overview</h1>
        </div>
        <div className="flex">
          <div className="flex flex-wrap items-center gap-2">
            <DatePickerDemo placeholder="From Date" />
            <span className="text-gray-600">To</span>
            <DatePickerDemo placeholder="To Date" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <div>
          <Card>
            <CardTitle>Total Users</CardTitle>
            <div className="flex flex-wrap   md:justify-between justify-center gap-4">
              <Smallcolorcards />
              <Smallcolorcards />
              <Smallcolorcards />
              <Smallcolorcards />
            </div>
          </Card>
          <div className="flex flex-wrap gap-4 mt-4">
            <Smallcards />
            <Smallcards />
            <Smallcards />
            <Smallcards />
          </div>
        </div>
        <Card className="flex flex-col flex-1">
          <div className="flex justify-between">
            <CardTitle>Ticket Status</CardTitle>
          </div>
          <CardContent>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardTitle>New Tickets</CardTitle>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
