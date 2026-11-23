//---------- React ----------
import { createContext } from "react";

//---------- Types ----------
import type { Workspace } from "../types/workspace";

export interface WorkspaceContextValue {
  workspace: Workspace | null;
  reload: () => void;
  commit: (change: (current: Workspace) => Workspace) => void;
}

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
