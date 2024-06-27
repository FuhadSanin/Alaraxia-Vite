import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

export const Smallcards = () => {
  return (
    <Card className="p-2 pr-6 h-fit">
      <CardHeader className="pb-1 pt-2">
        <CardTitle className="text-xl pb-1">170</CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-1">
        <CardDescription>This Week</CardDescription>
      </CardContent>
    </Card>
  )
}
