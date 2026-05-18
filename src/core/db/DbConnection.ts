import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

export const connectDB = async () => {
  if (!global.mongooseCache) {
    global.mongooseCache = {
      conn: null,
      promise: null,
    };
  }

  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGO_URI);
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;

  return global.mongooseCache.conn;
};