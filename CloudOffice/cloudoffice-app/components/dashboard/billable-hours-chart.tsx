"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function BillableHoursChart({ filter }: { filter: string }) {
  // Sample data based on filter
  const getData = () => {
    if (filter === "today") {
      return [
        { time: "9AM", current: 1.2, target: 2 },
        { time: "10AM", current: 2.5, target: 4 },
        { time: "11AM", current: 3.8, target: 6 },
        { time: "12PM", current: 4.2, target: 8 },
        { time: "1PM", current: 4.2, target: 10 },
        { time: "2PM", current: 5.5, target: 12 },
        { time: "3PM", current: 7.0, target: 14 },
        { time: "4PM", current: 8.6, target: 16 },
        { time: "5PM", current: 10.2, target: 18 },
      ]
    } else if (filter === "this-week") {
      return [
        { time: "Mon", current: 6.5, target: 8 },
        { time: "Tue", current: 7.2, target: 16 },
        { time: "Wed", current: 6.8, target: 24 },
        { time: "Thu", current: 8.0, target: 32 },
        { time: "Fri", current: 0, target: 40 },
      ]
    } else {
      // this-month
      return [
        { time: "Week 1", current: 38, target: 40 },
        { time: "Week 2", current: 35, target: 80 },
        { time: "Week 3", current: 42, target: 120 },
        { time: "Week 4", current: 0, target: 160 },
      ]
    }
  }

  const data = getData()

  // Calculate totals
  const currentTotal = data.reduce((sum, item) => sum + item.current, 0)
  const targetTotal = data[data.length - 1]?.target || 0
  const percentage = Math.round((currentTotal / targetTotal) * 100)

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current</span>
          <span className="font-medium">{currentTotal} hours</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Target</span>
          <span className="font-medium">{targetTotal} hours</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="current" stroke="#8884d8" strokeWidth={2} name="Billable Hours" />
            <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} name="Target" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

