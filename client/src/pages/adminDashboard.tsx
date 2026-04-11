import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  ShieldAlert,
  BarChart2,
  LogOut,
  Bell,
  TrendingUp,
  FileText,
  CheckCircle,
  Pencil,
  Ban,
  KeyRound,
  Briefcase,
  CreditCard,
  Wallet,
  ClipboardList,
  Activity,
  Download,
  Gift,
  Tag,
  LineChart,
  ChevronDown,
} from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/adminDashboard" },
  { label: "User Management", icon: Users, path: "/adminUserManagementPage" },
  { label: "Profile", icon: User, path: "/adminProfile" },
  { label: "Resolve Dispute", icon: ShieldAlert, path: "/adminResolveDisputePage" },
  { label: "Incentives", icon: BarChart2, path: "/adminIncentivesPage" },
];

const chartData = [
  { name: "Total registered\nusers\n(owners/workers)", value: 1234 },
  { name: "Revenue\n(Transaction\nvolume)", value: 12345 },
  { name: "Dispute Pending", value: 200 },
  { name: "Orders", value: 9 },
  { name: "Pending\nVerification", value: 18 },
  { name: "Active Jobs\ncontracts", value: 56 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-gray-800 flex flex-col justify-between py-6 px-3 shrink-0">
        <div>
          <div className="mb-8 px-2">
            <span className="text-white text-xl font-bold tracking-tight">
              Help<span className="text-green-400">Ghar.</span>
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => {
                  setActiveNav(label);
                  navigate(path);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${
                  activeNav === label
                    ? "bg-green-500 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-gray-700 transition-all w-full">
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-gray-400">Good Morning</p>
            <p className="text-sm font-semibold text-white">Bilal Iqbal</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
                BI
              </div>
              <span className="text-sm font-medium text-white">Bilal Iqbal</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-green-600 transition-all">
                <ChevronDown size={13} />
                This Month
              </button>
              <button className="border border-gray-300 bg-white text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-50 transition-all">
                Export
              </button>
            </div>
          </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {/* Total Registered Users */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">
                Total registered users (owners/workers)
              </p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">1,234</span>
                <TrendingUp size={22} className="text-green-500 mb-1" />
              </div>
            </div>

            {/* Pending Verification */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">Pending Verification</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">18</span>
                <TrendingUp size={22} className="text-green-500 mb-1" />
              </div>
            </div>

            {/* User Management */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm row-span-2">
              <p className="text-sm font-bold text-gray-900 mb-3">User Management</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: Users, label: "View all users", color: "text-green-500" },
                  { icon: CheckCircle, label: "Approved requests", color: "text-green-500" },
                  { icon: Pencil, label: "Update or delete", color: "text-green-500" },
                  { icon: Ban, label: "Suspend or block", color: "text-red-400" },
                  { icon: KeyRound, label: "Reset credentials", color: "text-green-500" },
                ].map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-all text-left"
                  >
                    <Icon size={15} className={`${color} shrink-0`} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Second Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {/* Active Jobs */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">Active Jobs contracts</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">56</span>
                <TrendingUp size={22} className="text-green-500 mb-1" />
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">Revenue (Transaction volume)</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">$12,345</span>
                <TrendingUp size={22} className="text-green-500 mb-1" />
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">Orders</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">9</span>
                <TrendingUp size={22} className="text-green-500 mb-1" />
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Left: 4 feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Job & Contracts */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-3">Job & Contracts</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: FileText, label: "View all jobs" },
                    { icon: CheckCircle, label: "Approved requests" },
                    { icon: LineChart, label: "Track contracts" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all text-left">
                      <Icon size={15} className="text-green-500 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-3">Payment</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: CreditCard, label: "Manage transaction" },
                    { icon: Wallet, label: "Monitor wallets" },
                    { icon: CheckCircle, label: "Approved payments" },
                    { icon: ClipboardList, label: "Generate reports" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all text-left">
                      <Icon size={15} className="text-green-500 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analytics & Logs */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-3">Analytics & Logs</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: Activity, label: "Platform activity" },
                    { icon: Download, label: "Exports reports" },
                    { icon: BarChart2, label: "Audit logs" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all text-left">
                      <Icon size={15} className="text-green-500 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Incentives & Discounts */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-3">Incentives & Discounts</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: Gift, label: "Festives bonus" },
                    { icon: Tag, label: "Discount codes" },
                    { icon: LineChart, label: "Track usage" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-all text-left">
                      <Icon size={15} className="text-green-500 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Revenue Performance Chart */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-1">Revenue performance</p>
              <p className="text-xs text-gray-400 mb-4 text-right">Sales</p>
              <ResponsiveContainer width="100%" height={260}>
                <ReLineChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)},000` : v
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8,
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                    formatter={(value: number) => [value.toLocaleString(), "Value"]}
                  />
                  <Line
                    type="linear"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}