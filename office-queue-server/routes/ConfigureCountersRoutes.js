import History from '../models/History.mjs'
import NextCustomerDAO from '../dao/dao-nextCustomer.mjs';
import { body } from "express-validator";
import { validationResult } from "express-validator";
import ServiceDao from '../dao/serviceDAO.mjs';
import Counterdao from "../dao/CounterDao.mjs";
import dayjs from 'dayjs';

import express from 'express';
const router = express.Router();
const CounterDao = new Counterdao();

router.get('/api/setCounters', async (req, res) => {

    try {
        const allServices = await CounterDao.getCounterServices();
        return res.status(200).json(allServices);
    } catch (error) {
        console.error('Error fetching services:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/api/setCounters/:counterId',
    [
        body("services").exists().withMessage("services are required"),
    ]    
    ,async (req, res) => {
        const {counterId} = req.params;
        const { services } = req.body;
        
        try {
            for (const service of services) {
                const servicerecord = await ServiceDao.getServiceByName(service);
                //set the counter using this service
                await CounterDao.setService(counterId, servicerecord.id);
            }

            return res.status(200).json({ message: 'Services set successfully' });
        } catch (error) {
            console.error('Error setting services:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
)



export default router;
