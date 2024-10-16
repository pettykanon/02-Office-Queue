import express from "express";
import Counterdao from "../dao/CounterDao.mjs";
import TicketDao from '../dao/ticketDao.js';

const router = express.Router();

const CounterDao = new Counterdao();

router.get('/:counterID/:previousTicketCode', async (req, res) => {
    const { counterID, previousTicketCode } = req.params;

    if (previousTicketCode != "--") {
        //update the status of the previous ticket to done
        try {
            await CounterDao.setTicketDone(previousTicketCode);
        }

        catch (error) {
            console.error('Error setting as done:', error);
        }
    }

    //get the counter services
    try {
        const services = await CounterDao.getCounterServices(counterID);
        console.log('Services:', services);

        let longestQueue = 0;
        let nextService = null;

        for (let service of services) {
            try {
                const queueLength = await TicketDao.getQueueLength(service.serviceId);

                if (queueLength > longestQueue) {
                    longestQueue = queueLength;
                    nextService = service;
                }
                else if (queueLength === longestQueue) {
                    if (nextService === null || service.averageTime < nextService.averageTime) {
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
            return res.status(200).json({ code: "--"});
        }

        //find next ticket from next queue to serve
        try {
            const nextTicket = await CounterDao.getServiceWaitingTicket(nextService.serviceId);
            console.log('Next ticket:', nextTicket);
            if (nextTicket.code !== '--') {
                await CounterDao.setTicketServing(nextTicket.code)
            }
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

router.get('/', async (req, res) => {
    try {
        const services = await CounterDao.getAllCounters()

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