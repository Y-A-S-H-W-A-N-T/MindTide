import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

export default connect;
