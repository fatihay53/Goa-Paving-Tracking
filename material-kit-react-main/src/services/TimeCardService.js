import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class TimeCardService {
  findAll(data) {
    return axios.post(GeneralUtils.URL+'/timeCard/findAll',data);
  }

  save(data) {
    return axios.post(GeneralUtils.URL+'/timeCard/save', data);
  }

  findById(data) {
    return axios.post(GeneralUtils.URL+'/timeCard/findById', data);
  }

  approveTimeCard(data) {
    return axios.post(GeneralUtils.URL+'/timeCard/approveTimeCard', data);
  }

  getTimeCardReport(data) {
    return axios.post(GeneralUtils.URL+'/timeCard/getTimeCardReport',data);
  }

  getTimeCardReportTotal(data) {
    return axios.post(GeneralUtils.URL+'/timeCard/getTimeCardReportTotal',data);
  }

}
