import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class AttachmentService {

    save(data) {
        return axios.post(GeneralUtils.URL + '/attachment/save', data);
    }

    findAll(data) {
        return axios.post(GeneralUtils.URL + '/attachment/findAll',data);
    }

}
