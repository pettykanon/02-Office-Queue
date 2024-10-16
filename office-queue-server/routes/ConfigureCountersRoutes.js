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

router.get('/:counterId', async (req, res) => {
    const {counterId} = req.params;
    
    try {
        const counterServices = await CounterDao.getCounterServices(counterId);
        const counterservicesIDs = counterServices.map(service => service.serviceId);
       
        return res.status(200).json(counterservicesIDs);
    } catch (error) {
        console.error('Error fetching services:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/:counterId',
    [
        body("services").exists().withMessage("services are required"),
    ]    
    ,async (req, res) => {
        const {counterId} = req.params;
        const { services } = req.body;
        console.log(services)
        
        //get current counter's services
        const currentCounterServices = await CounterDao.getCounterServices(counterId);
        console.log(currentCounterServices);
        
        const currentCounterServicesIds = currentCounterServices.map(service => service.serviceId);
        console.log(currentCounterServicesIds);

        try {
            for (const service of services) {
                //check if counter already has that service
                if (currentCounterServicesIds.includes(service)) {
                    console.log("Service already exists in counter: " + service);
                    const index = currentCounterServicesIds.indexOf(service);
                    currentCounterServicesIds.splice(index, 1);
                    console.log(currentCounterServicesIds);
                    continue;
                }
                
                //add the service to counter
                console.log("Adding service to counter: " + service);
                await CounterDao.setService(counterId, service);
            }
            for (const id of currentCounterServicesIds) {
                //remove the service not used anymore from counter
                try {
                    await CounterDao.removeService(counterId, id);
                } catch (error) {
                    console.error('Error removing service:', error.message);
                }
            }
            return res.status(200).json({ message: 'Services set successfully' });
        } catch (error) {
            console.error('Error setting services:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
)



export default router;
