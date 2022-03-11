import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class EmployeeService {
  findAll() {
    return axios.get(GeneralUtils.URL+'/employee/findAll');
  }

  findAllEmployees() {
    return axios.get(GeneralUtils.URL+'/employee/findAllEmployees');
  }

  findAllSupervisors() {
    return axios.get(GeneralUtils.URL+'/employee/findAllSupervisors');
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/employee/save', data);
  }

  update(data) {
    return axios.post(GeneralUtils.URL+'/employee/update', data);
  }

}
