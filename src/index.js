const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const {sendBasicEmail} = require('./services/email-service');
const cron = require('node-cron');

const setUpAndStartServer = () => {
   
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.listen(PORT, () => {
        console.log(`Reminder Service is running on port : ${PORT}`);
        
        // sendBasicEmail(
        //     'support@admin.com',
        //      'gauravtelange991@gmail.com',
        //      'This is a testing email',
        //      'Hey, How are you, I hope you like the support'
        // );

        cron.schedule('*/2 * * * *', () => {
        console.log('running a task every minute');
        });
    
    });
}

setUpAndStartServer();