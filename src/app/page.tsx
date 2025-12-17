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
const data = [
  { month: "Jan", advertisingSpend: 0, roasLikely: 0, reasPessimistic: 0, roasOptimistic: 0, revenueLikely: 2, revenuePessimistic: 1, revenueOptimistic: 3 },
  { month: "Feb", advertisingSpend: 5, roasLikely: 1.2, reasPessimistic: 1.0, roasOptimistic: 1.8, revenueLikely: 9.5, revenuePessimistic: 6, revenueOptimistic: 13 },
  { month: "Mar", advertisingSpend: 5, roasLikely: 1.3, reasPessimistic: 1.1, roasOptimistic: 2.0, revenueLikely: 12, revenuePessimistic: 7, revenueOptimistic: 16 },
  { month: "Apr", advertisingSpend: 5, roasLikely: 1.4, reasPessimistic: 1.2, roasOptimistic: 2.2, revenueLikely: 14.5, revenuePessimistic: 8, revenueOptimistic: 20 },
  { month: "May", advertisingSpend: 10, roasLikely: 1.5, reasPessimistic: 1.3, roasOptimistic: 2.4, revenueLikely: 30, revenuePessimistic: 18, revenueOptimistic: 42 },
  { month: "Jun", advertisingSpend: 10, roasLikely: 1.6, reasPessimistic: 1.4, roasOptimistic: 2.6, revenueLikely: 34, revenuePessimistic: 20, revenueOptimistic: 48 },
  { month: "Jul", advertisingSpend: 10, roasLikely: 1.7, reasPessimistic: 1.5, roasOptimistic: 2.8, revenueLikely: 37, revenuePessimistic: 22, revenueOptimistic: 52 },
  { month: "Aug", advertisingSpend: 15, roasLikely: 1.9, reasPessimistic: 1.6, roasOptimistic: 3.0, revenueLikely: 59, revenuePessimistic: 38, revenueOptimistic: 80 },
  { month: "Sep", advertisingSpend: 15, roasLikely: 2.0, reasPessimistic: 1.7, roasOptimistic: 3.2, revenueLikely: 62, revenuePessimistic: 42, revenueOptimistic: 82 },
  { month: "Oct", advertisingSpend: 15, roasLikely: 2.2, reasPessimistic: 1.8, roasOptimistic: 3.4, revenueLikely: 65, revenuePessimistic: 45, revenueOptimistic: 85 },
  { month: "Nov", advertisingSpend: 20, roasLikely: 2.4, reasPessimistic: 1.85, roasOptimistic: 3.6, revenueLikely: 92, revenuePessimistic: 65, revenueOptimistic: 120 },
  { month: "Dec", advertisingSpend: 20, roasLikely: 2.6, reasPessimistic: 1.9, roasOptimistic: 3.8, revenueLikely: 102, revenuePessimistic: 75, revenueOptimistic: 135 },
];

// Calculate totals for Likely scenario
const totalAdSpend = data.reduce((acc, item) => acc + item.advertisingSpend, 0);
const averageROAS = (data.reduce((acc, item) => acc + item.roasLikely, 0) / data.length).toFixed(2);
const totalRevenue = data.reduce((acc, item) => acc + item.revenueLikely, 0);

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value.toFixed(1)}
            {entry.name.includes("Spend") || entry.name.includes("Revenue") ? " ₹" : "x"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  gradient: string;
}) => (
  <div className={`stat-card ${gradient} flex items-start justify-between`}>
    <div className="flex-1">
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
    </div>
    <Icon className="w-8 h-8 opacity-80" />
  </div>
);

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-900 py-8 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Sales Projection for Rituva
          </h1>
        </div>
        <p className="text-gray-400 text-lg">2026 Annual Projections</p>
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Ad Spend"
          value={`₹${totalAdSpend} L`}
          icon={TrendingUp}
          gradient="blue"
        />
        <StatCard
          title="Average ROAS"
          value={`${averageROAS}x`}
          icon={TrendingUp}
          gradient="green"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue} L`}
          icon={TrendingUp}
          gradient="purple"
        />
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
          <div className="chart-card">
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
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Pessimistic"
                  isAnimationActive={true}
                  opacity={0.6}
                />
                {/* Likely Area */}
                <Area
                  type="monotone"
                  dataKey="revenueLikely"
                  fill="#a855f7"
                  stroke="#a855f7"
                  strokeWidth={2}
                  name="Likely"
                  isAnimationActive={true}
                  opacity={0.7}
                />
                {/* Optimistic Area */}
                <Area
                  type="monotone"
                  dataKey="revenueOptimistic"
                  fill="#93c5fd"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Optimistic"
                  isAnimationActive={true}
                  opacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-700">
        <p className="text-gray-500 text-center text-sm">
          Sales Projection Dashboard • © 2025 Rituva • All data is projected
        </p>
      </div>
    </main>
  );
}

