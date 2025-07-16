import { AddOrEditProjectForm } from "components/AddOrEditProjectForm";
import { createProject } from "lib/action";

export default function Page() {
  return <AddOrEditProjectForm onSubmit={createProject} />;
}
