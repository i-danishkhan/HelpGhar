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
  Search,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/adminDashboard" },
  { label: "User Management", icon: Users, path: "/adminUserManagementPage" },
  { label: "Profile", icon: User, path: "/adminProfile" },
  { label: "Resolve Dispute", icon: ShieldAlert, path: "/adminResolveDisputePage" },
  { label: "Incentives", icon: BarChart2, path: "/adminIncentivesPage" },
];

type DisputeStatus = "Open" | "Resolved";

interface Dispute {
  id: number;
  service: string;
  status: DisputeStatus;
  complain: string;
  personName: string;
  personId: string;
  role: "Owner" | "Worker";
  date: string;
  initials: string;
  avatarColor: string;
}

const initialDisputes: Dispute[] = [
  {
    id: 1,
    service: "Home Tution Service",
    status: "Open",
    complain:
      "He donot come on time, always keep the work remaining donot complete it on time and charges extra amount for normal services.",
    personName: "Abad Khan",
    personId: "ID #12356321454",
    role: "Owner",
    date: "Date: 28 Oct, 2025",
    initials: "AK",
    avatarColor: "bg-blue-400",
  },
  {
    id: 2,
    service: "Driving Service",
    status: "Resolved",
    complain:
      "He donot pay the salary on time and Give me extra work and pay very less amount of salary",
    personName: "Asif Ali",
    personId: "ID #15437321454",
    role: "Worker",
    date: "Date: 28 Oct, 2025",
    initials: "AA",
    avatarColor: "bg-gray-500",
  },
  {
    id: 3,
    service: "Cooking Services",
    status: "Open",
    complain:
      "The food quality was very poor and the cook did not follow the instructions given. Always late and does not maintain hygiene standards.",
    personName: "Nadia Aslam",
    personId: "ID #19823741234",
    role: "Owner",
    date: "Date: 30 Oct, 2025",
    initials: "NA",
    avatarColor: "bg-rose-400",
  },
  {
    id: 4,
    service: "Plumbing Service",
    status: "Resolved",
    complain:
      "The plumber did not fix the issue properly and charged double the agreed amount. The pipe started leaking again the very next day.",
    personName: "Tariq Mehmood",
    personId: "ID #17654321098",
    role: "Worker",
    date: "Date: 01 Nov, 2025",
    initials: "TM",
    avatarColor: "bg-teal-400",
  },
];

export default function AdminResolveDisputePage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Resolve Dispute");
  const [search, setSearch] = useState("");
  const [disputes, setDisputes] = useState<Dispute[]>(initialDisputes);

  const filtered = disputes.filter(
    (d) =>
      d.service.toLowerCase().includes(search.toLowerCase()) ||
      d.personName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Open" ? "Resolved" : "Open" }
          : d
      )
    );
  };

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
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between shrink-0 gap-4">
          <div className="shrink-0">
            <p className="text-xs text-gray-400">Good Morning</p>
            <p className="text-sm font-semibold text-white">Bilal Iqbal</p>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
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
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Complain/Review Lists
          </h1>

          {/* Dispute Cards */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100 max-w-4xl mx-auto overflow-hidden">
            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm text-gray-400">
                No disputes found.
              </div>
            )}

            {filtered.map((dispute) => (
              <div key={dispute.id} className="p-6">
                {/* Service Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {dispute.service}
                  </h2>
                  <button
                    onClick={() => toggleStatus(dispute.id)}
                    className={`text-sm font-semibold px-5 py-1.5 rounded-md transition-all ${
                      dispute.status === "Open"
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {dispute.status}
                  </button>
                </div>

                {/* Complain Label + Text */}
                <p className="text-sm font-bold text-gray-800 mb-1">Complain</p>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {dispute.complain}
                </p>

                {/* Person Info Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${dispute.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {dispute.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {dispute.personName}
                      </p>
                      <p className="text-xs text-gray-500">{dispute.personId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{dispute.role}</p>
                    <p className="text-xs text-gray-400">{dispute.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}