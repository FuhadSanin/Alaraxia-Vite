import { Card, CardContent, CardHeader } from "@components/ui/card"
import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { SelectDemo } from "@components/Demo/SelectDemo"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useToast } from "@components/ui/use-toast"

const TicketAdd = () => {
  const [active, setActive] = useState(1)
  const [customerUuid, setCustomerUuid] = useState("")
  const [locationData, setLocationData] = useState({
    address: "",
    location: "",
    landmark: "",
  })

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Add New Ticket</h1>
      </div>
      <Card>
        <CardContent className="flex flex-col justify-center items-center">
          <div className="flex mb-5 font-semibold text-md gap-36">
            <h1
              className={`relative cursor-pointer ${
                active === 1
                  ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[1.5px]  after:bg-blue-600 after:scale-x-100 after:origin-center after:transition-transform"
                  : "text-gray-500"
              }`}
            >
              Customer Details
            </h1>
            <h1
              className={`relative cursor-pointer ${
                active === 2
                  ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-[1.5px] after:bg-blue-600 after:scale-x-100 after:origin-center after:transition-transform"
                  : "text-gray-500"
              }`}
            >
              Product Details
            </h1>
          </div>
          {active === 1 ? (
            <CustomerDetails
              setActive={setActive}
              setCustomerUuid={setCustomerUuid}
              setLocationData={setLocationData}
            />
          ) : (
            <Product
              setActive={setActive}
              customerUuid={customerUuid}
              locationData={locationData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TicketAdd

const CustomerDetails = ({ setActive, setCustomerUuid, setLocationData }) => {
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

  const CustomerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    landmark: z.string().min(1, "Landmark is required"),
    house_number: z.string().min(1, "House no is required"),
    street: z.string().min(1, "Street is required"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(1, "Primary contact information is required"),
    secondary_contact_number: z.string().optional(),
    location: z.string().min(1, "Location is required"),
  })

  const form = useForm({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: "",
      house_number: "",
      street: "",
      landmark: "",
      email: "",
      phone_number: "",
      secondary_contact_number: "",
      location: "",
    },
  })

  const onSubmit = data => {
    setLocationData({
      house_number: data.house_number,
      street: data.street,
      location: data.location,
      landmark: data.landmark,
    })

    data = {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      secondary_contact_number: data.secondary_contact_number,
    }
    try {
      Services.createCustomers(authToken, data)
        .then(response => {
          toast({
            title: "Success! Customer  created successfully.",
            description: `${response.data.customer_id} Customer created successfully.`,
            variant: "success",
          })
          setActive(2)
          setCustomerUuid(response.data.uuid)
        })
        .catch(error => {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            variant: "destructive",
          })
          console.error("Error creating customer:", error)
        })
    } catch (error) {
      console.error("Error creating customer:", error)
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="house_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House no</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <SelectDemo
                label="Select Location"
                width={80}
                options={location}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Land mark</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
  )
}

const Product = ({ customerUuid, locationData }) => {
  const { authToken } = useAuth()
  const { control, watch } = useForm()
  const navigate = useNavigate()

  const [productNameList, setProductNameList] = useState([])
  const [brandNameList, setBrandNameList] = useState([])
  const [modelNumberList, setModelNumberList] = useState([])

  const productType = watch("productType")
  const productName = watch("productName")
  const brandName = watch("brandName")
  const modelNumber = watch("modelNumber")
  const { toast } = useToast()

  useEffect(() => {
    if (authToken) {
      Services.getProducts(authToken)
        .then(response => {
          const filteredProducts = response.data.results.filter(
            item => item.product_type === Number(productType)
          )
          setProductNameList(filteredProducts)
          console.log("Products fetched successfully:", filteredProducts)
        })
        .catch(error => {
          console.error("Error fetching products:", error)
        })
    }
  }, [authToken, productType])

  useEffect(() => {
    if (productNameList.length > 0) {
      const filteredBrands = productNameList.filter(
        item => item.name === productName
      )
      console.log("filteredBrands", filteredBrands)
      setBrandNameList(filteredBrands)
    }
  }, [productName, productNameList])

  useEffect(() => {
    if (brandNameList.length > 0) {
      const filteredModels = brandNameList.filter(
        item => item.brand === brandName
      )
      setModelNumberList(filteredModels)
    }
  }, [brandName, brandNameList])

  const options = {
    productTypeOptions: [{ value: "1", label: "Air Conditioner" }],
    callType: [
      { value: "1", label: "Installation" },
      { value: "2", label: "Repair" },
      { value: "3", label: "Inspection" },
    ],
    serviceType: [
      { value: "1", label: "Walk In" },
      { value: "2", label: "On Site" },
    ],
    warrantyFlag: [
      { value: "1", label: "In warranty" },
      { value: "2", label: "Out of warranty" },
      { value: "3", label: "AMC" },
    ],
    customerDemand: [
      { value: "1", label: "Critical" },
      { value: "2", label: "Urgent" },
      { value: "3", label: "Normal" },
    ],
  }

  const ProductSchema = z.object({
    productType: z.string().min().optional(),
    productName: z.string().min().optional(),
    brandName: z.string().min().optional(),
    modelNumber: z.string().min().optional(),
    dealer: z.string().min(1, "Dealer’s name is required"),
    customer_remarks: z.string().optional(),
    call_type: z.string().min(1, "Call type is required"),
    service_type: z.string().min(1, "Service type is required"),
    warranty_flag: z.string().min(1, "Warranty flag is required"),
    customer_demand: z.string().min(1, "Customer demand is required"),
    service_requested_by: z.string().optional(),
    appointment_date: z.string().optional(),
    appointment_time: z.string().optional(),
  })
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productType: "",
      productName: "",
      brandName: "",
      modelNumber: "",
      dealer: "",
      customer_remarks: "",
      call_type: "",
      service_type: "",
      warranty_flag: "",
      customer_demand: "",
      service_requested_by: "",
      appointment_date: "",
      appointment_time: "",
    },
  })
  const onSubmit = data => {
    if (modelNumberList.length === 0) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      })
      return
    }

    const product = modelNumberList.find(
      item => item.model_number === modelNumber
    )
    const productUuid = product.uuid

    const newData = {
      product: productUuid,
      customer: customerUuid,
      dealer: data.dealer,
      customer_remarks: data.customer_remarks,
      call_type: data.call_type,
      service_type: data.service_type,
      warranty_flag: data.warranty_flag,
      customer_demand: data.customer_demand,
      service_requested_by: data.service_requested_by,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      location: locationData.location,
      address: locationData.address,
      landmark: locationData.landmark,
      street: locationData.street,
      house_number: locationData.house_number,
    }
    console.log("newData", newData)

    Services.createTickets(authToken, newData)
      .then(response => {
        console.log("Ticket created successfully:", response)
        toast({
          title: "Success! Ticket created successfully.",
          description: "Ticket created successfully.",
          variant: "success",
        })
        navigate("/ticket/view/" + response.data.uuid)
      })
      .catch(error => {
        console.error("Error creating ticket:", error)
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <SelectDemo
                label="Select Product Type"
                width={80}
                options={options.productTypeOptions}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <SelectDemo
                label="Select Product Name"
                width={80}
                options={productNameList.map(item => ({
                  value: item.name,
                  label: item.name,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <SelectDemo
                label="Select Brand Name"
                width={80}
                options={brandNameList.map(item => ({
                  value: item.brand,
                  label: item.brand,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="modelNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Number</FormLabel>
              <SelectDemo
                label="Select Model Number"
                width={80}
                options={modelNumberList.map(item => ({
                  value: item.model_number,
                  label: item.model_number,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dealer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dealer’s Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Remarks</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="call_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call Type</FormLabel>
              <SelectDemo
                label="Select Call Type"
                width={80}
                options={options.callType}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <SelectDemo
                label="Select Service Type"
                width={80}
                options={options.serviceType}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warranty_flag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warranty Flag</FormLabel>
              <SelectDemo
                label="Select Warranty Flag"
                width={80}
                options={options.warrantyFlag}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_demand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Demand</FormLabel>
              <SelectDemo
                label="Select Customer Demand"
                width={80}
                options={options.customerDemand}
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service_requested_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Requested By</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointment_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointment_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="blue" className="w-[250px]" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
