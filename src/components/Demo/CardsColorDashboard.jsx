import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"

import { ArrowBigUp } from "lucide-react"
import { useMediaQuery } from "react-responsive"

export const Smallcolorcards = ({ cardcolor, title, value }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <Card
      className={`p-2 pr-3 pb-0 h-fit bg-cover bg-center ${
        isMobile ? "w-full" : ""
      }`}
      style={{
        backgroundImage: `url(${cardcolor})`,
      }}
    >
      <CardHeader className="pb-0 pt-1">
        <CardDescription className="text-white">Total {title}</CardDescription>
      </CardHeader>
      <CardContent className="mt-3 pb-0 flex">
        <CardTitle className="font-extrabold text-white mr-2">
          {value || 0}
        </CardTitle>
        <ArrowBigUp strokeWidth={1} className="text-white" />
      </CardContent>
    </Card>
  )
}
