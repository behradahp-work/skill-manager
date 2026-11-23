//---------- Packages ----------
import { Star } from "lucide-react";

//---------- Components ----------
import ConfirmDeleteDialog from "@/shared/components/shared/confirm-delete-dialog";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import EntryEditorDialog from "./entry-editor-dialog";

//---------- Constants ----------
import { SKILL_RATINGS } from "../constants/workspace";

//---------- Types ----------
import type { Skill, SkillRating } from "../types/workspace";

//---------- Utilities ----------
import { cn } from "@/shared/lib/utils";

interface SkillCardProps {
  skill: Skill;
  onEdit: (name: string, rating: SkillRating) => void;
  onDelete: () => void;
}

export default function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  return (
    <Card className="gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0">
        <h3 className="wrap-anywhere font-semibold">{skill.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex gap-0.5" aria-hidden="true">
            {SKILL_RATINGS.map((star) => (
              <Star
                key={star}
                className={cn("size-4", star <= skill.rating ? "fill-primary text-primary" : "text-muted-foreground")}
              />
            ))}
          </span>
          <span className="text-xs text-muted-foreground">
            <span className="sr-only">Rating: </span>{skill.rating}/5
            <span className="sr-only"> stars</span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:shrink-0">
        <EntryEditorDialog
          kind="skill"
          initialName={skill.name}
          initialRating={skill.rating}
          onSave={onEdit}
          trigger={<Button variant="outline" className="h-11 px-4" aria-label={`Edit skill ${skill.name}`}>Edit</Button>}
        />
        <ConfirmDeleteDialog
          trigger={<Button variant="ghost" className="h-11 px-4 text-destructive" aria-label={`Delete skill ${skill.name}`}>Delete</Button>}
          title="Delete skill?"
          description={`“${skill.name}” and its rating will be removed from this topic.`}
          onDelete={onDelete}
        />
      </div>
    </Card>
  );
}
