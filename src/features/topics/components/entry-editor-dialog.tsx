//---------- React ----------
import { useId, useState, type FormEvent, type ReactElement } from "react";

//---------- Components ----------
import FormDialog from "@/shared/components/shared/form-dialog";
import StarRatingField from "./star-rating-field";

//---------- Constants ----------
import { ENTRY_NAME_MAX_LENGTH } from "../constants/workspace";

//---------- Types ----------
import type { SkillRating } from "../types/workspace";

//---------- Utilities ----------
import { isSkillRating } from "../lib/workspace-storage";

type EntryEditorProps = {
  trigger: ReactElement;
  initialName?: string;
} & (
  | { kind: "topic"; onSave: (name: string) => void }
  | { kind: "skill"; initialRating?: SkillRating; onSave: (name: string, rating: SkillRating) => void }
);

export default function EntryEditorDialog(props: EntryEditorProps) {
  const { kind, initialName, trigger } = props;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const nameId = useId();
  const isEditing = initialName !== undefined;
  const action = isEditing ? (kind === "topic" ? "Rename" : "Edit") : "Add";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();

    if (!name || name.length > ENTRY_NAME_MAX_LENGTH) {
      setError(`Enter a name between 1 and ${ENTRY_NAME_MAX_LENGTH} characters.`);
      return;
    }

    try {
      if (props.kind === "topic") {
        props.onSave(name);
      } else {
        const rating = Number(data.get("rating"));
        if (!isSkillRating(rating)) {
          setError("Choose a rating from 1 to 5 stars.");
          return;
        }
        props.onSave(name, rating);
      }
      setOpen(false);
    } catch {
      setError(`Couldn’t save the ${kind}. Try again.`);
    }
  }

  return (
    <FormDialog
      trigger={trigger}
      title={`${action} ${kind}`}
      description={kind === "topic" ? "Give this group of skills a name." : "Name the skill and rate your current ability."}
      submitLabel={isEditing ? "Save changes" : `Add ${kind}`}
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) setError("");
        setOpen(nextOpen);
      }}
      onSubmit={submit}
    >
      <div className="space-y-2">
        <label htmlFor={nameId} className="text-sm font-medium">
          {kind === "topic" ? "Topic name" : "Skill name"}
        </label>
        <input
          id={nameId}
          name="name"
          defaultValue={initialName}
          maxLength={ENTRY_NAME_MAX_LENGTH}
          required
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
        />
      </div>
      {props.kind === "skill" && <StarRatingField initialRating={props.initialRating} />}
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
    </FormDialog>
  );
}
