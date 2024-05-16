import React from "react"
import logo from "@/assets/logo.svg"

import signin from "@/assets/SigninFrame.png"
import { InputForm } from "@components/ui/form-schema"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@components/ui/card"

const SignIn = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-wrap-reverse items-center justify-center  gap-10  p-5">
        <Card className="w-[350px] md:w-[450px]  flex flex-col flex-wrap justify-center">
          <CardContent>
            <div className="flex flex-col items-center pb-5">
              <img src={logo} alt="" />
              <CardTitle className="pb-2">Sign In</CardTitle>
              <CardDescription>
                Log in to your account to continue
              </CardDescription>
            </div>
            <InputForm />
          </CardContent>
        </Card>
        <div>
          <img src={signin} width={550} height={550} alt="" />
        </div>
      </div>
    </div>
  )
}

export default SignIn
