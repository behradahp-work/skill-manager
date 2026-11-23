//---------- Components ----------
import TopicsEmptyState from "@/features/topics/components/topics-empty-state";
import PageHeading from "@/shared/components/shared/page-heading";

export default function TopicsPage() {
  return (
    <div className="space-y-7">
      <title>Topics | Skill Manager</title>
      <PageHeading
        title="Topics"
        description="Organize your skills into the areas you want to develop."
      />
      <TopicsEmptyState />
    </div>
  );
}
