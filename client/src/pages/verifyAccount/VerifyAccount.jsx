import useMetaArgs from "@/hooks/useMeta";
import { RiMailFill } from "@remixicon/react";
import React, { useEffect, useState } from "react";
import PinField from "react-pin-field";
import { toast } from "sonner";
import { verifyAccount, resendVerificationCode } from "@/api/auth";
import { useAuth } from "@/contextStore/Index";
import { useNavigate } from "react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ErrorAlert from "@/components/ErrorAlert";

export default function VerifyAccount() {
  useMetaArgs({
    title: "Verify Account - Clincare",
    description: "Verify your Clincare account.",
    keywords: "Clinicare, verify, account",
  });
  const [verificationToken, setVerificationToken] = useState("");
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { accessToken, user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const TIMER_STORAGE_KEY = "verification_time_end";

  useEffect(() => {
    const savedEndTime = localStorage.getItem(TIMER_STORAGE_KEY);
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Math.floor(Date.now() / 1000);
      const remaining = Math.max(0, endTime - now);

      if (remaining > 0) {
        setTimer(remaining);
        setIsResendDisabled(true);
      } else {
        localStorage.removeItem(TIMER_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1 && interval !== null) {
            setIsResendDisabled(false);
            clearInterval(interval);
            localStorage.removeItem(TIMER_STORAGE_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const mutation = useMutation({
    mutationFn: verifyAccount,
    onSuccess: (response) => {
      toast.success(
        response?.data?.message || "Account verified successfully!"
      );
      queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      setSuccess(true);
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Account verification failed");
    },
  });

  const sendResendToken = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Verification token sent");
    },
    onError: (error) => {
      console.log(error);
      setError(error?.response?.data?.message || "Verification code failed");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ verificationToken, accessToken });
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    const newTimer = 120;
    setTimer(newTimer);
    const endTime = Math.floor(Date.now() / 1000) + newTimer;
    localStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
    if (!accessToken) {
      toast.error("Session expired. Please refresh the page and try again.");
      return;
    }
    sendResendToken.mutate(accessToken);
  };

  return (
    <>
      {success || user?.isVerified ? (
        <div className="p-4 max-w-[800px] mx-auto text-center">
          <img src="/Success.svg" alt="success" className="w-full h-full" />
          <h1 className="text-2xl font-bold">Congratulations!</h1>
          <p className="text-gray-600">
            {user?.isVerified
              ? "Your account has already been verified."
              : "Your account has been verified successfully."}
          </p>
          <button
            className="btn my-4 bg-blue-500 blue:bg-indigo-400 hover:bg-indigo-600 text-white cursor-pointer"
            size="lg"
            onClick={() => navigate("/", { replace: true })}
          >
            Go back to home
          </button>
        </div>
      ) : (
        <div className="bg-white border-base-300 rounded-xl w-full max-w-[350px] md:max-w-[400px] border p-4 flex flex-col justify-center gap-2 shadow-lg">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="border rounded-full h-10 w-10 border-blue-500 p-2 shadow-lg">
                <RiMailFill size={23} className="text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <p className="text-gray-600 text-base text-center">
                Did not receive a code? or Code expired
              </p>
              <div className="my-10 w-full ">
                {error && <ErrorAlert error={error} />}
                <PinField
                  length={6}
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  dir="ltr"
                  pattern="[0-9]"
                  type="text"
                  value={verificationToken}
                  onChange={(value) => setVerificationToken(value)}
                  className="w-[50px] sm:w-[58px] text-center border border-gray-300 rounded-md p-2 font-bold my-2"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <button
                className="btn bg-blue-500 w-full text-white rounded-md hover:bg-blue-600"
                type="submit"
                disabled={verificationToken.length !== 6 || mutation.isPending}
              >
                {mutation.isPending ? "verifying..." : "verify"}
              </button>
              <p className="text-gray-500 text-center text-base">
                Did not receive a code? or Code expired?
              </p>
              <button
                onClick={handleResendCode}
                disabled={isResendDisabled}
                className={`btn bg-blue-500 hover:bg-blue-600 text-white rounded-md ${
                  isResendDisabled
                    ? "text-black cursor-not-allowed"
                    : "text-white"
                }`}
                type="button"
              >
                {isResendDisabled ? `Resend in ${timer}s` : "Resend Code"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
