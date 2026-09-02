import { RouterProvider } from "react-router-dom"
import { router } from "./features/app.routes"
import "../src/features/shared/global.scss"
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
