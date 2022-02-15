import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class TailGateTalkFormService {
  findAll() {
    return axios.get(GeneralUtils.URL+'/tailGateTalkForm/findAll');
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/tailGateTalkForm/save', data);
  }

  findById(data) {
    return axios.post(GeneralUtils.URL+'/tailGateTalkForm/findById', data);
  }

}
