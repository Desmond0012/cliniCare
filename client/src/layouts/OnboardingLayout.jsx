import Logo from "@/components/Logo"
import Logout from "@/components/Logout";
import { RiCopyrightFill } from "@remixicon/react";
import { Outlet } from "react-router";

export default function OnBoardingLayout() {
  return (
   <div className="bg-slate-100 flex flex-col min-h-screen">
        <div className="container mx-auto py-5 px-4 flex justify-between items-center">
            <Logo/>
          <Logout/>
        </div>
        <div className="flex flex-col flex-grow justify-center items-center gap-6 px-4 py-10">
                    <Outlet/>

        </div>
        <div className="container mx-auto py-5 px-4">
            {/* hr line css - divider */}
            <div className="flex items-center justify-center md:justify-start gap-1">
                <RiCopyrightFill size={18}/>
                <span className="text-sm">{new Date().getFullYear()} Clinicare. All rights reserved.
                </span>
            </div>
        </div>
   </div>
  );
}