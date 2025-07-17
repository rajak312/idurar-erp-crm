import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "lib/mongodb";
import Project from "models/Project";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  await connectToDB();
  const { id } = await params;
  const project = await Project.findById(id);
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: Params) {
  await connectToDB();
  const { id } = await params;
  const updates = await req.json();
  const updated = await Project.findByIdAndUpdate(id, updates, { new: true });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  await connectToDB();
  const { id } = await params;
  await Project.findByIdAndDelete(id);

  return NextResponse.json({ message: "Project deleted successfully" });
}
