const { History, Ticket, Counter, Service } = require('./models');
import NextCustomerDao from '../dao/NextCustomerDao.mjs';

const express = require('express');
const router = express.Router();
require('datejs');

// POST /history - Create a new history entry
router.post('/api/history', async (req, res) => {
    //TODO
    const { counterId, ticketId, spentTime } = req.body;
  
    NextCustomerDao.insertHistory(newHistory);
  });
  
  module.exports = router;