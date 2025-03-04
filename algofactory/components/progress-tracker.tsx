"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "@/components/ui/chart"

interface ProgressData {
  week: number
  solved: number
  total: number
}

export function ProgressTracker({ data }: { data: ProgressData[] }) {
  return (
    <div className="w-full aspect-[2/1]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Bar dataKey="solved" fill="#4f46e5" name="Solved" />
          <Bar dataKey="total" fill="#e5e7eb" name="Total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

