"use client";

import { CreateProjectBody } from "lib/action";
import { useForm } from "react-hook-form";

export function AddOrEditProjectForm({
  initialValues,
  onSubmit,
}: {
  initialValues?: CreateProjectBody;
  onSubmit: (data: CreateProjectBody) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectBody>({
    defaultValues: initialValues || {
      name: "",
      description: "",
      status: "pending",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg mx-auto space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name
        </label>
        <input
          {...register("name", { required: true })}
          placeholder="Project Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">Name is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Describe your project"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          {...register("status", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
