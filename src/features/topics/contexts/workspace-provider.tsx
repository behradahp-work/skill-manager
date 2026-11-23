//---------- React ----------
import { useEffect, useState, type ReactNode } from "react";

//---------- Constants ----------
import { LOCAL_STORAGE_KEYS } from "@/shared/constants/local-storage-keys";

//---------- Contexts ----------
import { WorkspaceContext, type WorkspaceContextValue } from "./workspace-context";

//---------- Utilities ----------
import { readWorkspace, writeWorkspace } from "../lib/workspace-storage";

function loadWorkspace() {
  try {
    return readWorkspace();
  } catch {
    return null;
  }
}

export default function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState(loadWorkspace);

  function reload() {
    setWorkspace(loadWorkspace());
  }

  useEffect(() => {
    function syncWorkspace(event: StorageEvent) {
      if (event.key === LOCAL_STORAGE_KEYS.WORKSPACE || event.key === null) {
        setWorkspace(loadWorkspace());
      }
    }

    window.addEventListener("storage", syncWorkspace);
    return () => window.removeEventListener("storage", syncWorkspace);
  }, []);

  const commit: WorkspaceContextValue["commit"] = (change) => {
    const next = change(readWorkspace());
    writeWorkspace(next);
    setWorkspace(next);
  };

  return (
    <WorkspaceContext.Provider value={{ workspace, commit, reload }}>
      {children}
    </WorkspaceContext.Provider>
  );
}
