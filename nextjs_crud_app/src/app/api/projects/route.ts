import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "lib/mongodb";
import Project from "models/Project";

type QueryType = {
  [key: string]:
    | string
    | number
    | boolean
    | RegExp
    | Record<string, unknown>
    | unknown[];
};

export async function GET(req: NextRequest) {
  await connectToDB();

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");
  const q = searchParams.get("q");

  const query: QueryType = {};
  if (status) query.status = status;
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return NextResponse.json({
    data: projects,
    meta: { total, page, limit, status, q },
  });
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const { name, description, status } = await req.json();

  try {
    const newProject = await Project.create({
      name,
      description,
      status,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Create Error:", err.message);
      return NextResponse.json(
        { error: "Project creation failed", details: err.message },
        { status: 400 }
      );
    }

    console.error("Unknown Create Error:", err);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
