import CallCustomerDAO from "../dao/dao-callCustomer.mjs";

import express from "express";
const router = express.Router();

// GET /queues
// Get all the tickets that are in the queue in the waiting state (statusId = 1) or serving state (statusId = 2)
// example of output:
// [
//     {
//         "id": 1,
//         "code": "E1",
//         "serviceId": 1,
//         "serviceName": "ServiceA",
//         "statusId": 1
//     }
// ]
router.get("/api/queues", async (req, res) => {
  try {
    const queues = await CallCustomerDAO.getQueues();
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
