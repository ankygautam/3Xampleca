import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageSection } from "../ui/PageSection";

type ChartDatum = Record<string, string | number | undefined>;

interface TrendChartCardProps<T extends ChartDatum> {
  title: string;
  subtitle?: string;
  data: T[];
  dataKey: keyof T;
  xAxisKey: keyof T;
  height?: number;
  valueLabel?: string;
  strokeColor?: string;
  fillColor?: string;
}

export function TrendChartCard<T extends ChartDatum>({
  title,
  subtitle,
  data,
  dataKey,
  xAxisKey,
  height = 280,
  valueLabel = "Volume",
  strokeColor = "#0f172a",
  fillColor = "#cbd5e1",
}: TrendChartCardProps<T>) {
  const gradientId = `trend-fill-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <PageSection
      title={title}
      subtitle={subtitle}
      contentClassName="p-5 sm:p-6"
    >
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0.06} />
              </linearGradient>
            </defs>
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
              formatter={(value) => [value ?? 0, valueLabel]}
              labelStyle={{ color: "#0f172a", fontWeight: 600 }}
            />
            <Area
              dataKey={String(dataKey)}
              fill={`url(#${gradientId})`}
              stroke={strokeColor}
              strokeWidth={2.5}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </PageSection>
  );
}
