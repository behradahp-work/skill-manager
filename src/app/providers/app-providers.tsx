//---------- Packages ----------
import { RouterProvider } from "react-router-dom";

//---------- Contexts ----------
import WorkspaceProvider from "@/features/topics/contexts/workspace-provider";

//---------- Routing ----------
import router from "../router";

export default function AppProviders() {
  return (
    <WorkspaceProvider>
      <RouterProvider router={router} />
    </WorkspaceProvider>
  );
}
