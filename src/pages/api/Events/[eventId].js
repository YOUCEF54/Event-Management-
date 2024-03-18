// import connectMongo from "../../../../dataBase/conn";
// import { getEvent, putEvent, deleteEvent, updateEvent } from "../../../../dataBase/controller";

// export default function handler(req, res) {
//   connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }));

//   const { method } = req;
//   switch (method) {
//     case "GET":
//       getEvent(req, res);
//       break;
//     case "PUT":
//       putEvent(req, res);
//       break;
//     case "PATCH": 
//       updateEvent(req, res);
//       break;
//     case "DELETE":
//       deleteEvent(req, res);
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }

import connectMongo from "../../../../dataBase/conn";
import { getEvent, putEvent, deleteEvent, addParticipant } from "../../../../dataBase/controller";

export default function handler(req, res) {
  connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }));

  const { method } = req;
  switch (method) {
    case "GET":
      getEvent(req, res);
      break;
    case "PUT":
      putEvent(req, res);
      break;
    case "PATCH":
      addParticipant(req, res); // Use the new function for PATCH method
      break;
    case "DELETE":
      deleteEvent(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
