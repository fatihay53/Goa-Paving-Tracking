import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class CommentsService {

    save(data) {
        return axios.post(GeneralUtils.URL + '/comments/save', data);
    }

    findAll() {
        return axios.get(GeneralUtils.URL + '/comments/findAll');
    }

    findComments(data) {
        return axios.post(GeneralUtils.URL + '/comments/findComments', data);
    }

}
