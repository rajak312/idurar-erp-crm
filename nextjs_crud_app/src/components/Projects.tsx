"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { deleteProject, fetchProjects } from "lib/action";
import ProjectsTable from "./ProjectsTable";
import type { Project } from "./ProjectsTable";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);
  const [status, setStatus] = useState<Project["status"] | "">("");
  const [isPending, startTransition] = useTransition();

  const loadProjects = () => {
    startTransition(async () => {
      try {
        const result = await fetchProjects({ page, limit, status });
        setProjects(result.data);
        setTotal(result.meta.total);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    });
  };

  async function handleDeleteProject(id: string) {
    deleteProject(id);
    loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, [page, status]);

  return (
    <div className="p-4 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Project
        </Link>
      </div>

      <div className="flex justify-end">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as Project["status"] | "");
            setPage(1);
          }}
          className="bg-gray-800 text-gray-200 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ProjectsTable
        projects={projects}
        page={page}
        total={total}
        limit={limit}
        loading={isPending}
        onPageChange={setPage}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}
