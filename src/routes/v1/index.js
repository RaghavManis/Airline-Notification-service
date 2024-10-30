const express = require('express');

const { InfoController , EmailController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);
console.log("v1 index before calling")
router.post('/tickets' , EmailController.createTicket) ;
console.log("v1 index after calling")

module.exports = router;