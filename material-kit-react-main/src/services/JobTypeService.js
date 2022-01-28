import axios from 'axios';

export default class JobTypeService {
    findAll(data) {
        return axios.get('http://wwww.localhost:8080/jobType/findAll', data);
    }
}
