import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";
import MobileNav from "@/components/MobileNav"; // Use absolute import for consistency
import { useAuth } from "@/contextStore/Index";

export default function DashboardLayout() {
  const {user} = useAuth();
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-gray-100 border-r">
        <Sidebar user={user} />
      </aside>

      <div className="flex flex-col flex-1">
        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <Navbar user={user} />
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <MobileNav user={user} />
        </div>

        {/* Main Content */}
        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";
// import { Outlet } from "react-router";

// export default function DashboardLayout() {
//   return (
//     <div className="min-h-[100dvh] bg-slate-100 flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="ml-[200px] flex-1">
//         <Navbar  />
//         <Outlet />
//       </div>
//     </div>
//   );
// }
