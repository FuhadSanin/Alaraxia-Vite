import React from "react"
import { useQuery } from "@tanstack/react-query"
import Services from "@services/services"
import { useAuth } from "@context/AuthContext"
import { Card, CardContent, CardTitle } from "@components/ui/card"
import { format, parseISO } from "date-fns"

const Notification = () => {
  const { authToken } = useAuth()

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await Services.getNotifications(authToken)
      return response.data.results // Ensure response.data.results is an array
    },
  })

  const notifications = data || [] // Ensure notifications is always an array

  console.log(notifications)

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      </div>
      <Card>
        <CardTitle>Today </CardTitle>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Something went wrong</div>
          ) : notifications.length === 0 ? (
            <div>No notifications</div>
          ) : (
            <div>
              {notifications.map(notification => (
                <div key={notification.uuid} className="flex justify-between">
                  <p>{notification.email_body}</p>
                  <p>
                    {format(
                      parseISO(notification.created_at?.slice(0, 10)),
                      "dd MMMM, yyyy"
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Notification
