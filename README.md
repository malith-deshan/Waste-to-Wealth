# 🌍 Community Waste-to-Wealth Log

**Module:** Web Services and Technology (IT2234) — 2nd Year IT Project  
**Author:** W.M.D.Pemasiri | **Institution:** University of Vavuniya | **Academic Year:** 2022/2023

A full-stack web application that records community waste reports and connects citizens, recyclers, and environmental authorities through a RESTful Express.js API and a MongoDB persistence layer, with a React.js client for interactive data management and Postman-ready endpoint testing.

---

## 📋 Problem Description

Urban and semi-urban communities face persistent waste-management challenges that are difficult to monitor without structured digital records:

- **Illegal dumping** — Waste is often discarded in vacant lots, drains, and public spaces without documentation, making enforcement reactive rather than preventive.
- **Untracked accumulation zones** — Hotspots (markets, bus stands, school perimeters) grow worse because no central log ties location, material type, and severity over time.
- **Uncoordinated recycling logistics** — Citizens, informal collectors, and municipal teams lack a shared view of what material exists, where it is, and whether pickup is pending or complete.

These gaps reduce recycling yield, increase environmental and health risk, and limit evidence for policy or community action. A lightweight, API-driven log is needed to standardize reporting and support coordinated collection workflows.

---

## 💡 Proposed Solution

The **Community Waste-to-Wealth Log** implements a **Model–View–Controller (MVC)** backend on **Node.js** and **Express.js**, with **MongoDB** accessed through the **Mongoose ODM**. Each waste report is stored as a structured document (description, location, waste type, status).

This backend acts as a **structural data bridge**:

1. **Community citizens** submit reports describing waste type and location.
2. **Collectors and recyclers** retrieve open reports, update status after collection, and plan routes.
3. **Environmental authorities** review aggregated data via the API (e.g., Postman or future dashboards) to identify recurring dump sites and measure response times.

The **React.js** frontend (Vite) consumes the same REST endpoints, providing a browser-based interface while keeping business logic and persistence on the server—aligned with separation-of-concerns and service-oriented design taught in IT2234.

---

## 👥 Features & Target Users

| Role | Primary goals | Application support |
|------|----------------|------------------------|
| **Community Citizens** | Report visible waste; describe location and material | Create reports (`POST /create`); view community log (`GET /getall`) |
| **Collectors / Recyclers** | Find pending pickups; mark jobs complete | List all reports; filter by `status: "Pending"`; update records (`PUT /update/:id`) |
| **Environmental Authorities** | Monitor hotspots; audit response | Read full dataset; track status changes; remove duplicate or resolved entries (`DELETE /delete/:id`) |

**Core features**

- CRUD operations on waste reports via RESTful API  
- Persistent storage in MongoDB (`waste_db`)  
- CORS-enabled API for browser and Postman clients  
- React UI for create, read, update, and delete workflows  
- Status field (`Pending` by default) to support collection lifecycle tracking  

---

## 🛠️ Technologies Used

- **Runtime & server:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **API testing:** Postman  
- **Frontend:** React.js (Vite), JavaScript (ES modules)  
- **Supporting libraries:** `dotenv`, `body-parser`, `nodemon` (development)  
- **Architecture pattern:** MVC (routes → controllers → models)  

---

## 📁 Repository Folder Structure

```
Waste-to-Wealth/
├── controller/
│   └── wasteController.js      # Business logic (create, read, update, delete)
├── model/
│   └── wasteModel.js           # Mongoose schema & reports collection
├── routes/
│   └── wasteRoute.js           # REST route definitions
├── frontend/                   # React + Vite client application
│   ├── public/
│   ├── src/
│   │   ├── api/                # API helper functions
│   │   ├── components/         # UI components (e.g., waste log form & table)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── index.js                    # Express app entry & MongoDB connection
├── package.json                # Backend dependencies & scripts
├── .env                        # Environment variables (not committed)
├── .env.example                # Sample environment template
├── screenshots/                # Application, API, and database evidence
└── README.md
```

> **Note:** If your clone uses a folder named `client/` instead of `frontend/`, use that directory for all frontend setup and run commands below—the backend layout is unchanged.

---

