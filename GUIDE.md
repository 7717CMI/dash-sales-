# 📖 Complete Setup & Usage Guide

Everything you need to know about the Sales Projection Dashboard.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Dashboard](#running)
4. [Project Structure](#structure)
5. [Customization](#customization)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## <a name="prerequisites"></a> Prerequisites

Before you start, make sure you have:

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- **npm** - Comes with Node.js
- **Git** (optional) - For version control
- **Code Editor** - VS Code recommended
- **Basic Command Line** - Terminal/PowerShell knowledge

### Check Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

Both should show version numbers.

---

## <a name="installation"></a> Installation

### Method 1: Quick Start (Windows)

1. **Download the project** or clone from Git
2. **Open PowerShell** in the project folder
3. **Run setup**:
   ```powershell
   .\setup.bat
   ```
4. **Wait for completion** (3-5 minutes first time)
5. **Access dashboard**: Open `http://localhost:3000`

### Method 2: Quick Start (Mac/Linux)

1. **Download the project** or clone from Git
2. **Open Terminal** in the project folder
3. **Run setup**:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
4. **Wait for completion** (3-5 minutes first time)
5. **Access dashboard**: Open `http://localhost:3000`

### Method 3: Manual Installation

```bash
# Navigate to project
cd "path/to/dashboard rituva"

# Install dependencies
npm install

# Build for production
npm run build

# Start development server
npm run dev
```

---

## <a name="running"></a> Running the Dashboard

### Development Mode (with live reload)

```bash
npm run dev
```

✅ Access at: `http://localhost:3000`
✅ Changes auto-reload
✅ See errors in console
✅ Best for development

### Production Build

```bash
npm run build
npm start
```

✅ Optimized performance
✅ Smaller bundle size
✅ Best for deployment

### Production Build + PM2 (Keep running)

```bash
npm run build
npm install -g pm2
pm2 start npm --name "dashboard" -- start
pm2 save
pm2 startup
```

✅ Runs in background
✅ Auto-restarts on error
✅ Persistent across reboots

---

## <a name="structure"></a> Project Structure

```
dashboard rituva/
│
├── src/                          # Source code
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Dashboard component
│   └── globals.css              # Global styles
│
├── public/                      # Static files (if needed)
│
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── next.config.ts              # Next.js config
├── postcss.config.js           # PostCSS config
│
├── Dockerfile                   # Docker image
├── docker-compose.yml          # Docker compose
│
├── README.md                    # Main documentation
├── QUICKSTART.md               # Quick start guide
├── DEPLOYMENT.md               # Deployment guide
├── INTEGRATION.md              # Integration guide
└── .gitignore                  # Git ignore rules
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main dashboard component |
| `src/globals.css` | Styling (Tailwind + custom CSS) |
| `package.json` | Project dependencies |
| `tailwind.config.ts` | Tailwind color/spacing config |
| `next.config.ts` | Next.js build optimizations |
| `tsconfig.json` | TypeScript configuration |

---

## <a name="customization"></a> Customization

### 1. Change Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',      // Blue for bar chart
      success: '#10B981',      // Green for ROAS
      warning: '#F59E0B',      // Amber
      danger: '#EF4444',       // Red
    },
  },
}
```

### 2. Change Chart Colors

In `src/app/page.tsx`:

```typescript
// Bar chart color
<Bar dataKey="advertisingSpend" fill="#3b82f6" />  // Change this

// Line chart color
<Line dataKey="roas" stroke="#10b981" />           // Change this

// Area chart color
<Area dataKey="revenue" fill="#a855f7" />          // Change this
```

### 3. Update Dashboard Data

In `src/app/page.tsx`, modify the `data` array:

```typescript
const data = [
  { month: "Jan", advertisingSpend: 0, roas: 0, revenue: 2 },
  { month: "Feb", advertisingSpend: 5, roas: 1.5, revenue: 9.5 },
  // Modify values as needed
]
```

### 4. Change Dashboard Title

In `src/app/page.tsx`:

```typescript
<h1 className="text-4xl md:text-5xl font-bold text-white">
  Your Custom Title Here
</h1>
```

### 5. Add New Charts

Example: Add a Pie Chart

```typescript
import { PieChart, Pie, Cell } from 'recharts'

// In your JSX
<div className="chart-card lg:col-span-1">
  <h2 className="chart-title">Revenue by Product</h2>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} dataKey="revenue" />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
```

### 6. Customize Stat Cards

Edit the summary statistics section:

```typescript
<StatCard
  title="Total Ad Spend"
  value={`₹${totalAdSpend} L`}
  icon={TrendingUp}
  gradient="blue"
/>
```

Change `gradient` to: `blue`, `green`, or `purple`

---

## <a name="troubleshooting"></a> Troubleshooting

### Problem: "npm: command not found"

**Solution**: Node.js not installed
```bash
# Download from https://nodejs.org
# Install and restart terminal
node --version  # Should show version
```

### Problem: Port 3000 already in use

**Solution**: Change port or kill process

```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID YOUR_PID /F

# Mac/Linux
lsof -i :3000
kill -9 PID
```

### Problem: Charts not displaying

**Solution**: Check browser console

```typescript
// Ensure chart height is set
<div style={{ height: '300px' }}>
  <ResponsiveContainer width="100%" height="100%">
    {/* Chart */}
  </ResponsiveContainer>
</div>
```

### Problem: Styles not applied

**Solution**: Rebuild Tailwind

```bash
# Clear Next.js cache
rm -rf .next

# Run dev server (will rebuild)
npm run dev
```

### Problem: Build fails

**Solution**: Clean reinstall

```bash
# Remove dependencies
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Try build again
npm run build
```

### Problem: High memory usage

**Solution**: Increase Node memory

```bash
# Windows PowerShell
$env:NODE_OPTIONS = "--max-old-space-size=4096"
npm run build

# Mac/Linux
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Problem: Deployment fails

**Solution**: See DEPLOYMENT.md for platform-specific help

---

## <a name="faq"></a> FAQ

### Q: Can I use this in production?
**A**: Yes! It's optimized and production-ready.

### Q: How do I add real-time data?
**A**: Create API endpoint and fetch data with `useEffect`:
```typescript
useEffect(() => {
  fetch('/api/sales-data')
    .then(res => res.json())
    .then(data => setData(data))
}, [])
```

### Q: How do I deploy to Heroku?
**A**: See DEPLOYMENT.md → Heroku section

### Q: Can I embed this in WordPress?
**A**: Use as standalone app and iframe it, or use Vercel deployment

### Q: How do I add user authentication?
**A**: Install next-auth:
```bash
npm install next-auth
# Follow: https://next-auth.js.org/getting-started/example
```

### Q: How do I export/download data?
**A**: Add button to trigger CSV download:
```typescript
const downloadCSV = () => {
  const csv = data.map(row => 
    `${row.month},${row.advertisingSpend},${row.roas},${row.revenue}`
  ).join('\n')
  // Create download
}
```

### Q: How do I change the domain?
**A**: See DEPLOYMENT.md → Configure Custom Domain

### Q: Is there a database included?
**A**: No, data is static. Add your own backend/database as needed

### Q: How do I add filters/date range picker?
**A**: Install react-datepicker and add component:
```bash
npm install react-datepicker
```

### Q: How do I improve performance?
**A**: 
- Enable image optimization
- Use dynamic imports
- Add caching headers
- See DEPLOYMENT.md → Performance Tips

### Q: How do I get help?
**A**: 
- Check documentation files (README.md, etc.)
- Review code comments
- Check browser console for errors
- See troubleshooting section above

---

## 📊 Dashboard Features Summary

✅ **Interactive Charts**
- Bar chart (advertising spend)
- Line chart (ROAS)
- Area chart (revenue)

✅ **Responsive Design**
- Mobile optimized (1 column)
- Tablet friendly (2 columns)
- Desktop full layout (3 columns)

✅ **Professional Styling**
- Dark theme
- Gradient cards
- Custom tooltips
- Smooth animations

✅ **Easy Customization**
- Modifiable data
- Configurable colors
- Adjustable titles
- Reusable components

✅ **Production Ready**
- TypeScript support
- Optimized build
- ESLint configured
- Docker ready

---

## 🚀 Next Steps

1. **Get it running**: `npm install && npm run dev`
2. **Customize**: Change colors, title, data
3. **Test**: Open `http://localhost:3000`
4. **Deploy**: Choose platform from DEPLOYMENT.md
5. **Monitor**: Set up logging if needed
6. **Share**: Share link with team

---

## 📚 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Docs](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Node.js Guides](https://nodejs.org/en/docs)

---

## ✨ Tips & Tricks

1. **Use dev tools**: Chrome DevTools to inspect elements
2. **Check console**: For errors and warnings
3. **Hot reload**: Changes save automatically in dev
4. **Component library**: Use Lucide for more icons
5. **Dark mode**: CSS already supports dark theme
6. **Print CSS**: Charts can be printed from browser

---

## 🎯 Common Tasks

### Add a new data point
1. Edit `data` array in `src/app/page.tsx`
2. Add new month object
3. Save file (auto-reload in dev)

### Change chart title
1. Find `<h2 className="chart-title">` in `src/app/page.tsx`
2. Update text
3. Save

### Add new stat card
1. Copy StatCard component usage
2. Change title, value, icon
3. Add to grid
4. Save

### Deploy to production
1. Run `npm run build`
2. Test with `npm start`
3. Follow DEPLOYMENT.md for your platform
4. Deploy!

---

Need help? Check the relevant documentation file:
- **Setup**: QUICKSTART.md
- **Deployment**: DEPLOYMENT.md
- **Integration**: INTEGRATION.md
- **Main Docs**: README.md

Happy coding! 🚀

