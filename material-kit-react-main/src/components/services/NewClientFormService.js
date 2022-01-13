import axios from 'axios';

export default class NewClientFormService {
  // eslint-disable-next-line class-methods-use-this
  save(data) {
    return axios.post('http://wwww.localhost:8080/newClientForm/save', data);
  }
}
