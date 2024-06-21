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
import { Link, useNavigate } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"
import { SelectDemo } from "@components/Demo/SelectDemo"
import { PendingReason } from "@constants/constants"
import { useParams } from "react-router-dom"

// Define the form schema using Zod
const FormSchema = z.object({
  pending_reason: z.string().min(1, "Pending Reason is required"),
})

const TicketAddForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { authToken } = useAuth()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pending_reason: "",
    },
  })

  const onSubmit = data => {
    if (authToken) {
      Services.markAsPending(authToken, id, data)
        .then(response => {
          toast({
            title: "Ticket marked as pending",
            description: "Ticket has been marked as pending successfully",
          })
          navigate("/ticket/closed")
        })
        .catch(error => {
          toast({
            title: "Error",
            description: error.response.data.detail,
          })
        })
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
              <FormLabel>Pending Reason</FormLabel>
              <SelectDemo
                label="Select Pending Reason"
                width={80}
                options={PendingReason}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <Button type="submit" variant="blue">
          Mark As Pending
        </Button>
      </form>
    </Form>
  )
}

const MarkAsPending = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="secondary">Mark As Pending</Button>
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
            <DialogTitle className="mb-5">Mark As Pending</DialogTitle>
            <DialogDescription>
              Please ensure that you select a reason before marking this ticket
              as pending.
            </DialogDescription>
          </DialogHeader>
          <TicketAddForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MarkAsPending
