// import { connectMongoDB } from "@/libs/mongoConnect";
// import Event from "@/models/EventModel";
// export default async function handler (req, res) {
// if (req.method !== "POST") {
// res.status (405).send({ msg: "Only POST request are allowed." });
// return;
// }
// const { event} = req.body;
// try {
//     await connectMongoDB()
//     Event.create({ event }).then((data) => {
//         console.log(data);
//         res.status(201).send(data);
// });
// } catch (err) {
// console.log(err);
// res.status (400).send({ err, msg: "Something went wrong!" });
// }
// }