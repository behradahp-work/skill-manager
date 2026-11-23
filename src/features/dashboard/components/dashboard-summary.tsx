//---------- Packages ----------
import { FolderOpen, Layers3, Star } from "lucide-react";

//---------- Components ----------
import { Card } from "@/shared/components/ui/card";

interface DashboardSummaryProps {
  topicCount: number;
  skillCount: number;
  averageRating: number | null;
}

export default function DashboardSummary({ topicCount, skillCount, averageRating }: DashboardSummaryProps) {
  const metrics = [
    { label: "Topics", value: topicCount, icon: FolderOpen },
    { label: "Skills", value: skillCount, icon: Layers3 },
    {
      label: "Average rating",
      value: averageRating === null ? "No ratings yet" : `${averageRating.toFixed(1)} / 5`,
      icon: Star,
    },
  ];

  return (
    <dl className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {metrics.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="relative gap-2 p-5">
          <dt className="pr-6 text-sm font-medium text-muted-foreground">
            <Icon className="absolute top-5 right-5 size-4 text-primary" aria-hidden="true" />
            {label}
          </dt>
          <dd className="text-xl font-semibold tracking-tight tabular-nums">{value}</dd>
        </Card>
      ))}
    </dl>
  );
}
