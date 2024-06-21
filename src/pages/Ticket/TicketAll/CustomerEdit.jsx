import React from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form"
import { useState, useEffect } from "react"
import { useAuth } from "@context/AuthContext"
import { Input } from "@components/ui/input"
import Services from "@services/services"
import { useToast } from "@components/ui/use-toast"
import { useNavigate } from "react-router-dom"

const CustomerEdit = () => {
  const { customerId, ticketId } = useParams()
  const navigate = useNavigate()
  const { authToken } = useAuth()
  const [location, setLocation] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    Services.getLocations(authToken)
      .then(response => {
        const transformedData = response.data.results.map(item => ({
          value: item.uuid,
          label: item.name,
        }))
        setLocation(transformedData)
        console.log("Location fetched successfully:", transformedData)
      })
      .catch(error => {
        console.error("Error fetching location:", error)
      })
  }, [authToken])

  useEffect(() => {
    Services.getCustomersById(authToken, customerId)
      .then(response => {
        form.setValue("name", response.data.name)
        form.setValue("address", response.data.address)
        form.setValue("landmark", response.data.landmark)
        form.setValue("state", response.data.state)
        form.setValue("email", response.data.email)
        form.setValue("phone_number", response.data.phone_number)
        form.setValue(
          "secondary_contact_number",
          response.data.secondary_contact_number
        )
        form.setValue("location", response.data.location)
      })
      .catch(error => {
        console.error("Error fetching customer:", error)
      })
  }, [authToken, customerId])

  const CustomerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(1, "Primary contact information is required"),
    secondary_contact_number: z.string().optional(),
  })

  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      secondary_contact_number: "",
    },
  })

  const onSubmit = data => {
    Services.editCustomers(authToken, customerId, data)
      .then(response => {
        console.log("Customer edited successfully:", response)
        toast({
          title: "Customer edited successfully",
          variant: "success",
        })
        navigate(`/ticket/view/${ticketId}`)
      })
      .catch(error => {
        console.error("Error editing customer:", error)
        toast({
          title: "Error editing customer",
          variant: "destructive",
        })
      })
  }

  return (
    <Card>
      <CardContent className="flex flex-col justify-center items-center">
        <div className="flex mb-5 font-semibold text-md gap-36">
          <h1 className="relative cursor-pointer text-blue-600 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[1.5px]  after:bg-blue-600 after:scale-x-100 after:origin-center after:transition-transform">
            Customer Edit
          </h1>
        </div>
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
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information 1</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondary_contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information 2</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant="blue" className="w-[250px]" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CustomerEdit
