import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class PreJobSafetyFormService {
  findAll() {
    return axios.get(GeneralUtils.URL+'/preJobSafety/findAll');
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/preJobSafety/save', data);
  }

  findById(data) {
    return axios.post(GeneralUtils.URL+'/preJobSafety/findById', data);
  }

}
