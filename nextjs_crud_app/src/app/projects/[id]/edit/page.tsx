import { CreateProjectBody, getProjectById, updateProject } from "lib/action";
import { AddOrEditProjectForm } from "components/AddOrEditProjectForm";

export interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  async function handleSubmmit(data: Partial<CreateProjectBody>) {
    "use server";
    await updateProject(id, data);
  }

  return (
    <AddOrEditProjectForm
      initialValues={project}
      onSubmit={handleSubmmit}
      mode="edit"
    />
  );
}
