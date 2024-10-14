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
    body("counter").exists().withMessage("Counter ID is required"),
    body("service").exists().withMessage("Service name is required"),
    body("time").exists().withMessage("Spent time is required")
  ],
  async (req, res, next) => { // Added next parameter for error handling

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { counter, service, time } = req.body;
    try {
      let completeService = await ServiceDao.getServiceByName(service);
      const newHistory = new History(counter, completeService.serviceTypeID, dayjs(), time);
      
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