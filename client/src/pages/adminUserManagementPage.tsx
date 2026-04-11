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
  Plus,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/adminDashboard" },
  { label: "User Management", icon: Users, path: "/adminUserManagementPage" },
  { label: "Profile", icon: User, path: "/adminProfile" },
  { label: "Resolve Dispute", icon: ShieldAlert, path: "/adminResolveDisputePage" },
  { label: "Incentives", icon: BarChart2, path: "/adminIncentivesPage" },
];

type VerificationStatus = "Verified" | "Pending" | "Suspend";
type ActionType = "Approved" | "Reset" | "Delete" | "Suspend";

interface UserRow {
  id: number;
  name: string;
  role: "Worker" | "Owner";
  status: "Active" | "Inactive";
  verification: VerificationStatus;
  action: ActionType;
  initials: string;
  avatarColor: string;
}

const initialUsers: UserRow[] = [
  { id: 1, name: "Ali Khan",    role: "Worker", status: "Active", verification: "Verified", action: "Approved", initials: "AK", avatarColor: "bg-blue-400" },
  { id: 2, name: "Sara Malik",  role: "Owner",  status: "Active", verification: "Pending",  action: "Approved", initials: "SM", avatarColor: "bg-pink-400" },
  { id: 3, name: "Ahmed Raza",  role: "Worker", status: "Active", verification: "Verified", action: "Reset",    initials: "AR", avatarColor: "bg-gray-500" },
  { id: 4, name: "Sami Khan",   role: "Owner",  status: "Active", verification: "Pending",  action: "Approved", initials: "SK", avatarColor: "bg-indigo-400" },
  { id: 5, name: "Asif Ahmed",  role: "Worker", status: "Active", verification: "Suspend",  action: "Delete",   initials: "AA", avatarColor: "bg-orange-400" },
  { id: 6, name: "Ramsha Ali",  role: "Worker", status: "Active", verification: "Pending",  action: "Approved", initials: "RA", avatarColor: "bg-rose-400" },
  { id: 7, name: "Usman Ali",   role: "Worker", status: "Active", verification: "Suspend",  action: "Suspend",  initials: "UA", avatarColor: "bg-teal-400" },
];

const verificationColor: Record<VerificationStatus, string> = {
  Verified: "text-green-500",
  Pending:  "text-yellow-500",
  Suspend:  "text-red-500",
};

const actionStyle: Record<ActionType, string> = {
  Approved: "bg-green-500 hover:bg-green-600 text-white",
  Reset:    "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
  Delete:   "bg-red-500 hover:bg-red-600 text-white",
  Suspend:  "bg-yellow-500 hover:bg-yellow-600 text-white",
};

export default function AdminUserManagementPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("User Management");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Newest" | "Oldest">("Newest");
  const [users, setUsers] = useState<UserRow[]>(initialUsers);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (id: number) => {
    // placeholder — wire up to API
    console.log("Action clicked for user id:", id);
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
                onClick={() => { setActiveNav(label); navigate(path); }}
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

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-5xl mx-auto">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
                  <Plus size={15} />
                  Add User
                </button>
                <button
                  onClick={() => setFilter(filter === "Newest" ? "Oldest" : "Newest")}
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  {filter}
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="text-sm font-semibold px-5 py-3 text-center rounded-tl-xl">Name</th>
                    <th className="text-sm font-semibold px-5 py-3 text-center">Role</th>
                    <th className="text-sm font-semibold px-5 py-3 text-center">Status</th>
                    <th className="text-sm font-semibold px-5 py-3 text-center">Verification</th>
                    <th className="text-sm font-semibold px-5 py-3 text-center rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {/* Name */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {user.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-800">{user.name}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-3 text-center text-sm text-gray-700">
                        {user.role}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3 text-center text-sm text-gray-700">
                        {user.status}
                      </td>

                      {/* Verification */}
                      <td className={`px-5 py-3 text-center text-sm font-semibold ${verificationColor[user.verification]}`}>
                        {user.verification}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button className="bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all">
                            View
                          </button>
                          <button
                            onClick={() => handleAction(user.id)}
                            className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${actionStyle[user.action]}`}
                          >
                            {user.action}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}