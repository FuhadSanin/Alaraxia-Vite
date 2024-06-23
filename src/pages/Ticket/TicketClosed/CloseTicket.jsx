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
} from "@components/ui/dialog"
import { Form, FormField, FormItem, FormLabel } from "@components/ui/form"
import { Button } from "@components/ui/button"
import add from "@assets/Modals/end.png"
import { Input } from "@components/ui/input"
import { Link, useNavigate, useParams } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"

// Define the form schema using Zod
const FormSchema = z.object({
  happy_code: z.string().min(1),
})

const TicketAddForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      happy_code: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="happy_code"
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

const CloseTicket = ({ id: propId }) => {
  const { id: routeId } = useParams()
  const { authToken } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [ticketType, setTicketType] = useState("with")
  const id = propId || routeId

  const { userProfile } = useAuth()
  const user = userProfile?.kind === 5 ? "close" : "close_by_technician"

  const handleTicketTypeChange = event => {
    setTicketType(event.target.value)
  }

  const closeTicket = async data => {
    try {
      await Services.closeTickets(authToken, id, data, user)
      toast({
        title: "Ticket Closed",
        description: "The ticket has been closed",
        variant: "success",
      })
      navigate("/ticket/view/" + id)
    } catch (error) {
      toast({
        title: "Error Closing Ticket",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  const handleCloseWithoutCode = () => {
    closeTicket({ with_happy_code: false })
  }

  const handleCloseWithCode = data => {
    closeTicket({ with_happy_code: true, happy_code: data.happy_code })
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
            className="self-center"
          />
          <DialogHeader>
            <DialogTitle className="mb-5">Confirm Ticket Closure</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-lg">
            Are you sure you want to close this ticket?
          </DialogDescription>
          <div className="flex flex-col items-start pt-2 pb-5">
            <div className="space-x-2">
              <input
                type="radio"
                id="with-happycode"
                name="close-type"
                value="with"
                checked={ticketType === "with"}
                onChange={handleTicketTypeChange}
              />
              <label
                htmlFor="with-happycode"
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
                htmlFor="without-happycode"
                className="text-md text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Without Happy Code
              </label>
            </div>
          </div>
          {ticketType === "with" ? (
            <TicketAddForm onSubmit={handleCloseWithCode} />
          ) : (
            <Button
              className="w-full"
              variant="blue"
              onClick={handleCloseWithoutCode}
            >
              Close Ticket
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CloseTicket
