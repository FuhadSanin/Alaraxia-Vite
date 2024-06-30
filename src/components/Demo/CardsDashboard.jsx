import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

export const Smallcards = ({ title, value }) => {
  return (
    <Card className="p-2 pr-6 h-fit">
      <CardHeader className="pb-1 pt-2">
        <CardTitle className="text-xl pb-1">{value}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-1">
        <CardDescription>{title}</CardDescription>
      </CardContent>
    </Card>
  )
}
