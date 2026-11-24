//---------- React ----------
import { lazy, Suspense, useId } from "react";

//---------- Components ----------
import { Card } from "@/shared/components/ui/card";

const BarChartPlot = lazy(() => import("./bar-chart-plot"));

export interface BarChartProps {
  title: string;
  description: string;
  maximum: number;
  color?: "var(--chart-1)" | "var(--chart-2)";
  vertical?: boolean;
  rows: { id: string; label: string; value: number; display: string }[];
}

export default function BarChart(props: BarChartProps) {
  const { title, description, rows } = props;
  const titleId = useId();

  return (
    <Card className="min-w-0 gap-4 p-4 sm:p-6">
      <figure aria-labelledby={titleId} className="space-y-5">
        <figcaption>
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </figcaption>
        <Suspense fallback={<div role="status" className="grid h-60 place-items-center text-sm text-muted-foreground">Loading chart...</div>}>
          <BarChartPlot {...props} />
        </Suspense>
        <details className="border-t pt-3 text-sm">
          <summary className="w-fit cursor-pointer font-medium text-muted-foreground">View chart data</summary>
          <dl className="mt-3 divide-y">
            {rows.map(({ id, label, display }) => (
              <div key={id} className="flex justify-between gap-3 py-2">
                <dt className="wrap-anywhere">{label}</dt>
                <dd className="shrink-0 text-muted-foreground tabular-nums">{display}</dd>
              </div>
            ))}
          </dl>
        </details>
      </figure>
    </Card>
  );
}
