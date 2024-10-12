//--- Modules
import express from "express";
import morgan from "morgan";
import cors from "cors";

import callCustomerRoutes from "./routes/callCustomerRoutes.mjs";

//--- Middlewares
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/callCustomer", callCustomerRoutes);

//--- DAOs
import TicketDao from "./dao/dao-ticket.mjs";
const ticketDao = new TicketDao();

//--- CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//--- Activate the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);

//--- user APIs
