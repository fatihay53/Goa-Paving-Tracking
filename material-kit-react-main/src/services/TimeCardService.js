import axios from 'axios';

export default class TimeCardService {
  findAll(data) {
    return axios.post('http://wwww.localhost:8080/timeCard/findAll',data);
  }

  save(data) {
    return axios.post('http://wwww.localhost:8080/timeCard/save', data);
  }

  findById(data) {
    return axios.post('http://wwww.localhost:8080/timeCard/findById', data);
  }

  approveTimeCard(data) {
    return axios.post('http://wwww.localhost:8080/timeCard/approveTimeCard', data);
  }

}
