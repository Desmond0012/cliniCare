import { RiEyeLine, RiEyeOffLine, RiUser4Fill } from "@remixicon/react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { validateSignInSchema } from "@/utils/dataSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMetaArgs from "@/hooks/useMeta";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore/Index";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";
import { toast } from "sonner";

export default function Login() {
  const [error, setError] = useState(null);
  useMetaArgs({
    title: "Login-Clincare",
    description: "Welcome to your clinicare user",
    keywords: "Health, Login, Clinic, Hospital",
  });
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateSignInSchema),
  });

  const { setAccessToken, user } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      //what you want to do if the api call is a success
      // console.log(response); //remove the response when you are done using it
      toast.success(response?.data?.message || "Login successful");
      setAccessToken(response?.data?.data?.accessToken);
      if (user && !user?.isVerified) {
        navigate("/verify-account");
      }
      //save accessToken
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data); //submitting our form to our mutation function to help us make the api call using our registerUser api
  };

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="bg-white border-base-300 rounded-2xl w-full max-w-[400px] border p-6 flex justify-center ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="border rounded-full h-10 w-10 border-blue-500 shadow-lg">
              <RiUser4Fill size={36} className="text-blue-500 p-2" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 text-base text-center">
              Glad to see you again. Log in to your account
            </p>
          </div>
          {error && <ErrorAlert error={error} />}
          <div>
            <label className="label text-zinc-800 font-bold">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <fieldset className="fieldset relative">
              <label className="label  text-zinc-800 font-bold">Password</label>
              <input
                type={isVisible ? "text" : "password"}
                className="input w-full "
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 top-6 right-2 border-0 cursor-pointer"
                onClick={togglePassword}
              >
                {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>
          <Link
            to={"/ForgotPassword"}
            className="text-blue-500 font-bold text-sm py-2"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-blue-500 mt-4 text-white "
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-sm text-center text-gray-600 py-2 ">
            Don't have an account?{" "}
            <Link to={"/account/signUp"} className="text-blue-500">
              Sign up
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
