import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageSection } from "../ui/PageSection";

type ChartDatum = Record<string, string | number | undefined>;

interface BarChartCardProps<T extends ChartDatum> {
  title: string;
  subtitle?: string;
  data: T[];
  dataKey: keyof T;
  xAxisKey: keyof T;
  height?: number;
  valueLabel?: string;
  colorKey?: keyof T;
  barColor?: string;
}

export function BarChartCard<T extends ChartDatum>({
  title,
  subtitle,
  data,
  dataKey,
  xAxisKey,
  height = 280,
  valueLabel = "Value",
  colorKey,
  barColor = "#0f172a",
}: BarChartCardProps<T>) {
  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      contentClassName="p-5 sm:p-6"
    >
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={18}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey={String(xAxisKey)}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickMargin={10}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickMargin={10}
              tickLine={false}
              width={36}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                boxShadow: "0 20px 45px -24px rgba(15, 23, 42, 0.28)",
              }}
              cursor={{ fill: "#f8fafc" }}
              formatter={(value) => [value ?? 0, valueLabel]}
              labelStyle={{ color: "#0f172a", fontWeight: 600 }}
            />
            <Bar dataKey={String(dataKey)} fill={barColor} radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => {
                const cellColor =
                  colorKey && typeof entry[colorKey] === "string"
                    ? String(entry[colorKey])
                    : barColor;

                return <Cell key={`${title}-${index}`} fill={cellColor} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </PageSection>
  );
}
