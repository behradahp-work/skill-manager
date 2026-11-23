//---------- Packages ----------
import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import { Card } from "@/shared/components/ui/card";

//---------- Types ----------
import type { Topic } from "../types/workspace";

export default function TopicList({ topics }: { topics: Topic[] }) {
  return (
    <ul className="grid gap-3 lg:grid-cols-2">
      {topics.map(({ id, name, skills }) => (
        <li key={id} className="min-w-0">
          <Card className="h-full p-0">
            <Link
              to={`/topics/${encodeURIComponent(id)}`}
              className="flex h-full items-center gap-4 rounded-xl p-4 hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                <FolderOpen className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block wrap-anywhere font-semibold">{name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {skills.length} {skills.length === 1 ? "skill" : "skills"}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}
