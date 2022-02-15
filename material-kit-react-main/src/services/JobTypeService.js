import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class JobTypeService {
    findAll(data) {
        return axios.get(GeneralUtils.URL+'/jobType/findAll', data);
    }
}
