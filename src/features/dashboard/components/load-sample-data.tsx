//---------- React ----------
import { useState } from "react";

//---------- Components ----------
import { Button } from "@/shared/components/ui/button";

//---------- Constants ----------
import { SAMPLE_TOPICS } from "@/features/topics/constants/sample-workspace";

//---------- Hooks ----------
import { useWorkspace } from "@/features/topics/hooks/use-workspace";

export default function LoadSampleData() {
  const { commit } = useWorkspace();
  const [failed, setFailed] = useState(false);

  function loadSamples() {
    try {
      commit((workspace) => workspace.topics.length
        ? workspace
        : { ...workspace, topics: SAMPLE_TOPICS });
    } catch {
      setFailed(true);
    }
  }

  return (
    <div>
      <Button variant="outline" className="h-11 px-4" onClick={loadSamples}>Load sample data</Button>
      {failed && <p role="alert" className="mt-2 text-sm text-destructive">Couldn’t save the sample data.</p>}
    </div>
  );
}
