//---------- Packages ----------
import { RouterProvider } from "react-router-dom";

//---------- Routing ----------
import router from "../router";

export default function AppProviders() {
  return <RouterProvider router={router} />;
}
