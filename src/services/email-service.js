
const sender = require('../config/email.config');
const TicketRepository = require('../respository/ticket-respository');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
 try {
    const response = await sender.sendMail({
        from: mailFrom,
        to:mailTo,
        subject: mailSubject,
        text: mailBody
    });
    console.log(response);
   } catch (error) {
        console.log(error); 
   } 

}

const fetchPendingEmails = async (timestamp) => {
    try {
        
        const response = await repo.getAll({status:"PENDING"});
        return response;
        
    } catch (error) {
         console.log(error);
         
    }
}

const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        return response;

    } catch (error) {
        console.log(error);
        
    }
}

const subscribeEvents = async (payload) => {
      let service = payload.service;
      let data = payload.data;
      switch (service) {
        case 'CREATE_TICKET':
                await createNotification(data);
                break;
        case 'SEND_BASIC_MAIL':
                await createNotification(data);
                break;
        default:
            console.log('No Valid event received');
            break;
            
      }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) { 
        console.log(error);
        
    }
}


module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,subscribeEvents
}