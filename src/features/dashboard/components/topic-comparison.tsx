//---------- Components ----------
import BarChart from "@/shared/components/shared/bar-chart";

//---------- Types ----------
import type { Topic } from "@/features/topics/types/workspace";

export default function TopicComparison({ topics }: { topics: Topic[] }) {
  const totals = topics.map(({ id, name, skills }) => ({
    id,
    label: name,
    count: skills.length,
    average: skills.length
      ? skills.reduce((sum, skill) => sum + skill.rating, 0) / skills.length
      : null,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <BarChart
        title="Skills by topic"
        description="Number of skills tracked in each topic"
        maximum={totals.reduce((max, { count }) => Math.max(max, count), 1)}
        rows={totals.map(({ id, label, count }) => ({ id, label, value: count, display: String(count) }))}
      />
      <BarChart
        title="Average rating by topic"
        color="var(--chart-2)"
        description="Average skill rating on a 5-star scale"
        maximum={5}
        rows={totals.map(({ id, label, average }) => ({
          id, label, value: average ?? 0,
          display: average === null ? "No ratings yet" : `${average.toFixed(1)} / 5`,
        }))}
      />
    </div>
  );
}
