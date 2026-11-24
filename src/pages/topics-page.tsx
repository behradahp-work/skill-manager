//---------- Packages ----------
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

//---------- Components ----------
import EntryEditorDialog from "@/features/topics/components/entry-editor-dialog";
import TopicList from "@/features/topics/components/topic-list";
import TopicsEmptyState from "@/features/topics/components/topics-empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";
import Reveal from "@/shared/components/shared/reveal";

//---------- Hooks ----------
import { useTopicActions } from "@/features/topics/hooks/use-topic-actions";
import { useWorkspace } from "@/features/topics/hooks/use-workspace";

export default function TopicsPage() {
  const { workspace } = useWorkspace();
  const { createTopic } = useTopicActions();
  const navigate = useNavigate();
  const topics = workspace?.topics ?? [];

  return (
    <div className="space-y-7">
      <title>Topics | Skill Manager</title>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Reveal delay={0}>
          <PageHeading
            title="Topics"
            description="Organize your skills into the areas you want to develop."
          />
        </Reveal>

        <Reveal delay={100}>
          <EntryEditorDialog
            kind="topic"
            onSave={(name) => {
              const topicId = createTopic(name);
              void navigate(`/topics/${topicId}`);
            }}
            trigger={
              <Button className="h-11 px-4">
                <Plus aria-hidden="true" /> Add topic
              </Button>
            }
          />
        </Reveal>
      </div>

      <Reveal delay={200}>
        {topics.length ? <TopicList topics={topics} /> : <TopicsEmptyState />}
      </Reveal>
    </div>
  );
}
