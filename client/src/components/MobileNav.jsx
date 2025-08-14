import Logo from "./Logo";
import Drawer from "./Drawer";



export default function MobileNav() {
  return (
    <>
     <div className=" lg:hidden  fixed top-0 left-0 right-0 z-50 bg-[#F3F7FF] border-b-[1px] border-[#DAD7D7E5]  ">
        <div className="container mx-auto py-5 px-4  lg:py-[20px] lg:px-[100px] flex justify-between items-center  ">
          <Logo classname="" />
          <ul className=" hidden     lg:flex justify-center items-center gap-[64px]   ">
            <li className="cursor-pointer">Features</li>
            <a href="#how-it-works">
              <li className="cursor-pointer">How It Works</li>
            </a>
            <a href="/contact">
              {" "}
              <li>Contact Us</li>
            </a>
          </ul>
          <Drawer/>
        </div>
      </div>

    </>
  )
}

// import React from "react";

// export default function MobileNav() {
//   return (
//     <nav className="flex items-center justify-between bg-white px-4 py-2 shadow md:hidden">
//       <div className="font-bold text-lg">Clinicare</div>
//       {/* Add your mobile menu button or icons here */}
//       <button className="p-2 rounded hover:bg-gray-100">
//         <span className="sr-only">Open menu</span>
//         {/* Hamburger icon */}
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>
//     </nav>
//   );
// }