import { useCallback } from "react";
import { doctorsStatusColors, doctorsTableColumns } from "@/utils/Constants";
import TableBody from "@/components/TableBody";

import EditDoctors from "./EditDoctors";

// {doctors}
export default function Table({ doctors }) {
  //only admin has access to edit rooms

  const renderCell = useCallback((doctors, columnKey) => {
    const cellValue = doctors[columnKey];
    switch (columnKey) {
      case "fullname":
        return (
          <>
            <div className="flex items-center gap-1 ">
              <h1 className="font-bold">{doctors?.userId?.fullname}</h1>
            </div>
          </>
        );
      case "phone":
        return <div className="capitalize">{doctors?.phone ? doctors?.phone : "N/A"}</div>;
      case "specialization":
        return <div className="capitalize">{doctors?.specialization}</div>;
      case "availability":
        return (
          <div
            className={`capitalize badge badge-sm font-bold ${
              doctorsStatusColors[doctors?.availability]
            }`}
          >
            {doctors?.availability}
          </div>
        );

      case "action":
        return (
          <div className="">
            <EditDoctors doctors={doctors} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <TableBody
        tableColumns={doctorsTableColumns}
        tableData={doctors}
        renderCell={renderCell}
      />
    </>
  );
}
