import Partenaire from "@/models/Partenaire";
import Event from "../src/models/Event";
import Gestionaire from "../src/models/Gestionaire";
import Categorie from "../src/models/Categorie";


export async function getEvents(req, res) {
  try {
    const events = await Event.find({});
    if (!events) return res.status(404).json({ error: "Data not found" });
    res.status(200).json({ events });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}


// export async function getEvent(req, res){
//     try {
//         const {eventId} = req.query

//             if(eventId){
//                 const event = await Event.findById(eventId);
//                 res.status(200).json(event)
//             } 
//             res.status(404).json({error : "Event not selected...!"})
//         } catch (error) {
//         res.status(404).json({ error: "Cannot get the event"})
//         }
// }
export async function getEvent(req, res){
  try {
    const { eventId } = req.query;

    if (eventId) {
      const event = await Event.findById(eventId);
      res.status(200).json(event)
     // Get the authenticated user

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      const user = req.user;
      let isParticipant = false;

      if (user && event.participants.includes(user.email)) {
        isParticipant = true;
      }

      res.status(200).json({ event, isParticipant });
    } else {
      res.status(400).json({ error: "Invalid event ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while getting the event" });
  }
}



export async function postEvent(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      throw new Error("Form Data Not Provided...!");
    }

    const event = await Event.create(formData);

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// export async function putEvent(req, res) {
//   try {
//     const { eventId } = req.query;
//     const formData = req.body;

//     if (eventId && formData) {
//       const event = await Event.findByIdAndUpdate(eventId, formData);
//       res.status(200).json(event);
//     } else {
//       res.status(404).json({ error: "Event Not Selected...!" });
//     }
//   } catch (error) {
//     res.status(404).json({ error: "Error While Updating the Data...!" });
//   }
// }

export async function putEvent(req, res) {
  try {
    const { eventId } = req.query;
    const formData = req.body;

    if (eventId && formData) {
      const event = await Event.findByIdAndUpdate(eventId, formData);
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event Not Selected...!" });
    }
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}


// export async function addParticipant(req, res) {
//   try {
//     const { eventId } = req.query;
//     const { participant } = req.body;

//     if (eventId && participant) {
//       let event = await Event.findById(eventId);

//       if (!event) {
//         return res.status(404).json({ error: "Event not found" });
//       }

//       if (!event.participants) {
//         event.participants = [participant];
//       } else {
//         // Push the new participant into the existing array
//         event.participants.push(participant);
//       }

//       await event.save();

//       res.status(200).json(event);
//     } else {
//       res.status(400).json({ error: "Invalid event ID or participant data" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error while adding participant to the event" });
//   }
// }
export async function addParticipant(req, res) {
  try {
    const { eventId } = req.query;
    const { participant } = req.body;

    if (eventId && participant) {
      let event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      if (!event.participants) {
        event.participants = [participant];
      } else {
        const index = event.participants.indexOf(participant);
        if (index !== -1) {
          // Remove the participant from the array
          event.participants.splice(index, 1);
        } else {
          // Add the participant to the array
          event.participants.push(participant);
        }
      }

      await event.save();

      res.status(200).json(event);
    } else {
      res.status(400).json({ error: "Invalid event ID or participant data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while adding/removing participant to/from the event" });
  }
}







export async function deleteEvent(req, res){
    try {
        const { eventId } = req.query;

        if(eventId){
            const event = await Event.findByIdAndDelete(eventId);
            return res.status(200).json({deleted : eventId})
        }
        res.status(404).json( { error: "event Not Selected...!"})
        } catch (error) {
            res.status(404).json({ error: "Error While Deleting the Event...!"})
        }
    }

    
  //  export async function deleteAllDocuments(req,res){
  //     try {
  //       const db = await connectToDatabase();
  //       const collection = db.collection('yourCollectionName'); // Replace with your collection name
  
  //       // Execute the deleteMany query
  //       const result = await collection.deleteMany({});
  
  //       console.log(`${result.deletedCount} documents deleted`);
  //     } catch (error) {
  //       console.error('Error deleting documents:', error);
  //     }
  //   };

  export async function deleteAllEvents(req, res) {
    try {
      await Event.deleteMany({});
      res.status(200).json({ message: "All events deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error while deleting events" });
    }
  }
  
  



export async function getGestios(req, res) {
  try {
    const Gestios = await Gestionaire.find({});
    if (!Gestios) return res.status(404).json({ error: "Data not found" });
    res.status(200).json({ Gestios });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}


export async function getGestio(req, res){
    try {
        const {gestioId} = req.query

            if(gestioId){
                const gestio = await Gestionaire.findById(gestioId);
                res.status(200).json(gestio)
            } 
            res.status(404).json({error : "Event not selected...!"})
        } catch (error) {
        res.status(404).json({ error: "Cannot get the event"})
        }
}


export async function postGestio(req, res) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    }

    const gestioId = await Gestionaire.create(formData);
    return res.status(200).json({ gestioId });
  } catch (error) {
    return res.status(402).json({ error });
  }
}


export async function putGestio(req, res){
    try {
        const { gestioId } = req.query;
        const formData = req.body;

        if(gestioId && formData){
            const gestio = await Gestionaire.findByIdAndUpdate(gestioId, formData);
            res.status(200).json(gestio)
        }
        res.status(404).json( { error: "event Not Selected...!"})
        } catch (error) {
            res.status(404).json({ error: "Error While Updating the Data...!"})
        }
    }


export async function deleteGestio(req, res){
    try {
        const { gestioId } = req.query;

        if(gestioId){
            const gestionare = await Gestionaire.findByIdAndDelete(gestioId);
            return res.status(200).json({deleted : gestioId})
        }
        res.status(404).json( { error: "event Not Selected...!"})
        } catch (error) {
            res.status(404).json({ error: "Error While Deleting the Gestionaire...!"})
        }
    }



//Partenaires



export async function getParts(req, res) {
  try {
    const Parts = await Partenaire.find({});
    if (!Parts) return res.status(404).json({ error: "Data not found" });
    res.status(200).json({ Parts });
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}


export async function getPart(req, res){
    try {
        const {partId} = req.query

            if(partId){
                const part = await Partenaire.findById(partId);
                res.status(200).json(part)
            } 
            res.status(404).json({error : "Partenaire not selected...!"})
        } catch (error) {
        res.status(404).json({ error: "Cannot get the event"})
        }
}


export async function postPart(req, res) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    }

    const partId = await Partenaire.create(formData);
    return res.status(200).json({ partId });
  } catch (error) {
    return res.status(402).json({ error });
  }
}


