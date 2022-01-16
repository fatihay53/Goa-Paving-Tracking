import axios from 'axios';

export default class TailGateTalkFormService {
  findAll() {
    return axios.get('http://wwww.localhost:8080/tailGateTalkForm/findAll');
  }

  save(data) {
    return axios.post('http://wwww.localhost:8080/tailGateTalkForm/save', data);
  }

  findById(data) {
    return axios.post('http://wwww.localhost:8080/tailGateTalkForm/findById', data);
  }

}
