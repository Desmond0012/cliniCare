import { RiErrorWarningLine } from "@remixicon/react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

export default function ErrorAlert({ error }) {
  const navigate = useNavigate();
  const msgs = useMemo(
    () => ["jwt expired", "Your token has expired please login again"],
    []
  );
  useEffect(() => {
    if (msgs.includes(error)) {
      navigate(0);
    }
  }, [error, msgs, navigate]);
  return (
    <>
      {error !== "jwt expired" && (
        <div role="alert" className="alert bg-red-400 text-white">
          <RiErrorWarningLine className="text-white" />
          <span className="text-sm">Error! {error}</span>
        </div>
      )}
    </>
  );
}
