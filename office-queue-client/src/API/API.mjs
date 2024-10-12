const SERVER_URL = 'http://localhost:3000';

// API Get a ticket

const newTicket = async (serviceId) =>{
    const response = await fetch(`${SERVER_URL}/api/tickets`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({serviceId: serviceId})
      })
    if(response.ok) {
        const ticketid = await response.json();
        return ticketid;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getTicket = async (ticketId) =>{
    const response = await fetch(`${SERVER_URL}/api/tickets/${ticketId}`)
    if(response.ok) {
        const code = await response.json();
        console.log(code)
        return code;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getServices = async () =>{
    const response = await fetch(`${SERVER_URL}/api/services`)
    if(response.ok) {
        const services = await response.json();
        return services;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

// API next customer

const getCounters = async () =>{
    const response = await fetch(`${SERVER_URL}/api/counters`)
    if(response.ok) {
        const counters = await response.json();
        return counters;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getServicesCounter = async (counterId) =>{
    const response = await fetch(`${SERVER_URL}/api/services/${counterId}`)
    if(response.ok) {
        const services = await response.json();
        return services;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}


const nextCustomer = async (counterId, currentCode) =>{
    const response = await fetch(`${SERVER_URL}/api/${counterId}/${currentCode}`)
    if(response.ok) {
        const currentcode = await response.json();
        return currentcode;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const newHistory = async (counterId, serviceName, time) =>{
    const response = await fetch(`${SERVER_URL}/api/ticket`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({counterId: counterId, serviceName:serviceName, time:time})
      })
    if(response.ok) {
        const ticketid = await response.json();
        return ticketid;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const API ={newTicket,getTicket, getServices,getServicesCounter, getCounters, nextCustomer, newHistory}

export default API;