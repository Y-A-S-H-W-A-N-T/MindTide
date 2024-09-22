import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

export default connect;
