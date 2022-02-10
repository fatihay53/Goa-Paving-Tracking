import axios from 'axios';

export default class EstimateTemplateService {
    findAll(data) {
        return axios.get('http://wwww.localhost:8080/estimateTemplate/findAll', data);
    }

    save(data) {
        return axios.post('http://wwww.localhost:8080/estimateTemplate/save', data);
    }

    update(data) {
        return axios.post('http://wwww.localhost:8080/estimateTemplate/update', data);
    }

    updateForemanData(data) {
        return axios.post('http://wwww.localhost:8080/estimateTemplate/updateForemanData', data);
    }

    findById(data) {
        return axios.post('http://wwww.localhost:8080/estimateTemplate/findById', data);
    }

    findByProjectName(data) {
        return axios.post('http://wwww.localhost:8080/estimateTemplate/findByProjectName', data);
    }

}
