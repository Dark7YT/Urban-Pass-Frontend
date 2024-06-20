import {EventDetail} from "./event-detail.entity.js";

export class Event {
    constructor(name = '', description = '', date = '', location = new EventDetail(), maxTickets = 0, soldTickets = 0) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.maxTickets = maxTickets;
        this.soldTickets = soldTickets;
    }
}