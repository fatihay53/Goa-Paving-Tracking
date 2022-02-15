import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class MaterialsService {
    findAll(data) {
        return axios.get(GeneralUtils.URL+'/materials/findAll', data);
    }
}
