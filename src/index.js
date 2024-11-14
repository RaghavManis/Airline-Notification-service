const express = require('express');

const amqplib = require("amqplib") ;
const { EmailService } = require("./services") ;
async function connectQueue() {
    try {
        connection = await amqplib.connect("amqp://localhost");  // This line connects to the RabbitMQ server running on localhost (the default location if you’re running RabbitMQ locally).
                                                                 // amqplib library is used to handle the connection between rabbitmq and node project
        const channel = await connection.createChannel(); // Channels are the paths through which messages are sent and received in RabbitMQ. Each channel is a virtual connection inside a TCP connection.
                                                          // Channels allow you to send and receive messages.

        await channel.assertQueue("noti-queue"); 
        
        channel.consume("noti-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            // const object = JSON.parse(Buffer.from(data).toString());
            await EmailService.sendEmail("airlinenotification89@gmail.com", object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        })

    } catch (error) {  
        console.log("Error inside connect queue in main index.js --> " + error);
    }
}
    

const { ServerConfig } = require('./config');
// const { EmailController } = require("./controllers") ;
const apiRoutes = require("./routes") ;

const mailsender = require("./config/email-config")
const app = express();

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.use('/api' , apiRoutes ) ;

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // try {
    //     const response = await mailsender.sendMail({
    //         from: "airlinenotification89@gmail.com",
    //         to: "mnsyd24@gmail.com",
    //         subject: "12-11-2024 ....tell me is it working",
    //         text: "12-11-2024 ....yes it is working",
    //     });
    //     console.log("Queue is up");
    //     console.log("Mail response:", response);
    // } catch (error) {
    //     console.log("Mail sending error:---> ", error);
    // }
    await connectQueue() ;
    console.log("queue is up") ;
}); 

