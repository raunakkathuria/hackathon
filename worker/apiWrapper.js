const axios = require('axios');

class ApiWrapper {

    async createResource(data) {
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
            const response = res.data;
            return response.id;
        } catch (err) {
            console.log(err)
        }

    }

    async getResource(id) {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=', {
                params: {
                    id: id
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
};

exports.ApiWrapper = ApiWrapper;