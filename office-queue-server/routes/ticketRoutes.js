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
//3. Add ticket to the appropriate queue
//4. Respond with the ticket details
router.post('/', async (req, res) => {
  const { ticketCode, serviceId } = req.body;

  try {
    await verifyServiceType(serviceId);
    const newTicket = await TicketDao.createTicket(ticketCode, serviceId, 15);  
    res.status(201).json(newTicket);

  } catch (error) {
    console.error('Error creating ticket:', error.message);    
    if (error.message === 'Invalid service ID') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

//function to verify the service type
async function verifyServiceType(serviceId) {
  const services = await ServiceDao.getAllServicesId(); 
  const service = services.find(service => service.id === serviceId);

  if (!service) {
    throw new Error('Invalid service ID');
  }
  return service;
}


export default router;