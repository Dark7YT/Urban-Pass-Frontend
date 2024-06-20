import {EventDetail} from "./event-detail.entity.js";

export class Event {
    constructor(created_at= '',updated_at = '', name = '', description = '', date = '', location = new EventDetail(), maxTickets = 0, soldTickets = 0) {
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.maxTickets = maxTickets;
        this.soldTickets = soldTickets;
    }
}