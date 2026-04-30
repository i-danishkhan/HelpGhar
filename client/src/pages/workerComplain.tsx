import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  MessageSquareWarning,
  Activity,
  LogOut,
  Bell,
} from "lucide-react";


const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/workerDashboard" },
  { label: "Profile", icon: User, path: "/workerProfile" },
  { label: "Complain", icon: MessageSquareWarning, path: "/workerComplain" },
  { label: "Status", icon: Activity, path: "/workerStatus" },
];

export default function WorkerComplain() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Complain");
  const [form, setForm] = useState({
    customerName: "",
    idNumber: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Complaint submitted:", form);
  };

  return (
    <div className="flex h-screen bg-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-gray-900 flex flex-col justify-between py-6 px-3 shrink-0">
        {/* Logo */}
        <div>
          <div className="mb-8 px-2">
            <span className="text-[#E9FFF1] text-xl font-bold tracking-tight">
              Help<span className="text-green-400">Ghar.</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => {setActiveNav(label); navigate(path || "/workerDashboard")}}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${
                  activeNav === label
                    ? "bg-green-500 text-[#E9FFF1]"
                    : "text-gray-400 hover:bg-gray-900 hover:text-[#E9FFF1]"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 text-gray-400 hover:text-[#E9FFF1] text-sm px-3 py-2 rounded-lg hover:bg-gray-900 transition-all w-full">
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-gray-900 border-b border-gray-700 px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-gray-400">Good Morning</p>
            <p className="text-sm font-semibold text-[#E9FFF1]">Zohaib Ali</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-700 text-[#E9FFF1] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-600 transition-all">
              Switch to Hiring
            </button>
            <button className="relative text-gray-400 hover:text-[#E9FFF1]">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#E9FFF1] text-xs font-bold">
                ZA
              </div>
              <span className="text-sm font-medium text-[#E9FFF1]">Zohaib Ali</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 flex items-start justify-center bg-white">
          {/* #E9FFF1 Card */}
          <div className="bg-#E9FFF1 rounded-2xl shadow-xl w-full max-w-2xl p-8 mt-4">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Add Complain/Feedback
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Row: Customer Name + ID Number */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={form.idNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 font-medium">
                  Reason
                </label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  rows={6}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-[#E9FFF1] text-sm font-semibold px-8 py-2.5 rounded-lg transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}