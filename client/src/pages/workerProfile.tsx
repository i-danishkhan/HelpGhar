import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GigModal from "../components/GigModal";
import {
  LayoutDashboard,
  User,
  MessageSquareWarning,
  Activity,
  LogOut,
  Bell,
  KeyRound,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/workerDashboard" },
  { label: "Profile", icon: User, path: "/workerProfile" },
  { label: "Complain", icon: MessageSquareWarning, path: "/workerComplain" },
  { label: "Status", icon: Activity, path: "/workerStatus" },
];



export default function WorkerProfile() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Profile");
  const [twoFactor, setTwoFactor] = useState(true);
  const [showModal, setShowModal] = useState(false);
const [gigData, setGigData] = useState({
  title: "",
  description: "",
  price: "",
  category: "",
});

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 bg-gray-800 flex flex-col justify-between py-6 px-3 shrink-0">
        <div>
          <div className="mb-8 px-2">
            <span className="text-[#E9FFF1] text-xl font-bold tracking-tight">
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${activeNav === label
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
        <button className="flex items-center gap-2 text-gray-400 hover:text-[#E9FFF1] text-sm px-3 py-2 rounded-lg hover:bg-gray-700 transition-all w-full">
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
            <p className="text-sm font-semibold text-[#E9FFF1]">Zohaib Ali</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-600 text-[#E9FFF1] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-500 transition-all">
              Switch to Hiring
            </button>
            <button className="relative text-gray-400 hover:text-[#E9FFF1]">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-[#E9FFF1] text-xs font-bold">
                ZA
              </div>
              <span className="text-sm font-medium text-[#E9FFF1]">Zohaib Ali</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-##E9FFF1 rounded-2xl shadow-sm border border-gray-100 p-6 max-w-5xl mx-auto">

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#e5e7eb" />
                    <circle cx="40" cy="30" r="14" fill="#9ca3af" />
                    <ellipse cx="40" cy="70" rx="22" ry="18" fill="#ef4444" />
                    <ellipse cx="40" cy="85" rx="28" ry="20" fill="#9ca3af" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Zohaib Ali</h2>
                  <p className="text-sm text-gray-500 mb-2">Worker</p>
                  <span className="bg-green-500 text-[#E9FFF1] text-xs font-semibold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg"
              >
                Display Gig
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Personal Info */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Personal Info</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Full Name:", value: "Zohaib Ali" },
                    { label: "Email:", value: "zohaib12@gmail.com" },
                    { label: "Phone Number:", value: "03357891234" },
                    { label: "CNIC / ID:", value: "42101-279069-9" },
                    { label: "Address:", value: "North Karachi Sector 5C-1" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-gray-800 font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Info */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Account Info</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Username:", value: "zohaibali777", bold: false },
                    { label: "Role:", value: "Owner", bold: true },
                    { label: "Last Login:", value: "1/9/2025", bold: false },
                    { label: "Created on:", value: "Jan 15, 2020", bold: true },
                  ].map(({ label, value, bold }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className={`text-gray-800 ${bold ? "font-bold" : "font-medium"}`}>{value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Account Status:</span>
                    <span className="bg-green-500 text-[#E9FFF1] text-xs font-semibold px-3 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Security Settings</h3>
                <div className="flex flex-col gap-4">
                  <button className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-all w-full text-left">
                    <KeyRound size={16} className="text-gray-500 shrink-0" />
                    Change Password
                  </button>
                  <button className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-all w-full text-left">
                    <RefreshCcw size={16} className="text-gray-500 shrink-0" />
                    Reset Credentials
                  </button>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <ShieldCheck size={16} className="text-gray-800 shrink-0" />
                      Enable Two - Factor Authentication
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${twoFactor ? "bg-blue-500" : "bg-gray-300"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${twoFactor ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Section */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">Account Section</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-[#E9FFF1] text-sm font-semibold px-5 py-2 rounded-lg transition-all">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-[#E9FFF1] text-sm font-semibold px-5 py-2 rounded-lg transition-all">
                      Suspend Account
                    </button>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-[#E9FFF1] text-sm font-semibold px-5 py-2 rounded-lg transition-all w-fit">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      <GigModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}