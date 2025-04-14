"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataVisualization from "./DataVisualization";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";

interface AnalyticsDashboardProps {
  teacherData?: {
    name: string;
    email: string;
    school: string;
    studentsCount: number;
  };
  surveyData?: {
    sentimentScores: {
      background: number;
      behavioral: number;
      roleModel: number;
      income: number;
    };
    responseRate: number;
    totalSurveys: number;
    completedSurveys: number;
  };
}

const AnalyticsDashboard = ({
  teacherData = {
    name: "Jane Smith",
    email: "jane.smith@school.edu",
    school: "Lincoln Elementary",
    studentsCount: 28,
  },
  surveyData = {
    sentimentScores: {
      background: 0.65,
      behavioral: 0.72,
      roleModel: 0.81,
      income: 0.58,
    },
    responseRate: 85,
    totalSurveys: 28,
    completedSurveys: 24,
  },
}: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("month");

  // Mock data for charts
  const sentimentTrendData = [
    {
      month: "Jan",
      background: 0.58,
      behavioral: 0.65,
      roleModel: 0.75,
      income: 0.52,
    },
    {
      month: "Feb",
      background: 0.62,
      behavioral: 0.68,
      roleModel: 0.77,
      income: 0.55,
    },
    {
      month: "Mar",
      background: 0.63,
      behavioral: 0.7,
      roleModel: 0.79,
      income: 0.56,
    },
    {
      month: "Apr",
      background: 0.65,
      behavioral: 0.72,
      roleModel: 0.81,
      income: 0.58,
    },
  ];

  const responseRateData = [
    { month: "Jan", rate: 75 },
    { month: "Feb", rate: 78 },
    { month: "Mar", rate: 82 },
    { month: "Apr", rate: 85 },
  ];

  const sentimentDistributionData = [
    { name: "Background", value: surveyData.sentimentScores.background * 100 },
    { name: "Behavioral", value: surveyData.sentimentScores.behavioral * 100 },
    { name: "Role Model", value: surveyData.sentimentScores.roleModel * 100 },
    { name: "Income", value: surveyData.sentimentScores.income * 100 },
  ];

  const studentGroupData = [
    { name: "Grade 1", count: 8 },
    { name: "Grade 2", count: 12 },
    { name: "Grade 3", count: 5 },
    { name: "Grade 4", count: 3 },
  ];

  return (
    <div className="bg-background w-full p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {teacherData.name}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Response Rate
                </p>
                <h3 className="text-2xl font-bold">
                  {surveyData.responseRate}%
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {surveyData.completedSurveys} of {surveyData.totalSurveys} surveys
              completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Students
                </p>
                <h3 className="text-2xl font-bold">
                  {teacherData.studentsCount}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Across {studentGroupData.length} different grades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Sentiment
                </p>
                <h3 className="text-2xl font-bold">
                  {(
                    (Object.values(surveyData.sentimentScores).reduce(
                      (a, b) => a + b,
                      0,
                    ) /
                      4) *
                    100
                  ).toFixed(1)}
                  %
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Overall positive sentiment across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Time Period
                </p>
                <h3 className="text-2xl font-bold capitalize">{timeFilter}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Data shown for the last {timeFilter}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Sentiment Trends</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Distribution</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Student Groups</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Rate Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <DataVisualization
                type="line"
                data={responseRateData}
                xKey="month"
                yKey="rate"
                height={300}
                yAxisLabel="Response Rate (%)"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <DataVisualization
                type="multiLine"
                data={sentimentTrendData}
                xKey="month"
                lines={[
                  { key: "background", color: "#4f46e5" },
                  { key: "behavioral", color: "#10b981" },
                  { key: "roleModel", color: "#f59e0b" },
                  { key: "income", color: "#ef4444" },
                ]}
                height={300}
                yAxisLabel="Sentiment Score"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <DataVisualization
                type="pie"
                data={sentimentDistributionData}
                nameKey="name"
                valueKey="value"
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Distribution by Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <DataVisualization
                type="bar"
                data={studentGroupData}
                xKey="name"
                yKey="count"
                height={300}
                yAxisLabel="Number of Students"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
