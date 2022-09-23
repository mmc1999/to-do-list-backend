import mongoose from "mongoose";

export const connectingDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL, {})
        console.log("Bases de datos online")
    } catch (error) {
        console.log(error)
    }
}

