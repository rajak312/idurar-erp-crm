"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: "pending" | "active" | "completed";
  createdAt: string;
}

type ProjectsTableProps = {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  onPageChange: (newPage: number) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
};

export default function ProjectsTable({
  projects,
  total,
  page,
  limit,
  loading,
  onPageChange,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  const totalPages = Math.ceil(total / limit);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusColorMap: Record<Project["status"], string> = {
    pending: "bg-yellow-800 text-yellow-100",
    active: "bg-blue-800 text-blue-100",
    completed: "bg-green-800 text-green-100",
  };

  const columns: ColumnDef<Project>[] = [
    { accessorKey: "_id", header: "Project ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as Project["status"];
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
              statusColorMap[status] ?? "bg-gray-700 text-gray-100"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;
        const isOpen = openDropdownId === project._id;

        return (
          <div className="relative" ref={isOpen ? dropdownRef : null}>
            <button
              onClick={() => setOpenDropdownId(isOpen ? null : project._id)}
              className="text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
              ⋮
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow z-50">
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700 text-gray-200"
                  onClick={() => {
                    onEdit?.(project);
                    setOpenDropdownId(null);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700 text-red-400"
                  onClick={() => {
                    onDelete?.(project._id);
                    setOpenDropdownId(null);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Projects</h2>

      <div className="overflow-x-auto border border-gray-700 rounded-md shadow-sm bg-gray-900">
        <table className="min-w-full divide-y divide-gray-700 text-sm text-gray-200">
          <thead className="bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  No projects found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-800 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page <strong>{page}</strong> of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
