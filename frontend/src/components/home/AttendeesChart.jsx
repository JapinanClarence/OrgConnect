import React, { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Label,
  Cell,
  Pie,
  Tooltip,
  PieChart,
} from "recharts";

const AttendeesChart = ({ data, currentMonth, currentYear }) => {
  const chartConfig = useMemo(() => {
    return data.reduce((acc, event, index) => {
      const colorIndex = index + 1; // Get the color index dynamically

      // Resolve CSS variable values dynamically
      const rootStyles = getComputedStyle(document.documentElement);
      const color = rootStyles.getPropertyValue(`--chart-${colorIndex}`).trim();

      acc[event.event] = {
        label: event.event, // Event name becomes the label
        color: `hsl(${color})`, // Dynamically assign color from resolved value
      };

      return acc;
    }, {});
  }, [data]);
  
  // Map backend data to include 'fill' color dynamically
  const chartData = data.map((item, index) => ({
    ...item,
    fill: chartConfig[item.event]?.color || "hsl(var(--chart-5))", // Assign a color or fallback if undefined
  }));

  const totalAttendees = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return 0;
    }

    return chartData.reduce((acc, curr) => acc + curr.attendees, 0);
  }, [chartData]);

  return (
    <Card className="flex justify-between h-full md:max-w-[500px] flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle>Event Attendees</CardTitle>
        <CardDescription>
          {currentMonth} {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto my-auto aspect-square max-h-[300px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="attendees"
              nameKey="event"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAttendees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Attendees
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total attendees for the month of {currentMonth}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AttendeesChart;
