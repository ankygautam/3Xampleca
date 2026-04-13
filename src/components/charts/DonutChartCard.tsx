import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PageSection } from "../ui/PageSection";

type ChartDatum = Record<string, string | number | undefined>;

interface DonutChartCardProps<T extends ChartDatum> {
  title: string;
  subtitle?: string;
  data: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  centerLabel?: string;
  colorKey?: keyof T;
  colors?: string[];
}

const defaultColors = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"];

export function DonutChartCard<T extends ChartDatum>({
  title,
  subtitle,
  data,
  dataKey,
  nameKey,
  centerLabel,
  colorKey,
  colors = defaultColors,
}: DonutChartCardProps<T>) {
  const total = data.reduce((sum, entry) => {
    const value = entry[dataKey];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);

  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      contentClassName="p-5 sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        <div className="relative h-[260px] sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  borderRadius: 18,
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  boxShadow: "0 20px 45px -24px rgba(15, 23, 42, 0.28)",
                }}
                formatter={(value) => [value ?? 0, String(centerLabel ?? "Value")]}
                labelStyle={{ color: "#0f172a", fontWeight: 600 }}
              />
              <Pie
                data={data}
                dataKey={String(dataKey)}
                innerRadius={68}
                outerRadius={96}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry, index) => {
                  const fill =
                    colorKey && typeof entry[colorKey] === "string"
                      ? String(entry[colorKey])
                      : colors[index % colors.length];

                  return <Cell key={`${title}-${index}`} fill={fill} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[1.9rem] font-semibold tracking-[-0.04em] text-slate-950">
              {total}
            </span>
            {centerLabel ? (
              <span className="mt-1 text-sm text-slate-500">{centerLabel}</span>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          {data.map((entry, index) => {
            const fill =
              colorKey && typeof entry[colorKey] === "string"
                ? String(entry[colorKey])
                : colors[index % colors.length];

            return (
              <div
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3.5"
                key={`${String(entry[nameKey])}-${index}`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: fill }} />
                  <span className="text-sm font-medium text-slate-700">
                    {String(entry[nameKey])}
                  </span>
                </div>
                <span className="text-sm text-slate-500">{String(entry[dataKey] ?? 0)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}
