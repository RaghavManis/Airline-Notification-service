const CrudRepository = require("./crud-repositories");
const { Ticket } = require('../models');
class TicketRepository extends CrudRepository {
    constructor() {
        super(Ticket);
    }
    async getPendingTickets() {
        const response = await Ticket.findAll({
            where: {
                status: 'PENDING'
            }
        });
        return response;
    }
}
module.exports = TicketRepository;  