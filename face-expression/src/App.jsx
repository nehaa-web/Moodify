import { RouterProvider } from "react-router-dom"
import { router } from "./features/app.routes"
import "../src/features/shared/global.scss"
import { AuthProvider } from "../src/features/auth/auth.context"
const App = () => {
  return (
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
  )
}

export default App
