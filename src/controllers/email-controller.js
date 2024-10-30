// const { EmailService } = require('../services');
// async function create(req, res) {
//     try {
//         const response = await EmailService.createTicket({
//             subject: req.body.subject,
//             content: req.body.content,
//             recepientEmail: req.body.recepientEmail
//         });
//         return res.status(201).json(response);
//     } catch(error) {
//         return res.status(500).json(error);
//     }
// }

const { EmailService } = require("../services") ;
const { StatusCodes } = require("http-status-codes") ;
const { SuccessResponse , ErrorResponse } = require("../utills/common") ;

async function createTicket(req , res){
    try {
        console.log('controller') ;
        const ticket = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        })
        SuccessResponse.data = ticket ;
        return res.status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.data = 0 ; 
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse) ;
    }
}

module.exports = {
    createTicket
}