// import { connectMongoDB } from "@/libs/mongoConnect";
import connectMongo from "../../../../dataBase/conn";
import {getEvents, postEvent, putEvent, deleteEvent, addParticipant} from "../../../../dataBase/controller"


export default function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({erro:"Error in the connection"}))
    const { method } = req
switch(method){
    case 'GET' :
    getEvents(req,res)
    break;
    case 'POST':
    postEvent(req,res)
    break;
    case "PATCH":
      addParticipant(req, res); // Use the new function for PATCH method
      break;
    case 'PUT':
    putEvent(req,res)
    break;
    case 'DELETE':
    deleteEvent(req,res)    
    break;
    default:
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowd`)
}
}