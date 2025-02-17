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

const OrgChart = ({ data }) => {
  // Ensure `data` is an array before processing
  if (!Array.isArray(data)) {
    console.error("Invalid data format. Expected an array.");
    return null;
  }

  // Initialize chart data for categories
  const chartData = [
    { category: "Institute Based", count: 0 },
    { category: "Non-institute Based", count: 0 },
    { category: "Religious Based", count: 0 },
    { category: "Fraternities", count: 0 },
  ];

  // Populate chart data with counts for each category
  data.forEach((organization) => {
    const categoryIndex = organization.type; // Assuming `category` is stored as a number (0-4)
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
    <Card className="border-none md:shadow-lg h-full">
      <CardHeader>
        <CardTitle>Total Organizations</CardTitle>
        <CardDescription>
          Showing total organizations based on type.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            // layout="vertical"
            margin={{
              top: 16,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // hide
            />
            {/* <XAxis type="number" /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={4}>
              {/* <LabelList
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
              /> */}
              <LabelList
                dataKey="count"
                position="top"
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

export default OrgChart;
