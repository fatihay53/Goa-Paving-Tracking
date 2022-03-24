import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class CertificateService {

    save(data) {
        return axios.post(GeneralUtils.URL + '/certificate/save', data);
    }

    findAll(data) {
        return axios.post(GeneralUtils.URL + '/certificate/findAll',data);
    }

}
