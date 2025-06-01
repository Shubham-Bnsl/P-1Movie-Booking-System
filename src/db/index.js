import mongoose from "mongoose";

const dbConnect = async function(){
    await mongoose.connect(`mongodb+srv://${process.env.DBEMAIL}:${process.env.DBPASS}@moviebookingsystem.7aiqvgg.mongodb.net/`);
    console.log("Database is connected Successfully")
}

export default dbConnect;