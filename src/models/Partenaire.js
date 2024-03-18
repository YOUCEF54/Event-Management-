import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const eventSchema = new mongoose.Schema(
  {
    Denomination: String,
    Logo : String
  },
  { collection: 'Partenaire' }
);

const Partenaire = models.Partenaire || model("Partenaire", eventSchema);
export default Partenaire;