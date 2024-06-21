import http from "../../../shared/services/http-common.js";

export class EventApiService {
    getAllEvents() {
        return http.get('/event/findAll');
    }
    getEventById(id) {
        return http.get(`/event/findById/${id}`);
    }
    create(eventResource) {
        return http.post('/event/insert', eventResource, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    delete(id) {
        return http.delete(`/event/delete/{id}`);
    }
}