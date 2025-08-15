import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Settings, 
  Bell,
  Search,
  MoreHorizontal
} from "lucide-react";

interface DashboardProps {
  className?: string;
}

const DashboardComponent: React.FC<DashboardProps> = ({ className }) => {
  // Mock data for demonstration
  const stats = [
    { label: "Total Users", value: "47,892", change: "+23%", icon: Users },
    { label: "Revenue", value: "$189,547", change: "+34%", icon: TrendingUp },
    { label: "Active Sessions", value: "8,765", change: "+18%", icon: Activity },
    { label: "Conversion Rate", value: "7.8%", change: "+15%", icon: BarChart3 },
  ];

  const recentActivity = [
    { user: "John Doe", action: "Created new project", time: "2 min ago" },
    { user: "Sarah Smith", action: "Updated dashboard", time: "5 min ago" },
    { user: "Mike Johnson", action: "Completed task", time: "10 min ago" },
  ];

  return (
    <div className={`min-h-screen bg-gray-900 text-white p-6 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* User Profile Section */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback className="bg-blue-600 text-white text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">John Doe</h3>
              <p className="text-gray-400">Senior Developer</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-600 text-white">Online</Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-300">Pro Plan</Badge>
              </div>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Analytics Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Performance metrics for the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Placeholder for chart - in real implementation, use recharts or similar */}
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">Chart visualization would go here</p>
                <p className="text-gray-500 text-sm">Use recharts, chart.js, or similar library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Latest team updates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-600 text-white text-xs">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-400">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="mt-6 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Project Progress</CardTitle>
          <CardDescription className="text-gray-400">
            Current project milestones and completion status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">ClaudeSquad Development</span>
                <span className="text-sm text-gray-400">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Magic MCP Integration</span>
                <span className="text-sm text-gray-400">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Agent System</span>
                <span className="text-sm text-gray-400">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardComponent;