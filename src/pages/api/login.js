import Gestionaire from "@/models/Gestionaire";
import connectMongo from "../../../dataBase/conn";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(405).json({ erro: "Error in the connection" }));

  if (req.method === "POST") {
    const { email, pass } = req.body;

    try {
      // Find a Gestionaire with matching email and password
      const user = await Gestionaire.findOne({ email, pass });

      if (user) {
        // If user is found, return a success response with the name
        res.status(200).json({ message: "Login successful", name: user.nom ,prenom :user.prenom });
      } else {
        // If user is not found, return an error response
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Login error:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
