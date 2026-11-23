//---------- Packages ----------
import { FolderX } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import EmptyState from "@/shared/components/shared/empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";

export default function TopicDetailPage() {
  return (
    <div className="space-y-7">
      <title>Topic | Skill Manager</title>
      <PageHeading
        title="Topic details"
        description="View the skills and ratings for a topic."
      />
      <EmptyState
        icon={FolderX}
        title="Topic not found"
        description="Return to Topics to see your workspace."
        action={
          <Button
            nativeButton={false}
            render={<Link to="/topics" />}
            className="h-11 px-4"
          >
            Back to topics
          </Button>
        }
      />
    </div>
  );
}
