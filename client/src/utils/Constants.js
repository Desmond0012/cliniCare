 import { RiBankCardLine, RiCalendarLine, RiDashboardLine, RiGroup3Line, RiGroupLine, RiHotelBedLine, RiMenuLine, RiSettingsLine, RiStethoscopeLine, RiUserLine } from "@remixicon/react";
 import dayjs from "dayjs";


export const bloodGroup = {
  "A+": "A-positive",
  "A-": "A-negative",
  "B+": "B-positive",
  "B-": "B-negative",
  "AB+": "AB-positive",
  "AB-": "AB-negative",
  "O+": "O-positive",
  "O-": "O-negative",
};

export const navLinks = [
  {
    title: "Menu",
    links: [
      { id: 1, label: "Dashboard", to: "/dashboard", Icon: RiDashboardLine },
      { id: 2, label: "Appointments", to: "appointments", Icon: RiCalendarLine },
      { id: 3, label: "Rooms", to: "rooms", Icon: RiHotelBedLine },
      { id: 4, label: "Payments", to: "payments", Icon: RiBankCardLine },
    ],
  },
  {
    title: "Management",
    links: [
      { id: 5, label: "Doctors", to: "doctors", Icon: RiStethoscopeLine },
      { id: 6, label: "Patients", to: "patients", Icon: RiGroupLine },
      { id: 7, label: "InPatients", to: "inpatients", Icon: RiGroup3Line  },
     
    ],
  },
  {
    title: "Setting",
    links: [
      { id: 8, label: "Users", to: "users", Icon: RiUserLine },
      { id: 9, label: "Settings", to: "settings", Icon:RiSettingsLine },
    ],
  },
];

export const userRoles = [

  {
    id: 1,
    title: "Features",
    Path: "/#features",

    

  }
];
 export const headers = (accessToken) => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };
};

export const getTimeBaseGreeting = () =>{
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const formatDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};