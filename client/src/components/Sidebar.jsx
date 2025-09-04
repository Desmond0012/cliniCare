import Logo from "./Logo";
import { NavLink, useLocation, useNavigate } from "react-router"; // Assume you create this
import { navLinks, roleBasedPathPermissions } from "@/utils/Constants";
import Logout from "./Logout";
import { useEffect } from "react";


export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const roles = ["patient", "doctor", "admin", "nurse", "staff"];
  // match user role based of our roles array using the find method
  const userRole = roles.find((role) => role === user?.role);
  const isAuthorized =
    (userRole === "admin" && roleBasedPathPermissions.admin.allowedSubpaths) ||
    (userRole === "doctor" &&
      roleBasedPathPermissions.doctor.allowedSubpaths) ||
    (userRole === "patient" &&
      roleBasedPathPermissions.patient.allowedSubpaths) ||
    (userRole === "nurse" && roleBasedPathPermissions.nurse.allowedSubpaths) ||
    (userRole === "staff" && roleBasedPathPermissions.staff.allowedSubpaths);
    
    // console.log(userRole);
    useEffect(() => {
    const allowedPaths =
      roleBasedPathPermissions[userRole]?.allowedSubpaths || [];
    const isPathAllowed = allowedPaths.includes(path);
    if (!isAuthorized || !isPathAllowed) {
      navigate("/dashboard");
    }
  }, [isAuthorized, navigate, path, userRole]);
  return (
    <div className="hidden lg:block fixed z-50 min-h-screen w-[200px] bg-slate-100 pt-5 mx-4 ">
      <div className="pb-6">
        <Logo />
      </div>

      {/* Nav Links (Scrollable) */}
      <div className="overflow-y-auto h-[calc(100vh-150px)] space-y-4 p-1">
        {navLinks.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-gray-500 mb-4">
              {section.title === "Management" && userRole === "patient"
                ? ""
                : section.title}
            </p>
            <div className="space-y-1">
              {section.links
                .filter((subPaths) => {
                  if (
                    roleBasedPathPermissions[userRole] &&
                    isAuthorized.includes(subPaths.to)
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.to}
                    className={({ isActive }) =>
                       ` flex gap-2 py-2 px-4 ${
                        isActive || path.split("/")[2] === link.to
                          ? "bg-blue-100 text-blue-500 font-bold rounded-full "
                          : "text-black"
                      }`
                    }
                    viewTransition
                    end
                  >
                    <link.Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
}

// Sidebar.jsx
// import { Link } from "react-router-dom";

// import { FaCalendarAlt, FaBed, FaMoneyBillWave, FaUserMd, FaUsers, FaHospitalUser, FaUser, FaCog, FaSignOutAlt, FaThLarge } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <div className="w-60 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col justify-between">
//       <div>
//         {/* Menu */}
//         <ul className="p-4 space-y-1">
//           {/* Dashboard */}
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-blue-500 bg-blue-100">
//             <FaThLarge size={18} />
//             <span className="font-medium">Dashboard</span>

//             <Link
//             to={"/dashboard"}
//             className="text-blue-500 font-bold text-sm py-2"
//           >
//             ?
//           </Link>
//           </li>

//           {/* Appointments */}
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaCalendarAlt size={18} />
//             <span>Appointments</span>
//             <Link
//               to={"/appointments"}
//               className="text-blue-500 font-bold text-sm py-2"/>
//           </li>

//           {/* Rooms */}
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaBed size={18} />
//             <span>Rooms</span>
//           </li>

//           {/* Payments */}
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaMoneyBillWave size={18} />
//             <span>Payments</span>
//           </li>

//           {/* Management Section */}
//           <p className="mt-4 mb-1 text-xs text-gray-400 uppercase tracking-wider">Management</p>
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaUserMd size={18} />
//             <span>Doctors</span>
//           </li>
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaUsers size={18} />
//             <span>Patients</span>
//           </li>
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaHospitalUser size={18} />
//             <span>Inpatients</span>
//           </li>

//           {/* Setting Section */}
//           <p className="mt-4 mb-1 text-xs text-gray-400 uppercase tracking-wider">Setting</p>
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaUser size={18} />
//             <span>Users</span>
//           </li>
//           <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
//             <FaCog size={18} />
//             <span>Setting</span>
//           </li>
//         </ul>`
//       </div>

//       {/* Logout */}
//       <div className="p-4">
//         <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-2 rounded-lg w-full">
//           <FaSignOutAlt size={18} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
