import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String, required: true },
 date: { type: Date, required: true },
 availableSeats: { type: Number, required: true },
 categories: { type: [String], required: true },
 bookings: { type: [String], default: [] },
 owner: { type: String, default: null, required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
