import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  MessageSquareWarning,
  Activity,
  LogOut,
  MapPin,
  Car,
  Download,
  Trophy,
  Gift,
  Tag,
  CheckCircle2,
  TrendingUp,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PieChart, Pie } from "recharts";
import path from "path";

const performanceData = [
  { month: "January", value: 2.8 },
  { month: "February", value: 4.7 },
  { month: "March", value: 3.5 },
  { month: "April", value: 2 },
  { month: "May", value: 3.9 },
  { month: "June", value: 4.8 },
  { month: "July", value: 4.9 },
  { month: "August", value: 3.8 },
  { month: "September", value: 3 },
  { month: "October", value: 3.8 },
  { month: "November", value: 4.9 },
  { month: "December", value: 2.8 },
];



const attendanceData = [
  { name: "Present", value: 68, color: "#22c55e" },
  { name: "Absent", value: 15, color: "#ef4444" },
  { name: "Late", value: 10, color: "#f59e0b" },
  { name: "Leave", value: 7, color: "#6b7280" },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/workerDashboard" },
  { label: "Profile", icon: User, path: "/workerProfile" },
  { label: "Complain", icon: MessageSquareWarning, path: "/workerComplain" },
  { label: "Status", icon: Activity, path: "/workerStatus" },
];

export default function WorkerDashboard() {

  const [activeNav, setActiveNav] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-gray-900 flex flex-col justify-between py-6 px-3 shrink-0">
        {/* Logo */}
        <div>
          <div className="mb-8 px-2">
            <span className="text-white text-xl font-bold tracking-tight">
              Help<span className="text-green-400">Ghar.</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, icon: Icon, path}) => (
              <button
                key={label}
                onClick={() => {setActiveNav(label); navigate(path || "/workerDashboard")}}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${
                  activeNav === label
                    ? "bg-green-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <button
  onClick={() => navigate("/NoMatch")}
  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-gray-800 transition-all w-full"
>
  <LogOut size={16} />
  Logout
</button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-gray-400">Good Morning</p>
            <p className="text-sm font-semibold text-gray-800">Zohaib Ali</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
              Switch to Hiring
            </button>
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ZA
              </div>
              <span className="text-sm font-medium text-gray-700">
                Zohaib Ali
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold text-gray-800">
              Worker Dashboard
            </h1>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-green-600 transition-all">
                This Year
              </button>
              <button className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-md font-medium flex items-center gap-1 hover:bg-gray-50 transition-all">
                <Download size={12} />
                Export
              </button>
            </div>
          </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Available Job Postings */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Available job posting
              </p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-800">23</span>
                <TrendingUp size={28} className="text-green-500 mb-1" />
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Recomended Jobs
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <Car size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">Driver</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />
                    <span>Karachi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Balance */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Wallet Balance
              </p>
              <p className="text-3xl font-bold text-gray-800">$ 2500</p>
              <p className="text-xs text-gray-400 mt-1">Earnings Summary</p>
            </div>
          </div>

          {/* Middle Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Number of Requests */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Number of requests
              </p>
              <p className="text-3xl font-bold text-gray-800">71</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-green-500 font-semibold">
                  10% increase
                </span>
                <span className="text-xs text-gray-400">Last month</span>
              </div>
            </div>

            {/* Number of Jobs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Number of Jobs
              </p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-gray-800">45</p>
                <CheckCircle2 size={28} className="text-green-500" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-green-500 font-semibold">
                  10% increase
                </span>
                <span className="text-xs text-gray-400">Last month</span>
              </div>
            </div>

            {/* Incentives & Discounts */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Incentives &amp; Discounts
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <Trophy size={14} className="text-yellow-500 shrink-0" />
                  Milestones
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <Gift size={14} className="text-green-500 shrink-0" />
                  Festivals Bonus
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <Tag size={14} className="text-blue-500 shrink-0" />
                  Discount codes
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Attendance Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Attendance Overview
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={72}
                      dataKey="value"
                      stroke="none"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2">
                  {attendanceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-gray-500">{item.name}</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto pl-4">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Performance
              </p>
              <p className="text-xs text-gray-400 mb-4">2025</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={performanceData}
                  barSize={14}
                  margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => v.slice(0, 3)}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8,
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                    formatter={(value: number) => [value, "Score"]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {performanceData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.value >= 4 ? "#22c55e" : "#86efac"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}