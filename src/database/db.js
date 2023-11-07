import mongoose from "mongoose";

async function connectDatabase() {
  await mongoose.connect('mongodb://zsdb:H8kP55nTnFNa5JC5EJDO1jHbcjRPpYhp3xCSWep7Qs8z4d1NRBXHwbZnM4yfAnR3rz2tQFC6FoN6ACDbLjpH8g%3D%3D@zsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@zsdb@',)
}

export default connectDatabase
