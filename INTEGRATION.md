# 🔌 Integration Guide

How to integrate the Sales Dashboard into your existing React/Next.js project.

---

## Option 1: Standalone Dashboard (Recommended)

Use the complete dashboard as-is in your Next.js project.

### For Next.js Projects

#### Step 1: Copy Files
```bash
# Copy the dashboard component
cp src/app/page.tsx your-project/src/app/dashboard/page.tsx

# Copy styles
cp src/globals.css your-project/src/globals.css
```

#### Step 2: Install Dependencies
```bash
npm install recharts lucide-react
```

#### Step 3: Update Layout
In your `src/app/layout.tsx`:
```typescript
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        {children}
      </body>
    </html>
  )
}
```

#### Step 4: Add Route
Create `src/app/dashboard/page.tsx`:
```typescript
export { default } from './dashboard'
```

#### Step 5: Access Dashboard
Visit `http://localhost:3000/dashboard`

---

## Option 2: Extract as Reusable Component

Convert dashboard into a component you can use anywhere.

### Create Component File

Save as `src/components/SalesDashboard.tsx`:

```typescript
'use client'

import React from 'react'
import { TrendingUp } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface DashboardProps {
  data?: Array<{
    month: string
    advertisingSpend: number
    roas: number
    revenue: number
  }>
  title?: string
  subtitle?: string
}

export default function SalesDashboard({ 
  data, 
  title = 'Sales Projection for Rituva',
  subtitle = '2025 Annual Projections'
}: DashboardProps) {
  // Dashboard code here
  return (
    // JSX here
  )
}
```

### Use in Your Project

```typescript
import SalesDashboard from '@/components/SalesDashboard'

export default function Page() {
  return (
    <div>
      <SalesDashboard />
    </div>
  )
}
```

---

## Option 3: Use with Custom Data

Pass your own data to the dashboard component.

### Example: Dynamic Data

```typescript
'use client'

import SalesDashboard from '@/components/SalesDashboard'

const customData = [
  { month: 'Jan', advertisingSpend: 0, roas: 0, revenue: 2 },
  { month: 'Feb', advertisingSpend: 5, roas: 1.5, revenue: 9.5 },
  // ... more months
]

export default function CustomDashboard() {
  return (
    <SalesDashboard 
      data={customData}
      title="My Custom Dashboard"
      subtitle="Q1 2025 Results"
    />
  )
}
```

### Example: Fetching Data from API

```typescript
'use client'

import { useEffect, useState } from 'react'
import SalesDashboard from '@/components/SalesDashboard'

export default function LiveDashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/sales-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return <SalesDashboard data={data} />
}
```

---

## Option 4: Add to Existing Dashboard

Embed dashboard chart in an existing dashboard.

### Step 1: Extract Chart Component

Create `src/components/AdSpendChart.tsx`:

```typescript
'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

export function AdSpendChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-6">
        Monthly Advertising Spend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Spend (₹ Lakhs)', angle: -90 }} />
          <Tooltip />
          <Bar 
            dataKey="advertisingSpend" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

### Step 2: Use in Your Dashboard

```typescript
import { AdSpendChart } from '@/components/AdSpendChart'

export default function MyDashboard() {
  const data = [/* ... */]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AdSpendChart data={data} />
      {/* Other charts */}
    </div>
  )
}
```

---

## Option 5: Integrate with State Management

Use with Redux, Zustand, or Context API.

### With Zustand

#### Store Definition

Create `src/store/dashboardStore.ts`:

```typescript
import { create } from 'zustand'

interface DashboardState {
  data: any[]
  loading: boolean
  error: string | null
  fetchData: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/sales-data')
      const data = await response.json()
      set({ data, error: null })
    } catch (error) {
      set({ error: 'Failed to load data' })
    } finally {
      set({ loading: false })
    }
  }
}))
```

#### Use in Component

```typescript
'use client'

import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import SalesDashboard from '@/components/SalesDashboard'

export default function Page() {
  const { data, loading, fetchData } = useDashboardStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) return <div>Loading...</div>

  return <SalesDashboard data={data} />
}
```

---

## Option 6: Add Analytics & Tracking

Track dashboard usage with analytics.

### Add to Dashboard Component

```typescript
'use client'

import { useEffect } from 'react'

export default function SalesDashboard() {
  useEffect(() => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'dashboard_view', {
        page_title: 'Sales Projection Dashboard'
      })
    }

    // Mixpanel
    if (window.mixpanel) {
      window.mixpanel.track('Dashboard Viewed')
    }
  }, [])

  // Rest of component
}
```

---

## Option 7: Dark/Light Mode Toggle

Add theme switching to dashboard.

### Create Theme Provider

```typescript
'use client'

import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'dark',
  toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

### Use in Layout

```typescript
import { ThemeProvider } from '@/context/ThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## Option 8: Export Dashboard as Library

Publish to npm for reuse.

### Create package.json exports

```json
{
  "name": "@yourname/sales-dashboard",
  "version": "1.0.0",
  "exports": {
    ".": "./src/components/SalesDashboard.tsx",
    "./styles": "./src/globals.css"
  }
}
```

### Publish to npm

```bash
npm publish
```

### Use in Other Projects

```bash
npm install @yourname/sales-dashboard
```

```typescript
import SalesDashboard from '@yourname/sales-dashboard'
```

---

## 🔧 Common Integration Patterns

### With Next.js API Routes

Create `src/app/api/sales-data/route.ts`:

```typescript
export async function GET() {
  const data = [
    { month: 'Jan', advertisingSpend: 0, roas: 0, revenue: 2 },
    // ... more data
  ]

  return Response.json(data)
}
```

### With Authentication

```typescript
'use client'

import { useSession } from 'next-auth/react'
import SalesDashboard from '@/components/SalesDashboard'

export default function ProtectedDashboard() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Please sign in</div>
  }

  return <SalesDashboard />
}
```

### With Caching

```typescript
import { cache } from 'react'

const getCachedData = cache(async () => {
  return fetch('/api/sales-data', {
    next: { revalidate: 3600 } // Cache for 1 hour
  }).then(res => res.json())
})

export default async function Dashboard() {
  const data = await getCachedData()
  return <SalesDashboard data={data} />
}
```

---

## ✅ Integration Checklist

- [ ] Dependencies installed (recharts, lucide-react)
- [ ] Global styles imported
- [ ] Component files copied
- [ ] Data source configured
- [ ] Routes configured
- [ ] Styles applied correctly
- [ ] Responsive layout verified
- [ ] Charts rendering properly
- [ ] Tooltips working
- [ ] Accessibility tested

---

## 🆘 Troubleshooting Integration

### Charts Not Displaying
```typescript
// Ensure ResponsiveContainer has parent with height
<div style={{ height: '300px' }}>
  <ResponsiveContainer width="100%" height="100%">
    {/* Chart here */}
  </ResponsiveContainer>
</div>
```

### Styles Not Applied
```typescript
// Import globals.css in layout.tsx
import './globals.css'

// Import Tailwind CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Data Not Loading
```typescript
// Add error handling
try {
  const data = await fetchData()
  setData(data)
} catch (error) {
  console.error('Failed to load data:', error)
  setError(error.message)
}
```

---

## 📚 Reference

- [Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Recharts API](https://recharts.org/api)
- [Tailwind CSS](https://tailwindcss.com/docs)

Choose the integration option that best fits your project! 🚀

