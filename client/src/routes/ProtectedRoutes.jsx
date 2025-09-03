import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function PublicRoutes({ children, accessToken }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    if (accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate]);
  return children;
}

export function PrivateRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/account/signin";
  useEffect(() => {
    if (!accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
     if (user && !user.isVerified && location.pathname !== "/verify-account") {
      navigate("/verify-account", {
        state: { from: location },
        replace: true,
      });
    }
    if (
      user &&
      user.isVerified &&
      user.role === "patient" &&
      !user?.isCompletedOnboard &&
      location.pathname !== "/patient-onboard"
    ) {
      navigate("/patient-onboard", {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate, user]);

  return children;
}

export function VerifyRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/account/signin";
  useEffect(() => {
    if (!accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
    if (user && !user.isVerified && location.pathname !== "/verify-account") {
      navigate("/verify-account", {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate, user]);

  return children;
}
