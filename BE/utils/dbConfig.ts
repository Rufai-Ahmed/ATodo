import mongoose from "mongoose";

const URL = "mongodb://localhost:27017/todoDB";

export const mainConnection = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("Database running");
    });
  } catch (err) {
    console.log(err);
  }
};
