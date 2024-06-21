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
  DialogDescription,
} from "@components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Button } from "@components/ui/button"
import add from "@assets/Modals/end.png"
import { Input } from "@components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"
import { useParams } from "react-router-dom"

// Define the form schema using Zod
const FormSchema = z.object({
  happy_code: z.string().min(1),
})

const TicketAddForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { authToken } = useAuth()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      happy_code: "",
    },
  })
  const fetchData = async happy_code => {
    try {
      const data = {
        with_happy_code: true,
        happy_code: happy_code,
      }
      Services.closeTicketsByTechnician(authToken, id, data)
        .then(response => {
          toast({
            title: "Ticket Closed",
            description: "The ticket has been closed",
            variant: "success",
          })
          navigate("/ticket/closed")
        })
        .catch(error => {
          toast({
            title: "Incorrect Happy Code",
            description: "Please enter the correct Happy Code",
            variant: "destructive",
          })
        })
    } catch (error) {
      console.error("Error closing ticket:", error)
    }
  }

  const onSubmit = data => {
    try {
      fetchData(data.happy_code)
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

const CloseTicket = ({ formData }) => {
  const { authToken } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { id } = useParams()
  const [ticketType, setTicketType] = useState("with")

  const handleTicketTypeChange = event => {
    setTicketType(event.target.value)
  }

  const handleClose = () => {
    if (ticketType === "without") {
      try {
        const data = {
          with_happy_code: false,
        }
        Services.closeTicketsByTechnician(authToken, id, data)
          .then(response => {
            toast({
              title: "Ticket Closed",
              description: "The ticket has been closed",
              variant: "success",
            })
            navigate("/ticket/closed")
          })
          .catch(error => {
            console.error("Error closing ticket:", error)
          })
      } catch (error) {
        console.error("Error closing ticket:", error)
      }
    }
    if (formData) {
      try {
        Services.visits(authToken, id, formData)
          .then(response => {
            toast({
              title: "Ticket Closed",
              description: "The ticket has been closed",
              variant: "success",
            })
            navigate("/ticket/closed")
          })
          .catch(error => {
            console.error("Error closing ticket:", error)
          })
      } catch (error) {
        console.error("Error closing ticket:", error)
      }
    }
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
            <Button
              className="w-full"
              type="submit"
              variant="blue"
              onClick={handleClose}
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
