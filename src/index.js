const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');


const jobs = require('./utils/job');
const { subscribeMessage , createChannel } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');

const setUpAndStartServer = async () => {
   
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents   , REMINDER_BINDING_KEY);

    app.post('/api/v1/tick ets',TicketController.create);

    app.listen(PORT, () => {
        console.log(`Reminder Service is running on port : ${PORT}`);
        //jobs();

    });
}

setUpAndStartServer();