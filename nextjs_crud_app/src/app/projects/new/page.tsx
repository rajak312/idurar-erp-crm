import { AddOrEditProjectForm } from "components/AddOrEditProjectForm";
import Link from "next/link";
import { createProject } from "lib/action";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Project</h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Projects
          </Link>
        </div>
        <AddOrEditProjectForm onSubmit={createProject} />
      </div>
    </main>
  );
}
