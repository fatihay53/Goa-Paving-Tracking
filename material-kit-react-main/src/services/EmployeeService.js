import axios from 'axios';

export default class EmployeeService {
  findAll() {
    return axios.get('http://wwww.localhost:8080/employee/findAll');
  }

  findAllEmployees() {
    return axios.get('http://wwww.localhost:8080/employee/findAllEmployees');
  }

  save(data) {
    return axios.post('http://wwww.localhost:8080/employee/save', data);
  }

  update(data) {
    return axios.post('http://wwww.localhost:8080/employee/update', data);
  }

}
