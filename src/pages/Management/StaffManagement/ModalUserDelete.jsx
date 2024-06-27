import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@components/ui/dialog"

import { Button } from "@components/ui/button"
import { Archive, Plus } from "lucide-react"
import add from "@assets/Modals/deleteUser.png"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useToast } from "@components/ui/use-toast"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { DialogDescription } from "@components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const ModalUserDelete = ({ id }) => {
  const { authToken } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await Services.deleteUser(authToken, id)
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
        variant: "success",
      })
      queryClient.invalidateQueries(["users"]) // Invalidate user list query to refresh data
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error deleting user",
        variant: "destructive",
      })
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Archive size={20} />
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <img
            src={add}
            alt=""
            width={70}
            height={70}
            className="self-center "
          />
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure about deleting this user?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogPrimitive.Close>
              <Button variant="secondary">Cancel</Button>
            </DialogPrimitive.Close>
            <Button variant="blue" onClick={handleDelete}>
              Yes, Sure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUserDelete
