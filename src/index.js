const express = require('express');

const { ServerConfig } = require('./config');
// const { EmailController } = require("./controllers") ;
const apiRoutes = require("./routes") ;

const mailsender = require("./config/email-config")
const app = express();

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

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
}); 

app.use('/api' , apiRoutes ) ;