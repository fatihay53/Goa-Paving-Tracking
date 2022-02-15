import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class NewClientFormService {

  save(data) {
    return axios.post(GeneralUtils.URL+'/newClientForm/save', data);
  }

  findAll() {
    return axios.get(GeneralUtils.URL+'/newClientForm/findAll');
  }

}
