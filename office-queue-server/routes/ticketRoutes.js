const express = require('express');
const Ticket = require('../models/Ticket');

const express = require('express');
const router = express.Router();

// POST /api/tickets
  // Logic to create a new ticket
  // 1. Validate serviceType
  // 2. Generate a unique ticket code
  // 3. Add ticket to the appropriate queue
  // 4. Respond with the ticket details
 // res.status(201).json({ ticketCode: 'T123', serviceType });
//router.post('/', createTicket);

module.exports = router;

