import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLockFill } from "@remixicon/react";
import ErrorAlert from "@/components/ErrorAlert";
import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validatedResetSchema } from "@/utils/dataSchema";
import useMetaArgs from "@/hooks/useMeta";
import { useNavigate, useSearchParams } from "react-router";

export default function ResetPassword() {
  useMetaArgs({
    title: "Reset Password-Clincare",
    description: "reset your clinicare password",
    keywords: "Health, Reset, Clinic, Hospital",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validatedResetSchema),
  });
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //look for value on our url base
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  console.log({ email });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (Response) => {
      toast.success(Response?.data?.message);
      navigate("/account/signin");
    },
    onError: (error) => {
      console.log(error);
      setError(error?.Response?.data?.message);
    },
  });
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (data) => {
    const userData = { ...data, email, token };
    mutation.mutate(userData);
  };

  return (
    <>
      <div className=" flex items-center justify-center min-h-[93vh] gap-2 ">
        <form action="" className="mt-20" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-white border-base-300 rounded-xl shadow-lg w-[22rem] md:w-sm border p-5  ">
            <div className="flex flex-col items-center gap-2 pb-2">
              <div className="border rounded-full h-10 w-10 border-blue-500 shadow-lg">
                <RiLockFill size={36} className="text-blue-500 p-2" />
              </div>
              <h1 className="text-2xl font-bold">Create New Password</h1>
              <p class="text-gray-600 text-center text-[0.95rem] ">
                Please enter a new password. Your new password must be different
                from your previous password.
              </p>
            </div>
            {error && <ErrorAlert error={error} />}

            <div>
              <label className="label font-bold text-black ">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  {...register("password")}
                  id="password"
                />
                <button
                  type="button"
                  className="absolute top-1/4 right-3  cursor-pointer semi-bold"
                  onClick={togglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="label font-bold text-black ">
                {" "}
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input w-full"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  id="password"
                />
                <button
                  type="button"
                  className="absolute top-1/4 right-3  cursor-pointer semi-bold"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              className="btn bg-[#2B7FFF] hover:bg-[#1E5FCC] mt-4 text-white"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending
                ? "Resting..."
                : "Reset Password"}
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
