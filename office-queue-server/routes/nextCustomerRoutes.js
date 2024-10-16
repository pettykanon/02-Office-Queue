import History from '../models/History.mjs'
import NextCustomerDAO from '../dao/dao-nextCustomer.mjs';
import { body } from "express-validator";
import { validationResult } from "express-validator";
import ServiceDao from '../dao/serviceDAO.mjs';

import dayjs from 'dayjs';

import express from 'express';
const router = express.Router();

// POST /api/history - Create a new history entry
router.post('/',
  [
    body("counterId").exists().withMessage("Counter ID is required"),
    body("ticketCode").exists().withMessage("Service name is required"),
  ],
  async (req, res, next) => { // Added next parameter for error handling

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { counterId, ticketCode } = req.body;
    try {
      let service = await ServiceDao.getServiceByTicketCode(ticketCode);
      console.log(service);
      const newHistory = new History(counterId, service.serviceTypeID, dayjs().format("YYYY-MM-DD"));
      
      await NextCustomerDAO.insertHistory(newHistory);
      res.status(200).json({ message: "History recorded successfully" });
    } catch (error) {
      console.error('Error recording a new history: ', error.message);
      if (error.message === 'Invalid service name') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error, ' + error.message });
    }
  }
);

export default router;