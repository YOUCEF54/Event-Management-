import connectMongo from "../../../../dataBase/conn";
import {getCategories,postCategorie,deleteCategorie} from "../../../../dataBase/controller"


export default function handler(req, res) {
    connectMongo().catch(()=>res.status(405).json({erro:"Error in the connection"}))
    const { method } = req
switch(method){
    case 'GET' :
        getCategories(req,res)
    break;
    case 'POST':
        postCategorie(req,res)
    break;
    case 'DELETE':
        deleteCategorie(req,res)    
    break;
    default:
    res.setHeader('Allow', ['GET', 'POST','DELETE'])
    res.status(405).end(`Method ${method} Not Allowd`)
}
}