import React from "react"
import logo from "@assets/logo.svg"

import signin from "@assets/SigninFrame.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@components/ui/card"

import { SignIn } from "./SignIn.jsx"
import { ResetPassword } from "./ResetPassword.jsx"
import { NewPassword } from "./NewPassword.jsx"
import { Button } from "@components/ui/button"
import { Link } from "react-router-dom"

const UIAuth = ({ title, desc }) => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex flex-wrap-reverse items-center justify-center  gap-10  p-5">
        <Card className="w-[350px] md:w-[450px]  flex flex-col flex-wrap justify-center">
          <CardContent>
            <div className="flex flex-col items-center pb-5">
              <img src={logo} alt="" />
              <CardTitle className="pb-2">{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </div>
            {title === "Sign In" ? (
              <SignIn />
            ) : title === "Reset Password" ? (
              <ResetPassword />
            ) : title === "New Password" ? (
              <NewPassword />
            ) : (
              title === "Email Sent" && (
                <Link to="/login">
                  <Button variant="blue">Back to Login</Button>
                </Link>
              )
            )}
          </CardContent>
        </Card>
        <div>
          <img src={signin} width={550} height={550} alt="" />
        </div>
      </div>
    </div>
  )
}

export default UIAuth
