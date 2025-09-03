import { updateUserRole } from "@/api/auth";
import Modal from "@/components/Modal";
import { validateUpdateUserRoleSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/contextStore/Index";

export default function EditModal({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, showSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const { accessToken } = useAuth();
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateUpdateUserRoleSchema) });
  const roles = ["admin", "staff", "doctor", "nurse", "patient"];

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (response) => {
      if (response.success) {
        setMsg(response?.message);
        showSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating user role");
    },
  });

  useEffect(() => {
    if (item) {
      setValue("role", item?.role);
    }
  }, [item, setValue]);

  const onSubmit = async (role) => {
    mutation.mutate({ userId: item._id, role, accessToken });
  };
  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setIsOpen(false);
    showSuccess(false);
  };
  return (
    <div>
      <button className="btn btn-sm" onClick={() => setIsOpen(true)} disabled={item.role=== "patient"} >
        Edit
      </button>
      <Modal
        id="editModal"
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[600px] mx-auto"
      >
        {error && <ErrorAlert error={error} />}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Update user data</h1>
          <RiCloseLine onClick={() => setIsOpen(false)} />
        </div>
        {success ? (
          <>
            <div className="p-4 text-center">
              <img
                src="/Success.svg"
                alt="success"
                className="w-full h-[200px]"
              />
              <h1 className="text-2xl font-bold">Congratulations!</h1>
              <p className="text-gray-600">{msg}</p>
              <button
                className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="lg"
                onClick={handleClose}
              >
                Continue to Users
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* role */}
            <div>
              <legend className="fieldset-legend text-zinc-800 font-bold p-2">
                Role
              </legend>
              <select
                defaultValue=""
                className="select w-full"
                {...register("role")}
              >
                <option value="">Select a role</option>
                {roles?.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role?.message && (
                <span className="text-xs text-red-500">
                  {errors.role?.message}
                </span>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-3">
              <button
                type="button"
                className="btn btn-md"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-md bg-blue-500 hover:bg-blue-600 text-white"
                disabled={mutation.isPending || isSubmitting}
              >
                {mutation.isPending || isSubmitting ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
