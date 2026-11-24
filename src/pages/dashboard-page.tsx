//---------- Packages ----------
import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import DashboardSummary from "@/features/dashboard/components/dashboard-summary";
import LoadSampleData from "@/features/dashboard/components/load-sample-data";
import TopicComparison from "@/features/dashboard/components/topic-comparison";
import RatingDistribution from "@/features/topics/components/rating-distribution";
import EmptyState from "@/shared/components/shared/empty-state";
import PageHeading from "@/shared/components/shared/page-heading";
import { Button } from "@/shared/components/ui/button";
import Reveal from "@/shared/components/shared/reveal";

//---------- Hooks ----------
import { useWorkspace } from "@/features/topics/hooks/use-workspace";

export default function DashboardPage() {
  const { workspace } = useWorkspace();
  const topics = workspace?.topics ?? [];
  const skills = topics.flatMap((topic) => topic.skills);
  const averageRating = skills.length
    ? skills.reduce((total, skill) => total + skill.rating, 0) / skills.length
    : null;

  return (
    <div className="space-y-7">
      <title>Dashboard | Skill Manager</title>
      <Reveal delay={0}>
        <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border bg-linear-to-br from-accent/80 via-card to-card p-5 sm:p-8">
          <PageHeading
            title="Dashboard"
            description="See where your skills are strongest and which topics you’ve rated so far."
          />
          {topics.length > 0 && (
            <Button
              nativeButton={false}
              render={<Link to="/topics" />}
              className="h-11 px-4"
            >
              View topics <ArrowRight aria-hidden="true" />
            </Button>
          )}
        </div>
      </Reveal>

      <Reveal delay={150}>
        <DashboardSummary
          topicCount={topics.length}
          skillCount={skills.length}
          averageRating={averageRating}
        />
      </Reveal>

      {skills.length > 0 && (
        <Reveal delay={300}>
          <RatingDistribution skills={skills} />
        </Reveal>
      )}

      {topics.length > 0 && (
        <Reveal delay={450}>
          <section
            aria-labelledby="topic-comparison-heading"
            className="space-y-3"
          >
            <h2
              id="topic-comparison-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Compare topics
            </h2>
            <TopicComparison topics={topics} />
          </section>
        </Reveal>
      )}

      {topics.length === 0 && (
        <Reveal delay={600}>
          <EmptyState
            icon={FolderOpen}
            title="Your workspace is empty"
            description="Add your own topics or try the charts with sample data."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  nativeButton={false}
                  render={<Link to="/topics" />}
                  className="h-11 px-4"
                >
                  View topics <ArrowRight aria-hidden="true" />
                </Button>
                <LoadSampleData />
              </div>
            }
          />
        </Reveal>
      )}
    </div>
  );
}
