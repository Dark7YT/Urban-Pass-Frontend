import http from "../../../shared/services/http-common.js";

export class EventApiService {
    getAllEvents() {
        return http.get('/event/findAll');
    }
    getEventById(id) {
        return http.get(`/event/findById/${id}`);
    }
    create(eventResoruce) {
        return http.post('/event/insert', eventResoruce);
    }
    delete(id) {
        return http.delete(`/event/delete/{id}`);
    }
}