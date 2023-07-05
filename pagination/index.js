import mongoose from "mongoose";
import UserModel from "./models/user.model.js";

await mongoose.connect('mongodb://localhost:27017', { dbName: 'clase25' })
console.log('DB Connected')

// const users = await UserModel.find({ gender: "Female" })
const users = await UserModel.paginate({ gender: "Female" }, { page: 2})
console.log(users)

process.exit()