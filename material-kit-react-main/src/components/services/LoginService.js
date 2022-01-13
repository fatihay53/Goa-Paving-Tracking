import axios from 'axios';

export default class LoginService {
  // eslint-disable-next-line class-methods-use-this
  login(username, password) {
    return axios.post('http://wwww.localhost:8080/auth/login', {
      username,
      password
    });
  }
}
