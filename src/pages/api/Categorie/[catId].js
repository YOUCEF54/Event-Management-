import connectMongo from "../../../../dataBase/conn";
import { deleteCategorie } from "../../../../dataBase/controller";

export default function handler(req, res) {
  connectMongo()
    .catch(() => res.status(405).json({ error: "Error in the connection" }));

  const { method } = req;

  switch (method) {
    case "DELETE":
        deleteCategorie(req, res);
      break;
    default:
      res.setHeader("Allow", "DELETE");
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
