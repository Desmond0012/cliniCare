import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { RiUser4Fill } from "@remixicon/react";
import { validateSignInSchema } from "@/utils/dataSchema";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contextStore/Index";
import { useNavigate } from "react-router";

export default function LogIn() {
  const [error, setError] = useState(null);
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
    <div className="flex items-center justify-center bg-slate-100 px-5 py-10 lg:py-0">
      <div className="bg-white shadow-md rounded-xl p-2 md:p-4 w-full max-w-sm">
        {/* Logo & Title */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center py-2 border-blue-500 border h-10 w-10 rounded-full">
            <RiUser4Fill className="text-blue-500" />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 text-sm pr-4">
              Glad to see you again. Log in to your account.
            </p>
          </div>
        </div>

        {error && <ErrorAlert error={error} />}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="fieldset ">
            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                {...register("email")}
              />
            </fieldset>
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}

            {/* Password */}
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={isVisible ? "text" : "password"}
                className="input w-full"
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute bottom-3 right-2 text-xs font-bold cursor-pointer"
                onClick={togglePassword}
              >
                {isVisible ? "Hide" : "Show"}
              </button>
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}

            {/* Forgot Password Link */}
            <div className="flex ">
              <a
                href="/account/forgotpassword"
                className="text-blue-500 text-sm hover:underline font-bold "
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              className="mt-2 btn btn-soft text-white bg-blue-500 hover:bg-blue-700 w-full "
              type="submit"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/account/signup" className="text-blue-500 font-medium">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

// import { RiEyeLine, RiEyeOffLine, RiUser4Fill } from "@remixicon/react";
// import { Link } from "react-router";
// import { useState } from "react";
// import { validateSignInSchema } from "@/utils/dataSchema";
// import { useForm } from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod"
// import useMetaArgs from "@/hooks/useMeta";
// import { loginUser } from "@/api/auth";
// import { useMutation } from "@tanstack/react-query";
// import ErrorAlert from "@/components/ErrorAlert";
// import { toast } from "sonner";
// import { useAuth } from "@/contextStore/Index";
// import { useNavigate } from "react-router";

// export default function Login() {

//   const navigate = useNavigate()

//   useMetaArgs({
//     title: "Login-Clincare",
//     description: "Welcome to your clinicare user",
//     keywords: "Health, Login, Clinic, Hospital",
//   });
//   const [isVisible, setIsVisible] = useState(false);
//   const [error, setError] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(validateSignInSchema),
//   });

//   const togglePassword = () => {
//     setIsVisible((prev) => !prev);
//   };
// const {setAccessToken, user} = useAuth(); // Access the setAccessToken function from Auth context
//   const mutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (Response) => {// what you want to do if api call is successful
//       // console.log(Response);
//       toast.success(Response?.data?.message || "Login successful"); // Show success message
//       setAccessToken(Response?.data?.data?.accessToken); // Set the access token in Auth context
//       if (!user?.isVerified) {
//         navigate("/verify-account")
//       }
//     },
//     onError: (error) => {// what you want to do if api call fails
//     import.meta.env.DEV &&  console.log(error);
//       setError(error?.response?.data?.message || "Login failed"); // Show error message
//     },
//   })
//   const onSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="bg-white border-base-300 rounded-2xl w-full max-w-[400px] border p-6 flex justify-center ">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset className="fieldset">
//           <div className="flex flex-col justify-center items-center gap-2">
//             <div className="border rounded-full h-10 w-10 border-blue-500 shadow-lg">
//               <RiUser4Fill size={36} className="text-blue-500 p-2" />
//             </div>
//             <h1 className="text-2xl font-bold">Welcome Back</h1>
//             <p className="text-gray-600 text-base text-center">
//               Glad to see you again. Log in to your account
//             </p>
//           </div>
//           {error && <ErrorAlert error={error} />}
//           <div>
//             <label className="label text-zinc-800 font-bold">Email</label>
//             <input
//               type="email"
//               className="input w-full"
//               placeholder="Email"
//               {...register("email")}
//             />
//             {errors.email?.message && (
//               <span className="text-xs text-red-500">
//                 {errors.email?.message}
//               </span>
//             )}
//           </div>
//           <div>
//             <fieldset className="fieldset relative">
//               <label className="label  text-zinc-800 font-bold">Password</label>
//               <input
//                 type={isVisible ? "text" : "password"}
//                 className="input w-full "
//                 placeholder="Password"
//                 {...register("password")}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 top-6 right-2 border-0 cursor-pointer"
//                 onClick={togglePassword}
//               >
//                 {isVisible ? <RiEyeOffLine /> : <RiEyeLine />}
//               </button>
//             </fieldset>
//             {errors.password?.message && (
//               <span className="text-xs text-red-500">
//                 {errors.password?.message}
//               </span>
//             )}
//           </div>
//           <Link
//             to={"/account/forgot-password"}
//             className="text-blue-500 font-bold text-sm py-2"
//           >
//             Forgot Password?
//           </Link>
//           <button
//             type="submit"
//             disabled={isSubmitting || mutation.isPending}
//             className="btn bg-blue-500 mt-4 text-white "
//           >
//             {isSubmitting || mutation.isPending ? "Signing In..." : "Sign In"}
//           </button>
//           <p className="text-sm text-center text-gray-600 py-2 ">
//             Don't have an account?{" "}
//             <Link to={"/account/signUp"} className="text-blue-500">
//             Sign up
//             </Link>
//           </p>
//         </fieldset>
//       </form>
//     </div>
//   );
// }
