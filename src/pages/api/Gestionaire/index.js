import connectMongo from "../../../../dataBase/conn";
import {getGestios, postGestio, putGestio, deleteGestio} from "../../../../dataBase/controller"


export default function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({erro:"Error in the connection"}))
    const { method } = req
switch(method){
    case 'GET' :
        getGestios(req,res)
    break;
    case 'POST':
        postGestio(req,res)
    break;
    case 'PUT':
        putGestio(req,res)
    break;
    case 'DELETE':
    deleteGestio(req,res)    
    break;
    default:
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowd`)
}
}