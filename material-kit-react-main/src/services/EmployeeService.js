import axios from 'axios';

export default class LoginService {
  findAll() {
    return axios.get('http://wwww.localhost:8080/employee/findAll');
  }
}
