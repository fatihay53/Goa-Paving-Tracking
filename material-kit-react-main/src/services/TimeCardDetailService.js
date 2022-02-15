import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class TimeCardDetailService {
  findAll(data) {
    return axios.post(GeneralUtils.URL+'/timeCardDetail/findAll',data);
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/timeCardDetail/save', data);
  }
}
