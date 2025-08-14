import { RiEyeLine, RiEyeOffLine, RiUser4Fill } from "@remixicon/react";
import { Link } from "react-router";
import { useState } from "react";
import { validateSignUpSchema } from "@/utils/dataSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMetaArgs from "@/hooks/useMeta";
import { registerUser } from "@/api/auth";
import { useMutation} from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore/Index";

export default function SignUp() {
  useMetaArgs({
    title: "SignUp-Clincare",
    description: "Welcome to your clinicare user",
    keywords: "Health, SignUp, Clinic, Hospital",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    
    resolver: zodResolver(validateSignUpSchema),
  });


  //const queryClient = useQueryClient();// Initialize the query client for React Query
  //mutation are for create, update or delete operations
  //useMutation is used to create a mutation for the registerUser function
  const {setAccessToken} = useAuth(); // Access the setAccessToken function from Auth context
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (Response) => {// what you want to do if api call is successful
      // console.log(Response);
      toast.success(Response?.data?.message || "Registration successful"); // Show success message
      setAccessToken(Response?.data?.data?.accessToken); // Set the access token in Auth context
    },
    onError: (error) => {// what you want to do if api call fails
      console.log(error);
      setError(error?.response?.data?.message || "Registration failed"); // Show error message
      
    },
  })

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit = async (data) => {
  mutation.mutate(data); //submitting our form to our mutation function to help us make the api call using our registerUser
  //  .Call the mutation with the form data
  };

  return (
    <div className="bg-white border-base-300 rounded-2xl w-full max-w-[400px] border p-6 flex justify-center ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="border rounded-full h-10 w-10 border-blue-500 shadow-lg">
              <RiUser4Fill size={36} className="text-blue-500 p-2" />
            </div>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-gray-600 text-base text-center">
              Glad to see you again. Log in to your account
            </p>
          </div>
          {error && <ErrorAlert message={error} />}
          <div>
            <label className="label text-zinc-800 font-bold">Fullname</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Fullname"
              {...register("fullname")}
              id="fullname"
            />
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.fullname?.message}
              </span>
            )}
          </div>

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

          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className="btn bg-blue-500 mt-4 text-white cursor-pointer hover:bg-blue-600"
          >
           
            {isSubmitting ||  mutation.isPending ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="text-sm text-center text-gray-600 py-2 ">
            Already have an account?{" "}
            <Link to={"/account/signin"} className="text-blue-500 font-bold ">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