export async function putPart(req, res){
    try {
        const { partId } = req.query;
        const formData = req.body;

        if(partId && formData){
            const part = await Partenaire.findByIdAndUpdate(partId, formData);
            res.status(200).json(part)
        }
        res.status(404).json( { error: "event Not Selected...!"})
        } catch (error) {
            res.status(404).json({ error: "Error While Updating the Data...!"})
        }
    }


export async function deletePart(req, res){
    try {
        const { partId } = req.query;

        if(partId){
            const partenaire = await Partenaire.findByIdAndDelete(partId);
            return res.status(200).json({deleted : partenaire})
        }
        res.status(404).json( { error: "event Not Selected...!"})
        } catch (error) {
            res.status(404).json({ error: "Error While Deleting the Gestionaire...!"})
        }
    }

    //Categorie


    // export async function getCategories(req, res) {
    //   try {
    //     const cats = await Categorie.find({});
    //     if (!cats) return res.status(404).json({ error: "Data not found" });
    //     res.status(200).json({ cats });
    //   } catch (error) {
    //     res.status(404).json({ error: "Error While Fetching Data" });
    //   }
    // }

    export async function getCategories(req, res) {
      try {
        const categories = await Categorie.distinct("categorie");
        if (!categories) return res.status(404).json({ error: "Data not found" });
        res.status(200).json({ categories });
      } catch (error) {
        res.status(404).json({ error: "Error while fetching data" });
      }
    }
    

    export async function postCategorie(req, res) {
      try {
        const formData = req.body;
        if (!formData) {
          return res.status(404).json({ error: "Form Data Not Provided...!" });
        }
    
        const catId = await Categorie.create(formData);
        return res.status(200).json({ catId });
      } catch (error) {
        return res.status(402).json({ error });
      }
    }
    

export async function deleteCategorie(req, res) {
  try {
    const { catName } = req.query;

    if (catName) {
      const categorie = await Categorie.findOneAndDelete({ categorie: catName });
      return res.status(200).json({ deleted: catName });
    }
    res.status(404).json({ error: "Category Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the Category...!" });
  }
}