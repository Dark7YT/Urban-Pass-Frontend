import http from "../../../shared/services/http-common.js";

export class SignUpApiService {
    getAllEvents() {
        return http.get('/event/findAll');
    }
    getEventById(id) {
        return http.get(`/event/findById/${id}`);
    }
    create(userResoruce) {
        return http.post('/user/insert', userResoruce);
    }
    delete(id) {
        return http.delete(`/event/delete/{id}`);
    }
}