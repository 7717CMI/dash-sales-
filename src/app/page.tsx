"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Data with three scenarios: Pessimistic, Likely, Optimistic (2026)
// Revenue = Advertising Spend × ROAS (in Lakhs)
const data = [
  { month: "Jan", advertisingSpend: 0, roasLikely: 0, reasPessimistic: 0, roasOptimistic: 0, revenueLikely: 0, revenuePessimistic: 0, revenueOptimistic: 0 },
  { month: "Feb", advertisingSpend: 5, roasLikely: 1.6, reasPessimistic: 1.2, roasOptimistic: 1.9, revenueLikely: 8, revenuePessimistic: 6, revenueOptimistic: 9.5 },
  { month: "Mar", advertisingSpend: 5, roasLikely: 1.75, reasPessimistic: 1.3, roasOptimistic: 2.15, revenueLikely: 8.75, revenuePessimistic: 6.5, revenueOptimistic: 10.75 },
  { month: "Apr", advertisingSpend: 5, roasLikely: 1.9, reasPessimistic: 1.4, roasOptimistic: 2.4, revenueLikely: 9.5, revenuePessimistic: 7, revenueOptimistic: 12 },
  { month: "May", advertisingSpend: 10, roasLikely: 2.05, reasPessimistic: 1.5, roasOptimistic: 2.65, revenueLikely: 20.5, revenuePessimistic: 15, revenueOptimistic: 26.5 },
  { month: "Jun", advertisingSpend: 10, roasLikely: 2.2, reasPessimistic: 1.6, roasOptimistic: 2.9, revenueLikely: 22, revenuePessimistic: 16, revenueOptimistic: 29 },
  { month: "Jul", advertisingSpend: 10, roasLikely: 2.35, reasPessimistic: 1.7, roasOptimistic: 3.15, revenueLikely: 23.5, revenuePessimistic: 17, revenueOptimistic: 31.5 },
  { month: "Aug", advertisingSpend: 15, roasLikely: 2.5, reasPessimistic: 1.8, roasOptimistic: 3.4, revenueLikely: 37.5, revenuePessimistic: 27, revenueOptimistic: 51 },
  { month: "Sep", advertisingSpend: 15, roasLikely: 2.65, reasPessimistic: 1.9, roasOptimistic: 3.65, revenueLikely: 39.75, revenuePessimistic: 28.5, revenueOptimistic: 54.75 },
  { month: "Oct", advertisingSpend: 15, roasLikely: 2.8, reasPessimistic: 2.0, roasOptimistic: 3.9, revenueLikely: 42, revenuePessimistic: 30, revenueOptimistic: 58.5 },
  { month: "Nov", advertisingSpend: 20, roasLikely: 3.0, reasPessimistic: 2.2, roasOptimistic: 4.2, revenueLikely: 60, revenuePessimistic: 44, revenueOptimistic: 84 },
  { month: "Dec", advertisingSpend: 20, roasLikely: 3.2, reasPessimistic: 2.4, roasOptimistic: 4.8, revenueLikely: 64, revenuePessimistic: 48, revenueOptimistic: 96 },
];

// Revenue calculated as: Advertising Spend × ROAS (in Lakhs)

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold text-sm">{label}</p>
        {payload.map((entry: any, index: number) => {
          let formattedValue = entry.value.toFixed(1);
          let suffix = "";
          
          // Check dataKey to determine the type
          const dataKey = entry.dataKey || "";
          const name = entry.name || "";
          
          if (dataKey.includes("revenue") || name.includes("Revenue")) {
            suffix = " ₹L"; // Revenue in Lakhs
          } else if (dataKey.includes("advertisingSpend") || name.includes("Spend") || name.includes("Ad Spend")) {
            suffix = " ₹L"; // Ad Spend in Lakhs
          } else if (dataKey.includes("roas") || name.includes("ROAS")) {
            suffix = "x"; // ROAS multiplier
          } else {
            // Default: check by value range (heuristic)
            // Revenue values are typically > 3, ROAS values are typically < 4
            if (entry.value > 4) {
              suffix = " ₹L"; // Likely revenue
            } else {
              suffix = "x"; // Likely ROAS
            }
          }
          
          return (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formattedValue}{suffix}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Sales Projection for Rituva
          </h1>
        </div>
        <p className="text-gray-600 text-lg">2026 Annual Projections</p>
      </div>

      {/* Charts Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* Chart 1: Advertising Spend - Line Chart */}
          <div className="chart-card">
            <h2 className="chart-title">Monthly Advertising Spend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "Spend (₹ Lakhs)", angle: -90, position: "insideLeft" }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="advertisingSpend"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Ad Spend (₹ Lakhs)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: ROAS with Three Scenarios */}
          <div className="chart-card">
            <h2 className="chart-title">Return on Ad Spend (ROAS)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "ROAS (x)", angle: -90, position: "insideLeft" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {/* Pessimistic Line */}
                <Line
                  type="monotone"
                  dataKey="reasPessimistic"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Pessimistic"
                  strokeDasharray="5 5"
                />
                {/* Likely Line */}
                <Line
                  type="monotone"
                  dataKey="roasLikely"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Likely"
                />
                {/* Optimistic Line */}
                <Line
                  type="monotone"
                  dataKey="roasOptimistic"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Optimistic"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Revenue with Three Scenarios */}
          <div className="chart-card bg-white">
            <h2 className="chart-title">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "Revenue (₹ Lakhs)", angle: -90, position: "insideLeft" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {/* Pessimistic Area */}
                <Area
                  type="monotone"
                  dataKey="revenuePessimistic"
                  fill="#fecaca"
                  stroke="#dc2626"
                  strokeWidth={3}
                  name="Revenue - Pessimistic"
                  isAnimationActive={true}
                  opacity={0.6}
                />
                {/* Likely Area */}
                <Area
                  type="monotone"
                  dataKey="revenueLikely"
                  fill="#a855f7"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  name="Revenue - Likely"
                  isAnimationActive={true}
                  opacity={0.7}
                />
                {/* Optimistic Area */}
                <Area
                  type="monotone"
                  dataKey="revenueOptimistic"
                  fill="#93c5fd"
                  stroke="#2563eb"
                  strokeWidth={3}
                  name="Revenue - Optimistic"
                  isAnimationActive={true}
                  opacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-300">
        <p className="text-gray-600 text-center text-sm">
          Sales Projection Dashboard • © 2026 Rituva • All data is projected
        </p>
      </div>
    </main>
  );
}

