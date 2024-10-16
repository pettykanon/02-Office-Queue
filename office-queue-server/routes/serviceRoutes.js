import express from "express";

import ServiceDao from '../dao/serviceDao.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const services = await ServiceDao.getAllServices();
      
      if (!services) {
        return res.status(404).json({ error: 'Services not found' });
      }
  
      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching ticket:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/:counterId', async (req, res) => {
    try {
      const { counterId } = req.params;
      const services = await ServiceDao.getCounterServicePrivided(counterId);
      
      if (!services) {
        return res.status(404).json({ error: 'Services not found' });
      }
  
      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching ticket:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;