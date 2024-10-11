//--- Modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import ticketsRouter from './routes/ticketRoutes.js'; // Correct relative path

//--- Middlewares
const app = express();
app.use(morgan("dev"));
app.use(express.json());

//--- DAOs
//import TicketDao from "./dao/ticketDao.js";
//const ticketDao = new TicketDao();

//--- CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/api/tickets', ticketsRouter);


//--- Activate the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);

//--- user APIs
