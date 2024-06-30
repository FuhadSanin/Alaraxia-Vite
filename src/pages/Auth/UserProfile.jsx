import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@context/AuthContext"
import { useToast } from "@components/ui/use-toast"
import { Card, CardContent, CardTitle } from "@components/ui/card"
import Services from "@services/services"
import { useMutation } from "@tanstack/react-query"

const UserNameFormSchema = z.object({
  name: z.string().min(2),
  phone_number: z.string().min(10),
})

function UserNameDetails() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { authToken, setUserProfile } = useAuth()
  const form = useForm({
    resolver: zodResolver(UserNameFormSchema),
    defaultValues: {
      name: "",
      phone_number: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async data => {
      const response = await Services.updateProfile(
        authToken,
        authToken.user_id,
        data
      )
      return response.data
    },
    onSuccess: data => {
      toast({
        title: "Success",
        description: "Profile Updated Successfully",
        variant: "success",
      })
      setUserProfile({
        ...data,
        name: data.name,
        phone_number: data.phone_number,
      })
      navigate("/")
    },
    onError: error => {
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
      })
    },
  })

  const onSubmit = data => {
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
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit" variant="blue">
          Update Profile
        </Button>
      </form>
    </Form>
  )
}
const PasswordFormSchema = z.object({
  old_password: z.string().min(1),
  new_password: z.string().min(1),
  confirm_password: z.string().min(1),
})

function PasswordDetails() {
  const { authToken } = useAuth()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async data => {
      const response = await Services.changePassword(authToken, data)
      console.log(response)
      return response.data
    },
    onSuccess: data => {
      toast({
        title: "Success",
        description: "Profile Updated Successfully",
        variant: "success",
      })
      form.reset()
      navigate("/")
    },
    onError: error => {
      toast({
        title: "Error",
        description:
          error.response.data.new_password || error.response.data.old_password,
        variant: "destructive",
      })
    },
  })

  const onSubmit = data => {
    if (data.new_password !== data.confirm_password) {
      toast({
        title: "Try Again",
        description: "New Password and Confirm Password does not match",
        variant: "destructive",
      })
      return
    }
    data = {
      old_password: data.old_password,
      new_password: data.new_password,
    }
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
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit" variant="blue">
          Update Profile
        </Button>
      </form>
    </Form>
  )
}

const UserProfile = () => {
  const { userProfile } = useAuth()
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-5 mb-5">
        <Card className="w-full md:w-1/2">
          <CardContent>
            <div className=" flex p-3 items-center">
              <img
                src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${userProfile.name}`}
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div
                className={`
              flex 
              overflow-hidden transition-all w-52 ml-3`}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">
                    {userProfile.name || "User Name"}
                  </h4>
                  <span className="text-xs text-gray-600">
                    {userProfile.kind === 5 ? "Administrator" : "Technician"}
                  </span>
                </div>
              </div>
            </div>
            <hr className="mb-5" />
            <UserNameDetails />
          </CardContent>
        </Card>
        <Card className="w-full md:w-1/2">
          <CardTitle>Change Password</CardTitle>
          <CardContent>
            <hr className="mb-5" />
            <PasswordDetails />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserProfile
