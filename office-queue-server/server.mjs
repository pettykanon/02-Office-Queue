//--- Modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js"
import ticketsRouter from "./routes/ticketRoutes.js"
import nextCustomerRoutes from "./routes/nextCustomerRoutes.js";
import counterRoutes from "./routes/counterRoutes.js"

//--- Middlewares
const app = express();
app.use(morgan("dev"));
app.use(express.json());

 //--- CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); 

//--- ROUTES 
app.use('/api/tickets', ticketsRouter);
app.use('/api/services', serviceRoutes);
app.use('/api/history', nextCustomerRoutes);
app.use('/api/counters', counterRoutes);

//--- Activate the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);


//--- user APIs
