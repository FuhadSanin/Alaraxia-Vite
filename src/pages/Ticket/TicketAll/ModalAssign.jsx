import React, { useEffect, useState } from "react"
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
} from "@components/ui/form"
import { SelectDemo } from "@components/Demo/SelectDemo"
import { Card, CardContent } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { useParams } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"
import { useNavigate } from "react-router-dom"
// Define the form schema using Zod
const FormSchema = z.object({
  assignee: z.string().min(1, "Technician is required"),
  scheduled_date: z.string().min(1, "Schedule Date is required"),
  from_time: z.string().min(1, "From Time is required"),
  to_time: z.string().min(1, "To Time is required"),
})

const TicketAddForm = ({ technicians, id, title }) => {
  const navigate = useNavigate()
  const { authToken } = useAuth()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      assignee: "",
      scheduled_date: "",
      from_time: "",
      to_time: "",
    },
  })

  const onSubmit = data => {
    console.log(data)
    try {
      Services.assignTech(authToken, id, data)
        .then(response => {
          console.log(response)
          toast({
            title: "Technician assigned",
            description: "Technician has been assigned to the ticket",
            variant: "success",
          })
          navigate(`/ticket/view/${id}`)
        })
        .catch(error => {
          console.log(error)
          toast({
            title: "Error",
            description: "Failed to assign technician",
            variant: "destructive",
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technician</FormLabel>
              <SelectDemo
                label="Select Techinician"
                width={80}
                options={technicians}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scheduled_date"
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
        <div className="flex w-full justify-between">
          <FormField
            control={form.control}
            name="from_time"
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
            name="to_time"
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
        <div className="flex gap-4 pt-5">
          <Button variant="secondary" className="w-1/2" type="button">
            Cancel
          </Button>
          <Button className="w-1/2" type="submit" variant="blue">
            {title} Technician
          </Button>
        </div>
      </form>
    </Form>
  )
}
const ModalAssign = ({ id: propId, title }) => {
  const { id: routeId } = useParams()
  const { authToken } = useAuth()
  const [ticket, setTicket] = useState(null)
  const [technicians, setTechnicians] = useState([])

  const id = propId || routeId
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await Services.getTicketsById(authToken, id)
        setTicket(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTicket()
  }, [authToken, id])

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        Services.getUsers(authToken, 1).then(response => {
          const transformedData = response.data.results.map(item => ({
            value: item.uuid,
            label: item.name,
          }))
          setTechnicians(transformedData)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchTechnicians()
  }, [authToken])

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="blue" className="h-8">
            {title || "Assign Technician"}
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="mb-3">{title} Technician</DialogTitle>
            <Card className="dark:bg-background ">
              <CardContent className="flex  items-center p-0">
                <div className="flex flex-col ">
                  <h6 className="font-bold text-left">
                    {ticket?.customer_name}
                  </h6>
                  <ul className="list-none flex  space-x-3">
                    <li className="flex items-center text-gray-500">
                      <span className="text-blue-500 mr-1">&#9679;</span>
                      {ticket?.customer_id}
                    </li>
                    <li className="flex items-center text-gray-500">
                      <span className="text-blue-500 mr-1">&#9679;</span>
                      {ticket?.ticket_id}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <div className="pt-5">
              <TicketAddForm technicians={technicians} id={id} title={title} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalAssign
