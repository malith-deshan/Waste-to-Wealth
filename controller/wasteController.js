import Waste from "../model/wasteModel.js";

// CREATE - POST
export const create = async(req, res) => {
    try {
        const wasteData = new Waste(req.body);
        const savedData = await wasteData.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."});
    }
};
