import connectMongo from "../../../../dataBase/conn";
import {getParts,postPart,putPart,deletePart} from "../../../../dataBase/controller"


export default function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({erro:"Error in the connection"}))
    const { method } = req
switch(method){
    case 'GET' :
        getParts(req,res)
    break;
    case 'POST':
        postPart(req,res)
    break;
    case 'PUT':
        putPart(req,res)
    break;
    case 'DELETE':
    deletePart(req,res)    
    break;
    default:
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowd`)
}
}