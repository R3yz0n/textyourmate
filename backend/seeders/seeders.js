import dotenv from "dotenv";
import colors from "colors";
import users from "../data/users.js";
import User from "../models/userModel.js";
import connectToDB from "../config/db.js";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

dotenv.config(process.env.MONGO_URI);
connectToDB();
const importData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    await Conversation.deleteMany();
    // await Messages;
    // console.log(createdUsers);

    console.log("Data Imported!".green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error.message.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Conversation.deleteMany();
    await Message.deleteMany();

    console.log("Data Deleted!".red.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error.message.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
