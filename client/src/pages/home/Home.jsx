import {
  RiBuildingLine,
  RiGroupLine,
  RiHeartPulseLine,
  RiPulseLine,
  RiShieldLine,
  RiUserLine,
} from "@remixicon/react";
import useMetaArgs from "@/hooks/useMeta";
import { Link } from "react-router";

export default function Home() {
  useMetaArgs({
    title: "Home, Clinicare",
    description: "Welcome to your clinicarte hjjdk",
    keywords: "Health, Cliinc, Hospital",
  });
  return (
    <>
      <div className="pt-50  px-4  min-h-[750px] bg-gradient-to-b from-[#E2EBFF] to-[#E5EDFF] flex flex-col justify-center items-center ">
        <h1 class="text-[30px] md:text-[38px]  font-bold text-center">
          Welcome to <br />
          <span class="text-[#FF5703] text-6xl md:text-[70px]">Clinicare</span>
        </h1>
        <p class="mt-8 text-[#000000] md:w-[680px] lg:w-[790px] h-[58px] text-center md:text-[24px]">
          Manage your hospital operations, patient records, and more with our
          powerful hospital management system.
        </p>
        <div class="mt-20 flex gap-4 items-center">
          <button className="  border rounded-lg py-[10px] px-[10px] md:py-[18px] md:px-[25px] bg-[#2465FF] text-white font-semibold md:text-[20px] hover:bg-blue-500">
            <Link to="/account/signup"> New Patient</Link>
          </button>
          <button className="btn border-blue-500 bg-transparent p-6 font-semibold  text-[#2465FF] hover:bg-slate-300 rounded-lg">
            <Link to="/account/signin">Login to Clinicare</Link>
          </button>
        </div>
        <div className=" max-w-[867px] md:w-[700px]  lg:w-[867px]  pt-20 ">
          <img src="Free iPad.png" alt="hero-icon" />
        </div>
      </div>

      <div className=" my-10 container mx-auto py-12 px-4  " id="Features">
        <div className=" md:max-w-[865px] mx-auto ">
          <h1 className="text-2xl md:text-[36px] text-[#130A5C] font-bold text-center">
            Key Features to Simplify Hospital Management
          </h1>
          <p className="pt-2 text-center md:text-[22px] ">
            Comprehensive tools designed to enhance efficiency, improve patient
            care, and streamline hospital operations.
          </p>
        </div>

        <div class="max-w-[1280px] mx-auto px-4">
          <div class="mt-8 grid grid-cols-12 gap-4">
            {/* <!-- Card 1 --> */}
            <div class="col-span-12 md:col-span-4 bg-white p-[40px] pb-4 gap-[24px] min-h-[296px] w-full border-[1px] border-[#C7C4C4] rounded-lg shadow-lg flex flex-col items-start justify-start text-start">
              <div>
                <img src="Frame 19.png" alt="user" />
              </div>
              <h2 class="text-[24px] font-semibold">Appointment Scheduling</h2>
              <p class="text-zinc-800 mb-4">
                Let patients book and reschedule appointments easily online with
                real-time availability and automated confirmations.
              </p>
            </div>

            {/* <!-- Card 2 --> */}
            <div class="col-span-12 md:col-span-4 bg-white p-[40px] pb-4 gap-[24px] min-h-[296px] w-full border-[1px] border-[#C7C4C4] rounded-lg shadow-lg flex flex-col items-start justify-start text-start">
              <div>
                <img src="Frame 20.png" alt="user" />
              </div>
              <h2 class="text-[24px] font-semibold">
                Doctor & Department Management
              </h2>
              <p class="text-zinc-800 mb-4">
                Manage staff availability, departmental organization, and
                resource allocation efficiently.
              </p>
            </div>

            {/* <!-- Card 3 --> */}
            <div class="col-span-12 md:col-span-4 bg-white p-[40px] pb-4 gap-[24px] min-h-[296px] w-full border-[1px] border-[#C7C4C4] rounded-lg shadow-lg flex flex-col items-start justify-start text-start">
              <div>
                <img src="Frame 21.png" alt="user" />
              </div>
              <h2 class="text-[24px] font-semibold">Analytics Dashboard</h2>
              <p class="text-zinc-800 mb-4">
                Get real-time insights into bookings, patient visits, revenue,
                and operational performance.
              </p>
            </div>

            {/* <!-- Card 4 --> */}
            <div class="col-span-12 md:col-span-4 bg-white p-[40px] pb-4 gap-[24px] min-h-[296px] w-full border-[1px] border-[#C7C4C4] rounded-lg shadow-lg flex flex-col items-start justify-start text-start">
              <div>
                <img src="Frame 22.png" alt="user" />
              </div>
              <h2 class="text-[24px] font-semibold">Billing & Invoicing</h2>
              <p class="text-zinc-800 mb-4">
                Generate invoices, track payments, and integrate with insurance
                providers seamlessly.
              </p>
            </div>

            {/* <!-- Card 5 --> */}
            <div class="col-span-12 md:col-span-4 bg-white p-[40px] pb-4 gap-[24px] min-h-[296px] w-full border-[1px] border-[#C7C4C4] rounded-lg shadow-lg flex flex-col items-start justify-start text-start">
              <div>
                <img src="Frame 23.png" alt="user" />
              </div>
              <h2 class="text-[24px] font-semibold">Automated Reminders</h2>
              <p class="text-zinc-800 mb-4">
                Send SMS and email alerts for appointments, follow-ups, and
                medication reminders automatically.
              </p>
            </div>

            {/* <!-- Card 6 --> */}
            <div class="col-span-12 md:col-span-4 bg-white p-[40px] pb-4 gap-[24px] min-h-[296px] w-full border-[1px] border-[#C7C4C4] rounded-lg shadow-lg flex flex-col items-start justify-start text-start">
              <div>
                <img src="Frame 24.png" alt="user" />
              </div>
              <h2 class="text-[22px] font-semibold">
                Electronic Medical Records
              </h2>
              <p class="text-zinc-800 mb-4">
                Store, access, and update patient records securely with
                comprehensive digital health documentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}

      <div id="how-it-works" className="my-14 container mx-auto py-5 px-4">
        <h1 className="text-2xl md:text-[36px] font-bold text-[#130A5C] text-center">
          How It Works
        </h1>
        <p className="text-center  md:text-[22px]  max-w-[780px] mx-auto pt-2 mb-15 ">
          Simple steps to transform your hospital management and improve patient
          experience
        </p>
        <div className="flex items-center  lg:items-start flex-col lg:flex-row gap-5 lg:gap-[40px] w-full max-w-[1240px] mx-auto">
          {/* Left Side */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3">
              <img src="Frame 1.png" alt="one" />
              <p className="text-[24px] font-semibold max-w-[511px]">
                Sign Up and Set Up Your Hospital Profile
              </p>
            </div>
            <p className="text-[18px] font-normal max-w-[511px]">
              Add departments, doctors, rooms, and schedules to create a
              comprehensive hospital management system tailored to your
              facility.
            </p>
          </div>

          {/* Vertical Divider (only on large screens) */}
          <div className="hidden lg:block w-[1px] bg-gray-300  h-full min-h-[200px]  "></div>

          {/* Right Side */}
          <div className="flex-1 flex justify-center">
            <img
              src="Frame 31.png"
              alt="section-1"
              className="w-full max-w-[450px] h-auto object-contain"
            />
          </div>
        </div>

        {/* section-2 */}
        <div className="pt-15 flex flex-col-reverse lg:flex-row-reverse  items-center   lg:items-start gap-5 lg:gap-[40px] w-full max-w-[1240px] mx-auto">
          {/* Left Content */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3">
              <img src="Frame 2.png" alt="two" />
              <p className="text-[24px] font-semibold max-w-[511px]">
                Enable Online Booking
              </p>
            </div>
            <p className="text-[18px] font-normal max-w-[511px]">
              Patients can view doctor availability and schedule appointments
              online through an intuitive booking interface available 24/7.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] bg-gray-300  h-full  min-h-[200px] "></div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="Frame 30.png"
              alt="section-2"
              className="w-full max-w-[450px] h-auto object-contain"
            />
          </div>
        </div>

        {/* section-3 */}
        <div className=" mt-15 flex items-center  flex-col     lg:items-start  lg:flex-row gap-5 lg:gap-[40px] w-full max-w-[1240px] mx-auto">
          <div className="flex  flex-col gap-4 flex-1 ">
            <div className="flex items-center gap-3   ">
              <img src="Frame 3.png" alt="three" />
              <p className="text-[24px] font-semibold max-w-[511px] ">
                Manage Appointments And Record
              </p>
            </div>
            <p className="text-[18px] font-normal max-w-[511px]">
              Hospital staff can efficiently manage patient queues, update
              medical records, and send automated reminders from a centralized
              dashboard.
            </p>
          </div>
          <div className="hidden lg:block w-[1px] bg-gray-300  h-full min-h-[200px]"></div>

          <div className="flex-1 flex justify-center">
            <img
              src="Frame 38. png.png"
              alt="section-3"
              className="w-full max-w-[450px] h-auto object-contain"
            />
          </div>
        </div>
        {/* section-4 */}
        <div className="mt-15 flex items-center  flex-col-reverse lg:flex-row-reverse gap-5 lg:gap-[40px] w-full max-w-[1240px] mx-auto">
          <div className="flex  flex-col gap-4 flex-1">
            <div className="flex items-center gap-3   ">
              <img src="Frame 4.png" alt="four" />
              <p className="text-[24px] font-semibold max-w-[511px] ">
                Track Everything In One Dashboard
              </p>
            </div>
            <p className="text-[18px] font-normal max-w-[511px]">
              View comprehensive analytics including appointments, patient data,
              revenue metrics, and performance insights to optimize hospital
              operations.
            </p>
          </div>
          <div className="hidden lg:block w-[1px] bg-gray-300 h-full min-h-[200px]"></div>
          <div className=" flex-1 flex justify-center ">
            <img
              src="Frame 35.png"
              alt="section-4"
              className="w-full max-w-[450px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div class="my-25 py-2 px-4 bg-[#044FFE] ">
        <div class="container mx-auto grid grid-cols-12 gap-4 lg:gap-8">
          <div class="col-span-12 md:col-span-3 text-white p-4 flex flex-col items-center justify-center h-[100px] md:h-[200px] text-center">
            <h1 class="text-4xl font-bold mb-2">100+</h1>
            <p>Hospitals</p>
          </div>
          <div class="col-span-12 md:col-span-3 text-white p-4 flex flex-col items-center justify-center h-[100px] md:h-[200px] text-center">
            <h1 class="text-4xl font-bold mb-2">1000+</h1>
            <p>Healthcare Professionals</p>
          </div>
          <div class="col-span-12 md:col-span-3 text-white p-4 flex flex-col items-center justify-center h-[100px] md:h-[200px] text-center">
            <h1 class="text-4xl font-bold mb-2">1M+</h1>
            <p>Patients Served</p>
          </div>
          <div class="col-span-12 md:col-span-3 text-white p-4 flex flex-col items-center justify-center h-[100px] md:h-[200px] text-center">
            <h1 class="text-4xl font-bold mb-2">99.9%</h1>
            <p>System Uptime</p>
          </div>
        </div>
      </div>
      {/* hospital transformation */}
    </>
  );
}
