import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import Layout from "./layouts/layout.jsx"
import { ThemeProvider } from "@/components/ui/theme-provider.jsx"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext" // Adjust the import path as needed
import { Toaster } from "@components/ui/toaster.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Layout>
            <App />
            <Toaster />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
