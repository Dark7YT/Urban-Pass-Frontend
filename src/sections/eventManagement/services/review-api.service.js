import http from "../../../shared/services/http-common.js";

export class ReviewApiService {
    getAllReviews() {
        return http.get('/review/findAll');
    }
    getReviewById(id) {
        return http.get(`/review/findById/${id}`);
    }
    create(reviewResource, eventId, userId) {
        return http.post(`/review/insert/${eventId}/${userId}`, reviewResource);
    }
    createReactions(reviewId, userId) {
        return http.post(`/review/react/${reviewId}/${userId}`);
    }
    deleteReactions(reviewId, userId) {
        return http.put(`/review/unreact/${reviewId}/${userId}`);
    }
    delete(id) {
        return http.delete(`/review/delete/${id}`);
    }
}