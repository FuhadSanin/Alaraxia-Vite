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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import add from "@/assets/Modals/addPeople.png"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"

// Define the form schema using Zod
const FormSchema = z.object({
  id: z.string().min(1, "Customer ID is required"),
  name: z.string().min(1, "Customer Name is required"),
})

const TicketAddForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { authToken } = useAuth()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
      name: "",
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
          toast({
            title: "Customer found",
            description: "Customer has been found successfully",
            variant: "success",
          })
          navigate(`/ticket/add/${id}/${name}`)
        } else {
          toast({
            title: "Customer not found",
            description: "Please check the customer ID and Name",
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
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-right text-blue-500 cursor-pointer"></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="blue">
          Continue
        </Button>
      </form>
    </Form>
  )
}

const ModalAddDemo = () => {
  const [customerType, setCustomerType] = useState("new")

  const handleCustomerTypeChange = event => {
    setCustomerType(event.target.value)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="blue">
            Add a new Ticket{" "}
            <span className="ml-2">
              <Plus strokeWidth={1.2} />
            </span>
          </Button>
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
            <DialogTitle className="mb-5">Is the customer...</DialogTitle>
            <p className="text-left">Customer type</p>
            <div className="flex items-center space-x-2 pt-2 pb-5">
              <input
                defaultValue={customerType}
                type="radio"
                id="new-customer"
                name="customer-type"
                value="new"
                checked={customerType === "new"}
                onChange={handleCustomerTypeChange}
              />
              <label
                htmlFor="new-customer"
                className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                New Customer
              </label>
              <input
                type="radio"
                id="existing-customer"
                name="customer-type"
                value="existing"
                checked={customerType === "existing"}
                onChange={handleCustomerTypeChange}
                className="ml-2"
              />
              <label
                htmlFor="existing-customer"
                className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Existing Customer
              </label>
            </div>
            {customerType === "existing" ? (
              <div>
                <TicketAddForm />
              </div>
            ) : (
              customerType === "new" && (
                <Link to="/ticket/add">
                  <Button variant="blue" className="w-full">
                    Continue
                  </Button>
                </Link>
              )
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalAddDemo
