import Logo from "@/components/Logo";
import { RiCopyrightFill } from "@remixicon/react";
import { Outlet } from "react-router";


export default function AuthLayout() {
  return (
    <div className="bg-slate-100 flex flex-col min-h-screen">
        <div>
        < Logo/>
        </div>
        <div className="flex flex-grow justify-center items-center px-4">
        <Outlet/>
        </div>
        <div >
            <div className="container mx-auto py-5 px-4">
            {/* hr line css - divider */}
            <div className="flex">
                <RiCopyrightFill size={18}/>
                <span className="text-sm">{new Date().getUTCFullYear()} Clinicare. All rights reserved.
                </span>
            </div>
        </div>
        </div>
    </div>
  )
}
