import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const eventSchema = new Schema(
  {
    Theme: String,
    editeur: String,
    DateDebut: Date,
    DateFin: Date,
    Lieu: String,
    descreption: String,
    ImageEv: String,
    categorie: String,
    Organisateur: String,
    partenaires: [String],
    Tele: Number,
    email: String,
    nscRequis: Boolean,
    participants: [String], // New field to store participants
  },
  { collection: 'Events' }
);

const Event = models.Event || model("Event", eventSchema);

export default Event;
