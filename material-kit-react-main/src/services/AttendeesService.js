import axios from 'axios';

export default class AttendeesService {

  save(data) {
    return axios.post('http://wwww.localhost:8080/attendees/save', data);
  }

  updateSignature(data) {
    return axios.post('http://wwww.localhost:8080/attendees/updateSignature', data);
  }

  findAll() {
    return axios.get('http://wwww.localhost:8080/attendees/findAll');
  }

  findAttendees(data) {
    return axios.post('http://wwww.localhost:8080/attendees/findAttendees', data);
  }

}
