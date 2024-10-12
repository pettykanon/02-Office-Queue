import express from "express";
import Counterdao from "../dao/CounterDao.mjs";
import TicketDao from '../dao/ticketDao.js';


const router = express.Router();

const CounterDao = new Counterdao();

router.update('/', async (req, res) => {
    const { counterID, previousTicketCode } = req.params;

    //update the status of the previous ticket to done
    try {
        await CounterDao.setTicketDone(previopusTicketCode);
    }

    catch (error) {
        console.error('Error setting as done:', error);
    }
    //get the counter services
    try {
        const services = await CounterDao.getCounterServices(counterID);
        console.log('Services:', services);

        let longestQueue = 0;
        let nextService = null;

        for (const service of services) {
            try {
                const queueLength = await TicketDao.getQueueLength(service.serviceId);
                console.log('Queue Length:', queueLength);

                if (queueLength > longestQueue) {
                    longestQueue = queueLength;
                    nextService = service;
                }
                else if (queueLength === longestQueue) {
                    if (service.averageTime < nextService.averageTime) {
                        nextService = service;
                        longestQueue = queueLength;
                    }
                }


            }

            catch (error) {
                console.error('Error getting queue length:', error);
            }
        }
        if (longestQueue === 0) {
            return res.status(500).json({ error: 'No queue found' });
        }

        //find next ticket from next queue to serve
        try {
            const nextTicket = await TicketDao.getServiceWaitingTicket(nextService.serviceId);
            console.log('Next ticket:', nextTicket);
            return res.status(200).json(nextTicket);
        }

        catch (error) {
            console.error('Error getting next ticket:', error);
        }
    }

    catch (error) {
        console.error('Error getting services:', error);
    }


})