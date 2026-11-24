//---------- Packages ----------
import { ArrowLeft, FolderX } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

//---------- Components ----------
import TopicWorkspace from "@/features/topics/components/topic-workspace";
import EmptyState from "@/shared/components/shared/empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";

//---------- Hooks ----------
import { useWorkspace } from "@/features/topics/hooks/use-workspace";

export default function TopicDetailPage() {
  const { topicId } = useParams<"topicId">();
  const { workspace } = useWorkspace();
  const navigate = useNavigate();
  const topic = workspace?.topics.find(({ id }) => id === topicId);

  if (topic) {
    return (
      <div className="space-y-5">
        <title>{`${topic.name} | Skill Manager`}</title>
        <Link
          to="/topics"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All topics
        </Link>
        <TopicWorkspace
          key={topic.id}
          topic={topic}
          onDeleted={() => {
            void navigate("/topics", { replace: true });
          }}
        />
      </div>
    );
  }

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
