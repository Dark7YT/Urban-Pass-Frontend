import http from "../../../shared/services/http-common.js";

export class SignInApiService {
    signIn(userResoruce) {
        return http.post('/user/signin', userResoruce);
    }
}