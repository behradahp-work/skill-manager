//---------- Packages ----------
import { Layers3, Plus } from "lucide-react";

//---------- Components ----------
import ConfirmDeleteDialog from "@/shared/components/shared/confirm-delete-dialog";
import EmptyState from "@/shared/components/shared/empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";
import EntryEditorDialog from "./entry-editor-dialog";
import RatingDistribution from "./rating-distribution";
import SkillCard from "./skill-card";

//---------- Hooks ----------
import { useTopicActions } from "../hooks/use-topic-actions";

//---------- Types ----------
import type { Topic } from "../types/workspace";

export default function TopicWorkspace({ topic, onDeleted }: { topic: Topic; onDeleted: () => void }) {
  const actions = useTopicActions();
  const skillCount = topic.skills.length;

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeading title={topic.name} description={`${skillCount} ${skillCount === 1 ? "skill" : "skills"} in this topic`} />
        <div className="flex flex-wrap gap-2">
          <EntryEditorDialog
            kind="topic"
            initialName={topic.name}
            onSave={(name) => actions.renameTopic(topic.id, name)}
            trigger={<Button variant="outline" className="h-11 px-4">Rename topic</Button>}
          />
          <ConfirmDeleteDialog
            title="Delete topic?"
            description={skillCount
              ? `“${topic.name}” and its ${skillCount} ${skillCount === 1 ? "skill" : "skills"} will be permanently deleted.`
              : `“${topic.name}” will be permanently deleted.`}
            onDelete={() => {
              actions.deleteTopic(topic.id);
              onDeleted();
            }}
            trigger={<Button variant="destructive" className="h-11 px-4">Delete topic</Button>}
          />
        </div>
      </div>
      <section aria-labelledby="topic-skills-heading" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="topic-skills-heading" className="text-xl font-semibold tracking-tight">Skills</h2>
          <EntryEditorDialog
            kind="skill"
            onSave={(name, rating) => actions.createSkill(topic.id, name, rating)}
            trigger={
              <Button className="h-11 px-4"><Plus aria-hidden="true" /> Add skill</Button>
            }
          />
        </div>
        {skillCount === 0 ? (
          <EmptyState icon={Layers3} title="No skills yet" description="Add a skill to track how you’d rate it today." />
        ) : (
          <ul className="grid gap-3">
            {topic.skills.map((skill) => (
              <li key={skill.id}>
                <SkillCard
                  skill={skill}
                  onEdit={(name, rating) => actions.editSkill(topic.id, skill.id, name, rating)}
                  onDelete={() => actions.deleteSkill(topic.id, skill.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      {skillCount > 0 && <RatingDistribution skills={topic.skills} />}
    </div>
  );
}
