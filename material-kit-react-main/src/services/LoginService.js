import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class LoginService {
  login(username, password) {
    return axios.post(GeneralUtils.URL+'/auth/login', {
      username,
      password
    });
  }
}
