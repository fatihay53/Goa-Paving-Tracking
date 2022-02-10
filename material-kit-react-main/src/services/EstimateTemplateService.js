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

    findById(data) {
        return axios.post('http://wwww.localhost:8080/estimateTemplate/findById', data);
    }

    async findByProjectName(data) {
        return await axios.post('http://wwww.localhost:8080/estimateTemplate/findByProjectName', data);
    }

}
