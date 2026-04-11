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
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/customerDashboard" },
  { label: "Hire Worker", icon: Users, path: "/hireWorker" },
  { label: "Profile", icon: User, path: "/customerProfilePage" },
  { label: "Complain", icon: MessageSquareWarning, path: "/customerComplain" },
  { label: "Status", icon: Activity, path: "/customerStatus" },
];

type BookingStatus = "In Progress" | "Completed" | "Cancelled";

interface Booking {
  id: number;
  worker: string;
  service: string;
  started: string;
  status: BookingStatus;
}

const initialBookings: Booking[] = [
  {
    id: 1,
    worker: "Bilal Ahmed",
    service: "Cooker",
    started: "01 Oct, 2025",
    status: "In Progress",
  },
  {
    id: 2,
    worker: "Asghar Khan",
    service: "Plumber",
    started: "20 Oct, 2025",
    status: "Completed",
  },
  {
    id: 3,
    worker: "Zohaib Ali",
    service: "Tutor",
    started: "01 Nov, 2025",
    status: "Completed",
  },
];

export default function CustomerStatus() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Status");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleCancel = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
  };

  const getStatusButton = (booking: Booking) => {
    if (booking.status === "Completed") {
      return (
        <button className="bg-green-500 text-white text-sm font-semibold px-8 py-2 rounded-full cursor-default">
          Completed
        </button>
      );
    }
    if (booking.status === "Cancelled") {
      return (
        <button className="bg-gray-400 text-white text-sm font-semibold px-8 py-2 rounded-full cursor-default">
          Cancelled
        </button>
      );
    }
    return (
      <button
        onClick={() => handleCancel(booking.id)}
        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-8 py-2 rounded-full transition-all"
      >
        Cancel
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-48 bg-gray-800 flex flex-col justify-between py-6 px-3 shrink-0">
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
        <main className="flex-1 overflow-y-auto">
          <div className="bg-white min-h-full p-8">
            {/* Booking Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-xl p-6 flex flex-col gap-3 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    Booking
                  </h3>

                  {/* Details */}
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="text-gray-800">
                      <span className="font-bold">Worker:</span> {booking.worker}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-bold">Service:</span> {booking.service}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-bold">Started:</span> {booking.started}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-bold">Status:</span> {booking.status}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center mt-6">
                    {getStatusButton(booking)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}