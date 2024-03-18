import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://YE203:Y123@cluster0.egqv4uu.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'GestionEvent'; // Replace with your database name

let client;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  
  return client.db(dbName);
}
