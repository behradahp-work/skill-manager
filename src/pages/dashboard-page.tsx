//---------- Packages ----------
import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import DashboardSummary from "@/features/dashboard/components/dashboard-summary";
import EmptyState from "@/shared/components/shared/empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";

//---------- Hooks ----------
import { useWorkspace } from "@/features/topics/hooks/use-workspace";

export default function DashboardPage() {
  const { workspace } = useWorkspace();
  const topics = workspace?.topics ?? [];
  const skills = topics.flatMap((topic) => topic.skills);
  const averageRating = skills.length
    ? skills.reduce((total, skill) => total + skill.rating, 0) / skills.length
    : null;

  return (
    <div className="space-y-7">
      <title>Dashboard | Skill Manager</title>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeading
          title="Dashboard"
          description="See how many skills you’re tracking and how you’ve rated them."
        />
        {topics.length > 0 && (
          <Button nativeButton={false} render={<Link to="/topics" />} className="h-11 px-4">
            View topics <ArrowRight aria-hidden="true" />
          </Button>
        )}
      </div>
      <DashboardSummary topicCount={topics.length} skillCount={skills.length} averageRating={averageRating} />
      {topics.length === 0 && <EmptyState
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
      />}
    </div>
  );
}
