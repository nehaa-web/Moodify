import { RouterProvider } from "react-router-dom"
import { router } from "./features/app.routes"
import "../src/features/shared/global.scss"
import { AuthProvider } from "../src/features/auth/auth.context"
import { SongContextProvider } from "./features/home/song.context"
const App = () => {
  return (
<AuthProvider>
  <SongContextProvider>
  <RouterProvider router={router} />
  </SongContextProvider>
</AuthProvider>
  )
}

export default App
