const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');

//const {sendBasicEmail} = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');


const jobs = require('./utils/job');

const setUpAndStartServer = () => {
   
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.post('/api/v1/tickets',TicketController.create);

    app.listen(PORT, () => {
        console.log(`Reminder Service is running on port : ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //      'gauravtelange991@gmail.com',
        //      'This is a testing email',
        //      'Hey, How are you, I hope you like the support'
        // );

        
    
    });
}

setUpAndStartServer();