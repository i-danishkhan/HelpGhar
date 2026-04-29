import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  MessageSquareWarning,
  Activity,
  LogOut,
  Bell,
  CreditCard,
  ArrowRight,
  MessageCircle,
  DollarSign,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/customerDashboard" },
  { label: "Hire Worker", icon: Users, path: "/hireWorker" },
  { label: "Profile", icon: User, path: "/customerProfilePage" },
  { label: "Complain", icon: MessageSquareWarning, path: "/customerComplain" },
  { label: "Status", icon: Activity, path: "/customerStatus" },
];

const recommendedWorkers = [
  { name: "Ahsan Malik", rating: 4.8, initials: "AM", color: "bg-blue-400" },
  { name: "Zeeshan Malik", rating: 4.6, initials: "ZM", color: "bg-orange-400" },
  { name: "Ayesha Ali", rating: 4.9, initials: "AA", color: "bg-pink-400" },
];

const recentHires = [
  { name: "Andrew", role: "Marketer", contract: "1 year contract", initials: "AW", color: "bg-gray-500" },
  { name: "Anderson", role: "Cleaner", contract: "1 year contract", initials: "AN", color: "bg-blue-500" },
  { name: "John", role: "Plumber", contract: "1 year contract", initials: "JO", color: "bg-green-500" },
];

const chartData = [
  { month: "January", value: 5.4 },
  { month: "February", value: 2.5 },
  { month: "March", value: 4.2 },
  { month: "April", value: 3.1 },
  { month: "May", value: 4.3 },
  { month: "June", value: 5 },
  { month: "July", value: 4.5 },
  { month: "August", value: 3.8 },
  { month: "September", value: 4.1 },
  { month: "October", value: 4.7 },
  { month: "November", value: 4.4 },
  { month: "December", value: 4.6 },
];

export default function HouseOwnerDashboard() {
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
            <p className="text-sm font-semibold text-white">Zohaib Ali</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                ZA
              </div>
              <span className="text-sm font-medium text-white">Zohaib Ali</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Wallet Balance */}
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Wallet Balance
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-4">$9000</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg transition-all">
                  Add Balance
                </button>
              </div>

              {/* Wallet & Payment */}
              <div className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all">
                <CreditCard size={20} className="text-gray-700 shrink-0" />
                <span className="text-sm font-semibold text-gray-700">
                  Wallet & Payment
                </span>
              </div>

              {/* Hire Workers */}
              <div className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all">
                <ArrowRight size={20} className="text-gray-700 shrink-0" />
                <span className="text-sm font-semibold text-gray-700">
                  Hire Workers
                </span>
              </div>

              {/* Notifications */}
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                <p className="text-sm font-bold text-gray-800 mb-4">
                  Notifications
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <MessageCircle size={16} className="text-gray-500 shrink-0" />
                    3 requests
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <DollarSign size={16} className="text-gray-500 shrink-0" />
                    5 payments
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Star size={16} className="text-gray-500 shrink-0" />
                    2 ratings
                  </div>
                </div>
              </div>
            </div>

            {/* Middle + Right Columns */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Top Row: Recommended + Recent Hires */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Recommended Workers */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="text-sm font-bold text-gray-800 mb-4">
                    Recommended Workers
                  </p>
                  <div className="flex flex-col gap-3">
                    {recommendedWorkers.map((worker) => (
                      <div
                        key={worker.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full ${worker.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                          >
                            {worker.initials}
                          </div>
                          <span className="text-sm text-gray-800 font-medium">
                            {worker.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star
                            size={13}
                            className="text-yellow-400 fill-yellow-400"
                          />
                          <span className="text-xs font-semibold text-gray-700">
                            {worker.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Hires & Contracts */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="text-sm font-bold text-gray-800 mb-4">
                    Recent Hires & Contracts
                  </p>
                  <div className="flex flex-col gap-3">
                    {recentHires.map((hire) => (
                      <div
                        key={hire.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full ${hire.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                          >
                            {hire.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {hire.name}
                            </p>
                            <p className="text-xs text-gray-400">{hire.role}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 text-right">
                          {hire.contract}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hire Workers By Month Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="text-sm font-bold text-gray-800 mb-4">
                  Hire Workers By Month
                </p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="greenGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4ade80"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4ade80"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={true}
                      horizontal={false}
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => v.slice(0, 3)}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                      domain={[2, 6]}
                      ticks={[2, 3, 4, 5]}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: 11,
                        borderRadius: 8,
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      }}
                      formatter={(value: any) => [value, "Hires"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#22c55e"
                      strokeWidth={2.5}
                      fill="url(#greenGradient)"
                      dot={{ r: 3, fill: "#22c55e", strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#22c55e" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}