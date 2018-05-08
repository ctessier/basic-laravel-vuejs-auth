const baseUrl = '/api/contacts';

module.exports = {
    getAll() {
        return axios.get(`${baseUrl}`);
    },

    get(id) {
        return axios.get(`${baseUrl}/${id}`);
    },

    delete(id) {
        return axios.delete(`${baseUrl}/${id}`);
    },

};
