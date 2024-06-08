import React from "react"
import { Card, CardContent } from "@components/ui/card"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const Tablemob = ({ values }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      {values ? (
        values.map((value, index) => (
          <Card className="bg-white p-0 " key={index}>
            <CardContent className="p-0">
              <div className="flex bg-[#0C2556] text-white p-5 rounded-t-3xl items-center justify-between">
                <h4>{value["ticked_id"]}</h4>
                <Link className="bg-white rounded-full text-gray-500 p-1">
                  <ChevronRight size={20} />
                </Link>
              </div>
              <div className="p-5">
                {Object.entries(value).map(
                  ([key, val], index) =>
                    key !== "Customer ID" && (
                      <div
                        className="flex justify-between items-center mt-2"
                        key={index}
                      >
                        <div className="text-sm text-gray-500">{key}</div>
                        <div className="text-md font-semibold">{val}</div>
                      </div>
                    )
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="w-full flex justify-center items-center ">
          <div className="text-gray-500 text-2xl">No Data Found</div>
        </div>
      )}
    </div>
  )
}

export default Tablemob
