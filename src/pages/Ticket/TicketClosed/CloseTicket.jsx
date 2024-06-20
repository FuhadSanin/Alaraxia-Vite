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
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import add from "@/assets/Modals/end.png"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"
import { SelectDemo } from "@components/Demo/SelectDemo"
import { PendingReason } from "@/constants/constants"

// Define the form schema using Zod
const FormSchema = z.object({
  pending_reason: z.string().min(1, "Pending Reason is required"),
})

const TicketAddForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { authToken } = useAuth()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      happy_code: "",
    },
  })
  const fetchData = async (id, name) => {
    if (authToken) {
      try {
        const response = await Services.getCustomersByCustomerIdAndName(
          authToken,
          id,
          name
        )
        if (response.data.count === 1) {
          navigate(`/ticket/add`)
        } else {
          toast({
            title: "Customer not found",
            description: "Please check the customer ID and name",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching tickets:", error)
      }
    }
  }

  const onSubmit = data => {
    try {
      fetchData(data.id, data.name)
    } catch (error) {
      console.error("Error fetching tickets:", error)
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
          name="pending_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Happy Code</FormLabel>
              <Input {...field} />
            </FormItem>
          )}
        />
        <Button type="submit" variant="blue">
          Close Ticket
        </Button>
      </form>
    </Form>
  )
}

const CloseTicket = () => {
  const [ticketType, setTicketType] = useState("with")

  const handleTicketTypeChange = event => {
    setTicketType(event.target.value)
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="blue">Close Ticket</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <img
            src={add}
            alt=""
            width={80}
            height={80}
            className="self-center "
          />
          <DialogHeader>
            <DialogTitle className="mb-5">Confirm Ticket Closure</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-lg">
            Are you sure you want to close this ticket?
          </DialogDescription>
          <div className="flex flex-col items-start  pt-2 pb-5">
            <div className="space-x-2">
              <input
                type="radio"
                defaultValue={ticketType}
                id="with-happycode"
                name="close-type"
                value="with"
                checked={ticketType === "with"}
                onChange={handleTicketTypeChange}
              />
              <label
                htmlFor="new-customer"
                className="text-md text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                With Happy Code
              </label>
            </div>
            <div className="space-x-2 mt-2">
              <input
                type="radio"
                id="without-happycode"
                name="close-type"
                value="without"
                checked={ticketType === "without"}
                onChange={handleTicketTypeChange}
              />
              <label
                htmlFor="existing-customer"
                className="text-md text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Without Happy Code
              </label>
            </div>
          </div>
          {ticketType === "with" ? (
            <TicketAddForm />
          ) : (
            <Button className="w-full" type="submit" variant="blue">
              Close Ticket
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CloseTicket
