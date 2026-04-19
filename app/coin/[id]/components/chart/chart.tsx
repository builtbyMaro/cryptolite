"use client";
import styles from "./chart.module.css";
import { useChart } from "@/lib/hooks/usechart";
import Spinner from "@/components/loading spinner/spinner";
import Error from "@/components/error/error";
import ChartNav from "./chartNav";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Prop = {
  id: string;
};

const Chart = ({ id }: Prop) => {
  const {
    data,
    loading,
    error,
    refetch,
    isCoolingDown,
    timeframe,
    setTimeframe,
  } = useChart(id);

  // loading state
  if (loading) return <Spinner />;

  // error state
  if (error)
    return (
      <Error
        message={error}
        action={refetch}
        actionText="Retry"
        isCoolingDown={isCoolingDown}
      />
    );

  // determine direction (green/red)
  const first = data[0]?.price;
  const last = data[data.length - 1]?.price;

  const isPositive = last >= first;
  const color = isPositive ? "#10b981" : "#ef4444";

  // proper tooltip using timestamp
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { price, time } = payload[0].payload;

      const date = new Date(time);

      const formattedDate = date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div
          style={{
            background: "#111",
            border: "1px solid #333",
            padding: "8px 12px",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            {formattedDate} • {formattedTime}
          </p>

          <p style={{ fontWeight: 600 }}>${price.toLocaleString()}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.chart}>
      <ChartNav timeFrame={timeframe} setTimeFrame={setTimeframe} />
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          {/* gradient for area fill */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* hide X axis labels */}
          <XAxis dataKey="time" hide />

          {/* price axis */}
          <YAxis
            orientation="right"
            domain={["auto", "auto"]}
            tick={{ fontSize: 10, fill: "#888" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />

          {/* tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* chart line + fill */}
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            fill="url(#colorGradient)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
