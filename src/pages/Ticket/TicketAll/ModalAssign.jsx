import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

// Define the form schema using Zod
const FormSchema = z.object({
  technician: z.string().min(1, "Technician is required"),
  scheduleDate: z.string().min(1, "Schedule Date is required"),
  fromTime: z.string().min(1, "From Time is required"),
  toTime: z.string().min(1, "To Time is required"),
})

const TicketAddForm = () => {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      technician: "",
      scheduleDate: "",
      fromTime: "",
      toTime: "",
    },
  })

  const onSubmit = data => {
    console.log(data)
    navigate("/ticket/add")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="technician"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technician</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scheduleDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Sheduled Time</FormLabel>
        <div className="flex">
          
          <FormField
            control={form.control}
            name="fromTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="time" {...field} placeholder="From Time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="gray">
            Cancel
          </Button>
          <Button type="submit" variant="blue">
            Assign Technician
          </Button>
        </div>
      </form>
    </Form>
  )
}
const ModalAssign = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="blue">Assign Technician</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="mb-3">Assign Technician</DialogTitle>
            <Card className="mb-5">
              <CardContent className="flex  items-center p-0">
                <div className="flex flex-col">
                  <h6 className="font-bold text-left">Hari Menon</h6>
                  <ul className="list-none flex  space-x-3">
                    <li className="flex items-center text-gray-500">
                      <span className="text-blue-500 mr-1">&#9679;</span>
                      ACI-14275
                    </li>
                    <li className="flex items-center text-gray-500">
                      <span className="text-blue-500 mr-1">&#9679;</span>
                      T-14275
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <TicketAddForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalAssign
