"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { CreateProjectBody } from "lib/action";
import { Project } from "./ProjectsTable";

export function AddOrEditProjectForm({
  initialValues,
  onSubmit,
  mode = "create",
}: {
  initialValues?: Project;
  onSubmit: (data: CreateProjectBody) => Promise<void>;
  mode?: "create" | "edit";
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
    <main className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Project" : "Add New Project"}
          </h1>
          <Link href="/" className="text-blue-400 hover:underline text-sm">
            ← Back to Projects
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800 shadow-lg rounded-xl p-8 w-full space-y-6 text-gray-100"
        >
          {mode === "edit" && initialValues?._id && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Project ID
              </label>
              <input
                value={initialValues._id}
                readOnly
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Project Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-400 mt-1">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Describe your project"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              {...register("status", { required: true })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {mode === "edit" ? "Update Project" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
