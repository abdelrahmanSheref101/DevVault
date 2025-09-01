import axios from "axios";

const baseUrl = "http://localhost:3001/resources";

function getAll() {
        const request = axios.get(baseUrl);
        return request.then((res) => res.data);
}

function create(newObj) {
        const request = axios.post(baseUrl, newObj);
        return request.then((res) => res.data);
}

function update(id, newObj) {
        const request = axios.put(`${baseUrl}/${id}`, newObj);
        return request.then((res) => res.data);
}

function delEntery(id) {
        const request = axios.delete(`${baseUrl}/${id}`);
        return request.then((res) => res.data);
}

export default {
        getAll,
        create,
        update,
        delEntery,
};
