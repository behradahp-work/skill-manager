//---------- Packages ----------
import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import DashboardSummary from "@/features/dashboard/components/dashboard-summary";
import EmptyState from "@/shared/components/shared/empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <title>Dashboard | Skill Manager</title>
      <PageHeading
        title="Dashboard"
        description="See how many skills you’re tracking and how you’ve rated them."
      />
      <DashboardSummary topicCount={0} skillCount={0} averageRating={null} />
      <EmptyState
        icon={FolderOpen}
        title="Your workspace is empty"
        description="Your dashboard will show a summary once you have topics and skills."
        action={
          <Button
            nativeButton={false}
            render={<Link to="/topics" />}
            className="h-11 px-4"
          >
            View topics <ArrowRight aria-hidden="true" />
          </Button>
        }
      />
    </div>
  );
}
