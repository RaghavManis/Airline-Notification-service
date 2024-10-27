const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailsender = require("./config/email-config")

const app = express();

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    try {
        const response = await mailsender.sendMail({
            from : "airlinenotification89@gmail.com" ,
            to : "mnsyd24@gmail.com" ,
            subject : "is that mailsender is working ? " ,
            text : "yes it is working " ,       
        })
        console.log(response) ;
    } catch (error) {
        console.log(error) ;     
    }
});
