export default class Ticket {
  constructor(id,
    code,
    serviceId,
    estimatedWaitingTime,
    statusId) {
    this.id = id;
    this.code = code;
    this.serviceId = serviceId;
    this.estimatedWaitingTime = estimatedWaitingTime;
    this.statusId = statusId;
  }
}
