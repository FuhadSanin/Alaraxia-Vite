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
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { SelectDemo } from "@/components/Demo/SelectDemo"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import close from "@/assets/Modals/close.png"
import { CancellationReason } from "@/constants/constants"
// Define the form schema using Zod
const FormSchema = z.object({
  cancellation_reason: z.string().min(1, "Cancel Reason is required"),
})

const TicketAddForm = ({ id }) => {
  const { authToken } = useAuth()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cancellation_reason: "",
    },
  })

  const onSubmit = data => {
    console.log(data.cancellation_reason)
    try {
      Services.cancelTickets(authToken, id, data)
        .then(response => {
          console.log(response)
          toast({
            title: "Ticket Cancelled",
            description: "Ticket has been cancelled",
            variant: "success",
          })
        })
        .catch(error => {
          console.log(error)
          toast({
            title: "Error",
            description: "Error cancelling ticket",
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
          name="cancellation_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cancel Reason</FormLabel>
              <SelectDemo
                label="Select Cancel Reason"
                width={80}
                options={CancellationReason}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-5">
          <Button className="w-full" type="submit" variant="blue">
            Cancel Ticket
          </Button>
        </div>
      </form>
    </Form>
  )
}
const ModalCancel = () => {
  const { id } = useParams()
  const { authToken } = useAuth()
  const [ticket, setTicket] = useState(null)

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

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive" className="h-8">
            Cancel
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <img
            src={close}
            alt=""
            width={80}
            height={80}
            className="self-center "
          />
          <DialogHeader>
            <DialogTitle className="mb-3">Cancel Ticket</DialogTitle>
            <div className="pt-5">
              <TicketAddForm id={id} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalCancel
