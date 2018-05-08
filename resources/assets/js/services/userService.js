const baseUrl = '/api/user';

module.exports = {
    get() {
        return axios.get(`${baseUrl}`);
    },

};
