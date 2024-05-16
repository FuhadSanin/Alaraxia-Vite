import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const Smallcards = () => {
  return (
    <Card className="p-2 pr-6 h-fit">
      <CardHeader className="pb-1 pt-2">
        <CardTitle className="text-xl pb-1">170</CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-1">
        <CardDescription>This Week</CardDescription>
      </CardContent>
      <CardFooter className="pt-1 pb-2">
        <Progress value={50} aria-label="25% increase " />
      </CardFooter>
    </Card>
  )
}
