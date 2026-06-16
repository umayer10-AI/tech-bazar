"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Receipt,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user)

  const pathname = usePathname();
  const router = useRouter();

  let menuItems = [];

  if(user?.role === "seller") {
    menuItems = [
      {
        name: "Overview",
        href: "/dashboard/seller",
        icon: LayoutDashboard,
      },
      {
        name: "Products",
        href: "/dashboard/seller/products",
        icon: Package,
      },
      {
        name: "Transactions",
        href: "/dashboard/seller/transactions",
        icon: Receipt,
      },
    ];
  }

  if(user?.role === "buyer") {
    menuItems = [
      {
        name: "Overview",
        href: "/dashboard/buyer",
        icon: LayoutDashboard,
      },
      {
        name: "Products",
        href: "/dashboard/buyer/products",
        icon: Package,
      },
      {
        name: "Transactions",
        href: "/dashboard/buyer/transactions",
        icon: Receipt,
      },
    ];
  }

  if(user?.role === "admin") {
    menuItems = [
      {
        name: "Overview",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
      },
      {
        name: "User manage",
        href: "/dashboard/admin/manage",
        icon: Package,
      },
      {
        name: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: Receipt,
      },
    ];
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => router.push('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;