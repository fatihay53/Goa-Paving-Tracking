import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class AttendeesService {

  save(data) {
    return axios.post(GeneralUtils.URL+'/attendees/save', data);
  }

  updateSignature(data) {
    return axios.post(GeneralUtils.URL+'/attendees/updateSignature', data);
  }

  findAll() {
    return axios.get(GeneralUtils.URL+'/attendees/findAll');
  }

  findAttendees(data) {
    return axios.post(GeneralUtils.URL+'/attendees/findAttendees', data);
  }

}
