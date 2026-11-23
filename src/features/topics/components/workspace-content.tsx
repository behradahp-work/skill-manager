//---------- React ----------
import type { ReactNode } from "react";

//---------- Packages ----------
import { HardDrive } from "lucide-react";

//---------- Components ----------
import EmptyState from "@/shared/components/shared/empty-state";
import { Button } from "@/shared/components/ui/button";

//---------- Hooks ----------
import { useWorkspace } from "../hooks/use-workspace";

export default function WorkspaceContent({ children }: { children: ReactNode }) {
  const { workspace, reload } = useWorkspace();

  if (workspace) return children;

  return (
    <>
      <title>Workspace unavailable | Skill Manager</title>
      <h1 className="sr-only">Workspace unavailable</h1>
      <EmptyState
        icon={HardDrive}
        title="Couldn’t load the workspace"
        description="The browser couldn’t read your saved data. Check that browser storage is available and try again."
        action={<Button onClick={reload} className="h-11 px-4">Try again</Button>}
      />
    </>
  );
}
