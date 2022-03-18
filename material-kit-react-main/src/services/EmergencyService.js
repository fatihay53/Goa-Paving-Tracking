import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class EmergencyService {
  findAll() {
    return axios.get(GeneralUtils.URL+'/emergency/findAll');
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/emergency/save', data);
  }

  update(data) {
    return axios.post(GeneralUtils.URL+'/emergency/update', data);
  }

}
