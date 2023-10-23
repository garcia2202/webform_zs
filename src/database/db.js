import mongoose from "mongoose";

async function connectDatabase() {
  await mongoose.connect('mongodb+srv://tonatothiago:qfwCHKfxCW6D7Cci@clustertest.jb5n7f3.mongodb.net/?retryWrites=true&w=majority',)
}

export default connectDatabase
