import axios from 'axios';

export default class LoginService {
  login(username, password) {
    return axios.post('http://wwww.localhost:8080/auth/login', {
      username,
      password
    });
  }
}
