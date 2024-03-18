import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CategorieSchema = new Schema(
  {
    categorie: String,
  },
  { collection: 'Categorie' }
);

const Categorie = models.Categorie || model("Categorie", CategorieSchema);
export default Categorie;
