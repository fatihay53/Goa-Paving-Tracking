import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class HospitalService {
  findAll() {
    return axios.get(GeneralUtils.URL+'/hospital/findAll');
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/hospital/save', data);
  }

  update(data) {
    return axios.post(GeneralUtils.URL+'/hospital/update', data);
  }

}
