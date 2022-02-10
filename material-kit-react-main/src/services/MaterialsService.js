import axios from 'axios';

export default class MaterialsService {
    findAll(data) {
        return axios.get('http://wwww.localhost:8080/materials/findAll', data);
    }
}
