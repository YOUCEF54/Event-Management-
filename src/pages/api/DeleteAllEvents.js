import connectMongo from "../../../dataBase/conn";
import Event from "../../models/Event";

export default async function handler(req, res) {
  try {
    // Connect to the MongoDB database
    connectMongo().catch(()=>res.status(405).json({erro:"Error in the connection"}))

    // Delete all documents in the Event collection
    await Event.deleteMany({});

    res.status(200).json({ message: "All events deleted successfully" });
  } catch (error) {
    console.error("Error while deleting events:", error);
    res.status(500).json({ error: "Error while deleting events" });
  }
}
