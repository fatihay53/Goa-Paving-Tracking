import axios from 'axios';

export default class NewClientFormService {

  save(data) {
    return axios.post('http://wwww.localhost:8080/newClientForm/save', data);
  }

  findAll() {
    return axios.get('http://wwww.localhost:8080/newClientForm/findAll');
  }

}
