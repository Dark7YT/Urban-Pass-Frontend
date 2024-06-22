import http from "../../../shared/services/http-common.js";

export class UserApiService {
    getAllUsers() {
        return http.get('/user/findAll');
    }
    getUserById(id) {
        return http.get(`/user/findById/${id}`);
    }
    create(userResource) {
        return http.post('/user/insert', userResource);
    }
    delete(id) {
        return http.delete(`/user/delete/${id}`);
    }
}