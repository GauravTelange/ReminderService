const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/email.config');


const { response } = require('express');
const express = require('express');


const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();  
        response.forEach((email) => {
            sender.sendMail({
                to: email.receptionEmail,
                subject: email.subject,
                text: email.contact
            }, async (err,data) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: "SUCCESS"});

                }
            
            });

       
        }); 
         console.log(response);
    });

}
module.exports = setupJobs;