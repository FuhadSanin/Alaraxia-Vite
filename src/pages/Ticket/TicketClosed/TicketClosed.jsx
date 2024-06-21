// Dashboard.js
import React from "react"

import { Card, CardContent } from "@components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import WithHappyCode from "@pages/Ticket/TicketClosed/WithHappyCode"
import Pending from "@pages/Ticket/TicketClosed/Pending"
import WithoutHappyCode from "@pages/Ticket/TicketClosed/WithoutHappyCode"

const TicketClosed = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">Closed Tickets</h1>
      </div>
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="Closed with happy code">
            <TabsList>
              <TabsTrigger value="Closed with happy code">
                Closed with happy code
              </TabsTrigger>
              <TabsTrigger value="Pending without happy code">
                Pending without happy code
              </TabsTrigger>
              <TabsTrigger value="Closed without happy code">
                Closed without happy code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Closed with happy code">
              <WithHappyCode />
            </TabsContent>
            <TabsContent value="Pending without happy code">
              <Pending />
            </TabsContent>
            <TabsContent value="Closed without happy code">
              <WithoutHappyCode />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default TicketClosed
