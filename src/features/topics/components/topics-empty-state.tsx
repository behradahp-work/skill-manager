//---------- Packages ----------
import { FolderOpen } from "lucide-react";

//---------- Components ----------
import EmptyState from "@/shared/components/shared/empty-state";

export default function TopicsEmptyState() {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No topics yet"
      description="Topics group related skills. For example, a Photography topic could contain Lighting and Composition."
    />
  );
}
