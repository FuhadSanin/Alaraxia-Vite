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
  DialogFooter,
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
import { Plus } from "lucide-react"
import add from "@assets/Modals/addUser.png"
import { Input } from "@components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@components/ui/use-toast"
import { SelectDemo } from "@components/Demo/SelectDemo"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"

// Define the form schema using Zod
const FormSchema = z.object({
  name: z.string().min(1, "Customer Name is required"),
  phone_number: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  // location: z.string().min(1, "Location is required"),
  kind: z.string().min(1, "Kind is required"),
})

const TicketAddForm = () => {
  const { authToken } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      kind: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async data => {
      const response = await Services.addUser(authToken, data)
      console.log(response)
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "User Added",
        description: "User has been added",
        variant: "success",
      })
      queryClient.invalidateQueries(["users"]) // Invalidate user list query to refresh data
    },
    onError: error => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      console.log(error)
    },
  })

  const onSubmit = data => {
    console.log(data)
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <SelectDemo
                label="User Role"
                width={80}
                options={[
                  { label: "Technician", value: "1" },
                  { label: "Admin", value: "5" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" variant="blue">
          Invite
        </Button>
      </form>
    </Form>
  )
}

const ModalUserAdd = () => {
  const [customerType, setCustomerType] = useState("")

  const handleCustomerTypeChange = event => {
    setCustomerType(event.target.value)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="blue">
            Add User
            <span className="ml-2">
              <Plus strokeWidth={1.2} />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <img
            src={add}
            alt=""
            width={100}
            height={100}
            className="self-center "
          />
          <DialogHeader>
            <DialogTitle>Add New User...</DialogTitle>
            <TicketAddForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUserAdd
