import axios from 'axios';

export default class TimeCardDetailService {
  findAll(data) {
    return axios.post('http://wwww.localhost:8080/timeCardDetail/findAll',data);
  }

  save(data) {
    return axios.post('http://wwww.localhost:8080/timeCardDetail/save', data);
  }
}
