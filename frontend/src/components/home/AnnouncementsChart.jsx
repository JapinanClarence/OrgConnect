import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const AnnouncementsChart = ({ data }) => {
  // Ensure `data` is an array before processing
  if (!Array.isArray(data)) {
    console.error("Invalid data format. Expected an array.");
    return null;
  }

  // Initialize chart data for categories
  const chartData = [
    { category: "General Info", count: 0 },
    { category: "Meetings", count: 0 },
    { category: "Reminders", count: 0 },
    { category: "News", count: 0 },
    { category: "Alerts", count: 0 },
  ];

  // Populate chart data with counts for each category
  data.forEach((announcement) => {
    const categoryIndex = announcement.category; // Assuming `category` is stored as a number (0-4)
    if (categoryIndex >= 0 && categoryIndex <= 4) {
      chartData[categoryIndex].count += 1;
    }
  });

  const chartConfig = {
    label: {
      color: "hsl(var(--background))",
    },
  };

  // Define a static color for all bars
  const staticColor = "hsl(var(--chart-static-color))";

  return (
    <Card className="shadow-sm md:shadow-lg">
      <CardHeader>
        <CardTitle>Total Announcements</CardTitle>
        <CardDescription>
          Showing total announcements based on category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsChart;
