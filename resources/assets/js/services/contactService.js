const baseUrl = '/api/contacts';

module.exports = {
    getAll() {
        return axios.get(`${baseUrl}`);
    },

};
