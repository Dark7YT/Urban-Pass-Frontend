import http from "../../../shared/services/http-common.js";

export class SignUpApiService {
    create(userResoruce) {
        return http.post('/user/signup', userResoruce);
    }
}