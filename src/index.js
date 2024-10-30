

// const amqp = require('amqplib');

// async function receiveMessage() {
//     try {
//         const connection = await amqp.connect('amqp://localhost');
//         const channel = await connection.createChannel();
    
//         const queue = 'notification-queue';
    
//         await channel.assertQueue(queue, { durable: true });    
//         channel.consume(queue, (msg) => {
//             console.log(" [x] Received '%s'", msg.content.toString());
//         }, { noAck: true });

//         // setTimeout(() => {
//         //     connection.close();
//         //     process.exit(0);
//         // }, 500);
  
//     } catch (error) {
//         console.log("error inside receive messege in main index of notification service ") ;
//     }  
    
// }

//////////////////////////       ABOVE CODE IS FOR TESTING PHASE        //////////////////////////////
  

const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailsender = require("./config/email-config")
// --------------------------->
const amqplib = require('amqplib');
const { EmailService } = require("./services") ;
async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`); 
            // const object = JSON.parse(Buffer.from(data).toString());
            await EmailService.sendEmail("airlinenoti@gmail.com", object.recepientEmail, object.subject, object.text); // this line is responsible for sending the email 
            channel.ack(data);
        })
    } catch(error) {
        
    }
}
//                                         <----------------------------------
const app = express();

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;


// app.listen(ServerConfig.PORT, async () => {
  const server =  app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // try {
        //     const response = await mailsender.sendMail({
    //         from : "airlinenotification89@gmail.com" ,
    //         to : "mnsyd24@gmail.com" ,
    //         subject : "is that mailsender is working ? " ,
    //         text : "yes it is working " ,       
    //     })
    //     console.log(response) ;
    // } catch (error) {
    //     console.log(error) ;     
    // }

    // receiveMessage();
    await connectQueue();
    console.log("queue is up ") ;
    
});

app.use('/api', apiRoutes);   

// process.on('SIGTERM', () => {    
//     server.close(() => {
//         console.log('Process terminated');
//     });
// });