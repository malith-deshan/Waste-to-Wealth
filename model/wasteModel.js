import mongoose from "mongoose";

const wasteSchema = new mongoose.Schema({
    description: { type: String, required: true },
    location: { type: String, required: true },
    wasteType: { type: String, required: true }, // e.g., Plastic, Metal
    status: { type: String, default: "Pending" }
});

export default mongoose.model("reports", wasteSchema);
