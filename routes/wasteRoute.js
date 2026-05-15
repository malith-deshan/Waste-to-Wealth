import express from "express";
import { create, fetch, update, deleteReport } from "../controller/wasteController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteReport);

export default route;