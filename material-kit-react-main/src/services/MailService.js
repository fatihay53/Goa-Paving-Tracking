import axios from 'axios';

export default class LoginService {
    sendMail(data) {
        return axios.post('http://wwww.localhost:8080/mail/send', data);
    }
}
