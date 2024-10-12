export default function Ticket(
  id,
  code,
  serviceId,
  estimatedWaitingTime,
  statusId
) {
  this.id = id;
  this.code = code;
  this.serviceId = serviceId;
  this.estimatedWaitingTime = estimatedWaitingTime;
  this.statusId = statusId;
}

/*
function calculateEstimatedWaitingTime(tr, nr, counters) {
  const denominator = counters.reduce((sum, counter) => {
    const si_r = counter.services.includes(serviceType) ? 1 : 0;
    return sum + (si_r / counter.serviceTypes.length);
  }, 0);

  return tr * (nr / (denominator || 1) + 0.5);
}

tr is the service time for request type r
• nr is the number of people in queue for request type r
• ki is the number of different types of requests served by counter i
• si,r is an indicator variable equal to 1 if counter i can serve request r, 0 otherwise.


*/