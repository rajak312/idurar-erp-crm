import mongoose from "mongoose";

type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseConnection;
}

const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

global.mongoose = cached;

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI)
  throw new Error("Please define the MONGODB_URI environment variable");

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
