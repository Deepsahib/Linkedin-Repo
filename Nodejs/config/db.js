import mongoose from "mongoose";
async function getdb() {
    await mongoose.connect("mongodb://localhost:27017/jobportal");
    console.log("DB connected");
}
export default getdb;