//---------- Packages ----------
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Tooltip as ChartTooltip, XAxis, YAxis } from "recharts";

//---------- Components ----------
import { ChartContainer } from "@/shared/components/ui/chart";
import { ChartTooltipContent } from "@/shared/components/ui/chart-tooltip-content";

//---------- Types ----------
import type { BarChartProps } from "./bar-chart";

export default function BarChartPlot({ title, maximum, color = "var(--chart-1)", vertical = false, rows }: BarChartProps) {
  const rowsById = new Map(rows.map((row) => [row.id, row]));
  const formatLabel = (id: string) => rowsById.get(id)?.label ?? id;

  return (
    <div className="max-h-96 overflow-y-auto">
      <ChartContainer config={{ value: { label: title, color } }} className="aspect-auto w-full"
        style={{ height: vertical ? 240 : Math.max(190, rows.length * 32 + 36) }}>
        <RechartsBarChart accessibilityLayer data={rows} layout={vertical ? "horizontal" : "vertical"} margin={{ right: 12 }}>
          <CartesianGrid vertical={!vertical} horizontal={vertical} />
          {vertical ? (
            <XAxis dataKey="id" tickFormatter={formatLabel} tickLine={false} axisLine={false} interval={0} />
          ) : (
            <XAxis type="number" domain={[0, maximum]} allowDecimals={false} tickLine={false} axisLine={false} />
          )}
          {vertical ? (
            <YAxis domain={[0, maximum]} allowDecimals={false} width={26} tickLine={false} axisLine={false} />
          ) : (
            <YAxis type="category" dataKey="id" width={102} tickLine={false} axisLine={false} interval={0}
              tickFormatter={(id: string) => {
                const label = formatLabel(id);
                return label.length > 13 ? `${label.slice(0, 12)}…` : label;
              }} />
          )}
          <ChartTooltip content={<ChartTooltipContent
            labelFormatter={(label) => formatLabel(String(label))}
            formatter={(value, _name, item) => item.payload?.display ?? String(value)}
          />} />
          <Bar dataKey="value" fill="var(--color-value)" radius={vertical ? [5, 5, 0, 0] : [0, 5, 5, 0]}
            maxBarSize={36} isAnimationActive={false} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}
