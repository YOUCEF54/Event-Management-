import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const gestioSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: {
      type: String, 
      required: true,
    },
    pass :String,
  },
  { collection: 'Gestionaire' }
);

const Gestionaire = models.Gestionaire || model("Gestionaire", gestioSchema);
export default Gestionaire;
