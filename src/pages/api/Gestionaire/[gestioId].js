import connectMongo from "../../../../dataBase/conn";
import {getGestio, putGestio, deleteGestio} from "../../../../dataBase/controller"


export default function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({erro:"Error in the connection"}))
    const { method } = req
switch(method){
    case 'GET' :
        getGestio(req,res)
    break;
    case 'PUT':
        putGestio(req,res)
    break;
    case 'DELETE':
        deleteGestio(req,res)
    break;
    
    default:
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowd`)
}
}