"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataVisualizationProps {
  data?: any[];
  title?: string;
  description?: string;
}

const DataVisualization = ({
  data = [
    { name: "Jan", sentiment: 4.0, responses: 24 },
    { name: "Feb", sentiment: 3.2, responses: 18 },
    { name: "Mar", sentiment: 3.8, responses: 22 },
    { name: "Apr", sentiment: 4.2, responses: 28 },
    { name: "May", sentiment: 3.9, responses: 26 },
    { name: "Jun", sentiment: 4.5, responses: 30 },
  ],
  title = "Survey Analysis",
  description = "Visualization of student survey data and sentiment analysis",
}: DataVisualizationProps) => {
  const [chartType, setChartType] = useState("bar");
  const [timeRange, setTimeRange] = useState("6months");

  // Sample pie chart data
  const pieData = [
    { name: "Positive", value: 65, color: "#4ade80" },
    { name: "Neutral", value: 25, color: "#facc15" },
    { name: "Negative", value: 10, color: "#f87171" },
  ];

  // Colors for the bar chart
  const barColors = ["#4ade80", "#60a5fa"];

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="bar"
          value={chartType}
          onValueChange={setChartType}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke={barColors[0]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={barColors[1]}
                />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sentiment"
                  name="Sentiment Score"
                  fill={barColors[0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="responses"
                  name="Response Count"
                  fill={barColors[1]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="line" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke={barColors[0]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={barColors[1]}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sentiment"
                  name="Sentiment Score"
                  stroke={barColors[0]}
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="responses"
                  name="Response Count"
                  stroke={barColors[1]}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="pie" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
