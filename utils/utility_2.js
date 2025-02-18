import mongoose from "mongoose";
const BASE_URL = process.env.MONGO_URI;
const mongooseHandler2 = async () => {
  try {
    if (mongoose.connections[0].readyState) return ;
    await mongoose.connect(BASE_URL)
    console.log("connected to db-2")
  } catch (error) {
    console.log("error occurred", error);
  }
};
export default mongooseHandler2;
