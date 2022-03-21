import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class UserService {
  findAll() {
    return axios.get(GeneralUtils.URL+'/user/findAll');
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/user/save', data);
  }

  update(data) {
    return axios.post(GeneralUtils.URL+'/user/update', data);
  }

  findByUserName(data) {
    return axios.post(GeneralUtils.URL+'/user/findByUsername', data);
  }

  changePassword(data) {
    return axios.post(GeneralUtils.URL+'/user/changePassword', data);
  }

}
