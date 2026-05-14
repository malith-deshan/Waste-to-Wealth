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

// READ - GET ALL
export const fetch = async (req, res) => {
    try {
        const reports = await Waste.find();
        if(reports.length === 0) {
            return res.status(404).json({message: "No reports found."});
        }
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."});
    }
};

// UPDATE - PUT
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const reportExist = await Waste.findOne({_id:id});
        if (!reportExist) {
            return res.status(404).json({message: "Report not found."});
        }
        const updatedReport = await Waste.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updatedReport);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."});
    }
};

// DELETE
export const deleteReport = async (req, res) => {
    try {
        const id = req.params.id;
        const reportExist = await Waste.findOne({_id:id});
        if(!reportExist) {
            return res.status(404).json({message: "Report not found."});
        }
        await Waste.findByIdAndDelete(id);
        res.status(201).json({message: "Report deleted successfully."});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."});
    }
};