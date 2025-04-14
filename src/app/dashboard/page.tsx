import React from "react";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentManagement from "@/components/students/StudentManagement";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // Mock teacher data - in a real app, this would come from an API
  const teacher = {
    name: "Sarah Johnson",
    email: "sarah.johnson@education.org",
    role: "Elementary Teacher",
    school: "Westside Elementary",
    students: 28,
    surveysCompleted: 124,
    lastLogin: "2023-05-15T08:30:00",
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {teacher.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
              alt={teacher.name}
            />
            <AvatarFallback>
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Teacher Profile Card */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Teacher Profile</CardTitle>
            <CardDescription>
              Your account information and statistics
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                    alt={teacher.name}
                  />
                  <AvatarFallback>
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium">{teacher.name}</h3>
                  <p className="text-muted-foreground">{teacher.email}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Role</p>
                <p>{teacher.role}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">School</p>
                <p>{teacher.school}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Students</p>
                <p>{teacher.students}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Surveys Completed</p>
                <p>{teacher.surveysCompleted}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 mb-8">
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
          <TabsTrigger value="students">Student Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <StudentManagement />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Settings panel content will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
