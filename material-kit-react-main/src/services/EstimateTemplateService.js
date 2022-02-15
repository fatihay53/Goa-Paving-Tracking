import axios from 'axios';
import GeneralUtils from "../utils/GeneralUtils";

export default class EstimateTemplateService {
    findAll(data) {
        return axios.get(GeneralUtils.URL+'/estimateTemplate/findAll', data);
    }

    save(data) {
        return axios.post(GeneralUtils.URL+'/estimateTemplate/save', data);
    }

    update(data) {
        return axios.post(GeneralUtils.URL+'/estimateTemplate/update', data);
    }

    updateForemanData(data) {
        return axios.post(GeneralUtils.URL+'/estimateTemplate/updateForemanData', data);
    }

    findById(data) {
        return axios.post(GeneralUtils.URL+'/estimateTemplate/findById', data);
    }

    findByProjectName(data) {
        return axios.post(GeneralUtils.URL+'/estimateTemplate/findByProjectName', data);
    }

    findUserTodayHours(data) {
        return axios.post(GeneralUtils.URL+'/estimateTemplate/findUserTodayHours', data);
    }

}
