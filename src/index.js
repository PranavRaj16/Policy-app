import express from "express";
import { databaseConnection } from "./config/db.config.js";
import cors from "cors";
import router from "./route.js";
import { enableScheduer } from "./scheduler.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  databaseConnection();
  enableScheduer();
  console.log(`Server running on port ${PORT}`);
});
