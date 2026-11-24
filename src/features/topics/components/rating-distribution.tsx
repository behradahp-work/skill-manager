//---------- Components ----------
import BarChart from "@/shared/components/shared/bar-chart";

//---------- Constants ----------
import { SKILL_RATINGS } from "../constants/workspace";

//---------- Types ----------
import type { Skill } from "../types/workspace";

export default function RatingDistribution({ skills }: { skills: Skill[] }) {
  const counts = [0, 0, 0, 0, 0, 0];
  for (const { rating } of skills) counts[rating]++;

  return (
    <BarChart
      title="Rating distribution"
      vertical
      description="Number of skills at each star rating"
      maximum={Math.max(1, ...counts)}
      rows={SKILL_RATINGS.map((rating) => ({
        id: String(rating),
        label: rating === 1 ? "1 star" : `${rating} stars`,
        value: counts[rating],
        display: String(counts[rating]),
      }))}
    />
  );
}
