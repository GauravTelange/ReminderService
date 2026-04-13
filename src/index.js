const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const setUpAndStartServer = () => {
   
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.listen(PORT, () => {
        console.log(`Reminder Service is running on port : ${PORT}`);
        
    
    });
}

setUpAndStartServer();