export class Review {
    constructor(idReview = '', eventId = '', userId = '', rating = 0, comment = '') {
        this.idReview = idReview;
        this.eventId = eventId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }
}