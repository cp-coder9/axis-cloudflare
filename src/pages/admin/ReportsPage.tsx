import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Download, FileText, BarChart2, Activity } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MOCK_ANALYTICS_DATA } from '@shared/mock-data';
export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('financial');
  const renderReport = () => {
    switch (reportType) {
      case 'financial':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={MOCK_ANALYTICS_DATA.financials}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R${value / 1000}k`} />
              <Tooltip formatter={(value: number) => `R${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
              <Bar dataKey="expenses" fill="hsl(var(--destructive))" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={MOCK_ANALYTICS_DATA.projectCompletion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" name="Completed" />
              <Bar dataKey="inProgress" stackId="a" fill="hsl(var(--muted-foreground))" name="In Progress" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return <p className="text-muted-foreground">Select a report type to view data.</p>;
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Generate and view detailed reports for your firm.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Report Generator</CardTitle>
          <CardDescription>Select your criteria to generate a new report.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select onValueChange={setReportType} defaultValue={reportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial"><BarChart2 className="inline-block mr-2 h-4 w-4" />Financial Report</SelectItem>
              <SelectItem value="performance"><Activity className="inline-block mr-2 h-4 w-4" />Performance Report</SelectItem>
              <SelectItem value="activity"><FileText className="inline-block mr-2 h-4 w-4" />Activity Log</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Generate & Download
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {renderReport()}
        </CardContent>
      </Card>
    </div>
  );
}