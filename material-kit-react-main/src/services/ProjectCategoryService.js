import axios from 'axios';

export default class ProjectCategoryService {
    findAll(data) {
        return axios.get('http://wwww.localhost:8080/projectCategory/findAll', data);
    }
}
