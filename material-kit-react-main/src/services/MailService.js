import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class LoginService {
    sendMail(data) {
        return axios.post(GeneralUtils.URL+'/mail/send', data);
    }
}
