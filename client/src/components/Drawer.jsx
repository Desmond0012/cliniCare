import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { NavLink } from "react-router";
import { navLinks } from "@/utils/Constants";

export default function Drawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  

  return (
    <div className="lg:hidden">
      <button onClick={toggleDrawer}>
        <RiMenuLine size={24} />
      </button>
      <div
        className={`drawer fixed top-0 left-0 z-50 ${
          open ? "drawer-open" : ""
        }`}
      >
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={toggleDrawer}
        />
        <div className="drawer-side">
          <label
            className="drawer-overlay"
            onClick={() => setOpen(false)}
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-[100vw] p-4 ">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4 "
              type="button"
              onClick={toggleDrawer}
            >
              <RiCloseLine size={24} />
            </button>
            <div className="mb-4 flex gap-2 items-center">
              <div className="avatar gap-2  ">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-800">
                  Dizzy Gilepsy!
                </h2>
                <p>Admin</p>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-150px)] space-y-4 p-1">
              {navLinks.map((section) => (
                <div key={section.title}>
                  <p className="text-xs font-semibold text-gray-500 my-2">
                    {section.title}
                  </p>
                  <div className="space-y-1">
                    {section.links.map((link) => (
                      <NavLink
                        key={link.id}
                        to={link.to}
                        className={({ isActive }) =>
                          ` ${
                            isActive
                              ? "text-blue-500 font-bold bg-blue-100 rounded-full"
                              : ""
                          }  px-2 py-2 flex items-center gap-2 hover:text-blue-500 transition-all duration-300`
                        }
                      >
                        <link.Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
// import { LuCalendar, LuBedDouble, LuCreditCard, LuUsers, LuUser, LuSettings } from "react-icons/lu";
// import { MdOutlineDashboard } from "react-icons/md";
// import { FaUserDoctor } from "react-icons/fa6";

// const Drawer = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Menu Icon */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="p-2 rounded-md hover:bg-gray-100"
//       >
//         <FiMenu size={22} />
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Drawer Panel */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center gap-3">
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="Profile"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <h3 className="font-semibold">Dizzy Gilepsy</h3>
//               <p className="text-sm text-gray-500">Admin</p>
//             </div>
//           </div>
//           <button onClick={() => setIsOpen(false)}>
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* Menu */}
//         <div className="p-4">
//           <p className="text-xs uppercase text-gray-400 mb-2">Menu</p>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-3 bg-blue-50 text-blue-600 p-2 rounded-xl">
//               <MdOutlineDashboard size={18} /> Dashboard
//             </li>
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuCalendar size={18} /> Appointments
//             </li>
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuBedDouble size={18} /> Rooms
//             </li>
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuCreditCard size={18} /> Payments
//             </li>
//           </ul>

//           <p className="text-xs uppercase text-gray-400 mt-5 mb-2">Management</p>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <FaUserDoctor size={18} /> Doctors
//             </li>
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuUsers size={18} /> Patients
//             </li>
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuUsers size={18} /> Inpatients
//             </li>
//           </ul>

//           <p className="text-xs uppercase text-gray-400 mt-5 mb-2">Setting</p>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuUser size={18} /> Users
//             </li>
//             <li className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100">
//               <LuSettings size={18} /> Setting
//             </li>
//           </ul>

//           {/* Logout */}
//           <button className="flex items-center gap-3 text-red-500 mt-6 p-2 rounded-xl hover:bg-red-50">
//             <FiLogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Drawer;
