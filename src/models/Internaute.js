import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const eventSchema = new mongoose.Schema(
  {
    id: String,
    nome: String,
    Prenom: String,
    Tele :Number ,
    email :String 
  },
  { collection: 'Internaute' }
);

const Internaute = models.Internaute || model("Internaute", eventSchema);
export default Internaute;
