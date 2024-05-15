import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import Layout from "./layouts/layout.jsx"
import { ThemeProvider } from "@/components/ui/theme-provider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <App />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
)
