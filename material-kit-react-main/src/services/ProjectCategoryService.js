import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class ProjectCategoryService {
    findAll(data) {
        return axios.get(GeneralUtils.URL+'/projectCategory/findAll', data);
    }
}
