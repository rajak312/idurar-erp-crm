"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { fetchProjects } from "lib/action";
import ProjectsTable from "./ProjectsTable";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);
  const [isPending, startTransition] = useTransition();

  const loadProjects = () => {
    startTransition(async () => {
      try {
        const result = await fetchProjects({ page, limit });
        setProjects(result.data);
        setTotal(result.meta.total);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    });
  };

  useEffect(() => {
    loadProjects();
  }, [page]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Project
        </Link>
      </div>
      <ProjectsTable
        projects={projects}
        page={page}
        total={total}
        limit={limit}
        loading={isPending}
        onPageChange={setPage}
      />
    </div>
  );
}
