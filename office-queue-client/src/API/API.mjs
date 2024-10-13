const SERVER_URL = "http://localhost:3000";

const getQueues = async (ticketId) => {
  const response = await fetch(`${SERVER_URL}/api/callCustomer/queues`);
  if (response.ok) {
    const queues = await response.json();
    console.log(queues);
    return queues;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw "Something went wrong";
  }
};

const API = { getQueues };

export default API;
