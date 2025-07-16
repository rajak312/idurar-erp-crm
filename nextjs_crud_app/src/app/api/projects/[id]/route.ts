import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "lib/mongodb";
import Project from "models/Project";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const project = await Project.findById(params.id);
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const updates = await req.json();
  const updated = await Project.findByIdAndUpdate(params.id, updates, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("params", params);
  await connectToDB();
  await Project.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Project deleted successfully" });
}
