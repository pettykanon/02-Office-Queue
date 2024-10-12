import express from "express";
//const Ticket = require('../models/Ticket');
//const express = require('express');
import TicketDao from '../dao/ticketDao.js';
import ServiceDao from '../dao/serviceDao.js';

const router = express.Router();

//POST /api/tickets 
//Logic to create a new ticket
//1. Validate serviceType. there will be 5 service types. 1,2,3,4,5 
//2. Generate a unique ticket code
//in createTicket only serviceId is required. ticketCode is generated by backend.
// 
/*
SERVICES: A, B, C, D, E
          1A,1B,1C,1D,1E
          2A,2B,2C,2D,2E
          3A,3B,3C,  ,3E
          4A,
          5A,
*/
//3. Add ticket to the appropriate queue
//4. Respond with the ticket details
router.post('/', async (req, res) => {
  const { serviceId } = req.body;

  try {
    await ServiceDao.verifyServiceType(serviceId);
    const newTicket = await TicketDao.createTicket(serviceId, 15);  
    res.status(201).json(newTicket);

  } catch (error) {
    console.error('Error creating ticket:', error.message);    
    if (error.message === 'Invalid service ID') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});


// //GET /api/tickets/:ticketCode
// router.get('/code/:ticketCode', async (req, res) => {
//   const { ticketCode } = req.params;

//   try {
//     const ticket = await TicketDao.getTicketByCode(ticketCode);

//     if (!ticket) {
//       return res.status(404).json({ error: 'Ticket not found' });
//     }

//     return res.status(200).json(ticket); 
//   } catch (error) {
//     console.error('Error fetching ticket:', error.message);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

//GET /api/tickets/id/:id
router.get('/:ticketId', async (req, res) => {
  const { ticketId } = req.params;
  console.log('id:', ticketId);
  try {
    const ticket = await TicketDao.getTicketById(ticketId);
    console.log('Ticket:', ticket);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;