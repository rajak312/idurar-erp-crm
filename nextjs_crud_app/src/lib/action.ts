"use server";
import { Project } from "components/ProjectsTable";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface FetchProjectsOptions {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
}

export interface CreateProjectBody extends Omit<Project, "_id" | "createdAt"> {}

export async function fetchProjects(options: FetchProjectsOptions = {}) {
  const { page = 1, limit = 5, q, status } = options;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (q) params.append("q", q);
  if (status) params.append("status", status);

  const res = await fetch(`${baseUrl}/api/projects?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  return res.json();
}

export async function createProject(data: CreateProjectBody) {
  const res = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    next: {
      tags: ["users"],
    },
  });
  if (!res.ok) throw new Error("Failed to create Project");
  redirect("/");
}

export async function updateProject(
  id: string,
  data: Partial<CreateProjectBody>
) {
  const res = await fetch(`${baseUrl}/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update Project");
  redirect("/");
}

export async function deleteProject(id: string) {
  const res = await fetch(`${baseUrl}/api/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete Project");
  revalidateTag("users");
}

export async function getProjectById(id: string) {
  const res = await fetch(`${baseUrl}/api/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch Project");
  return res.json();
}
