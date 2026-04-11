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
  ChevronDown,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/adminDashboard" },
  { label: "User Management", icon: Users, path: "/adminUserManagementPage" },
  { label: "Profile", icon: User, path: "/adminProfile" },
  { label: "Resolve Dispute", icon: ShieldAlert, path: "/adminResolveDisputePage" },
  { label: "Incentives", icon: BarChart2, path: "/adminIncentivesPage" },
];

interface Worker {
  id: number;
  name: string;
  jobsCompleted: number;
  ratings: number;
}

const monthlyWorkers: Worker[] = [
  { id: 1, name: "Zohaib", jobsCompleted: 16, ratings: 4.9 },
  { id: 2, name: "Faaiz",  jobsCompleted: 15, ratings: 4.8 },
  { id: 3, name: "Burhan", jobsCompleted: 19, ratings: 4.9 },
  { id: 4, name: "Hamza",  jobsCompleted: 14, ratings: 4.7 },
  { id: 5, name: "Usman",  jobsCompleted: 12, ratings: 4.6 },
];

const yearlyWorkers: Worker[] = [
  { id: 1, name: "Zohaib", jobsCompleted: 129, ratings: 4.9 },
  { id: 2, name: "Faaiz",  jobsCompleted: 109, ratings: 4.8 },
  { id: 3, name: "Burhan", jobsCompleted: 90,  ratings: 4.9 },
  { id: 4, name: "Hamza",  jobsCompleted: 85,  ratings: 4.7 },
  { id: 5, name: "Usman",  jobsCompleted: 78,  ratings: 4.6 },
];

const INITIAL_SHOW = 3;

interface IncentiveTableProps {
  title: string;
  workers: Worker[];
  batchLabel: string;
  onAssign: (id: number, name: string) => void;
}

function IncentiveTable({ title, workers, batchLabel, onAssign }: IncentiveTableProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? workers : workers.slice(0, INITIAL_SHOW);

  return (
    <section className="mb-8">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-blue-600 underline text-center mb-4">
        {title}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr>
              <th className="text-sm font-bold text-gray-800 px-4 py-2 text-left">Name</th>
              <th className="text-sm font-bold text-gray-800 px-4 py-2 text-center">Jobs Completed</th>
              <th className="text-sm font-bold text-gray-800 px-4 py-2 text-center">Ratings</th>
              <th className="text-sm font-bold text-gray-800 px-4 py-2 text-center">Provide Batches</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((worker) => (
              <tr key={worker.id} className="border-t border-transparent">
                <td className="text-sm text-gray-800 px-4 py-3">{worker.name}</td>
                <td className="text-sm text-gray-800 px-4 py-3 text-center">{worker.jobsCompleted}</td>
                <td className="text-sm text-gray-800 px-4 py-3 text-center">{worker.ratings}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onAssign(worker.id, worker.name)}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all"
                  >
                    {batchLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More */}
      {workers.length > INITIAL_SHOW && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700 tracking-widest uppercase transition-all"
          >
            {showAll ? "SHOW LESS" : "SHOW MORE"}
            <ChevronDown
              size={13}
              className={`transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </section>
  );
}

export default function AdminIncentivesPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Incentives");
  const [search, setSearch] = useState("");

  const handleAssign = (type: string) => (id: number, name: string) => {
    console.log(`Assigned ${type} batch to ${name} (id: ${id})`);
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
        <main className="flex-1 overflow-y-auto">
          <div className="bg-white min-h-full px-8 py-8 max-w-4xl mx-auto w-full">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Provide Incentives
            </h1>

            {/* Monthly Table */}
            <IncentiveTable
              title="Top Rated Monthly"
              workers={monthlyWorkers}
              batchLabel="Assign Monthly Batch"
              onAssign={handleAssign("monthly")}
            />

            {/* Yearly Table */}
            <IncentiveTable
              title="Top Rated Yearly"
              workers={yearlyWorkers}
              batchLabel="Assign Yearly Batch"
              onAssign={handleAssign("yearly")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}