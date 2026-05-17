import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { Toaster} from "sonner"

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
