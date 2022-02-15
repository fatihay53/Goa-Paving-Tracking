import axios from 'axios';

export default class UserService {
  findAll() {
    return axios.get('http://wwww.localhost:8080/user/findAll');
  }

  save(data) {
    return axios.post('http://wwww.localhost:8080/user/save', data);
  }

  update(data) {
    return axios.post('http://wwww.localhost:8080/user/update', data);
  }

  findByUserName(data) {
    return axios.post('http://wwww.localhost:8080/user/findByUsername', data);
  }
}