## 🚀 Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended, v18+)  
- [MongoDB](https://www.mongodb.com/) running locally (default port `27017`)  
- [Postman](https://www.postman.com/) (optional, for API demonstration)  
- Git (optional, for cloning the repository)  

### 1. Clone or open the project

```bash
cd Waste-to-Wealth
```

### 2. Backend — install dependencies

From the **project root** (where `index.js` and `package.json` are located):

```bash
npm install
```

### 3. Backend — configure environment variables

Create a `.env` file in the project root (or copy from `.env.example`):

```env
PORT=8000
MONGO_URL="mongodb://localhost:27017/waste_db"
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port the Express server listens on |
| `MONGO_URL` | MongoDB connection string for database `waste_db` |

Ensure MongoDB is running before starting the server.

### 4. Frontend — install dependencies

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

(Optional) Create `frontend/.env` if the client uses a configurable API base URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api/waste
```

---

## 🏃 How to Run the Project

Use **two terminal windows**—one for the API server and one for the React client.

### Terminal 1 — Backend (project root)

```bash
npm start
```

**Expected console output:**

```text
Database connected successfully.
Server is running on port: 8000
```

The API base path for waste resources is: `http://localhost:8000/api/waste`

### Terminal 2 — Frontend (`frontend/` directory)

```bash
cd frontend
npm start
```

> For Vite-based projects, the development script may be named `npm run dev` instead of `npm start`. Use whichever script is defined under `"scripts"` in `frontend/package.json`.

**Expected console output (Vite example):**

```text
  VITE v6.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

Open the local URL in a browser to use the waste log interface. Confirm the backend terminal still shows **Database connected successfully** before testing create/update actions.

---

## 📸 Screenshots

Evidence of a working full-stack implementation (React client, REST API via Postman, and MongoDB persistence). All images are stored in the [`screenshots/`](screenshots/) folder.

### React frontend (Vite)

**New report form** — citizen submits waste type *Plastic* at *Bus stand, Vavuniya*:

![New report form](<screenshots/Create - Frontend.png>)

**After create** — report appears in the community log:

![Reports list after create](<screenshots/After Create - Frontend.png>)

**Update report** — edit description, location, or waste type from the UI:

![Update report in browser](<screenshots/Update - Frontend.png>)

**Delete report** — remove a resolved or duplicate entry:

![Delete report in browser](<screenshots/Delete - Frontend.png>)

**Sync with API** — frontend reflects records created via Postman:

![Frontend after Postman create](<screenshots/Frontend view after create by postman.png>)

![Frontend after Postman update](<screenshots/Frontend view after update by postman.png>)

### Postman API testing

**POST `/api/waste/create`** — `200 OK` with `status: "Pending"` and MongoDB `_id`:

![Create waste report in Postman](<screenshots/Create - Postman.png>)

**PUT `/api/waste/update/:id`** — update fields and collection status:

![Update waste report in Postman](<screenshots/Update - Postman.png>)

**DELETE `/api/waste/delete/:id`** — successful removal response:

![Delete waste report in Postman](<screenshots/Delete - Postman.png>)

### MongoDB database

**`waste_db` → `reports` collection** — documents persisted via Mongoose:

![MongoDB Compass or shell view](<screenshots/MongoDB.png>)

---

## 📡 RESTful API Endpoints (with examples)

Base URL: `http://localhost:8000/api/waste`

| Route | HTTP Method | Description |
|-------|-------------|-------------|
| `/create` | `POST` | Create a new waste report |
| `/getall` | `GET` | Retrieve all waste reports |
| `/update/:id` | `PUT` | Update an existing report by MongoDB `_id` |
| `/delete/:id` | `DELETE` | Delete a report by MongoDB `_id` |

**Postman tip:** Set header `Content-Type: application/json` for `POST` and `PUT` requests.

---

### POST `/api/waste/create` — Request body

```json
{
  "description": "Large pile of discarded plastic bottles and packaging near the main shelter.",
  "location": "Bus stand, Vavuniya",
  "wasteType": "Plastic"
}
```

### POST `/api/waste/create` — Sample response (`200 OK`)

```json
{
  "_id": "674a1b2c3d4e5f6789012345",
  "description": "Large pile of discarded plastic bottles and packaging near the main shelter.",
  "location": "Bus stand, Vavuniya",
  "wasteType": "Plastic",
  "status": "Pending",
  "__v": 0
}
```

---

### PUT `/api/waste/update/:id` — Request body

Replace `:id` with the `_id` returned from the create response.

```json
{
  "description": "Plastic waste bagged and ready for collector pickup.",
  "location": "Bus stand, Vavuniya",
  "wasteType": "Plastic",
  "status": "Collected"
}
```

### PUT `/api/waste/update/:id` — Sample response (`201 Created`)

```json
{
  "_id": "674a1b2c3d4e5f6789012345",
  "description": "Plastic waste bagged and ready for collector pickup.",
  "location": "Bus stand, Vavuniya",
  "wasteType": "Plastic",
  "status": "Collected",
  "__v": 0
}
```

---

### Additional endpoint references

**GET** `http://localhost:8000/api/waste/getall` — returns an array of all report documents.

**DELETE** `http://localhost:8000/api/waste/delete/:id` — sample success response:

```json
{
  "message": "Report deleted successfully."
}
```

---

## Academic integrity & evaluation notes

This project was developed by **W.M.D.Pemasiri** at the **University of Vavuniya** (Academic Year **2022/2023**) for **IT2234 — Web Services and Technology** to demonstrate RESTful service design, MongoDB integration, MVC layering, and client–server communication. Do not commit `.env` files containing secrets to version control.

**License:** Educational use — [specify if applicable]
