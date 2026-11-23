//---------- React ----------
import { useContext } from "react";

//---------- Contexts ----------
import { WorkspaceContext } from "../contexts/workspace-context";

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace requires WorkspaceProvider.");
  return context;
}
